import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { SocialInitiative } from "@/lib/social-responsibility";

export function SocialInitiativesList({
  initiatives,
}: {
  initiatives: SocialInitiative[];
}) {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-[94px]">
      <Container className="space-y-12 sm:space-y-16 lg:space-y-[143px]">
        {initiatives.map((initiative, index) => {
          const imageLeft = index % 2 === 0;
          const htmlContent = initiative.description.includes("<")
            ? initiative.description
            : initiative.description
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
                .join("");

          return (
            <div
              key={initiative.title}
              className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-0"
            >
              {/* Overlapping Glass Card */}
              <article
                data-aos="fade-up"
                data-aos-delay="150"
                className={`z-10 w-full bg-white/40 backdrop-blur-[4px] border border-[#FDFFEA] p-0 lg:pt-[28px] lg:pr-[20px] lg:pb-[32px] lg:pl-[28px] xl:pt-[28px] xl:pb-[32px] xl:pl-[32px] max-lg:mb-0 lg:row-start-1 lg:row-end-2 rounded-none ${
                  imageLeft
                    ? "order-1 lg:order-2 lg:col-start-7 lg:col-end-13"
                    : "order-1 lg:order-1 lg:col-start-1 lg:col-end-7"
                }`}
              >
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-[24px] xl:text-[32px] uppercase font-bold text-black leading-none mb-3 lg:mb-2 xl:mb-3">
                  {initiative.title}
                </h2>
                <div
                  className="font-sans text-sm sm:text-base lg:text-[11px] xl:text-sm text-zinc-900 leading-relaxed [&_p]:mb-3 xl:[&_p]:mb-3.5 [&_p:last-child]:mb-0 [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </article>

              {/* Feature Image */}
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className={`w-full h-[333px] sm:h-auto sm:aspect-[77/41] lg:aspect-[77/41] overflow-hidden bg-zinc-100 lg:row-start-1 lg:row-end-2 rounded-none ${
                  imageLeft
                    ? "order-2 lg:order-1 lg:col-start-1 lg:col-end-9"
                    : "order-2 lg:order-2 lg:col-start-5 lg:col-end-13"
                }`}
              >
                <ResponsiveImage
                  src={initiative.image}
                  alt={initiative.title}
                  title={initiative.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
