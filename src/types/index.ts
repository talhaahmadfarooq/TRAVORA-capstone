export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
}

export interface DestinationWeather {
  temp: number;
  condition: string;
  humidity: number;
  wind: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  tagLine: string;
  description: string;
  heroImage: string;
  mastheadImage?: string;
  gallery: string[];
  coordinates: [number, number]; // [lat, lng]
  category: string;
  mood: string;
  bestTime: string;
  language: string;
  currency: string;
  timezone: string;
  weather: DestinationWeather;
  experiences: Experience[];
  places?: Experience[];
  food?: Experience[];
  nightlife?: Experience[];
  recommendedStayIds: string[];
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  date: string;
}

export interface StayRoom {
  type: string;
  price: number;
  capacity: number;
}

export interface Stay {
  id: string;
  name: string;
  location: string;
  destinationId: string;
  rating: number;
  pricePerNight: number;
  image: string;
  gallery: string[];
  amenities: string[];
  overview: string;
  rooms: StayRoom[];
}

export interface TripItem {
  id: string;
  type: 'flight' | 'stay' | 'activity';
  title: string;
  time?: string;
  details?: string;
}

export interface TripDay {
  dayNumber: number;
  date: string;
  items: TripItem[];
}

export interface Trip {
  id: string;
  title: string;
  destinationName: string;
  startDate: string;
  endDate: string;
  days: TripDay[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  savedDestinationsCount: number;
  savedStaysCount: number;
}

export interface JourneySearch {
  origin: string;
  destination: string;
  date: string;
  travelers: number;
}

export interface FavoritesState {
  destinations: string[];
  stays: string[];
}
