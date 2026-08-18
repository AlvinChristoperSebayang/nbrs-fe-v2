import { craftFetch } from "./craft";
import { toSeoImage, type RawSeoAsset, type SeoImage } from "./media";

type RawOption = { contactOptionName?: string | null };
type RawStudio = {
  title?: string | null;
  stuAddress?: string | null;
  stuPhone?: string | null;
};
type RawContact = {
  pageHeading?: string | null;
  seoPageTitle?: string | null;
  seoMetaDescription?: string | null;
  seoImage?: RawSeoAsset[];
  contactHeroImage?: Array<{ url?: string | null; width?: number | null; height?: number | null; title?: string | null }>;
  contactServiceOptions?: RawOption[];
  contactSectorOptions?: RawOption[];
  contactReferralSources?: RawOption[];
  contactPrivacyNotice?: string | null;
  studios?: Array<{ studio?: RawStudio[] }>;
};

export type ContactPageContent = {
  title: string;
  heroImage: { url: string; alt: string; width?: number; height?: number } | null;
  serviceOptions: string[];
  sectorOptions: string[];
  referralSources: string[];
  privacyNotice: string | null;
  studios: Array<{ title: string; address: string | null; phone: string | null }>;
  cmsSeoTitle: string | null;
  seoDescription: string | null;
  seoImage: SeoImage | null;
};

const CONTACT_PAGE_QUERY = /* GraphQL */ `
query ContactPage {
  entries(section: "contact", limit: 1) {
    ... on contact_Entry {
      pageHeading
      seoPageTitle
      seoMetaDescription
      seoImage { url width height title }
      contactHeroImage { url width height title }
      contactServiceOptions {
        ... on contactServiceOption_Entry { contactOptionName }
      }
      contactSectorOptions {
        ... on contactSectorOption_Entry { contactOptionName }
      }
      contactReferralSources {
        ... on contactReferralOption_Entry { contactOptionName }
      }
      contactPrivacyNotice
      studios {
        ... on studio2_Entry {
          studio {
            ... on studio_Category {
              title
              stuAddress
              stuPhone
            }
          }
        }
      }
    }
  }
}`;

const optionNames = (options?: RawOption[]) =>
  (options ?? [])
    .map((option) => option.contactOptionName?.trim() ?? "")
    .filter(Boolean);

export async function getContactPageContent(): Promise<ContactPageContent> {
  const empty: ContactPageContent = {
    title: "GET IN TOUCH",
    heroImage: null,
    serviceOptions: [],
    sectorOptions: [],
    referralSources: [],
    privacyNotice: null,
    studios: [],
    cmsSeoTitle: null,
    seoDescription: null,
    seoImage: null,
  };

  try {
    const data = await craftFetch<{ entries?: RawContact[] }>(CONTACT_PAGE_QUERY, undefined, {
      revalidate: 60,
      tags: ["contact"],
    });
    const contact = data.entries?.[0];
    if (!contact) return empty;

    const hero = contact.contactHeroImage?.[0];

    return {
      title: contact.pageHeading?.trim() || empty.title,
      heroImage: hero?.url ? { url: hero.url, alt: hero.title?.trim() || "NBRS studio", ...(typeof hero.width === "number" && hero.width > 0 ? { width: hero.width } : {}), ...(typeof hero.height === "number" && hero.height > 0 ? { height: hero.height } : {}) } : null,
      serviceOptions: optionNames(contact.contactServiceOptions),
      sectorOptions: optionNames(contact.contactSectorOptions),
      referralSources: optionNames(contact.contactReferralSources),
      privacyNotice: contact.contactPrivacyNotice?.trim() || null,
      studios: (contact.studios ?? []).flatMap((block) =>
        (block.studio ?? []).flatMap((studio) => {
          const title = studio.title?.trim();
          return title
            ? [{ title, address: studio.stuAddress?.trim() || null, phone: studio.stuPhone?.trim() || null }]
            : [];
        })
      ),
      cmsSeoTitle: contact.seoPageTitle?.trim() || null,
      seoDescription: contact.seoMetaDescription?.trim() || null,
      seoImage: toSeoImage(contact.seoImage?.[0]) || toSeoImage(hero),
    };
  } catch (error) {
    console.warn("Failed to fetch Contact page from Craft:", error);
    return empty;
  }
}
