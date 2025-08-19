"use client";

import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/Button";

export default function NotesForm({ id }: { id: number }) {
  const storageKey = `rx_notes_${id}`;
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const labelId = useId();

  useEffect(() => {
    try {
      const existing = localStorage.getItem(storageKey);
      if (existing !== null) setNote(existing);
    } catch {}
  }, [storageKey]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      localStorage.setItem(storageKey, note);
      setSaved(true);
      setTimeout(() => setSaved(false), 1000);
    } catch {}
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2" aria-labelledby={labelId}>
      <div id={labelId} className="text-sm text-neutral-600 dark:text-neutral-400">Personal note</div>
      <textarea
        className="w-full min-h-24 rounded-md border border-neutral-300 bg-white text-black placeholder:text-neutral-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:bg-neutral-900 dark:text-white dark:border-neutral-800 p-3"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a short note about this character"
      />
      <div className="flex items-center gap-2">
        <Button type="submit">Save note</Button>
        {saved && <span className="text-xs text-emerald-600">Saved</span>}
      </div>
    </form>
  );
}


