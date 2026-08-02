import { craftFetch } from "./craft";
import { mapCta } from "./cta";
import { toImageSource } from "./media";
import { SECTORS_DATA } from "./sectors-data";
import type { CtaContent, ImageSource, Sector } from "./types";

type Asset = { mobile?: string; tablet?: string; desktop?: string };
type SectorCategory = { title: string; slug: string; tagline: string | null; accentColor: string | null; thumbnail: Asset[] };
type Entry = {
  sectorsHeroHeading: string | null;
  sectorsHeroDescription: string | null;
  sectorsHeroImage: Asset[];
  sectorsGridHeading: string | null;
  sectorsFeatured: SectorCategory[];
  ctaSection: { ctaSectionBackgroundImage: Asset[]; ctaSectionHeading: string | null; ctaSectionDescription: string | null; ctaSectionButtonLabel: string | null; ctaSectionButtonUrl: string | null } | null;
};

export type SectorsPageContent = { hero: { title: string; description: string; image: ImageSource }; sectorsHeading: string; sectors: Sector[]; cta: CtaContent };

const FALLBACK: SectorsPageContent = {
  hero: { title: "EXPLORING OUR SECTORS", description: "Identify how we can support your project through the breadth of our sector expertise.", image: "/images/hero/hero4.png" },
  sectorsHeading: "Designing spaces bespoke to their needs",
  sectors: SECTORS_DATA.map(({ label, image, href, description, hoverColor }) => ({ label, image, href, description, hoverColor })),
  cta: { image: "/images/contact-bg.png", title: "LET’S SHAPE WHAT’S NEXT-TOGETHER", description: "Whether it’s a place to gather, to heal, to learn or to live - we’re ready to collaborate. Let’s shape spaces that matter, together.", buttonText: "LET’S SHAPE WHAT’S NEXT-TOGETHER", buttonHref: "/contact" },
};

const crop = (width: number, height: number, quality = 80) => `url @transform(width: ${width}, height: ${height}, mode: "crop", format: "webp", quality: ${quality}, immediately: true)`;
const hero = `mobile: ${crop(600, 800)} tablet: ${crop(1440, 1000, 82)} desktop: ${crop(2400, 1200, 85)}`;
const card = `mobile: ${crop(600, 480)} tablet: ${crop(900, 720, 82)} desktop: ${crop(1200, 960, 85)}`;
const cta = `mobile: ${crop(600, 900)} tablet: ${crop(1440, 900, 82)} desktop: ${crop(2400, 1000, 85)}`;

const QUERY = /* GraphQL */ `
query SectorsPage {
  entries(section: ["sectors"], limit: 1) {
    ... on sectors_Entry {
      sectorsHeroHeading
      sectorsHeroDescription
      sectorsHeroImage { ${hero} }
      sectorsGridHeading
      sectorsFeatured {
        ... on sector_Category {
          title slug tagline accentColor
          thumbnail { ${card} }
        }
      }
      ctaSection {
        ctaSectionBackgroundImage { ${cta} }
        ctaSectionHeading
        ctaSectionDescription
        ctaSectionButtonLabel
        ctaSectionButtonUrl
      }
    }
  }
}`;

export async function getSectorsPageContent(): Promise<SectorsPageContent> {
  try {
    const data = await craftFetch<{ entries: Entry[] }>(QUERY);
    const entry = data.entries?.[0];
    if (!entry) return FALLBACK;

    const sectors = entry.sectorsFeatured?.map((sector) => {
      const fallback = FALLBACK.sectors.find((item) => item.href === `/sectors/${sector.slug}`);
      const image = toImageSource(sector.thumbnail?.[0]);
      if (!fallback || !image) return null;
      return { label: sector.title.trim() || fallback.label, image, href: `/sectors/${sector.slug}`, description: sector.tagline?.trim() || fallback.description, hoverColor: sector.accentColor?.trim() || fallback.hoverColor };
    }).filter((sector): sector is Sector => Boolean(sector));

    return {
      hero: { title: entry.sectorsHeroHeading?.trim() || FALLBACK.hero.title, description: entry.sectorsHeroDescription?.trim() || FALLBACK.hero.description, image: toImageSource(entry.sectorsHeroImage?.[0]) || FALLBACK.hero.image },
      sectorsHeading: entry.sectorsGridHeading?.trim() || FALLBACK.sectorsHeading,
      sectors: sectors?.length ? sectors : FALLBACK.sectors,
      cta: mapCta(entry, FALLBACK.cta),
    };
  } catch (error) {
    console.warn("Failed to fetch sectors page from Craft, using fallback:", error);
    return FALLBACK;
  }
}
