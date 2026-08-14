"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function resetAosClasses() {
  document.querySelectorAll<HTMLElement>("[data-aos]").forEach((element) => {
    element.classList.remove("aos-init", "aos-animate");
  });
}

export function AosInit() {
  const pathname = usePathname();
  const initializedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let frame: number | undefined;

    void import("aos")
      .then(({ default: AOS }) => {
        if (cancelled) return;

        if (!initializedRef.current) {
          AOS.init({
            duration: 700,
            easing: "ease-out",
            once: true,
            offset: 40,
            disableMutationObserver: true,
            disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          });
          initializedRef.current = true;
        }

        // Refresh after React has committed the current route's DOM.
        frame = window.requestAnimationFrame(() => {
          if (!cancelled) AOS.refreshHard();
        });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          console.warn("Unable to initialize AOS:", error);
        }
      });

    return () => {
      cancelled = true;
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      resetAosClasses();
    };
  }, [pathname]);

  return null;
}
