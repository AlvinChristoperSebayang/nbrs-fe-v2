import { craftFetch } from "./craft";

export const FOOTER_SECTIONS = ["purpose", "people", "sectors", "practices", "legal"] as const;

export type FooterSection = (typeof FOOTER_SECTIONS)[number];

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterSocialLink = {
  label: string;
  href: string;
};

export type FooterContent = {
  businessDetailsHtml?: string;
  acknowledgementHtml?: string;
  contactMessage?: string;
  contactLink?: string;
  navigation: Array<FooterLink & { section: FooterSection }>;
  socialLinks: FooterSocialLink[];
};

type RawFooter = {
  footerBusinessDetails?: string | null;
  acknowledgementOfCountry?: string | null;
  footerContactMessage?: string | null;
  footerContactLink?: string | null;
  footerNavigation?: Array<{
    footerNavSection?: string | null;
    footerNavLabel?: string | null;
    footerNavUrl?: string | null;
  }>;
  footerSocialMediaLinks?: Array<{
    itemTitle?: string | null;
    itemUrl?: string | null;
  }>;
};

type FooterResponse = {
  footer: RawFooter[];
};

const FOOTER_QUERY = /* GraphQL */ `
  query GlobalFooter {
    footer: entries(section: "footer", slug: ["footer"], limit: 1) {
      ... on footer_Entry {
        footerBusinessDetails
        acknowledgementOfCountry
        footerContactMessage
        footerContactLink
        footerSocialMediaLinks {
          ... on menulink_Entry {
            itemTitle
            itemUrl
          }
        }
        footerNavigation {
          ... on footerNavLink_Entry {
            footerNavSection
            footerNavLabel
            footerNavUrl
          }
        }
      }
    }
  }
`;

const fallbackFooter: FooterContent = {
  businessDetailsHtml:
    "<p>Nominated Architect:</p><p>Andrew Duffin<br />NSW 5602 | QLD 5465 | VIC00024</p><p>ABN 16 002 247 565</p>",
  acknowledgementHtml:
    "<p>We acknowledge the Aboriginal and Torres Strait Islander peoples as the Traditional Custodians of this land and waters. We pay our respects to Aboriginal and Torres Strait Islander Elders, past and present, and acknowledge the diversity and strength of Aboriginal and Torres Strait Islander peoples and communities today.</p>",
  contactMessage: "NBRS operates on a 9-day fortnight schedule.",
  navigation: [
    ["purpose", "About NBRS", "/about"],
    ["purpose", "Design Approach", "/design-approach"],
    ["purpose", "Awards", "/awards"],
    ["purpose", "Research Envision", "/research"],
    ["purpose", "Sustainability", "/sustainability"],
    ["purpose", "Social Responsibility", "/social-responsibility"],
    ["purpose", "News", "/news"],
    ["people", "Our Leaders", "/people/team"],
    ["people", "Culture", "/people/culture"],
    ["people", "Careers", "/people/careers"],
    ["people", "Envision", "/people/envision-student-program"],
    ["sectors", "Education", "/sectors/education"],
    ["sectors", "Wellness", "/sectors/wellness"],
    ["sectors", "Community", "/sectors/community"],
    ["sectors", "Secure Spaces", "/sectors/secure-spaces"],
    ["sectors", "Heritage", "/sectors/heritage"],
    ["practices", "Architecture", "/practices/architecture"],
    ["practices", "Landscape Architecture", "/practices/landscape-architecture"],
    ["practices", "Interior Design", "/practices/interior-design"],
    ["legal", "Terms & Conditions", "/terms"],
    ["legal", "Privacy Policy", "/privacy"],
    ["legal", "Sitemap", "/sitemap.xml"],
  ].map(([section, label, href]) => ({
    section: section as FooterSection,
    label,
    href,
  })),
  socialLinks: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/10692733" },
    { label: "Instagram", href: "https://www.instagram.com/nbrsarchitecture/" },
    { label: "YouTube", href: "https://www.youtube.com" },
  ],
};

function text(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

function isFooterSection(value: string | null | undefined): value is FooterSection {
  return typeof value === "string" && (FOOTER_SECTIONS as readonly string[]).includes(value);
}

export function mapFooter(raw: RawFooter | undefined): FooterContent | undefined {
  if (!raw) return undefined;

  return {
    businessDetailsHtml: text(raw.footerBusinessDetails),
    acknowledgementHtml: text(raw.acknowledgementOfCountry),
    contactMessage: text(raw.footerContactMessage),
    contactLink: text(raw.footerContactLink),
    navigation: (raw.footerNavigation ?? []).flatMap((link) => {
      const label = text(link.footerNavLabel);
      const href = text(link.footerNavUrl);

      return isFooterSection(link.footerNavSection) && label && href
        ? [{ section: link.footerNavSection, label, href }]
        : [];
    }),
    socialLinks: (raw.footerSocialMediaLinks ?? []).flatMap((link) => {
      const label = text(link.itemTitle);
      const href = text(link.itemUrl);

      return label && href ? [{ label, href }] : [];
    }),
  };
}

export async function getFooter(): Promise<FooterContent> {
  try {
    const data = await craftFetch<FooterResponse>(FOOTER_QUERY, undefined, {
      revalidate: 300,
      tags: ["footer"],
    });

    const footer = mapFooter(data.footer[0]);
    return footer?.navigation.length ? footer : fallbackFooter;
  } catch (error) {
    console.error("Could not load global footer from Craft.", error);
    return fallbackFooter;
  }
}
