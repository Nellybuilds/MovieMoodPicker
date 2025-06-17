# Movie Recommendation App

## Overview

This is a full-stack movie recommendation application built with React, Express.js, and PostgreSQL. The app helps users discover movies based on their mood and genre preferences, featuring both random selection and AI-powered recommendations using OpenRouter/Anthropic AI.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with dark theme support
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: In-memory storage with future database integration
- **API Integration**: TMDB API for movie data, OpenRouter/Anthropic for AI recommendations

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Movies**: Fetched from TMDB API (not stored locally)
- **Schema Location**: `shared/schema.ts` using Drizzle ORM

## Key Components

### Movie Recommendation System
- **Mood-based Selection**: 5 mood categories (Happy, Sad, Adventurous, Scared, Chill)
- **Genre Filtering**: 7 main genres (Action, Comedy, Romance, Horror, Drama, Family, Documentary)
- **Kid-friendly Filter**: Content filtering for family-appropriate movies
- **AI Recommendations**: Intelligent movie selection using OpenRouter API

### Data Sources
- **TMDB Integration**: Movie posters, descriptions, ratings, and metadata
- **Curated Movie List**: Pre-selected Tubi movies with mood/genre classifications
- **AI Enhancement**: Contextual recommendations based on user preferences

### User Interface
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Dark Theme**: Tubi-inspired black and yellow color scheme
- **Interactive Components**: Mood and genre selectors with visual feedback
- **Movie Cards**: Rich movie presentation with posters and detailed information

## Data Flow

1. **User Selection**: User selects mood, genre, and kid-friendly preferences
2. **Movie Filtering**: Frontend filters available movies based on criteria
3. **Random Selection**: Simple random pick from filtered results
4. **AI Selection**: 
   - Send filtered movies and preferences to backend
   - Backend calls OpenRouter API with movie data and user context
   - AI returns personalized recommendation with reasoning
   - Frontend displays selected movie with AI insights

## External Dependencies

### APIs
- **TMDB API**: Movie database for posters and metadata
- **OpenRouter API**: AI-powered movie recommendations via Anthropic Claude
- **Neon Database**: Serverless PostgreSQL hosting

### Key Libraries
- **@neondatabase/serverless**: Neon database client
- **@anthropic-ai/sdk**: AI integration for recommendations
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Data fetching and caching
- **@radix-ui/***: Accessible UI components
- **wouter**: Lightweight routing

## Deployment Strategy

### Development
- **Local Development**: `npm run dev` starts both frontend and backend
- **Hot Reload**: Vite HMR for frontend, tsx for backend auto-restart
- **Database**: Neon serverless PostgreSQL with connection pooling

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles Node.js server to `dist/index.js`
- **Deployment**: Replit auto-deployment with PostgreSQL module
- **Environment Variables**: DATABASE_URL, TMDB_API_KEY, OPENROUTER_API_KEY

### Replit Configuration
- **Modules**: nodejs-20, web, postgresql-16
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Port**: 5000 (mapped to external port 80)

## Changelog

```
Changelog:
- June 14, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```