import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Container } from "@/components/ui/Container";
import type { ImageSource } from "@/lib/types";

export type AtAGlanceItem = {
  accentColor: string;
  text: string;
  icon: ImageSource | null;
};

export function AtAGlanceSection({
  title = "AT A GLANCE",
  items,
}: {
  title?: string;
  items: AtAGlanceItem[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="bg-white pt-12 pb-6 text-black lg:pt-20 lg:pb-6">
      <Container>
        <h2 data-aos="fade-up" className="mb-8 font-heading text-3xl font-bold leading-none text-black uppercase sm:text-4xl lg:mb-12">
          {title}
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {items.map((item, index) => (
            <div
              key={`${item.text}-${index}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group h-full w-full pt-2"
            >
              <div
                className="relative flex h-full min-h-[224px] flex-col items-center overflow-hidden rounded-[2px] bg-black px-6 pt-10 pb-8 text-center shadow-md transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:bg-[#181B22] group-hover:shadow-xl will-change-transform"
              >
                <div
                  className="absolute top-0 right-0 left-0 h-2.5 transition-all duration-300 group-hover:h-3"
                  style={{ backgroundColor: item.accentColor }}
                />

                <div className="mb-5 flex h-10 w-10 shrink-0 items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
                  {item.icon ? (
                    <ResponsiveImage
                      src={item.icon}
                      alt={item.text || "Research metric icon"}
                      title={item.text || "Research metric icon"}
                      className="h-10 w-10 object-contain"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-sm border-2 border-white/60 transition-colors group-hover:border-white" />
                  )}
                </div>

                <p className="max-w-[210px] font-sans text-base font-normal text-white transition-colors duration-300 sm:text-[18px]">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
