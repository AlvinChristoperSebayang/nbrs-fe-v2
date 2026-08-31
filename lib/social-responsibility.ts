import { craftFetch } from "./craft";
import { toImageSource, toSeoImage, type RawSeoAsset, type SeoImage } from "./media";
import type { ImageSource } from "./types";

type Asset = { url?: string; mobile?: string; tablet?: string; desktop?: string };

type SocialSustainabilityEntry = {
  seoPageTitle: string | null;
  seoMetaDescription: string | null;
  seoImage: RawSeoAsset[];
  socialSusHeroHeading: string | null;
  socialSusHeroDescription: string | null;
  socialSusHeroImage: Asset[];
  whatWeDoV2: Array<{ title: string | null; description2: string | null; image: Asset[] }>;
  socialSusSupportingHeading: string | null;
  socialSusSupportingOrganisations: Array<{
    socialSupportingOrganisationName: string | null;
    socialSupportingOrganisationLogo: Asset[];
  }>;
};

export type SocialInitiative = { title: string; description: string; image: ImageSource };
export type SupportingOrganisation = { name: string; logo: ImageSource };

export type SocialSustainabilityContent = {
  cmsSeoTitle: string | null;
  seoDescription: string | null;
  seoImage: SeoImage | null;
  hero: { title: string; description: string; image: ImageSource };
  initiatives: SocialInitiative[];
  supportingHeading: string;
  supportingOrganisations: SupportingOrganisation[];
};

const crop = (width: number, height: number, quality = 80) =>
  `url @transform(width: ${width}, height: ${height}, mode: "crop", format: "webp", quality: ${quality}, immediately: true)`;
const heroFit = (width: number, quality = 85) =>
  `url @transform(width: ${width}, mode: "fit", format: "webp", quality: ${quality}, immediately: true)`;
const hero = `mobile: ${heroFit(768, 80)} tablet: ${heroFit(1440, 82)} desktop: ${heroFit(2400, 85)}`;
const landscapeFit = (width: number, quality = 80) =>
  `url @transform(width: ${width}, mode: "fit", format: "webp", quality: ${quality}, immediately: true)`;
const landscape = `mobile: ${landscapeFit(600)} tablet: ${landscapeFit(900, 82)} desktop: ${landscapeFit(1200, 85)}`;

const QUERY = /* GraphQL */ `
  query SocialSustainabilityPage {
    entries(section: ["socialSus"], limit: 1) {
      ... on socialSus_Entry {
        seoPageTitle
        seoMetaDescription
        seoImage { url width height title }
        socialSusHeroHeading
        socialSusHeroDescription
        socialSusHeroImage { url ${hero} }
        whatWeDoV2 { ... on whatWeDoContent_Entry { title description2 image { url ${landscape} } } }
        socialSusSupportingHeading
        socialSusSupportingOrganisations { ... on socialSupportingOrganisation_Entry { socialSupportingOrganisationName socialSupportingOrganisationLogo { url } } }
      }
    }
  }
`;

export const SOCIAL_SUSTAINABILITY_FALLBACK: SocialSustainabilityContent = {
  cmsSeoTitle: null,
  seoDescription: null,
  seoImage: null,
  hero: {
    title: "Design for good",
    description: "NBRS partakes in several social initiatives bringing smiles to communities in need and helping to positively shape their lives with designs that provide opportunities for a better future.",
    image: "/images/hero/hero6.png",
  },
  initiatives: [
    { title: "Te-Kworo Foundation", description: "NBRS provides design for good expertise to support vulnerable communities in Northern Uganda.\n\nEstablished by Alice Achan in 2002, Te-Kworo Foundation delivers education, maternal and child healthcare, and social protection for girls and women.\n\nIn partnership with the Sonic Healthcare Foundation and the Barbara May Foundation, NBRS designed a 42-bed maternal health facility.", image: "/images/about/real-insight.jpg" },
    { title: "Architects Without Frontiers (AWF)", description: "NBRS collaborates closely with AWF, the Asia-Pacific's leading not-for-profit design organisation. AWF delivers community infrastructure for disadvantaged regions.\n\nOur partnership includes the San Miguel National High School in the Philippines and the Home of Hope campus in India for One Life to Love.", image: "/images/about/creative-partnership.jpg" },
    { title: "One Life to Love", description: "Through AWF, NBRS supports One Life to Love, a not-for-profit dedicated to the care and education of abandoned and at-risk children in India.\n\nNBRS has designed a campus in Bangalore housing orphans, neglected families, a school and a skills centre. Construction is starting in 2026.", image: "/images/about/creative-partnership.jpg" },
  ],
  supportingHeading: "Proudly supporting a range of other organisations",
  supportingOrganisations: [
    { name: "Architects Without Frontiers", logo: "/images/purpose/footerlogo 1.png" },
    { name: "Te-Kworo Foundation", logo: "/images/purpose/TK+logo+no+background.png" },
    { name: "One Life To Love", logo: "/images/purpose/OLTLLogo-NoTag.png" },
    { name: "Chain Reaction Challenge Foundation", logo: "/images/purpose/chain reaction 1.png" },
    { name: "Children's Medical Research Institute - Jeans for Genes", logo: "/images/purpose/Group 1597879763.png" },
    { name: "Cancer Council", logo: "/images/purpose/Cancer Council_Logo 1.png" },
  ],
};

export async function getSocialSustainabilityContent(): Promise<SocialSustainabilityContent> {
  const data = await craftFetch<{ entries: SocialSustainabilityEntry[] }>(QUERY);
  const entry = data.entries[0];
  if (!entry) return SOCIAL_SUSTAINABILITY_FALLBACK;

  const initiatives = entry.whatWeDoV2.map((item) => {
    const image = toImageSource(item.image[0]);
    if (!item.title?.trim() || !item.description2?.trim() || !image) return null;
    return { title: item.title.trim(), description: item.description2.trim(), image };
  }).filter((item): item is SocialInitiative => item !== null);

  const supportingOrganisations = entry.socialSusSupportingOrganisations.map((organisation) => {
    const image = toImageSource(organisation.socialSupportingOrganisationLogo[0]);
    const name = organisation.socialSupportingOrganisationName?.trim();
    if (!image || !name) return null;
    return { name, logo: image };
  }).filter((item): item is SupportingOrganisation => item !== null);

  return {
    cmsSeoTitle: entry.seoPageTitle?.trim() || null,
    seoDescription: entry.seoMetaDescription?.trim() || null,
    seoImage: toSeoImage(entry.seoImage?.[0]),
    hero: {
      title: entry.socialSusHeroHeading?.trim() || SOCIAL_SUSTAINABILITY_FALLBACK.hero.title,
      description: entry.socialSusHeroDescription?.trim() || SOCIAL_SUSTAINABILITY_FALLBACK.hero.description,
      image: toImageSource(entry.socialSusHeroImage[0]) || SOCIAL_SUSTAINABILITY_FALLBACK.hero.image,
    },
    initiatives: initiatives.length ? initiatives : SOCIAL_SUSTAINABILITY_FALLBACK.initiatives,
    supportingHeading: entry.socialSusSupportingHeading?.trim() || SOCIAL_SUSTAINABILITY_FALLBACK.supportingHeading,
    supportingOrganisations: supportingOrganisations.length ? supportingOrganisations : SOCIAL_SUSTAINABILITY_FALLBACK.supportingOrganisations,
  };
}
