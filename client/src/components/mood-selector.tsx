import { Button } from "@/components/ui/button";

interface MoodSelectorProps {
  selectedMood: string | null;
  onMoodSelect: (mood: string | null) => void;
}

const moods = [
  { value: "happy", label: "😊 Happy", emoji: "😊" },
  { value: "sad", label: "😢 Sad", emoji: "😢" },
  { value: "adventurous", label: "🚀 Adventurous", emoji: "🚀" },
  { value: "scared", label: "😨 Scared", emoji: "😨" },
  { value: "chill", label: "😎 Chill", emoji: "😎" },
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
            transition-all duration-200 min-w-[120px] lg:min-w-[140px]
            ${selectedMood === mood.value
              ? 'bg-gradient-to-r from-purple-500 to-pink-600 border-purple-500 text-white'
              : 'bg-gray-800 hover:bg-gray-700 border-gray-600 hover:border-gray-500 text-white'
            }
          `}
        >
          {mood.label}
        </Button>
      ))}
    </div>
  );
}
