import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

function renderPracticeQuote(quote: string) {
  const normalized = quote.replace(/\\n/g, "\n").replace(/\r\n?/g, "\n");
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(normalized);

  if (isHtml) {
    return <div dangerouslySetInnerHTML={{ __html: normalized }} />;
  }

  return <span className="whitespace-pre-line">{normalized}</span>;
}

export function PracticeIntroSection({
  image,
  quote,
  alt = "Practice intro image",
}: {
  image: ImageSource;
  quote: string;
  alt?: string;
}) {
  return (
    <section className="bg-white py-14 lg:py-24 text-black overflow-hidden">
      <Container>
        <div
          data-aos="fade-up"
          className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-0"
        >
          {/* Main Left Image (Cols 1 - 8) */}
          <div className="order-2 lg:order-1 w-[calc(100%+1rem)] sm:w-[calc(100%+1.5rem)] lg:w-full -mr-4 sm:-mr-6 lg:mr-0 aspect-[770/410] lg:col-start-1 lg:col-end-9 lg:row-start-1 lg:row-end-2 overflow-hidden rounded-none">
            <ResponsiveImage
              src={image}
              alt={alt}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Overlapping Frosted Glass Box (Cols 6 - 12, overlapping cols 6, 7, 8 of image) */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="order-1 lg:order-2 w-full lg:col-start-7 lg:col-end-13 lg:row-start-1 lg:row-end-2 z-10 bg-transparent lg:bg-white/75 lg:backdrop-blur-sm p-0 sm:p-8 lg:p-8 xl:p-10 flex items-center border-none lg:border lg:border-white/70 rounded-none"
          >
            <div className="font-sans text-base sm:text-base lg:text-[13.5px] xl:text-[15px] 2xl:text-base text-black font-normal leading-relaxed xl:leading-[1.5] max-w-[464px]">
              {renderPracticeQuote(quote)}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
