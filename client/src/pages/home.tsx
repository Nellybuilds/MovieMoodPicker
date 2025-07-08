import { useState } from "react";
import { MovieCard } from "@/components/movie-card";
import { MoodInput } from "@/components/mood-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getMoodBasedRecommendations, type MoodRecommendation } from "@/services/mood-recommendations";
import type { Movie } from "@/services/database";

export default function Home() {
  const [kidsOnly, setKidsOnly] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [moodRecommendations, setMoodRecommendations] = useState<MoodRecommendation[]>([]);
  const [moodAnalysis, setMoodAnalysis] = useState<string>("");
  const [isMoodLoading, setIsMoodLoading] = useState(false);

  const handleMoodSubmit = async (moodText: string) => {
    try {
      setIsMoodLoading(true);
      setSelectedMovie(null);
      setMoodRecommendations([]);
      setMoodAnalysis("");

      const response = await getMoodBasedRecommendations({
        moodText,
        kidsOnly
      });

      setMoodRecommendations(response.recommendations);
      setMoodAnalysis(response.moodAnalysis);
    } catch (error) {
      console.error('Error getting mood recommendations:', error);
    } finally {
      setIsMoodLoading(false);
    }
  };

  const selectMovieFromMoodRecommendations = (recommendation: MoodRecommendation) => {
    setSelectedMovie(recommendation.movie);
    setMoodRecommendations([]);
    setMoodAnalysis("");
  };

  const resetToHome = () => {
    setSelectedMovie(null);
    setMoodRecommendations([]);
    setMoodAnalysis("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-black">🎬</span>
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-display font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-purple-400 bg-clip-text text-transparent">
                Movie Mood Match
              </h1>
              <p className="text-purple-200 text-lg md:text-xl mt-2 font-body">
                Tell us how you feel, we promise not to judge 🤝
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full"></div>
          </div>
        </div>

        {/* Kids Only Toggle */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-purple-900/20 to-yellow-900/20 rounded-xl border border-purple-500/30">
            <Checkbox
              id="kids-only"
              checked={kidsOnly}
              onCheckedChange={(checked) => setKidsOnly(checked as boolean)}
              className="border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
            />
            <Label htmlFor="kids-only" className="text-yellow-100 font-medium cursor-pointer">
              Show only family-friendly movies
            </Label>
          </div>
        </div>

        {/* Main Content */}
        {selectedMovie ? (
          <div className="max-w-4xl mx-auto">
            <MovieCard 
              movie={selectedMovie} 
              onPickAnother={resetToHome}
            />
          </div>
        ) : (
          <>
            {/* Mood Input */}
            <div className="max-w-4xl mx-auto mb-12">
              <MoodInput 
                onMoodSubmit={handleMoodSubmit}
                isLoading={isMoodLoading}
              />
            </div>

            {/* Mood-based Recommendations */}
            {moodRecommendations.length > 0 && (
              <div className="max-w-6xl mx-auto mb-12">
                <h2 className="text-3xl font-display font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
                  Perfect Movies for Your Mood
                </h2>
                {moodAnalysis && (
                  <p className="text-center text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                    {moodAnalysis}
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {moodRecommendations.map((rec, index) => (
                    <div key={index} 
                         className="tubi-card p-6 rounded-2xl border-2 border-purple-500/30 hover:border-yellow-400/60 transition-all duration-300 cursor-pointer transform hover:scale-105"
                         onClick={() => selectMovieFromMoodRecommendations(rec)}>
                      <div className="flex items-center mb-4">
                        <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold mr-3">
                          #{rec.rank}
                        </span>
                        <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {Math.round(rec.confidence * 100)}% match
                        </span>
                      </div>
                      
                      <img 
                        src={rec.movie.image}
                        alt={`${rec.movie.title} poster`}
                        className="w-full h-48 object-cover rounded-lg mb-4 border border-purple-500/20"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          console.log(`Image failed to load for ${rec.movie.title}: ${rec.movie.image}`);
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450/6B21A8/FFC107?text=' + encodeURIComponent(rec.movie.title);
                        }}
                      />
                      
                      <h3 className="text-xl font-display font-bold text-yellow-400 mb-2">{rec.movie.title}</h3>
                      <p className="text-purple-100 text-sm mb-3 leading-relaxed">{rec.reasoning}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-purple-500/20 text-purple-200 px-2 py-1 rounded text-xs border border-purple-500/30">
                          {rec.movie.genre}
                        </span>
                        <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded text-xs border border-yellow-500/30">
                          {rec.movie.mood}
                        </span>
                        <span className="bg-gray-500/20 text-gray-200 px-2 py-1 rounded text-xs border border-gray-500/30">
                          {rec.movie.year}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}