"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";

export default function ProjectsError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-16">
      <h1 className="text-2xl font-semibold text-black">
        Something went wrong loading Projects
      </h1>
      <p className="mt-2 max-w-xl text-zinc-600">{error.message}</p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="mt-6 inline-flex items-center rounded-full border border-black px-6 py-3 text-sm uppercase transition hover:bg-black hover:text-white"
      >
        Try again
      </button>
    </Container>
  );
}
