"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-background grid-pattern min-h-dvh antialiased">
        <div className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
          <h1 className="text-xl font-semibold text-white">Something went wrong</h1>
          <p className="text-sm text-secondary">
            {error.message || "The page failed to load."}
          </p>
          <button
            type="button"
            onClick={reset}
            className="border border-primary px-4 py-2 text-sm text-white"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
