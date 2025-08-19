import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchCharacterById } from "@/lib/rickmorty";
import { Button } from "@/components/ui/Button";
import { FavoriteButton } from "@/components/favorite/FavoriteButton";
import NotesForm from "@/components/notes/NotesForm";

async function CharacterDetail({ id }: { id: number }) {
  const controller = new AbortController();
  const character = await fetchCharacterById(id, controller.signal);
  return (
    <div className="grid gap-6 md:grid-cols-[280px_1fr]">
      <div className="relative aspect-square rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
        <Image src={character.image} alt={character.name} fill sizes="(max-width: 768px) 100vw, 280px" className="object-cover" priority />
      </div>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">{character.name}</h1>
          <FavoriteButton id={character.id} />
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-neutral-500">Status:</span> {character.status}</div>
          <div><span className="text-neutral-500">Species:</span> {character.species}</div>
          <div><span className="text-neutral-500">Gender:</span> {character.gender}</div>
          <div><span className="text-neutral-500">Origin:</span> {character.origin.name}</div>
          <div><span className="text-neutral-500">Location:</span> {character.location.name}</div>
          <div><span className="text-neutral-500">Episodes:</span> {character.episode.length}</div>
        </div>
        <NotesForm id={character.id} />
        <div className="flex gap-2">
          <Link href="/">
            <Button variant="secondary">Back</Button>
          </Link>
          <a href={character.url} target="_blank" rel="noreferrer">
            <Button>Open API</Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  return (
    <Suspense>
      <CharacterDetail id={id} />
    </Suspense>
  );
}


