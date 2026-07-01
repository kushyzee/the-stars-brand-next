"use client";

import Link from "next/link";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GalleryError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h2 className="font-playfair text-2xl text-foreground-black">
        Something went wrong
      </h2>
      <p className="text-muted-foreground font-montserrat text-sm">
        We couldn&apos;t load the gallery. Please try again.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="font-montserrat text-sm underline underline-offset-4 text-foreground-black"
        >
          Try again
        </button>
        <Link
          href="/"
          className="font-montserrat text-sm underline underline-offset-4 text-muted-foreground"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
