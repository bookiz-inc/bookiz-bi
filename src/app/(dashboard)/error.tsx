'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-gray-900">Something went wrong!</h2>
      <p className="mt-2 text-gray-600">Failed to load dashboard data</p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
      >
        Try again
      </button>
    </div>
  );
}