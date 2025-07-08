import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Movie } from "@/services/database";
import type { AIRecommendation } from "@/services/openrouter";

interface MovieCardProps {
  movie: Movie;
  onPickAnother: () => void;
  aiInsight?: AIRecommendation | null;
}

export function MovieCard({ movie, onPickAnother, aiInsight }: MovieCardProps) {
  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <Card className="tubi-card rounded-3xl overflow-hidden shadow-2xl border-2 border-purple-500/30 tubi-hover-effect">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Movie Poster */}
            <div className="lg:w-1/3 relative bg-gradient-to-br from-purple-900/30 to-gray-800/30">
              <img 
                src={movie.image}
                alt={`${movie.title} poster`}
                className="w-full h-64 lg:h-full object-cover transition-opacity duration-300"
                crossOrigin="anonymous"
                loading="lazy"
                onLoad={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.opacity = '1';
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.opacity = '0.7';
                  // Create elegant fallback with movie title
                  target.src = `data:image/svg+xml,${encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
                      <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style="stop-color:#7c3aed;stop-opacity:0.8" />
                          <stop offset="100%" style="stop-color:#1f2937;stop-opacity:0.9" />
                        </linearGradient>
                      </defs>
                      <rect width="400" height="600" fill="url(#grad)"/>
                      <text x="200" y="280" text-anchor="middle" fill="white" font-size="24" font-weight="bold" font-family="Arial, sans-serif">
                        ${movie.title.length > 20 ? movie.title.substring(0, 20) + '...' : movie.title}
                      </text>
                      <text x="200" y="320" text-anchor="middle" fill="#fbbf24" font-size="16" font-family="Arial, sans-serif">
                        ${movie.genre} • ${movie.mood}
                      </text>
                    </svg>
                  `)}`;
                }}
                style={{ opacity: '0' }}
              />
            </div>
            
            {/* Movie Details */}
            <div className="lg:w-2/3 p-6 lg:p-8">
              <h3 className="text-2xl lg:text-4xl font-display font-bold mb-4 text-white">
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
              <p className="text-gray-300 text-base lg:text-lg font-body leading-relaxed mb-6">
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
                className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-black font-display font-semibold rounded-lg transition-colors duration-300"
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
