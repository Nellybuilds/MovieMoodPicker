import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { TubiMovie } from "@/data/tubi-movies";
import type { AIRecommendation } from "@/services/openrouter";

interface MovieCardProps {
  movie: TubiMovie;
  onPickAnother: () => void;
  aiInsight?: AIRecommendation | null;
}

export function MovieCard({ movie, onPickAnother, aiInsight }: MovieCardProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Movie Poster */}
            <div className="lg:w-1/3">
              <img 
                src={movie.image}
                alt={`${movie.title} poster`}
                className="w-full h-64 lg:h-full object-cover"
                crossOrigin="anonymous"
                onError={(e) => {
                  console.log(`Image failed to load for ${movie.title}: ${movie.image}`);
                  const target = e.target as HTMLImageElement;
                  // Try alternative TMDB image sizes
                  if (target.src.includes('w500')) {
                    target.src = target.src.replace('w500', 'w342');
                  } else if (target.src.includes('w342')) {
                    target.src = target.src.replace('w342', 'w185');
                  } else if (target.src.includes('w185')) {
                    target.src = target.src.replace('w185', 'original');
                  } else {
                    // Only use placeholder as final fallback
                    target.src = `https://via.placeholder.com/400x600/1a1a1a/ffffff?text=${encodeURIComponent(movie.title)}`;
                  }
                }}
              />
            </div>
            
            {/* Movie Details */}
            <div className="lg:w-2/3 p-6 lg:p-8">
              <h3 className="text-2xl lg:text-4xl font-bold mb-4 text-white">
                {movie.title}
              </h3>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="px-3 py-1 bg-gray-700 text-white text-sm font-medium rounded-full border border-gray-600">
                  {movie.genre}
                </Badge>
                <Badge className="px-3 py-1 bg-gray-700 text-white text-sm font-medium rounded-full border border-gray-600">
                  {movie.mood}
                </Badge>
                {movie.isKidFriendly && (
                  <Badge className="px-3 py-1 bg-emerald-700 text-white text-sm font-medium rounded-full border border-emerald-600">
                    Kid Friendly
                  </Badge>
                )}
              </div>
              
              {/* Description */}
              <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-6">
                {movie.description}
              </p>

              {/* AI Insights */}
              {aiInsight && (
                <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 text-sm font-medium mr-2">🤖 AI Recommendation</span>
                    <Badge className="px-2 py-1 bg-yellow-600 text-black text-xs">
                      {Math.round(aiInsight.confidence * 100)}% match
                    </Badge>
                  </div>
                  <p className="text-yellow-100 text-sm mb-2">{aiInsight.reasoning}</p>
                  <p className="text-yellow-200 text-xs">{aiInsight.watchContext}</p>
                </div>
              )}
              
              {/* Pick Another Button */}
              <Button 
                onClick={onPickAnother}
                className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-black font-semibold rounded-lg transition-colors duration-300"
              >
                Pick Another
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
