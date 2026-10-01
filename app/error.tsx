"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[50dvh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-xl font-semibold text-white">Something went wrong</h1>
      <p className="text-sm text-secondary">
        {error.message || "Content failed to load. Please try again."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="border border-primary px-4 py-2 text-sm text-white transition-colors hover:bg-primary hover:text-background"
      >
        Try again
      </button>
    </div>
  );
}
