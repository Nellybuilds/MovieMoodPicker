import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  // Helper functions for movie classification
  const GENRE_MAP: { [key: number]: string } = {
    28: 'Action', 12: 'Action', 16: 'Family', 35: 'Comedy', 80: 'Action',
    99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Family',
    36: 'Documentary', 27: 'Horror', 10402: 'Drama', 9648: 'Horror',
    10749: 'Romance', 878: 'Action', 10770: 'Drama', 53: 'Horror',
    10752: 'Action', 37: 'Action'
  };

  function getGenreFromTMDB(genreIds: number[] | undefined): string {
    if (!genreIds || !Array.isArray(genreIds)) return 'Drama';
    for (const id of genreIds) {
      if (GENRE_MAP[id]) return GENRE_MAP[id];
    }
    return 'Drama';
  }

  function assignMoodFromTMDB(movie: any): string {
    const genreIds = movie.genre_ids || [];
    const rating = movie.vote_average || 6;

    if (!Array.isArray(genreIds)) return 'Chill';

    if (genreIds.includes(27) || genreIds.includes(53)) return 'Scared';
    if (genreIds.includes(35)) return 'Happy';
    if (genreIds.includes(28) || genreIds.includes(12)) return 'Adventurous';
    if (genreIds.includes(10749)) return rating > 7 ? 'Happy' : 'Sad';
    if (genreIds.includes(18)) return rating < 6.5 ? 'Sad' : 'Chill';
    if (genreIds.includes(10751) || genreIds.includes(16)) return 'Happy';
    if (genreIds.includes(99)) return 'Chill';

    if (rating > 7.5) return 'Happy';
    if (rating < 5.5) return 'Sad';
    return 'Chill';
  }

  function isMovieKidFriendly(movie: any): boolean {
    const genreIds = movie.genre_ids || [];
    if (!Array.isArray(genreIds)) return false;
    
    return !movie.adult && 
           (movie.vote_average || 0) >= 6.0 && 
           (genreIds.includes(10751) || genreIds.includes(16)) &&
           !genreIds.includes(27) && !genreIds.includes(53) &&
           !genreIds.includes(80) && !genreIds.includes(10752) &&
           !genreIds.includes(9648);
  }

  // TMDB API proxy endpoint
  app.get('/api/movies', async (req, res) => {
    try {
      if (!TMDB_API_KEY) {
        return res.status(500).json({ error: 'TMDB API key not configured' });
      }

      const movies = [];
      
      // Fetch popular movies from multiple pages
      for (let page = 1; page <= 10; page++) {
        const response = await fetch(
          `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}&language=en-US`
        );
        
        if (!response.ok) {
          throw new Error(`TMDB API error: ${response.status}`);
        }
        
        const data = await response.json();
        movies.push(...data.results);
      }

      // Also fetch top-rated movies
      for (let page = 1; page <= 5; page++) {
        const response = await fetch(
          `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&page=${page}&language=en-US`
        );
        
        if (!response.ok) {
          throw new Error(`TMDB API error: ${response.status}`);
        }
        
        const data = await response.json();
        movies.push(...data.results);
      }

      res.json({ movies });
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ error: 'Failed to fetch movies from TMDB' });
    }
  });

  // AI-powered movie recommendation endpoint
  app.post('/api/ai-recommend', async (req, res) => {
    try {
      if (!OPENROUTER_API_KEY) {
        return res.status(500).json({ error: 'OpenRouter API key not configured' });
      }

      const { movies, mood, genre, kidsOnly, previouslyWatched = [], userPreferences = '' } = req.body;

      if (!movies || movies.length === 0) {
        return res.status(400).json({ error: 'No movies provided' });
      }

      // Filter movies based on criteria
      let filteredMovies = movies.filter((movie: any) => {
        const movieGenre = getGenreFromTMDB(movie.genre_ids);
        const movieMood = assignMoodFromTMDB(movie);
        const isKidFriendly = isMovieKidFriendly(movie);

        return (!genre || movieGenre.toLowerCase() === genre.toLowerCase()) &&
               (!mood || movieMood.toLowerCase() === mood.toLowerCase()) &&
               (!kidsOnly || isKidFriendly);
      });

      if (filteredMovies.length === 0) {
        return res.status(404).json({ error: 'No movies match your criteria' });
      }

      // Prepare AI prompt with top-rated movies from filtered results
      const topMovies = filteredMovies
        .sort((a: any, b: any) => b.vote_average - a.vote_average)
        .slice(0, 10)
        .map((movie: any) => ({
          title: movie.title,
          overview: movie.overview ? movie.overview.substring(0, 200) : 'No description available',
          rating: movie.vote_average,
          year: movie.release_date ? movie.release_date.split('-')[0] : 'Unknown'
        }));

      const prompt = `You are a movie recommendation AI. Based on the user's preferences, recommend the TOP 3 movies from this list.

User Preferences:
- Mood: ${mood || 'any'}
- Genre: ${genre || 'any'}
- Kids Only: ${kidsOnly ? 'Yes' : 'No'}
- Previously Watched: ${previouslyWatched.join(', ') || 'None specified'}
- Additional Preferences: ${userPreferences || 'None'}

Available Movies:
${topMovies.map((movie: any) => `- ${movie.title} (${movie.year}) - Rating: ${movie.rating}/10\n  ${movie.overview}`).join('\n\n')}

Please respond with valid JSON in this exact format:
{
  "recommendations": [
    {
      "title": "Movie Title Here",
      "reasoning": "Why this movie fits the user's preferences",
      "confidence": 0.95,
      "rank": 1
    },
    {
      "title": "Second Movie Title",
      "reasoning": "Why this is also a good choice",
      "confidence": 0.85,
      "rank": 2
    },
    {
      "title": "Third Movie Title", 
      "reasoning": "Alternative option that matches preferences",
      "confidence": 0.75,
      "rank": 3
    }
  ],
  "watchContext": "Perfect for your current mood"
}

Rank the movies 1-3 based on how well they match the user's mood and preferences.`;

      const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5000',
          'X-Title': 'Movies By the Mood'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct:free',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!aiResponse.ok) {
        throw new Error(`OpenRouter API error: ${aiResponse.status}`);
      }

      const aiData = await aiResponse.json();
      const aiContent = aiData.choices[0].message.content;

      // Parse AI response
      let aiRecommendation;
      try {
        aiRecommendation = JSON.parse(aiContent);
      } catch (parseError) {
        // Fallback if AI doesn't return valid JSON
        aiRecommendation = {
          recommendations: [
            {
              title: filteredMovies[0].title,
              reasoning: "AI recommendation parsing failed, returning available movies",
              confidence: 0.5,
              rank: 1
            }
          ],
          watchContext: "Enjoy your movie!"
        };
      }

      // Find recommended movies from our list
      const recommendedMovies = aiRecommendation.recommendations.map((rec: any) => {
        const movie = filteredMovies.find((movie: any) => 
          movie.title.toLowerCase().includes(rec.title.toLowerCase()) ||
          rec.title.toLowerCase().includes(movie.title.toLowerCase())
        ) || topMovies.find((movie: any) => movie.title === rec.title);
        
        return {
          movie: movie || filteredMovies[Math.floor(Math.random() * filteredMovies.length)],
          reasoning: rec.reasoning,
          confidence: rec.confidence,
          rank: rec.rank
        };
      });

      res.json({
        recommendations: recommendedMovies,
        watchContext: aiRecommendation.watchContext
      });

    } catch (error) {
      console.error('Error getting AI recommendation:', error);
      res.status(500).json({ error: 'Failed to get AI movie recommendation' });
    }
  });

  // AI movie collection analysis endpoint
  app.post('/api/ai-analyze', async (req, res) => {
    try {
      if (!OPENROUTER_API_KEY) {
        return res.status(500).json({ error: 'OpenRouter API key not configured' });
      }

      const { movies } = req.body;
      
      const movieStats = {
        total: movies.length,
        averageRating: movies.reduce((sum: number, movie: any) => sum + movie.vote_average, 0) / movies.length,
        genres: Array.from(new Set(movies.flatMap((movie: any) => movie.genre_ids))).slice(0, 10),
        topRated: movies.filter((movie: any) => movie.vote_average >= 8).length
      };

      const prompt = `Analyze this movie collection and provide insights:

Collection Stats:
- Total Movies: ${movieStats.total}
- Average Rating: ${movieStats.averageRating.toFixed(1)}
- Top Rated Movies (8+): ${movieStats.topRated}

Provide insights about trending genres, mood recommendations, and viewing suggestions. 
Respond with JSON in this format:
{
  "insights": "Brief analysis of the collection",
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"],
  "trendingMoods": ["mood1", "mood2", "mood3"]
}`;

      const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5000',
          'X-Title': 'Movies By the Mood'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct:free',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.5,
          max_tokens: 300
        })
      });

      const aiData = await aiResponse.json();
      const analysis = JSON.parse(aiData.choices[0].message.content);

      res.json(analysis);
    } catch (error) {
      console.error('Error analyzing movie collection:', error);
      res.status(500).json({ error: 'Failed to analyze movie collection' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
