import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, HelpCircle, ArrowDown, ArrowLeft } from "lucide-react";

export function Tutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Hey there, movie lover! 🎬",
      content: "Ready to find your next obsession? I'm your personal movie matchmaker, and I promise I won't judge your weird moods. Let's do this!",
      highlight: null,
      position: "center"
    },
    {
      title: "Step 1: Spill Your Feelings 💭",
      content: "Right here! Tell me EXACTLY how you're feeling. Are you \"dead inside but need hope\"? \"Craving chaos but make it fun\"? The weirder, the better - I live for this stuff!",
      highlight: "mood-input",
      position: "bottom"
    },
    {
      title: "Step 2: The Family-Friendly Switch 👨‍👩‍👧‍👦",
      content: "Got tiny humans around? Toggle this bad boy ON and I'll keep things G-rated. No awkward moments during family movie night!",
      highlight: "kids-toggle",
      position: "top"
    },
    {
      title: "Step 3: The Magic Button ✨",
      content: "This beauty right here? It's where the magic happens. One click and I'll serve you 3 perfectly matched movies with all the juicy details about why they're perfect for you!",
      highlight: "submit-button",
      position: "top"
    },
    {
      title: "You're officially a pro! 🍿",
      content: "That's it! You're now ready to discover movies that'll hit different. Go ahead, tell me about that oddly specific mood you're in - I'm here for ALL of it!",
      highlight: null,
      position: "center"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
      setCurrentStep(0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentStep(0);
  };

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

  const currentStepData = steps[currentStep];
  
  const getCalloutPosition = () => {
    if (!currentStepData.highlight) return {};
    
    const element = document.getElementById(currentStepData.highlight);
    if (!element) return {};
    
    const rect = element.getBoundingClientRect();
    const position = currentStepData.position;
    
    if (position === "bottom") {
      return {
        top: rect.bottom + 20,
        left: rect.left + rect.width / 2,
        transform: "translateX(-50%)"
      };
    } else if (position === "top") {
      return {
        top: rect.top - 20,
        left: rect.left + rect.width / 2,
        transform: "translateX(-50%) translateY(-100%)"
      };
    }
    return {};
  };

  return (
    <>
      {/* Overlay and highlight */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Light overlay */}
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Highlight specific element */}
          {currentStepData.highlight && (
            <div
              className="absolute border-4 border-yellow-400 rounded-lg shadow-lg pointer-events-none"
              style={{
                ...(() => {
                  const element = document.getElementById(currentStepData.highlight);
                  if (!element) return {};
                  const rect = element.getBoundingClientRect();
                  return {
                    top: rect.top - 8,
                    left: rect.left - 8,
                    width: rect.width + 16,
                    height: rect.height + 16,
                  };
                })()
              }}
            />
          )}
          
          {/* Tutorial card */}
          <div
            className={`absolute ${
              currentStepData.position === "center" 
                ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                : ""
            }`}
            style={currentStepData.position !== "center" ? getCalloutPosition() : {}}
          >
            <Card className="max-w-md bg-gradient-to-br from-purple-900 to-purple-800 border-2 border-yellow-400/50 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-display font-bold text-yellow-400">
                    {currentStepData.title}
                  </h3>
                  <Button
                    onClick={closeModal}
                    variant="ghost"
                    size="sm"
                    className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                    title="Skip the tour (but why would you?)"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-purple-100 text-sm leading-relaxed mb-6">
                  {currentStepData.content}
                </p>

                {/* Arrow pointing to highlighted element */}
                {currentStepData.highlight && (
                  <div className="absolute">
                    {currentStepData.position === "bottom" && (
                      <ArrowDown className="w-6 h-6 text-yellow-400 -top-8 left-1/2 transform -translate-x-1/2" style={{ position: 'absolute' }} />
                    )}
                    {currentStepData.position === "top" && (
                      <ArrowDown className="w-6 h-6 text-yellow-400 -bottom-8 left-1/2 transform -translate-x-1/2 rotate-180" style={{ position: 'absolute' }} />
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentStep ? "bg-yellow-400" : "bg-purple-400/50"
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    {currentStep > 0 && (
                      <Button
                        onClick={prevStep}
                        variant="outline"
                        size="sm"
                        className="border-purple-400 text-purple-200 hover:bg-purple-400/20"
                      >
                        Oops, go back
                      </Button>
                    )}
                    <Button
                      onClick={nextStep}
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold"
                      size="sm"
                    >
                      {currentStep === steps.length - 1 ? "Let's do this! 🚀" : "Show me more! 👀"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}