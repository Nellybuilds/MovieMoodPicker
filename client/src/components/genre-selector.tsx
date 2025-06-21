import { Button } from "@/components/ui/button";

interface GenreSelectorProps {
  selectedGenre: string | null;
  onGenreSelect: (genre: string | null) => void;
}

const genres = [
  "Action",
  "Comedy", 
  "Romance",
  "Horror",
  "Drama",
  "Family",
  "Documentary",
];

export function GenreSelector({ selectedGenre, onGenreSelect }: GenreSelectorProps) {
  const handleGenreClick = (genre: string) => {
    if (selectedGenre === genre) {
      onGenreSelect(null); // Deselect if already selected
    } else {
      onGenreSelect(genre);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
      {genres.map((genre) => (
        <Button
          key={genre}
          onClick={() => handleGenreClick(genre)}
          className={`
            px-5 py-3 lg:px-6 lg:py-4 border rounded-lg text-base lg:text-lg font-medium 
            transition-all duration-300 transform hover:scale-105
            ${selectedGenre === genre
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 border-purple-400 text-white font-bold shadow-lg shadow-purple-500/30'
              : 'bg-gradient-to-br from-yellow-500/20 to-yellow-400/10 hover:from-yellow-400/30 hover:to-yellow-300/20 border-yellow-500/40 hover:border-yellow-400/60 text-yellow-100 hover:text-white backdrop-blur-sm'
            }
          `}
        >
          {genre}
        </Button>
      ))}
    </div>
  );
}
