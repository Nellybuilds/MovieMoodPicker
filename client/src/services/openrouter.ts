export interface MovieRecommendationRequest {
  mood: string;
  genre: string;
  kidsOnly: boolean;
  previouslyWatched?: string[];
  userPreferences?: string;
}

export interface AIRecommendation {
  reasoning: string;
  confidence: number;
  alternativeGenres: string[];
  watchContext: string;
}

export async function getAIMovieRecommendation(
  movies: any[],
  request: MovieRecommendationRequest
): Promise<{ movie: any; aiInsight: AIRecommendation }> {
  try {
    // Send only essential movie data to reduce payload size
    const essentialMovies = movies.map(movie => ({
      title: movie.title,
      overview: movie.overview || movie.description,
      vote_average: movie.vote_average,
      genre_ids: movie.genre_ids,
      adult: movie.adult,
      release_date: movie.release_date
    }));

    const response = await fetch('/api/ai-recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movies: essentialMovies,
        ...request
      })
    });

    if (!response.ok) {
      throw new Error(`AI recommendation failed: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error getting AI recommendation:', error);
    throw error;
  }
}

export async function analyzeMovieCollection(movies: any[]): Promise<{
  insights: string;
  recommendations: string[];
  trendingMoods: string[];
}> {
  try {
    const response = await fetch('/api/ai-analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ movies })
    });

    if (!response.ok) {
      throw new Error(`AI analysis failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing movie collection:', error);
    throw error;
  }
}