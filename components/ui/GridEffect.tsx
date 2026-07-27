"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { NewsItem } from "@/lib/types";

export function GridEffect({
  items,
  title = "Features",
  description,
  viewAllLabel = "View all latest news",
  viewAllUrl = "/blog",
  backgroundColor = "#FFFFFF",
}: {
  items: NewsItem[];
  title?: string;
  description?: string;
  viewAllLabel?: string;
  viewAllUrl?: string;
  backgroundColor?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const showViewAll = Boolean(viewAllLabel && viewAllUrl);

  return (
    <section className="lg:py-24" style={{ backgroundColor }}>
      <Container className="overflow-hidden">
        <div className="mb-6 lg:flex hidden items-start justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-heading text-[28px] lg:text-[24px] uppercase text-black">
              {title}
            </span>
            {description && (
              <p className="max-w-xl text-sm text-black">{description}</p>
            )}
          </div>
          {showViewAll && (
            <Link
              href={viewAllUrl}
              className="group items-center gap-2 font-heading text-lg lg:text-[22px] uppercase text-black lg:flex hidden"
            >
              {viewAllLabel}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path
                  d="M4 12h16m0 0l-6-6m6 6l-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </div>

        <div className="relative w-full">
          <div className="mb-6 lg:hidden flex lg:flex-row flex-col lg:items-center items-start justify-between relative z-10 px-4 pt-12">
            <span className="font-heading text-[28px] lg:text-[22px] uppercase text-white">
              {title}
            </span>
            {showViewAll && (
              <Link
                href={viewAllUrl}
                className="group items-center gap-2 font-heading text-lg lg:text-[22px] uppercase text-white flex"
              >
                {viewAllLabel}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path
                    d="M4 12h16m0 0l-6-6m6 6l-6 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            )}
          </div>
          <div className="absolute w-full h-full overflow-hidden top-0 left-0 z-[5] uncontainer-mobile">
            {items.map((item, index) => (
              <img
                key={item.title}
                src={item.image}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 items-stretch sm:inset-x-0 pb-20 gap-10 lg:gap-20 lg:py-40 lg:px-4 relative z-10">
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              const hasHref = Boolean(item.href);

              const cardClassName = `group flex h-64 flex-col justify-between gap-8 overflow-hidden p-5 transition-colors duration-300 lg:h-80 ${
                isActive
                  ? "bg-black/50 backdrop-blur-[5px] border-b-[5px] border-white"
                  : "bg-white/70 backdrop-blur-[0px] border-b-[5px] border-transparent"
              }`;

              const cardContent = (
                <>
                  <div className="flex flex-col gap-2">
                    <h3
                      className={`font-heading text-2xl uppercase leading-tight duration-300 sm:text-3xl lg:max-w-[231px]  ${
                        isActive
                          ? "text-white lg:text-[36px]"
                          : "text-black lg:text-[18px]"
                      }`}
                    >
                      {item.title}
                    </h3>

                    {item.description && (
                      <p
                        className={`line-clamp-2 max-w-[231px] text-sm text-white/90 transition-opacity duration-300 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>

                  {hasHref && (
                    <div
                      className={`flex flex-col gap-4 transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <svg
                        className="self-end"
                        width="23"
                        height="24"
                        viewBox="0 0 23 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.0186 10.6218V13.3782L0 13.3782L2.45001e-07 10.6218L21.0186 10.6218Z"
                          fill="white"
                        />
                        <path
                          d="M23 12L10.7994 24L8.81794 22.0511L19.0371 12L8.81794 1.94886L10.7994 0L23 12Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  )}
                </>
              );

              if (hasHref) {
                return (
                  <Link
                    key={item.title}
                    href={item.href!}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={cardClassName}
                  >
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div
                  key={item.title}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cardClassName}
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
