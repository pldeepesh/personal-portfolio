# Site Revamp Part Two Tracker

This document tracks the full 3D premium portfolio revamp for Lakshmana Deepesh. Keep this file updated as work moves from planning to implementation, QA, and launch.

## Project Goal

Build a premium, cinematic, 3D-based personal portfolio and growth platform that positions Lakshmana Deepesh as an AI, analytics, experimentation, and decision-systems leader.

The site must:

- Showcase credibility, work, writing, tools, and anonymized case studies.
- Generate leads for strategy calls, analytics/AI advisory, and future products.
- Preserve and improve existing SEO assets.
- Feel like a premium interactive scroll experience with restrained, performant 3D.
- Avoid any public mention of confidential employer/client names.

## Locked Decisions

- Branch: `site-revamp-part-two`
- 3D approach: Hybrid phased
  - Phase 1: premium React Three Fiber scene using primitives, shaders, panels, nodes, and scroll camera movement.
  - Later: optional custom GLB assets once performance and structure are stable.
- Deployment architecture: Needs decision during Phase 1 / Phase 7
  - Static export is fine for the cinematic 3D frontend.
  - Static export cannot run Next.js POST route handlers for Resend-backed forms.
  - Before full lead capture ships, decide between serverless Next.js deployment or external form endpoints.
- Lead-generation setup: Full forms now
  - Contact, newsletter, waitlist, and tool result capture should use validated forms.
- Free-tool rollout: Funnel Drop Diagnostic Tool first.
- Current app structure: Keep the existing Next.js App Router structure under `lakshamandeepesh.in/app`.
- Existing blog URLs should be preserved wherever possible.

## Phase Status

| Phase | Name | Status |
| --- | --- | --- |
| 0 | Tracker + Baseline Audit | Complete |
| 1 | Foundation, Dependencies, and Design System | In progress: foundation, design system, layout complete; form handlers pending static-export decision |
| 2 | 3D and Motion Infrastructure | Complete for V1 primitives; custom GLB phase deferred |
| 3 | Homepage Rebuild | Complete |
| 4 | Content Model and Page Templates | Not started |
| 5 | Blog, Topics, and SEO Preservation | Not started |
| 6 | Free Tools Platform and Funnel Tool | Not started |
| 7 | Analytics, Forms, and Conversion Tracking | Not started |
| 8 | SEO, Accessibility, Performance, and Launch QA | Not started |

## Phase 0: Tracker + Baseline Audit

### Phase 0 Goals

- Create this tracker file.
- Record the current project baseline.
- Inventory existing routes, content, data sources, and SEO surfaces.
- Identify missing routes required by the revamp.
- Run the first confidentiality scan.
- Define the initial URL preservation and migration plan.

### Phase 0 Checklist

- [x] Create tracker document.
- [x] Confirm current branch.
- [x] Inventory current app routes.
- [x] Inventory current content files.
- [x] Inventory existing case study data.
- [x] Inventory existing tools data.
- [x] Review sitemap and robots implementation.
- [x] Run initial confidentiality scan.
- [x] Create final old-to-new URL migration map.
- [x] Decide which generated/static root files should remain part of the repo during the revamp.
- [x] Re-run confidentiality scan after Phase 1 foundation changes.
- [ ] Re-run confidentiality scan after each future major content phase.

### Current Branch Baseline

- Current branch: `site-revamp-part-two`
- Tracking branch: `origin/master`
- Current untracked brief file: `lakshamandeepesh.in/site-revamp-part-two-3d.md`

### Current App Routes

Existing routes:

- `/`
- `/about`
- `/blog`
- `/blog/[slug]`
- `/blog/author/[slug]`
- `/blog/category/[slug]`
- `/blog/tag/[slug]`
- `/topics`
- `/topics/[topic]`
- `/work`
- `/work/[slug]`
- `/tools`
- `/products`
- `/contact`
- `/robots.txt`
- `/sitemap.xml`

Missing requested routes:

- `/tools/[slug]`
- `/newsletter`

### Current Content Inventory

Existing blog posts:

- `ab-testing-pitfalls-operational`
- `acquisition-funnel-diagnostics`
- `activation-metrics-that-matter`
- `attribution-in-imperfect-data`
- `experimentation-framework-hypothesis-to-decision`
- `hello-world`
- `pricing-elasticity-experiments`
- `retention-diagnostics-scorecard`
- `seo-metadata-checklist`
- `technical-seo-basics`

Existing topic pages:

- `experimentation-growth-analytics`

Existing case studies in `lib/work.ts`:

- `experimentation-throughput-redesign`
- `funnel-diagnostics-operating-model`
- `pricing-analytics-decision-stack`

Existing tool definitions in `lib/tools.ts`:

- `driver-salary-slip-generator`
- `rent-receipt-generator`
- `books-periodicals-generator`

Phase 0 note: the existing tool strategy is reimbursement/payroll-oriented and does not match the new analytics, growth, AI, and decision-systems direction. During the revamp, either replace this tool set or separate it from the new analytics tools so the product direction is coherent.

### Current SEO Baseline

Existing SEO helpers:

- `lib/seo.ts`
- `app/sitemap.ts`
- `app/robots.ts`
- `components/seo/breadcrumbs.tsx`
- `components/seo/json-ld.tsx`
- `components/seo/seo-head.ts`

Existing sitemap currently includes:

- Static pages: `/`, `/blog/`, `/about/`, `/work/`, `/tools/`, `/products/`, `/contact/`
- Blog posts from `content/posts`
- Topic pages from `content/topics`
- Work pages from `lib/work.ts`

Sitemap needs to add:

- `/tools/[slug]/`
- `/newsletter/`
- Any new topic pages.
- Any changed case study slugs.

### Initial Confidentiality Scan

Forbidden terms checked:

- `Toothsi`
- `toothsi`
- `MakeO`
- `MAKeO`
- `makeo`
- `Skinnsi`
- `skinnsi`

Initial result:

- Hits appear only inside `site-revamp-part-two-3d.md`, where the terms are listed as forbidden examples and QA search terms.
- No hits were found in current app, component, lib, or content implementation files during the initial audit.

Phase 1 re-scan result:

- No hits were found in `app`, `components`, `lib`, or `content`.

### Initial URL Preservation Plan

Preserve:

- `/blog/[slug]/`
- `/topics/[topic]/` where existing topic slugs remain valid.
- `/work/[slug]/` where old case study slugs are still useful.
- `/products/`
- `/contact/`
- `/about/`

Add:

- `/tools/` added in Phase 1.
- `/tools/funnel-drop-diagnostic/`
- `/newsletter/`

Potential redirects to evaluate:

- Old work slugs to new anonymized case study slugs if the revamp changes them.
- Existing tool slugs if reimbursement tools are removed or moved.
- Any generated/static root pages that compete with App Router routes.

### Phase 0 URL Migration Map

Final initial map for Phase 1 implementation:

| Existing URL | Phase 1 handling | Target URL |
| --- | --- | --- |
| `/` | Preserve | `/` |
| `/about/` | Preserve | `/about/` |
| `/blog/` | Preserve | `/blog/` |
| `/blog/[slug]/` | Preserve all current slugs | `/blog/[slug]/` |
| `/blog/author/[slug]/` | Preserve | `/blog/author/[slug]/` |
| `/blog/category/[slug]/` | Preserve | `/blog/category/[slug]/` |
| `/blog/tag/[slug]/` | Preserve | `/blog/tag/[slug]/` |
| `/topics/` | Preserve | `/topics/` |
| `/topics/experimentation-growth-analytics/` | Preserve | `/topics/experimentation-growth-analytics/` |
| `/work/` | Preserve | `/work/` |
| `/work/experimentation-throughput-redesign/` | Preserve until case-study rewrite | `/work/experimentation-throughput-redesign/` |
| `/work/funnel-diagnostics-operating-model/` | Preserve until case-study rewrite | `/work/funnel-diagnostics-operating-model/` |
| `/work/pricing-analytics-decision-stack/` | Preserve until case-study rewrite | `/work/pricing-analytics-decision-stack/` |
| `/products/` | Preserve as product index | `/products/` |
| `/contact/` | Preserve | `/contact/` |
| `/tools/` | Added in Phase 1 as a valid index route | `/tools/` |
| `/tools/funnel-drop-diagnostic/` | Add in later phase | `/tools/funnel-drop-diagnostic/` |
| `/newsletter/` | Add in later phase | `/newsletter/` |

No redirects are required for Phase 1. Redirects should only be added when a later phase changes a public slug or retires the current reimbursement-oriented product URLs.

### Static Root File Decision

Keep during revamp:

- `.htaccess`
- `404.html`
- `favicon.ico`
- `feed.xml`
- `google7edc98a4d1222d1a.html`
- `robots.txt`
- `sitemap.xml`
- Root `index.html` and route `index.html` files generated by `build:git-deploy`

Do not hand-edit generated root artifacts during feature work:

- `__next.*.txt`
- Route-level `__next.*.txt`
- Root and route `index.txt`
- `_next/static/**`

These generated files can remain in the repo until deployment flow is changed, but source changes should happen in `app`, `components`, `content`, `lib`, `public`, and scripts.

## Phase 1: Foundation, Dependencies, and Design System

### Goals

- Install the dependencies needed for premium 3D, motion, forms, icons, and email delivery.
- Replace the current warm editorial visual system with a dark premium cinematic system.
- Build reusable UI primitives before rebuilding pages.
- Set up reliable full-form lead capture.

### Dependencies

- [x] Install `three`.
- [x] Install `@react-three/fiber`.
- [x] Install `@react-three/drei`.
- [x] Install `gsap`.
- [x] Install `framer-motion`.
- [x] Install `lucide-react`.
- [x] Install `resend`.
- [x] Confirm dependency versions are compatible with the current Next.js and React versions.

Installed versions:

- `three`: `^0.184.0`
- `@react-three/fiber`: `^9.6.1`
- `@react-three/drei`: `^10.7.7`
- `gsap`: `^3.15.0`
- `framer-motion`: `^12.40.0`
- `lucide-react`: `^1.16.0`
- `resend`: `^6.12.3`

Compatibility note: React Three Fiber and Drei installed versions support React 19, matching the current `react@^19.2.0` and `next@^16.1.6` setup.

### Environment Variables

- [x] Document `RESEND_API_KEY` in `.env.example`.
- [x] Document `LEAD_EMAIL_TO` in `.env.example`.
- [x] Add and document `NEXT_PUBLIC_CALENDAR_URL`.
- [x] Keep and environment-enable `GA` measurement configuration.
- [x] Do not add `NEXT_PUBLIC_CLARITY_ID`; Microsoft Clarity is not currently used.
- [ ] Decide deployment architecture for server-side form handling.

### Design System

- [x] Replace current color tokens with the premium dark palette.
- [x] Define CSS variables for background, surface, text, muted text, borders, and accents.
- [x] Use electric blue as the primary accent.
- [x] Use soft green and warm gold sparingly.
- [x] Add global focus styles.
- [x] Add selection styling.
- [x] Add reduced-motion handling.
- [x] Confirm mobile typography is readable and does not rely on viewport-width font scaling.

### UI Primitives

- [x] Button.
- [x] Section.
- [x] Container.
- [x] Card.
- [x] Badge.
- [x] Text input.
- [x] Textarea.
- [x] Select.
- [x] Form field wrapper.
- [x] Inline error message.
- [x] Result panel.
- [x] CTA group.

### Layout

- [x] Rebuild header as a dark sticky glass header.
- [x] Add desktop nav: Work, Articles, Tools, Products, About, Contact.
- [x] Add primary CTA: Book a Strategy Call.
- [x] Add mobile menu with the same links and visible CTA.
- [x] Rebuild footer with Explore, Resources, and Contact groups.
- [x] Add skip navigation link.

### Forms

Phase 1 form-handler note: server-side Resend handlers are blocked by the current `output: 'export'` deployment mode, because static export cannot serve POST route handlers. Keep the checklist open until the deployment target is confirmed as serverful/serverless, or until an external form endpoint is selected.

- [ ] Decide whether to remove `output: 'export'` and deploy through a Next.js server/serverless target.
- [ ] If static export stays, choose external form endpoints for contact, newsletter, waitlist, and tool result capture.
- [ ] Create shared server-side validation with Zod.
- [ ] Create contact form handler.
- [ ] Create newsletter signup handler.
- [ ] Create product waitlist handler.
- [ ] Create tool result lead capture handler.
- [ ] Add Resend email delivery.
- [ ] Add honeypot spam field.
- [ ] Add clear success states.
- [ ] Add clear validation errors.
- [ ] Avoid logging private user-submitted form details.

### Phase 1 Verification

- `npm run build` passed.
- Playwright CLI verified the production static export at `http://127.0.0.1:4173/`.
- Desktop verification: dark hero background active, no `.bg-white` legacy surfaces on the homepage, no horizontal overflow, and no new console errors.
- Mobile verification: mobile menu opens, `aria-expanded` updates to `true`, and no horizontal overflow.
- `/tools/` verification: route loads with the new tools index page and is included in sitemap generation.

## Phase 2: 3D and Motion Infrastructure

### Goals

- Build a performant 3D foundation that supports cinematic scrolling without hurting readability or mobile performance.
- Start with React Three Fiber primitives and defer custom GLB assets until after performance validation.

### Components

- [x] `components/three/CanvasShell.tsx`
- [x] `components/three/DecisionEngineScene.tsx`
- [x] `components/three/FloatingPanels.tsx`
- [x] `components/three/DataNodes.tsx`
- [x] `components/three/WebGLFallback.tsx`
- [x] `components/motion/ScrollReveal.tsx`
- [x] `components/motion/ReducedMotionProvider.tsx`

### 3D Hero V1

- [x] Create abstract Decision Engine core.
- [x] Add floating data panels.
- [x] Add connected nodes.
- [x] Add subtle grid floor.
- [x] Add restrained glow.
- [x] Add scroll-linked camera movement.
- [x] Add calm object rotation.
- [x] Keep hero text readable and independent from canvas.

### Fallbacks and Guardrails

- [x] Lazy-load the canvas.
- [x] Detect unsupported WebGL.
- [x] Provide static fallback.
- [x] Provide simplified mobile scene or static mobile fallback.
- [x] Respect `prefers-reduced-motion`.
- [x] Avoid heavy particle systems.
- [x] Keep first contentful paint unblocked.

### Phase 2 Verification

- `npm run build` passed.
- Playwright CLI verified the static export at `http://127.0.0.1:4173/`.
- Desktop verification: canvas mounted at `1440x679`, canvas pixel samples were nonblank, hero text stayed readable, and no horizontal overflow was present.
- Mobile verification: static fallback rendered instead of WebGL canvas and no horizontal overflow was present.
- Reduced-motion verification: static fallback rendered instead of WebGL canvas and no horizontal overflow was present.
- Console verification: no console errors. Current warning is from upstream Three/R3F `THREE.Clock` deprecation.
- Confidentiality scan after Phase 3: no forbidden employer/client terms found in `app`, `components`, `lib`, or `content`.
- Verification screenshots:
  - `output/playwright/phase2-home-desktop-3d.png`
  - `output/playwright/phase2-home-mobile-fallback.png`

### Later GLB Asset Phase

- [ ] Add custom GLB assets only after v1 is stable.
- [ ] Optimize GLB assets before production use.
- [ ] Keep assets lazy-loaded.
- [ ] Verify mobile performance after every asset addition.

## Phase 3: Homepage Rebuild

### Goals

- Replace the current blog-first homepage with a premium narrative homepage.
- Create a cinematic one-page scroll experience with clear conversion paths.

### Sections

- [x] Cinematic hero with Decision Engine 3D scene.
- [x] Positioning strip.
- [x] What I Build.
- [x] Featured Case Studies.
- [x] Decision Systems Framework.
- [x] Free Tools Preview.
- [x] Latest Articles / Field Notes.
- [x] Product / Waitlist section.
- [x] About Preview.
- [x] Final CTA.

### Hero

- [x] Use headline: "Building AI-powered analytics systems for better business decisions."
- [x] Use subheadline from the brief.
- [x] Add CTA: Book a Strategy Call.
- [x] Add CTA: View Case Studies.
- [x] Add small link: Explore Articles.
- [x] Add scroll indicator.
- [x] Ensure 3D does not block text.

### What I Build

- [x] Growth Analytics Systems.
- [x] AI & LLM Workflows.
- [x] Experimentation Systems.
- [x] Data Platforms & Automation.
- [x] Add links to related work, articles, and tools.

### Decision Systems Framework

- [x] Business Problem.
- [x] Data Model.
- [x] Metric Layer.
- [x] Diagnostic Logic.
- [x] AI / Automation Layer.
- [x] Decision Loop.
- [x] Desktop: animated pipeline.
- [x] Mobile: accessible stacked accordion.

### Homepage QA

- [x] Desktop screenshot.
- [x] Tablet screenshot.
- [x] Mobile screenshot.
- [x] No text overlap.
- [x] No horizontal scroll.
- [x] CTAs are visible and usable.
- [x] WebGL fallback works.

### Phase 3 Verification

- `npm run build` passed.
- Playwright CLI verified the static export at `http://127.0.0.1:4173/`.
- Desktop verification: required homepage sections rendered, hero canvas mounted, canvas pixel sample was nonblank, CTAs were visible, no invisible cards, no text overflow candidates, and no horizontal overflow.
- Tablet verification: required homepage sections rendered, CTAs were visible, no invisible cards, no text overflow candidates, and no horizontal overflow.
- Mobile verification: required homepage sections rendered, WebGL canvas was replaced by the static fallback, CTAs were visible, no invisible cards, no text overflow candidates, and no horizontal overflow.
- Reduced-motion verification: static fallback rendered instead of WebGL canvas and no horizontal overflow was present.
- Console verification: no console errors. Current warning is from upstream Three/R3F `THREE.Clock` deprecation.
- Verification screenshots:
  - `output/playwright/phase3-home-desktop.png`
  - `output/playwright/phase3-home-tablet.png`
  - `output/playwright/phase3-home-mobile.png`

## Phase 4: Content Model and Page Templates

### Goals

- Expand the content/data model to support anonymized case studies, tools, related content, and richer SEO.
- Rebuild supporting pages using the new design system.

### Content Types

- [ ] Extend case study type with category, tags, problem, impact, stack, related tools, related articles, and confidentiality label.
- [ ] Extend tool type with status, input metadata, related articles, related case studies, SEO copy, and event names.
- [ ] Extend blog frontmatter with optional related tools and CTA metadata without breaking existing posts.

### Case Studies

- [ ] Growth Funnel Diagnostics System.
- [ ] AI-Powered Lead Prioritization Framework.
- [ ] Paid Marketing Attribution System.
- [ ] Document Intelligence Workflow.
- [ ] AI Sales Quality Audit System.
- [ ] Experimentation Decision Framework.

### Pages

- [ ] Rebuild `/work`.
- [ ] Rebuild `/work/[slug]`.
- [ ] Rebuild `/about`.
- [ ] Rebuild `/products`.
- [ ] Rebuild `/contact`.
- [ ] Add `/newsletter`.

### Contact Page Requirements

- [ ] Strategy-call-first positioning.
- [ ] Full validated contact form.
- [ ] Help-type dropdown.
- [ ] Budget or project type.
- [ ] Timeline.
- [ ] Calendar link.
- [ ] FAQ.

## Phase 5: Blog, Topics, and SEO Preservation

### Goals

- Preserve existing blog content and slugs.
- Improve the editorial experience, internal links, schema, and conversion paths.
- Expand topic clusters.

### Blog

- [ ] Preserve all current MDX blog files.
- [ ] Keep existing slugs.
- [ ] Update article template to match new dark premium design.
- [ ] Keep reading progress.
- [ ] Keep table of contents.
- [ ] Keep related posts.
- [ ] Add contextual CTA block.
- [ ] Add newsletter block.
- [ ] Add related tool CTA.
- [ ] Add article schema.
- [ ] Add breadcrumb schema.

### Topic Pages

- [ ] `/topics/experimentation`
- [ ] `/topics/growth-analytics`
- [ ] `/topics/attribution`
- [ ] `/topics/ai-workflows`
- [ ] `/topics/data-strategy`
- [ ] `/topics/decision-systems`
- [ ] `/topics/marketing-analytics`
- [ ] `/topics/product-analytics`
- [ ] `/topics/data-engineering`

### Internal Linking Rules

- [ ] Every blog links to one relevant tool.
- [ ] Every blog links to one relevant case study.
- [ ] Every blog links to two related blogs.
- [ ] Every blog links to one topic page.
- [ ] Every tool links to two related blogs.
- [ ] Every tool links to one case study.
- [ ] Every tool links to contact and newsletter.
- [ ] Every case study links to one related article, one related tool, and contact.

## Phase 6: Free Tools Platform and Funnel Tool

### Goals

- Build `/tools` as a core SEO and lead-generation surface.
- Ship the Funnel Drop Diagnostic Tool first.

### Tools Directory

- [ ] Add `/tools`.
- [ ] Use title: "Free Analytics, Growth, and AI Tools".
- [ ] Add category-ready tool cards.
- [ ] Add live and coming-soon states.
- [ ] Add CTA paths to strategy call and newsletter.

### Tool Detail Template

- [ ] Add `/tools/[slug]`.
- [ ] Add tool hero.
- [ ] Add tool interface.
- [ ] Add explanation.
- [ ] Add example output.
- [ ] Add recommended next steps.
- [ ] Add result lead capture.
- [ ] Add related articles.
- [ ] Add related tools.
- [ ] Add strategy call CTA.
- [ ] Add schema where appropriate.

### Funnel Drop Diagnostic Tool

- [ ] Inputs: previous/current leads.
- [ ] Inputs: previous/current conversion rate.
- [ ] Inputs: previous/current revenue.
- [ ] Inputs: funnel stages.
- [ ] Optional inputs: source, city/type, channel, cohort.
- [ ] Output: where the drop happened.
- [ ] Output: estimated loss from volume drop.
- [ ] Output: estimated loss from conversion drop.
- [ ] Output: diagnostic questions.
- [ ] Output: recommended next actions.
- [ ] CTA: Book a Strategy Call.
- [ ] CTA: Email result.
- [ ] Event: tool started.
- [ ] Event: tool completed.
- [ ] Event: result copied.
- [ ] Event: result emailed.

### Coming-Soon Tools

- [ ] A/B Test Readiness Checker.
- [ ] CAC / ROAS Calculator.
- [ ] Lead Scoring Template Generator.
- [ ] Dashboard KPI Planner.
- [ ] AI Use Case Prioritization Matrix.

## Phase 7: Analytics, Forms, and Conversion Tracking

### Goals

- Track key conversion events.
- Ensure every form and CTA gives useful feedback.
- Keep analytics implementation clean and privacy-aware.

### Events

- [ ] `cta_strategy_call_clicked`
- [ ] `case_study_opened`
- [ ] `tool_started`
- [ ] `tool_completed`
- [ ] `tool_result_copied`
- [ ] `tool_result_downloaded`
- [ ] `newsletter_signup_submitted`
- [ ] `contact_form_submitted`
- [ ] `waitlist_signup_submitted`
- [ ] `blog_cta_clicked`
- [ ] `product_waitlist_clicked`

### Analytics

- [ ] Update `EventLink` or analytics utility for new event names.
- [ ] Keep GA4 working.
- [ ] Add Microsoft Clarity only if an ID is configured.
- [ ] Track all primary CTAs.
- [ ] Track all secondary CTAs.
- [ ] Track form success states.
- [ ] Track tool completion events.

## Phase 8: SEO, Accessibility, Performance, and Launch QA

### Technical SEO

- [ ] Dynamic metadata for all pages.
- [ ] Canonical URLs.
- [ ] OpenGraph tags.
- [ ] Twitter cards.
- [ ] Sitemap includes new routes.
- [ ] Robots preserved.
- [ ] RSS feed preserved.
- [ ] Breadcrumb schema.
- [ ] Article schema.
- [ ] Collection schema.
- [ ] Tool/schema support.

### Migration SEO

- [ ] Preserve blog URLs.
- [ ] Preserve topic URLs where possible.
- [ ] Add redirects for changed URLs.
- [ ] Confirm no high-value content is deleted.
- [ ] Validate sitemap output.
- [ ] Validate RSS output.

### Confidentiality QA

- [ ] Search for forbidden names.
- [ ] Search for internal project names.
- [ ] Search for internal table names.
- [ ] Search for private metrics.
- [ ] Search for exact client names.
- [ ] Replace sensitive references with generalized language.

### Accessibility QA

- [ ] Keyboard navigation.
- [ ] Visible focus states.
- [ ] Form labels.
- [ ] Form errors.
- [ ] Reduced motion.
- [ ] Color contrast.
- [ ] Semantic headings.
- [ ] Skip navigation.

### Performance QA

- [ ] Lighthouse Performance target: 85+.
- [ ] Lighthouse SEO target: 95+.
- [ ] Lighthouse Accessibility target: 95+.
- [ ] Lighthouse Best Practices target: 95+.
- [ ] Validate mobile 3D fallback.
- [ ] Validate WebGL unsupported fallback.
- [ ] Avoid unnecessary JavaScript.
- [ ] Lazy-load heavy components.

### Browser QA

- [ ] Desktop Chrome.
- [ ] Desktop Safari.
- [ ] Desktop Firefox.
- [ ] Mobile Safari.
- [ ] Mobile Chrome.
- [ ] No horizontal scroll.
- [ ] No text overlap.
- [ ] Tool calculations stable.
- [ ] Forms submit successfully.
- [ ] Analytics events fire.

## Public Interfaces and Data Changes

### Add Routes

- [ ] `/tools/`
- [ ] `/tools/[slug]/`
- [ ] `/newsletter/`

### Keep Routes

- [ ] `/`
- [ ] `/about/`
- [ ] `/work/`
- [ ] `/work/[slug]/`
- [ ] `/blog/`
- [ ] `/blog/[slug]/`
- [ ] `/topics/`
- [ ] `/topics/[topic]/`
- [ ] `/products/`
- [ ] `/contact/`

### Add or Extend Types

- [ ] `CaseStudy`
- [ ] `ToolDefinition`
- [ ] `ToolResult`
- [ ] `LeadFormPayload`
- [ ] `NewsletterSignupPayload`
- [ ] `WaitlistSignupPayload`

## Test Plan

- [ ] Run content validation.
- [ ] Run TypeScript/build validation.
- [ ] Run lint if available and compatible.
- [ ] Run confidentiality text search.
- [ ] Run manual QA for all routes.
- [ ] Capture browser screenshots for homepage, work, blog article, tools, products, contact, and mobile homepage.
- [ ] Run Lighthouse on homepage.
- [ ] Run Lighthouse on blog article page.
- [ ] Run Lighthouse on tool page.
- [ ] Run Lighthouse on contact page.
- [ ] Test reduced-motion mode.
- [ ] Test WebGL fallback.
- [ ] Test form success paths.
- [ ] Test form error paths.
- [ ] Test Funnel Drop Diagnostic with normal values.
- [ ] Test Funnel Drop Diagnostic with zero values.
- [ ] Test Funnel Drop Diagnostic with missing values.
- [ ] Test Funnel Drop Diagnostic with extreme values.
- [ ] Test sitemap generation.
- [ ] Test RSS generation.

## Acceptance Criteria

- [ ] Site feels premium, cinematic, restrained, and not template-like.
- [ ] Homepage clearly positions Lakshmana as an AI, analytics, experimentation, and decision-systems leader.
- [ ] 3D enhances the story and does not block readability.
- [ ] 3D does not hurt mobile usability.
- [ ] Existing blog content and SEO value are preserved.
- [ ] Case studies are anonymized and credible.
- [ ] `/tools` exists.
- [ ] Funnel Drop Diagnostic Tool is live.
- [ ] Contact form works.
- [ ] Newsletter form works.
- [ ] Waitlist form works.
- [ ] Tool lead capture works.
- [ ] Analytics events are implemented.
- [ ] No forbidden employer/client names appear publicly.
- [ ] Site is responsive.
- [ ] Site is accessible.
- [ ] Site is production-ready.

## Implementation Notes

- Do not remove existing blog content unless explicitly instructed.
- Preserve SEO value from existing pages.
- Keep 3D performant and purposeful.
- Use reusable components.
- Avoid hardcoding repeated content.
- Keep forms reliable before adding advanced CRM integrations.
- Tools can initially be client-side calculators with server-side lead capture.
- Public copy must stay generalized and confidentiality-safe.
