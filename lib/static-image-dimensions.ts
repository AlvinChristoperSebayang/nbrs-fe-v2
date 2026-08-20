import type { ImageDimensions } from "./types";

/**
 * Intrinsic sizes for local fallback assets referenced by the frontend.
 * CMS images are resolved from their Craft transform URL instead.
 */
export const STATIC_IMAGE_DIMENSIONS: Record<string, ImageDimensions> = {
  "/images/about-us-about.png": { width: 770, height: 600 },
  "/images/about/creative-partnership.jpg": { width: 4096, height: 2731 },
  "/images/about/practice1.jpg": { width: 4000, height: 3488 },
  "/images/about/practice2.jpg": { width: 4096, height: 2730 },
  "/images/about/practice3.jpg": { width: 4096, height: 2731 },
  "/images/about/practice4.jpg": { width: 4096, height: 2730 },
  "/images/about/real-insight.jpg": { width: 4096, height: 2731 },
  "/images/at-a-glance/community.svg": { width: 36, height: 36 },
  "/images/at-a-glance/insight.svg": { width: 36, height: 36 },
  "/images/at-a-glance/outcomes.svg": { width: 40, height: 40 },
  "/images/at-a-glance/systems.svg": { width: 40, height: 40 },
  "/images/contact-bg.png": { width: 1440, height: 555 },
  "/images/design-approach/andrew-duffin.jpg": { width: 4096, height: 2731 },
  "/images/design-approach/communities1.jpg": { width: 4096, height: 3080 },
  "/images/design-approach/communities2.jpg": { width: 4096, height: 2771 },
  "/images/design-approach/communities3.jpg": { width: 2204, height: 1727 },
  "/images/design-approach/communities4.png": { width: 2751, height: 1814 },
  "/images/design-approach/communities5.jpg": { width: 3617, height: 2572 },
  "/images/design-approach/pillar1.jpg": { width: 3766, height: 2515 },
  "/images/design-approach/pillar2.jpg": { width: 4096, height: 1849 },
  "/images/design-approach/pillar3.jpg": { width: 4000, height: 2252 },
  "/images/design-approach/possibility.png": { width: 1920, height: 1200 },
  "/images/hero/about-hero.png": { width: 1440, height: 910 },
  "/images/hero/hero-design-approach.png": { width: 1440, height: 910 },
  "/images/hero/hero-sustain.png": { width: 1440, height: 910 },
  "/images/hero/hero1.png": { width: 1538, height: 1198 },
  "/images/hero/hero2.png": { width: 1538, height: 1198 },
  "/images/hero/hero3.png": { width: 1538, height: 1198 },
  "/images/hero/hero4.png": { width: 1538, height: 1198 },
  "/images/hero/hero5.png": { width: 1538, height: 1198 },
  "/images/hero/hero6.png": { width: 1538, height: 1198 },
  "/images/hero/seo-image.webp": { width: 2048, height: 1366 },
  "/images/home-about.png": { width: 770, height: 600 },
  "/images/home/latest-news.png": { width: 1170, height: 600 },
  "/images/home/sector1.png": { width: 370, height: 300 },
  "/images/home/sector2.png": { width: 370, height: 300 },
  "/images/home/sector3.png": { width: 370, height: 300 },
  "/images/home/sector4.png": { width: 370, height: 300 },
  "/images/home/sector5.png": { width: 370, height: 300 },
  "/images/placeholder-project.png": { width: 370, height: 240 },
  "/images/purpose/OLTLLogo-NoTag.png": { width: 506, height: 68 },
  "/images/purpose/TK+logo+no+background.png": { width: 278, height: 200 },
  "/images/rap/reflect-artwork.png": { width: 2472, height: 1328 },
  "/images/rap/reflect-download-background.jpg": { width: 1024, height: 731 },
  "/images/rap/reflect-hero.jpg": { width: 4096, height: 3518 },
  "/images/research-banner-pattern.png": { width: 1440, height: 910 },
};

/**
 * Craft transform URLs include the generated crop dimensions, e.g.
 * `/_1200x900_crop_center-center_80_none/...`. Local fallback dimensions
 * are supplied by the manifest above.
 */
export function getImageDimensions(source: string): ImageDimensions | undefined {
  let pathname = source.split(/[?#]/, 1)[0];

  try {
    pathname = new URL(source).pathname;
  } catch {
    // Relative paths are already suitable for matching below.
  }

  const transform = pathname.match(/_(\d+)x(\d+)(?:_|$)/);
  if (transform) {
    return { width: Number(transform[1]), height: Number(transform[2]) };
  }

  return STATIC_IMAGE_DIMENSIONS[pathname];
}
