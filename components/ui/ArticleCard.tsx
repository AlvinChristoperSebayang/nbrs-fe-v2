"use client";

import { useState } from "react";
import Link from "next/link";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

import { normalizeNewlines, formatCmsHtml } from "@/lib/text";

export type ArticleCardProps = {
  id?: string;
  slug: string;
  title: string;
  image: ImageSource;
  hoverColor?: string;
  href?: string;
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

export function ArticleCard({
  item,
  hrefPrefix = "news",
  readMoreText = "Read more",
}: {
  item: ArticleCardProps;
  hrefPrefix?: string;
  readMoreText?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverColor = item.hoverColor || "#DEE1F2";
  const linkHref = item.href || `/${hrefPrefix}/${item.slug}`;

  return (
    <Link
      href={linkHref}
      title={item.title}
      aria-label={item.title}
      className="group flex flex-col w-full h-full overflow-hidden rounded-[3px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Image (Subtle Scale Zoom on Hover) */}
      <div className="relative aspect-[1200/840] w-full overflow-hidden bg-zinc-100">
        <ResponsiveImage
          src={item.image}
          alt={item.title}
          title={item.title}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
      </div>

      {/* Card Info Box */}
      <div
        className="flex min-h-[160px] lg:min-h-[180px] xl:min-h-[200px] flex-col justify-between p-4 sm:p-5 lg:p-5 xl:p-6 transition-colors duration-500 ease-out h-full flex-1"
        style={{
          backgroundColor: isHovered ? hoverColor : "#000000",
          color: isHovered ? "#000000" : "#ffffff",
        }}
      >
        {renderFormattedTitle(item.title)}

        <div className="mt-4 sm:mt-6 flex items-end justify-between">
          <span className="text-sm sm:text-base font-normal">{readMoreText}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 lg:w-6 lg:h-6 xl:w-8 xl:h-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
