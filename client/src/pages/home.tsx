import { useState, useEffect } from "react";
import { MoodSelector } from "@/components/mood-selector";
import { GenreSelector } from "@/components/genre-selector";
import { MovieCard } from "@/components/movie-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { fetchMovies, type Movie } from "@/services/tmdb";

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [kidsOnly, setKidsOnly] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load movies from TMDB on component mount
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const tmdbMovies = await fetchMovies();
        setMovies(tmdbMovies);
      } catch (err) {
        console.error('Failed to load movies:', err);
        setError('Failed to load movies. Please check your internet connection and try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  const pickRandomMovie = () => {
    if (movies.length === 0) {
      setError('No movies available. Please try again later.');
      return;
    }

    let filteredMovies = movies;

    // Filter by mood if selected
    if (selectedMood) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.mood.toLowerCase() === selectedMood.toLowerCase()
      );
    }

    // Filter by genre if selected
    if (selectedGenre) {
      filteredMovies = filteredMovies.filter(movie => 
        movie.genre.toLowerCase() === selectedGenre.toLowerCase()
      );
    }

    // Filter by kids only if checked
    if (kidsOnly) {
      filteredMovies = filteredMovies.filter(movie => movie.isKidFriendly);
    }

    if (filteredMovies.length === 0) {
      setError('No movies found matching your criteria. Try different selections!');
      return;
    }

    // Pick random movie from filtered results
    const randomMovie = filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
    setSelectedMovie(randomMovie);
    setError(null);

    // Scroll to movie result
    setTimeout(() => {
      const movieResult = document.getElementById('movieResult');
      if (movieResult) {
        movieResult.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const pickAnotherMovie = () => {
    pickRandomMovie();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--dark-bg))] via-[hsl(var(--dark-secondary))] to-[hsl(var(--dark-bg))]">
      {/* Header */}
      <header className="text-center py-8 lg:py-12">
        <h1 className="text-4xl lg:text-6xl font-bold mb-2 text-white">
          What Should I Watch?
        </h1>
        <p className="text-lg lg:text-xl text-gray-300 animate-float">
          Movies By the Mood
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
        {/* Mood Selector */}
        <section className="mb-8 lg:mb-12 animate-fade-in">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-center text-gray-200">
            How are you feeling?
          </h2>
          <MoodSelector 
            selectedMood={selectedMood} 
            onMoodSelect={setSelectedMood} 
          />
        </section>

        {/* Genre Selector */}
        <section 
          className="mb-8 lg:mb-12 animate-fade-in" 
          style={{ animationDelay: '0.2s' }}
        >
          <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-center text-gray-200">
            What genre fits your vibe?
          </h2>
          <GenreSelector 
            selectedGenre={selectedGenre} 
            onGenreSelect={setSelectedGenre} 
          />
        </section>

        {/* Filter Options */}
        <section 
          className="mb-8 lg:mb-12 text-center animate-fade-in" 
          style={{ animationDelay: '0.4s' }}
        >
          <div className="inline-flex items-center space-x-3 text-lg lg:text-xl cursor-pointer hover:text-[hsl(var(--tubi-purple))] transition-colors duration-300">
            <Checkbox 
              id="kidsOnly" 
              checked={kidsOnly}
              onCheckedChange={(checked) => setKidsOnly(checked === true)}
              className="w-5 h-5 lg:w-6 lg:h-6 border-gray-500 data-[state=checked]:bg-[hsl(var(--tubi-purple))] data-[state=checked]:border-[hsl(var(--tubi-purple))]"
            />
            <Label htmlFor="kidsOnly" className="select-none cursor-pointer">
              Kids Titles Only
            </Label>
          </div>
        </section>

        {/* Action Button */}
        <section 
          className="text-center mb-12 animate-fade-in" 
          style={{ animationDelay: '0.6s' }}
        >
          <Button 
            onClick={pickRandomMovie}
            className="px-12 py-6 lg:px-16 lg:py-8 bg-gradient-to-r from-[hsl(var(--tubi-purple))] to-[hsl(var(--tubi-blue))] hover:from-[hsl(var(--tubi-blue))] hover:to-[hsl(var(--tubi-purple))] text-white text-xl lg:text-2xl font-bold rounded-2xl transition-all duration-300 hover:scale-105 transform border-0 shadow-lg"
            style={{ color: 'white !important' }}
          >
            🎬 Pick Something
          </Button>
        </section>

        {/* Movie Result */}
        {selectedMovie && (
          <section id="movieResult" className="animate-slide-up">
            <MovieCard 
              movie={selectedMovie} 
              onPickAnother={pickAnotherMovie} 
            />
          </section>
        )}
      </main>
    </div>
  );
}
