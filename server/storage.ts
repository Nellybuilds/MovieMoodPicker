import { users, movies, type User, type InsertUser, type Movie, type InsertMovie } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getMovies(filters?: { genre?: string; mood?: string; kidsOnly?: boolean }): Promise<Movie[]>;
  getMovieById(id: number): Promise<Movie | undefined>;
  createMovie(movie: InsertMovie): Promise<Movie>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getMovies(filters?: { genre?: string; mood?: string; kidsOnly?: boolean }): Promise<Movie[]> {
    if (!filters || Object.keys(filters).length === 0) {
      return await db.select().from(movies);
    }
    
    const conditions = [];
    
    if (filters.genre) {
      conditions.push(eq(movies.genre, filters.genre));
    }
    
    if (filters.mood) {
      conditions.push(eq(movies.mood, filters.mood));
    }
    
    if (filters.kidsOnly) {
      conditions.push(eq(movies.isKidFriendly, true));
    }
    
    if (conditions.length === 0) {
      return await db.select().from(movies);
    }
    
    return await db.select().from(movies).where(and(...conditions));
  }

  async getMovieById(id: number): Promise<Movie | undefined> {
    const [movie] = await db.select().from(movies).where(eq(movies.id, id));
    return movie || undefined;
  }

  async createMovie(insertMovie: InsertMovie): Promise<Movie> {
    const [movie] = await db
      .insert(movies)
      .values(insertMovie)
      .returning();
    return movie;
  }
}

export const storage = new DatabaseStorage();
