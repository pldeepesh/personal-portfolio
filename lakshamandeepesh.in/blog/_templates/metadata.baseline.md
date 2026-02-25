# Metadata Baseline (Phase‑1)

## Required per page
- `<title>` (<= 60 chars)
- `<meta name="description">` (120–160 chars)
- `<link rel="canonical">`
- `robots: index,follow` for indexable pages
- OG tags: `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image`
- Twitter tags: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

## Articles
- JSON‑LD: `BlogPosting` + `BreadcrumbList`
- `datePublished`, `dateModified`, `author`, `publisher`

## Archives / Index
- JSON‑LD: `CollectionPage` + `BreadcrumbList`

## Canonical policy
- Always self‑canonical to flat `/blog/<slug>/` URLs
- Normalize trailing slash + lowercase slug

## QA checklist
- Titles unique
- Descriptions unique
- Canonical resolves 200
- OG/Twitter image URL absolute
