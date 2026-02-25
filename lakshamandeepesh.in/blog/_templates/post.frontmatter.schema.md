---
title: "Post frontmatter schema"
---

# Blog Post Frontmatter (Phase‑1)

```yaml
title: ""
slug: ""
excerpt: ""
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
author:
  name: ""
  slug: ""
category:
  name: ""
  slug: ""
tags:
  - name: ""
    slug: ""
coverImage: "/img/blog/"
canonicalUrl: "https://www.lakshmanadeepesh.in/blog/<slug>/"
readingTimeMinutes: 0
related:
  - slug: ""
metaTitle: ""
metaDescription: ""
ogImage: "/img/blog/"
noindex: false
```

Notes:
- `metaTitle` + `metaDescription` override defaults if set.
- `canonicalUrl` must be the flat URL (`/blog/<slug>/`).
- `related` should be 2–4 slugs.
