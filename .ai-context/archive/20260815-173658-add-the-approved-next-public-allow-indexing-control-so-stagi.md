# Current Task

## Session continuity

- Ledger schema: 1
- Last snapshot: not captured
- Last revalidated: not validated
- Baseline commit: unavailable
- Working tree at validation: unavailable
- Validation result: required before reusing a previous-session ledger

## Task lifecycle

- Task ID: SEO-STAGING-NOINDEX-001
- Status: completed
- Previous task: SEO-FE-001
- Relationship: follow-up
- Resume target: none
- Triggered by: user-approved targeted Preflight

## Work state

- Work type: follow-up
- Priority: high
- Lane: frontend
- Queue approval: approved
- Execution approval: required
- Discovered during: none
- Blocks: none
- Blocked by: none
- Partially blocked by: none
- Next exact action: Implement NEXT_PUBLIC_ALLOW_INDEXING in the shared helper and route generators, then verify separate production and staging builds.
- Source reference: Local code inspection and bundled Next.js metadata, robots, sitemap, and proxy documentation

## Scope

- Goal: Add the approved NEXT_PUBLIC_ALLOW_INDEXING control so staging emits noindex/nofollow, blocks crawling, and does not publish sitemap URLs while production remains indexable.
- Type: implement
- Mode: low
- Allowed modules:
- Explicit exclusions:

## Mode budget

- Primary modules: 1 (manual confirmation required)
- Implementation files read: 0
- Tests read: 0
- Planned implementation writes: 0 (manual)
- Actual implementation writes: 33
- Actual test writes: 0
- Budget state: escalation-required
- Expansion approval: required
- Recommendation: Pause and request approval to switch to balanced before further read/write expansion.
## Evidence and checkpoint

- Reproduction/evidence:
- Confirmed facts:
- Root cause or hypothesis:
- Next verification:

## Read ledger

| Path | Purpose / symbols | Read state |
|---|---|---|

Read-state meaning:

- `current`: saved fingerprint matches the current file.
- `stale`: file differs from the last verified fingerprint.
- `re-read`: relevant content was refreshed in this session; snapshot before handoff.
- `session-unverified`: inherited without a usable fingerprint.
- `missing`: path no longer exists.
- `unknown`: freshness cannot be established safely.

## Budget expansion log

| Trigger | Additional context/change | Reason | Recommendation | User decision |
|---|---|---|---|---|

## Change plan

- Files allowed to change:
- Contracts to preserve:
- Verification plan:

## Handoff

- Remaining verification: none recorded
- Next planned task: none
- Resume target: none
- Blocking decisions: none
- Preconditions for next task: none recorded

## Completion

- Result: Added NEXT_PUBLIC_ALLOW_INDEXING control to global metadata, page metadata, robots, sitemap, and robots proxy. A false value makes staging noindex/nofollow and suppresses sitemap URLs; the default remains indexable.
- Tests/checks: Production-default and staging-noindex production builds passed. HTTP verification confirmed production index/follow with sitemap URLs and staging noindex/nofollow, Disallow: /, empty sitemap, and staging canonical.
- Final budget result:
- Remaining risk: Vercel environment values and deployment remain user-managed. npm run lint still has an unrelated existing GlobalLoading synchronous setState error.
