import { craftFetch } from "./craft";

type RawOption = { contactOptionName?: string | null };
type RawStudio = {
  title?: string | null;
  stuAddress?: string | null;
  stuPhone?: string | null;
};
type RawContact = {
  pageHeading?: string | null;
  contactHeroImage?: Array<{ url?: string | null; title?: string | null }>;
  contactServiceOptions?: RawOption[];
  contactSectorOptions?: RawOption[];
  contactReferralSources?: RawOption[];
  contactPrivacyNotice?: string | null;
  studios?: Array<{ studio?: RawStudio[] }>;
};

export type ContactPageContent = {
  title: string;
  heroImage: { url: string; alt: string } | null;
  serviceOptions: string[];
  sectorOptions: string[];
  referralSources: string[];
  privacyNotice: string | null;
  studios: Array<{ title: string; address: string | null; phone: string | null }>;
};

const CONTACT_PAGE_QUERY = /* GraphQL */ `
query ContactPage {
  entries(section: "contact", limit: 1) {
    ... on contact_Entry {
      pageHeading
      contactHeroImage { url title }
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
      heroImage: hero?.url ? { url: hero.url, alt: hero.title?.trim() || "NBRS studio" } : null,
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
    };
  } catch (error) {
    console.warn("Failed to fetch Contact page from Craft:", error);
    return empty;
  }
}
