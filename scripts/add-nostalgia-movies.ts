import { db } from "../server/db";
import { movies, type InsertMovie } from "../shared/schema";

// Classic nostalgic movies with authentic TMDB data
const nostalgicMovies: InsertMovie[] = [
  {
    title: "The Breakfast Club",
    genre: "Nostalgia",
    mood: "Chill",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/vxvx73Q0OKDj5p4thUqqzpBdz5N.jpg",
    description: "Five high school students from different walks of life endure a Saturday detention under a power-hungry principal.",
    year: 1985,
    rating: 7.8
  },
  {
    title: "Back to the Future",
    genre: "Nostalgia",
    mood: "Adventurous",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
    description: "Marty McFly travels back in time with Doc Brown's DeLorean time machine.",
    year: 1985,
    rating: 8.5
  },
  {
    title: "E.T. the Extra-Terrestrial",
    genre: "Nostalgia",
    mood: "Happy",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/5MYbLXjc8qUYuh2Gv2dOpR7pbVp.jpg",
    description: "A troubled child summons the courage to help a friendly alien escape Earth.",
    year: 1982,
    rating: 7.9
  },
  {
    title: "The Goonies",
    genre: "Nostalgia",
    mood: "Adventurous",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/dPgSQSk9EQ8RJGFqx9EbDZAhQ2U.jpg",
    description: "A group of young misfits discover an ancient map and set out on an adventure to find a legendary pirate's treasure.",
    year: 1985,
    rating: 7.7
  },
  {
    title: "Ferris Bueller's Day Off",
    genre: "Nostalgia",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/9LTQNCvoUvLlbAdL4gQDCLFz8w0.jpg",
    description: "A high school wise guy is determined to have a day off from school despite what the principal thinks.",
    year: 1986,
    rating: 7.8
  },
  {
    title: "Sixteen Candles",
    genre: "Nostalgia",
    mood: "Romance",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/d5vQPu2tLltEYnwJaZADC2H6mhE.jpg",
    description: "A teenage girl's birthday is forgotten by everyone except the school geek who's in love with her.",
    year: 1984,
    rating: 7.0
  },
  {
    title: "The Princess Bride",
    genre: "Nostalgia",
    mood: "Happy",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/dvjqlp2sAL3lrzSdSgE7hbXZ5SN.jpg",
    description: "A fairy tale adventure about a beautiful young woman and her one true love.",
    year: 1987,
    rating: 8.0
  },
  {
    title: "Dirty Dancing",
    genre: "Nostalgia",
    mood: "Romance",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/p2gRxD9E8b2DLz7BSrsDQIkhzjz.jpg",
    description: "A sheltered young woman discovers love and finds her voice during a summer at a Catskills resort.",
    year: 1987,
    rating: 7.0
  },
  {
    title: "Top Gun",
    genre: "Nostalgia",
    mood: "Adventurous",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/g1QKUd2vFJN8PnXS9FUW3e2S5Ux.jpg",
    description: "The macho naval aviator flies his F-14 Tomcat with reckless abandon and has a need for speed.",
    year: 1986,
    rating: 6.9
  },
  {
    title: "Pretty in Pink",
    genre: "Nostalgia",
    mood: "Romance",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/wCE7AV3MsUIcayYqCsjqBCy4Pjz.jpg",
    description: "A teenage girl from the wrong side of the tracks gets caught between her working-class background and her rich classmates.",
    year: 1986,
    rating: 6.7
  },
  {
    title: "Stand by Me",
    genre: "Nostalgia",
    mood: "Sad",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/vz0w9BSehcqjDcJOjRaCk7fgJe7.jpg",
    description: "Four boys go on a journey to find the body of a dead boy, and in the process, discover themselves.",
    year: 1986,
    rating: 8.1
  },
  {
    title: "The Karate Kid",
    genre: "Nostalgia",
    mood: "Happy",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/4gLIjyeLGDMqC9RcvTQqIBMkHy2.jpg",
    description: "A martial arts master agrees to teach karate to a bullied teenager.",
    year: 1984,
    rating: 7.3
  },
  {
    title: "Dead Poets Society",
    genre: "Nostalgia",
    mood: "Sad",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/ai40gM7SUaGA9TGe2chj5Q6HaU5.jpg",
    description: "An English teacher inspires his students to seize the day and live life to the fullest.",
    year: 1989,
    rating: 8.1
  },
  {
    title: "The NeverEnding Story",
    genre: "Nostalgia",
    mood: "Adventurous",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/uTHrVeY8G9rQ9bZgDWo9dCNBJI.jpg",
    description: "A troubled boy dives into a wondrous fantasy world through the pages of a mysterious book.",
    year: 1984,
    rating: 7.4
  },
  {
    title: "Labyrinth",
    genre: "Nostalgia",
    mood: "Adventurous",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/2L8ehd95eSW9x7KINYtZmRkAlrZ.jpg",
    description: "A 16-year-old girl is given 13 hours to solve a labyrinth and rescue her baby brother.",
    year: 1986,
    rating: 7.4
  },
  {
    title: "Big",
    genre: "Nostalgia",
    mood: "Happy",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/dOE0KgJAYpj0Y8wHBz4jvZDDjh.jpg",
    description: "After wishing to be made big, a teenage boy wakes the next morning to find himself mysteriously in the body of an adult.",
    year: 1988,
    rating: 7.3
  },
  {
    title: "Home Alone",
    genre: "Nostalgia",
    mood: "Happy",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/onTSipZ8R3bliBdKfPtsDuHTdlL.jpg",
    description: "An eight-year-old troublemaker must protect his house from a pair of burglars when he is accidentally left home alone.",
    year: 1990,
    rating: 7.7
  },
  {
    title: "Ghost",
    genre: "Nostalgia",
    mood: "Romance",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/1gSKiHNa5kQ0nRYf1EFqD7n7hQz.jpg",
    description: "After a young man is murdered, his spirit stays behind to warn his lover of impending danger.",
    year: 1990,
    rating: 7.1
  },
  {
    title: "Beetlejuice",
    genre: "Nostalgia",
    mood: "Chill",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/nnl6OWkyPpuMm595hmAxNkWH6WT.jpg",
    description: "A recently deceased couple hire a bio-exorcist to help them rid their home of its new inhabitants.",
    year: 1988,
    rating: 7.5
  },
  {
    title: "Gremlins",
    genre: "Nostalgia",
    mood: "Scared",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/c8VO3llH3rCtMiwZZM2uZCUGhJ1.jpg",
    description: "A young man receives a strange creature as a pet, which then spawns other creatures who transform into small monsters.",
    year: 1984,
    rating: 7.3
  }
];

async function addNostalgiaMovies() {
  try {
    console.log("Adding nostalgic movies to database...");
    
    for (const movie of nostalgicMovies) {
      try {
        await db.insert(movies).values(movie);
        console.log(`Added: ${movie.title}`);
      } catch (error) {
        console.log(`Skipping ${movie.title} (may already exist)`);
      }
    }
    
    console.log("Finished adding nostalgic movies!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding nostalgic movies:", error);
    process.exit(1);
  }
}

addNostalgiaMovies();