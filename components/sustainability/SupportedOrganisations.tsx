import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

type Organisation = {
  name: string;
  logo: ImageSource;
};

const ORGANISATIONS: Organisation[] = [
  {
    name: "Architects Without Frontiers",
    logo: "/images/purpose/footerlogo 1.png",
  },
  {
    name: "Te-Kworo Foundation",
    logo: "/images/purpose/TK+logo+no+background.png",
  },
  {
    name: "One Life To Love",
    logo: "/images/purpose/OLTLLogo-NoTag.png",
  },
  {
    name: "Cancer Council",
    logo: "/images/purpose/Cancer Council_Logo 1.png",
  },
  {
    name: "Children's Medical Research Institute - Jeans for Genes",
    logo: "/images/purpose/Group 1597879763.png",
  },
  {
    name: "Chain Reaction Challenge Foundation",
    logo: "/images/purpose/chain reaction 1.png",
  },
];

type SupportedOrganisationsProps = {
  heading?: string;
  organisations?: Organisation[];
};

export function SupportedOrganisations({
  heading = "Proudly supporting a range of other organisations",
  organisations = ORGANISATIONS,
}: SupportedOrganisationsProps) {
  return (
    <section className="text-black">
      {/* Desktop Header Banner (Full Left Bleed, Text Aligned to Container) */}
      <div className="hidden md:block overflow-x-clip">
        <Container>
          <div
            data-aos="fade-up"
            className="relative inline-block bg-[#F0C7BD] py-8 lg:py-10 pr-8 lg:pr-16 max-w-[620px]"
          >
            <div className="absolute top-0 bottom-0 right-full w-[100vw] bg-[#F0C7BD]" />
            <h2 className="relative z-10 font-heading text-2xl md:text-3xl lg:text-[34px] xl:text-[40px] uppercase font-bold text-black leading-tight">
              {heading}
            </h2>
          </div>
        </Container>
      </div>

      {/* Main Section Content */}
      <div className="py-12 md:py-20 lg:py-24 bg-[#F1F1F1]">
        <Container>
          {/* Mobile Header Title (Visible on Mobile) */}
          <div data-aos="fade-up" className="block md:hidden text-center mb-8 px-2">
            <h2 className="font-heading text-[28px] uppercase font-bold text-black leading-tight">
              {heading}
            </h2>
          </div>

          {/* Desktop Grid (3 columns, transparent logo view) */}
          <div className="hidden md:grid md:grid-cols-3 gap-12 lg:gap-16 items-center justify-items-center">
            {organisations.map((org, index) => (
              <div
                key={org.name}
                data-aos="fade-up"
                data-aos-delay={100 + index * 100}
                className="flex items-center justify-center p-4 h-24 lg:h-28 w-full max-w-[280px]"
              >
                <ResponsiveImage
                  src={org.logo}
                  alt={org.name}
                  title={org.name}
                  className="max-h-full max-w-full object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>

          {/* Mobile Grid (2 columns with white rounded cards) */}
          <div className="grid grid-cols-2 md:hidden gap-4">
            {organisations.map((org, index) => (
              <div
                key={org.name}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white h-[120px] p-6 flex items-center justify-center rounded-[8px] shadow-sm"
              >
                <ResponsiveImage
                  src={org.logo}
                  alt={org.name}
                  title={org.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
