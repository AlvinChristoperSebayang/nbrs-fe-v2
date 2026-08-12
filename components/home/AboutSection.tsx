import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import Link from "next/link";
import type { ImageSource } from "@/lib/types";

export function AboutSection({
  image_url,
  image_alt = "NBRS project — building exterior",
  background_color,
  heading = "Designing Environments That Shape Lives",
  description = "Working collaboratively with clients and communities to create enduring, human-centred places",
  button,
  heading_size = "text-[28px] sm:text-[40px]",
}: {
  image_url: ImageSource;
  image_alt?: string;
  background_color?: string;
  heading?: string;
  description?: string;
  button?: {
    text: string;
    href: string;
  };
  heading_size?: string;
}) {
  return (
    <section className="section-about flex flex-col lg:flex-row lg:pb-[100px] pb-8 bg-[#FFFFFF]">
      <div className="w-full h-full bg-[#070F0F]">
        {background_color && <div className="h-3 w-full" style={{ backgroundColor: background_color }} />}
        <Container className="flex flex-col lg:flex-row relative">
          <div className="flex flex-col justify-center gap-6 py-16 lg:w-2/5 lg:pt-24 lg:pb-60 lg:max-w-[340px]">
            <h2
              data-aos="fade-up"
              className={`font-heading ${heading_size} leading-[1.05] uppercase text-white`}
            >
              {heading}
            </h2>
            <p data-aos="fade-up" data-aos-delay="150" className="max-w-md text-white">
              {description}
            </p>
            {button && (
              <div data-aos="fade-up" data-aos-delay="200" className="mt-1">
                <Link
                  href={button.href}
                  className="group inline-flex items-center gap-2.5 rounded-[5px] bg-[#454B4B] hover:bg-[#575E5E] px-5 py-3 text-sm font-medium text-white transition-colors"
                >
                  <span>{button.text}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path
                      d="M1 8H15M15 8L8 1M15 8L8 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="lg:absolute relative image-about__wrapper lg:top-0 lg:right-[55px] 2xl:right-[135px] h-80 sm:h-96 lg:w-[65%] 2xl:w-[55%] image__wrapper"
          >
            <ResponsiveImage
              src={image_url}
              alt={image_alt}
              className="absolute inset-0 h-full w-full object-cover image-about"
            />
          </div>
        </Container>
      </div>
    </section>
  );
}
