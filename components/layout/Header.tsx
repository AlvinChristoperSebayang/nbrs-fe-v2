"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    function update() {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      setScrolled(currentY > 10);
      setHidden((prev) => {
        if (currentY <= 120) return false;
        // Ignore tiny deltas (trackpad jitter) so direction doesn't flip mid-gesture.
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
              className="relative z-50 font-semibold text-black dark:text-zinc-50"
            >
              <img
                src={isDark ? "/images/logo/logo-black.svg" : "/images/logo/logo-white.svg"}
                alt="Logo"
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

      {/* Full-screen menu, wipes open from the hamburger button as a clip-path circle.
          Rendered as a sibling of <header>, not a child — a transformed ancestor
          would turn its own box into the containing block for this fixed element. */}
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        style={{
          clipPath: open
            ? "circle(150% at calc(100% - 2.5rem) 2.5rem)"
            : "circle(0% at calc(100% - 2.5rem) 2.5rem)",
        }}
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-white transition-[clip-path] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <Container>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: open ? `${150 + index * 90}ms` : "0ms",
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 py-3"
                >
                  <span className="font-heading text-sm text-black/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-heading text-5xl uppercase text-black transition-transform duration-300 group-hover:translate-x-3 sm:text-7xl">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
}
