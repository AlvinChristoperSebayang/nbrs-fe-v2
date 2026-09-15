"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
    label: "PURPOSE",
    href: "/purpose/about-us",
    subItems: [
      { label: "About NBRS", href: "/purpose/about-us" },
      { label: "Design Approach", href: "/purpose/insights/design-approach" },
      { label: "Research", href: "/purpose/insights/research" },
      { label: "Awards", href: "/purpose/insights/awards" },
      { label: "Sustainability", href: "/purpose/sustainability" },
      { label: "Social Responsibility", href: "/purpose/social-responsibility" },
      { label: "Reflect Reconciliation Action Plan", href: "/rap" },
    ],
  },
  {
    id: "people",
    label: "PEOPLE",
    href: "/people",
    subItems: [
      { label: "Our Leaders", href: "/people/team" },
      { label: "Culture", href: "/people/culture" },
      { label: "Careers", href: "/people/careers" },
      { label: "Envision Student Partnerships", href: "/people/envision-student-partnership-program" },
    ],
  },
  {
    id: "sectors",
    label: "SECTORS",
    href: "/sector",
    subItems: [
      { label: "Education", href: "/sector/education" },
      { label: "Heritage", href: "/sector/heritage" },
      { label: "Wellness", href: "/sector/wellness" },
      { label: "Community", href: "/sector/community" },
      { label: "Secure Spaces", href: "/sector/secure-spaces" },
    ],
  },
  {
    id: "practices",
    label: "PRACTICES",
    href: "/practices",
    subItems: [
      { label: "Architecture", href: "/practices/architecture" },
      { label: "Landscape Architecture", href: "/practices/landscape-architects" },
      { label: "Interior Design", href: "/practices/interior-design" },
    ],
  },
  {
    id: "projects",
    label: "PROJECTS",
    href: "/projects",
  },
  {
    id: "news",
    label: "NEWS",
    href: "/news",
  },
  {
    id: "contact",
    label: "CONTACT US",
    href: "/contact",
  },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("purpose");
  const lastScrollY = useRef(0);

  const isResearchDetail = Boolean(
    pathname &&
    ((pathname.startsWith("/research/") &&
      pathname.replace(/\/$/, "") !== "/research") ||
      (pathname.startsWith("/purpose/insights/research/") &&
        pathname.replace(/\/$/, "") !== "/purpose/insights/research"))
  );

  const isContactPage = Boolean(
    pathname &&
    (pathname === "/contact" || pathname.startsWith("/contact/"))
  );

  const isNineDayFortnightPage = Boolean(
    pathname &&
    (pathname === "/9-day-fortnight" || pathname.startsWith("/9-day-fortnight/"))
  );

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

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const isScrolledHeader = scrolled && !open;
  const useDarkElements =
    (scrolled || isResearchDetail || isContactPage || isNineDayFortnightPage) &&
    !open;

  const currentActiveItem = NAV_STRUCTURE.find(
    (item) => item.id === activeCategory
  );

  return (
    <>
      {/* MAIN HEADER BAR */}
      <header
        className={`fixed top-0 left-0 z-50 h-fit w-full transition-[translate,background-color] duration-300 ease-out ${
          isScrolledHeader ? "scrolled" : ""
        } ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
      >
        <Container className="py-5">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              aria-label="NBRS Home"
              className="relative z-50 focus:outline-none block h-9 w-[100px]"
            >
              <img
                src="/images/logo/logo-white-new.png"
                alt="NBRS Logo"
                width={100}
                height={36}
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
                  useDarkElements ? "opacity-0" : "opacity-100"
                }`}
              />
              <img
                src="/images/logo/logo-blue-new.png"
                alt="NBRS Logo"
                width={100}
                height={36}
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
                  useDarkElements ? "opacity-100" : "opacity-0"
                }`}
              />
            </Link>

            <button
              type="button"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="mobile-nav-drawer"
              onClick={() => setOpen((prev) => !prev)}
              className="relative z-50 flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-[6px] rounded-full p-2 active:scale-90"
            >
              {/* Top Line */}
              <span
                className={`h-[2px] w-6 rounded-full origin-center ${
                  open
                    ? "translate-y-[8px] rotate-45 bg-white"
                    : useDarkElements
                    ? "bg-black"
                    : "bg-white"
                }`}
              />

              {/* Middle Line */}
              <span
                className={`h-[2px] rounded-full origin-right ${
                  open
                    ? "w-0 opacity-0 scale-x-0 bg-white"
                    : useDarkElements
                    ? "w-5 opacity-100 scale-x-100 bg-black"
                    : "w-5 opacity-100 scale-x-100 bg-white"
                }`}
              />

              {/* Bottom Line */}
              <span
                className={`h-[2px] w-6 rounded-full origin-center ${
                  open
                    ? "-translate-y-[8px] -rotate-45 bg-white"
                    : useDarkElements
                    ? "bg-black"
                    : "bg-white"
                }`}
              />
            </button>
          </nav>
        </Container>
      </header>

      {/* FULL-SCREEN OVERLAY MENU */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal={open}
        aria-label="Site Navigation"
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={`fixed inset-0 z-40 bg-[#131722] text-white overflow-y-auto ${
          open ? "block pointer-events-auto" : "hidden pointer-events-none"
        }`}
      >
        <Container className="h-full flex flex-col justify-start pt-24 pb-12">
          {/* Menu Content Grid: 2 Columns Side-by-Side */}
          <div className="grid grid-cols-12 gap-3 sm:gap-8 md:gap-12 items-start pt-17">
            {/* Left Column: Main Categories (Menu font 26px on mobile) */}
            <div className="col-span-6 flex flex-col items-start gap-13 sm:gap-14">
              {NAV_STRUCTURE.map((item) => {
                const isActive = activeCategory === item.id;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setActiveCategory(item.id)}
                    className="w-fit cursor-pointer group flex flex-col"
                  >
                    <Link
                      href={item.href}
                      aria-label={item.label}
                      data-no-loading={
                        item.subItems && item.subItems.length > 0 && activeCategory !== item.id
                          ? "true"
                          : undefined
                      }
                      onClick={(e) => {
                        const hasSubItems = item.subItems && item.subItems.length > 0;
                        if (hasSubItems && activeCategory !== item.id) {
                          // 1st click: open/expand submenu without navigating or closing menu
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveCategory(item.id);
                        } else {
                          // 2nd click (or item without sub-items): navigate to parent href and close menu
                          setOpen(false);
                        }
                      }}
                      className={`font-heading text-[26px] sm:text-3xl lg:text-[38px] uppercase tracking-wide leading-tight transition-colors duration-200 ${
                        isActive
                          ? "text-white font-bold opacity-100"
                          : "text-white/35 font-semibold hover:text-white/70"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Submenu Links */}
            <div className="col-span-6 flex flex-col gap-4 pt-1 sm:pt-2 pl-2 sm:pl-8 lg:pl-12 justify-start">
              {currentActiveItem?.subItems && (
                <div key={activeCategory} className="flex flex-col gap-3.5">
                  {currentActiveItem.subItems.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      aria-label={sub.label}
                      onClick={() => setOpen(false)}
                      className="font-sans text-[14px] sm:text-base lg:text-lg text-white/90 hover:text-white py-0.5 inline-block hover:translate-x-1 transition-transform duration-200 leading-relaxed"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
