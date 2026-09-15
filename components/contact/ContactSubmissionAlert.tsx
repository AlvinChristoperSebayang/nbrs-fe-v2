"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

type ContactSubmissionAlertProps = {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

export function ContactSubmissionAlert({ open, title, message, onClose }: ContactSubmissionAlertProps) {
  const titleId = useId();
  const messageId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="presentation">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/45 transition-opacity"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={messageId}
        className="relative z-10 w-full max-w-md rounded-sm border border-zinc-100 bg-white p-7 sm:p-9 shadow-[0px_12px_40px_rgba(0,0,0,0.18)] animate-contact-alert-in"
      >
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 id={titleId} className="font-heading text-center text-2xl sm:text-[28px] font-bold uppercase tracking-wide text-black">
          {title}
        </h2>
        <p id={messageId} className="mt-3 text-center font-sans text-sm sm:text-[15px] leading-relaxed text-stone-600">
          {message}
        </p>

        <div className="mt-7 flex justify-center">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-w-[140px] items-center justify-center bg-black px-5 py-3 font-sans text-sm font-semibold text-white transition-opacity hover:bg-black/85"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
