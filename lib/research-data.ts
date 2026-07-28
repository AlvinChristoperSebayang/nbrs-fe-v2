export type CategoryOption = {
  id: string;
  label: string;
  slug: string;
  hoverColor?: string;
};

export type ResearchItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  sectorSlug: string;
  sectorName: string;
  practiceSlug: string;
  practiceName: string;
  image: string;
  hoverColor: string;
};

export type TextResearchItem = {
  id: string;
  slug: string;
  title: string;
};

export const SECTOR_OPTIONS: CategoryOption[] = [
  { id: "s-1", label: "Education", slug: "education", hoverColor: "#EDE3F0" },
  { id: "s-2", label: "Community", slug: "community", hoverColor: "#F2E8D8" },
  { id: "s-3", label: "Wellness", slug: "wellness", hoverColor: "#DEE1F2" },
  { id: "s-4", label: "Heritage", slug: "heritage", hoverColor: "#F0C7BD" },
  { id: "s-5", label: "Secure Spaces", slug: "secure-spaces", hoverColor: "#FDD4B6" },
];

export const PRACTICE_OPTIONS: CategoryOption[] = [
  { id: "p-1", label: "Architecture", slug: "architecture" },
  { id: "p-2", label: "Interior Design", slug: "interior-design" },
  { id: "p-3", label: "Landscape Architecture", slug: "landscape-architecture" },
];

export const DUMMY_RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: "r-1",
    slug: "care-community-alliance-for-regional-education",
    title: "CARE: Community Alliance for Regional Education – Early Childhood",
    excerpt: "In-depth research into early childhood learning environments in regional areas.",
    sectorSlug: "education",
    sectorName: "Education",
    practiceSlug: "architecture",
    practiceName: "Architecture",
    image: "/images/home/sector2.png",
    hoverColor: "#EDE3F0",
  },
  {
    id: "r-2",
    slug: "the-happy-place-vol-3-designing-for-wellness",
    title: "The Happy Place Vol 3: Designing for a Wellness Environment",
    excerpt: "Exploring healing environments and spatial psychology in healthcare spaces.",
    sectorSlug: "wellness",
    sectorName: "Wellness",
    practiceSlug: "interior-design",
    practiceName: "Interior Design",
    image: "/images/hero/hero1.png",
    hoverColor: "#DEE1F2",
  },
  {
    id: "r-3",
    slug: "the-happy-place-vol-2-balance-and-productivity",
    title: "The Happy Place Vol 2: Balance and Productivity for the University Student",
    excerpt: "How tertiary spaces influence mental focus, collaboration, and student wellbeing.",
    sectorSlug: "education",
    sectorName: "Education",
    practiceSlug: "architecture",
    practiceName: "Architecture",
    image: "/images/hero/hero2.png",
    hoverColor: "#EDE3F0",
  },
  {
    id: "r-4",
    slug: "heritage-community-preserving-social-value",
    title: "Heritage & Community: Preserving Social Value in Modern Infrastructure",
    excerpt: "Finding harmony between historical conservation and contemporary civic utility.",
    sectorSlug: "heritage",
    sectorName: "Heritage",
    practiceSlug: "architecture",
    practiceName: "Architecture",
    image: "/images/home/sector3.png",
    hoverColor: "#F0C7BD",
  },
  {
    id: "r-5",
    slug: "secure-spaces-vol-1-transition-protection",
    title: "Secure Spaces Vol 1: Transition & Protection in Facility Design",
    excerpt: "Reimagining correctional and protective environments for humane transition.",
    sectorSlug: "secure-spaces",
    sectorName: "Secure Spaces",
    practiceSlug: "architecture",
    practiceName: "Architecture",
    image: "/images/home/sector4.png",
    hoverColor: "#FDD4B6",
  },
  {
    id: "r-6",
    slug: "community-hubs-designing-shared-experiences",
    title: "Community Hubs: Designing Shared Experiences for Urban Growth",
    excerpt: "Shared facilities as catalysts for social cohesion and civic pride.",
    sectorSlug: "community",
    sectorName: "Community",
    practiceSlug: "landscape-architecture",
    practiceName: "Landscape Architecture",
    image: "/images/home/sector1.png",
    hoverColor: "#F2E8D8",
  },
];

export const DUMMY_TEXT_RESEARCH_ITEMS: TextResearchItem[] = [
  {
    id: "tr-1",
    slug: "welcoming-spaces-in-acute-care",
    title: "Welcoming spaces in Acute Care",
  },
  {
    id: "tr-2",
    slug: "residential-care-for-younger-people",
    title: "Residential Care for Younger People",
  },
  {
    id: "tr-3",
    slug: "patient-experiences-in-emergency",
    title: "Patient Experiences in Emergency",
  },
  {
    id: "tr-4",
    slug: "spaces-that-work",
    title: "Spaces that work",
  },
  {
    id: "tr-5",
    slug: "agile-habitats",
    title: "Agile habitats",
  },
  {
    id: "tr-6",
    slug: "the-learning-continuum-adaptive",
    title: "The Learning Continuum: ADAPTIVE",
  },
  {
    id: "tr-7",
    slug: "modupod",
    title: "MODUPOD",
  },
  {
    id: "tr-8",
    slug: "gregarious-vol-2-2012",
    title: "Gregarious Vol 2 2012",
  },
  {
    id: "tr-9",
    slug: "gregarious-heritage-demystified",
    title: "Gregarious - Heritage Demystified",
  },
  {
    id: "tr-10",
    slug: "gregarious-church-design-101",
    title: "Gregarious - Church Design 101",
  },
];
