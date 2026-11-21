# Nalbaki Games - Search & AI-visibility Audit

Date: 2026-11-21. Scope: studio site source (`nalbaki-games/`), live nalbakigames.com, and the three live game hosts.
Method: read source, `curl` live URLs, two web searches. Live home page (28,545 bytes) is byte-identical in size to `index.html`, so source = live.
Labels: VERIFIED (observed, evidence given), INTERPRETATION (my reading), ASSUMPTION.

## Score: 4 / 10
Good bones (clean URLs, canonical + OG on every page, honest copy, fast static HTML, real key art). But no structured data except one Organization block, no per-game landing pages that a search engine can rank, game hosts are un-indexable app shells, no off-site presence, and no measurable search presence yet.

## Visibility today (VERIFIED, 2026-11-21, WebSearch tool, US)
- `site:nalbakigames.com` returned zero nalbakigames.com pages.
- `"Nalbaki Games" Parking Lot Last Commit Standing Floor 42` returned nothing about the studio; only unrelated "parking lot" games on itch.io / Novel Games.
- Not checked (no access): Google Search Console, Bing, ChatGPT/Perplexity/Gemini. Record in VISIBILITY.md once Reis runs them. INTERPRETATION: domain is new (press.html:78 says founded 2026) and likely unindexed or barely indexed.

## Findings

### F1 (P0) Games have no rankable landing page; the real game URLs are JS app shells
- Evidence: `https://parkinglot.nalbakigames.com/` returns 200, 2,621 bytes, body is only a loader (`<div id=boot>` CSS) with title "Parking Lot" and description "Four company cars. One free space. No insurance. First to park wins." No headings, no text. `lastcommit.../` is 34 KB with title "Last Commit Standing" only. `floor42.../` is Next.js with title "Floor 42 · Nalbaki Games".
- The only crawlable text about each game is a section on `/games` (games.html:84-190) and on `/` (index.html:135-260): one shared page for three games, targeting no single query.
- Impact: nothing can rank for "parking game online", "browser battle royale", "office shooter 1v1". AI assistants have no per-game page to cite.
- Fix: PLAN P0-1 (three landing pages on the main domain, plus matching JSON-LD).

### F2 (P0) No VideoGame / WebSite / VideoObject structured data
- Evidence: `grep ld+json *.html` -> only `index.html:26-36`, a minimal `Organization` (name, url, logo, email, description). No `sameAs`, no `WebSite`, no `VideoGame` anywhere, none on game hosts.
- Impact: no game entity for Google/Bing/LLMs; Organization logo points to `icon-512.png` (fine, >=112px square).
- Fix: PLAN P0-2, P1-1.

### F3 (P0) Game hosts: robots.txt and sitemap return the app HTML with HTTP 200 (soft 404) or 404
- Evidence: `parkinglot.` and `lastcommit.` `/robots.txt` and `/sitemap.xml` -> 200 `text/html` (the SPA index). `floor42.` -> 404 for both. No canonical tag on any game host page (grep of fetched HTML: no `rel="canonical"`). `floor42.../characters` and `/play` share the identical description and are separate indexable URLs.
- Impact: Google treats HTML robots.txt as an invalid file (fails open, crawls all) and flags soft 404 sitemaps in Search Console; duplicate play-flow URLs dilute the host.
- Fix: PLAN P1-2 (real robots.txt/sitemap per host, canonical, `noindex` on utility screens like /characters is optional; prefer canonical to /).

### F4 (P1) Game subdomains split the entity from the studio site
- Evidence: games live at `parkinglot.`, `lastcommit.`, `floor42.nalbakigames.com`; no cross-linking back beyond title suffix on Floor 42 ("Floor 42 · Nalbaki Games"). Titles differ in pattern: "Parking Lot", "Last Commit Standing", "Floor 42 · Nalbaki Games".
- INTERPRETATION: subdomains are treated as separate sites for ranking; authority earned by game pages does not flow to the studio. With zero links today this is not yet costly but is the cheapest moment to decide.
- Fix: main-domain landing pages are canonical "home" of each game; game hosts link to them and carry `VideoGame` JSON-LD with the same `@id`. Uniform title pattern "<Game> · Nalbaki Games".

### F5 (P1) Home/`/games` titles and descriptions: acceptable but brand-first, no query terms
- Evidence: `index.html:6` "Nalbaki Games · One more round" (31 chars); `games.html:6` "Games · Nalbaki Games" (21); `games.html:7` description is good (mentions "free, no install, no account"). Other pages use "<Topic> · Nalbaki Games", unique per page, canonical self-referencing, all <= 160 char descriptions (VERIFIED by reading about/contact/playables/press/privacy/services/support/work).
- Impact: titles carry no genre words ("free browser games"). Tagline "One more round" is brand voice but not a query.
- Fix: PLAN P1-3 title rewrites.

### F6 (P1) Sitemap thin and static-dated
- Evidence: `sitemap.xml` lists 9 URLs; omits `/privacy` (fine) and will omit game pages. `lastmod` values are hard-coded 2026-11-20/21; `/games`, `/press` changed 2026-11-21 per git mtime but say 11-20. 
- Impact: minor; Google ignores `lastmod` unless it is accurate.
- Fix: PLAN P1-4 (regenerate lastmod from git on deploy; add new pages).

### F7 (P1) Images: most decorative; key art has empty alt in places
- Evidence: hero image `alt=""` (index.html:80), card images `alt=""` (index.html:100,108,116) while the full-bleed chapter images do carry alt text (index.html:173). Videos have descriptive `aria-label` (good). Game logos have `alt="Parking Lot"` etc. (good).
- Impact: image search and accessibility; low-medium.
- Fix: descriptive alt on the key-art `<img>` of each landing page (PLAN P0-1 specifies them); leave purely decorative cards empty.

### F8 (P1) Gameplay video not marked up
- Evidence: 12-15 s silent MP4/WebM clips per game with posters (README "Key art and clips"), lazy `preload="none"`. No `VideoObject`, no video sitemap entries.
- Impact: lost video-result eligibility. Caveat: Google requires the video to be a main/prominent element on the page; short silent clips may or may not be indexed as video. Uncertain.
- Fix: PLAN P2-1.

### F9 (P2) No llms.txt; AI-crawler access is open
- Evidence: `https://nalbakigames.com/llms.txt` -> 404. `robots.txt` = `User-agent: * / Allow: /` + Sitemap: so GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot are all allowed (INTERPRETATION from standard UA matching; no per-bot rules exist).
- Impact: access is fine. llms.txt has low and unproven effect (no major engine has confirmed using it); cheap, so do it, never instead of real pages.
- Fix: PLAN P2-2.

### F10 (P2) Performance red flags (source-read only; not measured)
- 59 MB of video in `assets/video/` (several resolutions up to 2560). Mitigated: `preload="none"`, `data-src` lazy loading, hero video "loads after the page" (index.html:82-85), responsive AVIF/WebP, AVIF LCP image preloaded (index.html:25) with `fetchpriority`. INTERPRETATION: LCP likely OK; INP/CLS unknown.
- `t.js` telemetry loaded `defer` (fine).
- Fix: run PageSpeed Insights / CrUX once indexed (MANUAL step); no code change until measured.

### F11 (P2) Headings
- Evidence: one `<h1>` per page (all pages checked). Home h1 is "One more round" (brand tagline), game names are `<h2>` with logo `<img alt="Parking Lot">` as the only text (index.html:135) - the heading text is an image alt. Works for accessibility; weaker than visible text for search.
- Fix: landing pages use real text `<h1>`.

### F12 (P2) Internal links
- Evidence: nav links to Games/Studio/Services/Work/Press/Support/Contact; game "Play" links go to subdomains; `/games` links out. No game-to-game "more from Nalbaki" links on the game hosts (not verified in-app).
- Fix: footer/outro links in landing pages; request same on game hosts (P1-2).

### F13 (P2) Entity consistency / sameAs
- Evidence: studio name "Nalbaki Games" consistent across all pages; OG site_name set only on index? (`og:site_name` present on every page, VERIFIED by grep). No social/itch.io/YouTube profiles referenced anywhere in the repo (grep: none), so `sameAs` has nothing to point to yet.
- Fix: create profiles first (MANUAL), then add `sameAs`.

### F14 (P3) Compliance of claims
- Pages state "free", "no install", "no account", "20 players, solo against 19 bots", "about 4 minutes a round" (games.html:158-160). These match visible copy; keep all schema numbers equal to this copy. Press page "Founded 2026" (press.html:78). Source line for each number is a studio rule - keep.

## What is already good (VERIFIED)
- Clean URLs, 308 www/http -> https apex, 404 page `noindex` with real 404 status (`/nonexistent` -> 404), `/games.html` -> 308.
- Unique title + description + self canonical + OG (1200x630 image, alt text) + `twitter:card` on every page.
- Honest, specific copy; real gameplay media; security headers; long cache on /assets.
