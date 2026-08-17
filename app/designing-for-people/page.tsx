import { redirect } from "next/navigation";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  pathname: "/people",
  title: "People | Designing for People",
  noIndex: true,
});

export default function DesigningForPeopleRedirect() {
  redirect("/people");
}
