"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function Pagination({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const goTo = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    const next = new URLSearchParams();
    searchParams.forEach((v, k) => {
      if (k !== "page") next.set(k, v);
    });
    next.set("page", String(nextPage));
    router.push(`${pathname}?${next.toString()}`);
  };

  const range = useMemo(() => {
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, totalPages]);

  if (!Number.isFinite(totalPages) || totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <Button size="sm" variant="secondary" disabled={!canPrev} onClick={() => goTo(page - 1)} aria-label="Previous page">
        Prev
      </Button>
      {range.map((p) => (
        <Button
          key={p}
          size="sm"
          variant={p === page ? "primary" : "secondary"}
          onClick={() => goTo(p)}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </Button>
      ))}
      <Button size="sm" variant="secondary" disabled={!canNext} onClick={() => goTo(page + 1)} aria-label="Next page">
        Next
      </Button>
    </div>
  );
}


