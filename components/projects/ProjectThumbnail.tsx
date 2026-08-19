"use client";

import { useState } from "react";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export function ProjectThumbnail({
  src,
  alt,
}: {
  src: ImageSource;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <ResponsiveImage
      src={src}
      alt={alt}
      title={alt}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}
