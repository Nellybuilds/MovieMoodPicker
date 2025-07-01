import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Sparkles, Loader2 } from "lucide-react";

interface MoodInputProps {
  onMoodSubmit: (moodText: string) => void;
  isLoading: boolean;
}

function getPersonalizedGreeting(): string {
  const hour = new Date().getHours();
  const dayOfWeek = new Date().getDay();
  const month = new Date().getMonth();
  const date = new Date().getDate();
  
  // Check for holidays
  const isChristmasTime = month === 11 && date >= 20;
  const isNewYearTime = (month === 11 && date >= 28) || (month === 0 && date <= 5);
  const isValentinesDay = month === 1 && date === 14;
  const isHalloween = month === 9 && date === 31;
  
  let greeting = "";
  let timeContext = "";
  
  // Time-based greeting
  if (hour < 12) {
    greeting = "Good morning, Shanell!";
  } else if (hour < 17) {
    greeting = "Good afternoon, Shanell!";
  } else {
    greeting = "Good evening, Shanell!";
  }
  
  // Add holiday context
  if (isChristmasTime) {
    timeContext = " Hope you're enjoying the holiday season.";
  } else if (isNewYearTime) {
    timeContext = " Happy New Year! What better way to celebrate than with a great movie?";
  } else if (isValentinesDay) {
    timeContext = " Perfect day for a romantic movie!";
  } else if (isHalloween) {
    timeContext = " Ready for some spooky movie magic?";
  } else if (dayOfWeek === 5) { // Friday
    timeContext = " Ready to kick off the weekend with a great movie?";
  } else if (dayOfWeek === 6 || dayOfWeek === 0) { // Weekend
    timeContext = " Perfect weekend vibes for movie watching!";
  } else {
    timeContext = " Ready to find your next favorite movie?";
  }
  
  return greeting + timeContext;
}

export function MoodInput({ onMoodSubmit, isLoading }: MoodInputProps) {
  const [moodText, setMoodText] = useState("");

  const handleSubmit = () => {
    if (moodText.trim()) {
      onMoodSubmit(moodText.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };



  return (
    <Card className="tubi-card mb-8 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-gradient-to-br from-yellow-400/20 to-purple-500/20">
            <MessageSquare className="w-6 h-6 text-yellow-400" />
          </div>
          <h3 className="text-2xl font-display font-semibold bg-gradient-to-r from-yellow-400 to-purple-400 bg-clip-text text-transparent">
            {getPersonalizedGreeting()}
          </h3>
        </div>
        
        <p className="text-purple-100 mb-4 leading-relaxed">
          Describe your mood in your own words, and I'll find the perfect movies to match how you feel.
        </p>

        <div className="space-y-4">
          <Textarea
            value={moodText}
            onChange={(e) => setMoodText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="So, Shanell, how ya feeling?"
            className="min-h-[100px] bg-purple-900/20 border-purple-500/40 text-purple-100 placeholder:text-purple-300 focus:border-yellow-400 focus:ring-yellow-400/20 resize-none"
            disabled={isLoading}
          />

          <Button
            onClick={handleSubmit}
            disabled={!moodText.trim() || isLoading}
            className="tubi-purple-btn w-full py-3 font-display font-semibold text-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Finding perfect movies...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Get AI Recommendations
              </>
            )}
          </Button>
        </div>


      </CardContent>
    </Card>
  );
}