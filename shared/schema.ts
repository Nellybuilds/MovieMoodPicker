import { pgTable, text, serial, integer, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  genre: text("genre").notNull(),
  mood: text("mood").notNull(),
  isKidFriendly: boolean("is_kid_friendly").notNull().default(false),
  image: text("image").notNull(),
  description: text("description").notNull(),
  year: integer("year").notNull(),
  rating: real("rating").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMovieSchema = createInsertSchema(movies).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertMovie = z.infer<typeof insertMovieSchema>;
export type Movie = typeof movies.$inferSelect;
