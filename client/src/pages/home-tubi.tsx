import { useState } from "react";
import { MoodSelector } from "@/components/mood-selector";
import { GenreSelector } from "@/components/genre-selector";
import { MovieCard } from "@/components/movie-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getTubiMovies, getRandomTubiMovie, type TubiMovie } from "@/data/tubi-movies";
import { getAIMovieRecommendation, type AIRecommendation } from "@/services/openrouter";
import { Shuffle, Sparkles } from "lucide-react";

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [kidsOnly, setKidsOnly] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<TubiMovie | null>(null);
  const [aiInsight, setAiInsight] = useState<AIRecommendation | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const pickRandomMovie = () => {
    const availableMovies = getTubiMovies({
      genre: selectedGenre || undefined,
      mood: selectedMood || undefined,
      kidsOnly: kidsOnly
    });

    if (availableMovies.length === 0) {
      // If no movies match criteria, pick from all movies
      const randomMovie = getRandomTubiMovie();
      setSelectedMovie(randomMovie);
    } else {
      const randomMovie = availableMovies[Math.floor(Math.random() * availableMovies.length)];
      setSelectedMovie(randomMovie);
    }
    
    setAiInsight(null);
  };

  const pickAIMovie = async () => {
    try {
      setIsAiLoading(true);
      setAiInsight(null);

      const availableMovies = getTubiMovies({
        genre: selectedGenre || undefined,
        mood: selectedMood || undefined,
        kidsOnly: kidsOnly
      });

      if (availableMovies.length === 0) {
        // Fall back to random selection if no movies match criteria
        pickRandomMovie();
        return;
      }

      // Convert TubiMovie to format expected by AI service
      const moviesForAI = availableMovies.map(movie => ({
        title: movie.title,
        overview: movie.description,
        vote_average: movie.rating,
        genre_ids: [], // We'll handle genre mapping in the service
        adult: !movie.isKidFriendly,
        release_date: movie.year.toString()
      }));

      const result = await getAIMovieRecommendation(moviesForAI, {
        mood: selectedMood || '',
        genre: selectedGenre || '',
        kidsOnly: kidsOnly,
        previouslyWatched: selectedMovie ? [selectedMovie.title] : [],
        userPreferences: 'I want something authentic from Tubi\'s catalog'
      });

      // Find the matching TubiMovie
      const recommendedTubiMovie = availableMovies.find(movie => 
        movie.title.toLowerCase() === result.movie.title.toLowerCase()
      ) || availableMovies[0];

      setSelectedMovie(recommendedTubiMovie);
      setAiInsight(result.aiInsight);
    } catch (error) {
      console.error('AI recommendation failed:', error);
      // Fall back to random selection
      pickRandomMovie();
    } finally {
      setIsAiLoading(false);
    }
  };

  const handlePickAnother = () => {
    pickRandomMovie();
  };

  const resetFilters = () => {
    setSelectedMood(null);
    setSelectedGenre(null);
    setKidsOnly(false);
    setSelectedMovie(null);
    setAiInsight(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Movies By the Mood
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover authentic movies from Tubi's catalog based on your current mood and preferences
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-orange-400">How are you feeling?</h3>
              <MoodSelector 
                selectedMood={selectedMood} 
                onMoodSelect={setSelectedMood} 
              />
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-orange-400">What genre?</h3>
              <GenreSelector 
                selectedGenre={selectedGenre} 
                onGenreSelect={setSelectedGenre} 
              />
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-orange-400">Additional Options</h3>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="kids-only" 
                  checked={kidsOnly}
                  onCheckedChange={setKidsOnly}
                />
                <Label htmlFor="kids-only" className="text-lg">
                  Kids & Family Only
                </Label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={pickRandomMovie}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold px-8 py-4 text-lg min-w-[200px] shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Shuffle className="mr-2 h-5 w-5" />
              Random Pick
            </Button>
            
            <Button
              onClick={pickAIMovie}
              disabled={isAiLoading}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold px-8 py-4 text-lg min-w-[200px] shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              {isAiLoading ? 'AI Thinking...' : 'AI Pick'}
            </Button>
            
            <Button
              onClick={resetFilters}
              variant="outline"
              size="lg"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 text-lg min-w-[200px]"
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Movie Result */}
        {selectedMovie && (
          <div className="max-w-4xl mx-auto">
            <MovieCard 
              movie={selectedMovie} 
              onPickAnother={handlePickAnother}
              aiInsight={aiInsight}
            />
          </div>
        )}

        {/* No Selection State */}
        {!selectedMovie && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🎬</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-300">Ready to discover your next movie?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose your mood and genre preferences above, then let us find the perfect movie from Tubi's authentic catalog.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}