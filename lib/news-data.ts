export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  hoverColor?: string;
  excerpt?: string;
  paragraphs?: string[];
};

export const NEWS_DATA: NewsArticle[] = [
  {
    id: "news-1",
    slug: "happy-56th-birthday-nbrs",
    title: "COMMUNITY: Happy 56th Birthday NBRS!!",
    date: "October 14, 2025",
    category: "Community",
    image: "/images/home/latest-news.png",
    hoverColor: "#C9E5D2",
    excerpt: "Celebrating 56 years of multidisciplinary design excellence and community impact across Australia.",
    paragraphs: [
      "The 11th of November 2019 saw the inaugural Business of Architecture and Design Conference held at NSW Parliament House. Rodney Drayton, Director of Operations at NBRS, discussed the business of architecture and the keyways that advances in technology are allowing us to manage the ever-evolving challenges of project delivery. As the Director of Operations Rodney guides NBRS’ development of systems that support the efficient delivery of projects and the strategic implementation of these systems across our studios.",
      "For Rodney, technology should always be aligned to the strategic goals of the business. It remains imperative that a clear corporate vision be the guiding north star, and that the information and technological systems should be a supportive networked tool. As a company that has grown in size and capability over it’s fifty years of operation, being proactive as opposed to reactive has been essential in maintaining and striving for architectural and design best practice.",
      "In conversation with Isabelle Toland of Aileen Sage Architects, Rodney discussed the way that technology and business are increasingly intertwined, and the quantum leap technology has made in the past twenty years, particularly around the area of financial modelling and management. NBRS believes that there is a symbiotic relationship between businesses and systems, and technology and people. Rodney believes that while technology may provide the backbone to representing the ideal business model, ultimately the creative partnerships evident in architectural practice should be driven by human factors – creativity, critical thinking and with this, innovation. The balance between technology and empathy is an important one; society and business is increasingly relying on and turning to data and AI, but it’s the human intervention and creativity that allows original thought to thrive. In architectural and design industries, it’s through championing the relationship between these two seemingly polar opposites that allows innovation to blossom.",
    ],
  },
  {
    id: "news-2",
    slug: "project-update-melonba-mega-school",
    title: "EDUCATION: Project Update – Melonba Mega School",
    date: "November 2, 2025",
    category: "Education",
    image: "/images/hero/hero1.png",
    hoverColor: "#EDE3F0",
    excerpt: "Constructing future-focused educational environments designed for collaborative learning.",
    paragraphs: [
      "The Melonba Mega School project marks a major milestone in educational architecture, integrating flexible learning spaces, sustainable timber structures, and state-of-the-art community hubs.",
      "Collaborating closely with educators and students, our design collective established a master plan that encourages curiosity, movement, and environmental stewardship across all primary and secondary precincts.",
    ],
  },
  {
    id: "news-3",
    slug: "te-kworo-foundation-update",
    title: "COMMUNITY: Te-Kworo Foundation Update",
    date: "December 18, 2025",
    category: "Community",
    image: "/images/hero/hero2.png",
    hoverColor: "#F2E8D8",
    excerpt: "Empowering rural communities through collaborative architectural partnerships.",
    paragraphs: [
      "Our social sustainability initiative with the Te-Kworo Foundation continues to deliver healthcare and education infrastructure in East Africa, focusing on locally sourced materials and passive climate design.",
    ],
  },
  {
    id: "news-4",
    slug: "designing-for-wellness-vol-3",
    title: "WELLNESS: Designing for Wellness – Vol. 3 Released",
    date: "January 10, 2026",
    category: "Wellness",
    image: "/images/hero/hero3.png",
    hoverColor: "#DEE1F2",
    excerpt: "Translating sensory and biophilic insights into therapeutic healthcare environments.",
    paragraphs: [
      "NBRS Research has published Volume 3 of our Wellness Series, detailing spatial strategies for healing environments, acoustic comfort, and natural light optimization.",
    ],
  },
  {
    id: "news-5",
    slug: "heritage-restoration-milestone",
    title: "HERITAGE: Heritage Restoration Milestone",
    date: "February 4, 2026",
    category: "Heritage",
    image: "/images/hero/hero4.png",
    hoverColor: "#F0C7BD",
    excerpt: "Preserving historical integrity while adapting spaces for modern civic usage.",
    paragraphs: [
      "Adapting heritage buildings for contemporary public use requires a delicate balance of conservation craftsmanship and modern technological integration.",
    ],
  },
  {
    id: "news-6",
    slug: "blacktown-sports-precinct-opening",
    title: "SECURE SPACES: Blacktown Sports Precinct Opening",
    date: "March 15, 2026",
    category: "Secure Spaces",
    image: "/images/hero/hero5.png",
    hoverColor: "#FDD4B6",
    excerpt: "A state-of-the-art sports and exercise precinct connecting movement, community, and landscape.",
    paragraphs: [
      "Connecting elite sports performance with community wellness, the new Blacktown Sports Precinct features biophilic landscape design and inclusive active spaces.",
    ],
  },
];
