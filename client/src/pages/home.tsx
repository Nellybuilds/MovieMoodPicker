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
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const pickRandomMovie = () => {
    const availableMovies = getTubiMovies({
      genre: selectedGenre || undefined,
      mood: selectedMood || undefined,
      kidsOnly: kidsOnly
    });

    if (availableMovies.length === 0) {
      const randomMovie = getRandomTubiMovie();
      setSelectedMovie(randomMovie);
    } else {
      const randomMovie = availableMovies[Math.floor(Math.random() * availableMovies.length)];
      setSelectedMovie(randomMovie);
    }
    
    setAiInsight(null);
    setAiRecommendations([]);
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
        pickRandomMovie();
        return;
      }

      const moviesForAI = availableMovies.map(movie => ({
        title: movie.title,
        description: movie.description,
        rating: movie.rating,
        genre: movie.genre,
        mood: movie.mood,
        isKidFriendly: movie.isKidFriendly,
        year: movie.year,
        image: movie.image
      }));

      const response = await fetch('/api/ai-recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movies: moviesForAI,
          mood: selectedMood || '',
          genre: selectedGenre || '',
          kidsOnly: kidsOnly,
          previouslyWatched: [],
          userPreferences: 'Find me something great based on my mood and genre preferences'
        })
      });

      if (!response.ok) {
        throw new Error(`AI recommendation failed: ${response.status}`);
      }

      const result = await response.json();
      
      // Use server recommendations directly (they already contain the full movie objects)
      console.log('Received recommendations:', result.recommendations);
      console.log('Number of recommendations:', result.recommendations.length);
      setAiRecommendations(result.recommendations);
      setSelectedMovie(null);
      setAiInsight(null);
    } catch (error) {
      console.error('AI recommendation failed:', error);
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
    setAiRecommendations([]);
  };

  const selectMovieFromRecommendations = (movie: TubiMovie) => {
    setSelectedMovie(movie);
    setAiRecommendations([]);
    setAiInsight(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Movies By the Mood
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover authentic movies from Tubi's catalog based on your current mood and preferences
          </p>
        </div>

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
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="kids-only" 
                    checked={kidsOnly}
                    onCheckedChange={(checked) => setKidsOnly(checked === true)}
                  />
                  <Label htmlFor="kids-only" className="text-lg">
                    Kids & Family Only
                  </Label>
                </div>
                
                <Button
                  onClick={pickRandomMovie}
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold px-6 py-2 text-base w-full shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Shuffle className="mr-2 h-4 w-4" />
                  Surprise Me
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={pickAIMovie}
              disabled={isAiLoading}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold px-8 py-4 text-lg min-w-[200px] shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              {isAiLoading ? 'Finding Perfect Match...' : 'Find My Match'}
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

        {/* AI Recommendations */}
        {aiRecommendations.length > 0 && (
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-orange-400">Your Perfect Matches</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-200 cursor-pointer"
                     onClick={() => selectMovieFromRecommendations(rec.movie)}>
                  <div className="flex items-center mb-4">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">
                      #{rec.rank}
                    </span>
                    <span className="text-purple-400 text-sm font-medium">
                      {Math.round(rec.confidence * 100)}% match
                    </span>
                  </div>
                  
                  <div className="w-full h-48 rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">
                        {rec.movie.genre === 'Action' && '⚡'}
                        {rec.movie.genre === 'Horror' && '🎭'}
                        {rec.movie.genre === 'Comedy' && '😄'}
                        {rec.movie.genre === 'Romance' && '💖'}
                        {rec.movie.genre === 'Drama' && '🎬'}
                        {rec.movie.genre === 'Family' && '👨‍👩‍👧‍👦'}
                        {rec.movie.genre === 'Documentary' && '📚'}
                        {!['Action', 'Horror', 'Comedy', 'Romance', 'Drama', 'Family', 'Documentary'].includes(rec.movie.genre) && '🎥'}
                      </div>
                      <h4 className="text-white font-bold text-sm leading-tight">{rec.movie.title}</h4>
                      <p className="text-gray-300 text-xs mt-1">{rec.movie.year}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-white">{rec.movie.title}</h3>
                  
                  <div className="flex gap-2 mb-3">
                    <span className="px-2 py-1 bg-gray-700 text-white text-xs rounded-full">
                      {rec.movie.genre}
                    </span>
                    <span className="px-2 py-1 bg-gray-700 text-white text-xs rounded-full">
                      {rec.movie.mood}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {rec.reasoning}
                  </p>
                  
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                    Watch This
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Single Movie Result */}
        {selectedMovie && aiRecommendations.length === 0 && (
          <div className="max-w-4xl mx-auto">
            <MovieCard 
              movie={selectedMovie} 
              onPickAnother={handlePickAnother}
              aiInsight={aiInsight}
            />
          </div>
        )}

        {/* No Selection State */}
        {!selectedMovie && aiRecommendations.length === 0 && (
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