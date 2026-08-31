import type { AwardItem } from "@/lib/awards-data";
import { AwardCard } from "./AwardCard";

export type AwardsSectionProps = {
  heading: string;
  description: string;
  items: AwardItem[];
};

export function AwardsSection({ heading, description, items }: AwardsSectionProps) {
  return (
    <div className="flex flex-col gap-8 lg:gap-10 xl:gap-12 bg-white text-black">
      {/* Header section */}
      <div data-aos="fade-up" className="flex flex-col gap-3 lg:gap-4 max-w-xl">
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-[34px] xl:text-[40px] uppercase leading-none text-black max-w-[270px]">
          {heading}
        </h2>
        <p className="text-sm sm:text-base lg:text-[15px] xl:text-base text-zinc-800 leading-normal max-w-[423px]">
          {description}
        </p>
      </div>

      {/* Grid of Award Cards */}
      <div data-aos="fade-up" data-aos-delay="150" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:gap-8 items-stretch">
        {items.map((item) => (
          <AwardCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
