"use client";

import { Button } from "@/components/ui/Button";
import { useFavorites } from "@/providers/favorites";

export function FavoriteButton({ id }: { id: number }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(id);
  return (
    <Button
      aria-pressed={fav}
      aria-label={fav ? "Remove favorite" : "Add favorite"}
      variant={fav ? "secondary" : "ghost"}
      onClick={() => toggleFavorite(id)}
    >
      {fav ? "★ Favorited" : "☆ Favorite"}
    </Button>
  );
}


