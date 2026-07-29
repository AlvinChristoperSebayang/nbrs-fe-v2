import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { Sector } from "@/lib/types";

export function SectorsSection({ sectors }: { sectors: Sector[] }) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-[30px] lg:gap-y-[35px]">
          <div data-aos="fade-up" className="flex flex-col justify-center">
            <h2 className="font-heading text-4xl leading-[1.05] uppercase text-black sm:text-[40px] lg:text-[70px] border-b-4 border-black">
              Designing spaces bespoke to{" "}
              <span className="">
                their needs
              </span>
            </h2>
          </div>

          {sectors.map((sector, index) => (
            <Link
              key={sector.label}
              href={sector.href}
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
              className="group relative block aspect-[5/4] overflow-hidden rounded-[5px] lg:aspect-[37/30]"
            >
              <div
                className={`absolute  top-[-100%] group-hover:top-0  duration-300 z-10 opacity-100  w-full h-full`}
                style={{ backgroundColor: sector.hoverColor }}
              >
                <div className="relative h-full w-full flex flex-col items-start justify-between gap-4 p-5">
                  <div className="flex flex-col gap-2 text-left">
                    <span className="font-heading text-lg lg:text-[34px] uppercase text-black">
                      {sector.label}
                    </span>
                    <span className="font-heading text-sm lg:text-[18px] uppercase text-black">
                      {sector.description}
                    </span>
                  </div>
                  <svg
                    className="self-end"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5349 11.0647V13.936L0 13.936L2.51019e-07 11.0647L21.5349 11.0647Z"
                      fill="black"
                    />
                    <path
                      d="M23.565 12.5003L11.0647 25.0007L9.03456 22.9705L19.5048 12.5003L9.03456 2.03011L11.0647 0L23.565 12.5003Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
              <img
                src={sector.image}
                alt={sector.label}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 z-[5]"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5 z-[6]">
                <span className="font-heading text-lg lg:text-[34px] uppercase text-white">
                  {sector.label}
                </span>
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.5349 11.0647V13.936L0 13.936L2.51019e-07 11.0647L21.5349 11.0647Z"
                    fill="white"
                  />
                  <path
                    d="M23.565 12.5003L11.0647 25.0007L9.03456 22.9705L19.5048 12.5003L9.03456 2.03011L11.0647 0L23.565 12.5003Z"
                    fill="white"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
