"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type FavoritesContextValue = {
  favoritesSet: Set<number>;
  favoriteIds: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
  setFavorite: (id: number, value: boolean) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const STORAGE_KEY = "rx_favorites_v1";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoritesSet, setFavoritesSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as number[];
        setFavoritesSet(new Set(parsed));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favoritesSet)));
    } catch {}
  }, [favoritesSet]);

  const isFavorite = useCallback((id: number) => favoritesSet.has(id), [favoritesSet]);

  const setFavorite = useCallback((id: number, value: boolean) => {
    setFavoritesSet(prev => {
      const next = new Set(prev);
      if (value) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavoritesSet(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const value = useMemo<FavoritesContextValue>(() => {
    return {
      favoritesSet,
      favoriteIds: Array.from(favoritesSet),
      isFavorite,
      toggleFavorite,
      setFavorite,
    };
  }, [favoritesSet, isFavorite, toggleFavorite, setFavorite]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}


