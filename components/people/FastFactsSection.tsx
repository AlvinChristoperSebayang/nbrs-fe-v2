"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";

export type FastFact = {
  number: string;
  label: string;
};

const FAST_FACTS: FastFact[] = [
  { number: "90", label: "Team members" },
  { number: "3", label: "Practices" },
  { number: "5", label: "Sectors" },
  { number: "2", label: "Studios" },
  { number: "57+", label: "Years" },
];

function parseNumberAndSuffix(raw: string) {
  const match = raw.match(/^(\d+)(.*)$/);
  if (match) {
    return {
      target: parseInt(match[1], 10),
      suffix: match[2] || "",
    };
  }
  return { target: null, suffix: raw };
}

function AnimatedCounter({ rawNumber }: { rawNumber: string }) {
  const { target, suffix } = parseNumberAndSuffix(rawNumber);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (target === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let startTimestamp: number | null = null;
          const duration = 1500; // 1.5 seconds smooth counting

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Cubic ease-out
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeProgress * target);
            setCount(currentCount);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    const el = ref.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
      observer.disconnect();
    };
  }, [target, hasAnimated]);

  if (target === null) {
    return <span>{rawNumber}</span>;
  }

  return (
    <span ref={ref}>
      {hasAnimated ? count : 0}
      {suffix}
    </span>
  );
}

export type FastFactsSectionProps = {
  title?: string;
  facts?: FastFact[];
};

export function FastFactsSection({
  title = "FAST FACTS",
  facts = FAST_FACTS,
}: FastFactsSectionProps) {
  const items = facts && facts.length > 0 ? facts : FAST_FACTS;

  return (
    <section className="bg-zinc-100 py-12 lg:py-24 text-black">
      <Container>
        <div className="flex flex-col items-center lg:items-start gap-22 lg:gap-14 py-10 md:py-0">
          {/* Section Title */}
          {title && (
            <h2
              data-aos="fade-up"
              className="font-heading text-3xl sm:text-4xl lg:text-[40px] uppercase font-bold text-black leading-none text-center lg:text-left"
            >
              {title}
            </h2>
          )}

          {/* Stats Counters Grid */}
          <div className="w-full flex flex-col md:flex-row gap-14 sm:gap-0 items-center justify-around text-center">
            {items.map((fact, index) => (
              <div
                key={`${fact.label}-${index}`}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className="flex flex-col items-center justify-center gap-1 sm:gap-2"
              >
                <span className="font-sans text-5xl lg:text-[40px] font-bold text-stone-800 leading-none">
                  <AnimatedCounter rawNumber={fact.number} />
                </span>
                <span className="font-sans text-[28px] text-stone-700 font-normal">
                  {fact.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
