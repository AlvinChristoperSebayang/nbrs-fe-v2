import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export function QuoteSection({
  image,
  quote,
  author,
  role,
  quoteIconColor = "#B5B5B5",
  boxBgClass = "bg-[#D9D9D9] lg:bg-white/80 lg:backdrop-blur-md",
}: {
  image: ImageSource;
  quote: string;
  author: string;
  role?: string;
  quoteIconColor?: string;
  boxBgClass?: string;
}) {
  return (
    <section className="bg-white py-0 lg:py-20 text-black overflow-hidden">
      <Container className="uncontainer-mobile overflow-hidden max-md:px-0">
        <div className="relative flex flex-col lg:block">
          <div data-aos="fade-up" className="w-full overflow-hidden lg:w-[65%]">
            <ResponsiveImage
              src={image}
              alt={author}
              className="h-72 w-full object-cover sm:h-96 lg:h-[485px] rounded-sm"
            />
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className={`flex flex-col justify-between ${boxBgClass} p-8 sm:mx-6 sm:p-10 lg:absolute lg:top-1/2 lg:right-0 lg:mx-0 lg:w-[50%] lg:-translate-y-1/2 lg:p-12 shadow-sm max-lg:border-none border border-white/80`}
          >
            <span
              className="font-serif text-5xl leading-none lg:text-6xl mb-2 text-white lg:text-[var(--quote-icon-color)]"
              style={{ "--quote-icon-color": quoteIconColor } as React.CSSProperties}
            >
              <svg
                width="48"
                height="36"
                viewBox="0 0 56 42"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 42L1.56037 31.5868C2.19608 27.3636 3.3808 23.343 5.11455 19.5248C6.90609 15.7066 9.10217 12.1488 11.7028 8.85124C14.3612 5.55372 17.3375 2.60331 20.6316 0L29.5604 6.59504C26.613 10.2975 24.0413 14.1736 21.8452 18.2231C19.7069 22.2149 18.2043 26.5537 17.3375 31.2397L15.4303 42H0ZM26.4396 42L28 31.5868C28.6357 27.3636 29.8204 23.343 31.5542 19.5248C33.3457 15.7066 35.5418 12.1488 38.1424 8.85124C40.8008 5.55372 43.7771 2.60331 47.0712 0L56 6.59504C53.0526 10.2975 50.4809 14.1736 48.2848 18.2231C46.1465 22.2149 44.644 26.5537 43.7771 31.2397L41.87 42H26.4396Z"
                />
              </svg>
            </span>

            <p className="font-sans text-xl italic leading-relaxed text-black sm:text-2xl lg:text-[28px] font-normal my-3">
              {quote}
            </p>

            <p className="font-sans text-base text-black lg:text-xl mt-2 font-normal">
              - {author}
              {role ? `, ${role}` : ""}
            </p>

            <span
              className="self-end font-serif text-5xl leading-none lg:text-6xl mt-2 text-white lg:text-[var(--quote-icon-color)]"
              style={{ "--quote-icon-color": quoteIconColor } as React.CSSProperties}
            >
              <svg
                width="48"
                height="36"
                viewBox="0 0 56 42"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.053 0L28.3058 10.8635C27.6651 15.0265 26.442 18.9898 24.6365 22.7536C22.8892 26.5173 20.676 30.0244 17.9969 33.2749C15.376 36.5255 12.4347 39.4338 9.17317 42L0 35.499C3.0286 31.8493 5.62039 28.057 7.77535 24.1222C9.98856 20.1303 11.532 15.8248 12.4056 11.2057L14.415 0H30.053ZM56 0L54.2527 10.8635C53.6121 15.0265 52.389 18.9898 50.5835 22.7536C48.8362 26.5173 46.623 30.0244 43.9438 33.2749C41.3229 36.5255 38.3817 39.4338 35.1201 42L25.947 35.499C28.9756 31.8493 31.5673 28.057 33.7223 24.1222C35.9355 20.1303 37.4789 15.8248 38.3526 11.2057L40.3619 0H56Z"
                />
              </svg>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
