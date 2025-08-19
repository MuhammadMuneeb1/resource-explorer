"use client";

import { SelectHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

const SELECT_SIZES = { sm: "h-9 px-3 text-sm", md: "h-10 px-3 text-sm", lg: "h-11 px-4 text-base" } as const;
type SelectSize = keyof typeof SELECT_SIZES;
type Props = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & { uiSize?: SelectSize };

export const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { className, uiSize = "md", children, ...rest },
  ref
) {
  return (
    <select
      ref={ref}
      className={clsx(
        "w-full rounded-md border border-neutral-300 bg-white text-black placeholder:text-neutral-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:bg-neutral-900 dark:text-white dark:border-neutral-800",
        SELECT_SIZES[uiSize],
        className
      )}
      {...rest}
    >
      {children}
    </select>
  );
});


