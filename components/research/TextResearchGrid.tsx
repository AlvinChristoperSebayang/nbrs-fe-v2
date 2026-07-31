"use client";

import { DUMMY_TEXT_RESEARCH_ITEMS } from "@/lib/research-data";
import { TextResearchCard } from "./TextResearchCard";

export function TextResearchGrid() {
  return (
    <div className="flex flex-col gap-8">
      <div data-aos="fade-up" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DUMMY_TEXT_RESEARCH_ITEMS.map((item) => (
          <TextResearchCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
