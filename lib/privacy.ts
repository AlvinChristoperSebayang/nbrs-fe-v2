import { craftFetch } from "./craft";
import { toImageSource, toSeoImage, type RawResponsiveAsset, type RawSeoAsset, type SeoImage } from "./media";
import type { CtaContent, ImageSource } from "./types";

type PrivacyEntry = {
  title: string | null;
  dateUpdated: string | null;
  pageSubheading: string | null;
  pageHeroImage: RawResponsiveAsset[];
  privacyContent: string | null;
  seoPageTitle: string | null;
  seoMetaDescription: string | null;
  seoImage: RawSeoAsset[];
  ctaSection: {
    ctaSectionBackgroundImage: RawResponsiveAsset[];
    ctaSectionHeading: string | null;
    ctaSectionDescription: string | null;
    ctaSectionButtonLabel: string | null;
    ctaSectionButtonUrl: string | null;
  } | null;
};

type PrivacyResponse = { entries: PrivacyEntry[] };

export type PrivacyPageContent = {
  title: string;
  description: string;
  hero: ImageSource;
  contentHtml: string;
  lastUpdated: string;
  cta: CtaContent;
  cmsSeoTitle: string | null;
  seoDescription: string;
  seoImage: SeoImage | null;
};

const FALLBACK: PrivacyPageContent = {
  title: "Privacy Policy",
  description: "Our commitment to protecting your personal information and privacy.",
  hero: "/images/hero/about-hero.png",
  contentHtml: `
    <h3>1. Introduction &amp; Overview</h3>
    <p>NBRS Architecture (&ldquo;NBRS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to safeguarding the privacy and personal data of visitors to our website, clients, partners, and job applicants. This Privacy Policy outlines how we collect, use, disclose, and store your personal information in accordance with applicable privacy laws and regulations.</p>
    <h3>2. Collection of Personal Information</h3>
    <p>We collect personal information that you voluntarily provide to us when contacting us via our website forms, subscribing to updates, applying for employment, or engaging with our architectural design and research services. Information collected may include:</p>
    <ul><li>Full name, job title, and professional organisation details.</li><li>Contact details including email address, phone number, and mailing address.</li><li>Resume, portfolio, and employment history for career applications.</li><li>Technical data such as IP address, browser type, and device information gathered via website cookies.</li></ul>
    <h3>3. Use of Personal Information</h3>
    <p>Your personal information is collected and processed strictly for legitimate business operations, including:</p>
    <ul><li>Responding to inquiries and managing client service requests.</li><li>Evaluating career applications and conducting recruitment processes.</li><li>Delivering industry insights, news, and project updates when requested.</li><li>Improving our website performance, user experience, and digital security.</li></ul>
    <h3>4. Disclosure &amp; Data Sharing</h3>
    <p>NBRS does not sell, rent, or trade your personal information to third parties. We may disclose your information to trusted third-party service providers who assist us in operating our website, managing IT infrastructure, or conducting business operations, strictly under binding confidentiality agreements.</p>
    <h3>5. Data Storage &amp; Security</h3>
    <p>We employ robust technical and organizational security measures to protect your personal data from unauthorized access, misuse, loss, or alteration. All electronic records are stored securely on encrypted servers with restricted access permissions.</p>
    <h3>6. Your Rights &amp; Access</h3>
    <p>You have the right to request access to the personal information we hold about you, request corrections to inaccurate data, or request the deletion of your personal records, subject to legal retention obligations.</p>
    <h3>7. Contacting Our Privacy Team</h3>
    <p>If you have any questions, concerns, or requests regarding this Privacy Policy or how your personal information is managed, please contact NBRS Architecture via email at <strong>privacy@nbrs.com.au</strong> or through our contact page.</p>
  `,
  lastUpdated: "August 2026",
  cta: {
    image: "/images/contact-bg.png",
    title: "HAVE QUESTIONS ABOUT YOUR PRIVACY?",
    description: "Reach out to our privacy officer or leadership team for any data protection inquiries.",
    buttonText: "CONTACT NBRS",
    buttonHref: "/contact",
  },
  cmsSeoTitle: null,
  seoDescription: "Learn about NBRS Architecture's commitment to protecting your personal data and privacy.",
  seoImage: null,
};

const QUERY = /* GraphQL */ `
  query PrivacyPage {
    entries(section: "privacy", limit: 1) {
      ... on privacy_Entry {
        title
        dateUpdated
        pageSubheading
        privacyContent
        seoPageTitle
        seoMetaDescription
        seoImage { url width height title }
        pageHeroImage {
          mobile: url @transform(width: 600, height: 800, mode: "crop", format: "webp", quality: 80, immediately: true)
          tablet: url @transform(width: 1440, height: 1000, mode: "crop", format: "webp", quality: 82, immediately: true)
          desktop: url @transform(width: 2400, height: 1200, mode: "crop", format: "webp", quality: 85, immediately: true)
          title
        }
        ctaSection {
          ctaSectionBackgroundImage {
            mobile: url @transform(width: 600, height: 900, mode: "crop", format: "webp", quality: 80, immediately: true)
            tablet: url @transform(width: 1440, height: 900, mode: "crop", format: "webp", quality: 82, immediately: true)
            desktop: url @transform(width: 2400, height: 1000, mode: "crop", format: "webp", quality: 85, immediately: true)
            title
          }
          ctaSectionHeading
          ctaSectionDescription
          ctaSectionButtonLabel
          ctaSectionButtonUrl
        }
      }
    }
  }
`;

function formatUpdated(value: string | null | undefined): string {
  if (!value) return FALLBACK.lastUpdated;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return FALLBACK.lastUpdated;
  return new Intl.DateTimeFormat("en-AU", {
    month: "long",
    year: "numeric",
    timeZone: "Australia/Sydney",
  }).format(date);
}

export async function getPrivacyPageContent(): Promise<PrivacyPageContent> {
  try {
    const response = await craftFetch<PrivacyResponse>(QUERY, undefined, { revalidate: 60 });
    const entry = response.entries[0];
    if (!entry) return FALLBACK;

    const cta = entry.ctaSection;
    return {
      title: entry.title?.trim() || FALLBACK.title,
      description: entry.pageSubheading?.trim() || FALLBACK.description,
      hero: toImageSource(entry.pageHeroImage[0]) || FALLBACK.hero,
      contentHtml: entry.privacyContent?.trim() || FALLBACK.contentHtml,
      lastUpdated: formatUpdated(entry.dateUpdated),
      cta: {
        image: toImageSource(cta?.ctaSectionBackgroundImage[0]) || FALLBACK.cta.image,
        title: cta?.ctaSectionHeading?.trim() || FALLBACK.cta.title,
        description: cta?.ctaSectionDescription?.trim() || FALLBACK.cta.description,
        buttonText: cta?.ctaSectionButtonLabel?.trim() || FALLBACK.cta.buttonText,
        buttonHref: cta?.ctaSectionButtonUrl?.trim() || FALLBACK.cta.buttonHref,
      },
      cmsSeoTitle: entry.seoPageTitle?.trim() || null,
      seoDescription: entry.seoMetaDescription?.trim() || FALLBACK.seoDescription,
      seoImage: toSeoImage(entry.seoImage?.[0]),
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[getPrivacyPageContent] Craft query failed; using fallback data:", error);
    }
    return FALLBACK;
  }
}
