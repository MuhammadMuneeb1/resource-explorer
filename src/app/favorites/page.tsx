"use client";

import { useFavorites } from "@/providers/favorites";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites();
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Favorites</h1>
        <button className="text-sm underline" onClick={() => router.push("/?fav=1")}>View in list</button>
      </div>
      {favoriteIds.length === 0 ? (
        <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 text-center">
          <p>No favorites yet. Go back to the list and add some.</p>
          <div className="mt-2">
            <Link href="/" className="underline">Browse characters</Link>
          </div>
        </div>
      ) : (
        <ul className="list-disc pl-6">
          {favoriteIds.map(id => (
            <li key={id}><Link href={`/characters/${id}`} className="underline">Character #{id}</Link></li>
          ))}
        </ul>
      )}
    </div>
  );
}


