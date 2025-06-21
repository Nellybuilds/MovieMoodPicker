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
  // Get movies from database with optional filtering
  app.get('/api/movies', async (req, res) => {
    try {
      const { genre, mood, kidsOnly } = req.query;
      
      const filters: any = {};
      if (genre && typeof genre === 'string') filters.genre = genre;
      if (mood && typeof mood === 'string') filters.mood = mood;
      if (kidsOnly === 'true') filters.kidsOnly = true;
      
      const movies = await storage.getMovies(filters);
      res.json(movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ error: 'Failed to fetch movies' });
    }
  });

  // Get random movie from database
  app.get('/api/movies/random', async (req, res) => {
    try {
      const { genre, mood, kidsOnly } = req.query;
      
      const filters: any = {};
      if (genre && typeof genre === 'string') filters.genre = genre;
      if (mood && typeof mood === 'string') filters.mood = mood;
      if (kidsOnly === 'true') filters.kidsOnly = true;
      
      const movies = await storage.getMovies(filters);
      
      if (movies.length === 0) {
        // If no matches, get all movies
        const allMovies = await storage.getMovies();
        if (allMovies.length === 0) {
          return res.status(404).json({ error: 'No movies found in database' });
        }
        const randomMovie = allMovies[Math.floor(Math.random() * allMovies.length)];
        return res.json(randomMovie);
      }
      
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      res.json(randomMovie);
    } catch (error) {
      console.error('Error fetching random movie:', error);
      res.status(500).json({ error: 'Failed to fetch random movie' });
    }
  });

  // Admin endpoint to view all movies in database
  app.get('/api/admin/movies', async (req, res) => {
    try {
      const allMovies = await storage.getMovies();
      const moviesByGenre = allMovies.reduce((acc, movie) => {
        if (!acc[movie.genre]) acc[movie.genre] = [];
        acc[movie.genre].push(movie);
        return acc;
      }, {} as Record<string, any[]>);
      
      const summary = {
        totalMovies: allMovies.length,
        byGenre: Object.entries(moviesByGenre).map(([genre, movies]) => ({
          genre,
          count: movies.length,
          movies: movies.map(m => ({ id: m.id, title: m.title, mood: m.mood, year: m.year }))
        }))
      };
      
      res.json(summary);
    } catch (error) {
      console.error('Error fetching admin movies:', error);
      res.status(500).json({ error: 'Failed to fetch movies' });
    }
  });

  // Original TMDB endpoint for backward compatibility
  app.get('/api/tmdb-movies', async (req, res) => {
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

      // Filter movies based on criteria (using Tubi data structure)
      let filteredMovies = movies.filter((movie: any) => {
        const movieGenre = movie.genre || '';
        const movieMood = movie.mood || '';
        
        return (!genre || movieGenre.toLowerCase() === genre.toLowerCase()) &&
               (!mood || movieMood.toLowerCase() === mood.toLowerCase()) &&
               (!kidsOnly || movie.isKidFriendly);
      });

      if (filteredMovies.length === 0) {
        return res.status(404).json({ error: 'No movies match your criteria' });
      }

      // Prepare AI prompt with top-rated movies from filtered results
      const topMovies = filteredMovies
        .sort((a: any, b: any) => b.rating - a.rating)
        .slice(0, 10)
        .map((movie: any) => ({
          title: movie.title,
          overview: movie.description ? movie.description.substring(0, 200) : 'No description available',
          rating: movie.rating,
          year: movie.year,
          genre: movie.genre,
          mood: movie.mood
        }));

      const prompt = `You are a movie recommendation AI. Based on the user's preferences, recommend the TOP 3 movies from this list.

User Preferences:
- Mood: ${mood || 'any'}
- Genre: ${genre || 'any'}
- Kids Only: ${kidsOnly ? 'Yes' : 'No'}
- Previously Watched: ${previouslyWatched.join(', ') || 'None specified'}
- Additional Preferences: ${userPreferences || 'None'}

Available Movies:
${topMovies.map((movie: any) => `- ${movie.title} (${movie.year}) - Genre: ${movie.genre}, Mood: ${movie.mood} - Rating: ${movie.rating}/10\n  ${movie.overview}`).join('\n\n')}

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
        // Fallback if AI doesn't return valid JSON - provide 3 movies
        const fallbackMovies = filteredMovies.slice(0, 3);
        aiRecommendation = {
          recommendations: fallbackMovies.map((movie: any, index: number) => ({
            title: movie.title,
            reasoning: `Great ${genre || movie.genre} movie that matches your ${mood || 'current'} mood`,
            confidence: 0.8 - (index * 0.1),
            rank: index + 1
          })),
          watchContext: "Enjoy your movie!"
        };
      }

      // Find recommended movies from our list, ensuring unique movies
      const usedMovies = new Set();
      const recommendedMovies = [];
      
      for (let i = 0; i < aiRecommendation.recommendations.length && recommendedMovies.length < 3; i++) {
        const rec = aiRecommendation.recommendations[i];
        
        // Try to find exact match first
        let movie = filteredMovies.find((movie: any) => 
          movie.title.toLowerCase() === rec.title.toLowerCase()
        );
        
        // If no exact match, try partial match
        if (!movie) {
          movie = filteredMovies.find((movie: any) => 
            movie.title.toLowerCase().includes(rec.title.toLowerCase()) ||
            rec.title.toLowerCase().includes(movie.title.toLowerCase())
          );
        }
        
        // If still no match, pick an unused movie from filtered list
        if (!movie || usedMovies.has(movie.title)) {
          const availableMovies = filteredMovies.filter((m: any) => !usedMovies.has(m.title));
          if (availableMovies.length > 0) {
            movie = availableMovies[Math.floor(Math.random() * availableMovies.length)];
          }
        }
        
        if (movie && !usedMovies.has(movie.title)) {
          usedMovies.add(movie.title);
          recommendedMovies.push({
            movie: movie,
            reasoning: rec.reasoning,
            confidence: rec.confidence,
            rank: rec.rank || (i + 1)
          });
        }
      }
      
      // If we still don't have 3 unique movies, fill with remaining filtered movies
      while (recommendedMovies.length < 3 && recommendedMovies.length < filteredMovies.length) {
        const availableMovies = filteredMovies.filter((m: any) => !usedMovies.has(m.title));
        if (availableMovies.length === 0) break;
        
        const movie = availableMovies[Math.floor(Math.random() * availableMovies.length)];
        usedMovies.add(movie.title);
        
        recommendedMovies.push({
          movie: movie,
          reasoning: `Great ${movie.genre.toLowerCase()} movie that matches your ${movie.mood.toLowerCase()} mood`,
          confidence: 0.7 - (recommendedMovies.length * 0.1),
          rank: recommendedMovies.length + 1
        });
      }

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
