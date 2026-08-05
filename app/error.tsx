"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4 text-ink">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-display tracking-tight">This page didn&apos;t load</h1>
        <p className="mt-2 text-sm text-ink/60">Something went wrong.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => reset()}
            className="bg-ink px-5 py-3 font-label text-sm text-paper hover:bg-accent-rust"
          >
            Try again
          </button>
          <a href="/" className="border border-ink/30 px-5 py-3 font-label text-sm hover:bg-ink/10">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
