# Technical SEO Codebase Audit

**Date:** 2026-08-20  
**Source:** `/Users/mangcodingmangcoding/www/nbrs-fe`  
**Stack:** Next.js 16.2.11, React 19, Craft GraphQL  
**Method:** Static source audit of every `app/**/page.tsx` route, root layout and route metadata files, plus JSX/TSX components for metadata, landmarks, headings, links, image delivery, JSON-LD, and Craft SEO mapping. A read-only Craft GraphQL request verified the five affected Single entry types.

## Summary

Routes inspected: **29** `page.tsx` routes, plus error/not-found routes.  
Page metadata coverage: **29/29** routes export `metadata` or `generateMetadata`.  

Critical: **0** · High: **1** · Medium: **4** · Low: **1** · Info: **0**

The codebase has a sound metadata foundation: a shared `createPageMetadata()` helper, a root `metadataBase`, indexability control, canonical URLs, Open Graph/Twitter metadata, icons, and Organization/WebSite JSON-LD. The findings below are specific implementation gaps, not copywriting recommendations.

## Priority Findings

### DUPLICATE_RAP_CANONICAL — identical RAP document is exposed at two self-canonical URLs

**Severity:** HIGH  
**Confidence:** High  
**Runtime:** UNKNOWN — both routes were not re-fetched during this source-wide scan.  
**Implementation:** FAIL  
**Data contract:** N/A

**Evidence**

- `/rap` imports and renders exactly the page component at `/news/reflect-reconciliation-action-plan`.
- Each route emits a different self-referencing canonical via `createPageMetadata()`.
- Both URLs are included in `sitemap.xml` when indexing is enabled.

**Source**

- `app/rap/page.tsx:1-8`
- `app/news/reflect-reconciliation-action-plan/page.tsx:9-13`
- `app/sitemap.ts:25,40`

**Technical impact**

Search engines receive two indexable URLs for the same primary content and two contradictory self-canonicals. This splits canonical signals and may cause the less desired URL to be indexed.

**Recommendation**

Choose one canonical URL (the news URL is the natural current choice). Make `/rap` a permanent redirect to it and remove `/rap` from the sitemap. If `/rap` must remain accessible without redirecting, emit the news URL as its canonical and omit `/rap` from the sitemap.

### PROJECTS_NESTED_MAIN — Projects page nests a second main landmark inside the root main

**Severity:** MEDIUM  
**Confidence:** High  
**Runtime:** FAIL by implementation structure  
**Implementation:** FAIL  
**Data contract:** N/A

**Evidence**

- The root layout wraps every route in the document's primary `<main>`.
- Both the normal and CMS-error branches of `/projects` render another `<main>`.

**Source**

- `app/layout.tsx:100-102`
- `app/projects/page.tsx:51-60`
- `app/projects/page.tsx:97-131`

**Technical impact**

Nested main landmarks create an invalid document-outline/landmark model for assistive technology and makes the route inconsistent with all other pages. It is not an indexing blocker, but it is a real semantic defect.

**Recommendation**

Replace the route-level `<main>` elements with `<article>` (preferred for this content page) or `<div>`. Keep the root layout as the sole page `<main>`.

### SINGLE_SEO_QUERY_GAP — five Craft Singles expose SEO fields but their frontend queries do not request them

**Severity:** MEDIUM  
**Confidence:** High  
**Runtime:** PASS with hero/static fallback  
**Implementation:** FAIL  
**Data contract:** `GRAPHQL_QUERY_GAP` — fields were verified in Craft's public GraphQL schema and current values are empty.

**Affected routes and helpers**

| Route | Helper query lacking SEO fields | Current metadata source |
| --- | --- | --- |
| `/about` | `lib/about.ts` | hero title/description/image |
| `/design-approach` | `lib/design-approach.ts` | hero title/description/image |
| `/social-responsibility` | `lib/social-responsibility.ts` | hero title/description/image |
| `/practices` | `lib/practices-page.ts` | hero title/description/image |
| `/sectors` | `lib/sectors-page.ts` | hero title/description/image |

**Evidence**

- All five page queries omit `seoPageTitle`, `seoMetaDescription`, and `seoImage { url width height title }`.
- Their respective `generateMetadata()` functions therefore cannot pass `cmsTitle` or an editor-selected SEO image to the shared helper.
- A direct read-only Craft GraphQL request against all five entry types accepted the fields and returned `seoPageTitle: null`, `seoMetaDescription: null`, and `seoImage: []`. The fields are available; their current CMS values are simply empty.

**Source**

- `lib/about.ts:112-145`, `app/about/page.tsx:10-12`
- `lib/design-approach.ts:47-58`, `app/design-approach/page.tsx:10-12`
- `lib/social-responsibility.ts:34-47`, `app/social-responsibility/page.tsx:10-12`
- `lib/practices-page.ts:60-81`, `app/practices/page.tsx:29-31`
- `lib/sectors-page.ts:32-55`, `app/sectors/page.tsx:7-9`

**Technical impact**

The fallback is valid today, so no meta tag is empty. However, editing any of these Craft SEO fields will not affect the rendered metadata, breaking the established CMS-to-FE SEO contract.

**Recommendation**

For each helper, add:

```graphql
seoPageTitle
seoMetaDescription
seoImage { url width height title }
```

Map them through the helper's typed result, then call `createPageMetadata()` with `cmsTitle`, `description`, and `image`. Preserve the existing hero values as the fallback only.

### IMAGE_INTRINSIC_SIZE_GAP — shared image component does not emit intrinsic dimensions

**Severity:** MEDIUM  
**Confidence:** Medium  
**Runtime:** UNKNOWN site-wide; homepage evidence previously found 22 image elements without `width` and `height`.  
**Implementation:** FAIL as a reusable-image robustness issue  
**Data contract:** `DATA_AVAILABLE_FRONTEND_MAPPING_GAP` for many Craft image transforms — URLs are requested, but dimensions are discarded before render.

**Evidence**

- `ResponsiveImage` ultimately emits raw `<img>` elements without `width`, `height`, or a `sizes` contract.
- Most current users reserve space with CSS (`aspect-*`, fixed height, or absolute positioning), so this is not proof of CLS on every route. It remains fragile for every future caller without such a wrapper.
- Some direct image usages, including the Contact hero, also have no intrinsic dimensions.

**Source**

- `components/ui/ResponsiveImage.tsx:24-40`
- `app/contact/page.tsx:16-23`
- Example Craft fixed-size crops: `lib/homepage.ts:127-173`

**Technical impact**

Without an intrinsic aspect ratio, the browser cannot reserve image space independently of CSS layout. The raw-image pattern also misses the responsive sizing contract available through `next/image` or equivalent explicit `<picture>` sizing.

**Recommendation**

Extend the shared image data type to retain width/height (or the selected crop's known dimensions), then emit them on `<img>`. Where a component uses CSS fill/cropping, establish the parent ratio and pass an accurate `sizes` value. Migrating selected LCP/card imagery to `next/image` is appropriate where its optimizer and remote-pattern configuration fit; raw `<img>` itself is not automatically an error.

### HERO_EAGER_IMAGE_FANOUT — every homepage hero slide competes for high fetch priority

**Severity:** MEDIUM  
**Confidence:** High for implementation, Low for measured user impact  
**Runtime:** PASS functionally; no production-like LCP measurement was available  
**Implementation:** FAIL  
**Data contract:** N/A

**Evidence**

- The hero maps every slide and passes `priority` unconditionally.
- The shared component translates `priority` into `loading="eager"` and `fetchPriority="high"`.
- The homepage response inspected in the prior route audit contained six high-priority background hero images, while the visual carousel also renders slide images.

**Source**

- `components/hero/HeroSlider.tsx:44-54`
- `components/ui/ResponsiveImage.tsx:24-31`

**Technical impact**

Multiple high-priority hero requests compete for initial bandwidth and can delay the actual LCP resource. This is a performance risk, not a measured Core Web Vitals failure.

**Recommendation**

Preload/prioritize only the actual first-view LCP image. Defer the remaining slides, or render only the active background slide until interaction/autoplay requires the next one. Verify the result with a production-like browser/Lighthouse run before and after the change.

### FIELDSET_LEGEND_MISSING — checkbox groups do not use a semantic legend

**Severity:** LOW  
**Confidence:** High  
**Runtime:** FAIL semantically  
**Implementation:** FAIL  
**Data contract:** N/A

**Evidence**

- Contact form checkbox groups correctly use `fieldset`, but their group label is a generic `span`, not `legend`.

**Source**

- `components/contact/ContactForm.tsx:42-44`

**Technical impact**

The group name is not programmatically associated with the checkbox set for assistive technology. This is an accessibility semantic issue with negligible direct ranking impact.

**Recommendation**

Replace the label span with `<legend className="...">{legend}</legend>` and retain the current visual styling.

## Performance

No lab performance score is reported. The local browser runner was unavailable, so no LCP/CLS/TBT measurements were collected. The image findings above are implementation-backed risks, not field or lab Core Web Vitals claims.

## Verified / Not a Problem

- **Metadata coverage:** all 29 normal page routes have a `metadata` export or `generateMetadata()`; there is no route inheriting the root homepage canonical by accident.
- **Dynamic detail metadata:** News, Projects, People, Research, Practices, and Sectors detail routes derive metadata from their route data rather than hard-coded template metadata.
- **Root semantics:** one root `<main>` wraps all route content; the nested main issue is isolated to `/projects`.
- **Navigation semantics:** the site header uses `<header>` and `<nav>`, internal navigation predominantly uses `next/link`, and no generic clickable `div`/`span` navigation was found.
- **Core SEO metadata foundation:** `lib/seo.ts` supplies canonical, robots, Open Graph (including image dimensions where available), Twitter card metadata, static fallbacks, and CMS-title handling that avoids the root title template duplicating the brand.
- **Indexing controls:** `app/robots.ts` and `app/sitemap.ts` consistently depend on `NEXT_PUBLIC_ALLOW_INDEXING`; disabled indexing disallows crawling and returns an empty sitemap as intended.
- **Structured data:** root layout emits valid JSON-LD for `Organization` and `WebSite`.
- **Responsive duplicate headings:** some desktop/mobile variants produce duplicate text in static source, but they are CSS-hidden variants of the same responsive UI; this is not reported as a heading-structure defect.

## Engineering QA Note (outside direct SEO scope)

`npm run lint` currently exits with one error: `components/ui/GlobalLoading.tsx:15` synchronously sets state inside an effect. This can contribute to unnecessary client work on navigation, but it is not by itself a crawlability or metadata issue. The lint run also reports raw-image warnings, consistent with the image findings above.

## Suggested Fix Order

1. Resolve the `/rap` duplicate URL and sitemap entry.
2. Replace the nested `<main>` in `/projects`.
3. Complete the five Single-page Craft SEO queries and mappings.
4. Harden `ResponsiveImage`, then tune hero image priorities using a production-like performance measurement.
5. Apply the minor `legend` semantic correction and address the lint error separately.

## Post-audit Implementation Update

**Updated:** 2026-08-20

- `IMAGE_INTRINSIC_SIZE_GAP` is **RESOLVED for the current FE image inventory**. `ResponsiveImage` now emits intrinsic dimensions from either Craft transform URLs, original Craft asset metadata (for `WIDTHxAUTO` transforms), or the static-asset dimension map. The remaining direct `<img>` callers now also have explicit dimensions. Runtime verification on `/`, `/about`, `/news`, `/contact`, and one News detail route found **0 rendered images without both `width` and `height`**.
- `HERO_EAGER_IMAGE_FANOUT` is **RESOLVED** for the homepage implementation. Runtime verification on an isolated Next.js instance found one `fetchPriority="high"`/`loading="eager"` image (the first hero background), while the remaining hero slides and the below-fold CTA are lazy-loaded. The change has typechecked successfully; no lab LCP metric was collected.
