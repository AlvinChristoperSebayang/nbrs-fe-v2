import Link from "next/link";
import { getPages } from "@/lib/pages";
import { getPosts } from "@/lib/posts";
import { Container } from "@/components/ui/Container";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { heroSlides } from "@/lib/hero";
import { AboutSection } from "@/components/home/AboutSection";
import { SectorsSection } from "@/components/home/SectorsSection";
import { LatestNews } from "@/components/news/LatestNews";
import { CtaSection } from "@/components/cta/CtaSection";
import type { Sector, NewsItem, CtaContent } from "@/lib/types";

const sectors: Sector[] = [
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
    description:
      "Every bright future begins with an eagerness to embrace the new.",
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
    description:
      "Secure Facilities are as much about transition, as they are about protection",
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

const latestNews: NewsItem[] = [
  {
    title: "Happy 56th Birthday NBRS",
    href: "/blog/happy-56th-birthday-nbrs",
    image: "/images/home/latest-news.png",
  },
  {
    title: "Project Update: Melonba Mega School",
    href: "/blog/project-update-melonba-mega-school",
  },
  {
    title: "Te-Kworo Foundation Update",
    href: "/blog/te-kworo-foundation-update",
  },
];

const cta: CtaContent[] = [
  {
    image: "/images/contact-bg.png",
    title: "GET IN TOUCH",
    buttonText: "Contact Us",
    buttonHref: "/contact",
  },
];

export default async function Home() {
  const [pages, posts] = await Promise.all([getPages(), getPosts()]);

  return (
    <>
      <HeroSlider slides={heroSlides} />
      <AboutSection />
      <SectorsSection sectors={sectors} />
      <LatestNews items={latestNews} />
      <CtaSection cta={cta} />
    </>
  );
}
