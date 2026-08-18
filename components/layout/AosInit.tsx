"use client";

import { useEffect, useRef } from "react";

export function AosInit() {
  const initializedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let firstFrame: number | undefined;
    let secondFrame: number | undefined;

    const initialize = () => {
      void import("aos")
        .then(({ default: AOS }) => {
          if (cancelled || initializedRef.current) return;

          // Start after the initial page has hydrated. AOS mutates data-aos
          // elements, so doing this during hydration causes React mismatches.
          firstFrame = window.requestAnimationFrame(() => {
            secondFrame = window.requestAnimationFrame(() => {
              if (cancelled || initializedRef.current) return;

              AOS.init({
                duration: 700,
                easing: "ease-out",
                once: true,
                offset: 40,
                // Keep AOS' observer enabled so client-side route content and
                // filtered lists are registered after React has rendered them.
                disable: () =>
                  window.matchMedia("(prefers-reduced-motion: reduce)").matches,
              });
              initializedRef.current = true;
            });
          });
        })
        .catch((error: unknown) => {
          if (!cancelled) console.warn("Unable to initialize AOS:", error);
        });
    };

    if (document.readyState === "complete") {
      initialize();
    } else {
      window.addEventListener("load", initialize, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", initialize);
      if (firstFrame !== undefined) window.cancelAnimationFrame(firstFrame);
      if (secondFrame !== undefined) window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  return null;
}
