"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/Button";

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current = mounted ? (theme === "system" ? resolvedTheme : theme) : undefined;
  const isDark = current === "dark";
  const label = mounted ? (isDark ? "Light" : "Dark") : "Theme";
  return (
    <header className="sticky top-0 z-30 w-full border-b border-neutral-200 bg-white/70 backdrop-blur dark:bg-neutral-950/70 dark:border-neutral-900">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          Resource Explorer
        </Link>
        <nav className="flex items-center gap-2">
          <Link href="/favorites" className="text-sm hover:underline">
            Favorites
          </Link>
          <Button
            variant="secondary"
            size="sm"
            aria-label="Toggle theme"
            disabled={!mounted}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {label}
          </Button>
        </nav>
      </div>
    </header>
  );
}


