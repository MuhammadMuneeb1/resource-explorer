export type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type CharactersResponse = {
  info: { count: number; pages: number; next: string | null; prev: string | null };
  results: Character[];
};

export type CharacterFilter = {
  page?: number;
  name?: string;
  status?: "alive" | "dead" | "unknown" | "";
  species?: string;
  gender?: "female" | "male" | "genderless" | "unknown" | "";
  sort?: "name_asc" | "name_desc";
};

export async function fetchCharacters(filter: CharacterFilter, signal?: AbortSignal): Promise<CharactersResponse> {
  const params = new URLSearchParams();
  if (filter.page) params.set("page", String(filter.page));
  if (filter.name) params.set("name", filter.name);
  if (filter.status) params.set("status", filter.status);
  if (filter.species) params.set("species", filter.species);
  if (filter.gender) params.set("gender", filter.gender);

  const res = await fetch(`https://rickandmortyapi.com/api/character?${params.toString()}`, { signal, cache: "no-store" });
  if (!res.ok) {
    let message = `Request failed with ${res.status}`;
    try {
      const errorJson = await res.json();
      if (errorJson?.error) message = errorJson.error;
    } catch {
      const text = await res.text();
      if (text) message = text;
    }
    throw new Error(message);
  }
  const data: CharactersResponse = await res.json();

  if (filter.sort) {
    if (filter.sort === "name_asc") data.results.sort((a, b) => a.name.localeCompare(b.name));
    if (filter.sort === "name_desc") data.results.sort((a, b) => b.name.localeCompare(a.name));
  }

  return data;
}

export async function fetchCharacterById(id: number, signal?: AbortSignal): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, { signal });
  if (!res.ok) throw new Error(`Character ${id} not found`);
  return res.json();
}

export async function fetchCharactersByIds(ids: number[], signal?: AbortSignal): Promise<Character[]> {
  if (!ids.length) return [];
  const url = `https://rickandmortyapi.com/api/character/${ids.join(",")}`;
  const res = await fetch(url, { signal, cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load favorites`);
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}


