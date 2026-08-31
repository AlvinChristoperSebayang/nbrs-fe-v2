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
          className="relative w-full min-h-none lg:min-h-[340px] xl:min-h-[410px] flex flex-col-reverse lg:flex-col lg:block justify-center gap-6 lg:gap-0"
        >
          {/* Main Left Image (770px x 410px aspect ratio) */}
          <div className="w-[calc(100%+1rem)] sm:w-[calc(100%+1.5rem)] lg:w-[66%] xl:w-[770px] -mr-4 sm:-mr-6 lg:mr-0 aspect-[770/410] relative lg:absolute lg:left-0 lg:top-0 overflow-hidden">
            <ResponsiveImage
              src={image}
              alt={alt}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Overlapping Frosted Glass Box (585px wide, overlapping right side of image) */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="w-full lg:w-[56%] xl:w-[585px] relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-10 bg-transparent lg:bg-white/75 lg:backdrop-blur-sm p-0 sm:p-8 lg:p-6 xl:p-10 flex items-center border-none lg:border lg:border-white/70 rounded-[2px]"
          >
            <div className="font-sans text-base sm:text-base lg:text-[13.5px] xl:text-base text-black font-normal leading-relaxed xl:leading-[1.5] max-w-[464px]">
              {renderPracticeQuote(quote)}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
