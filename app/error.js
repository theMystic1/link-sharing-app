"use client";

export default function Error({ error }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button className="inline-block bg-purples-500 text-white-200 px-6 py-3 text-lg">
        Try again
      </button>
    </main>
  );
}
