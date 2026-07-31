import { DUMMY_AWARDS } from "@/lib/awards-data";
import { AwardCard } from "./AwardCard";

export function AwardsSection() {
  return (
    <div className="flex flex-col gap-12 bg-white text-black">
      {/* Header section */}
      <div data-aos="fade-up" className="flex flex-col gap-4 max-w-xl">
        <h2 className="font-heading text-4xl uppercase leading-none text-black lg:text-[40px] max-w-[270px]">
          RECOGNISING WHAT MATTERS
        </h2>
        <p className="text-base text-zinc-800 leading-normal max-w-[423px]">
          Our awards celebrate projects defined not only by form but by function,
          purpose and measurable community benefit, each shaped by designing for
          people and place.
        </p>
      </div>

      {/* Grid of Award Cards */}
      <div data-aos="fade-up" data-aos-delay="150" className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {DUMMY_AWARDS.map((item) => (
          <AwardCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
