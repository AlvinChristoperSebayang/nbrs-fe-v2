"use client";

import { useLayoutEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

const STORAGE_KEY = "projects-scroll-y";

export function PreserveScrollOnNavigate({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

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
      onClickCapture={() => {
        sessionStorage.setItem(STORAGE_KEY, String(window.scrollY));
      }}
    >
      {children}
    </div>
  );
}
