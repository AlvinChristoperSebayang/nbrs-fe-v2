"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";

const SERVICE_TYPES = ["Architecture", "Interior Design", "Landscape"];

const SECTORS = [
  "Education",
  "Wellness",
  "Community",
  "Heritage",
  "Secure Spaces",
  "Other",
];

const HEAR_ABOUT_US_OPTIONS = [
  "Event",
  "LinkedIn",
  "Conference",
  "Referral",
  "Industry News",
  "Google",
];

export default function ContactPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [countryCode, setCountryCode] = useState("+61");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleItem = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <article className="relative bg-white text-black min-h-screen pb-24">
      {/* Top Banner Image Background (Mobile Height Extended: h-[450px], Desktop Preserved: lg:h-[400px]) */}
      <div className="relative w-full h-[450px] sm:h-[360px] lg:h-[400px] overflow-hidden bg-white">
        <img
          src="/images/hero/hero1.png"
          alt="NBRS Studio Background"
          className="h-full w-full object-cover"
        />
        {/* Solid White Tint Overlay */}
        <div className="absolute inset-0 bg-white/55" />
      </div>

      {/* Main Content Area Container Overlapping Hero */}
      <Container className="-mt-[360px] sm:-mt-[280px] lg:-mt-64 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Form Card: FIRST on Mobile (order-1), SECOND on Desktop (lg:order-2, lg:col-span-8) */}
          <div data-aos="fade-up" className="order-1 lg:order-2 lg:col-span-8 w-full">
            <div className="bg-white rounded-[5px] shadow-[0px_0px_25px_rgba(0,0,0,0.12)] border border-zinc-100 p-6 sm:p-10 lg:p-12">
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-black tracking-wide mb-8">
                GET IN TOUCH
              </h1>

              {isSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-sm p-6 flex flex-col gap-2">
                  <h3 className="font-heading text-2xl font-bold uppercase">
                    THANK YOU FOR REACHING OUT!
                  </h3>
                  <p className="font-sans text-base">
                    Your message has been received. Our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8">
                  {/* Row 1: Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="flex flex-col gap-1.5">
                      <input
                        type="text"
                        required
                        placeholder="First name"
                        className="w-full h-11 px-4 rounded-sm border border-zinc-300 font-sans text-sm text-black placeholder:text-stone-500 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <input
                        type="text"
                        required
                        placeholder="Last name"
                        className="w-full h-11 px-4 rounded-sm border border-zinc-300 font-sans text-sm text-black placeholder:text-stone-500 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="flex flex-col gap-1.5">
                      <input
                        type="text"
                        placeholder="Company"
                        className="w-full h-11 px-4 rounded-sm border border-zinc-300 font-sans text-sm text-black placeholder:text-stone-500 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <input
                        type="text"
                        placeholder="Role/Position"
                        className="w-full h-11 px-4 rounded-sm border border-zinc-300 font-sans text-sm text-black placeholder:text-stone-500 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="h-11 px-3 rounded-sm border border-zinc-300 font-sans text-sm text-stone-700 bg-white focus:outline-none focus:border-black transition-colors shrink-0"
                      >
                        <option value="+61">+61</option>
                        <option value="+62">+62</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+65">+65</option>
                      </select>
                      <input
                        type="tel"
                        placeholder="Phone number"
                        className="w-full h-11 px-4 rounded-sm border border-zinc-300 font-sans text-sm text-black placeholder:text-stone-500 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <input
                        type="email"
                        required
                        placeholder="Email address"
                        className="w-full h-11 px-4 rounded-sm border border-zinc-300 font-sans text-sm text-black placeholder:text-stone-500 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service Type & Sector Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-2">
                    {/* Service Type */}
                    <div className="flex flex-col gap-3">
                      <span className="font-sans text-sm font-semibold text-black">
                        Service type
                      </span>
                      <div className="grid grid-cols-2 sm:flex sm:flex-col gap-2.5">
                        {SERVICE_TYPES.map((service) => {
                          const isChecked = selectedServices.includes(service);
                          return (
                            <label
                              key={service}
                              onClick={() =>
                                toggleItem(service, selectedServices, setSelectedServices)
                              }
                              className="inline-flex items-center gap-3 cursor-pointer group"
                            >
                              <div
                                className={`w-6 h-6 rounded-sm border transition-colors flex items-center justify-center shrink-0 ${
                                  isChecked
                                    ? "bg-black border-black text-white"
                                    : "border-zinc-300 bg-white group-hover:border-black"
                                }`}
                              >
                                {isChecked && (
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                )}
                              </div>
                              <span className="font-sans text-xs sm:text-sm text-stone-700 font-normal">
                                {service}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sector */}
                    <div className="flex flex-col gap-3">
                      <span className="font-sans text-sm font-semibold text-black">
                        Sector
                      </span>
                      <div className="grid grid-cols-2 gap-2.5">
                        {SECTORS.map((sector) => {
                          const isChecked = selectedSectors.includes(sector);
                          return (
                            <label
                              key={sector}
                              onClick={() =>
                                toggleItem(sector, selectedSectors, setSelectedSectors)
                              }
                              className="inline-flex items-center gap-3 cursor-pointer group"
                            >
                              <div
                                className={`w-6 h-6 rounded-sm border transition-colors flex items-center justify-center shrink-0 ${
                                  isChecked
                                    ? "bg-black border-black text-white"
                                    : "border-zinc-300 bg-white group-hover:border-black"
                                }`}
                              >
                                {isChecked && (
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                )}
                              </div>
                              <span className="font-sans text-xs sm:text-sm text-stone-700 font-normal">
                                {sector}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Project Description Textarea */}
                  <div className="flex flex-col gap-1.5 pt-2">
                    <textarea
                      rows={5}
                      required
                      placeholder="Tell us about your project/how can we help you"
                      className="w-full p-4 rounded-sm border border-zinc-300 font-sans text-sm text-black placeholder:text-stone-500 focus:outline-none focus:border-black transition-colors resize-none"
                    />
                  </div>

                  {/* How did you hear about us? */}
                  <div className="flex flex-col gap-3 pt-2">
                    <span className="font-sans text-sm font-semibold text-black">
                      How did you hear about us?
                    </span>
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-6 gap-y-3">
                      {HEAR_ABOUT_US_OPTIONS.map((source) => {
                        const isChecked = selectedSources.includes(source);
                        return (
                          <label
                            key={source}
                            onClick={() =>
                              toggleItem(source, selectedSources, setSelectedSources)
                            }
                            className="inline-flex items-center gap-2.5 cursor-pointer group"
                          >
                            <div
                              className={`w-6 h-6 rounded-sm border transition-colors flex items-center justify-center shrink-0 ${
                                isChecked
                                  ? "bg-black border-black text-white"
                                  : "border-zinc-300 bg-white group-hover:border-black"
                              }`}
                            >
                              {isChecked && (
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </div>
                            <span className="font-sans text-xs sm:text-sm text-stone-700 font-normal">
                              {source}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-between gap-6 bg-black text-white px-8 py-3.5 rounded-sm font-sans text-sm font-semibold hover:bg-zinc-800 transition-colors cursor-pointer group"
                    >
                      <span>Submit</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Privacy Disclaimer */}
                  <p className="font-sans text-xs text-stone-500 leading-relaxed pt-2">
                    We respect your privacy. Your details are used only to respond to your enquiry and won’t be shared with third parties. By submitting, you agree to our{" "}
                    <span className="underline cursor-pointer text-stone-700 hover:text-black">
                      Privacy Policy
                    </span>{" "}
                    and can opt out of communications at any time.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Office Locations: SECOND on Mobile (order-2), FIRST on Desktop (lg:order-1, lg:col-span-4) */}
          <div data-aos="fade-up" className="order-2 lg:order-1 lg:col-span-4 flex flex-col gap-10 lg:gap-12 pt-4">
            {/* SYDNEY STUDIO */}
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-black tracking-wide leading-none">
                SYDNEY
              </h2>
              <div className="font-sans text-base text-zinc-900 leading-snug flex flex-col gap-1">
                <span className="font-semibold text-black">
                  Cammeraygal Country
                </span>
                <span>4 Glen Street, Milsons Point NSW 2061</span>
                <span className="font-medium text-black">+61 2 9922 2344</span>
              </div>
            </div>

            {/* MELBOURNE STUDIO */}
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-black tracking-wide leading-none">
                MELBOURNE
              </h2>
              <div className="font-sans text-base text-zinc-900 leading-snug flex flex-col gap-1">
                <span className="font-semibold text-black">
                  Wurundjeri Woi-wurrung Country
                </span>
                <span>Suite 401 325 Flinders Lane, Melbourne VIC 3000</span>
                <span className="font-medium text-black">+61 3 9118 0000</span>
              </div>
            </div>

            {/* BRISBANE STUDIO */}
            <div className="flex flex-col gap-2">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-black tracking-wide leading-none">
                BRISBANE
              </h2>
              <div className="font-sans text-base text-zinc-900 leading-snug flex flex-col gap-1">
                <span className="font-semibold text-black">
                  Turrbal & Jagera Country
                </span>
                <span>Level 38 71 Eagle Street, Brisbane City QLD 4000</span>
              </div>
            </div>

            {/* FORTNIGHT SCHEDULE NOTE */}
            <div className="pt-4 border-t border-zinc-200">
              <p className="font-sans text-base font-bold text-black leading-normal">
                NBRS operates on a 9-day fortnight schedule.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
