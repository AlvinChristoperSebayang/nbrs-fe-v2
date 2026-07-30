"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export type SubMenuItem = {
  label: string;
  href: string;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
  subItems?: SubMenuItem[];
};

export const NAV_STRUCTURE: NavItem[] = [
  {
    id: "purpose",
    label: "Purpose",
    href: "/about",
    subItems: [
      { label: "About NBRS", href: "/about" },
      { label: "Sustainability", href: "/social-sustainability" },
      { label: "Insights", href: "/research" },
      { label: "Social responsibility", href: "/design-approach" },
    ],
  },
  {
    id: "people",
    label: "People",
    href: "/people",
    subItems: [
      { label: "Our leaders", href: "/people/team" },
      { label: "Culture", href: "/people/culture" },
      { label: "Careers", href: "/people/careers" },
      { label: "Envision student partnerships", href: "/people/envision-student-program" },
    ],
  },
  {
    id: "sectors",
    label: "Sectors",
    href: "/sectors",
    subItems: [
      { label: "Education", href: "/sectors/education" },
      { label: "Heritage", href: "/sectors/heritage" },
      { label: "Wellness", href: "/sectors/wellness" },
      { label: "Community", href: "/sectors/community" },
      { label: "Secure spaces", href: "/sectors/secure-spaces" },
    ],
  },
  {
    id: "practices",
    label: "Practices",
    href: "/practices",
    subItems: [
      { label: "Architecture", href: "/practices/architecture" },
      { label: "Landscape architecture", href: "/practices/landscape-architecture" },
      { label: "Interior design", href: "/practices/interior-design" },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
  },
  {
    id: "news",
    label: "News",
    href: "/news",
  },
  {
    id: "contact",
    label: "Contact us",
    href: "/contact",
  },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    function update() {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      setScrolled(currentY > 10);
      setHidden((prev) => {
        if (currentY <= 120) return false;
        if (Math.abs(delta) < 5) return prev;
        return delta > 0;
      });

      lastScrollY.current = currentY;
      ticking = false;
    }

    function handleScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = scrolled || open;

  const toggleSubmenu = (id: string) => {
    setActiveSubmenu((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 h-fit w-full will-change-[translate] transition-[translate,background-color] duration-300 ease-out dark:border-white/[.145] ${
          isDark ? "scrolled" : ""
        } ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
      >
        <Container className="py-4">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="relative z-50 font-semibold text-black dark:text-zinc-50"
            >
              <img
                src={isDark ? "/images/logo/logo-black.svg" : "/images/logo/logo-white.svg"}
                alt="NBRS Architecture Logo"
                width={90}
                height={33}
                className="mr-2 inline-block"
              />
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
              className={`relative z-50 flex h-9 w-9 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full border p-1 ${
                open ? "border-black" : "border-transparent"
              }`}
            >
              <span
                className={`h-0.5 w-6 transition-transform duration-300 ${
                  open ? "translate-y-2 rotate-45" : ""
                } ${isDark ? "bg-black" : "bg-white"}`}
              />
              <span
                className={`h-0.5 w-6 transition-opacity duration-300 ${
                  open ? "opacity-0" : ""
                } ${isDark ? "bg-black" : "bg-white"}`}
              />
              <span
                className={`h-0.5 w-6 transition-transform duration-300 ${
                  open ? "-translate-y-2 -rotate-45" : ""
                } ${isDark ? "bg-black" : "bg-white"}`}
              />
            </button>
          </nav>
        </Container>
      </header>

      {/* Full-screen Overlay Menu */}
      <div
        aria-hidden={!open}
        style={{
          clipPath: open
            ? "circle(150% at calc(100% - 2.5rem) 2.5rem)"
            : "circle(0% at calc(100% - 2.5rem) 2.5rem)",
        }}
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-white overflow-y-auto transition-[clip-path] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] py-20 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <Container>
          <ul className="flex flex-col gap-3 max-w-4xl mx-auto">
            {NAV_STRUCTURE.map((item, index) => {
              const hasSubmenu = item.subItems && item.subItems.length > 0;
              const isSubmenuOpen = activeSubmenu === item.id;

              return (
                <li
                  key={item.id}
                  className={`overflow-hidden transition-all duration-500 ease-out border-b border-black/10 pb-2 ${
                    open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: open ? `${120 + index * 70}ms` : "0ms",
                  }}
                >
                  <div className="flex items-center justify-between group">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 sm:gap-6 py-2 flex-grow"
                    >
                      <span className="font-heading text-xs sm:text-sm text-black/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-heading text-3xl sm:text-5xl lg:text-6xl uppercase text-black font-bold tracking-wide transition-transform duration-300 group-hover:translate-x-3">
                        {item.label}
                      </span>
                    </Link>

                    {/* Submenu Expand Button */}
                    {hasSubmenu && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSubmenu(item.id);
                        }}
                        className="p-2 text-black hover:text-rose-500 transition-colors cursor-pointer"
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transition-transform duration-300 ease-out ${
                            isSubmenuOpen ? "rotate-180 text-rose-500" : ""
                          }`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Expandable Submenu Items Grid */}
                  {hasSubmenu && (
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        isSubmenuOpen
                          ? "grid-rows-[1fr] opacity-100 pt-3 pb-3"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pl-8 sm:pl-14 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          {item.subItems!.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              onClick={() => setOpen(false)}
                              className="group/sub flex items-center gap-2 py-1.5 font-sans text-base sm:text-lg text-zinc-700 hover:text-black font-medium transition-colors"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-rose-300 transition-transform duration-300 group-hover/sub:scale-150" />
                              <span className="transition-transform duration-300 group-hover/sub:translate-x-1.5">
                                {subItem.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </div>
    </>
  );
}
