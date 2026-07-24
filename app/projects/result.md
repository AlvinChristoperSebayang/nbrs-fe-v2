# Tutorial: GraphQL untuk halaman Projects (`/projects`)

Dokumen ini memandu FE & CMS: dari tampilan Figma → query Craft 5 yang siap diuji di GraphQL explorer.

| | |
|---|---|
| **Context** | [`context.md`](./context.md) |
| **Figma** | [NBRS — Website Breakdown](https://www.figma.com/design/gIq3UIZmdp8AjqGLKwnldN/NBRS---Website-Breakdown?node-id=1838-5152) |
| **API lokal** | `http://nbrs-update.test/api` · GraphiQL: `/admin/graphql` |
| **Diuji** | 2026-07-23 (query + gap sample di `/api`) |
| **Gap vocab** | `OK` / `EMPTY` / `MISSING_FIELD` / `SHAPE_MISMATCH` / `OUT_OF_SCOPE` — lihat [`doc/figma/README.md`](../README.md) |

---

## 1. Apa yang kita bangun

Halaman **Projects**: banner + filter Sector/Practice + grid kartu project.  
Footer ikut di Figma tapi **tidak digabung** ke query halaman ini (lihat §6).

### Overview halaman (full)

![Halaman Projects lengkap](./assets/01-page-full.png)

### Banner

![Banner Projects](./assets/02-banner.png)

Sumber data: single Craft **`latestProjects`** (URI `projects`) → `pageHeading` / `pageSubheading`.  
Live sample: `pageHeading = "Projects"`. Hero image Figma → lihat gap table §5 (`MISSING_FIELD`).

### Filter + grid

![Filter Sector/Practice dan grid project](./assets/04-filters-and-grid.png)

| UI Figma | Craft |
|---|---|
| Chip **Sectors** | Category group `sector` |
| Chip **Practices** | Category group `discipline` (`catDiscipline`) |
| Kartu: gambar | `thumbnail` |
| Kartu: judul | `proHdrHeading` |
| Kartu: subtitle | `proHdrSubheading` |
| Kartu: meta Sector / Practice | `catSector` / `catDiscipline` |
| “Read more” | `slug` → `/projects/{slug}` |

Kebutuhan query: filter kombinasi · pagination/load more · urutan **latest**.

### Footer (referensi saja — query terpisah)

![Footer global](./assets/03-footer.png)

Lihat strategi di §6. Endpoint referensi: [`doc/api/footer/`](../../api/footer/).

---

## 2. Query GraphQL (satu query — siap di GraphiQL)

Tempel query di bawah ke GraphiQL / explorer yang mengarah ke `http://nbrs-update.test/api`.

### Variables — tanpa filter (page 1)

```json
{
  "limit": 9,
  "offset": 0,
  "relatedToCategories": null
}
```

### Variables — filter kombinasi (Education **dan** Architecture)

```json
{
  "limit": 9,
  "offset": 0,
  "relatedToCategories": [
    { "group": "sector", "slug": ["education"] },
    { "group": "discipline", "slug": ["architecture"] }
  ]
}
```

### Variables — load more (page 2, size 9)

```json
{
  "limit": 9,
  "offset": 9,
  "relatedToCategories": null
}
```

### Query

```graphql
query ProjectsListing(
  $limit: Int = 9
  $offset: Int = 0
  $relatedToCategories: [CategoryRelationCriteriaInput]
) {
  page: entries(section: "latestProjects") {
    ... on latestProjects_Entry {
      id
      title
      slug
      pageHeading
      pageSubheading
      seoPageTitle
      seoMetaDescription
      seoImage {
        url
        width
        height
        title
      }
    }
  }

  sectors: categories(group: "sector") {
    ... on sector_Category {
      id
      title
      slug
      accentColor
    }
  }

  practices: categories(group: "discipline") {
    ... on discipline_Category {
      id
      title
      slug
      accentColor
    }
  }

  projects: entries(
    section: "projects"
    relatedToCategories: $relatedToCategories
    limit: $limit
    offset: $offset
    orderBy: "postDate DESC"
  ) {
    ... on projects_Entry {
      id
      slug
      uri
      postDate
      proHdrHeading
      proHdrSubheading
      thumbnail {
        url
        width
        height
        title
      }
      catSector {
        ... on sector_Category {
          id
          title
          slug
          accentColor
        }
      }
      catDiscipline {
        ... on discipline_Category {
          id
          title
          slug
          accentColor
        }
      }
    }
  }

  total: entryCount(
    section: "projects"
    relatedToCategories: $relatedToCategories
  )
}
```

String query yang sama dipakai di Next.js (`fetch` POST ke `/api` + `variables`). Tidak perlu contoh JS terpisah.

---

## 3. Cara pakai (tutorial singkat)

### Langkah 1 — Uji di GraphiQL

1. Buka GraphiQL Craft.  
2. Tempel query §2.  
3. Isi Variables (mulai dari `relatedToCategories: null`).  
4. Jalankan → cek `page`, `sectors`, `practices`, `projects`, `total`.

### Langkah 2 — Wiring FE

| Aksi UI | Variables |
|---|---|
| Load awal | `limit: 9`, `offset: 0`, `relatedToCategories: null` |
| Pilih chip Sector | `relatedToCategories: [{ group: "sector", slug: ["…"] }]`, `offset: 0` |
| Multi Sector | satu objek, `slug: ["education", "community"]` (OR dalam group) |
| Sector + Practice | dua objek (AND antar group), `offset: 0` |
| Load more | naikkan `offset` (`page * limit`), filter **sama** |
| Reset Filters | `relatedToCategories: null`, `offset: 0` |

`hasMore` di FE: `offset + projects.length < total`.

### Langkah 3 — Slug chip (CMS lokal)

| Label Figma (Sector) | Slug |
|---|---|
| Education | `education` |
| Community | `community` |
| Wellness | `wellness` |
| Secure Spaces | `secure-spaces` |

| Label Figma (Practice) | Slug Craft (`discipline`) |
|---|---|
| Architecture | `architecture` |
| Landscape Architecture | `landscape` |
| Interior Design | `interiors` |
| *(CMS juga punya)* Heritage | `heritage` |

---

## 4. Hasil uji lokal (referensi)

| Variables | `total` |
|---|---|
| Tanpa filter | **73** |
| Education ∨ Community | **43** |
| Education ∧ Architecture | **17** |

---

## 5. Gap table — Figma vs Craft vs response hidup

Status vocabulary (wajib): `OK` · `EMPTY` · `MISSING_FIELD` · `SHAPE_MISMATCH` · `OUT_OF_SCOPE`.

Diuji ulang `/api` saat perbaikan dokumen ini.

| Kebutuhan Figma | Sumber Craft | Sample response lokal | Status | Rekomendasi |
|---|---|---|---|---|
| Banner judul “PROJECTS” | `latestProjects.pageHeading` | `"Projects"` | **OK** | Pakai di FE (casing/styling di CSS) |
| Banner subteks (jika dipakai) | `pageSubheading` | `"Our principles at work"` | **OK** | Ada di CMS; Figma banner saat ini tidak menampilkan — opsional |
| Banner **hero image** | — (tidak ada di layout `latestProjects`) | Query tidak bisa minta field hero | **MISSING_FIELD** | Tambah Assets mis. `pageHeroImage` di entry type `latestProjects`. Bukan masalah “belum diisi”. |
| SEO image sebagai pengganti hero? | `seoImage` | `[]` | **EMPTY** | Field **ada**, value kosong di CP. Bisa diisi sementara, tapi semantik SEO ≠ hero — tetap usulkan field hero khusus. |
| Chip Sectors (Education, Community, …) | `categories(group: "sector")` | 4 item: education, community, wellness, secure-spaces | **OK** | Render chip dari `sectors` |
| Chip “Heritage” di baris **Sectors** (Figma) | Tidak ada di group `sector` | Sector list tanpa heritage | **SHAPE_MISMATCH** | Di Craft Heritage = `discipline` (`heritage`). Opsi: pindah chip ke Practices di Figma; atau FE map khusus ke `discipline`; atau buat category sector baru (perubahan data). |
| Chip Practices | `categories(group: "discipline")` | architecture, heritage, interiors, landscape | **OK** | Figma tampil 3 practice; CMS punya +heritage — tampilkan 4 atau hide heritage di FE |
| Card thumbnail | `thumbnail` | URL media ada (contoh Concord) | **OK** | Beberapa entry bisa `[]` → treat **EMPTY** per-item di FE |
| Card title | `proHdrHeading` | e.g. Burudyara… | **OK** | |
| Card subtitle | `proHdrSubheading` | e.g. Improving Support… | **OK** | |
| Card meta Sector | `catSector` | e.g. Wellness | **OK** | Label UI “Sector - …” di FE |
| Card meta Practice | `catDiscipline` | Architecture, Interiors, Landscape | **OK** | Label UI “Practice - …” (= discipline) |
| Link Read more | `slug` | e.g. `concord-forensic-mental-health` | **OK** | `/projects/{slug}` |
| Filter kombinasi + load more | `relatedToCategories` + `limit`/`offset` + `entryCount` | total 73 / filter AND 17 | **OK** | Sudah di query §2 |
| Footer | `doc/api/footer/` | — | **OUT_OF_SCOPE** | Query global terpisah (lihat §6) |
| Nav / hamburger | Navigation `nodes` | — | **OUT_OF_SCOPE** / BLOCKED schema | Jangan masuk page query |

### Ringkas keputusan banner image

```
Figma butuh hero image
        │
        ├─ Field hero di latestProjects?  → TIDAK  → Status: MISSING_FIELD
        │                                      → Rekomendasi: tambah pageHeroImage
        │
        └─ seoImage sebagai darurat?      → Field ADA, value []  → Status: EMPTY
                                               → Boleh isi di CP sementara, bukan solusi jangka panjang
```

---

## 5b. Banding `doc/fe-queries/projects/` (legacy FE)

Sumber: `doc/fe-queries/projects/query.craft3.graphql` + `doc/api/projects/`.

| Root / pola FE lama | Relate kebutuhan Figma? | Keputusan |
|---|---|---|
| `entries` → `latestProjects` (heading/SEO) | Ya (banner teks) | **adopt** (sudah di §2) |
| `casestudies` → semua projects + taxonomy card | Ya (grid) | **adopt** + upgrade filter/pagination (Figma butuh dinamis; FE lama fetch-all) |
| `discipline` / `sector` categories | Ya (chips) | **adopt** (alias `practices` / `sectors` di §2) |
| `help` (how-can-we-help) | Tidak di Figma page ini | **skip** / lazy nanti |
| `footer` | Ada di Figma full, exclude konteks | **global-elsewhere** → `doc/api/footer/` |
| `nodes` (nav) | Ada hamburger di Figma | **global-elsewhere** / BLOCKED sampai schema Navigation siap |
| Asset `@transform` url1..url7 | FE lama | **skip** di Craft 5 lokal — pakai `url` mentah; transform di CDN/FE bila perlu |

Tidak ada field “rahasia” di FE lama untuk hero banner `latestProjects` — FE lama juga tidak query gambar page listing. Gap hero = **baru dari Figma**, bukan regresi dari FE.

---

## 6. Arsitektur query: page vs footer (rekomendasi)

### Pertanyaan

Satu query besar per page (termasuk footer), atau pisah per section?

### Rekomendasi untuk NBRS (DX + performance)

**Pakai model hybrid:**

| Lapisan | Isi | Kapan di-fetch |
|---|---|---|
| **A. Global shell** (1× per session/layout) | Footer (+ nanti nav jika schema siap) | Layout Next (`getLayout` / `_app` / RSC layout) — **cache** agresif |
| **B. Page query** (per route) | Banner + filter chips + list/detail halaman | Per page load; **refetch** saat filter/pagination berubah |
| **C. Opsional lazy** | Blok jarang terlihat (mis. “how can we help”) | Setelah idle / di bawah fold |

Untuk **Projects** sekarang: query §2 = lapisan **B** saja. Footer = lapisan **A** (`doc/api/footer/`).

### Kenapa bukan “semua digabung” (pola FE lama)

| | Satukan page + footer | Pisah (rekomendasi) |
|---|---|---|
| Fetch awal | 1 request | 2 request (layout + page) — biasanya OK |
| Ganti filter / load more | Footer ikut ke-fetch ulang ❌ | Hanya page query yang refetch ✅ |
| Duplikasi footer di tiap page | Query berulang di banyak file ❌ | Satu module footer, reuse ✅ |
| Cache | Susah (campur data dinamis + statis) | Footer bisa `stale-while-revalidate` / ISR panjang |
| DX | File query raksasa | Query page fokus ke UI page |

Dua request di first paint **bukan masalah** jika keduanya paralel (`Promise.all`) dan footer di-cache. Bottleneck biasanya list project + gambar, bukan footer.

### Kapan boleh satukan?

- Prototype cepat / GraphiQL sekali jalan.  
- Page yang **hampir tidak punya** parameter dinamis dan traffic rendah.

### Yang dihindari

- Fetch ulang footer setiap load-more.  
- Menyalin blok footer GraphQL ke 18 page (seperti FE lama).  
- Memecah page menjadi terlalu banyak query kecil (banner, chips, list terpisah) tanpa kebutuhan — menambah waterfall.

**Ringkas goal Anda:** enak develop + performa bagus → **footer (global) terpisah & di-cache; page query satu dokumen per route, berisi section yang berubah bersama.**

---

## 7. Checklist FE

- [ ] Banner dari `page.pageHeading` (+ image setelah CMS siap)  
- [ ] Chip dari `sectors` / `practices`  
- [ ] Grid dari `projects`  
- [ ] Filter → variables + reset `offset`  
- [ ] Load more → `offset` + cek `total`  
- [ ] Footer dari query/layout global (bukan query §2)  
- [ ] Link → `/projects/${slug}`  

---

## 8. Pelajaran workflow

1. Gap table wajib bedakan **`EMPTY`** (field ada, value kosong) vs **`MISSING_FIELD`** (tidak ada field) — contoh: `seoImage` EMPTY vs hero banner MISSING_FIELD.  
2. Selalu uji `/api` dan cantumkan sample di tabel.  
3. Banding `fe-queries` dengan keputusan adopt/skip/global-elsewhere.  
4. Satu query GraphiQL; screenshot di `assets/`.  
5. Page query ≠ footer query.
