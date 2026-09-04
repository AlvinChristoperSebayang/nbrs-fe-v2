import { HeroSlider } from "@/components/hero/HeroSlider";
import { heroSlides } from "@/lib/hero";
import { AboutSection } from "@/components/home/AboutSection";
import { SectorsSection } from "@/components/home/SectorsSection";
import { GridEffect } from "@/components/ui/GridEffect";
import { CtaSection } from "@/components/cta/CtaSection";
import { getHomepageContent } from "@/lib/homepage";
import { createPageMetadata } from "@/lib/seo";
import type { Sector, NewsItem, CtaContent } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const FALLBACK_SECTORS: Sector[] = [
  {
    label: "Community",
    image: "/images/home/sector1.png",
    href: "/services",
    description: "For the shared experiences that help communities thrive.",
    hoverColor: "#F2E8D8",
  },
  {
    label: "Education",
    image: "/images/home/sector2.png",
    href: "/services",
    description: "Every bright future begins with an eagerness to embrace the new.",
    hoverColor: "#EDE3F0",
  },
  {
    label: "Heritage",
    image: "/images/home/sector3.png",
    href: "/services",
    description: "True belonging comes from appreciating our place in time.",
    hoverColor: "#F0C7BD",
  },
  {
    label: "Secure Spaces",
    image: "/images/home/sector4.png",
    href: "/services",
    description: "Secure Facilities are as much about transition, as they are about protection",
    hoverColor: "#FDD4B6",
  },
  {
    label: "Wellness",
    image: "/images/home/sector5.png",
    href: "/services",
    description: "We believe the best design outcomes start with the patient",
    hoverColor: "#DEE1F2",
  },
];

const FALLBACK_NEWS: NewsItem[] = [
  {
    title: "Happy 56th Birthday NBRS",
    href: "/blog/happy-56th-birthday-nbrs",
    image: "/images/home/latest-news.png",
  },
  {
    title: "Project Update: Melonba Mega School",
    href: "/blog/project-update-melonba-mega-school",
    image: "/images/hero/hero1.png",
  },
  {
    title: "Te-Kworo Foundation Update",
    href: "/blog/te-kworo-foundation-update",
    image: "/images/hero/hero2.png",
  },
];

const FALLBACK_CTA: CtaContent = {
  image: "/images/contact-bg.png",
  title: "GET IN TOUCH",
  buttonText: "Contact Us",
  buttonHref: "/contact",
};

export async function generateMetadata() {
  const page = await getHomepageContent();
  return createPageMetadata({
    pathname: "/",
    title: "Architecture, Design & Heritage",
    cmsTitle: page.cmsSeoTitle,
    description: page.seoDescription,
    image: page.seoImage,
  });
}

export default async function Home() {
  let homepage: Awaited<ReturnType<typeof getHomepageContent>> | null = null;

  try {
    homepage = await getHomepageContent();
  } catch (error) {
    console.warn("Failed to load Homepage content from Craft:", error);
  }

  const slides = homepage?.slides.length ? homepage.slides : heroSlides;
  const sectors = homepage?.sectors.length ? homepage.sectors : FALLBACK_SECTORS;
  const news = homepage?.latestNews.length ? homepage.latestNews : FALLBACK_NEWS;
  const cta = homepage?.cta?.image ? homepage.cta : FALLBACK_CTA;

  return (
    <>
      <HeroSlider slides={slides} />
      <AboutSection
        image_url={homepage?.about?.image || "/images/home-about.png"}
        background_color="#C9E5D2"
        heading={homepage?.about?.heading ?? undefined}
        description={homepage?.about?.description ?? undefined}
        button={homepage?.about?.button ?? undefined}
        description_class_name="max-w-none lg:max-w-[314px]"
      />
      <SectorsSection
        sectors={sectors}
        heading={homepage?.sectorsHeading || "Designing spaces bespoke to their needs"}
      />
      <GridEffect
        className="mt-8 "
        items={news}
        title={homepage?.latestNewsHeading ?? undefined}
        backgroundColor="#EEEEEE"
        firstImageClassName="object-cover object-top"
        imageClassName="object-cover object-center"
      />
      <CtaSection content={cta} />
    </>
  );
}

