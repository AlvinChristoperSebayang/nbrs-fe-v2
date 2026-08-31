"use client";

import { useState } from "react";
import type { AwardItem } from "@/lib/awards-data";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

export type AwardCardProps = {
  item: AwardItem;
};

export function AwardCard({ item }: AwardCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverBg = "#DADBEF";

  return (
    <div
      className="flex flex-col w-full h-full overflow-hidden group cursor-pointer rounded-[3px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image */}
      <div className="relative aspect-[370/300] w-full overflow-hidden bg-zinc-100">
        <ResponsiveImage
          src={item.image}
          alt={item.awardTitle}
          title={item.awardTitle}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Bottom Info Box */}
      <div
        className="flex flex-1 w-full flex-col justify-start p-4 sm:p-5 lg:p-4.5 xl:p-6 transition-colors duration-300 border-black min-h-[160px] lg:min-h-[170px] xl:min-h-[240px]"
        style={{
          backgroundColor: isHovered ? hoverBg : "#000000",
          color: isHovered ? "#000000" : "#ffffff",
        }}
      >
        {/* Year */}
        <span
          className="text-xs lg:text-[12px] xl:text-base font-light transition-colors duration-300"
          style={{ color: isHovered ? "#000000" : "#ffffff" }}
        >
          {item.year}
        </span>

        {/* Project Name */}
        <span
          className="mt-1 text-sm lg:text-[13px] xl:text-base font-bold tracking-tight transition-colors duration-300"
          style={{
            color: isHovered ? "#000000" : (item.projectCategoryColor ?? "#DADBEF"),
          }}
        >
          {item.projectName}
        </span>

        {/* Award Title & Commendation */}
        <div className="mt-2 lg:mt-2.5 xl:mt-3">
          <p
            className="font-sans text-base sm:text-lg lg:text-base xl:text-xl font-normal leading-snug lg:leading-[1.25] xl:leading-snug transition-colors duration-300"
            style={{ color: isHovered ? "#000000" : "#ffffff" }}
          >
            {item.awardTitle}
          </p>
          {item.commendation && (
            <span
              className="mt-1 lg:mt-1.5 block font-sans text-xs lg:text-[12px] xl:text-base font-normal italic transition-colors duration-300"
              style={{ color: isHovered ? "#000000" : "#C9E5D2" }}
            >
              {item.commendation}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
