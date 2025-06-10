// Curated list of popular movies currently available on Tubi
// Updated: December 2024
export interface TubiMovie {
  title: string;
  genre: string;
  mood: string;
  isKidFriendly: boolean;
  image: string;
  description: string;
  year: number;
  rating: number;
}

export const tubiMovies: TubiMovie[] = [
  // Action/Adventure Movies
  {
    title: "John Wick",
    genre: "Action",
    mood: "Adventurous",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    description: "An ex-hitman comes out of retirement to track down the gangsters that took everything from him.",
    year: 2014,
    rating: 7.4
  },
  {
    title: "The Equalizer",
    genre: "Action",
    mood: "Adventurous",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/2eQfjqlxF2ktNLNzxyd6WQxhJLd.jpg",
    description: "A man believes he has put his mysterious past behind him and has dedicated himself to beginning a new, quiet life.",
    year: 2014,
    rating: 7.2
  },
  {
    title: "Taken",
    genre: "Action",
    mood: "Adventurous",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/wrEvDKwjIYgzLY9qxNrfPLgIjPi.jpg",
    description: "A former spy relies on his old skills to save his estranged daughter, who has been forced into the slave trade.",
    year: 2008,
    rating: 7.8
  },

  // Horror Movies
  {
    title: "The Grudge",
    genre: "Horror",
    mood: "Scared",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/1j0KobvHsrQ8m4Q5MpCFrEXHg4Z.jpg",
    description: "An American nurse living in Japan is exposed to a curse that locks a person in a powerful rage before claiming their life.",
    year: 2004,
    rating: 6.1
  },
  {
    title: "Insidious",
    genre: "Horror",
    mood: "Scared",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/nAzZYGIa3jswrHKLak8yRfmFmru.jpg",
    description: "A family discovers that dark spirits have invaded their home after their son inexplicably falls into a coma.",
    year: 2010,
    rating: 6.8
  },
  {
    title: "The Ring",
    genre: "Horror",
    mood: "Scared",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/1rGNmLlmPiK7vJtHyA2p2w8oZk2.jpg",
    description: "A journalist must investigate a mysterious videotape which seems to cause the death of anyone in a week of viewing it.",
    year: 2002,
    rating: 7.1
  },

  // Comedy Movies
  {
    title: "Superbad",
    genre: "Comedy",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg",
    description: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
    year: 2007,
    rating: 7.6
  },
  {
    title: "Pineapple Express",
    genre: "Comedy",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/6E50wX4ZGqJaWqGV7RdJHsLJFB6.jpg",
    description: "A stoner and his dealer are forced to go on the run from the police after witnessing a murder.",
    year: 2008,
    rating: 6.9
  },
  {
    title: "Step Brothers",
    genre: "Comedy",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/wn3yrfGgNnpUDKVOW3rCNnlFvIh.jpg",
    description: "Two aimless middle-aged losers still living at home are forced against their will to become roommates when their parents marry.",
    year: 2008,
    rating: 6.9
  },

  // Romance Movies
  {
    title: "The Notebook",
    genre: "Romance",
    mood: "Sad",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/qom1SZSENdmHFNZBXbtJAU0WTlC.jpg",
    description: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated.",
    year: 2004,
    rating: 7.8
  },
  {
    title: "Dirty Dancing",
    genre: "Romance",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/4qq0lXIpE2JGr6d0ZLiRzePKCK9.jpg",
    description: "A sheltered young woman discovers romance and develops a passion for dancing during a summer at a resort.",
    year: 1987,
    rating: 7.0
  },

  // Drama Movies
  {
    title: "The Shawshank Redemption",
    genre: "Drama",
    mood: "Chill",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    year: 1994,
    rating: 9.3
  },
  {
    title: "Forrest Gump",
    genre: "Drama",
    mood: "Chill",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    description: "The presidencies of Kennedy and Johnson through the eyes of an Alabama man with an IQ of 75.",
    year: 1994,
    rating: 8.8
  },

  // Family/Kids Movies
  {
    title: "Shrek",
    genre: "Family",
    mood: "Happy",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
    description: "A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess.",
    year: 2001,
    rating: 7.9
  },
  {
    title: "Madagascar",
    genre: "Family",
    mood: "Happy",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/pZXhTYeOiHNTxFW1VVPM6X5ZxYF.jpg",
    description: "Spoiled by their upbringing with no idea what wild animals endure, four animals from the Central Park Zoo escape.",
    year: 2005,
    rating: 6.9
  },
  {
    title: "Ice Age",
    genre: "Family",
    mood: "Happy",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/gLhHHZUzeseRXShoDyC4VqLgsNv.jpg",
    description: "Set during the Ice Age, a sabertooth tiger, a sloth, and a wooly mammoth find a lost human infant.",
    year: 2002,
    rating: 7.5
  },
  {
    title: "Finding Nemo",
    genre: "Family",
    mood: "Happy",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg",
    description: "After his son is captured, a timid clownfish sets out on a journey to bring him home.",
    year: 2003,
    rating: 8.2
  },

  // Documentary
  {
    title: "March of the Penguins",
    genre: "Documentary",
    mood: "Chill",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/nDwInRrBF1JmgFx2tgvCfT1wPJT.jpg",
    description: "A documentary following the yearly journey of Emperor penguins as they march to their breeding ground.",
    year: 2005,
    rating: 7.5
  },
  {
    title: "An Inconvenient Truth",
    genre: "Documentary",
    mood: "Chill",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/pqJdqQGzQIZx8YmzSW8cRHWx6zy.jpg",
    description: "Al Gore's documentary about climate change and global warming.",
    year: 2006,
    rating: 7.4
  },

  // Additional Popular Tubi Movies
  {
    title: "District 9",
    genre: "Action",
    mood: "Adventurous",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/w4lrEjkGGGYS4GVOFz9sKCjEyLg.jpg",
    description: "An extraterrestrial race forced to live in slum-like conditions on Earth suddenly finds a kindred spirit in a government agent.",
    year: 2009,
    rating: 7.9
  },
  {
    title: "The Pursuit of Happyness",
    genre: "Drama",
    mood: "Chill",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/12K8GyJXJFiuBgUY9GRUgwjqEkT.jpg",
    description: "A struggling salesman takes custody of his son as he's poised to begin a life-changing professional career.",
    year: 2006,
    rating: 8.0
  },
  {
    title: "Zombieland",
    genre: "Horror",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/dUkAmAyPVqubSBNRjRqCgHggZcK.jpg",
    description: "A shy student trying to reach his family in Ohio, a gun-toting bruiser in search of the last Twinkie.",
    year: 2009,
    rating: 7.6
  },
  {
    title: "Mean Girls",
    genre: "Comedy",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/fXm3YKXAEjjKP5AvTxoVmQYwKj4.jpg",
    description: "A girl navigates the complex social hierarchy of her new high school and learns valuable lessons about friendship.",
    year: 2004,
    rating: 7.0
  }
];

// Helper function to get movies by filters
export function getTubiMovies(filters?: {
  genre?: string;
  mood?: string;
  kidsOnly?: boolean;
}): TubiMovie[] {
  if (!filters) return tubiMovies;

  return tubiMovies.filter(movie => {
    if (filters.genre && movie.genre.toLowerCase() !== filters.genre.toLowerCase()) {
      return false;
    }
    if (filters.mood && movie.mood.toLowerCase() !== filters.mood.toLowerCase()) {
      return false;
    }
    if (filters.kidsOnly && !movie.isKidFriendly) {
      return false;
    }
    return true;
  });
}

// Get random movie from filtered results
export function getRandomTubiMovie(filters?: {
  genre?: string;
  mood?: string;
  kidsOnly?: boolean;
}): TubiMovie {
  const filteredMovies = getTubiMovies(filters);
  return filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
}