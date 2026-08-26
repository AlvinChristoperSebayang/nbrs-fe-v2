"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

const STORAGE_KEY = "projects-scroll-y";

export function PreserveScrollOnNavigate({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  // Clear any stale saved scroll on initial mount (fresh visit to /projects)
  useEffect(() => {
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved === null) return;

    requestAnimationFrame(() => {
      window.scrollTo(0, Number(saved));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  return (
    <div
      onClickCapture={(e) => {
        const target = e.target as HTMLElement | null;
        // If clicking a link to leave the page, clear saved scroll
        if (target?.closest("a")) {
          sessionStorage.removeItem(STORAGE_KEY);
          return;
        }

        // If clicking filter buttons, save current scroll position
        if (target?.closest("button")) {
          sessionStorage.setItem(STORAGE_KEY, String(window.scrollY));
        }
      }}
    >
      {children}
    </div>
  );
}

