"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ResearchItem } from "@/lib/research-data";

type ResearchCardItem = Pick<
  ResearchItem,
  "id" | "slug" | "title" | "image" | "hoverColor"
>;

function renderFormattedTitle(title: string) {
  const colonIndex = title.indexOf(":");
  if (colonIndex !== -1) {
    const prefix = title.slice(0, colonIndex + 1);
    const suffix = title.slice(colonIndex + 1).trim();
    return (
      <div className="font-sans text-xl leading-snug md:max-w-56">
        <span className="block font-bold">{prefix}</span>
        {suffix && <span className="block font-normal">{suffix}</span>}
      </div>
    );
  }

  return (
    <div className="font-sans text-xl font-bold leading-snug">
      {title}
    </div>
  );
}

export function ResearchCard({ item }: { item: ResearchCardItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/research/${item.slug}`}
      className="group flex flex-col w-full overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Image */}
      <div className="relative aspect-[370/300] w-full overflow-hidden bg-zinc-100 min-h-[150px] max-h-[150px] md:min-h-[300px] md:max-h-[300px]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card Info Box */}
      <div
        className="flex min-h-[200px]  flex-col justify-between px-5 py-[22px] transition-colors duration-300 h-full"
        style={{
          backgroundColor: isHovered ? item.hoverColor : "#000000",
          color: isHovered ? "#000000" : "#ffffff",
        }}
      >
        {renderFormattedTitle(item.title)}

        <div className="mt-6 flex items-end justify-between">
          <span className="text-base font-normal">Read more</span>
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
