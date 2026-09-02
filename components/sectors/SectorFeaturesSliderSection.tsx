"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export type FeatureItem = {
  title: string;
  description: string;
  image: ImageSource;
  href?: string;
};

export function SectorFeaturesSliderSection({
  items,
  title = "Features",
  backgroundColor = "#FFFFFF",
}: {
  items: FeatureItem[];
  title?: string;
  backgroundColor?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const currentItem = items[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-0 lg:py-24 text-black" style={{ backgroundColor }}>
      {/* ------------------------------------------------------------- */}
      {/* MOBILE DISPLAY (< lg): Interactive Image Slider & Glass Card  */}
      {/* ------------------------------------------------------------- */}
      <div className="block lg:hidden w-full">
        {/* Mobile Slider Stage */}
        <div className="relative w-full h-[450px] overflow-hidden">
          {/* Background Images */}
          {items.map((item, index) => (
            <ResponsiveImage
              key={index}
              src={item.image}
              alt={item.title}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Centered Frosted Glass Card */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative w-[94%] max-w-[380px] bg-black/55 backdrop-blur-xs px-8 py-6 sm:px-10 sm:py-8 text-center border border-white/20 flex flex-col items-center justify-center rounded-none">
              {/* Category Top Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: backgroundColor !== "#FFFFFF" ? backgroundColor : "#EDE3F0" }}
              />

              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Feature"
                className="absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 p-2 text-white hover:text-zinc-300 transition-transform active:scale-95 cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Card Content */}
              <h3 className="font-heading text-[22px] sm:text-[24px] uppercase font-bold text-white tracking-wide mb-2 leading-none max-w-[240px] px-1">
                {currentItem.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/95 leading-snug max-w-[230px] px-1">
                {currentItem.description}
              </p>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Feature"
                className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 p-2 text-white hover:text-zinc-300 transition-transform active:scale-95 cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* DESKTOP DISPLAY (>= lg): Original GridEffect Hover Layout     */}
      {/* ------------------------------------------------------------- */}
      <div className="hidden lg:block">
        <Container className="overflow-hidden">
          <div className="mb-6 flex items-start justify-between gap-6">
            <h2 className="font-heading text-[24px] uppercase text-black">
              {title}
            </h2>
          </div>

          <div className="relative w-full">
            {/* Background Images */}
            <div className="absolute w-full h-full overflow-hidden top-0 left-0 z-[5]">
              {items.map((item, index) => (
                <ResponsiveImage
                  key={index}
                  src={item.image}
                  alt={item.title}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>

            {/* Grid Cards Container */}
            <div className="grid grid-cols-3 items-stretch gap-6 lg:gap-8 xl:gap-14 2xl:gap-20 py-16 lg:py-24 xl:py-32 px-4 relative z-10">
              {items.map((item, index) => {
                const isActive = index === activeIndex;
                const hasHref = Boolean(item.href);

                const cardClassName = `group flex h-80 flex-col justify-between gap-8 overflow-hidden p-6 transition-colors duration-300 cursor-pointer ${
                  isActive
                    ? "bg-black/50 backdrop-blur-[5px] border-b-[5px] border-white"
                    : "bg-white/70 backdrop-blur-[0px] border-b-[5px] border-transparent"
                }`;

                const cardContent = (
                  <>
                    <div className="flex flex-col gap-2">
                      <h3
                        className={`font-heading text-2xl uppercase leading-tight duration-300 max-w-57.75 lg:max-w-full ${
                          isActive
                            ? "text-white text-[32px]"
                            : "text-black text-[20px]"
                        }`}
                      >
                        {item.title}
                      </h3>

                      {item.description && (
                        <p
                          className={`max-w-[231px] lg:max-w-full text-sm text-white/90 transition-opacity duration-300 ${
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
                      key={index}
                      href={item.href!}
                      title={item.title}
                      aria-label={item.title}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={cardClassName}
                    >
                      {cardContent}
                    </Link>
                  );
                }

                return (
                  <div
                    key={index}
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
      </div>
    </section>
  );
}
