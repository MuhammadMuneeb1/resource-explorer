"use client";

import { Suspense } from "react";
import { CharacterList } from "@/components/CharacterList";
import { ListControls } from "@/components/ListControls";
import { useFavorites } from "@/providers/favorites";
import { useSearchParams } from "next/navigation";

function CharactersPageInner() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const q = searchParams.get("q") || "";
  const status = (searchParams.get("status") || "") as "alive" | "dead" | "unknown" | "";
  const gender = (searchParams.get("gender") || "") as "female" | "male" | "genderless" | "unknown" | "";
  const sort = ((searchParams.get("sort") as "name_asc" | "name_desc") || "name_asc");
  const onlyFavorites = searchParams.get("fav") === "1";

  const { favoritesSet, favoriteIds } = useFavorites();

  return (
    <div className="space-y-4" id="list-top">
      <h1 className="text-2xl font-semibold tracking-tight">Characters</h1>
      <ListControls favoritesCount={favoriteIds.length} />
      <CharacterList
        page={page}
        name={q}
        status={status}
        gender={gender}
        sort={sort}
        onlyFavorites={onlyFavorites}
        favoritesSet={favoritesSet}
      />
      
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <CharactersPageInner />
    </Suspense>
  );
}
