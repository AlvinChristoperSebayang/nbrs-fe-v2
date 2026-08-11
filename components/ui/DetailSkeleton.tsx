import { Container } from "@/components/ui/Container";

export function DetailSkeleton() {
  return (
    <article className="min-h-screen bg-white text-black animate-pulse">
      {/* Hero Skeleton Header */}
      <section className="relative flex h-[500px] lg:h-[650px] w-full items-center bg-[#0B131F]">
        <Container className="relative z-10 flex flex-col gap-6">
          <div className="h-6 w-32 rounded bg-white/20" />
          <div className="h-14 w-3/4 max-w-2xl rounded bg-white/30" />
          <div className="h-10 w-1/2 max-w-lg rounded bg-white/20" />
          <div className="mt-4 flex gap-4">
            <div className="h-5 w-24 rounded bg-white/20" />
            <div className="h-5 w-32 rounded bg-white/20" />
          </div>
        </Container>
      </section>

      {/* Body Content Skeleton */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column Skeleton */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="h-12 w-48 rounded bg-zinc-200" />
              <div className="h-2 w-36 rounded bg-zinc-200" />
            </div>

            {/* Right Column Skeleton */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="h-5 w-full rounded bg-zinc-200" />
              <div className="h-5 w-11/12 rounded bg-zinc-200" />
              <div className="h-5 w-4/5 rounded bg-zinc-200" />
              <div className="h-64 w-full rounded bg-zinc-200 mt-6" />
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
