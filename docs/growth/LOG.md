# Growth LOG

## 2026-11-21 - First mission (game-search-growth)
- Read studio CLAUDE.md and `_studio/HANDOFF.md`, all site HTML, robots.txt, sitemap.xml, vercel.json, README.
- Fetched live: nalbakigames.com (200, matches source size), www and http redirect (308 to https apex), robots/sitemap 200, `/llms.txt` 404, `/nonexistent` 404, `/games.html` 308.
- Fetched game hosts parkinglot./lastcommit./floor42. (root, /play, /characters, robots, sitemap): found app shells, no canonical, no JSON-LD, soft-404 robots/sitemap on two.
- Web searches (WebSearch tool, US, 2026-11-21): `site:nalbakigames.com` -> 0 results from the domain; brand query -> nothing about the studio. Google/Bing/AI assistants not otherwise checked.
- Wrote AUDIT.md, KEYWORDS.md, PLAN.md (incl. MANUAL_STEPS). No site code edited, nothing posted or submitted.
- Not done / limits: no Search Console or keyword-tool data, no PageSpeed/CrUX measurement, no ChatGPT/Perplexity/Gemini checks, controls and exact genre wording for LCS unverified, game-host repos not read.
- Next: engineering implements P0-1..P0-3; Reis does MANUAL_STEPS 1-3; then start VISIBILITY.md.

## 2026-11-21 - P0 implementation (engineering, Claude Code)
Done (branch `redesign`):
- P0-1: new `games/parking-lot.html`, `games/last-commit-standing.html`, `games/floor-42.html` (serve at `/games/<slug>` via cleanUrls). Exact titles, descriptions, h1, summaries, facts, how-to-play, FAQ and alt text from PLAN.md; visible breadcrumb; links to the other two games; self canonical; OG/Twitter with the per-game `assets/press/*-share-1200x630.jpg`. Reused `.chapter/.details/.spec/.steps3/.faq/.fighters` styles; added a small marked block at the end of `styles.css` (`.game-head`, `.crumbs`, `.more-games`) as placeholder styling for the creative director to polish.
- `games.html` and `index.html` now link each game to its landing page ("About <Game>").
- P0-2: VideoGame JSON-LD (+ BreadcrumbList) per landing page; home Organization replaced by an Organization + WebSite `@graph` with `@id`s. Image uses the real `keyart-<slug>-2560x1440.jpg` (PLAN had `keyart-parking-lot.jpg`, which does not exist). No datePublished, ratings or sameAs.
- P0-3: sitemap lists the three pages, lastmod 2026-11-21 (also `/` and `/games`, which changed). robots.txt unchanged.
Choices: LCS title uses the 54-char fallback (the 63-char version exceeds the 60 limit). LCS offer/Floor 42 offer URLs point to the game host roots (canonical per P1-2).
Open TODOs (HTML comments on each page): Controls blocks omitted (unverified); LCS genre wording (PLAN said confirm; "Battle royale" used, games.html still says "Top-down"); LCS "coming soon" friend rooms must change when true; Floor 42 invite-link behaviour unverified; Floor 42 / LCS FAQ answers are drawn only from games.html and support.html.
Checks: no build/lint/test exists (static site). All JSON-LD blocks parse as JSON; sitemap parses as XML; titles <=60 and unique, descriptions 120-160 (asserted in generator); one h1 per page; every referenced local asset exists. Not run: Rich Results Test / validator.schema.org (needs live URL), live 200 + canonical checks (not deployed). Google has no dedicated VideoGame rich result for ordinary pages; value is entity clarity, effect uncertain.
Not touched: P1/P2 items (home/games titles, hero paragraph, alt text on existing pages, llms.txt), game-host repos, manual steps.
