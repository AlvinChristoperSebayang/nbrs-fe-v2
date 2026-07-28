"use client";

import Link from "next/link";
import type { TextResearchItem } from "@/lib/research-data";

export function TextResearchCard({ item }: { item: TextResearchItem }) {
  return (
    <Link
      href={`/research/${item.slug}`}
      className="group flex h-[150px] w-full flex-col overflow-hidden border border-[#E7E7E7] transition-all duration-300 hover:border-black"
    >
      {/* Top Title Section */}
      <div className="flex h-[94px] w-full items-start bg-[#E7E7E7] p-5 transition-colors duration-300 group-hover:bg-black">
        <span className="font-sans text-base font-normal text-black transition-colors duration-300 group-hover:text-white leading-snug">
          {item.title}
        </span>
      </div>

      {/* Bottom Read More Section */}
      <div className="flex h-[56px] w-full items-center justify-between bg-white px-5 py-3 transition-colors duration-300 group-hover:bg-black">
        <span className="font-sans text-base font-normal text-black transition-colors duration-300 group-hover:text-white">
          Read more
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-black transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
