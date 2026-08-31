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
      className="flex flex-col w-full h-[540px] overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image */}
      <div className="relative h-[300px] w-full overflow-hidden bg-zinc-100">
        <ResponsiveImage
          src={item.image}
          alt={item.awardTitle}
          title={item.awardTitle}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Bottom Info Box */}
      <div
        className="flex h-[240px] w-full flex-col justify-start p-6 transition-colors duration-300 border-black"
        style={{
          backgroundColor: isHovered ? hoverBg : "#000000",
          color: isHovered ? "#000000" : "#ffffff",
        }}
      >
        {/* Year */}
        <span
          className="text-base lg:text-sm xl:text-base font-light transition-colors duration-300"
          style={{ color: isHovered ? "#000000" : "#ffffff" }}
        >
          {item.year}
        </span>

        {/* Project Name */}
        <span
          className="mt-1 text-base lg:text-sm xl:text-base font-bold transition-colors duration-300"
          style={{
            color: isHovered ? "#000000" : (item.projectCategoryColor ?? "#DADBEF"),
          }}
        >
          {item.projectName}
        </span>

        {/* Award Title & Commendation */}
        <div className="mt-3">
          <p
            className="font-sans text-xl lg:text-lg xl:text-xl font-normal leading-snug transition-colors duration-300"
            style={{ color: isHovered ? "#000000" : "#ffffff" }}
          >
            {item.awardTitle}
          </p>
          {item.commendation && (
            <span
              className="mt-1.5 block font-sans text-base lg:text-sm xl:text-base font-normal italic transition-colors duration-300"
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
