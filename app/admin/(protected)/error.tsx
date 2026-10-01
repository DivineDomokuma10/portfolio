"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-white">Couldn&apos;t load content</h1>
      <p className="text-sm text-secondary">
        {error.message || "Supabase request failed. Check env and table status, then retry."}
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
