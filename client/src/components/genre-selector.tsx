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
            transition-all duration-300 hover:scale-105
            ${selectedGenre === genre
              ? 'bg-[hsl(var(--tubi-blue))] border-[hsl(var(--tubi-blue))] shadow-md shadow-[hsl(var(--tubi-blue))]/30 text-white'
              : 'bg-[hsl(var(--dark-tertiary))] hover:bg-[hsl(var(--tubi-blue))] border-gray-500 hover:border-[hsl(var(--tubi-blue))] text-white hover:shadow-md hover:shadow-[hsl(var(--tubi-blue))]/30'
            }
          `}
        >
          {genre}
        </Button>
      ))}
    </div>
  );
}
