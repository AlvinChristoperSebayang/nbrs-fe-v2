import type { AwardItem } from "@/lib/awards-data";
import { AwardCard } from "./AwardCard";

export type AwardsSectionProps = {
  heading: string;
  description: string;
  items: AwardItem[];
};

export function AwardsSection({ heading, description, items }: AwardsSectionProps) {
  return (
    <div className="flex flex-col gap-12 bg-white text-black">
      {/* Header section */}
      <div data-aos="fade-up" className="flex flex-col gap-4 max-w-xl">
        <h2 className="font-heading text-4xl uppercase leading-none text-black lg:text-[40px] max-w-[270px]">
          {heading}
        </h2>
        <p className="text-base text-zinc-800 leading-normal max-w-[423px]">
          {description}
        </p>
      </div>

      {/* Grid of Award Cards */}
      <div
        data-aos="fade-up"
        data-aos-delay="150"
        className="grid grid-cols-1 gap-4 lg:gap-6 xl:gap-8 min-[768px]:grid-cols-2 min-[1020px]:grid-cols-3 "
      >
        {items.map((item) => (
          <AwardCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
