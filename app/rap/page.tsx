import RapPage from "../news/reflect-reconciliation-action-plan/page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  pathname: "/rap",
  title: "Reflect Reconciliation Action Plan",
  description: "NBRS Reflect Reconciliation Action Plan",
});
export const revalidate = 60;
export default RapPage;
