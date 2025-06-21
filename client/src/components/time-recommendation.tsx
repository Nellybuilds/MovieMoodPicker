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
    <Card className="tubi-card mb-6 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1 p-2 rounded-full bg-gradient-to-br from-yellow-400/20 to-purple-500/20">
            <Clock className="w-6 h-6 text-yellow-400" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-display font-semibold bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
                {greeting}! Perfect time for {timeRec.timeContext.toLowerCase()}
              </h3>
              <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1">
                {timeRec.timeContext}
              </Badge>
            </div>
            
            <p className="text-purple-100 mb-4 leading-relaxed">
              {timeRec.reasoning}
            </p>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-yellow-500/10 px-3 py-1 rounded-lg border border-yellow-500/20">
                <span className="text-sm text-yellow-300 font-medium">Mood:</span>
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-semibold">
                  {timeRec.primaryMood}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/20">
                <span className="text-sm text-purple-300 font-medium">Genres:</span>
                {timeRec.preferredGenres.slice(0, 2).map((genre) => (
                  <Badge key={genre} className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm">
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
                className="tubi-yellow-btn px-6 py-3 font-display font-semibold"
              >
                <Lightbulb className="w-5 h-5 mr-2" />
                Try This
              </Button>
            ) : (
              <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 text-sm font-semibold">
                Applied ✓
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}