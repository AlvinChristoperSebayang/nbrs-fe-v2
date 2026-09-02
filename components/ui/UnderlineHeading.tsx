import React from "react";
import { normalizeNewlines } from "@/lib/text";

export type UnderlineHeadingProps = {
  title?: React.ReactNode;
  showDivider?: boolean;
  borderColor?: string;
  className?: string;
  singleLine?: boolean;
};

export function getTitleLinesForLength(words: string[], maxLen: number): string[] {
  const lines: string[] = [];
  let currentWords: string[] = [];
  let currentLength = 0;

  for (const word of words) {
    const wordLength = word.length;
    const nextLength = currentLength === 0 ? wordLength : currentLength + 1 + wordLength;

    if (nextLength <= maxLen || currentWords.length === 0) {
      currentWords.push(word);
      currentLength = nextLength;
    } else {
      lines.push(currentWords.join(" "));
      currentWords = [word];
      currentLength = wordLength;
    }
  }

  if (currentWords.length > 0) {
    lines.push(currentWords.join(" "));
  }

  // Prevent single-word orphan line if merging with previous word fits
  if (lines.length > 1) {
    const lastLine = lines[lines.length - 1];
    const lastLineWords = lastLine.split(/\s+/).filter(Boolean);
    if (lastLineWords.length === 1) {
      const prevLineWords = lines[lines.length - 2].split(/\s+/).filter(Boolean);
      // Only pop if prevLine has more than 1 word AND leaving prevLine doesn't leave a single letter like "A"
      if (prevLineWords.length > 2 || (prevLineWords.length === 2 && prevLineWords[0].length > 3)) {
        const potentialMovedWord = prevLineWords[prevLineWords.length - 1];
        if (potentialMovedWord.length + 1 + lastLine.length <= maxLen + 2) {
          prevLineWords.pop();
          lines[lines.length - 2] = prevLineWords.join(" ");
          lines[lines.length - 1] = `${potentialMovedWord} ${lastLine}`;
        }
      }
    }
  }

  return lines;
}

function splitLinesToMaxLen(rawLines: string[], maxLen: number): string[] {
  const result: string[] = [];
  for (const rawLine of rawLines) {
    const words = rawLine.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) continue;
    const split = getTitleLinesForLength(words, maxLen);
    result.push(...split);
  }
  return result;
}

export function renderLinesBlock(
  lines: string[],
  showDivider = true,
  borderColor = "border-white"
) {
  if (!showDivider) {
    if (lines.length > 1) {
      return (
        <span className="inline-flex flex-col items-start">
          {lines.map((line, i) => (
            <span
              key={i}
              className="block leading-[1.05]"
              dangerouslySetInnerHTML={{ __html: line }}
            />
          ))}
        </span>
      );
    }
    return <span dangerouslySetInnerHTML={{ __html: lines[0] }} />;
  }

  // Single line: underline the ENTIRE line from first character to last character
  if (lines.length <= 1) {
    return (
      <span
        className={`inline-block border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] ${borderColor} pb-1 sm:pb-2 leading-[1.05] whitespace-nowrap`}
        dangerouslySetInnerHTML={{ __html: lines[0] }}
      />
    );
  }

  // Multiple lines: Top lines are regular blocks; ONLY the bottom line has border-b covering its entire length
  const allExceptLast = lines.slice(0, -1);
  const lastLine = lines[lines.length - 1];

  return (
    <span className="inline-flex flex-col items-start">
      {allExceptLast.map((line, idx) => (
        <span
          key={`${line}-${idx}`}
          className="block leading-[1.05]"
          dangerouslySetInnerHTML={{ __html: line }}
        />
      ))}
      <span
        className={`mt-1 inline-block border-b-[4px] sm:border-b-[5px] lg:border-b-[6px] ${borderColor} pb-1 sm:pb-2 leading-[1.05]`}
        dangerouslySetInnerHTML={{ __html: lastLine }}
      />
    </span>
  );
}

export function renderTitleWithUnderline(
  title: React.ReactNode,
  showDivider: boolean = true,
  borderColor: string = "border-white",
  singleLine: boolean = false
) {
  if (typeof title !== "string") {
    return title;
  }

  const normalized = normalizeNewlines(title).trim();
  if (!normalized) return null;

  // If explicit single line requested OR 3 words or fewer within 22 chars without explicit \n
  const words = normalized.split(/\s+/).filter(Boolean);
  if (singleLine || (!normalized.includes("\n") && words.length <= 3 && normalized.length <= 22)) {
    return renderLinesBlock([normalized], showDivider, borderColor);
  }

  const rawLines = normalized.includes("\n")
    ? normalized.split("\n").map((l) => l.trim()).filter(Boolean)
    : [normalized];

  const mobileLines = splitLinesToMaxLen(rawLines, 16);
  const desktopLines = splitLinesToMaxLen(rawLines, 30);

  if (JSON.stringify(mobileLines) === JSON.stringify(desktopLines)) {
    return renderLinesBlock(desktopLines, showDivider, borderColor);
  }

  return (
    <>
      <span className="sm:hidden inline-flex flex-col items-start">
        {renderLinesBlock(mobileLines, showDivider, borderColor)}
      </span>
      <span className="hidden sm:inline-flex flex-col items-start">
        {renderLinesBlock(desktopLines, showDivider, borderColor)}
      </span>
    </>
  );
}

export function UnderlineHeading({
  title,
  showDivider = true,
  borderColor = "border-white",
  className = "",
  singleLine = false,
}: UnderlineHeadingProps) {
  if (!title) return null;

  return (
    <span className={className}>
      {renderTitleWithUnderline(title, showDivider, borderColor, singleLine)}
    </span>
  );
}
