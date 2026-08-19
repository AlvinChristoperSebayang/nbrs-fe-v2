"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { FooterContent, FooterLink } from "@/lib/footer";

type FooterGroup = {
  heading: string;
  links: FooterLink[];
};

const footerGroupDefinitions = [
  { section: "purpose", heading: "Purpose" },
  { section: "people", heading: "People" },
  { section: "sectors", heading: "Sectors" },
  { section: "practices", heading: "Practices" },
  { section: "legal", heading: "Legal" },
] as const;

function groupsFor(
  content: FooterContent,
  sections: ReadonlyArray<(typeof footerGroupDefinitions)[number]["section"]>,
): FooterGroup[] {
  return sections.flatMap((section) => {
    const definition = footerGroupDefinitions.find((group) => group.section === section);
    const links = content.navigation
      .filter((link) => link.section === section)
      .map(({ label, href }) => ({ label, href }));

    return definition && links.length ? [{ heading: definition.heading, links }] : [];
  });
}

const socialIcons = [
  {
    label: "LinkedIn",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.53078 0H22.3616C24.3116 0 25.8924 1.58078 25.8924 3.53078V22.3616C25.8924 24.3116 24.3116 25.8924 22.3616 25.8924H3.53078C1.58078 25.8924 0 24.3116 0 22.3616V3.53078C0 1.58078 1.58078 0 3.53078 0ZM8.66766 20.8772C8.77006 20.7745 8.82739 20.6353 8.827 20.4903V10.7394C8.827 10.4377 8.58288 10.193 8.2812 10.1922H5.9553C5.65305 10.1922 5.40803 10.4372 5.40803 10.7394V20.4903C5.40764 20.6355 5.46517 20.775 5.56789 20.8777C5.67061 20.9804 5.81004 21.0379 5.9553 21.0375H8.2812C8.42621 21.0375 8.56526 20.9798 8.66766 20.8772ZM7.11738 9.26797C5.89863 9.26797 4.91064 8.27998 4.91064 7.06123C4.91064 5.84248 5.89863 4.85449 7.11738 4.85449C8.33613 4.85449 9.32412 5.84248 9.32412 7.06123C9.32412 8.27998 8.33613 9.26797 7.11738 9.26797ZM20.8371 20.8847C20.9316 20.7902 20.9844 20.662 20.9841 20.5285L20.9811 15.8149L20.9811 15.7747C20.9813 13.7157 20.9816 10.0303 17.009 10.0303C15.2039 10.0303 14.358 10.6894 13.7871 11.547V10.6967C13.7871 10.4188 13.5619 10.1936 13.284 10.1936H10.8684C10.7351 10.1936 10.6072 10.2466 10.5131 10.341C10.419 10.4354 10.3663 10.5634 10.3667 10.6967V20.5343C10.3663 20.6676 10.419 20.7956 10.5131 20.89C10.6072 20.9844 10.7351 21.0375 10.8684 21.0375H13.284C13.559 21.0335 13.7798 20.8094 13.7798 20.5343V15.2588C13.8416 14.5497 14.1549 12.9711 15.6923 12.9711C17.5308 12.9711 17.4944 14.9507 17.4791 15.7849C17.4779 15.8512 17.4768 15.9103 17.4768 15.9605V20.5285C17.4764 20.662 17.5293 20.7902 17.6237 20.8847C17.7182 20.9791 17.8464 21.032 17.9799 21.0316H20.4809C20.6145 21.032 20.7427 20.9791 20.8371 20.8847Z" fill="white"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    icon: (
      <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_6338_807)">
          <path d="M12.5 2.34102C15.8398 2.34102 16.2354 2.35625 17.5488 2.41719C18.7695 2.47305 19.4287 2.68633 19.8682 2.86406C20.4492 3.09766 20.8691 3.38203 21.3037 3.83398C21.7432 4.29102 22.0117 4.72266 22.2363 5.32695C22.4072 5.78398 22.6123 6.47461 22.666 7.73906C22.7246 9.11016 22.7393 9.52149 22.7393 12.9898C22.7393 16.4633 22.7246 16.8746 22.666 18.2406C22.6123 19.5102 22.4072 20.1957 22.2363 20.6527C22.0117 21.257 21.7383 21.6938 21.3037 22.1457C20.8643 22.6027 20.4492 22.882 19.8682 23.1156C19.4287 23.2934 18.7646 23.5066 17.5488 23.5625C16.2305 23.6234 15.835 23.6387 12.5 23.6387C9.16016 23.6387 8.76465 23.6234 7.45117 23.5625C6.23047 23.5066 5.57129 23.2934 5.13184 23.1156C4.55078 22.882 4.13086 22.5977 3.69629 22.1457C3.25684 21.6887 2.98828 21.257 2.76367 20.6527C2.59277 20.1957 2.3877 19.5051 2.33398 18.2406C2.27539 16.8695 2.26074 16.4582 2.26074 12.9898C2.26074 9.51641 2.27539 9.10508 2.33398 7.73906C2.3877 6.46953 2.59277 5.78398 2.76367 5.32695C2.98828 4.72266 3.26172 4.28594 3.69629 3.83398C4.13574 3.37695 4.55078 3.09766 5.13184 2.86406C5.57129 2.68633 6.23535 2.47305 7.45117 2.41719C8.76465 2.35625 9.16016 2.34102 12.5 2.34102ZM12.5 0C9.10645 0 8.68164 0.0152344 7.34863 0.0761719C6.02051 0.137109 5.10742 0.360547 4.31641 0.680469C3.49121 1.01562 2.79297 1.45742 2.09961 2.18359C1.40137 2.90469 0.976562 3.63086 0.654297 4.48398C0.34668 5.31172 0.131836 6.25625 0.0732422 7.6375C0.0146484 9.02891 0 9.4707 0 13C0 16.5293 0.0146484 16.9711 0.0732422 18.3574C0.131836 19.7387 0.34668 20.6883 0.654297 21.5109C0.976562 22.3691 1.40137 23.0953 2.09961 23.8164C2.79297 24.5375 3.49121 24.9844 4.31152 25.3145C5.10742 25.6344 6.01562 25.8578 7.34375 25.9188C8.67676 25.9797 9.10156 25.9949 12.4951 25.9949C15.8887 25.9949 16.3135 25.9797 17.6465 25.9188C18.9746 25.8578 19.8877 25.6344 20.6787 25.3145C21.499 24.9844 22.1973 24.5375 22.8906 23.8164C23.584 23.0953 24.0137 22.3691 24.3311 21.516C24.6387 20.6883 24.8535 19.7438 24.9121 18.3625C24.9707 16.9762 24.9854 16.5344 24.9854 13.0051C24.9854 9.47578 24.9707 9.03399 24.9121 7.64766C24.8535 6.26641 24.6387 5.3168 24.3311 4.49414C24.0234 3.63086 23.5986 2.90469 22.9004 2.18359C22.207 1.4625 21.5088 1.01562 20.6885 0.685547C19.8926 0.365625 18.9844 0.142188 17.6562 0.08125C16.3184 0.0152344 15.8936 0 12.5 0Z" fill="white"/>
          <path d="M12.5 6.32227C8.95508 6.32227 6.0791 9.31328 6.0791 13C6.0791 16.6867 8.95508 19.6777 12.5 19.6777C16.0449 19.6777 18.9209 16.6867 18.9209 13C18.9209 9.31328 16.0449 6.32227 12.5 6.32227ZM12.5 17.3316C10.2002 17.3316 8.33496 15.3918 8.33496 13C8.33496 10.6082 10.2002 8.66836 12.5 8.66836C14.7998 8.66836 16.665 10.6082 16.665 13C16.665 15.3918 14.7998 17.3316 12.5 17.3316Z" fill="white"/>
          <path d="M20.6738 6.05801C20.6738 6.92129 20 7.617 19.1748 7.617C18.3447 7.617 17.6758 6.91621 17.6758 6.05801C17.6758 5.19473 18.3496 4.49902 19.1748 4.49902C20 4.49902 20.6738 5.19981 20.6738 6.05801Z" fill="white"/>
        </g>
        <defs>
          <clipPath id="clip0_6338_807">
            <rect width="25" height="26" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <svg width="26" height="19" viewBox="0 0 26 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.741 3.9457C25.741 3.9457 25.4871 2.15313 24.7051 1.36602C23.7148 0.330078 22.6078 0.325 22.1 0.264062C18.4641 -1.45286e-07 13.0051 0 13.0051 0H12.9949C12.9949 0 7.53594 -1.45286e-07 3.9 0.264062C3.39219 0.325 2.28516 0.330078 1.29492 1.36602C0.512891 2.15313 0.264062 3.9457 0.264062 3.9457C0.264062 3.9457 0 6.05313 0 8.15547V10.1258C0 12.2281 0.258984 14.3355 0.258984 14.3355C0.258984 14.3355 0.512891 16.1281 1.28984 16.9152C2.28008 17.9512 3.58008 17.9156 4.15898 18.0273C6.24102 18.2254 13 18.2863 13 18.2863C13 18.2863 18.4641 18.2762 22.1 18.0172C22.6078 17.9563 23.7148 17.9512 24.7051 16.9152C25.4871 16.1281 25.741 14.3355 25.741 14.3355C25.741 14.3355 26 12.2332 26 10.1258V8.15547C26 6.05313 25.741 3.9457 25.741 3.9457ZM10.3137 12.5176V5.21016L17.3367 8.87656L10.3137 12.5176Z" fill="white"/>
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
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex items-center gap-3 font-heading text-[26px] leading-[27px] font-normal uppercase tracking-normal text-white lg:pointer-events-none lg:text-2xl lg:leading-tight cursor-pointer lg:cursor-default"
      >
        <span>{heading}</span>
        <span className="shrink-0 lg:hidden text-white ml-0.5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Horizontal Line (-) */}
            <path
              d="M3 8H13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Vertical Line (|) -> rotates & fades out when open */}
            <path
              d="M8 3V13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              className={`origin-[8px_8px] transition-all duration-300 ${
                open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            />
          </svg>
        </span>
      </button>

      {/* Smooth Grid Accordion Expansion */}
      <div
        className={`grid transition-all duration-500 ease-in-out lg:!grid lg:!grid-rows-[1fr] lg:!opacity-100 lg:!mt-4 ${
          open
            ? "grid-rows-[1fr] opacity-100 mt-4"
            : "grid-rows-[0fr] opacity-0 mt-0"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm lg:text-lg text-white/70 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Footer({ content }: { content: FooterContent }) {
  const purposeAndPeopleColumn = groupsFor(content, ["purpose", "people"]);
  const sectorsAndPracticesColumn = groupsFor(content, ["sectors", "practices", "legal"]);
  const socialLinks = content.socialLinks.flatMap((link) => {
    const socialIcon = socialIcons.find(
      (social) => social.label.toLowerCase() === link.label.toLowerCase(),
    );

    return socialIcon ? [{ ...link, icon: socialIcon.icon }] : [];
  });

  return (
    <footer className="bg-[#181D33] py-20 lg:pt-[85px] lg:pb-[60px]">
      <Container>
        <div className="grid grid-cols-1 gap-[35px] sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Business Info & Logo */}
          <div data-aos="fade-up" className="flex flex-col gap-8 order-1 lg:order-1">
            <Link href="/" className="inline-block w-fit">
              <img
                src="/images/logo/logo-white-2.svg"
                alt="NBRS"
                title="NBRS"
                width={180}
                height={65}
                className="w-[150px] sm:w-[165px] lg:w-[180px] h-auto object-contain"
              />
            </Link>
            {content.businessDetailsHtml && (
              <div className="mt-4">
                <h3 className="text-sm lg:text-lg tracking-wide text-white">
                  Business Details
                </h3>
                <div
                  className="mt-4 text-sm text-white/70 [&_p]:m-0 [&_p:first-child]:font-semibold [&_p:first-child]:text-white [&_p+p]:mt-4 [&_p+p+p]:mt-4"
                  dangerouslySetInnerHTML={{ __html: content.businessDetailsHtml }}
                />
              </div>
            )}

            {(content.contactMessage || socialLinks.length > 0) && (
              <div>
                <h3 className="font-heading text-sm lg:text-2xl uppercase tracking-wide text-white">
                  Contact Us
                </h3>
                {content.contactMessage && content.contactLink ? (
                  <a
                    href={content.contactLink}
                    className="mt-4 inline-block whitespace-pre-line text-sm lg:text-lg text-white/70 transition-colors hover:text-white"
                  >
                    {content.contactMessage}
                  </a>
                ) : content.contactMessage ? (
                  <p className="mt-4 whitespace-pre-line text-sm lg:text-lg text-white/70">
                    {content.contactMessage}
                  </p>
                ) : null}
                {socialLinks.length > 0 && (
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
                )}
              </div>
            )}
          </div>

          {/* Column 2 (Mobile: 1st & 2nd -> PURPOSE, PEOPLE / Desktop: 3rd Column -> Right) */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="flex flex-col gap-[35px] lg:gap-10 order-2 lg:order-3"
          >
            {purposeAndPeopleColumn.map((group, index) => (
              <FooterLinkGroup
                key={group.heading}
                {...group}
                defaultOpen={index === 0}
              />
            ))}
          </div>

          {/* Column 3 (Mobile: 3rd, 4th, 5th -> SECTORS, PRACTICES, LEGAL / Desktop: 2nd Column -> Middle) */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex flex-col gap-[35px] lg:gap-10 order-3 lg:order-2"
          >
            {sectorsAndPracticesColumn.map((group) => (
              <FooterLinkGroup key={group.heading} {...group} />
            ))}
          </div>
        </div>
        {content.acknowledgementHtml && (
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="mt-16 w-full text-sm italic text-[#FFD6CD] [&_p]:m-0"
            dangerouslySetInnerHTML={{ __html: content.acknowledgementHtml }}
          />
        )}
      </Container>
    </footer>
  );
}
