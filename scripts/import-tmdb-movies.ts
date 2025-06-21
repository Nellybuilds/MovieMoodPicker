import { db } from "../server/db";
import { movies } from "@shared/schema";
import { eq } from "drizzle-orm";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Genre mapping from TMDB IDs to our genre categories
const GENRE_MAP: { [key: number]: string } = {
  28: 'Action',      // Action
  12: 'Action',      // Adventure
  16: 'Family',      // Animation
  35: 'Comedy',      // Comedy
  80: 'Action',      // Crime
  99: 'Documentary', // Documentary
  18: 'Drama',       // Drama
  10751: 'Family',   // Family
  14: 'Family',      // Fantasy
  36: 'Documentary', // History
  27: 'Horror',      // Horror
  10402: 'Drama',    // Music
  9648: 'Horror',    // Mystery
  10749: 'Romance',  // Romance
  878: 'Action',     // Science Fiction
  10770: 'Drama',    // TV Movie
  53: 'Horror',      // Thriller
  10752: 'Action',   // War
  37: 'Action'       // Western
};

function getGenreFromTMDB(genreIds: number[]): string {
  if (!genreIds || genreIds.length === 0) return 'Drama';
  
  // Return the first matching genre, prioritizing specific genres
  for (const id of genreIds) {
    if (GENRE_MAP[id]) return GENRE_MAP[id];
  }
  return 'Drama';
}

function assignMoodFromTMDB(movie: any): string {
  const genreIds = movie.genre_ids || [];
  const rating = movie.vote_average || 6;

  // Horror/Thriller = Scared
  if (genreIds.includes(27) || genreIds.includes(53)) return 'Scared';
  
  // Comedy = Happy
  if (genreIds.includes(35)) return 'Happy';
  
  // Action/Adventure = Adventurous
  if (genreIds.includes(28) || genreIds.includes(12)) return 'Adventurous';
  
  // Romance = Happy if high rated, Sad if low rated
  if (genreIds.includes(10749)) return rating > 7 ? 'Happy' : 'Sad';
  
  // Drama = Sad if low rated, Chill if decent
  if (genreIds.includes(18)) return rating < 6.5 ? 'Sad' : 'Chill';
  
  // Family/Animation = Happy
  if (genreIds.includes(10751) || genreIds.includes(16)) return 'Happy';
  
  // Documentary = Chill
  if (genreIds.includes(99)) return 'Chill';

  // Default based on rating
  if (rating > 7.5) return 'Happy';
  if (rating < 5.5) return 'Sad';
  return 'Chill';
}

function isMovieKidFriendly(movie: any): boolean {
  const genreIds = movie.genre_ids || [];
  
  return !movie.adult && 
         (genreIds.includes(16) || genreIds.includes(10751)) && // Animation or Family
         !genreIds.includes(27) && // Not Horror
         !genreIds.includes(53) && // Not Thriller
         !genreIds.includes(9648); // Not Mystery
}

async function fetchMoviesFromTMDB(endpoint: string, pages: number = 3): Promise<any[]> {
  const allMovies = [];
  
  for (let page = 1; page <= pages; page++) {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&page=${page}&language=en-US`
      );
      
      if (!response.ok) {
        console.error(`Failed to fetch page ${page}: ${response.statusText}`);
        continue;
      }
      
      const data = await response.json();
      allMovies.push(...data.results);
      console.log(`Fetched page ${page}: ${data.results.length} movies`);
      
      // Add delay to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 250));
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
    }
  }
  
  return allMovies;
}

async function importMoviesFromTMDB() {
  if (!TMDB_API_KEY) {
    console.error('TMDB_API_KEY is required');
    process.exit(1);
  }

  try {
    console.log('Fetching popular and trending movies from TMDB...');
    
    // Fetch movies from different endpoints
    const [popularMovies, topRatedMovies, nowPlayingMovies] = await Promise.all([
      fetchMoviesFromTMDB('/movie/popular', 5),
      fetchMoviesFromTMDB('/movie/top_rated', 3),
      fetchMoviesFromTMDB('/movie/now_playing', 2)
    ]);

    // Combine and deduplicate movies
    const allMovies = [...popularMovies, ...topRatedMovies, ...nowPlayingMovies];
    const uniqueMovies = new Map();
    
    allMovies.forEach(movie => {
      if (movie.title && movie.poster_path && movie.overview) {
        uniqueMovies.set(movie.id, movie);
      }
    });

    console.log(`Processing ${uniqueMovies.size} unique movies...`);

    // Check existing movies to avoid duplicates
    const existingMovies = await db.select({ title: movies.title, year: movies.year }).from(movies);
    const existingKeys = new Set(
      existingMovies.map(m => `${m.title.toLowerCase()}-${m.year}`)
    );

    const moviesToImport = [];
    let skipped = 0;

    for (const tmdbMovie of uniqueMovies.values()) {
      const year = new Date(tmdbMovie.release_date || '2000-01-01').getFullYear();
      const key = `${tmdbMovie.title.toLowerCase()}-${year}`;
      
      if (existingKeys.has(key)) {
        skipped++;
        continue;
      }

      const movieData = {
        title: tmdbMovie.title,
        genre: getGenreFromTMDB(tmdbMovie.genre_ids),
        mood: assignMoodFromTMDB(tmdbMovie),
        isKidFriendly: isMovieKidFriendly(tmdbMovie),
        image: `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`,
        description: tmdbMovie.overview,
        year: year,
        rating: Math.round(tmdbMovie.vote_average * 10) / 10
      };

      moviesToImport.push(movieData);
    }

    console.log(`Skipped ${skipped} existing movies`);
    console.log(`Importing ${moviesToImport.length} new movies...`);

    if (moviesToImport.length > 0) {
      const result = await db.insert(movies).values(moviesToImport).returning();
      console.log(`Successfully imported ${result.length} movies!`);

      // Show summary by genre
      const genreCounts = {};
      result.forEach(movie => {
        genreCounts[movie.genre] = (genreCounts[movie.genre] || 0) + 1;
      });

      console.log('\nNew movies by genre:');
      Object.entries(genreCounts).forEach(([genre, count]) => {
        console.log(`  ${genre}: ${count} movies`);
      });

      // Show total count
      const totalMovies = await db.select().from(movies);
      console.log(`\nTotal movies in database: ${totalMovies.length}`);
    } else {
      console.log('No new movies to import.');
    }

  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    process.exit(0);
  }
}

importMoviesFromTMDB();