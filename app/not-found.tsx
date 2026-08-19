import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <article className="flex min-h-[70vh] flex-col items-center justify-center bg-[#181D33] py-24 text-white">
      <Container className="flex flex-col items-center text-center">
        <span className="font-heading text-7xl font-bold tracking-tighter text-[#FFD6CD] sm:text-9xl">
          404
        </span>
        <h1 className="mt-4 font-heading text-3xl font-bold uppercase tracking-wide sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 max-w-md font-sans text-base text-white/70 sm:text-lg">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-white px-8 py-3.5 font-heading text-sm font-semibold uppercase tracking-wider text-[#181D33] transition-all duration-300 hover:bg-[#FFD6CD] hover:scale-105"
          >
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-white/40 px-8 py-3.5 font-heading text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            Explore Projects
          </Link>
        </div>
      </Container>
    </article>
  );
}
