const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  adult: boolean;
  vote_average: number;
  release_date: string;
}

export interface Movie {
  title: string;
  genre: string;
  mood: string;
  isKidFriendly: boolean;
  image: string;
  description: string;
}

// TMDB Genre mapping
const GENRE_MAP: { [key: number]: string } = {
  28: 'Action',
  12: 'Action', // Adventure -> Action
  16: 'Family', // Animation -> Family
  35: 'Comedy',
  80: 'Action', // Crime -> Action
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Family', // Fantasy -> Family
  36: 'Documentary', // History -> Documentary
  27: 'Horror',
  10402: 'Drama', // Music -> Drama
  9648: 'Horror', // Mystery -> Horror
  10749: 'Romance',
  878: 'Action', // Science Fiction -> Action
  10770: 'Drama', // TV Movie -> Drama
  53: 'Horror', // Thriller -> Horror
  10752: 'Action', // War -> Action
  37: 'Action', // Western -> Action
};

// Mood assignment based on genre and other factors
function assignMood(movie: TMDBMovie): string {
  const primaryGenre = movie.genre_ids[0];
  const rating = movie.vote_average;
  
  // Horror -> Scared
  if (movie.genre_ids.includes(27) || movie.genre_ids.includes(53)) {
    return 'Scared';
  }
  
  // Comedy -> Happy
  if (movie.genre_ids.includes(35)) {
    return 'Happy';
  }
  
  // Action/Adventure -> Adventurous
  if (movie.genre_ids.includes(28) || movie.genre_ids.includes(12)) {
    return 'Adventurous';
  }
  
  // Romance -> Happy or Sad based on rating
  if (movie.genre_ids.includes(10749)) {
    return rating > 7 ? 'Happy' : 'Sad';
  }
  
  // Drama -> Sad or Chill based on rating
  if (movie.genre_ids.includes(18)) {
    return rating < 6.5 ? 'Sad' : 'Chill';
  }
  
  // Family/Animation -> Happy
  if (movie.genre_ids.includes(10751) || movie.genre_ids.includes(16)) {
    return 'Happy';
  }
  
  // Documentary -> Chill
  if (movie.genre_ids.includes(99)) {
    return 'Chill';
  }
  
  // Default based on rating
  if (rating > 7.5) return 'Happy';
  if (rating < 5.5) return 'Sad';
  return 'Chill';
}

function getGenreFromIds(genreIds: number[]): string {
  for (const id of genreIds) {
    if (GENRE_MAP[id]) {
      return GENRE_MAP[id];
    }
  }
  return 'Drama'; // Default genre
}

function transformTMDBMovie(tmdbMovie: TMDBMovie): Movie {
  const genre = getGenreFromIds(tmdbMovie.genre_ids);
  const mood = assignMood(tmdbMovie);
  const isKidFriendly = !tmdbMovie.adult && (
    tmdbMovie.genre_ids.includes(10751) || // Family
    tmdbMovie.genre_ids.includes(16) || // Animation
    tmdbMovie.genre_ids.includes(35) // Comedy (some comedies are kid-friendly)
  );

  return {
    title: tmdbMovie.title,
    genre,
    mood,
    isKidFriendly,
    image: tmdbMovie.poster_path 
      ? `${TMDB_IMAGE_BASE_URL}${tmdbMovie.poster_path}`
      : 'https://images.unsplash.com/photo-1489599516274-2155376b8c9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200',
    description: tmdbMovie.overview || 'An exciting movie that will entertain you.'
  };
}

export async function fetchMovies(): Promise<Movie[]> {
  if (!TMDB_API_KEY) {
    throw new Error('TMDB API key is not configured');
  }

  const movies: Movie[] = [];
  
  try {
    // Fetch popular movies from multiple pages to get variety
    for (let page = 1; page <= 10; page++) {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}&language=en-US`
      );
      
      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }
      
      const data = await response.json();
      const transformedMovies = data.results.map(transformTMDBMovie);
      movies.push(...transformedMovies);
    }

    // Also fetch some top-rated movies for quality content
    for (let page = 1; page <= 5; page++) {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&page=${page}&language=en-US`
      );
      
      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }
      
      const data = await response.json();
      const transformedMovies = data.results.map(transformTMDBMovie);
      movies.push(...transformedMovies);
    }

    // Remove duplicates based on title
    const uniqueMovies = movies.filter((movie, index, self) => 
      index === self.findIndex(m => m.title === movie.title)
    );

    return uniqueMovies;
  } catch (error) {
    console.error('Error fetching movies from TMDB:', error);
    throw error;
  }
}

export async function searchMoviesByGenre(genre: string): Promise<Movie[]> {
  if (!TMDB_API_KEY) {
    throw new Error('TMDB API key is not configured');
  }

  // Map our genres to TMDB genre IDs
  const genreIdMap: { [key: string]: number[] } = {
    'Action': [28, 12], // Action + Adventure
    'Comedy': [35],
    'Romance': [10749],
    'Horror': [27, 53], // Horror + Thriller
    'Drama': [18],
    'Family': [10751, 16], // Family + Animation
    'Documentary': [99]
  };

  const genreIds = genreIdMap[genre] || [18]; // Default to Drama
  
  try {
    const movies: Movie[] = [];
    
    for (const genreId of genreIds) {
      const response = await fetch(
        `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=1&language=en-US`
      );
      
      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }
      
      const data = await response.json();
      const transformedMovies = data.results.map(transformTMDBMovie);
      movies.push(...transformedMovies);
    }

    return movies;
  } catch (error) {
    console.error('Error searching movies by genre:', error);
    throw error;
  }
}