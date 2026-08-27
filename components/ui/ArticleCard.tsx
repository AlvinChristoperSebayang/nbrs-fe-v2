"use client";

import { useState } from "react";
import Link from "next/link";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

const STATIC_ARTICLE_CARD_IMAGE = "/images/articles/article-card-static.jpg";

export type ArticleCardProps = {
  id?: string;
  slug: string;
  title: string;
  image: ImageSource;
  hoverColor?: string;
  href?: string;
};

function renderFormattedTitle(title: string) {
  const colonIndex = title.indexOf(":");
  if (colonIndex !== -1) {
    const prefix = title.slice(0, colonIndex + 1);
    const suffix = title.slice(colonIndex + 1).trim();
    return (
      <div className="font-sans text-lg md:text-base lg:text-xl leading-snug md:max-w-56">
        <span className="block font-bold">{prefix}</span>
        {suffix && <span className="block font-normal">{suffix}</span>}
      </div>
    );
  }

  return (
    <div className="font-sans text-lg md:text-base lg:text-xl font-bold leading-snug">
      {title}
    </div>
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
      <div className="relative aspect-[370/300] w-full overflow-hidden bg-zinc-100 min-h-[180px] sm:min-h-[220px] lg:min-h-[280px]">
        <ResponsiveImage
          src={STATIC_ARTICLE_CARD_IMAGE}
          alt={item.title}
          title={item.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
      </div>

      {/* Card Info Box */}
      <div
        className="flex min-h-[140px] sm:min-h-[160px] lg:min-h-[200px] flex-col justify-between p-4 sm:p-5 lg:p-6 lg:py-[22px] transition-colors duration-500 ease-out h-full flex-1"
        style={{
          backgroundColor: isHovered ? hoverColor : "#000000",
          color: isHovered ? "#000000" : "#ffffff",
        }}
      >
        {renderFormattedTitle(item.title)}

        <div className="mt-4 sm:mt-6 flex items-end justify-between">
          <span className="text-sm md:text-xs lg:text-base font-normal">{readMoreText}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 lg:w-8 lg:h-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
