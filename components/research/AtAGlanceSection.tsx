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
              className="group relative flex h-full min-h-[224px] flex-col items-center
  overflow-hidden bg-black px-6 pt-10 pb-8 text-center
  transform-gpu
  transition-[transform,box-shadow]
  duration-500
  ease-[cubic-bezier(0.22,1,0.36,1)]
  will-change-transform
  hover:-translate-y-0.5
  hover:scale-[1.015]
  hover:shadow-xl"
            >
              <div className="absolute top-0 right-0 left-0 h-2.5" style={{ backgroundColor: item.accentColor }} />

              <div className="mb-5 flex h-10 w-10 shrink-0 items-center justify-center">
                {item.icon ? (
                  <ResponsiveImage src={item.icon} alt="" className="h-10 w-10 object-contain" />
                ) : (
                  <div className="h-8 w-8 rounded-sm border-2 border-white/60 transition-colors group-hover:border-white" />
                )}
              </div>

              <p className="max-w-[210px] font-sans text-base font-normal text-white sm:text-[18px]">{item.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
