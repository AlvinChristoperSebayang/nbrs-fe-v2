export type PracticeDetail = {
  id: string;
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  introImage: string;
  introQuote: string;
  tableProjects: Array<{
    id: string;
    title: string;
    sector: string;
    status: string;
    href: string;
  }>;
};

export const PRACTICES_DATA: PracticeDetail[] = [
  {
    id: "p-1",
    slug: "architecture",
    title: "ARCHITECTURE",
    description: "Design for purpose, responding to people.",
    heroImage: "/images/hero/hero1.png",
    introImage: "/images/about/creative-partnership.jpg",
    introQuote:
      "We view architecture as a social art, grounded in research, collaboration, and deep listening. Our design collective studios deliver future-focused solutions across education, wellness, community, heritage and secure environments.",
    tableProjects: [
      {
        id: "tp-1",
        title: "Taronga Institute of Science and Learning",
        sector: "Education",
        status: "Built",
        href: "/projects/taronga-institute-of-science-and-learning",
      },
      {
        id: "tp-2",
        title: "Armidale Secondary College",
        sector: "Education, Heritage",
        status: "Built",
        href: "/projects/armidale-secondary-college",
      },
      {
        id: "tp-3",
        title: "Dubbo Community Health Centre",
        sector: "Wellness",
        status: "Built",
        href: "/projects/dubbo-community-health-centre",
      },
    ],
  },
  {
    id: "p-2",
    slug: "interior-design",
    title: "INTERIOR DESIGN",
    description: "Creating intuitive, sensory-rich interior environments.",
    heroImage: "/images/hero/hero3.png",
    introImage: "/images/about/real-insight.jpg",
    introQuote:
      "Our interior design practice shapes human experiences through sensory harmony, biophilic materiality, and intuitive spatial flow to enhance focus, healing, and connection.",
    tableProjects: [
      {
        id: "tp-4",
        title: "Melonba Educational Campus",
        sector: "Education",
        status: "Built",
        href: "/projects/melonba-educational-campus",
      },
      {
        id: "tp-5",
        title: "Te-Kworo Community Hub",
        sector: "Community",
        status: "Built",
        href: "/projects/te-kworo-community-hub",
      },
    ],
  },
  {
    id: "p-3",
    slug: "landscape-architecture",
    title: "LANDSCAPE ARCHITECTURE",
    description: "Connecting built environments with natural landscapes.",
    heroImage: "/images/hero/hero4.png",
    introImage: "/images/about-us-about.png",
    introQuote:
      "Landscape architecture bridges culture, ecology, and built forms to create living outdoor realms that respect country and restore natural ecosystems.",
    tableProjects: [
      {
        id: "tp-6",
        title: "Blacktown Exercise and Sports Precinct",
        sector: "Wellness, Community",
        status: "Built",
        href: "/projects/blacktown-sports-precinct",
      },
      {
        id: "tp-7",
        title: "St Andrew's Cathedral School Rooftop",
        sector: "Education",
        status: "Built",
        href: "/projects/st-andrews-rooftop",
      },
    ],
  },
];
