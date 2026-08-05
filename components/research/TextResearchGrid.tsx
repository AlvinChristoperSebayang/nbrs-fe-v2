"use client";

import type { SecondaryResearchItem } from "@/lib/research-listing";
import { TextResearchCard } from "./TextResearchCard";

export function TextResearchGrid({ items = [] }: { items?: SecondaryResearchItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-8">
      <div data-aos="fade-up" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <TextResearchCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
