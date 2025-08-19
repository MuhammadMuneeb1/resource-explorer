"use client";

import Image from "next/image";
import Link from "next/link";
import { Character } from "@/lib/rickmorty";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useFavorites } from "@/providers/favorites";

export function CharacterCard({ character, priority = false }: { character: Character; priority?: boolean }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(character.id);
  return (
    <div className="group rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-950 shadow-sm">
      <Link href={`/characters/${character.id}`} className="block relative aspect-[16/10]">
        <Image src={character.image} alt={character.name} fill className="object-cover transition-transform group-hover:scale-[1.02]" sizes="(max-width: 768px) 100vw, 33vw" priority={priority} />
      </Link>
      <div className="p-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link href={`/characters/${character.id}`} className="font-medium line-clamp-1 hover:underline">
            {character.name}
          </Link>
          <div className="mt-1 flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
            <Badge variant={character.status === "Alive" ? "success" : character.status === "Dead" ? "danger" : "default"}>{character.status}</Badge>
            <span className="truncate">{character.species}</span>
          </div>
        </div>
        <Button
          aria-pressed={fav}
          aria-label={fav ? "Remove favorite" : "Add favorite"}
          variant={fav ? "secondary" : "ghost"}
          size="sm"
          onClick={() => toggleFavorite(character.id)}
        >
          {fav ? "★" : "☆"}
        </Button>
      </div>
    </div>
  );
}


