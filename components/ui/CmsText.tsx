import React from "react";
import { formatCmsHtml } from "@/lib/text";

export type CmsTextProps = {
  content?: string | null | React.ReactNode;
  as?: any;
  className?: string;
  [key: string]: any;
};

export function CmsText({
  content,
  as: Component = "span",
  className,
  ...props
}: CmsTextProps) {
  if (content === null || content === undefined || content === "") {
    return null;
  }

  if (typeof content !== "string") {
    return (
      <Component className={className} {...props}>
        {content}
      </Component>
    );
  }

  const html = formatCmsHtml(content);

  return (
    <Component
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
}
