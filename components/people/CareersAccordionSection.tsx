"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";

export type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

const DEFAULT_ACCORDION_ITEMS: AccordionItem[] = [
  {
    id: "learning-development",
    title: "Learning and Development",
    content:
      "We are committed to nurturing our people through structured and informal learning, CPD sessions, internal design workshops, and mentoring, ensuring continual professional and personal advancement.\n\nWe support the career progression of emerging professionals providing the opportunity for skills development and architectural registration.",
  },
  {
    id: "health-wellbeing",
    title: "Health and Wellbeing",
    content:
      "We offer comprehensive health initiatives, mental health support, biophilic workspace designs, and wellness programs that prioritize employee wellbeing.",
  },
  {
    id: "social-connection",
    title: "Social Connection",
    content:
      "Our social club, team gatherings, and studio rituals bring our team together for celebrations, networking, and creative exchanges across all our studios.",
  },
  {
    id: "work-life-balance",
    title: "Work-Life Balance",
    content:
      "We champion flexible working arrangements and our 9-Day Fortnight program to support personal balance, rest, and connection outside of work.",
  },
  {
    id: "commitment-cause",
    title: "Commitment to Cause",
    content:
      "Every project we undertake reflects our commitment to social impact, environmental sustainability, community flourishing, and design for good.",
  },
];

export type CareersAccordionSectionProps = {
  title?: React.ReactNode;
  items?: AccordionItem[];
  introParagraphs?: React.ReactNode | null;
  introText?: string | null;
  showDefaultIntro?: boolean;
};

function renderEmailLinks(value: string) {
  const parts = value.split(/([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi);
  return parts.map((part, index) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(part) ? (
      <a
        key={`${part}-${index}`}
        href={`mailto:${part}`}
        title={`Send email to ${part}`}
        aria-label={`Send email to ${part}`}
        className="font-medium text-black underline underline-offset-4 hover:text-rose-600 transition-colors"
      >
        {part}
      </a>
    ) : (
      part
    )
  );
}

function renderBodyTitle(title: React.ReactNode) {
  if (typeof title !== "string") {
    return title;
  }

  const lines = title.includes("\n")
    ? title.split("\n").map((l) => l.trim()).filter(Boolean)
    : title.trim().split(/\s+/).length >= 3
    ? [title.trim().split(/\s+/).slice(0, -2).join(" "), title.trim().split(/\s+/).slice(-2).join(" ")]
    : [title.trim()];

  if (lines.length <= 1) {
    return (
      <span className="inline-block border-b-4 border-zinc-200/50 pb-2 leading-none">
        {lines[0]}
      </span>
    );
  }

  return (
    <span className="inline-flex flex-col items-start">
      {lines.map((line, idx) => {
        const isLast = idx === lines.length - 1;
        if (isLast) {
          return (
            <span
              key={idx}
              className="inline-block border-b-4 border-zinc-200/50 pb-2 leading-none mt-1"
            >
              {line}
            </span>
          );
        }
        return (
          <span key={idx} className="block leading-[1.05]">
            {line}
          </span>
        );
      })}
    </span>
  );
}

export function CareersAccordionSection({
  title = "CAREERS\nAT NBRS",
  items = DEFAULT_ACCORDION_ITEMS,
  introParagraphs,
  introText,
  showDefaultIntro = false,
}: CareersAccordionSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-white pb-16 lg:pb-24 text-black">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Light Gray Watermark Title */}
          <div data-aos="fade-up" className="lg:col-span-4 lg:sticky lg:top-28">
            <h2 className="hidden md:block font-heading whitespace-pre-line text-4xl sm:text-5xl lg:text-[64px] font-bold uppercase text-zinc-200/90 leading-none tracking-wide">
              {renderBodyTitle(title)}
            </h2>
          </div>

          {/* Right Column: Optional Overview Paragraphs & Accordions */}
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="lg:col-span-8 flex flex-col gap-8 sm:gap-10"
          >
            {/* Custom Intro Paragraphs */}
            {introParagraphs && (
              <div className="font-sans text-sm sm:text-base text-black leading-relaxed flex flex-col gap-3 max-w-3xl pt-8 lg:pt-0">
                {introParagraphs}
              </div>
            )}

            {introText && (
              <div className="font-sans text-sm sm:text-base text-black leading-relaxed flex flex-col gap-3 max-w-3xl pt-8 lg:pt-0">
                {introText.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => (
                  <p key={index}>{renderEmailLinks(paragraph)}</p>
                ))}
              </div>
            )}

            {/* Default Careers Intro Paragraphs */}
            {!introParagraphs && !introText && showDefaultIntro && (
              <div className="font-sans text-sm sm:text-base text-zinc-800 leading-relaxed flex flex-col gap-3 max-w-3xl pt-0">
                <p>
                  At NBRS, we cultivate a safe and inclusive studio where diverse
                  talent can thrive. We recognise potential, celebrate
                  initiative, and foster a culture that supports flexibility,
                  personal well‑being, and continual growth.
                </p>
                <p>
                  We seek individuals who share our commitment to design
                  excellence and positive social impact. Those interested in
                  joining our award‑winning studio are invited to connect with us at{" "}
                  <a
                    href="mailto:careers@nbrs.com.au"
                    title="Send email to careers@nbrs.com.au"
                    aria-label="Send email to careers@nbrs.com.au"
                    className="font-medium text-black underline underline-offset-4 hover:text-rose-600 transition-colors"
                  >
                    careers@nbrs.com.au
                  </a>
                </p>
              </div>
            )}

            {/* Accordions List */}
            <div className="flex flex-col gap-6">
              {items.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className="overflow-hidden border-2 border-zinc-200 bg-white transition-all duration-300"
                  >
                    {/* Accordion Header */}
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-6 p-6 sm:p-7 text-left focus:outline-none cursor-pointer select-none"
                    >
                      <span className="font-heading text-2xl sm:text-3xl font-bold uppercase text-black tracking-wide leading-tight">
                        {item.title}
                      </span>

                      {/* Smooth Rotating Circular Arrow Button */}
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                          isOpen
                            ? "bg-zinc-300 text-white rotate-180"
                            : "bg-black text-white rotate-0"
                        }`}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 5v14M19 12l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {/* Smooth Grid Height & Opacity Transition */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-7 sm:px-7 font-sans text-base sm:text-lg text-zinc-800 leading-relaxed border-t border-zinc-100 pt-5 flex flex-col gap-4">
                          {item.content.split("\n\n").map((para, idx) => (
                            <p key={idx}>{para}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
