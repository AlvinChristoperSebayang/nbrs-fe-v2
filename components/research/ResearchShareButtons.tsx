"use client";

import { useState } from "react";

export function ResearchShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        return;
      } catch {
        // user cancelled or share failed, fallback to copy
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const getLinkedInShareUrl = () => {
    if (typeof window === "undefined") return "#";
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
  };

  return (
    <div className="flex items-center gap-4">
      {/* Share Icon (Native Web Share / Copy link) */}
      <button
        type="button"
        onClick={handleShare}
        title={copied ? "Link copied!" : "Share article"}
        aria-label="Share article"
        className="relative flex items-center justify-center text-[#AEAEAE] transition-colors hover:text-black cursor-pointer"
      >
        <svg className="h-7 w-7" viewBox="0 0 20 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.4547 13.7376C15.6193 13.5966 15.7015 13.5261 15.7317 13.4422C15.7581 13.3685 15.7581 13.288 15.7317 13.2143C15.7015 13.1304 15.6193 13.0599 15.4547 12.9189L9.74571 8.02542C9.46249 7.78266 9.32088 7.66128 9.20098 7.65831C9.09679 7.65572 8.99726 7.7015 8.93141 7.78229C8.85564 7.87526 8.85564 8.06177 8.85564 8.4348V11.3297C7.41693 11.5814 6.10017 12.3104 5.12164 13.405C4.05482 14.5984 3.4647 16.1427 3.46387 17.7434V18.1559C4.17109 17.3039 5.05411 16.6149 6.05243 16.136C6.9326 15.7137 7.88405 15.4636 8.85564 15.3977V18.2217C8.85564 18.5947 8.85564 18.7813 8.93141 18.8742C8.99726 18.955 9.09679 19.0008 9.20098 18.9982C9.32088 18.9952 9.46249 18.8738 9.74571 18.6311L15.4547 13.7376Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {copied && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-black px-2 py-0.5 text-[11px] text-white whitespace-nowrap shadow">
            Copied!
          </span>
        )}
      </button>

      {/* LinkedIn Button */}
      <a
        href={getLinkedInShareUrl()}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
        className="flex items-center justify-center text-[#AEAEAE] transition-colors hover:text-[#0077B5] cursor-pointer"
      >
        <svg className="h-7 w-7" viewBox="32 0 26.15 26.15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M35.5654 0H54.5811C56.5502 0 58.1465 1.5963 58.1465 3.56543V22.5811C58.1465 24.5502 56.5502 26.1465 54.5811 26.1465H35.5654C33.5963 26.1465 32 24.5502 32 22.5811V3.56543C32 1.5963 33.5963 0 35.5654 0ZM40.7526 21.0809C40.856 20.9772 40.9139 20.8366 40.9135 20.6902V10.8437C40.9135 10.539 40.6669 10.2918 40.3623 10.291H38.0136C37.7084 10.291 37.4609 10.5384 37.4609 10.8437V20.6902C37.4605 20.8369 37.5186 20.9777 37.6224 21.0814C37.7261 21.1851 37.8669 21.2432 38.0136 21.2428H40.3623C40.5087 21.2428 40.6492 21.1846 40.7526 21.0809ZM39.1874 9.35913C37.9567 9.35913 36.959 8.36145 36.959 7.13074C36.959 5.90003 37.9567 4.90234 39.1874 4.90234C40.4181 4.90234 41.4158 5.90003 41.4158 7.13074C41.4158 8.36145 40.4181 9.35913 39.1874 9.35913ZM53.0419 21.0879C53.1373 20.9925 53.1907 20.863 53.1903 20.7282L53.1873 15.9683L53.1873 15.9277C53.1875 13.8485 53.1878 10.127 49.1762 10.127C47.3534 10.127 46.4992 10.7925 45.9228 11.6586V10.7999C45.9228 10.5193 45.6953 10.2919 45.4147 10.2919H42.9753C42.8407 10.2919 42.7116 10.3454 42.6166 10.4408C42.5216 10.5361 42.4684 10.6653 42.4688 10.7999V20.7341C42.4684 20.8687 42.5216 20.998 42.6166 21.0933C42.7116 21.1886 42.8407 21.2422 42.9753 21.2422H45.4147C45.6924 21.2381 45.9154 21.0118 45.9153 20.7341V15.4068C45.9777 14.6907 46.2942 13.0967 47.8466 13.0967C49.7031 13.0967 49.6664 15.0957 49.651 15.9381C49.6497 16.005 49.6486 16.0646 49.6486 16.1154V20.7282C49.6482 20.863 49.7016 20.9925 49.797 21.0879C49.8924 21.1832 50.0218 21.2366 50.1567 21.2362H52.6822C52.8171 21.2366 52.9466 21.1832 53.0419 21.0879Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
}
