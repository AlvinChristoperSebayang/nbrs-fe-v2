"use client";

import { useState } from "react";
import Link from "next/link";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";
import { normalizeNewlines, formatCmsHtml } from "@/lib/text";

type ResearchCardItem = {
  id: string;
  slug: string;
  title: string;
  image: ImageSource;
  hoverColor: string;
};

function renderFormattedTitle(title: string) {
  const normalized = normalizeNewlines(title || "").trim();
  const colonIndex = normalized.indexOf(":");
  if (colonIndex !== -1) {
    const prefix = normalized.slice(0, colonIndex + 1);
    const suffix = normalized.slice(colonIndex + 1).trim();
    return (
      <div className="font-sans leading-snug">
        <span
          className="block font-bold text-base sm:text-lg lg:text-[17px] xl:text-xl uppercase"
          dangerouslySetInnerHTML={{ __html: formatCmsHtml(prefix) }}
        />
        {suffix && (
          <span
            className="block font-normal text-sm sm:text-base lg:text-[15px] xl:text-lg mt-0.5 uppercase"
            dangerouslySetInnerHTML={{ __html: formatCmsHtml(suffix) }}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="font-sans text-base sm:text-lg lg:text-[17px] xl:text-xl font-bold leading-snug uppercase"
      dangerouslySetInnerHTML={{ __html: formatCmsHtml(normalized) }}
    />
  );
}

export function ResearchCard({ item }: { item: ResearchCardItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/research/${item.slug}`}
      title={item.title}
      aria-label={item.title}
      className="group flex flex-col w-full h-full overflow-hidden transition-all duration-300 rounded-[3px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Image */}
      <div className="relative aspect-[370/300] w-full overflow-hidden bg-zinc-100">
        <ResponsiveImage
          src={item.image}
          alt={item.title}
          title={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card Info Box */}
      <div
        className="flex flex-1 flex-col justify-between p-5 lg:p-5 xl:p-6 transition-colors duration-300 min-h-[170px] lg:min-h-[180px] xl:min-h-[200px]"
        style={{
          backgroundColor: isHovered ? item.hoverColor : "#000000",
          color: isHovered ? "#000000" : "#ffffff",
        }}
      >
        {renderFormattedTitle(item.title)}

        <div className="mt-5 flex items-end justify-between">
          <span className="text-sm sm:text-base font-normal">Read more</span>
          <svg
            width="28"
            height="28"
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
