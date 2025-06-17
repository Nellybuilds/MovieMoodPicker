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
            transition-all duration-200
            ${selectedGenre === genre
              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 border-yellow-500 text-black font-bold'
              : 'bg-gray-800 hover:bg-gray-700 border-gray-600 hover:border-gray-500 text-white'
            }
          `}
        >
          {genre}
        </Button>
      ))}
    </div>
  );
}
