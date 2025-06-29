import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GenreSelectorProps {
  selectedGenre: string | null;
  onGenreSelect: (genre: string | null) => void;
}

const genres = [
  { value: "Action", label: "⚔️ Action", emoji: "⚔️" },
  { value: "Comedy", label: "😂 Comedy", emoji: "😂" },
  { value: "Romance", label: "💕 Romance", emoji: "💕" },
  { value: "Horror", label: "👻 Horror", emoji: "👻" },
  { value: "Drama", label: "🎭 Drama", emoji: "🎭" },
  { value: "Family", label: "👨‍👩‍👧‍👦 Family", emoji: "👨‍👩‍👧‍👦" },
  { value: "Documentary", label: "📚 Documentary", emoji: "📚" },
  { value: "Nostalgia", label: "📼 Nostalgia", emoji: "📼" },
];

export function GenreSelector({ selectedGenre, onGenreSelect }: GenreSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-display font-semibold text-yellow-400 text-center">What genre sounds good?</h3>
      <Select value={selectedGenre || ""} onValueChange={(value) => onGenreSelect(value || null)}>
        <SelectTrigger className="w-full bg-gradient-to-br from-yellow-500/20 to-yellow-400/10 border-2 border-yellow-500/40 hover:border-yellow-400/60 text-yellow-100 hover:text-white backdrop-blur-sm rounded-xl py-4 text-lg">
          <SelectValue placeholder="Choose a genre..." />
        </SelectTrigger>
        <SelectContent className="bg-gradient-to-br from-yellow-900 to-yellow-800 border-2 border-yellow-500/40 backdrop-blur-sm">
          {genres.map(genre => (
            <SelectItem 
              key={genre.value} 
              value={genre.value}
              className="text-yellow-100 hover:bg-yellow-500/20 hover:text-white focus:bg-yellow-500/20 focus:text-white text-lg py-3"
            >
              {genre.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
