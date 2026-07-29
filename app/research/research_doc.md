# Research Listing — cara pakai GraphQL

Query sudah fix. Tanpa screenshot — fokus **pagination** + **filter category**.

|            |                                                   |
| ---------- | ------------------------------------------------- |
| **Route**  | `/research`                                       |
| **Banner** | Single `latestResearch`                           |
| **List**   | Channel `research`                                |
| **Chips**  | `sectors` (`sector`) + `practices` (`discipline`) |
| **API**    | `http://nbrs-update.test/api`                     |
| **Diuji**  | 2026-07-29 — total tanpa filter **5**             |

---

## Variables

| Variable              | Tipe                              | Default | Fungsi                                      |
| --------------------- | --------------------------------- | ------- | ------------------------------------------- |
| `limit`               | `Int`                             | `9`     | Jumlah item per request                     |
| `offset`              | `Int`                             | `0`     | Loncat item (page 1 = `0`, page 2 = `9`, …) |
| `relatedToCategories` | `[CategoryRelationCriteriaInput]` | `null`  | Filter by category; `null` = semua          |

`total` memakai **filter yang sama** dengan `research` (wajib kirim `relatedToCategories` identik).

`hasMore` di FE: `offset + research.length < total`.

---

## Contoh variables

### Load awal (page 1, tanpa filter)

```json
{
  "limit": 9,
  "offset": 0,
  "relatedToCategories": null
}
```

### Filter satu Sector (Education)

```json
{
  "limit": 9,
  "offset": 0,
  "relatedToCategories": [{ "group": "sector", "slug": ["education"] }]
}
```

### Multi slug dalam satu group = OR

```json
{
  "limit": 9,
  "offset": 0,
  "relatedToCategories": [
    { "group": "sector", "slug": ["education", "community"] }
  ]
}
```

### Sector + Practice = AND antar group

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

### Load more / page 2 (filter tetap sama)

```json
{
  "limit": 9,
  "offset": 9,
  "relatedToCategories": null
}
```

### Reset Filters

Kembalikan `relatedToCategories: null` dan `offset: 0`.

---

## Wiring FE (ringkas)

| Aksi UI            | Yang diubah                                                                    |
| ------------------ | ------------------------------------------------------------------------------ |
| First paint        | `limit: 9`, `offset: 0`, `relatedToCategories: null`                           |
| Klik chip Sector   | set objek `{ group: "sector", slug: ["…"] }`, **reset** `offset: 0`            |
| Klik chip Practice | tambah/set objek `{ group: "discipline", slug: ["…"] }`, **reset** `offset: 0` |
| Load more          | `offset = offset + limit` (filter **jangan** diubah)                           |
| Clear filters      | `relatedToCategories: null`, `offset: 0`                                       |

Chip label diambil dari root `sectors` / `practices` (`slug`, `accentColor`).  
Kartu dari `research` → link `/research/{slug}`.  
Banner dari `page[0].pageHeading` / `pageSubheading`.

---

## Sample uji lokal

| Variables                | `total` | `research.length`                 |
| ------------------------ | ------- | --------------------------------- |
| Tanpa filter, offset 0   | **5**   | 5                                 |
| Sector `education`       | **3**   | 3                                 |
| Education ∧ Architecture | **1**   | 1                                 |
| Tanpa filter, offset 9   | **5**   | **0** (habis — `hasMore = false`) |

Slug chip lokal: sector `education` / `community` / `wellness` / `secure-spaces` · discipline `architecture` / `heritage` / `interiors` / `landscape`.

---

## Query

```graphql
query ResearchListing(
  $limit: Int = 9
  $offset: Int = 0
  $relatedToCategories: [CategoryRelationCriteriaInput]
) {
  page: entries(section: "latestResearch", limit: 1) {
    __typename
    id
    title
    slug
    uri

    ... on latestResearch_Entry {
      pageHeading
      pageSubheading

      seoPageTitle
      seoMetaDescription

      seoImage {
        url2: url @transform(width: 360, immediately: true)
        url3: url @transform(width: 600, immediately: true)
        url4: url @transform(width: 960, immediately: true)
        url5: url @transform(width: 1440, immediately: true)
        url6: url @transform(width: 1920, immediately: true)
        url7: url @transform(width: 2400, immediately: true)
        width
        height
        title
      }
    }
  }

  sectors: categories(group: "sector", orderBy: "title ASC") {
    __typename

    ... on sector_Category {
      id
      title
      slug
      uri
      accentColor
    }
  }

  practices: categories(group: "discipline", orderBy: "title ASC") {
    __typename

    ... on discipline_Category {
      id
      title
      slug
      uri
      accentColor
    }
  }

  research: entries(
    section: "research"
    relatedToCategories: $relatedToCategories
    limit: $limit
    offset: $offset
    orderBy: "postDate DESC"
  ) {
    __typename
    id
    title
    slug
    uri
    url
    postDate

    ... on research_Entry {
      artHdrHeading

      artType {
        __typename
        id
        title
        slug
        uri
      }

      thumbnail {
        url2: url @transform(width: 360, immediately: true)
        url3: url @transform(width: 600, immediately: true)
        url4: url @transform(width: 960, immediately: true)
        url5: url @transform(width: 1440, immediately: true)
        url6: url @transform(width: 1920, immediately: true)
        url7: url @transform(width: 2400, immediately: true)
        width
        height
        title
      }

      catSector {
        __typename

        ... on sector_Category {
          id
          title
          slug
          uri
          accentColor
        }
      }

      catDiscipline {
        __typename

        ... on discipline_Category {
          id
          title
          slug
          uri
          accentColor
        }
      }

      entryAuthor {
        __typename
        id
        title
        slug
        uri
      }
    }
  }

  total: entryCount(
    section: "research"
    relatedToCategories: $relatedToCategories
  )
}
```

> Uji lokal `/api`: `@transform` bisa error — pakai `url` mentah bila perlu. Footer = query global terpisah.
