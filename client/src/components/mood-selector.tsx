import { Button } from "@/components/ui/button";

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string | null) => void;
}

const moods = [
  { value: "Happy", label: "😊 Happy", emoji: "😊" },
  { value: "Sad", label: "😢 Sad", emoji: "😢" },
  { value: "Adventurous", label: "🚀 Adventurous", emoji: "🚀" },
  { value: "Scared", label: "😨 Scared", emoji: "😨" },
  { value: "Chill", label: "😎 Chill", emoji: "😎" },
];

export function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  const handleMoodClick = (mood: string) => {
    if (selectedMood === mood) {
      onMoodSelect(null); // Deselect if already selected
    } else {
      onMoodSelect(mood);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
      {moods.map((mood) => (
        <Button
          key={mood.value}
          onClick={() => handleMoodClick(mood.value)}
          className={`
            px-6 py-4 lg:px-8 lg:py-5 border-2 rounded-xl text-lg lg:text-xl font-medium 
            transition-all duration-300 min-w-[120px] lg:min-w-[140px] transform hover:scale-105
            ${selectedMood === mood.value
              ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 border-yellow-400 text-black font-bold shadow-lg shadow-yellow-400/30'
              : 'bg-gradient-to-br from-purple-900/30 to-purple-800/20 hover:from-purple-800/40 hover:to-purple-700/30 border-purple-500/40 hover:border-purple-400/60 text-purple-100 hover:text-white backdrop-blur-sm'
            }
          `}
        >
          {mood.label}
        </Button>
      ))}
    </div>
  );
}
