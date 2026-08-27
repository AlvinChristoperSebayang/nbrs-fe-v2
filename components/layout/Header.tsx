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
    href: "/about",
    subItems: [
      { label: "About NBRS", href: "/about" },
      { label: "Design Approach", href: "/design-approach" },
      { label: "Research", href: "/research" },
      { label: "Awards", href: "/awards" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Social Responsibility", href: "/social-responsibility" },
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
      { label: "Envision Student Partnerships", href: "/people/envision-student-program" },
    ],
  },
  {
    id: "sectors",
    label: "SECTORS",
    href: "/sectors",
    subItems: [
      { label: "Education", href: "/sectors/education" },
      { label: "Heritage", href: "/sectors/heritage" },
      { label: "Wellness", href: "/sectors/wellness" },
      { label: "Community", href: "/sectors/community" },
      { label: "Secure Spaces", href: "/sectors/secure-spaces" },
    ],
  },
  {
    id: "practices",
    label: "PRACTICES",
    href: "/practices",
    subItems: [
      { label: "Architecture", href: "/practices/architecture" },
      { label: "Landscape Architecture", href: "/practices/landscape-architecture" },
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
    pathname.startsWith("/research/") &&
    pathname.replace(/\/$/, "") !== "/research"
  );

  const isContactPage = Boolean(
    pathname &&
    (pathname === "/contact" || pathname.startsWith("/contact/"))
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
  const useDarkElements = (scrolled || isResearchDetail || isContactPage) && !open;

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
              title="NBRS Home"
              className="relative z-50 focus:outline-none block h-9 w-[100px]"
            >
              <img
                src="/images/logo/logo-white-2.svg"
                alt="NBRS Logo"
                title="NBRS Logo"
                width={100}
                height={36}
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
                  useDarkElements ? "opacity-0" : "opacity-100"
                }`}
              />
              <img
                src="/images/logo/logo-black-2.svg"
                alt="NBRS Logo"
                title="NBRS Logo"
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
              className={`relative z-50 flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-[6px] rounded-full p-2 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] active:scale-90 ${
                open ? "rotate-180" : "rotate-0 hover:scale-105"
              }`}
            >
              {/* Top Line */}
              <span
                className={`h-[2px] w-6 rounded-full transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] origin-center ${
                  open
                    ? "translate-y-[8px] rotate-45 bg-white"
                    : useDarkElements
                    ? "bg-black"
                    : "bg-white"
                }`}
              />

              {/* Middle Line */}
              <span
                className={`h-[2px] rounded-full transition-all duration-400 ease-in-out origin-right ${
                  open
                    ? "w-0 opacity-0 scale-x-0 bg-white"
                    : useDarkElements
                    ? "w-5 opacity-100 scale-x-100 bg-black"
                    : "w-5 opacity-100 scale-x-100 bg-white"
                }`}
              />

              {/* Bottom Line */}
              <span
                className={`h-[2px] w-6 rounded-full transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] origin-center ${
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
        style={{
          clipPath: open
            ? "circle(150% at calc(100% - 2.5rem) 2.5rem)"
            : "circle(0% at calc(100% - 2.5rem) 2.5rem)",
        }}
        className={`fixed inset-0 z-40 bg-[#131722] text-white transition-[clip-path] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] will-change-[clip-path] transform-gpu overflow-y-auto ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <Container className="h-full flex flex-col justify-start pt-24 pb-12">
          {/* Menu Content Grid: 2 Columns Side-by-Side */}
          <div className="grid grid-cols-12 gap-3 sm:gap-8 md:gap-12 items-start pt-17">
            {/* Left Column: Main Categories (Menu font 26px on mobile) */}
            <div className="col-span-6 flex flex-col items-start gap-13 sm:gap-14">
              {NAV_STRUCTURE.map((item, index) => {
                const isActive = activeCategory === item.id;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setActiveCategory(item.id)}
                    className={`w-fit cursor-pointer group flex flex-col transition-all duration-500 ease-out ${
                      open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    }`}
                    style={{
                      transitionDelay: open ? `${120 + index * 50}ms` : "0ms",
                    }}
                  >
                    <Link
                      href={item.href}
                      title={item.label}
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
                      className={`font-heading text-[26px] sm:text-3xl lg:text-[38px] uppercase tracking-wide leading-tight transition-all duration-300 ${
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

            {/* Right Column: Submenu Links with Staggered Entrance Animation */}
            <div className="col-span-6 flex flex-col gap-4 pt-1 sm:pt-2 pl-2 sm:pl-8 lg:pl-12 justify-start">
              {currentActiveItem?.subItems && (
                <div key={activeCategory} className="flex flex-col gap-3.5">
                  {currentActiveItem.subItems.map((sub, subIndex) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      title={sub.label}
                      aria-label={sub.label}
                      onClick={() => setOpen(false)}
                      className={`font-sans text-[14px] sm:text-base lg:text-lg text-white/90 hover:text-white transition-all duration-500 ease-out py-0.5 inline-block hover:translate-x-1 leading-relaxed ${
                        open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                      }`}
                      style={{
                        transitionDelay: open ? `${150 + subIndex * 50}ms` : "0ms",
                      }}
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
