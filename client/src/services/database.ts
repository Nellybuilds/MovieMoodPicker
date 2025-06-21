import { apiRequest } from "@/lib/queryClient";

export interface Movie {
  id: number;
  title: string;
  genre: string;
  mood: string;
  isKidFriendly: boolean;
  image: string;
  description: string;
  year: number;
  rating: number;
}

export interface MovieFilters {
  genre?: string;
  mood?: string;
  kidsOnly?: boolean;
}

export async function getMovies(filters?: MovieFilters): Promise<Movie[]> {
  const params = new URLSearchParams();
  
  if (filters?.genre) params.append('genre', filters.genre);
  if (filters?.mood) params.append('mood', filters.mood);
  if (filters?.kidsOnly) params.append('kidsOnly', 'true');
  
  const url = `/api/movies${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch movies: ${response.statusText}`);
  return response.json();
}

export async function getRandomMovie(filters?: MovieFilters): Promise<Movie> {
  const params = new URLSearchParams();
  
  if (filters?.genre) params.append('genre', filters.genre);
  if (filters?.mood) params.append('mood', filters.mood);
  if (filters?.kidsOnly) params.append('kidsOnly', 'true');
  
  const url = `/api/movies/random${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch random movie: ${response.statusText}`);
  return response.json();
}