"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    let frame: number | undefined;

    const timer = setTimeout(() => {
      void import("aos")
        .then(({ default: AOS }) => {
          // Initialize AOS for the current page route
          AOS.init({
            duration: 700,
            easing: "ease-out",
            once: true,
            offset: 40,
          });

          // Trigger AOS refresh after Next.js renders the new page layout
          frame = requestAnimationFrame(() => {
            AOS.refreshHard();
          });
        })
        .catch((error: unknown) => {
          console.warn("Unable to initialize AOS:", error);
        });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
