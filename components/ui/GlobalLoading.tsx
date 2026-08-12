"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { FEATURE_FLAGS } from "@/lib/config";

export function GlobalLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Reset loading state when pathname or query parameters change
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  // Intercept click events on anchor tags to trigger immediate visual loading feedback
  useEffect(() => {
    if (!FEATURE_FLAGS.ENABLE_GLOBAL_LOADING) return;

    const handleAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");

      if (!anchor) return;
      if (anchor.getAttribute("data-no-loading") === "true") return;

      const href = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");

      // Check if it's an internal link navigation
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("#") &&
        targetAttr !== "_blank" &&
        href !== pathname
      ) {
        startTransition(() => {
          setIsLoading(true);
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [pathname]);

  if (!FEATURE_FLAGS.ENABLE_GLOBAL_LOADING) {
    return null;
  }

  const active = isLoading || isPending;

  if (!active) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[99999] pointer-events-none">
      <div className="h-1 w-full bg-zinc-200 overflow-hidden">
        <div className="h-full bg-black animate-[loadingBar_1.5s_ease-in-out_infinite]" />
      </div>

      {/* <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-xs font-sans font-medium text-white shadow-lg backdrop-blur-sm animate-fade-in">
        <svg
          className="h-3.5 w-3.5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span>Loading content...</span>
      </div> */}
    </div>
  );
}
