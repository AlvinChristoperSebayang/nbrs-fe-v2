"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <article className="flex min-h-[70vh] flex-col items-center justify-center bg-[#181D33] py-24 text-white">
      <Container className="flex flex-col items-center text-center">
        <span className="font-heading text-6xl font-bold tracking-tighter text-[#FFD6CD] sm:text-8xl">
          Something went wrong
        </span>
        <h1 className="mt-4 font-heading text-2xl font-bold uppercase tracking-wide sm:text-4xl">
          An unexpected error occurred
        </h1>
        <p className="mt-4 max-w-md font-sans text-base text-white/70 sm:text-lg">
          We apologise for the inconvenience. Please try reloading the page or return to the homepage.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="cursor-pointer rounded-full bg-white px-8 py-3.5 font-heading text-sm font-semibold uppercase tracking-wider text-[#181D33] transition-all duration-300 hover:bg-[#FFD6CD] hover:scale-105"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-full border border-white/40 px-8 py-3.5 font-heading text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            Back to Home
          </Link>
        </div>
      </Container>
    </article>
  );
}
