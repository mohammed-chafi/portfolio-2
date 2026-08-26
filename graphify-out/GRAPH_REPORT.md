# Graph Report - portfolio-2  (2026-08-26)

## Corpus Check
- Corpus is ~17,094 words - fits in a single context window. You may not need a graph.

## Summary
- 272 nodes · 442 edges · 15 communities (11 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.88)
- Token cost: 62,389 input · 0 output

## Community Hubs (Navigation)
- Section Content Components
- README Design Rationale
- i18n Routing & Locale Layout
- Build Tooling & Dev Deps
- Project Showcase & Visuals
- TypeScript Compiler Config
- Page Sections & Site Config
- Runtime Dependencies
- Hero & Form UI Primitives
- ESLint Config
- Next.js Config
- PostCSS Config
- Tailwind Config

## God Nodes (most connected - your core abstractions)
1. `cn()` - 23 edges
2. `Portfolio — Mohammed Chafi (README)` - 19 edges
3. `compilerOptions` - 15 edges
4. `stagger()` - 10 edges
5. `routing` - 9 edges
6. `SectionHeading()` - 7 edges
7. `Button` - 7 edges
8. `Motion system prioritizes care over quantity per the brief's 'sober use only' constraint — few, fully orchestrated movements, none decorative; single shared expo-out easing [0.16,1,0.3,1] and duration scale from lib/motion.ts; only transform/opacity animated, never layout, so zero reflow` - 7 edges
9. `Reveal()` - 6 edges
10. `RevealGroup()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Portfolio — Mohammed Chafi (README)` --references--> `ProjectVisual()`  [EXTRACTED]
  README.md → components/ProjectVisual.tsx
- `RTL support is structural, not just textual — grids, timeline spine (moved right), directional icons, hero rule and its graduations all flip via logical CSS properties (start/end, ms/me, ps/pe); spaced caps neutralized under [lang='ar'], .tech-tag uses unicode-bidi:plaintext with an LRM mark for '.NET' strings` --references--> `routing`  [EXTRACTED]
  README.md → lib/routing.ts
- `Portfolio — Mohammed Chafi (README)` --references--> `SITE_URL`  [EXTRACTED]
  README.md → lib/site.ts
- `Calendly booking integration via react-calendly InlineWidget, mounted post-hydration in reserved 700px container` --references--> `CALENDLY_URL`  [EXTRACTED]
  README.md → lib/site.ts
- `Site favicon — 32x32 rounded-square mark compressing the site's signature measurement-rule motif (two marked endpoints) since letters blur at favicon size` --references--> `Signature 'measurement rule' element under the hero title, graduated 'Web · IA · Data · IoT · Industrie' — Mohammed's positioning as an amplitude ('web to industrial field'), drawn as an instrument rather than stated in prose; self-draws once on load and mirrors in RTL`  [INFERRED]
  app/icon.svg → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Graduation / measurement visual vocabulary shared across the site** — readme_signature_measurement_rule, app_icon, readme_header_reading_progress, readme_card_hover_hairline [INFERRED 0.85]
- **Site motion system (restraint, easing curve, bundle strategy, accessibility)** — readme_motion_system, readme_hero_css_only, readme_lazymotion_decision, readme_motion_accessibility [EXTRACTED 1.00]
- **Internationalization and RTL implementation across routing and rendering** — lib_routing_routing, middleware_middleware, app_locale_opengraphimage_rtl, readme_rtl_handling [EXTRACTED 1.00]

## Communities (15 total, 4 thin omitted)

### Community 0 - "Section Content Components"
Cohesion: 0.09
Nodes (28): ExpertiseCard(), ExpertiseCardProps, ExpertiseGrid(), ExpertiseItem, ICONS, RevealGroupProps, RevealItem(), RevealProps (+20 more)

### Community 1 - "README Design Rationale"
Cohesion: 0.08
Nodes (31): Site favicon — 32x32 rounded-square mark compressing the site's signature measurement-rule motif (two marked endpoints) since letters blur at favicon size, rtl() helper in app/[locale]/opengraph-image.tsx — manually reorders Arabic tokens because Satori renders Arabic glyphs but does not apply the bidi algorithm, ContactForm(), lib/motion.ts — shared easing curve and duration scale for all site animation, middleware.ts — locale-prefix routing (/fr default, /en, /ar), #1D4ED8 accent blue — brief-compliant token (6.4:1 contrast, 6.7:1 white-on-blue), used for the hero rule's high graduation and Calendly pageSettings primary color, NEXT_PUBLIC_CALENDLY_URL environment variable — swap Calendly account/event without touching code, Calendly event is titled '30 Minute Meeting' while the site copy says 'Échange découverte — 30 minutes'; rename on Calendly's side, not a code fix (+23 more)

### Community 2 - "i18n Routing & Locale Layout"
Cohesion: 0.09
Nodes (18): inter, LocaleLayout(), plexArabic, alt, contentType, loadArabicFont(), OpengraphImage(), size (+10 more)

### Community 3 - "Build Tooling & Dev Deps"
Cohesion: 0.07
Nodes (29): autoprefixer, eslint, eslint-config-next, devDependencies, autoprefixer, eslint, eslint-config-next, postcss (+21 more)

### Community 4 - "Project Showcase & Visuals"
Cohesion: 0.11
Nodes (24): Header(), Project, ProjectCard(), ProjectCardProps, Projects(), C, ComplianceVisual(), draw() (+16 more)

### Community 5 - "TypeScript Compiler Config"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 6 - "Page Sections & Site Config"
Cohesion: 0.14
Nodes (13): About(), CalendlyEmbed(), ContactSection(), Degree, Education(), Language, Footer(), Reveal() (+5 more)

### Community 7 - "Runtime Dependencies"
Cohesion: 0.08
Nodes (25): class-variance-authority, clsx, framer-motion, lucide-react, next-intl, dependencies, class-variance-authority, clsx (+17 more)

### Community 8 - "Hero & Form UI Primitives"
Cohesion: 0.19
Nodes (12): Errors, TODO: to receive submissions server-side instead, post to a route handler, Hero(), RangeRule(), SplitWords(), Button, ButtonProps, buttonVariants (+4 more)

## Knowledge Gaps
- **99 isolated node(s):** `extends`, `next/core-web-vitals`, `inter`, `plexArabic`, `size` (+94 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Portfolio — Mohammed Chafi (README)` connect `README Design Rationale` to `Project Showcase & Visuals`, `Page Sections & Site Config`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `SITE_URL` connect `Page Sections & Site Config` to `README Design Rationale`, `i18n Routing & Locale Layout`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `routing` connect `i18n Routing & Locale Layout` to `README Design Rationale`, `Page Sections & Site Config`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **What connects `extends`, `next/core-web-vitals`, `inter` to the rest of the system?**
  _99 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Section Content Components` be split into smaller, more focused modules?**
  _Cohesion score 0.0915915915915916 - nodes in this community are weakly interconnected._
- **Should `README Design Rationale` be split into smaller, more focused modules?**
  _Cohesion score 0.08064516129032258 - nodes in this community are weakly interconnected._
- **Should `i18n Routing & Locale Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.0907258064516129 - nodes in this community are weakly interconnected._