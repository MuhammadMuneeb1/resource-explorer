"use client";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ListControls({ favoritesCount }: { favoritesCount: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [status, setStatus] = useState(searchParams.get("status") ?? "");
  const [gender, setGender] = useState(searchParams.get("gender") ?? "");
  const [sort, setSort] = useState(searchParams.get("sort") ?? "name_asc");
  const [onlyFavorites, setOnlyFavorites] = useState(searchParams.get("fav") === "1");

  const debouncedQ = useDebouncedValue(q, 400);

  useEffect(() => {
    const next = new URLSearchParams();
    if (debouncedQ) next.set("q", debouncedQ);
    if (status) next.set("status", status);
    if (gender) next.set("gender", gender);
    if (sort) next.set("sort", sort);
    if (onlyFavorites) next.set("fav", "1");
    next.set("page", "1");
    router.replace(`${pathname}?${next.toString()}`);
  }, [debouncedQ, status, gender, sort, onlyFavorites, pathname, router]);

  useEffect(() => {
    setQ(searchParams.get("q") ?? "");
    setStatus(searchParams.get("status") ?? "");
    setGender(searchParams.get("gender") ?? "");
    setSort(searchParams.get("sort") ?? "name_asc");
    setOnlyFavorites(searchParams.get("fav") === "1");
  }, [searchParams]);

  const isFavoritesEmpty = onlyFavorites && favoritesCount === 0;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label className="text-xs text-neutral-600 dark:text-neutral-400">Search</label>
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name"
          aria-label="Search characters"
        />
      </div>
      <div>
        <label className="text-xs text-neutral-600 dark:text-neutral-400">Status</label>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
          <option value="">Any</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </Select>
      </div>
      <div>
        <label className="text-xs text-neutral-600 dark:text-neutral-400">Gender</label>
        <Select value={gender} onChange={(e) => setGender(e.target.value)} aria-label="Filter by gender">
          <option value="">Any</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </Select>
      </div>
      <div>
        <label className="text-xs text-neutral-600 dark:text-neutral-400">Sort</label>
        <Select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
          <option value="name_asc">Name A–Z</option>
          <option value="name_desc">Name Z–A</option>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <input
          id="fav-only"
          type="checkbox"
          className="h-4 w-4"
          checked={onlyFavorites}
          onChange={(e) => setOnlyFavorites(e.target.checked)}
          aria-checked={onlyFavorites}
        />
        <label htmlFor="fav-only" className="text-sm select-none">
          Favorites only
        </label>
      </div>
      {isFavoritesEmpty && <div className="text-xs text-neutral-500">No favorites yet</div>}
    </div>
  );
}


