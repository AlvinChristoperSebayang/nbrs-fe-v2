"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let frame: number | undefined;
    let timeout: number | undefined;
    let cleanup = () => {};

    // Load AOS after React has hydrated the route. Keeping this import out of
    // the root client chunk prevents AOS from blocking the page's other client
    // components if the library fails to load during local development.
    void import("aos")
      .then(({ default: AOS }) => {
        if (cancelled) return;

        const refresh = () => {
          AOS.refreshHard();
          window.dispatchEvent(new Event("scroll"));
        };

        AOS.init({
          duration: 700,
          easing: "ease-out",
          once: true,
          offset: 80,
        });

        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(refresh);
        });
        timeout = window.setTimeout(refresh, 300);
        window.addEventListener("pageshow", refresh);
        cleanup = () => window.removeEventListener("pageshow", refresh);
      })
      .catch((error: unknown) => {
        console.error("Unable to initialize AOS:", error);
      });

    return () => {
      cancelled = true;
      if (frame) cancelAnimationFrame(frame);
      if (timeout) window.clearTimeout(timeout);
      cleanup();
    };
  }, [pathname]);

  return null;
}
