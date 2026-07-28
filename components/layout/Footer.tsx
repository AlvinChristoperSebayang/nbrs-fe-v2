"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
type FooterLink = {
  label: string;
  href: string;
};

type FooterGroup = {
  heading: string;
  links: FooterLink[];
};

const sectorsColumn: FooterGroup[] = [
  {
    heading: "Sectors",
    links: [
      { label: "Education", href: "/services" },
      { label: "Wellness", href: "/services" },
      { label: "Community", href: "/services" },
      { label: "Secure Spaces", href: "/services" },
      { label: "Heritage", href: "/services" },
    ],
  },
  {
    heading: "Practices",
    links: [
      { label: "Architecture", href: "/services" },
      { label: "Landscape Architecture", href: "/services" },
      { label: "Interior Design", href: "/services" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];

const peopleColumn: FooterGroup[] = [
  {
    heading: "Purpose",
    links: [
      { label: "About NBRS", href: "/about" },
      { label: "Design Approach", href: "/about" },
      { label: "Awards", href: "/awards" },
      { label: "Research Envision", href: "/research" },
      { label: "Sustainability", href: "/about" },
      { label: "Social Responsibility", href: "/about" },
      { label: "News", href: "/blog" },
    ],
  },
  {
    heading: "People",
    links: [
      { label: "Our Leaders", href: "/about" },
      { label: "Culture", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Envision", href: "/about" },
    ],
  },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M7.5 10v6.5M7.5 7.5v.01M11.5 16.5V10M11.5 12.75c0-1.52 1.12-2.75 2.75-2.75s2.75 1.23 2.75 2.75v3.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 9.5l5 2.5-5 2.5v-5z" fill="currentColor" />
      </svg>
    ),
  },
];

function FooterLinkGroup({
  heading,
  links,
  defaultOpen = false,
}: FooterGroup & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/10 pb-4 lg:border-none lg:pb-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between font-heading text-lg uppercase tracking-wide text-white lg:pointer-events-none lg:text-2xl"
      >
        {heading}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`h-4 w-4 shrink-0 text-white/70 transition-transform duration-300 lg:hidden ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <ul
        className={`mt-4 flex-col gap-3 lg:!flex ${open ? "flex" : "hidden"}`}
      >
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm lg:text-lg  text-white/70 transition hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#181D33] py-20 lg:pt-[85px] lg:pb-[60px]">
      <Container>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div data-aos="fade-up" className="flex flex-col gap-8">
            <img
              src="/images/logo/footer-logo.png"
              alt="NBRS"
              width={110}
              height={40}
            />
            <div>
              <h3 className="text-sm lg:text-lg tracking-wide text-white">
                Business Details
              </h3>
              <p className="mt-4 text-sm lg:text-lg font-semibold text-white">
                Nominated Architect:
              </p>
              <p className="mt-1 text-sm text-white/70">
                Andrew Duffin
                <br />
                NSW 5602 | QLD 5465 | VIC00024
              </p>
              <p className="mt-3 text-sm text-white/70">ABN 16 002 247 565</p>
            </div>

            <div>
              <h3 className="font-heading text-sm lg:text-2xl uppercase tracking-wide text-white">
                Contact Us
              </h3>
              <p className="mt-4 text-sm lg:text-lg text-white/70">
                NBRS operates on a 
                <br />
                9-day fortnight schedule.
              </p>
              <div className="mt-4 flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="text-white/80 transition hover:text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="flex flex-col gap-6 lg:gap-10"
          >
            {sectorsColumn.map((group, index) => (
              <FooterLinkGroup
                key={group.heading}
                {...group}
                defaultOpen={index === 0}
              />
            ))}
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex flex-col gap-6 lg:gap-10"
          >
            {peopleColumn.map((group) => (
              <FooterLinkGroup key={group.heading} {...group} />
            ))}
          </div>
        </div>
        <p
          data-aos="fade-up"
          data-aos-delay="300"
          className="mt-16 max-w-4xl text-sm italic text-white/50"
        >
          We acknowledge the Aboriginal and Torres Strait Islander peoples as
          the Traditional Custodians of this land and waters. We pay our
          respects to Aboriginal and Torres Strait Islander Elders, past and
          present, and acknowledge the diversity and strength of Aboriginal
          and Torres Strait Islander peoples and communities today.
        </p>
      </Container>
    </footer>
  );
}
