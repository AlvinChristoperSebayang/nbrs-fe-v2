"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";

type ContactFormProps = {
  title: string;
  serviceOptions: string[];
  sectorOptions: string[];
  referralSources: string[];
  privacyNotice: string | null;
};

const slugify = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function CheckboxGroup({
  legend,
  name,
  prefix,
  options,
  selected,
  onToggle,
  compact = false,
}: {
  legend: string;
  name: string;
  prefix: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  compact?: boolean;
}) {
  if (options.length === 0) return null;

  return (
    <fieldset className="flex flex-col gap-3">
      <span className="font-sans text-sm text-black pb-1">{legend}</span>
      <div className={compact ? "grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 xl:flex sm:flex-wrap items-center gap-x-4 xl:gap-x-6 gap-y-3" : "grid grid-cols-2 gap-2.5"}>
        {options.map((option) => {
          const slug = slugify(option);
          const id = `${prefix}-${slug}`;
          const checked = selected.includes(slug);

          return (
            <label key={slug} htmlFor={id} className="inline-flex items-center gap-3 cursor-pointer group">
              <input
                id={id}
                name={name}
                value={slug}
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(slug)}
                className="sr-only peer"
              />
              <span
                aria-hidden="true"
                className="w-6 h-6 rounded-sm border border-zinc-300 bg-white transition-colors flex items-center justify-center shrink-0 peer-focus-visible:ring-2 peer-focus-visible:ring-black peer-focus-visible:ring-offset-2 peer-checked:bg-black peer-checked:border-black peer-checked:text-white group-hover:border-black"
              >
                {checked && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              <span className="font-sans text-xs text-stone-700 font-normal">{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ContactForm({ title, serviceOptions, sectorOptions, referralSources, privacyNotice }: ContactFormProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [submissionState, setSubmissionState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const formStartedAt = useRef(0);

  useEffect(() => {
    formStartedAt.current = Date.now();
  }, []);

  const toggle = (value: string, setSelected: React.Dispatch<React.SetStateAction<string[]>>) => {
    setSelected((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const missingGroups = [
      selectedServices.length === 0 ? "Service type" : null,
      selectedSectors.length === 0 ? "Sector" : null,
      selectedSources.length === 0 ? "How did you hear about us?" : null,
    ].filter((label): label is string => label !== null);

    if (missingGroups.length > 0) {
      setSubmissionState("error");
      setSubmissionMessage(`Please select at least one option for: ${missingGroups.join(", ")}.`);
      return;
    }

    setSubmissionState("submitting");
    setSubmissionMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          company: formData.get("company"),
          role: formData.get("role"),
          phoneCountryCode: formData.get("phoneCountryCode"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          serviceTypes: formData.getAll("serviceTypes[]"),
          sectors: formData.getAll("sectors[]"),
          message: formData.get("message"),
          hearAbout: formData.getAll("hearAbout[]"),
          website: formData.get("website"),
          formStartedAt: formStartedAt.current,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "We could not send your enquiry. Please try again.");
      }

      form.reset();
      setSelectedServices([]);
      setSelectedSectors([]);
      setSelectedSources([]);
      formStartedAt.current = Date.now();
      setSubmissionState("success");
      setSubmissionMessage("Thank you. Your enquiry has been sent.");
    } catch (error) {
      setSubmissionState("error");
      setSubmissionMessage(error instanceof Error ? error.message : "We could not send your enquiry. Please try again.");
    }
  };

  return (
    <div data-aos="fade-up" className="order-1 lg:order-2 lg:col-span-8 w-full">
      <div className="bg-white rounded-[5px] shadow-[0px_0px_25px_rgba(0,0,0,0.12)] border border-zinc-100 p-6 sm:p-10 lg:p-12">
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-black tracking-wide mb-8">{title}</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8">
          <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label htmlFor="contact-first-name" className="sr-only">First name</label>
              <input
                id="contact-first-name"
                name="firstName"
                type="text"
                required
                aria-required="true"
                autoComplete="given-name"
                placeholder="First name"
                className="w-full h-11 px-4 rounded-sm border border-zinc-300 font-sans text-sm text-black placeholder:text-stone-500 focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-last-name" className="sr-only">Last name</label>
              <input
                id="contact-last-name"
                name="lastName"
                type="text"
                required
                aria-required="true"
                autoComplete="family-name"
                placeholder="Last name"
                className="w-full h-11 px-4 rounded-sm border border-zinc-300 font-sans text-sm text-black placeholder:text-stone-500 focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label htmlFor="contact-company" className="sr-only">Company</label>
              <input
                id="contact-company"
                name="company"
                type="text"
                required
                aria-required="true"
                autoComplete="organization"
                placeholder="Company"
                className="w-full h-11 px-4 rounded-sm border border-zinc-300 font-sans text-sm text-black placeholder:text-stone-500 focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-role" className="sr-only">Role or position</label>
              <input
                id="contact-role"
                name="role"
                type="text"
                required
                aria-required="true"
                autoComplete="organization-title"
                placeholder="Role/Position"
                className="w-full h-11 px-4 rounded-sm border border-zinc-300 font-sans text-sm text-black placeholder:text-stone-500 focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="flex gap-2">
              <label htmlFor="contact-phone-country-code" className="sr-only">Country code</label>
              <select
                id="contact-phone-country-code"
                name="phoneCountryCode"
                required
                aria-required="true"
                defaultValue="+61"
                className="h-11 px-3 rounded-sm border border-zinc-300 font-sans text-sm text-stone-700 bg-white focus:outline-none focus:border-black transition-colors shrink-0"
              >
                <option value="+61">+61</option>
                <option value="+62">+62</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+65">+65</option>
              </select>
              <label htmlFor="contact-phone" className="sr-only">Phone number</label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                required
                aria-required="true"
                autoComplete="tel"
                placeholder="Phone number"
                className="w-full h-11 px-4 rounded-sm border border-zinc-300 font-sans text-sm text-black placeholder:text-stone-500 focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="sr-only">Email address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                aria-required="true"
                autoComplete="email"
                placeholder="Email address"
                className="w-full h-11 px-4 rounded-sm border border-zinc-300 font-sans text-sm text-black placeholder:text-stone-500 focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-2">
            <CheckboxGroup legend="Service type" name="serviceTypes[]" prefix="service-type" options={serviceOptions} selected={selectedServices} onToggle={(value) => toggle(value, setSelectedServices)} />
            <CheckboxGroup legend="Sector" name="sectors[]" prefix="sector" options={sectorOptions} selected={selectedSectors} onToggle={(value) => toggle(value, setSelectedSectors)} />
          </div>

          <div className="pt-2">
            <label htmlFor="contact-message" className="sr-only">Tell us about your project or how we can help you</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              aria-required="true"
              placeholder="Tell us about your project/how can we help you"
              className="w-full p-4 rounded-sm border border-zinc-300 font-sans text-sm text-black placeholder:text-stone-500 focus:outline-none focus:border-black transition-colors resize-none"
            />
          </div>

          <div className="pt-2">
            <CheckboxGroup legend="How did you hear about us?" name="hearAbout[]" prefix="hear-about" options={referralSources} selected={selectedSources} onToggle={(value) => toggle(value, setSelectedSources)} compact />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={submissionState === "submitting"}
              className="inline-flex items-center justify-between gap-6 bg-black text-white px-4 py-3.5 rounded-sm font-sans text-sm font-semibold transition-opacity disabled:cursor-wait disabled:opacity-60 hover:bg-black/85 w-[150px]"
            >
              <span>{submissionState === "submitting" ? "Sending…" : "Submit"}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {submissionState !== "idle" && (
            <p role="status" aria-live="polite" className={submissionState === "success" ? "font-sans text-sm text-emerald-700" : submissionState === "error" ? "font-sans text-sm text-red-700" : "sr-only"}>
              {submissionMessage}
            </p>
          )}

          {privacyNotice && <div className="font-sans text-xs text-stone-500 leading-relaxed pt-2 [&_a]:underline [&_a]:text-stone-700 hover:[&_a]:text-black" dangerouslySetInnerHTML={{ __html: privacyNotice }} />}
        </form>
      </div>
    </div>
  );
}
