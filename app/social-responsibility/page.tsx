import type { Metadata } from "next";
import { SocialInitiativesSection } from "@/components/sustainability/SocialInitiativesSection";
import { SupportedOrganisations } from "@/components/sustainability/SupportedOrganisations";
import { Hero } from "@/components/ui/Hero";
import {
  getSocialSustainabilityContent,
  SOCIAL_SUSTAINABILITY_FALLBACK,
} from "@/lib/social-responsibility";

export const metadata: Metadata = { title: "Social RESponsibility" };

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
      />
      <SocialInitiativesSection initiatives={content.initiatives} />
      <SupportedOrganisations
        heading={content.supportingHeading}
        organisations={content.supportingOrganisations}
      />
    </article>
  );
}
