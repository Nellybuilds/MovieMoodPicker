import { apiRequest } from "@/lib/queryClient";

export interface MoodRecommendationRequest {
  moodText: string;
  kidsOnly?: boolean;
}

export interface MoodRecommendation {
  movie: {
    id: number;
    title: string;
    genre: string;
    mood: string;
    isKidFriendly: boolean;
    image: string;
    description: string;
    year: number;
    rating: number;
  };
  reasoning: string;
  confidence: number;
  rank: number;
}

export interface MoodRecommendationResponse {
  recommendations: MoodRecommendation[];
  moodAnalysis: string;
  watchContext: string;
}

export async function getMoodBasedRecommendations(
  request: MoodRecommendationRequest
): Promise<MoodRecommendationResponse> {
  const response = await fetch("/api/mood-recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get mood recommendations: ${error}`);
  }

  return response.json();
}