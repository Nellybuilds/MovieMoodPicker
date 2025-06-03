import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

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

  const httpServer = createServer(app);

  return httpServer;
}
