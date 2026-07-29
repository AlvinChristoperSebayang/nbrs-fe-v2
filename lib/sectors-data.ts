import type { KeyProjectItem } from "@/components/sectors/KeyProjectsSection";
import type { ProjectTableRow } from "@/components/sectors/ProjectListTableSection";

export type SectorFeature = {
  title: string;
  description: string;
  image: string;
  href?: string;
};

export type SectorItem = {
  slug: string;
  label: string;
  image: string;
  href: string;
  description: string;
  hoverColor: string;
  heroImage: string;
  heroSubtitle: string;
  principlesTitle: string;
  principlesDescription: string;
  principlesImages: string[];
  keyProjects: KeyProjectItem[];
  tableProjects: ProjectTableRow[];
  quote: {
    text: string;
    author: string;
    image: string;
  };
  features: SectorFeature[];
};

export const SECTORS_DATA: SectorItem[] = [
  {
    slug: "education",
    label: "Education",
    image: "/images/home/sector2.png",
    href: "/sectors/education",
    description:
      "Every bright future begins with an eagerness to embrace the new.",
    hoverColor: "#EDE3F0",
    heroImage: "/images/home/sector2.png",
    heroSubtitle:
      "Every bright future begins with an eagerness to embrace the new.",
    principlesTitle: "PRINCIPLES: EDUCATION",
    principlesDescription:
      "Designing learning environments tailored to evolving pedagogies. We create spaces that elevate learning outcomes across Early Learning, Primary, Secondary, Tertiary, and specialist education. Research-driven design empowers educators, sets new benchmarks, and responds to the unique requirements of every learning stage.",
    principlesImages: [
      "/images/about/creative-partnership.jpg",
      "/images/about/practice1.jpg",
      "/images/about/practice2.jpg",
      "/images/about/practice3.jpg",
      "/images/about/practice4.jpg",
    ],
    keyProjects: [
      {
        id: "kp-edu-1",
        title: "MELONBA EDUCATIONAL CAMPUS",
        image: "/images/home/sector2.png",
        href: "/projects/melonba-educational-campus",
      },
      {
        id: "kp-edu-2",
        title: "ARMIDALE SECONDARY COLLEGE",
        image: "/images/hero/hero1.png",
        href: "/projects/armidale-secondary-college",
      },
      {
        id: "kp-edu-3",
        title: "CANTERBURY SOUTH PUBLIC SCHOOL",
        image: "/images/hero/hero4.png",
        href: "/projects/canterbury-south-public-school",
      },
    ],
    tableProjects: [
      {
        id: "tp-edu-1",
        project: "Taronga Institute of Science and Learning",
        practices: "Architecture, Interior Design, Landscape Architecture",
        status: "Built",
        href: "/projects/taronga-institute-of-science",
      },
      {
        id: "tp-edu-2",
        project: "Armidale Secondary College",
        practices: "Architecture, Interior Design, Landscape Architecture",
        status: "Built",
        href: "/projects/armidale-secondary-college",
      },
      {
        id: "tp-edu-3",
        project: "St Mary & St Mina’s Coptic Orthodox College",
        practices: "Architecture",
        status: "Built",
        href: "/projects/st-mary-st-minas-coptic-orthodox-college",
      },
      {
        id: "tp-edu-4",
        project: "Canterbury South Public School",
        practices: "Architecture, Landscape Architecture",
        status: "Built",
        href: "/projects/canterbury-south-public-school",
      },
    ],
    quote: {
      text: "Architecture is a form of communication unlike any other.",
      author: "Macella Salzmann",
      image: "/images/about/real-insight.jpg",
    },
    features: [
      {
        title: "EMPOWERING EDUCATORS",
        description:
          "The freedom to give teachers and facilitators the flexibility to design their own spaces and deliver programs in ways that works best for them.",
        image: "/images/hero/hero1.png",
      },
      {
        title: "SETTING THE NEW STANDARD",
        description:
          "Creating innovative educational facilities for the next generation of learners.",
        image: "/images/hero/hero2.png",
      },
      {
        title: "COLLABORATIVE APPROACH",
        description:
          "Co-designing spaces that foster team learning and social connection.",
        image: "/images/hero/hero3.png",
      },
    ],
  },
  {
    slug: "wellness",
    label: "Wellness",
    image: "/images/home/sector5.png",
    href: "/sectors/wellness",
    description: "We believe the best design outcomes start with the patient.",
    hoverColor: "#DEE1F2",
    heroImage: "/images/home/sector5.png",
    heroSubtitle: "We believe the best design outcomes start with the patient.",
    principlesTitle: "PRINCIPLES: WELLNESS",
    principlesDescription:
      "Creating therapeutic environments that support healing, restoration, and holistic health. Our healthcare architectures integrate biophilic elements, intuitive wayfinding, and calming spatial flow to promote patient recovery and staff wellbeing.",
    principlesImages: [
      "/images/home/sector5.png",
      "/images/about/practice1.jpg",
      "/images/about/practice2.jpg",
      "/images/about/practice3.jpg",
      "/images/about/real-insight.jpg",
    ],
    keyProjects: [
      {
        id: "kp-wel-1",
        title: "WAVES FITNESS & AQUATIC CENTRE",
        image: "/images/home/sector5.png",
        href: "/projects/waves-fitness-and-aquatic-centre",
      },
      {
        id: "kp-wel-2",
        title: "ST VINCENT'S HEALTH COMMUNITY CENTRE",
        image: "/images/hero/hero2.png",
        href: "/projects/st-vincents-health-community-centre",
      },
      {
        id: "kp-wel-3",
        title: "PORT MACQUARIE HEALTH HUB",
        image: "/images/hero/hero3.png",
        href: "/projects/port-macquarie-health-hub",
      },
    ],
    tableProjects: [
      {
        id: "tp-wel-1",
        project: "Waves Fitness and Aquatic Centre",
        practices: "Architecture, Landscape Architecture",
        status: "Built",
        href: "/projects/waves-fitness-and-aquatic-centre",
      },
      {
        id: "tp-wel-2",
        project: "St Vincent's Community Health Hub",
        practices: "Architecture, Interior Design",
        status: "Built",
        href: "/projects/st-vincents-health-community-centre",
      },
      {
        id: "tp-wel-3",
        project: "Port Macquarie Medical Specialist Centre",
        practices: "Architecture",
        status: "Built",
        href: "/projects/port-macquarie-health-hub",
      },
    ],
    quote: {
      text: "Designing therapeutic environments begins with deep empathy for the patient's recovery journey.",
      author: "Dr. Andrew Evans",
      image: "/images/about/practice1.jpg",
    },
    features: [
      {
        title: "PATIENT-CENTRED CARE",
        description:
          "Designing spaces centered on human empathy, comfort, and rapid recovery.",
        image: "/images/home/sector5.png",
      },
      {
        title: "HEALING ENVIRONMENTS",
        description:
          "Harnessing natural light and landscape to elevate clinical outcomes.",
        image: "/images/hero/hero2.png",
      },
      {
        title: "INTEGRATED TECHNOLOGY",
        description:
          "Seamless state-of-the-art medical facility architecture.",
        image: "/images/hero/hero3.png",
      },
    ],
  },
  {
    slug: "secure-spaces",
    label: "Secure Spaces",
    image: "/images/home/sector4.png",
    href: "/sectors/secure-spaces",
    description:
      "Secure Facilities are as much about transition, as they are about protection.",
    hoverColor: "#FDD4B6",
    heroImage: "/images/home/sector4.png",
    heroSubtitle:
      "Secure Facilities are as much about transition, as they are about protection.",
    principlesTitle: "PRINCIPLES: SECURE SPACES",
    principlesDescription:
      "Balancing safety, resilience, and human dignity in specialized facilities. Our designs prioritize rehabilitation, environmental security, and operational clarity to empower constructive social transition.",
    principlesImages: [
      "/images/home/sector4.png",
      "/images/about/practice1.jpg",
      "/images/about/practice2.jpg",
      "/images/about/practice3.jpg",
      "/images/about/real-insight.jpg",
    ],
    keyProjects: [
      {
        id: "kp-sec-1",
        title: "DILLWYNIA CORRECTIONAL CENTRE EXPANSION",
        image: "/images/home/sector4.png",
        href: "/projects/dillwynia-correctional-centre-expansion",
      },
      {
        id: "kp-sec-2",
        title: "PARKLEA CORRECTIONAL CENTRE",
        image: "/images/hero/hero6.png",
        href: "/projects/parklea-correctional-centre",
      },
      {
        id: "kp-sec-3",
        title: "SPECIALIST JUSTICE FACILITY",
        image: "/images/hero/hero1.png",
        href: "/projects/specialist-justice-facility",
      },
    ],
    tableProjects: [
      {
        id: "tp-sec-1",
        project: "Dillwynia Correctional Centre Expansion",
        practices: "Architecture, Landscape Architecture, Interior Design",
        status: "Built",
        href: "/projects/dillwynia-correctional-centre-expansion",
      },
      {
        id: "tp-sec-2",
        project: "Parklea Correctional Centre",
        practices: "Architecture",
        status: "Built",
        href: "/projects/parklea-correctional-centre",
      },
      {
        id: "tp-sec-3",
        project: "Regional Justice & Community Protection Complex",
        practices: "Architecture, Interior Design",
        status: "Built",
        href: "/projects/specialist-justice-facility",
      },
    ],
    quote: {
      text: "True security in architecture lies in creating dignified pathways for human transformation.",
      author: "Marcus Thorne",
      image: "/images/about/practice2.jpg",
    },
    features: [
      {
        title: "HUMANE REHABILITATION",
        description:
          "Fostering positive behavioral change through trauma-informed design.",
        image: "/images/home/sector4.png",
      },
      {
        title: "OPERATIONAL INTEGRITY",
        description:
          "Robust safety measures integrated with spatial clarity.",
        image: "/images/hero/hero1.png",
      },
      {
        title: "TRANSITIONAL SPACES",
        description:
          "Facilitating smooth reintegration into wider community life.",
        image: "/images/hero/hero2.png",
      },
    ],
  },
  {
    slug: "community",
    label: "Community",
    image: "/images/home/sector1.png",
    href: "/sectors/community",
    description: "For the shared experiences that help communities thrive.",
    hoverColor: "#F2E8D8",
    heroImage: "/images/home/sector1.png",
    heroSubtitle: "For the shared experiences that help communities thrive.",
    principlesTitle: "PRINCIPLES: COMMUNITY",
    principlesDescription:
      "Building inclusive civic spaces where people connect, celebrate, and belong. From performing arts centers to public aquatic hubs, we design for social cohesion and lasting community impact.",
    principlesImages: [
      "/images/home/sector1.png",
      "/images/about/practice1.jpg",
      "/images/about/practice2.jpg",
      "/images/about/practice3.jpg",
      "/images/about/real-insight.jpg",
    ],
    keyProjects: [
      {
        id: "kp-com-1",
        title: "BAY PAVILIONS ARTS + AQUATICS",
        image: "/images/home/sector1.png",
        href: "/projects/bay-pavilions-arts-aquatics",
      },
      {
        id: "kp-com-2",
        title: "THE PAVILION PERFORMING ARTS CENTRE",
        image: "/images/hero/hero4.png",
        href: "/projects/the-pavilion-performing-arts-centre",
      },
      {
        id: "kp-com-3",
        title: "WILLOUGHBY UNITING CHURCH",
        image: "/images/hero/hero5.png",
        href: "/projects/willoughby-uniting-church",
      },
    ],
    tableProjects: [
      {
        id: "tp-com-1",
        project: "Bay Pavilions Arts + Aquatics",
        practices: "Architecture, Interior Design, Landscape Architecture",
        status: "Built",
        href: "/projects/bay-pavilions-arts-aquatics",
      },
      {
        id: "tp-com-2",
        project: "The Pavilion Performing Arts Centre",
        practices: "Architecture, Interior Design",
        status: "Built",
        href: "/projects/the-pavilion-performing-arts-centre",
      },
      {
        id: "tp-com-3",
        project: "Willoughby Uniting Community Church",
        practices: "Architecture, Heritage Conservation",
        status: "Built",
        href: "/projects/willoughby-uniting-church",
      },
    ],
    quote: {
      text: "Civic architecture flourishes when it inspires shared belonging and social connection.",
      author: "Elena Rostova",
      image: "/images/about/practice3.jpg",
    },
    features: [
      {
        title: "CIVIC BELONGING",
        description:
          "Creating landmarks that celebrate community identity and heritage.",
        image: "/images/home/sector1.png",
      },
      {
        title: "MULTI-PURPOSE HUBS",
        description:
          "Flexible spaces designed for diverse public activities.",
        image: "/images/hero/hero4.png",
      },
      {
        title: "SUSTAINABLE GATHERING",
        description:
          "Eco-friendly public venues built for long-term community benefit.",
        image: "/images/hero/hero5.png",
      },
    ],
  },
  {
    slug: "heritage",
    label: "Heritage",
    image: "/images/home/sector3.png",
    href: "/sectors/heritage",
    description: "True belonging comes from appreciating our place in time.",
    hoverColor: "#F0C7BD",
    heroImage: "/images/home/sector3.png",
    heroSubtitle: "True belonging comes from appreciating our place in time.",
    principlesTitle: "PRINCIPLES: HERITAGE",
    principlesDescription:
      "Honoring the past while breathing new life into historic structures. We combine adaptive reuse with meticulous conservation techniques to bridge history and future.",
    principlesImages: [
      "/images/home/sector3.png",
      "/images/about/practice1.jpg",
      "/images/about/practice2.jpg",
      "/images/about/practice3.jpg",
      "/images/about/real-insight.jpg",
    ],
    keyProjects: [
      {
        id: "kp-her-1",
        title: "PORTER HOUSE",
        image: "/images/home/sector3.png",
        href: "/projects/porter-house",
      },
      {
        id: "kp-her-2",
        title: "ST ANDREW'S HOUSE",
        image: "/images/hero/hero5.png",
        href: "/projects/st-andrews-house",
      },
      {
        id: "kp-her-3",
        title: "WILLOUGHBY HERITAGE CHURCH",
        image: "/images/hero/hero6.png",
        href: "/projects/willoughby-heritage-church",
      },
    ],
    tableProjects: [
      {
        id: "tp-her-1",
        project: "Porter House Adaptive Reuse",
        practices: "Architecture, Interior Design, Heritage",
        status: "Built",
        href: "/projects/porter-house",
      },
      {
        id: "tp-her-2",
        project: "St Andrew's House Preservation",
        practices: "Architecture, Heritage Conservation",
        status: "Built",
        href: "/projects/st-andrews-house",
      },
      {
        id: "tp-her-3",
        project: "Willoughby Uniting Church Heritage Restoration",
        practices: "Architecture",
        status: "Built",
        href: "/projects/willoughby-heritage-church",
      },
    ],
    quote: {
      text: "Heritage architecture bridges generations, honoring history while serving future needs.",
      author: "Julian Vance",
      image: "/images/about/practice4.jpg",
    },
    features: [
      {
        title: "ADAPTIVE REUSE",
        description:
          "Transforming historic landmarks into vibrant contemporary spaces.",
        image: "/images/home/sector3.png",
      },
      {
        title: "CONSERVATION MASTERY",
        description:
          "Meticulous preservation of architectural legacy and craftsmanship.",
        image: "/images/hero/hero5.png",
      },
      {
        title: "CULTURAL CONTINUITY",
        description:
          "Connecting generations through meaningful historic architecture.",
        image: "/images/hero/hero6.png",
      },
    ],
  },
];
