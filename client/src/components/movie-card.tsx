import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Movie } from "@/data/movies";

interface MovieCardProps {
  movie: Movie;
  onPickAnother: () => void;
}

export function MovieCard({ movie, onPickAnother }: MovieCardProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-[hsl(var(--dark-secondary))] rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Movie Poster */}
            <div className="lg:w-1/3">
              <img 
                src={movie.image}
                alt={`${movie.title} poster`}
                className="w-full h-64 lg:h-full object-cover"
                onError={(e) => {
                  // Fallback to a placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1489599516274-2155376b8c9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200";
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
                <Badge className="px-3 py-1 bg-[hsl(var(--tubi-blue))] text-white text-sm font-medium rounded-full">
                  {movie.genre}
                </Badge>
                <Badge className="px-3 py-1 bg-[hsl(var(--tubi-purple))] text-white text-sm font-medium rounded-full">
                  {movie.mood}
                </Badge>
                {movie.isKidFriendly && (
                  <Badge className="px-3 py-1 bg-emerald-600 text-white text-sm font-medium rounded-full">
                    Kid Friendly
                  </Badge>
                )}
              </div>
              
              {/* Description */}
              <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-6">
                {movie.description}
              </p>
              
              {/* Pick Another Button */}
              <Button 
                onClick={onPickAnother}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300"
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
