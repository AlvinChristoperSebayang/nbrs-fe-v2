import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function TextImageSection({
  heading,
  description,
  image,
  buttonText,
  buttonHref,
}: {
  heading: string;
  description: string;
  image: string;
  buttonText?: string;
  buttonHref?: string;
}) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
        <div
          data-aos="fade-up"
          className="flex flex-col items-start gap-4 lg:w-[35%]"
        >
          <h2 className="font-heading text-3xl uppercase leading-[1.05] tracking-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="text-sm text-black/70 sm:text-base">{description}</p>

          {buttonText && buttonHref && (
            <Link
              href={buttonHref}
              className="group mt-2 inline-flex items-center gap-2 rounded-full border border-black px-6 py-3 text-sm uppercase text-black transition hover:bg-black hover:text-white"
            >
              {buttonText}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path
                  d="M4 12h16m0 0l-6-6m6 6l-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="w-full overflow-hidden lg:w-[65%]"
        >
          <img
            src={image}
            alt=""
            className="h-64 w-full object-cover sm:h-80 lg:h-[420px]"
          />
        </div>
      </Container>
    </section>
  );
}
