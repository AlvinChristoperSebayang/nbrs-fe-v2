import { craftFetch } from "./craft";
import { toImageSource, toSeoImage, type RawResponsiveAsset, type RawSeoAsset, type SeoImage } from "./media";
import type { CtaContent, ImageSource } from "./types";

type TermsEntry = {
  title: string | null;
  dateUpdated: string | null;
  pageSubheading: string | null;
  pageHeroImage: RawResponsiveAsset[];
  termsContent: string | null;
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

type TermsResponse = { entries: TermsEntry[] };

export type TermsPageContent = {
  title: string;
  sidebarTitle: string;
  description: string;
  hero: ImageSource;
  contentHtml: string;
  lastUpdated: string;
  cta: CtaContent;
  cmsSeoTitle: string | null;
  seoDescription: string;
  seoImage: SeoImage | null;
};

const FALLBACK: TermsPageContent = {
  title: "Terms & Conditions",
  sidebarTitle: "Terms of Use",
  description: "Terms of use governing your access to NBRS Architecture website and services.",
  hero: "/images/hero/hero2.png",
  contentHtml: `
    <h3>1. Acceptance of Terms</h3>
    <p>By accessing or using the website of NBRS Architecture (&ldquo;NBRS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please refrain from using our website and services.</p>
    <h3>2. Intellectual Property Rights</h3>
    <p>All content on this website—including architectural designs, project photographs, text, graphics, logos, research publications, and code—is the property of NBRS Architecture or its licensors and is protected by international copyright and intellectual property laws.</p>
    <p>You may not reproduce, modify, distribute, publish, or commercialize any content from this website without prior explicit written permission from NBRS.</p>
    <h3>3. Permitted Use of Website</h3>
    <p>You are granted a limited, non-exclusive license to view and download materials from this website solely for personal, non-commercial informational purposes, provided that all copyright and proprietary notices remain intact.</p>
    <h3>4. Disclaimer of Warranties</h3>
    <p>The information provided on this website is for general informational purposes only. While NBRS endeavors to maintain accurate and up-to-date content, we make no representations or warranties of any kind, express or implied, regarding the completeness, accuracy, reliability, or availability of the website content.</p>
    <h3>5. Limitation of Liability</h3>
    <p>To the fullest extent permitted by law, NBRS Architecture shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, use of, or inability to use this website or any materials contained herein.</p>
    <h3>6. Third-Party Links &amp; Services</h3>
    <p>This website may contain links to external third-party websites or services. NBRS has no control over and assumes no responsibility for the content, privacy policies, or practices of any third-party websites.</p>
    <h3>7. Governing Law &amp; Jurisdiction</h3>
    <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of New South Wales, Australia. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of New South Wales.</p>
    <h3>8. Modifications to Terms</h3>
    <p>NBRS reserves the right to update or modify these Terms and Conditions at any time without prior notice. Continued use of the website following any changes constitutes your acceptance of the revised terms.</p>
  `,
  lastUpdated: "August 2026",
  cta: {
    image: "/images/contact-bg.png",
    title: "LOOKING TO PARTNER OR COLLABORATE?",
    description: "Let's discuss your next project or architectural inquiry with our team.",
    buttonText: "CONTACT NBRS",
    buttonHref: "/contact",
  },
  cmsSeoTitle: null,
  seoDescription: "Terms of use and conditions governing your access to NBRS Architecture website and services.",
  seoImage: null,
};

const QUERY = /* GraphQL */ `
  query TermsPage {
    entries(section: "terms", limit: 1) {
      ... on terms_Entry {
        title
        dateUpdated
        pageSubheading
        termsContent
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

export async function getTermsPageContent(): Promise<TermsPageContent> {
  try {
    const response = await craftFetch<TermsResponse>(QUERY, undefined, { revalidate: 60 });
    const entry = response.entries[0];
    if (!entry) return FALLBACK;

    const cta = entry.ctaSection;
    return {
      title: entry.title?.trim() || FALLBACK.title,
      sidebarTitle: FALLBACK.sidebarTitle,
      description: entry.pageSubheading?.trim() || FALLBACK.description,
      hero: toImageSource(entry.pageHeroImage[0]) || FALLBACK.hero,
      contentHtml: entry.termsContent?.trim() || FALLBACK.contentHtml,
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
      console.error("[getTermsPageContent] Craft query failed; using fallback data:", error);
    }
    return FALLBACK;
  }
}
