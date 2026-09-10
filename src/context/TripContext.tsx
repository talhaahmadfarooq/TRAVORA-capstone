import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type {
  Trip,
  Flight,
  Stay,
  JourneySearch,
  FavoritesState,
  TripItem,
} from '../types';
import {
  mockInitialTrip,
  mockInitialFavorites,
  mockJourneySearch,
} from '../data/mockData';

const FAVORITES_STORAGE_KEY = 'travora_favorites_v1';
const TRIP_STORAGE_KEY = 'travora_current_trip_v1';

export interface TripContextType {
  favorites: FavoritesState;
  currentTrip: Trip;
  journeySearch: JourneySearch;
  selectedFlight: Flight | null;
  selectedStay: Stay | null;
  viewMode: '3d' | '2d';
  toggleFavorite: (type: 'destination' | 'stay', id: string) => void;
  isFavorite: (type: 'destination' | 'stay', id: string) => boolean;
  addFlightToTrip: (flight: Flight, dayNumber?: number) => void;
  addStayToTrip: (stay: Stay, dayNumber?: number) => void;
  addActivityToTrip: (
    dayIndex: number,
    activity: { id?: string; title: string; time?: string; details?: string }
  ) => void;
  removeTripItem: (dayIndex: number, itemId: string) => void;
  reorderTripItems: (dayIndex: number, startIndex: number, endIndex: number) => void;
  setJourneySearch: (params: JourneySearch) => void;
  setSelectedFlight: (flight: Flight | null) => void;
  setSelectedStay: (stay: Stay | null) => void;
  setViewMode: (mode: '3d' | '2d') => void;
  setCurrentTrip: (trip: Trip) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoritesState>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : mockInitialFavorites;
    } catch {
      return mockInitialFavorites;
    }
  });

  const [currentTrip, setCurrentTrip] = useState<Trip>(() => {
    try {
      const stored = localStorage.getItem(TRIP_STORAGE_KEY);
      return stored ? JSON.parse(stored) : mockInitialTrip;
    } catch {
      return mockInitialTrip;
    }
  });

  const [journeySearch, setJourneySearch] = useState<JourneySearch>(mockJourneySearch);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  // Sync currentTrip to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(TRIP_STORAGE_KEY, JSON.stringify(currentTrip));
    } catch (e) {
      console.warn('Failed to save trip to localStorage', e);
    }
  }, [currentTrip]);

  const toggleFavorite = (type: 'destination' | 'stay', id: string) => {
    setFavorites((prev) => {
      const key = type === 'destination' ? 'destinations' : 'stays';
      const exists = prev[key].includes(id);
      return {
        ...prev,
        [key]: exists ? prev[key].filter((item) => item !== id) : [...prev[key], id],
      };
    });
  };

  const isFavorite = (type: 'destination' | 'stay', id: string) => {
    const key = type === 'destination' ? 'destinations' : 'stays';
    return favorites[key].includes(id);
  };

  const addFlightToTrip = (flight: Flight, dayNumber = 1) => {
    setSelectedFlight(flight);
    const flightItem: TripItem = {
      id: `trip-item-fl-${Date.now()}`,
      type: 'flight',
      title: `Flight ${flight.flightNumber}: ${flight.departureAirport} → ${flight.arrivalAirport}`,
      time: `${flight.departureTime} - ${flight.arrivalTime}`,
      details: `${flight.airline} • $${flight.price} • ${flight.duration}`,
    };

    setCurrentTrip((prev) => {
      const dayIdx = Math.max(0, Math.min(dayNumber - 1, prev.days.length - 1));
      const updatedDays = [...prev.days];
      if (updatedDays[dayIdx]) {
        updatedDays[dayIdx] = {
          ...updatedDays[dayIdx],
          items: [flightItem, ...updatedDays[dayIdx].items],
        };
      }
      return { ...prev, days: updatedDays };
    });
  };

  const addStayToTrip = (stay: Stay, dayNumber = 1) => {
    setSelectedStay(stay);
    const stayItem: TripItem = {
      id: `trip-item-st-${Date.now()}`,
      type: 'stay',
      title: `Check-in: ${stay.name}`,
      time: '03:00 PM',
      details: `${stay.location} • $${stay.pricePerNight}/night • Rating ${stay.rating}★`,
    };

    setCurrentTrip((prev) => {
      const dayIdx = Math.max(0, Math.min(dayNumber - 1, prev.days.length - 1));
      const updatedDays = [...prev.days];
      if (updatedDays[dayIdx]) {
        updatedDays[dayIdx] = {
          ...updatedDays[dayIdx],
          items: [...updatedDays[dayIdx].items, stayItem],
        };
      }
      return { ...prev, days: updatedDays };
    });
  };

  const addActivityToTrip = (
    dayIndex: number,
    activity: { id?: string; title: string; time?: string; details?: string }
  ) => {
    const activityItem: TripItem = {
      id: activity.id || `act-${Date.now()}`,
      type: 'activity',
      title: activity.title,
      time: activity.time || '10:00 AM',
      details: activity.details || '',
    };

    setCurrentTrip((prev) => {
      if (dayIndex < 0 || dayIndex >= prev.days.length) return prev;
      const updatedDays = [...prev.days];
      updatedDays[dayIndex] = {
        ...updatedDays[dayIndex],
        items: [...updatedDays[dayIndex].items, activityItem],
      };
      return { ...prev, days: updatedDays };
    });
  };

  const removeTripItem = (dayIndex: number, itemId: string) => {
    setCurrentTrip((prev) => {
      if (dayIndex < 0 || dayIndex >= prev.days.length) return prev;
      const updatedDays = [...prev.days];
      updatedDays[dayIndex] = {
        ...updatedDays[dayIndex],
        items: updatedDays[dayIndex].items.filter((item) => item.id !== itemId),
      };
      return { ...prev, days: updatedDays };
    });
  };

  const reorderTripItems = (dayIndex: number, startIndex: number, endIndex: number) => {
    setCurrentTrip((prev) => {
      if (dayIndex < 0 || dayIndex >= prev.days.length) return prev;
      const day = prev.days[dayIndex];
      const newItems = Array.from(day.items);
      const [removed] = newItems.splice(startIndex, 1);
      newItems.splice(endIndex, 0, removed);

      const updatedDays = [...prev.days];
      updatedDays[dayIndex] = {
        ...day,
        items: newItems,
      };
      return { ...prev, days: updatedDays };
    });
  };

  return (
    <TripContext.Provider
      value={{
        favorites,
        currentTrip,
        journeySearch,
        selectedFlight,
        selectedStay,
        viewMode,
        toggleFavorite,
        isFavorite,
        addFlightToTrip,
        addStayToTrip,
        addActivityToTrip,
        removeTripItem,
        reorderTripItems,
        setJourneySearch,
        setSelectedFlight,
        setSelectedStay,
        setViewMode,
        setCurrentTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip(): TripContextType {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}


