import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { NewsItem } from "@/lib/types";

export function LatestNews({ items }: { items: NewsItem[] }) {
  const [featured, ...secondary] = items;

  return (
    <section className="bg-[#EDEDED] py-16 lg:py-24">
      <Container>
        <div className="mb-6 flex items-center justify-between">
          <span className="font-heading text-lg uppercase text-black">
            Features
          </span>
          <Link
            href="/blog"
            className="group items-center gap-2 font-heading text-lg uppercase text-black lg:flex hidden"
          >
            View all latest news
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
        </div>

        <div className="relative w-full">
          <div className="absolute w-full h-full overflow-hidden ">
            <img
              src={featured.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 items-stretch sm:inset-x-0 py-20 gap-10 px-4  lg:gap-20 lg:py-40 lg:px-4">
            <Link
              href={featured.href}
              className="group flex flex-col lg:gap-20 justify-between gap-8 bg-black/50 p-5 backdrop-blur-[5px] border-b-[5px] border-white"
            >
              <h3 className="font-heading text-2xl leading-tight text-white sm:text-3xl lg:text-[36px] uppercase lg:max-w-[231px]">
                {featured.title}
              </h3>
              <div className="flex flex-col gap-4">              
            <svg className="self-end" width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.0186 10.6218V13.3782L0 13.3782L2.45001e-07 10.6218L21.0186 10.6218Z" fill="white"/>
              <path d="M23 12L10.7994 24L8.81794 22.0511L19.0371 12L8.81794 1.94886L10.7994 0L23 12Z" fill="white"/>
            </svg>

              </div>
               
            </Link>

            {secondary.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex flex-1 items-start bg-white/70  backdrop-blur-[0px] p-5"
              >
                <h3 className="font-heading text-lg uppercase leading-tight text-black sm:text-lg lg:max-w-[160px]">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
         <Link
            href="/blog"
            className="group flex items-center gap-2 font-heading text-lg uppercase text-black lg:hidden justify-center mt-8"
          >
            View all latest news
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
      </Container>
    </section>
  );
}
