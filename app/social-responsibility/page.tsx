import { createPageMetadata } from "@/lib/seo";
import { SocialInitiativesSection } from "@/components/sustainability/SocialInitiativesSection";
import { SupportedOrganisations } from "@/components/sustainability/SupportedOrganisations";
import { Hero } from "@/components/ui/Hero";
import {
  getSocialSustainabilityContent,
  SOCIAL_SUSTAINABILITY_FALLBACK,
} from "@/lib/social-responsibility";

export async function generateMetadata() {
  const page = await getSocialSustainabilityContent().catch(() => SOCIAL_SUSTAINABILITY_FALLBACK);
  return createPageMetadata({ pathname: "/social-responsibility", title: page.hero.title, description: page.hero.description, image: page.hero.image });
}

export default async function SocialSustainabilityPage() {
  const content = await getSocialSustainabilityContent().catch(
    () => SOCIAL_SUSTAINABILITY_FALLBACK
  );

  return (
    <article className="min-h-screen bg-white text-black">
      <Hero
        image={content.hero.image}
        title={content.hero.title}
        description={content.hero.description}
        descriptionClassName="max-w-[364px]"
      />
      <SocialInitiativesSection initiatives={content.initiatives} />
      <SupportedOrganisations
        heading={content.supportingHeading}
        organisations={content.supportingOrganisations}
      />
    </article>
  );
}
