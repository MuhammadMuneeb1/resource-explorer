"use client";

import { HTMLAttributes } from "react";
import clsx from "clsx";

type Props = HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "success" | "danger" };

export function Badge({ className, variant = "default", ...rest }: Props) {
  const variants = {
    default: "bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100",
    success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
    danger: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200",
  } as const;
  return <span className={clsx("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", variants[variant], className)} {...rest} />;
}


