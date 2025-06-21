import { db } from "../server/db";
import { movies } from "@shared/schema";
import { tubiMovies } from "../client/src/data/tubi-movies";

async function migrateMovies() {
  try {
    console.log('Starting movie migration...');
    
    // Remove duplicates from the source data
    const uniqueMovies = [];
    const seen = new Set<string>();
    
    for (const movie of tubiMovies) {
      const key = `${movie.title.toLowerCase()}-${movie.year}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueMovies.push({
          title: movie.title,
          genre: movie.genre,
          mood: movie.mood,
          isKidFriendly: movie.isKidFriendly,
          image: movie.image,
          description: movie.description,
          year: movie.year,
          rating: movie.rating
        });
      }
    }
    
    console.log(`Migrating ${uniqueMovies.length} unique movies...`);
    
    // Clear existing movies
    await db.delete(movies);
    
    // Insert all movies
    const result = await db.insert(movies).values(uniqueMovies).returning();
    
    console.log(`Successfully migrated ${result.length} movies to the database!`);
    
    // Show summary by genre
    const genreCounts = {};
    result.forEach(movie => {
      genreCounts[movie.genre] = (genreCounts[movie.genre] || 0) + 1;
    });
    
    console.log('\nMovies by genre:');
    Object.entries(genreCounts).forEach(([genre, count]) => {
      console.log(`  ${genre}: ${count} movies`);
    });
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    process.exit(0);
  }
}

migrateMovies();