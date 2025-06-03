export interface Movie {
  title: string;
  genre: string;
  mood: string;
  isKidFriendly: boolean;
  image: string;
  description: string;
}

// High-quality movie posters from Unsplash
const movieImages = [
  "https://images.unsplash.com/photo-1489599516274-2155376b8c9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1511376777868-611b54f68947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1520637736862-4d197d17c96a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1508796079212-a4b83cbf734d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1594736797933-d0c17a5e87b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200",
  "https://images.unsplash.com/photo-1609952071436-33d48b615854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200"
];

// Base movie data with detailed descriptions
const baseMovies: Movie[] = [
  // Action Movies
  {
    title: "The Midnight Guardian",
    genre: "Action",
    mood: "Adventurous",
    isKidFriendly: false,
    image: movieImages[0],
    description: "A thrilling adventure following a lone guardian protecting the last safe haven in a post-apocalyptic world. Packed with stunning action sequences and heart-pounding moments that will keep you on the edge of your seat."
  },
  {
    title: "Steel Thunder",
    genre: "Action",
    mood: "Scared",
    isKidFriendly: false,
    image: movieImages[1],
    description: "High-octane action with explosive car chases and intense combat sequences. A relentless thriller that follows a team of elite agents on their most dangerous mission yet."
  },
  {
    title: "Super Kids Squad",
    genre: "Action",
    mood: "Happy",
    isKidFriendly: true,
    image: movieImages[2],
    description: "Young heroes save the day with friendship and teamwork in this colorful adventure. A heartwarming story that combines exciting action with valuable life lessons."
  },
  {
    title: "Urban Storm",
    genre: "Action",
    mood: "Chill",
    isKidFriendly: false,
    image: movieImages[3],
    description: "A stylish action film with smooth choreography and a laid-back protagonist who always stays cool under pressure."
  },
  {
    title: "Broken Wings",
    genre: "Action",
    mood: "Sad",
    isKidFriendly: false,
    image: movieImages[4],
    description: "An emotional action drama about a warrior's final mission to honor a fallen friend. Action-packed yet deeply moving."
  },

  // Comedy Movies
  {
    title: "Laugh Out Loud",
    genre: "Comedy",
    mood: "Happy",
    isKidFriendly: false,
    image: movieImages[5],
    description: "A hilarious comedy that will have you rolling on the floor with laughter. Perfect for when you need to brighten your day with non-stop humor."
  },
  {
    title: "The Funny Farm",
    genre: "Comedy",
    mood: "Chill",
    isKidFriendly: true,
    image: movieImages[6],
    description: "A family-friendly comedy about life on a quirky farm with talking animals. Light-hearted fun that's perfect for relaxing with the whole family."
  },
  {
    title: "Midnight Laughs",
    genre: "Comedy",
    mood: "Sad",
    isKidFriendly: false,
    image: movieImages[7],
    description: "A dark comedy that finds humor in life's most challenging moments. Brilliantly written with unexpected emotional depth."
  },
  {
    title: "Adventure Comedy Club",
    genre: "Comedy",
    mood: "Adventurous",
    isKidFriendly: false,
    image: movieImages[8],
    description: "A wild comedy adventure that takes you on an unexpected journey filled with laughs and surprises at every turn."
  },
  {
    title: "Scary Movie Night",
    genre: "Comedy",
    mood: "Scared",
    isKidFriendly: false,
    image: movieImages[9],
    description: "A horror-comedy that perfectly balances scares with laughs. The perfect movie for those who love to be frightened and entertained."
  },

  // Romance Movies
  {
    title: "Love in Paris",
    genre: "Romance",
    mood: "Happy",
    isKidFriendly: false,
    image: movieImages[10],
    description: "A beautiful love story set against the romantic backdrop of Paris. A feel-good romance that will warm your heart and make you believe in love."
  },
  {
    title: "Second Chances",
    genre: "Romance",
    mood: "Sad",
    isKidFriendly: false,
    image: movieImages[11],
    description: "A touching story about love, loss, and finding hope again. An emotional journey that explores the depths of human connection."
  },
  {
    title: "Chill Romance",
    genre: "Romance",
    mood: "Chill",
    isKidFriendly: false,
    image: movieImages[12],
    description: "A relaxed, slow-burn romance perfect for a quiet evening. Beautiful cinematography and gentle storytelling create a peaceful viewing experience."
  },
  {
    title: "Adventure of Hearts",
    genre: "Romance",
    mood: "Adventurous",
    isKidFriendly: false,
    image: movieImages[13],
    description: "An exciting romantic adventure that takes lovers on a thrilling journey around the world, discovering love and themselves."
  },
  {
    title: "Love's Dark Secret",
    genre: "Romance",
    mood: "Scared",
    isKidFriendly: false,
    image: movieImages[14],
    description: "A romantic thriller with mysterious elements that will keep you guessing. Love and danger intertwine in this captivating story."
  },

  // Horror Movies
  {
    title: "Shadows of Fear",
    genre: "Horror",
    mood: "Scared",
    isKidFriendly: false,
    image: movieImages[15],
    description: "A spine-chilling horror that will keep you awake at night. Masterfully crafted scares and atmospheric tension create an unforgettable horror experience."
  },
  {
    title: "The Haunted House",
    genre: "Horror",
    mood: "Adventurous",
    isKidFriendly: false,
    image: movieImages[16],
    description: "Brave explorers investigate a mysterious mansion with dark secrets. A thrilling horror adventure that combines scares with exploration."
  },
  {
    title: "Happy Haunting",
    genre: "Horror",
    mood: "Happy",
    isKidFriendly: true,
    image: movieImages[17],
    description: "A friendly ghost story that's more fun than frightening. Perfect for kids who want a little spookiness without the nightmares."
  },
  {
    title: "Melancholy Manor",
    genre: "Horror",
    mood: "Sad",
    isKidFriendly: false,
    image: movieImages[18],
    description: "A haunting tale of loss and regret set in an old mansion. Atmospheric horror that explores grief through supernatural elements."
  },
  {
    title: "Quiet Terror",
    genre: "Horror",
    mood: "Chill",
    isKidFriendly: false,
    image: movieImages[19],
    description: "A slow-burn psychological horror that builds tension gradually. Perfect for those who appreciate subtle, atmospheric scares."
  },

  // Drama Movies
  {
    title: "The Journey Home",
    genre: "Drama",
    mood: "Sad",
    isKidFriendly: false,
    image: movieImages[0],
    description: "An emotional drama about family, forgiveness, and coming home. A powerful story that explores the complexities of human relationships."
  },
  {
    title: "Rising Star",
    genre: "Drama",
    mood: "Happy",
    isKidFriendly: true,
    image: movieImages[1],
    description: "An inspiring story of a young person chasing their dreams against all odds. Uplifting and motivational for the whole family."
  },
  {
    title: "Quiet Moments",
    genre: "Drama",
    mood: "Chill",
    isKidFriendly: false,
    image: movieImages[2],
    description: "A contemplative drama that finds beauty in life's simple moments. Peaceful and reflective storytelling at its finest."
  },
  {
    title: "Life's Great Adventure",
    genre: "Drama",
    mood: "Adventurous",
    isKidFriendly: false,
    image: movieImages[3],
    description: "A dramatic tale of personal growth through life's unexpected adventures. Inspiring and thought-provoking."
  },
  {
    title: "Dark Secrets",
    genre: "Drama",
    mood: "Scared",
    isKidFriendly: false,
    image: movieImages[4],
    description: "A psychological drama with thriller elements that explores the darker side of human nature."
  },

  // Family Movies
  {
    title: "Adventure Island",
    genre: "Family",
    mood: "Adventurous",
    isKidFriendly: true,
    image: movieImages[5],
    description: "A family discovers a magical island full of wonder and excitement. An adventure that brings families together through discovery and fun."
  },
  {
    title: "The Magic Garden",
    genre: "Family",
    mood: "Happy",
    isKidFriendly: true,
    image: movieImages[6],
    description: "Children discover a secret garden that brings their family together. Heartwarming family entertainment with beautiful messages about love and nature."
  },
  {
    title: "Family Vacation",
    genre: "Family",
    mood: "Chill",
    isKidFriendly: true,
    image: movieImages[7],
    description: "A relaxing family road trip leads to unexpected bonding and beautiful memories. Perfect for a cozy family movie night."
  },
  {
    title: "The Lost Puppy",
    genre: "Family",
    mood: "Sad",
    isKidFriendly: true,
    image: movieImages[8],
    description: "A touching story about finding a lost pet that teaches children about responsibility and compassion."
  },
  {
    title: "Spooky Fun House",
    genre: "Family",
    mood: "Scared",
    isKidFriendly: true,
    image: movieImages[9],
    description: "Mild scares and lots of laughs in this family-friendly spooky adventure. Just scary enough to be exciting but safe for kids."
  },

  // Documentary Movies
  {
    title: "Ocean Mysteries",
    genre: "Documentary",
    mood: "Chill",
    isKidFriendly: true,
    image: movieImages[10],
    description: "Explore the wonders of the deep ocean in this stunning documentary. Beautiful underwater cinematography reveals nature's hidden secrets."
  },
  {
    title: "History Revealed",
    genre: "Documentary",
    mood: "Adventurous",
    isKidFriendly: false,
    image: movieImages[11],
    description: "Uncover hidden secrets from history in this fascinating documentary. Adventure through time to discover amazing historical mysteries."
  },
  {
    title: "Happy Planet",
    genre: "Documentary",
    mood: "Happy",
    isKidFriendly: true,
    image: movieImages[12],
    description: "An uplifting documentary about environmental success stories and the people making a positive difference in the world."
  },
  {
    title: "Lost Civilizations",
    genre: "Documentary",
    mood: "Sad",
    isKidFriendly: false,
    image: movieImages[13],
    description: "A poignant look at civilizations that have vanished from history. Beautifully crafted and emotionally moving."
  },
  {
    title: "Dark Truths",
    genre: "Documentary",
    mood: "Scared",
    isKidFriendly: false,
    image: movieImages[14],
    description: "An investigative documentary that uncovers disturbing truths about modern society. Hard-hitting journalism at its best."
  }
];

// Generate additional movies to reach 1000+
function generateMovieDatabase(): Movie[] {
  const genres = ["Action", "Comedy", "Romance", "Horror", "Drama", "Family", "Documentary"];
  const moods = ["Happy", "Sad", "Adventurous", "Scared", "Chill"];
  
  const movieTitles = [
    "Midnight", "Thunder", "Shadows", "Phoenix", "Storm", "Galaxy", "Dragon", "Lightning", "Crystal", "Flame",
    "Ocean", "Mountain", "Forest", "Desert", "Valley", "River", "Cloud", "Star", "Moon", "Sun",
    "Adventure", "Journey", "Quest", "Mission", "Discovery", "Secret", "Mystery", "Legend", "Hero", "Guardian",
    "Dream", "Hope", "Love", "Heart", "Soul", "Spirit", "Magic", "Wonder", "Miracle", "Destiny",
    "Warrior", "Knight", "Prince", "Princess", "King", "Queen", "Champion", "Master", "Legend", "Sage"
  ];

  const adjectives = [
    "Dark", "Bright", "Lost", "Hidden", "Ancient", "Modern", "Wild", "Gentle", "Fierce", "Calm",
    "Brave", "Bold", "Shy", "Proud", "Humble", "Strong", "Swift", "Clever", "Wise", "Young",
    "Last", "First", "Final", "Ultimate", "Greatest", "Smallest", "Longest", "Shortest", "Deepest", "Highest"
  ];

  const movies = [...baseMovies];

  // Generate movies to reach approximately 1000
  for (let i = movies.length; i < 1000; i++) {
    const genre = genres[i % genres.length];
    const mood = moods[i % moods.length];
    const title1 = movieTitles[Math.floor(Math.random() * movieTitles.length)];
    const title2 = movieTitles[Math.floor(Math.random() * movieTitles.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    
    const title = Math.random() > 0.5 
      ? `The ${adjective} ${title1}`
      : `${title1} of ${title2}`;

    const isKidFriendly = genre === "Family" || (Math.random() > 0.7);

    movies.push({
      title,
      genre,
      mood,
      isKidFriendly,
      image: movieImages[Math.floor(Math.random() * movieImages.length)],
      description: `An exciting ${genre.toLowerCase()} movie that will make you feel ${mood.toLowerCase()}. ${isKidFriendly ? 'Perfect for the whole family to enjoy together.' : 'A compelling story for mature audiences.'}`
    });
  }

  return movies;
}

export const movies = generateMovieDatabase();
