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
  },

  // Additional Action Movies
  {
    title: "The Matrix",
    genre: "Action",
    mood: "Adventurous",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    description: "A computer programmer discovers that reality as he knows it might not be real.",
    year: 1999,
    rating: 8.7
  },
  {
    title: "300",
    genre: "Action",
    mood: "Adventurous",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/bBrjlGg6ybAN6jPALdCKBLxnMNZ.jpg",
    description: "King Leonidas leads 300 Spartans against the Persian army at the Battle of Thermopylae.",
    year: 2006,
    rating: 7.6
  },
  {
    title: "Snakes on a Plane",
    genre: "Action",
    mood: "Adventurous",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/9CoZQXJoiK8sUGVt5eXKDjxVhZI.jpg",
    description: "An FBI agent takes on a plane full of deadly venomous snakes.",
    year: 2006,
    rating: 5.4
  },

  // Additional Horror Movies
  {
    title: "The Strangers",
    genre: "Horror",
    mood: "Scared",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/gJF63jFz6w5qqgZoJo5thqhGw9I.jpg",
    description: "A young couple staying in an isolated vacation home are terrorized by three unknown assailants.",
    year: 2008,
    rating: 6.1
  },
  {
    title: "Final Destination",
    genre: "Horror",
    mood: "Scared",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/tLwNNdKKhcgLVDI4K24ZhRd9V5R.jpg",
    description: "After a teenager has a terrifying vision of a plane crash, Death stalks the survivors.",
    year: 2000,
    rating: 6.7
  },
  {
    title: "28 Days Later",
    genre: "Horror",
    mood: "Scared",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/yrtbIGBBF5nrMGkUoNDUJP3vr3J.jpg",
    description: "Four weeks after a virus turns people into zombies, a man wakes up from a coma to find London deserted.",
    year: 2002,
    rating: 7.6
  },

  // Additional Comedy Movies
  {
    title: "The Hangover",
    genre: "Comedy",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/uluNMXESqFKIzl4c4dSkArwczrj.jpg",
    description: "Three buddies wake up from a bachelor party in Las Vegas with no memory of the previous night.",
    year: 2009,
    rating: 7.7
  },
  {
    title: "Tropic Thunder",
    genre: "Comedy",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/9hFrSWKOl8K3rNhwfnmyXPfKDzR.jpg",
    description: "Through a series of freak occurrences, a group of actors shooting a war movie are forced to become real soldiers.",
    year: 2008,
    rating: 7.1
  },
  {
    title: "Zoolander",
    genre: "Comedy",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/qdrbcMKfoEtdNrxKZK1QZATNDHa.jpg",
    description: "A dim-witted male model becomes involved in a plot to assassinate the Prime Minister of Malaysia.",
    year: 2001,
    rating: 6.5
  },
  {
    title: "Dumb and Dumber",
    genre: "Comedy",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/dxuWlJsOdDGThFGIx0bLjJDhX3t.jpg",
    description: "Two best friends set out on a cross-country trip to return a briefcase to its owner.",
    year: 1994,
    rating: 7.3
  },

  // Additional Drama Movies
  {
    title: "Good Will Hunting",
    genre: "Drama",
    mood: "Chill",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/rKi1J4S5Dl36lGtRJfJgzjk3Y31.jpg",
    description: "A janitor at MIT has a gift for mathematics but needs help from a psychologist to find direction in his life.",
    year: 1997,
    rating: 8.3
  },
  {
    title: "A Beautiful Mind",
    genre: "Drama",
    mood: "Chill",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/vjnzSm1yWEjmeTl2R2YkCG8PalY.jpg",
    description: "After a brilliant but asocial mathematician accepts a job at Princeton, he struggles with schizophrenia.",
    year: 2001,
    rating: 8.2
  },
  {
    title: "Dead Poets Society",
    genre: "Drama",
    mood: "Sad",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/vkB0D1lLl0iVUhNm7r7eD3LTy2a.jpg",
    description: "An English teacher inspires his students to appreciate poetry and seize the day.",
    year: 1989,
    rating: 8.1
  },

  // Additional Romance Movies
  {
    title: "Ghost",
    genre: "Romance",
    mood: "Sad",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/jYcfyGj3pDYjPgdMhsX1nN7uXJD.jpg",
    description: "A murdered man tries to communicate with his girlfriend through a psychic medium.",
    year: 1990,
    rating: 7.1
  },
  {
    title: "Pretty Woman",
    genre: "Romance",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/sBaK6xAVwMdmCJqW7s0mPxjvINJ.jpg",
    description: "A wealthy businessman hires a beautiful escort to accompany him to social events.",
    year: 1990,
    rating: 7.0
  },
  {
    title: "The Princess Bride",
    genre: "Romance",
    mood: "Happy",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/njpo8TxrfSLxbYFsm0b1y5MlG7b.jpg",
    description: "A young woman's true love sets out to rescue her from an odious prince.",
    year: 1987,
    rating: 8.0
  },

  // Additional Family Movies
  {
    title: "The Lion King",
    genre: "Family",
    mood: "Happy",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
    description: "A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
    year: 1994,
    rating: 8.5
  },
  {
    title: "Monsters, Inc.",
    genre: "Family",
    mood: "Happy",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/sgheSKxZkttIe8ONsf2sWXPgip3.jpg",
    description: "Monsters generate their city's power by scaring children, but one little girl accidentally enters their world.",
    year: 2001,
    rating: 8.1
  },

  // Additional Action Movies
  {
    title: "Mad Max: Fury Road",
    genre: "Action",
    mood: "Adventurous",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
    description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland.",
    year: 2015,
    rating: 8.1
  },
  {
    title: "The Fast and the Furious",
    genre: "Action",
    mood: "Adventurous",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
    description: "Los Angeles police officer goes undercover in the street racing underworld.",
    year: 2001,
    rating: 6.8
  },
  {
    title: "Speed",
    genre: "Action",
    mood: "Adventurous",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/fOBTp2IaNEL9VHCSTn2a0Uu4XFl.jpg",
    description: "A young police officer must prevent a bomb exploding aboard a city bus.",
    year: 1994,
    rating: 7.3
  },
  {
    title: "Face/Off",
    genre: "Action",
    mood: "Adventurous",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/9ZzNiQYzGPe7rdJqfUuHnK5Ew60.jpg",
    description: "An FBI agent and a terrorist swap faces and identities.",
    year: 1997,
    rating: 7.3
  },

  // More Horror Movies
  {
    title: "Scream",
    genre: "Horror",
    mood: "Scared",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/mX7JRHKe0Xw6UrWkQG1Kqhh7WB6.jpg",
    description: "A year after her mother's murder, a teenage girl is terrorized by a new killer.",
    year: 1996,
    rating: 7.4
  },
  {
    title: "The Ring",
    genre: "Horror",
    mood: "Scared",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/k7TN5pEXPEqJm0OWfSWuGLWkj0T.jpg",
    description: "A journalist investigates a mysterious videotape that seems to cause the death of anyone who watches it.",
    year: 2002,
    rating: 7.1
  },
  {
    title: "It Follows",
    genre: "Horror",
    mood: "Scared",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/8pFtowP0kIUyJ2S7Xpx3QfWcJwY.jpg",
    description: "A young woman is followed by an unknown supernatural force after a sexual encounter.",
    year: 2014,
    rating: 6.8
  },
  {
    title: "The Babadook",
    genre: "Horror",
    mood: "Scared",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/wTCVPHEY6DlpM8YjvE5uOOKhLnL.jpg",
    description: "A single mother and her child fall into a deep well of paranoia when an eerie children's book appears.",
    year: 2014,
    rating: 6.8
  },

  // Additional Comedy Movies
  {
    title: "Airplane!",
    genre: "Comedy",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/5h8xgZdDMmf6KgJo9O8hUNlsJLN.jpg",
    description: "A man afraid to fly must ensure that an airplane lands safely after the pilots become sick.",
    year: 1980,
    rating: 7.7
  },
  {
    title: "The Naked Gun",
    genre: "Comedy",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/7TKqm8QhF6WN8M9d8n8VCwMd7uJ.jpg",
    description: "Incompetent police Detective Frank Drebin must foil an attempt to assassinate Queen Elizabeth II.",
    year: 1988,
    rating: 7.6
  },
  {
    title: "Dumb and Dumber",
    genre: "Comedy",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/oWPKJ9XN4VoSJP1Cx2O5y0h2bgg.jpg",
    description: "Two dimwitted friends go on a cross-country trip to return a briefcase full of money.",
    year: 1994,
    rating: 7.3
  },
  {
    title: "Anchorman",
    genre: "Comedy",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/9JqXhjJP87RCo1d5u0RfKBOHX8l.jpg",
    description: "Ron Burgundy is San Diego's top-rated newsman in the male-dominated broadcasting of the 1970s.",
    year: 2004,
    rating: 7.2
  },

  // More Drama Movies
  {
    title: "The Pursuit of Happyness",
    genre: "Drama",
    mood: "Sad",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/pGm6bHhPOeY3QjCCVNzPM1v1xI1.jpg",
    description: "A struggling salesman takes custody of his son as he's poised to begin a life-changing professional career.",
    year: 2006,
    rating: 8.0
  },
  {
    title: "A Beautiful Mind",
    genre: "Drama",
    mood: "Sad",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/nHG3LbcT10QjcxF0YnZtILgLGjK.jpg",
    description: "After John Nash suffers a nervous breakdown, his loving wife Alicia struggles to help him.",
    year: 2001,
    rating: 8.2
  },
  {
    title: "Good Will Hunting",
    genre: "Drama",
    mood: "Sad",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/bABCBKYBK7A5G1x0FzoeoNfuj2.jpg",
    description: "Will Hunting is a genius working as a janitor at MIT who needs help from a psychologist.",
    year: 1997,
    rating: 8.3
  },
  {
    title: "Rain Man",
    genre: "Drama",
    mood: "Sad",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/m7mJ2JnShgF9Hff5jJ9xjdSS4eZ.jpg",
    description: "A young man discovers he has an autistic brother and takes him on a cross-country journey.",
    year: 1988,
    rating: 8.0
  },

  // More Family Movies
  {
    title: "Finding Nemo",
    genre: "Family",
    mood: "Happy",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/6vKR8LF8b0KZTMSQLz1xMJ9aqMH.jpg",
    description: "A fish named Marlin searches for his missing son Nemo with the help of Dory.",
    year: 2003,
    rating: 8.2
  },
  {
    title: "Toy Story",
    genre: "Family",
    mood: "Happy",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
    description: "A cowboy doll is profoundly threatened by a new spaceman figure.",
    year: 1995,
    rating: 8.3
  },
  {
    title: "The Incredibles",
    genre: "Family",
    mood: "Adventurous",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/2LqaLgk4Z226KkgPJuiOQ58wvrm.jpg",
    description: "A family of undercover superheroes tries to live a quiet suburban life.",
    year: 2004,
    rating: 8.0
  },
  {
    title: "Shrek",
    genre: "Family",
    mood: "Happy",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
    description: "An ogre embarks on a quest to rescue a princess for a lord.",
    year: 2001,
    rating: 7.9
  },

  // Documentary Movies
  {
    title: "March of the Penguins",
    genre: "Documentary",
    mood: "Chill",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/lRMHJLMZ8EE9LMlgpL0l5i8Q9o3.jpg",
    description: "Documentary following Emperor penguins as they make their journey to their breeding ground.",
    year: 2005,
    rating: 7.5
  },
  {
    title: "An Inconvenient Truth",
    genre: "Documentary",
    mood: "Chill",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/4Lq9IzG5nfXvjKlnTPzrR7dDSgD.jpg",
    description: "Al Gore campaigns to educate the public about global warming.",
    year: 2006,
    rating: 7.4
  },
  {
    title: "Bowling for Columbine",
    genre: "Documentary",
    mood: "Chill",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/wMM6vPJ2M4uAGPrAE4rRnLvQOVH.jpg",
    description: "Michael Moore explores the reasons for the 1999 Columbine High School massacre.",
    year: 2002,
    rating: 8.0
  },

  // More Romance Movies
  {
    title: "When Harry Met Sally",
    genre: "Romance",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/m9FHqDVDSHWZMGFmXpBJ3jJCCr7.jpg",
    description: "Harry and Sally have known each other for years, and are very good friends.",
    year: 1989,
    rating: 7.7
  },
  {
    title: "Sleepless in Seattle",
    genre: "Romance",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/6I2tT8eD4VTMUtqOPG3vu2KfaH7.jpg",
    description: "A recently widowed man's son calls a radio talk-show in an attempt to find his father a partner.",
    year: 1993,
    rating: 6.8
  },
  {
    title: "You've Got Mail",
    genre: "Romance",
    mood: "Happy",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/jylK4s7w3QBnQQpq1aAz8A3cJJO.jpg",
    description: "Two business rivals who despise each other in real life fall in love over the Internet.",
    year: 1998,
    rating: 6.7
  },

  // Additional Chill/Drama Movies
  {
    title: "Lost in Translation",
    genre: "Drama",
    mood: "Chill",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/w7d0BquKqw4QjHXZIw9Kil0tSa4.jpg",
    description: "A fading movie star and a neglected young woman form an unlikely bond in Tokyo.",
    year: 2003,
    rating: 7.7
  },
  {
    title: "Her",
    genre: "Drama",
    mood: "Chill",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/lEIaL12hSkqqe83kgADkbUqEnvk.jpg",
    description: "A writer develops an unlikely relationship with an operating system designed to meet his every need.",
    year: 2013,
    rating: 8.0
  },
  {
    title: "The Grand Budapest Hotel",
    genre: "Comedy",
    mood: "Chill",
    isKidFriendly: false,
    image: "https://image.tmdb.org/t/p/w500/mcpZWQb1VNSHkJm8ZiLe0YPJIJa.jpg",
    description: "The adventures of a legendary concierge and his protégé at a famous European hotel.",
    year: 2014,
    rating: 8.1
  },
  {
    title: "Toy Story",
    genre: "Family",
    mood: "Happy",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
    description: "A cowboy doll is profoundly threatened when a new spaceman action figure supplants him as top toy.",
    year: 1995,
    rating: 8.3
  },
  {
    title: "WALL-E",
    genre: "Family",
    mood: "Chill",
    isKidFriendly: true,
    image: "https://image.tmdb.org/t/p/w500/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg",
    description: "In the distant future, a robot left behind to clean a polluted Earth meets another robot and follows her across the galaxy.",
    year: 2008,
    rating: 8.2
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