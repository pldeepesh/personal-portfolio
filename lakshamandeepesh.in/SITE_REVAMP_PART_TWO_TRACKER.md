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
| 4 | Content Model and Page Templates | Complete |
| 5 | Blog, Topics, and SEO Preservation | Complete |
| 6 | Free Tools Platform and Funnel Tool | Complete |
| 7 | Analytics, Forms, and Conversion Tracking | Complete |
| 8 | SEO, Accessibility, Performance, and Launch QA | Complete with launch caveats |

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
- [x] Re-run confidentiality scan after each future major content phase.

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

- [x] Extend case study type with category, tags, problem, impact, stack, related tools, related articles, and confidentiality label.
- [x] Extend tool type with status, input metadata, related articles, related case studies, SEO copy, and event names.
- [x] Extend blog frontmatter with optional related tools and CTA metadata without breaking existing posts.

### Case Studies

- [x] Growth Funnel Diagnostics System.
- [x] AI-Powered Lead Prioritization Framework.
- [x] Paid Marketing Attribution System.
- [x] Document Intelligence Workflow.
- [x] AI Sales Quality Audit System.
- [x] Experimentation Decision Framework.

### Pages

- [x] Rebuild `/work`.
- [x] Rebuild `/work/[slug]`.
- [x] Rebuild `/about`.
- [x] Rebuild `/products`.
- [x] Rebuild `/contact`.
- [x] Add `/newsletter`.

### Contact Page Requirements

- [x] Strategy-call-first positioning.
- [x] Full validated contact form.
- [x] Help-type dropdown.
- [x] Budget or project type.
- [x] Timeline.
- [x] Calendar link.
- [x] FAQ.

### Phase 4 Verification

- `npm run build` passed.
- Static export now includes `/newsletter/` and expanded `/work/[slug]/` paths.
- Playwright CLI verified `/work/`, `/work/funnel-diagnostics-operating-model/`, `/about/`, `/products/`, `/contact/`, and `/newsletter/` on desktop and mobile.
- Page QA: required section text rendered, no horizontal overflow, no obvious text clipping candidates, and no console errors.
- Contact form QA: local validation errors render for missing name, email, help type, project type, timeline, and project context.
- Form architecture note: contact/newsletter/waitlist remain client-side validated external-endpoint forms while `output: 'export'` is active.
- Verification screenshots:
  - `output/playwright/phase4-work-desktop.png`
  - `output/playwright/phase4-work-detail-desktop.png`
  - `output/playwright/phase4-about-desktop.png`
  - `output/playwright/phase4-products-desktop.png`
  - `output/playwright/phase4-contact-mobile-final.png`
  - `output/playwright/phase4-newsletter-mobile.png`

## Phase 5: Blog, Topics, and SEO Preservation

### Goals

- Preserve existing blog content and slugs.
- Improve the editorial experience, internal links, schema, and conversion paths.
- Expand topic clusters.

### Blog

- [x] Preserve all current MDX blog files.
- [x] Keep existing slugs.
- [x] Update article template to match new dark premium design.
- [x] Keep reading progress.
- [x] Keep table of contents.
- [x] Keep related posts.
- [x] Add contextual CTA block.
- [x] Add newsletter block.
- [x] Add related tool CTA.
- [x] Add article schema.
- [x] Add breadcrumb schema.

### Topic Pages

- [x] `/topics/experimentation`
- [x] `/topics/growth-analytics`
- [x] `/topics/attribution`
- [x] `/topics/ai-workflows`
- [x] `/topics/data-strategy`
- [x] `/topics/decision-systems`
- [x] `/topics/marketing-analytics`
- [x] `/topics/product-analytics`
- [x] `/topics/data-engineering`

### Internal Linking Rules

- [x] Every blog links to one relevant tool.
- [x] Every blog links to one relevant case study.
- [x] Every blog links to two related blogs.
- [x] Every blog links to one topic page.
- [x] Every tool links to two related blogs.
- [x] Every tool links to one case study.
- [x] Every tool links to contact and newsletter.
- [x] Every case study links to one related article, one related tool, and contact.

### Phase 5 Verification

- `npm run validate:content` passed for 10 posts.
- `npm run build` passed and generated 43 static routes.
- Static export preserves all 10 existing `/blog/[slug]/` pages.
- Static export includes the 9 new requested topic hubs plus the legacy `/topics/experimentation-growth-analytics/` route.
- Blog article template verified with reading progress, table of contents, related posts, contextual CTA, newsletter block, related tool CTA, related case-study CTA, article schema, and breadcrumb schema.
- Playwright CLI verified `/blog/`, `/blog/acquisition-funnel-diagnostics/`, `/topics/`, `/topics/experimentation/`, `/topics/growth-analytics/`, and `/topics/experimentation-growth-analytics/` on desktop and mobile.
- Page QA: required section text rendered, no horizontal overflow, no offscreen text/card candidates, and no console errors.
- Visual QA corrected the topic hero overlay so white hero copy remains readable over the image.
- Verification screenshots:
  - `output/playwright/phase5-blog-desktop-final.png`
  - `output/playwright/phase5-article-desktop-final.png`
  - `output/playwright/phase5-article-mobile-final.png`
  - `output/playwright/phase5-topics-desktop-final-overlay.png`
  - `output/playwright/phase5-topic-experimentation-mobile-final.png`

## Phase 6: Free Tools Platform and Funnel Tool

### Goals

- Build `/tools` as a core SEO and lead-generation surface.
- Ship the Funnel Drop Diagnostic Tool first.

### Tools Directory

- [x] Add `/tools`.
- [x] Use title: "Free Analytics, Growth, and AI Tools".
- [x] Add category-ready tool cards.
- [x] Add live and coming-soon states.
- [x] Add CTA paths to strategy call and newsletter.

### Tool Detail Template

- [x] Add `/tools/[slug]`.
- [x] Add tool hero.
- [x] Add tool interface.
- [x] Add explanation.
- [x] Add example output.
- [x] Add recommended next steps.
- [x] Add result lead capture.
- [x] Add related articles.
- [x] Add related tools.
- [x] Add strategy call CTA.
- [x] Add schema where appropriate.

### Funnel Drop Diagnostic Tool

- [x] Inputs: previous/current leads.
- [x] Inputs: previous/current conversion rate.
- [x] Inputs: previous/current revenue.
- [x] Inputs: funnel stages.
- [x] Optional inputs: source, city/type, channel, cohort.
- [x] Output: where the drop happened.
- [x] Output: estimated loss from volume drop.
- [x] Output: estimated loss from conversion drop.
- [x] Output: diagnostic questions.
- [x] Output: recommended next actions.
- [x] CTA: Book a Strategy Call.
- [x] CTA: Email result.
- [x] Event: tool started.
- [x] Event: tool completed.
- [x] Event: result copied.
- [x] Event: result emailed.

### Coming-Soon Tools

- [x] A/B Test Readiness Checker.
- [x] CAC / ROAS Calculator.
- [x] Lead Scoring Template Generator.
- [x] Dashboard KPI Planner.
- [x] AI Use Case Prioritization Matrix.

### Phase 6 Verification

- `npm run validate:content` passed for 10 posts.
- `npm run build` passed and generated 49 static routes.
- Static export now includes `/tools/[slug]/` for the live Funnel Drop Diagnostic and all coming-soon tools.
- Playwright CLI verified `/tools/`, `/tools/funnel-drop-diagnostic/`, and `/tools/cac-roas-calculator/` on desktop and mobile.
- Funnel tool QA: example inputs calculate successfully, output renders volume loss, conversion loss, drop location, diagnostic questions, recommended actions, copy result, email result, strategy call CTA, and newsletter CTA.
- Page QA: required section text rendered, no horizontal overflow, no offscreen text/card candidates, and no console errors.
- Verification screenshots:
  - `output/playwright/phase6-tools-desktop.png`
  - `output/playwright/phase6-funnel-desktop-final.png`
  - `output/playwright/phase6-funnel-mobile-final.png`
  - `output/playwright/phase6-coming-desktop.png`
  - `output/playwright/phase6-coming-mobile.png`

## Phase 7: Analytics, Forms, and Conversion Tracking

### Goals

- Track key conversion events.
- Ensure every form and CTA gives useful feedback.
- Keep analytics implementation clean and privacy-aware.

### Events

- [x] `cta_strategy_call_clicked`
- [x] `case_study_opened`
- [x] `tool_started`
- [x] `tool_completed`
- [x] `tool_result_copied`
- [x] `tool_result_downloaded`
- [x] `newsletter_signup_submitted`
- [x] `contact_form_submitted`
- [x] `waitlist_signup_submitted`
- [x] `blog_cta_clicked`
- [x] `product_waitlist_clicked`

### Analytics

- [x] Update `EventLink` or analytics utility for new event names.
- [x] Keep GA4 working.
- [x] Add Microsoft Clarity only if an ID is configured.
- [x] Track all primary CTAs.
- [x] Track all secondary CTAs.
- [x] Track form success states.
- [x] Track tool completion events.

### Phase 7 Verification

- `npm run validate:content` passed for 10 posts.
- `npm run build` passed and generated 49 static routes.
- Analytics utility now uses a typed event-name list, keeps GA4 `sendGAEvent`, and emits a local `site:analytics` browser event for QA visibility.
- Microsoft Clarity script renders only when `NEXT_PUBLIC_CLARITY_PROJECT_ID` is configured.
- Playwright CLI verified event emission for strategy-call CTA, case-study open, blog CTA, product waitlist click, tool started, tool completed, tool result copied, and tool result downloaded.
- Contact form QA: missing required fields still render validation feedback.
- Tool QA: desktop/mobile result flow renders successfully with copy/download controls and no horizontal overflow.
- Verification screenshots:
  - `output/playwright/phase7-tool-desktop.png`
  - `output/playwright/phase7-tool-mobile-final.png`

## Phase 8: SEO, Accessibility, Performance, and Launch QA

### Technical SEO

- [x] Dynamic metadata for all pages.
- [x] Canonical URLs.
- [x] OpenGraph tags.
- [x] Twitter cards.
- [x] Sitemap includes new routes.
- [x] Robots preserved.
- [x] RSS feed preserved.
- [x] Breadcrumb schema.
- [x] Article schema.
- [x] Collection schema.
- [x] Tool/schema support.

### Migration SEO

- [x] Preserve blog URLs.
- [x] Preserve topic URLs where possible.
- [ ] Add redirects for changed URLs. Static export cannot serve server redirects; legacy archive routes remain as noindex bridge pages.
- [x] Confirm no high-value content is deleted.
- [x] Validate sitemap output.
- [x] Validate RSS output.

### Confidentiality QA

- [x] Search for forbidden names.
- [x] Search for internal project names.
- [x] Search for internal table names.
- [x] Search for private metrics.
- [x] Search for exact client names.
- [x] Replace sensitive references with generalized language.

### Accessibility QA

- [x] Keyboard navigation.
- [x] Visible focus states.
- [x] Form labels.
- [x] Form errors.
- [x] Reduced motion.
- [x] Color contrast.
- [x] Semantic headings.
- [x] Skip navigation.

### Performance QA

- [ ] Lighthouse Performance target: 85+. Blog/contact pass; homepage is 83 and tool page is 81 on Lighthouse mobile throttling after optimization.
- [x] Lighthouse SEO target: 95+.
- [x] Lighthouse Accessibility target: 95+.
- [x] Lighthouse Best Practices target: 95+.
- [x] Validate mobile 3D fallback.
- [x] Validate WebGL unsupported fallback.
- [x] Avoid unnecessary JavaScript.
- [x] Lazy-load heavy components.

### Browser QA

- [x] Desktop Chrome.
- [ ] Desktop Safari. Not available in this CLI environment.
- [ ] Desktop Firefox. Not available in this CLI environment.
- [ ] Mobile Safari. Not available in this CLI environment.
- [x] Mobile Chrome.
- [x] No horizontal scroll.
- [x] No text overlap.
- [x] Tool calculations stable.
- [ ] Forms submit successfully. Feedback paths work; true success requires configured external form endpoints.
- [x] Analytics events fire.

## Public Interfaces and Data Changes

### Add Routes

- [x] `/tools/`
- [x] `/tools/[slug]/`
- [x] `/newsletter/`

### Keep Routes

- [x] `/`
- [x] `/about/`
- [x] `/work/`
- [x] `/work/[slug]/`
- [x] `/blog/`
- [x] `/blog/[slug]/`
- [x] `/topics/`
- [x] `/topics/[topic]/`
- [x] `/products/`
- [x] `/contact/`

### Add or Extend Types

- [x] `CaseStudy`
- [x] `ToolDefinition`
- [x] `ToolResult`
- [x] `LeadFormPayload`
- [x] `NewsletterSignupPayload`
- [x] `WaitlistSignupPayload`

## Test Plan

- [x] Run content validation.
- [x] Run TypeScript/build validation.
- [ ] Run lint if available and compatible. Current script uses removed `next lint` command under Next 16.
- [x] Run confidentiality text search.
- [x] Run manual QA for all routes.
- [x] Capture browser screenshots for homepage, work, blog article, tools, products, contact, and mobile homepage.
- [x] Run Lighthouse on homepage.
- [x] Run Lighthouse on blog article page.
- [x] Run Lighthouse on tool page.
- [x] Run Lighthouse on contact page.
- [x] Test reduced-motion mode.
- [x] Test WebGL fallback.
- [ ] Test form success paths. Requires configured external form endpoints.
- [x] Test form error paths.
- [x] Test Funnel Drop Diagnostic with normal values.
- [x] Test Funnel Drop Diagnostic with zero values.
- [x] Test Funnel Drop Diagnostic with missing values.
- [x] Test Funnel Drop Diagnostic with extreme values.
- [x] Test sitemap generation.
- [x] Test RSS generation.

## Acceptance Criteria

- [x] Site feels premium, cinematic, restrained, and not template-like.
- [x] Homepage clearly positions Lakshmana as an AI, analytics, experimentation, and decision-systems leader.
- [x] 3D enhances the story and does not block readability.
- [x] 3D does not hurt mobile usability.
- [x] Existing blog content and SEO value are preserved.
- [x] Case studies are anonymized and credible.
- [x] `/tools` exists.
- [x] Funnel Drop Diagnostic Tool is live.
- [ ] Contact form works. Requires configured external form endpoint for success.
- [ ] Newsletter form works. Requires configured external form endpoint for success.
- [ ] Waitlist form works. Requires configured external form endpoint for success.
- [x] Tool lead capture works.
- [x] Analytics events are implemented.
- [x] No forbidden employer/client names appear publicly.
- [x] Site is responsive.
- [x] Site is accessible.
- [ ] Site is production-ready. Remaining launch caveats: external form endpoints, static-export redirects, and Lighthouse mobile performance on homepage/tool page.

### Phase 8 Verification

- `npm run validate:content` passed for 10 posts.
- `npm run build` passed and generated 49 static routes.
- `npm run lint` did not run because the script still calls `next lint`, which is no longer available in Next 16.
- Lighthouse scores:
  - Homepage: Performance 83, Accessibility 100, Best Practices 100, SEO 100.
  - Blog article: Performance 86, Accessibility 96, Best Practices 100, SEO 100.
  - Funnel tool: Performance 81, Accessibility 100, Best Practices 100, SEO 100.
  - Contact: Performance 89, Accessibility 100, Best Practices 100, SEO 100.
- Performance optimizations made during Phase 8:
  - Removed client-side reveal gating from the homepage hero LCP text.
  - Made GA4 load only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured.
  - Prevented mobile, reduced-motion, and forced-fallback sessions from importing the heavy Three.js scene.
  - Added `force-webgl-fallback=1` for deterministic WebGL fallback QA.
- Playwright CLI verified desktop/mobile route health for `/`, `/about/`, `/work/`, `/work/funnel-diagnostics-operating-model/`, `/blog/`, `/blog/acquisition-funnel-diagnostics/`, `/topics/`, `/topics/growth-analytics/`, `/tools/`, `/tools/funnel-drop-diagnostic/`, `/products/`, `/contact/`, and `/newsletter/`.
- Playwright CLI verified metadata/canonical/OG/Twitter tags, JSON-LD presence, skip navigation, no unlabeled form controls, no horizontal overflow, and no offscreen text/card candidates on the checked routes.
- Playwright CLI verified mobile 3D fallback, reduced-motion fallback, and forced WebGL fallback.
- Playwright CLI verified contact form error feedback, newsletter/waitlist feedback paths, sitemap output, RSS output, analytics events, and Funnel Drop Diagnostic normal/zero/missing/extreme cases.
- Confidentiality scans found no forbidden client/employer terms or internal/private placeholder terms in `app`, `components`, `lib`, or `content`.
- Verification artifacts:
  - `output/lighthouse-home.json`
  - `output/lighthouse-blog.json`
  - `output/lighthouse-tool.json`
  - `output/lighthouse-contact.json`
  - `output/playwright/phase8-home-desktop.png`
  - `output/playwright/phase8-home-mobile.png`
  - `output/playwright/phase8-work-desktop.png`
  - `output/playwright/phase8-blog-acquisition-funnel-diagnostics-desktop.png`
  - `output/playwright/phase8-tools-funnel-drop-diagnostic-desktop.png`
  - `output/playwright/phase8-products-desktop.png`
  - `output/playwright/phase8-contact-desktop.png`

## Implementation Notes

- Do not remove existing blog content unless explicitly instructed.
- Preserve SEO value from existing pages.
- Keep 3D performant and purposeful.
- Use reusable components.
- Avoid hardcoding repeated content.
- Keep forms reliable before adding advanced CRM integrations.
- Tools can initially be client-side calculators with server-side lead capture.
- Public copy must stay generalized and confidentiality-safe.
