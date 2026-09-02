"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function AosInit() {
  const initializedRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    const initialize = async () => {
      try {
        const { default: AOS } = await import("aos");
        if (cancelled) return;

        if (!initializedRef.current) {
          AOS.init({
            duration: 700,
            easing: "ease-out",
            once: true,
            offset: 40,
            disable: () =>
              window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          });
          initializedRef.current = true;
        } else {
          AOS.refresh();
        }
      } catch (error) {
        if (!cancelled) console.warn("Unable to initialize AOS:", error);
      }
    };

    // Run after React has fully completed hydration for the current page
    let timer: NodeJS.Timeout;
    const raf = requestAnimationFrame(() => {
      timer = setTimeout(() => {
        void initialize();
      }, 200);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
