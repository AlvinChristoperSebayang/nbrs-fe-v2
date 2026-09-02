"use client";

import { useState, useEffect, useRef } from "react";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

type MasonryGalleryProps = {
  images: ImageSource[];
  altPrefix?: string;
  className?: string;
};

export function MasonryGallery({
  images,
  altPrefix = "Gallery image",
  className = "",
}: MasonryGalleryProps) {
  const [aspectRatios, setAspectRatios] = useState<number[]>(() =>
    images.map((img) => {
      if (typeof img === "object" && img.dimensions) {
        const d = img.dimensions.desktop || img.dimensions.tablet || img.dimensions.mobile;
        if (d && d.width > 0 && d.height > 0) {
          return d.height / d.width;
        }
      }
      return 1;
    })
  );

  // Distribute items across 2 columns greedily based on cumulative aspect ratios
  const columns: { image: ImageSource; originalIndex: number }[][] = [[], []];
  const colHeights = [0, 0];

  images.forEach((img, idx) => {
    const ratio = aspectRatios[idx] || 1;
    const targetCol = colHeights[0] <= colHeights[1] ? 0 : 1;
    columns[targetCol].push({ image: img, originalIndex: idx });
    colHeights[targetCol] += ratio;
  });

  const handleImageLoad = (idx: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
      const actualRatio = img.naturalHeight / img.naturalWidth;
      setAspectRatios((prev) => {
        if (Math.abs((prev[idx] || 1) - actualRatio) < 0.05) return prev;
        const next = [...prev];
        next[idx] = actualRatio;
        return next;
      });
    }
  };

  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 items-start ${className}`}>
      {columns.map((colItems, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-4">
          {colItems.map(({ image, originalIndex }) => (
            <div key={originalIndex} className="w-full overflow-hidden rounded-[3px]">
              <ResponsiveImage
                src={image}
                alt={`${altPrefix} ${originalIndex + 1}`}
                title={`${altPrefix} ${originalIndex + 1}`}
                onLoad={(e) => handleImageLoad(originalIndex, e)}
                className="h-auto w-full rounded-[3px] object-cover object-center"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
