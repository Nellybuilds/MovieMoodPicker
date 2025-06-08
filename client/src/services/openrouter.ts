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
    const response = await fetch('/api/ai-recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movies,
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