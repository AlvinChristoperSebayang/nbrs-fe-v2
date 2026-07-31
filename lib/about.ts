import { craftFetchEntryDeep } from "./craft-deep-fetch";

// Confirmed in the Craft CP: section handle "aboutUs" (Singles type),
// entry's own slug field is "about", but the section's configured URI is
// "about-us" (site settings). Since Singles have exactly one entry, we skip
// slug/uri filtering entirely and just query by section — avoids the
// slug-vs-uri mismatch altogether.
//
// This still currently returns nothing: `entries(section: "aboutUs")` is
// empty and `aboutUs_Entry` is an unregistered type on this GraphQL
// token/schema — confirmed via a direct `entry(id: "33148")` lookup
// returning null even with no filters. That's a Craft GraphQL schema
// permissions issue (Settings -> GraphQL -> Schemas), not a code problem.
const ABOUT_PAGE_SECTION = "aboutUs";

export async function getAboutPageRaw(): Promise<unknown> {
  return craftFetchEntryDeep(ABOUT_PAGE_SECTION);
}
