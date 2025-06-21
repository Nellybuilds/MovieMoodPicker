export interface TimeRecommendation {
  primaryMood: string;
  secondaryMoods: string[];
  preferredGenres: string[];
  reasoning: string;
  timeContext: string;
}

export function getTimeBasedRecommendation(): TimeRecommendation {
  const now = new Date();
  const hour = now.getHours();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Early Morning (5-8 AM)
  if (hour >= 5 && hour < 8) {
    return {
      primaryMood: "Chill",
      secondaryMoods: ["Happy"],
      preferredGenres: ["Documentary", "Family", "Comedy"],
      reasoning: "Start your day with something light and uplifting",
      timeContext: "Early Morning"
    };
  }

  // Morning (8-11 AM)
  if (hour >= 8 && hour < 11) {
    return {
      primaryMood: "Happy",
      secondaryMoods: ["Chill", "Adventurous"],
      preferredGenres: ["Comedy", "Family", "Documentary"],
      reasoning: "Perfect time for feel-good content to energize your morning",
      timeContext: "Morning"
    };
  }

  // Late Morning/Early Afternoon (11 AM - 2 PM)
  if (hour >= 11 && hour < 14) {
    return {
      primaryMood: "Adventurous",
      secondaryMoods: ["Happy", "Chill"],
      preferredGenres: ["Action", "Comedy", "Family"],
      reasoning: "Peak energy time - great for exciting adventures",
      timeContext: "Midday"
    };
  }

  // Afternoon (2-5 PM)
  if (hour >= 14 && hour < 17) {
    return {
      primaryMood: "Chill",
      secondaryMoods: ["Happy", "Adventurous"],
      preferredGenres: ["Drama", "Romance", "Comedy"],
      reasoning: "Wind down with engaging stories and lighter content",
      timeContext: "Afternoon"
    };
  }

  // Early Evening (5-7 PM)
  if (hour >= 17 && hour < 19) {
    return {
      primaryMood: isWeekend ? "Happy" : "Chill",
      secondaryMoods: isWeekend ? ["Adventurous", "Chill"] : ["Happy", "Adventurous"],
      preferredGenres: isWeekend ? ["Action", "Comedy", "Adventure"] : ["Drama", "Romance", "Comedy"],
      reasoning: isWeekend ? "Weekend vibes - time for entertainment!" : "Transition from work to relaxation",
      timeContext: "Early Evening"
    };
  }

  // Prime Time (7-10 PM)
  if (hour >= 19 && hour < 22) {
    return {
      primaryMood: isWeekend ? "Adventurous" : "Happy",
      secondaryMoods: ["Chill", "Happy", "Adventurous"],
      preferredGenres: ["Action", "Drama", "Comedy", "Romance"],
      reasoning: "Prime movie time - perfect for any genre you're in the mood for",
      timeContext: "Prime Time"
    };
  }

  // Late Evening (10 PM - 12 AM)
  if (hour >= 22 || hour < 1) {
    return {
      primaryMood: isWeekend ? "Scared" : "Chill",
      secondaryMoods: isWeekend ? ["Adventurous", "Chill"] : ["Happy", "Sad"],
      preferredGenres: isWeekend ? ["Horror", "Action", "Drama"] : ["Drama", "Romance", "Comedy"],
      reasoning: isWeekend ? "Late night thrills and entertainment" : "Wind down with calmer, thoughtful content",
      timeContext: "Late Evening"
    };
  }

  // Late Night (12-5 AM)
  return {
    primaryMood: "Scared",
    secondaryMoods: ["Chill", "Sad"],
    preferredGenres: ["Horror", "Drama", "Documentary"],
    reasoning: "Late night is perfect for atmospheric and intense films",
    timeContext: "Late Night"
  };
}

export function getTimeGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon"; 
  if (hour >= 17 && hour < 22) return "Good evening";
  return "Good night";
}

export function shouldShowTimeRecommendation(): boolean {
  // Show time recommendations between 6 AM and 11 PM
  const hour = new Date().getHours();
  return hour >= 6 && hour <= 23;
}