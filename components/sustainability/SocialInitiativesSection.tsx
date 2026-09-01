import { AboutSection } from "@/components/home/AboutSection";
import { SocialInitiativesList } from "@/components/sustainability/SocialInitiativesList";
import type { SocialInitiative } from "@/lib/social-responsibility";

type SocialInitiativesSectionProps = { initiatives: SocialInitiative[] };

export function SocialInitiativesSection({ initiatives }: SocialInitiativesSectionProps) {
  const [teKworo, ...featureInitiatives] = initiatives;

  return (
    <>
      {teKworo && (
        <AboutSection
          background_color="#F0C7BD"
          heading={teKworo.title}
          heading_size="!max-w-full text-[26px] sm:text-[32px] lg:text-[28px] xl:text-[40px]"
          single_line_heading={true}
          description={teKworo.description}
          image_url={teKworo.image}
          image_alt={teKworo.title}
          description_class_name="max-w-full lg:max-w-[341px] text-sm sm:text-base lg:text-[13.5px] xl:text-base leading-relaxed lg:leading-[1.45] xl:leading-relaxed [&_p+p]:mt-3 xl:[&_p+p]:mt-4"
          image_height_class_name="h-[320px] sm:h-[460px] lg:h-[560px] xl:h-[620px] lg:-mt-16 xl:-mt-24 lg:-mb-36 xl:-mb-48"
        />
      )}

      <SocialInitiativesList initiatives={featureInitiatives} />
    </>
  );
}
