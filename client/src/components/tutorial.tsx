import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, HelpCircle } from "lucide-react";

export function Tutorial() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <HelpCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-gradient-to-br from-purple-900 to-purple-800 border-2 border-yellow-400/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-yellow-400">
              How to Find Your Perfect Movie 🎬
            </h2>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-4 text-purple-100">
            <div className="flex items-start gap-3">
              <span className="bg-yellow-400 text-black font-bold w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                1
              </span>
              <div>
                <h3 className="font-semibold text-yellow-300 mb-1">Describe Your Mood</h3>
                <p className="text-sm leading-relaxed">
                  Tell us how you're feeling in your own words. Be specific about your emotions, the vibe you want, or what kind of story appeals to you right now.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="bg-yellow-400 text-black font-bold w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                2
              </span>
              <div>
                <h3 className="font-semibold text-yellow-300 mb-1">Examples That Work Great</h3>
                <div className="text-sm space-y-1">
                  <p>• "I'm feeling nostalgic and want something cozy"</p>
                  <p>• "Need something uplifting after a tough day"</p>
                  <p>• "Want thrills but not too scary"</p>
                  <p>• "Looking for a fun family adventure"</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="bg-yellow-400 text-black font-bold w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                3
              </span>
              <div>
                <h3 className="font-semibold text-yellow-300 mb-1">Get Personalized Picks</h3>
                <p className="text-sm leading-relaxed">
                  Our AI analyzes your mood and matches you with 3 perfect movies from our collection of 242+ films, complete with confidence scores and reasoning.
                </p>
              </div>
            </div>

            <div className="bg-purple-800/50 rounded-lg p-4 mt-6">
              <p className="text-sm text-center text-purple-200">
                <span className="text-yellow-400 font-medium">Pro tip:</span> The more specific you are about your feelings and preferences, the better our recommendations will be!
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-8 py-2"
            >
              Got It! Let's Find Movies 🍿
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}