"use client";

import { useId, useState, type CSSProperties } from "react";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper/types";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import type { HeroSlide } from "@/lib/hero";
import type { ImageSource } from "@/lib/types";

const swiperVars = {
  "--swiper-pagination-color": "#FFFFFF",
  "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
  "--swiper-pagination-bullet-inactive-opacity": "0.3",
} as CSSProperties;

function imageSource(image: ImageSource): ImageSource {
  if (typeof image !== "string") return image;
  return image.startsWith("http") || image.startsWith("/") ? image : `/images/hero/${image}`;
}

export type HeroSliderProps = {
  slides: HeroSlide[];
};

export function HeroSlider({ slides }: HeroSliderProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const paginationId = `hero-pagination-${uid}`;
  const prevId = `hero-prev-${uid}`;
  const nextId = `hero-next-${uid}`;

  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex] || slides[0];

  const handleSlideChange = (swiper: SwiperInstance) => {
    setActiveIndex(swiper.realIndex);
  };

  const isLastSlide = activeIndex === slides.length - 1;

  return (
    <section className="relative h-190 overflow-hidden bg-[#101420] hero-slider lg:h-227.5">
      {slides.map((slide, index) => (
        <ResponsiveImage
          key={`${slide.title}-${index}-bg`}
          src={imageSource(slide.backgroundImage)}
          alt={slide.title || "NBRS Architecture"}
          title={slide.title || "NBRS Architecture"}
          className={`absolute inset-0 z-0 h-full w-full scale-110 object-cover transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          priority={index === 0}
          width={2400}
          height={1200}
        />
      ))}
      <div className="absolute inset-0 z-10 h-full w-full bg-black/30 backdrop-blur-[2px]" />
      <div className="relative z-20 h-full">
          <div
            key={activeIndex}
            className="pointer-events-none absolute left-5 right-5 top-[43%] z-30 flex flex-col justify-center gap-1 sm:left-10 sm:right-10 lg:left-[5%] xl:left-[9.375%] lg:right-auto lg:top-[50%] xl:top-[37.5%] lg:w-[32%]"
          >
            <h1
              style={{ animation: "hero-fade-up 0.7s ease-out both" }}
              className={`font-heading font-bold uppercase text-white ${
                isLastSlide
                  ? "text-[130px] lg:text-[264px] leading-[0.85] tracking-tighter whitespace-nowrap"
                  : "text-[50px] lg:text-[132px] leading-none tracking-tight whitespace-nowrap"
              }`}
            >
              <span
                className={
                  isLastSlide
                    ? "inline-block whitespace-nowrap relative"
                    : "inline-block border-b-4 sm:border-b-[6px] lg:border-b-10 border-white pb-1 sm:pb-2 lg:pb-3 leading-none"
                }
              >
                {activeSlide.title}
                {isLastSlide && (
                  <span className="inline-block shrink-0 w-[0.22em] h-[0.22em] rounded-full bg-[#A0A0A0] ml-2 lg:ml-3 align-top mt-[0.06em]" />
                </span>
              ) : (
                <span className="inline-flex flex-col items-start leading-none">
                  <span>{activeSlide.title}</span>
                  <span className="block w-full lg:w-[354px] border-b-[4px] sm:border-b-[6px] lg:border-b-[10px] border-white mt-1 sm:mt-2 lg:mt-3" />
                </span>
              )}
            </h1>
            {!isLastSlide && activeSlide.headline && (
              <p
                style={{ animation: "hero-fade-up 0.7s ease-out 0.2s both" }}
                className="font-gothic font-trade-gothic text-lg uppercase tracking-[0%] text-white/90 lg:text-2xl xl:text-[40px] mt-2"
              >
                {activeSlide.headline}
              </p>
            )}
          </div>

          <div className="absolute left-5 right-0 top-10 z-20 aspect-769/599 overflow-hidden sm:left-10 sm:right-10 lg:left-auto lg:right-[9.44%] lg:top-[300px] xl:top-33.75 lg:w-[53.41vw] lg:max-w-192.25 slider-area">
            <Swiper
              modules={[Autoplay, EffectFade, Navigation, Pagination, A11y]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              speed={900}
              loop
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              navigation={{ prevEl: `#${prevId}`, nextEl: `#${nextId}` }}
              pagination={{ el: `#${paginationId}`, clickable: true }}
              onSlideChange={handleSlideChange}
              className="h-full w-full max-w-full overflow-hidden"
            >
              {slides.map((slide, index) => {
                const src = imageSource(slide.foregroundImage);

                return (
                  <SwiperSlide key={`${slide.title}-${index}`} className="relative">
                    <ResponsiveImage
                      src={src}
                      alt={slide.title || "NBRS Architecture"}
                      title={slide.title || "NBRS Architecture"}
                      className="h-full w-full object-cover"
                      width={769}
                      height={599}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>

          </div>
          <div style={swiperVars} className="absolute bottom-8 left-5 right-5 z-30 flex items-center justify-center gap-4 sm:left-10 sm:right-10 lg:bottom-auto lg:left-[62.85%] lg:right-[9.44%] lg:top-192.5 lg:justify-between swipe-controls">
              <button
                id={prevId}
                type="button"
                aria-label="Previous slide"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-zinc-900 transition hover:bg-zinc-900/10 cursor-pointer"
              >
                <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.41406 8.70703L16.4141 8.70703" stroke="white" strokeWidth="2"/>
                  <path d="M9.41406 16.707L1.41406 8.70703L9.41406 0.707031" stroke="white" strokeWidth="2"/>
                </svg>
              </button>
              <div id={paginationId} className="flex items-center gap-2 swipe-paginate" />
              <button
                id={nextId}
                type="button"
                aria-label="Next slide"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-zinc-900 transition hover:bg-zinc-900/10 cursor-pointer"
              >
                <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.4141 8.70703L7.70703 17.4141L6.29297 16L12.5859 9.70703H0V7.70703H12.5859L6.29297 1.41406L7.70703 0L16.4141 8.70703Z" fill="white"/>
                </svg>
              </button>
          </div>
      </div>
    </section>
  );
}
