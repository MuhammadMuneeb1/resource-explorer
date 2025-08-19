"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacters, fetchCharactersByIds, Character } from "@/lib/rickmorty";
import { CharacterCard } from "@/components/CharacterCard";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/Pagination";

function useAbortableQuery<TQueryFnData, TError>(
  queryKey: unknown[],
  queryFn: (signal: AbortSignal) => Promise<TQueryFnData>
) {
  return useQuery<TQueryFnData, TError>({
    queryKey,
    queryFn: async ({ signal }) => queryFn(signal as AbortSignal),
    retry: 1,
    placeholderData: prev => prev,
  });
}

export function CharacterList({
  page,
  name,
  status,
  gender,
  sort,
  onlyFavorites,
  favoritesSet,
}: {
  page: number;
  name: string;
  status: "alive" | "dead" | "unknown" | "";
  gender: "female" | "male" | "genderless" | "unknown" | "";
  sort: "name_asc" | "name_desc";
  onlyFavorites: boolean;
  favoritesSet: Set<number>;
}) {
  const listQueryKey = useMemo(
    () => ["characters", { page, name, status, gender, sort }],
    [page, name, status, gender, sort]
  );
  const favoritesQueryKey = useMemo(() => ["characters-fav", Array.from(favoritesSet).sort()], [favoritesSet]);

  const listQuery = useAbortableQuery<{ info: { count: number; pages: number }; results: Character[] }, Error>(
    listQueryKey,
    async (signal) => fetchCharacters({ page, name, status, gender, sort }, signal)
  );
  const favQuery = useAbortableQuery<Character[], Error>(
    favoritesQueryKey,
    async (signal) => fetchCharactersByIds(Array.from(favoritesSet), signal)
  );

  const isEmpty = (!onlyFavorites && listQuery.isSuccess && listQuery.data.results.length === 0) || (onlyFavorites && favQuery.isSuccess && favQuery.data.length === 0);

  const results = useMemo(() => {
    if (onlyFavorites) return favQuery.data ?? [];
    return listQuery.data?.results ?? [];
  }, [onlyFavorites, favQuery.data, listQuery.data]);

  if ((!onlyFavorites && listQuery.isLoading) || (onlyFavorites && favQuery.isLoading)) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="h-56 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
        ))}
      </div>
    );
  }

  if ((!onlyFavorites && listQuery.isError) || (onlyFavorites && favQuery.isError)) {
    const message = ((onlyFavorites ? favQuery.error : listQuery.error) as Error)?.message || "";
    return (
      <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 text-center">
        <p className="mb-2">Failed to load characters.</p>
        {message && <p className="text-sm text-neutral-500 mb-4">{message}</p>}
        <Button onClick={() => (onlyFavorites ? favQuery.refetch() : listQuery.refetch())}>
          Retry
        </Button>
      </div>
    );
  }

  if (isEmpty || results.length === 0) {
    return (
      <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-6 text-center">
        <p>No results. Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((c, idx) => (
          <CharacterCard key={c.id} character={c} priority={idx === 0} />
        ))}
      </div>
      {!onlyFavorites && <Pagination totalPages={listQuery.data?.info.pages ?? 1} />}
    </div>
  );
}


