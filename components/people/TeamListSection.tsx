"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import type { ImageSource } from "@/lib/types";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  registration?: string;
  practices: string[];
  image: ImageSource;
  bgColor?: string;
};

export function TeamListSection({ members }: { members: TeamMember[] }) {
  const [selectedPractices, setSelectedPractices] = useState<string[]>([]);
  const practices = Array.from(new Set(members.flatMap((member) => member.practices))).sort();

  const togglePractice = (practice: string) => {
    setSelectedPractices((prev) =>
      prev.includes(practice)
        ? prev.filter((p) => p !== practice)
        : [...prev, practice]
    );
  };

  const filteredMembers =
    selectedPractices.length > 0
      ? members.filter((member) => member.practices.some((practice) => selectedPractices.includes(practice)))
      : members;

  return (
    <section className="bg-white py-16 lg:py-24 text-black">
      <Container className="flex flex-col gap-10 lg:gap-14">
        {/* Practice Multi-Select Filter Header */}
        <div
          data-aos="fade-up"
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6"
        >
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4">
            <span className="font-sans font-bold text-black text-base sm:text-lg mr-2">
              Practice
            </span>

            {practices.map((practice) => {
              const isActive = selectedPractices.includes(practice);
              return (
                <button
                  key={practice}
                  type="button"
                  onClick={() => togglePractice(practice)}
                  className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-sm sm:text-base font-sans transition-colors duration-300 ease-out cursor-pointer ${
                    isActive
                      ? "bg-black text-white border border-black"
                      : "bg-white text-black border border-black/80 hover:bg-black hover:text-white"
                  }`}
                >
                  <span>{practice}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ease-out ${
                      isActive ? "rotate-90 text-rose-300" : ""
                    }`}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              );
            })}
          </div>

          {/* Reset Filters Button */}
          {selectedPractices.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedPractices([])}
              className="inline-flex items-center justify-center rounded-full border border-black px-5 py-2 text-sm sm:text-base font-sans text-black hover:bg-black hover:text-white transition-colors duration-300 ease-out cursor-pointer self-start md:self-auto"
            >
              Reset Filters ({selectedPractices.length})
            </button>
          )}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {filteredMembers.map((member, index) => (
            <div key={member.id} data-aos="fade-up" data-aos-delay={(index % 3) * 60}>
              <Link
                href={`/people/team/${member.id}`}
                className="group flex flex-col overflow-hidden rounded-[5px] bg-white cursor-pointer"
              >
                {/* Member Photo */}
                <div className="relative aspect-[370/300] overflow-hidden bg-zinc-200">
                  <ResponsiveImage
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>

                {/* Member Details Box */}
                <div
                  className="relative flex flex-col justify-between gap-4 p-6 sm:p-7 min-h-[200px] bg-[#DEE1F2] text-black transition-colors duration-500 ease-out group-hover:brightness-[0.96]"
                >
                  <div className="flex flex-col gap-2 pr-6">
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold leading-tight text-black">
                      {member.name}
                    </h3>
                    <p className="font-sans text-sm sm:text-base font-bold text-black/90">
                      {member.role}
                    </p>
                    {member.registration && (
                      <p className="font-sans text-xs sm:text-sm text-zinc-700 mt-1">
                        Registration Number: {member.registration}
                      </p>
                    )}
                  </div>

                  {/* Arrow Icon */}
                  <div className="absolute bottom-6 right-6">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 text-black"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
