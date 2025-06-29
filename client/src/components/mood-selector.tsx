import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-display font-semibold text-yellow-400 text-center">How are you feeling?</h3>
      <Select value={selectedMood || ""} onValueChange={(value) => onMoodSelect(value || null)}>
        <SelectTrigger className="w-full bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-2 border-purple-500/40 hover:border-purple-400/60 text-purple-100 hover:text-white backdrop-blur-sm rounded-xl py-4 text-lg">
          <SelectValue placeholder="Select your mood..." />
        </SelectTrigger>
        <SelectContent className="bg-gradient-to-br from-purple-900 to-purple-800 border-2 border-purple-500/40 backdrop-blur-sm">
          {moods.map(mood => (
            <SelectItem 
              key={mood.value} 
              value={mood.value}
              className="text-purple-100 hover:bg-purple-500/20 hover:text-white focus:bg-purple-500/20 focus:text-white text-lg py-3"
            >
              {mood.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
