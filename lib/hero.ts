import type { ImageSource } from "./types";

export type HeroSlide = {
  title: string;
  headline: string;
  /** Full-slide CMS asset, rendered as the wide background. */
  backgroundImage: ImageSource;
  /** Optional slide-specific panel crop; falls back to the background asset. */
  foregroundImage: ImageSource;
};

export const heroSlides: HeroSlide[] = [
  { title: "Thinking", headline: "For People, By People", backgroundImage: "hero1.png", foregroundImage: "hero1.png" },
  { title: "Partnering", headline: "For People, By People", backgroundImage: "hero2.png", foregroundImage: "hero2.png" },
  { title: "Designing", headline: "For People, By People", backgroundImage: "hero3.png", foregroundImage: "hero3.png" },
  { title: "Creating", headline: "For People, By People", backgroundImage: "hero4.png", foregroundImage: "hero4.png" },
  { title: "Gathering", headline: "For People, By People", backgroundImage: "hero5.png", foregroundImage: "hero5.png" },
  { title: "NBRS", headline: "For People, By People", backgroundImage: "hero6.png", foregroundImage: "hero6.png" },
];
