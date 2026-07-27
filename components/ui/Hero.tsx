import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Hero({
  image,
  title,
  description,
  button,
}: {
  image: string;
  title: string;
  description?: string;
  button?: {
    text: string;
    href: string;
  };
}) {
  return (
    <section className="relative max-md:h-[80vh] lg:h-[90vh] w-full overflow-hidden">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover lg:min-h-screen"
      />
      <div className="absolute inset-0 bg-black/40" />
      <Container className="relative flex h-full flex-col justify-center pb-12 lg:pb-16">
        <div className="flex flex-col items-start max-w-[650px]">
          <h1
            data-aos="fade-up"
            className="font-heading max-w-2xl text-4xl uppercase leading-[1.05] text-white sm:text-5xl lg:text-[70px]"
          >
            {title}
          </h1>
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="mt-4 lg:h-2 h-1 w-full origin-left bg-white"
          />
          {description && (
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-6 text-sm text-white sm:text-base"
            >
              {description}
            </p>
          )}
          {button && (
            <Link
              href={button.href}
              data-aos="fade-up"
              data-aos-delay="300"
              className="group mt-8 inline-flex items-center gap-2 rounded-[5px] bg-white/30 px-6 py-4 text-xs  text-white backdrop-blur transition sm:text-base"
            >
              {button.text}
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path
                  d="M14 7.72388L0 7.72388M6.66725 14.7236L14 7.72388L6.66725 0.723633"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
