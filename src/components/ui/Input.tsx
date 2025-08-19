"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

const INPUT_SIZES = { sm: "h-9 px-3 text-sm", md: "h-10 px-3 text-sm", lg: "h-11 px-4 text-base" } as const;
type InputSize = keyof typeof INPUT_SIZES;

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & { uiSize?: InputSize };

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, uiSize = "md", ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      className={clsx(
        "w-full rounded-md border border-neutral-300 bg-white text-black placeholder:text-neutral-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:bg-neutral-900 dark:text-white dark:border-neutral-800",
        INPUT_SIZES[uiSize],
        className
      )}
      {...rest}
    />
  );
});


