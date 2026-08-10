# NBRS Navigation Integration Strategy

Status: planning only. No Craft schema, Navigation content, or FE code is changed by this document.

## 1. Current state

### Backend

The Craft Navigation plugin is already exposed through the staging Public GraphQL schema. The verified query field is `navigationNodes`, not the legacy `nodes` field.

Current query shape:

```graphql
query MainMenu {
  menu: navigationNodes(navHandle: "menu", level: 1) {
    title
    url
    classes
    children {
      title
      url
      classes
    }
  }
}
```

The current response proves that the Navigation GraphQL permission and `menu` handle are working. The response is not yet a 1:1 match for the FE menu contract.

### Frontend

`components/layout/Header.tsx` currently owns a hard-coded `NAV_STRUCTURE` with this contract:

```ts
type NavItem = {
  id: string;
  label: string;
  href: string;
  subItems?: {
    label: string;
    href: string;
  }[];
};
```

The Header is a client component, but `app/layout.tsx` is a server component. Navigation should therefore be fetched in the server layout and passed to the Header as a prop.

## 2. Compatibility audit

The current backend tree and FE tree differ in more than naming:

| Area | FE expectation | Current backend response | Impact |
|---|---|---|---|
| Top-level groups | Purpose, People, Sectors, Practices, Projects, News, Contact | Projects, Capabilities, People, About, News & Awards, Contact | Direct assignment changes grouping and order |
| Parent URLs | Every `NavItem` has an `href` | Passive parents such as Capabilities, People, and About have `url: null` | FE cannot safely render or navigate those parents |
| Purpose | Contains About, Sustainability, Social Sustainability, RAP, Awards, Insights, Design Approach | About is separate; Research is under Capabilities; several FE items are missing | Requires content alignment, not only a query change |
| People URLs | `/people/team`, `/people/culture`, `/people/careers`, `/people/envision-student-program` | `/our-people`, `/careers-life-at-nbrs`, `/envision` | Existing links would point to stale or different routes |
| Sectors and Practices | Separate top-level groups | Sectors and Disciplines are nested under Capabilities | Requires reordering/moving nodes or a brittle FE transformation |
| Nesting depth | One submenu level in the Header | Sectors/Disciplines contain another category level | The GraphQL query must request nested `children` if the current tree is inspected |
| Labels | FE labels are UI copy | Backend labels differ (`News & Awards`, `Our leaders`, etc.) | Label-based mapping would be fragile |
| Classes | FE currently ignores classes | Backend can return values such as `text-bold` | Optional metadata can be preserved, but must not drive grouping |

The direct response-to-`NAV_STRUCTURE` approach is therefore not safe. In particular, the FE should not infer `/about`, `/people`, `/sectors`, or `/practices` from the first child of a passive node.

## 3. Recommended source-of-truth strategy

The desired FE menu should become the canonical tree in the existing Craft Navigation `menu`.

This requires changing Navigation content only; it does not require a new Craft field, entry type, channel, migration, or GraphQL type.

Target tree:

```text
Purpose (/about)
├── About NBRS (/about)
├── Sustainability (/sustainability)
├── Social Sustainability (/social-sustainability)
├── RAP (/rap)
├── Awards (/awards)
├── Insights (/research)
└── Design Approach (/design-approach)

People (/people)
├── Our Leaders (/people/team)
├── Culture (/people/culture)
├── Careers (/people/careers)
└── Envision Student Partnerships (/people/envision-student-program)

Sectors (/sectors)
├── Education (/sectors/education)
├── Heritage (/sectors/heritage)
├── Wellness (/sectors/wellness)
├── Community (/sectors/community)
└── Secure Spaces (/sectors/secure-spaces)

Practices (/practices)
├── Architecture (/practices/architecture)
├── Landscape Architecture (/practices/landscape-architecture)
└── Interior Design (/practices/interior-design)

Projects (/projects)
News (/news)
Contact Us (/contact)
```

All target routes currently exist in the FE app. Before deleting or hiding an old Navigation node, verify that any external/legacy URL does not need a redirect or another consumer.

### Why align the CMS tree instead of transforming it in FE?

- The CMS remains the single source of truth for labels, order, and links.
- Editors can understand and maintain the same structure that users see.
- The FE adapter stays small and does not depend on title matching such as `About` or `Capabilities`.
- Other clients can consume the same canonical menu.

If the backend tree cannot be changed because another client depends on it, the fallback option is a temporary FE mapping layer. That mapping must be explicit and tested, but it is not recommended as the permanent design because it would have to split Capabilities, merge About/Research, repair null URLs, and inject missing items.

## 4. GraphQL query contract

After the CMS tree is aligned, use one global Navigation query. Request the stable UID and the fields needed by the FE adapter:

```graphql
query MainMenu {
  menu: navigationNodes(navHandle: "menu", level: 1) {
    uid
    title
    url
    classes
    children {
      uid
      title
      url
      classes
      children {
        uid
        title
        url
        classes
      }
    }
  }
}
```

The extra nested level is useful while auditing the current tree. Once the canonical tree contains only one submenu level, the deepest `children` selection can be removed to reduce the payload.

The FE normalizer should use the UID as the React key, preserve relative URLs, and return a page-oriented type:

```ts
type RawNavigationNode = {
  uid: string;
  title: string;
  url: string | null;
  classes: string | null;
  children: RawNavigationNode[];
};

type NavItem = {
  id: string;
  label: string;
  href: string;
  subItems?: {
    label: string;
    href: string;
  }[];
};
```

The normalizer should not silently convert a null parent URL into the first child URL. A null URL is a CMS data issue that should be reported or handled as a non-link item until the Navigation content is corrected.

## 5. FE fetching architecture

Implement a server helper such as `lib/navigation.ts` and fetch it from `app/layout.tsx`:

```text
Craft navigationNodes
        ↓
server getNavigation()
        ↓
normalize to NavItem[]
        ↓
RootLayout passes navigation to Header
        ↓
Header manages only open/active UI state
```

Do not fetch Navigation directly from the browser. Navigation is global shell data and should not be requested separately by every page.

The current static `NAV_STRUCTURE` should temporarily be renamed or treated as `FALLBACK_NAV_STRUCTURE`. It remains available when the GraphQL request fails, returns no usable nodes, or the backend content is still being aligned.

## 6. Cache and freshness strategy

Recommended first implementation:

```ts
next: {
  revalidate: 60,
  tags: ["navigation"],
}
```

Behavior:

- Client-side route changes reuse the root layout, so Navigation is not fetched for every page transition.
- A hard refresh uses Next's Data Cache when the cached response is still fresh.
- After 60 seconds, the next request can refresh Navigation from Craft.
- A GraphQL failure does not blank the Header; the static fallback is used.

The current `craftFetch` helper supports `revalidate` but not tags yet. Adding tag support is an FE-only implementation task and should be done when this plan is executed.

### Immediate invalidation

For a menu change that must be visible without waiting for the TTL, add a protected FE revalidation endpoint or a deployment/manual command that calls:

```ts
revalidateTag("navigation", "max");
```

The preferred future flow is:

```text
Editor saves Navigation in Craft
        ↓
Craft webhook or secure manual trigger
        ↓
FE revalidateTag("navigation", "max")
        ↓
Next visit/refresh receives the new menu
```

Cache invalidation updates the server cache; a Header already mounted in an open browser tab will normally show the new menu after a refresh or new route render. Live polling or WebSockets are unnecessary for this infrequently changing content.

## 7. Safe execution sequence

### Phase A — read-only preparation

1. Confirm the target tree and route URLs.
2. Confirm whether any other client consumes the existing `menu` tree.
3. Save the current Navigation response as a before-state reference.
4. Confirm all target FE routes and any legacy redirects.

### Phase B — Craft content alignment (requires backend implementation approval)

1. Edit the existing `menu` Navigation in Craft.
2. Reorder and rename nodes to match the target tree.
3. Set explicit parent URLs.
4. Link existing Entry/Category nodes where appropriate; use custom URLs only when no suitable element exists.
5. Do not change or delete unrelated Craft fields, entry types, or GraphQL schema.
6. Verify the query response and save a post-change reference.

### Phase C — FE integration

1. Add the Navigation GraphQL query and `RawNavigationNode` type.
2. Add the normalizer in `lib/navigation.ts`.
3. Make `app/layout.tsx` fetch Navigation server-side.
4. Pass the normalized menu into `Header`.
5. Keep the existing static tree as fallback.
6. Add `revalidate` and Navigation cache tagging.

### Phase D — switch-over

1. Compare the rendered FE menu against the target tree.
2. Test desktop and mobile menu behavior.
3. Verify parent navigation, submenu navigation, order, labels, and external/legacy links.
4. Only after stable QA, stop treating the hard-coded tree as the primary source.

## 8. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Stale menu after CMS edit | 60-second TTL initially; add tag invalidation for immediate updates |
| GraphQL outage blanks the Header | Keep a static fallback and log the fetch error server-side |
| Passive parent has no URL | Correct the Navigation content; do not guess a child URL in FE |
| Old links are removed | Audit legacy consumers and add redirects before removing nodes |
| CMS tree differs between environments | Verify the `menu` handle, site, order, and node URLs on staging and live |
| Nested categories create a large query | Request one extra level only during audit; reduce the query after alignment |
| Label-based FE mapping breaks after an editor rename | Use the canonical CMS tree and UID-based keys; avoid title matching |

## 9. Acceptance checklist

- [ ] `navigationNodes(navHandle: "menu")` returns the canonical top-level order.
- [ ] Every FE top-level item has the intended URL.
- [ ] Every submenu link matches an existing FE route or approved external/legacy URL.
- [ ] No required FE item is missing from the CMS tree.
- [ ] Header works when the GraphQL request succeeds.
- [ ] Header falls back safely when GraphQL fails or returns empty data.
- [ ] Client-side navigation does not issue a Navigation request for every page.
- [ ] Hard refresh receives updated Navigation after TTL or explicit revalidation.
- [ ] Desktop and mobile menu behavior remains unchanged.
- [ ] `npx tsc --noEmit` and `git diff --check` pass after implementation.

## 10. Decision gate before execution

Before changing Craft Navigation content, confirm:

1. The target tree above is the desired canonical menu.
2. Legacy nodes and links may be removed, redirected, or must remain available.
3. The 60-second TTL is acceptable, or an immediate webhook/manual revalidation is required.
