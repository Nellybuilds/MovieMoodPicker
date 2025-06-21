import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Lightbulb } from "lucide-react";
import { getTimeBasedRecommendation, getTimeGreeting, shouldShowTimeRecommendation } from "@/utils/timeRecommendations";

interface TimeRecommendationProps {
  onApplyRecommendation: (mood: string, genre: string) => void;
  selectedMood: string | null;
  selectedGenre: string | null;
}

export function TimeRecommendation({ onApplyRecommendation, selectedMood, selectedGenre }: TimeRecommendationProps) {
  if (!shouldShowTimeRecommendation()) {
    return null;
  }

  const timeRec = getTimeBasedRecommendation();
  const greeting = getTimeGreeting();
  
  const handleApplyRecommendation = () => {
    const recommendedGenre = timeRec.preferredGenres[0];
    onApplyRecommendation(timeRec.primaryMood, recommendedGenre);
  };

  const isAlreadySelected = selectedMood === timeRec.primaryMood && 
                           timeRec.preferredGenres.includes(selectedGenre || '');

  return (
    <Card className="bg-gradient-to-r from-yellow-400/10 to-amber-500/10 border-yellow-500/30 mb-6">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <Clock className="w-5 h-5 text-yellow-400" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-white">
                {greeting}! Perfect time for {timeRec.timeContext.toLowerCase()}
              </h3>
              <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                {timeRec.timeContext}
              </Badge>
            </div>
            
            <p className="text-gray-300 text-sm mb-3">
              {timeRec.reasoning}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400">Mood:</span>
                <Badge className="bg-yellow-500 text-black text-xs">
                  {timeRec.primaryMood}
                </Badge>
              </div>
              
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400">Genres:</span>
                {timeRec.preferredGenres.slice(0, 2).map((genre) => (
                  <Badge key={genre} variant="outline" className="border-gray-500 text-gray-300 text-xs">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            {!isAlreadySelected ? (
              <Button
                onClick={handleApplyRecommendation}
                size="sm"
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-medium hover:from-yellow-500 hover:to-amber-600"
              >
                <Lightbulb className="w-4 h-4 mr-1" />
                Try This
              </Button>
            ) : (
              <Badge className="bg-green-500 text-white">
                Applied
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}