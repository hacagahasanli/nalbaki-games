# Growth Plan - Nalbaki Games

Date: 2026-11-21. Owner of specs: game-search-growth. Implementer: Claude Code (engineering). Reis does MANUAL_STEPS (bottom). Log implementation in `LOG.md`.
All facts in copy come from `games.html` / `press.html` as of 2026-11-21. If a fact changes in the game, change the page and the JSON-LD together. Do not add ratings, review counts, download or play counts anywhere.

Order = impact / effort. IDs are for REQUESTS tracking.

## Do-first summary
P0-1 landing pages -> P0-2 JSON-LD -> P0-3 sitemap/robots -> P0-4 Search Console + Bing (Reis) -> P1 items -> off-site.

---
## P0-1. Three game landing pages on nalbakigames.com
Why: F1. Effort: ~half a day (static HTML, reuse existing assets and `games.html` copy). Files: `games/parking-lot.html`, `games/last-commit-standing.html`, `games/floor-42.html` (with `cleanUrls` they serve `/games/parking-lot` etc.). Keep `/games` as the hub and link each card to its landing page; the Play button on the landing page goes to the game host.
Design voice: existing site styles; engineering reuses `.ch-pl/.ch-lcs/.ch-f42` chapter styles. Visual changes go to the creative director via docs/collab, not here.

Common structure (top to bottom): `<h1>` (text, not image) -> 2-3 sentence factual summary -> Play button -> gameplay video (existing clip) -> "How to play" (3 steps) -> Facts table (genre, mode, length, platforms, price, maker) -> Controls -> FAQ (visible, real) -> "More games from Nalbaki Games" links to the other two -> footer.
Controls and FAQ answers must be written from the game's real behaviour; engineering fills control keys from the game's code/BRIEF (I have not verified key bindings: ASSUMPTION - do not publish guessed controls). Leave the Controls block out until verified.

### Parking Lot
- URL `/games/parking-lot`
- `<title>` (<=60): `Parking Lot - Free Browser Parking Race | Nalbaki Games` (53)
- meta description (<=155): `Race three bots for the one free bay in a supermarket car park. Parking Lot is a free browser parking game for laptop or phone. No install.` (141)
- `<h1>`: `Parking Lot: race three bots for the last free bay`
- Summary (visible, top): `Parking Lot is a free browser game by Nalbaki Games, an independent studio. You race three bots through a supermarket car park to park first, with all four wheels inside the lines. A round takes 1 to 3 minutes, there are 6 stages from the open lot to the roof, and it runs on a laptop or a phone with no install.`
- Facts: Genre: careful-driving race. Mode: solo, you against 3 bots. Length: rounds of 1 to 3 minutes, 6 stages. Plays on: laptop or phone, in the browser. Price: free. Made by: Nalbaki Games.
- How to play (from games.html): Race (three beeps, handbrakes off, one bay empty) / Park (all four corners inside the lines, square to the bay, then hold still) / Climb (park first to win the stage; every win opens one more floor). Touch anything and you are out.
- Image alt: `Four cars race down a busy supermarket car park aisle toward the one free bay in Parking Lot` on `ka-pl-race-*`.
- FAQ (visible): "Is Parking Lot free?" Yes, free to play. "Do I need to install it?" No, it runs in the browser. "Does it work on a phone?" Yes (laptop or phone). "Is there multiplayer?" Only if true at implementation time: today the copy says solo against 3 bots; answer "No, you play solo against 3 bots."

### Last Commit Standing
- URL `/games/last-commit-standing`
- Title: `Last Commit Standing - Free Browser Battle Royale | Nalbaki Games` (63; if over 60 in preview use `Last Commit Standing - Browser Battle Royale | Nalbaki` (53))
- Meta (<=155): `Drop from the plane, loot, and outlast 19 bots in a shrinking zone. Free browser battle royale, about 4 minutes a round, on laptop or phone.` (140)
- `<h1>`: `Last Commit Standing: a 4-minute battle royale in your browser`
- Summary: `Last Commit Standing is a free browser battle royale by Nalbaki Games. Twenty players drop from a cargo plane, loot guns and armor, and fight inside a closing zone until one is left; today you play solo against 19 bots. A round lasts about 4 minutes and runs on a laptop or a phone with no install.`
- Facts: Genre: battle royale (site copy calls it top-down; the clips show third and first person views - ENGINEERING/DIRECTOR TO CONFIRM the right genre wording before publishing). Mode: 20 players a round, solo vs 19 bots; rooms with friends coming soon (say "coming soon" only while true). Arsenal: 6 weapons, 4 fighters with a super move each. Length: about 4 minutes. Price: free.
- How to play: Drop / Loot / Outlast (text from games.html:164-166).
- Alt: `A fighter opens a parachute over a farmyard as the plane crosses the island in Last Commit Standing` on `ka-lcs-*`; `First-person view from a village rooftop with the rifle raised in Last Commit Standing` on `ka-lcs-fpp-*`.

### Floor 42
- URL `/games/floor-42`
- Title: `Floor 42 - Free 1v1 Office Shooter in Your Browser | Nalbaki` (59)
- Meta (<=155): `A side-on 1v1 office duel. Play a bot or an online friend, first to 5 KOs. Free browser game for laptop or phone in landscape. No install.` (136)
- `<h1>`: `Floor 42: a 1v1 office shootout, first to 5 KOs`
- Summary: `Floor 42 is a free browser duel by Nalbaki Games. Two fighters trade fire across an office at night; your gun aims itself, so it comes down to footwork. Play against a bot (easy, normal or hard) or online 1v1 with a friend or a quick match, first to 5 knockouts, on a laptop or a phone in landscape.`
- Facts: Genre: side-on action duel. Mode: vs bot, or online 1v1 (invite a friend or quick match). To win: first to 5 KOs. Fighters: Hotfix, Legacy, Standup, Intern. Weapons on the floor: SMG, shotgun, railgun, rocket launcher. Price: free.
- Alt: `Hotfix and Intern trade fire across a night-time office in Floor 42` on `ka-floor-42-*`; `A rocket knocks a fighter flat in slow motion in Floor 42` on `ka-f42-ko-*`.

Acceptance (all three): one `<h1>`; title <=60 chars, unique; description 120-160; self canonical `https://nalbakigames.com/games/<slug>`; OG/Twitter tags as other pages with `og:type=website`, `og:image` = that game's key-art 1200x630 (request from creative director if only `og.jpg` exists; until then use shared `og.jpg`); summary paragraph is real text in HTML; no number that is not in this file or games.html; FAQ questions visible; JSON-LD (P0-2) matches visible text; Rich Results Test shows no errors; `/games` and `/` link to each page with descriptive anchor text ("Parking Lot, a free browser parking game" is fine, no stuffing); each page links to the other two games.

---
## P0-2. VideoGame JSON-LD per landing page (+ WebSite on home)
Each landing page gets one block. Example for Parking Lot (copy for the other two by swapping fields). Only fields true and visible on the page. Do NOT add `aggregateRating`, `review`, `offers` with fake prices; `isAccessibleForFree` true and `offers` price 0 is true and allowed.
```json
{
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "@id": "https://nalbakigames.com/games/parking-lot#game",
  "name": "Parking Lot",
  "url": "https://nalbakigames.com/games/parking-lot",
  "description": "A free browser game where you race three bots through a supermarket car park to park first. Rounds last 1 to 3 minutes across 6 stages.",
  "image": "https://nalbakigames.com/assets/press/keyart-parking-lot.jpg",
  "genre": "Racing",
  "gamePlatform": "Web browser",
  "applicationCategory": "Game",
  "operatingSystem": "Any (web browser)",
  "playMode": "SinglePlayer",
  "inLanguage": "en",
  "isAccessibleForFree": true,
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock", "url": "https://parkinglot.nalbakigames.com/" },
  "author":    { "@id": "https://nalbakigames.com/#org" },
  "publisher": { "@id": "https://nalbakigames.com/#org" }
}
```
Notes: confirm exact `assets/press/keyart-*.jpg` filenames in repo before use (README says they exist, I did not list them). `datePublished` only if Reis supplies the real launch date (ASSUMPTION: not known; omit until then). Floor 42: `"playMode": ["SinglePlayer","MultiPlayer"]`, genre `"Action"`, description from the summary. Last Commit Standing: `"SinglePlayer"` only for now (rooms are "coming soon"), genre `"Action"` (battle royale), add `"numberOfPlayers": {"@type":"QuantitativeValue","value":20}`.
Home page: replace the Organization block with a graph:
```json
{ "@context":"https://schema.org","@graph":[
 {"@type":"Organization","@id":"https://nalbakigames.com/#org","name":"Nalbaki Games","url":"https://nalbakigames.com/","logo":"https://nalbakigames.com/assets/icon-512.png","email":"hello@nalbakigames.com","description":"An independent studio making original games that run in the browser, and building games to order."},
 {"@type":"WebSite","@id":"https://nalbakigames.com/#site","url":"https://nalbakigames.com/","name":"Nalbaki Games","publisher":{"@id":"https://nalbakigames.com/#org"}}
]}
```
Add `"sameAs": [...]` to the Organization only after the profiles exist (MANUAL). Add `BreadcrumbList` (Home > Games > <Game>) to landing pages (visible breadcrumb required).
Acceptance: validator.schema.org and Google Rich Results Test pass; every property matches visible text. Note: Google has no dedicated VideoGame rich result for ordinary pages (carousels exist for games on some surfaces); value here is mainly entity clarity for engines and LLMs - uncertain, say so in LOG.

## P0-3. Sitemap and robots (main domain)
- Add the three landing pages to `sitemap.xml`; set `lastmod` to real change date (use `git log -1 --format=%cs -- <file>`); keep `/privacy` out.
- `robots.txt` stays `Allow: /` + Sitemap line (nothing to block). Do not add AI-bot disallows (we want citations).
- Acceptance: sitemap valid XML, every URL 200 and self-canonical.

---
## P1-1. Home page copy and title
- Title: `Nalbaki Games - Free Browser Games: Parking Lot, Last Commit Standing, Floor 42` is 78 chars (too long). Use `Nalbaki Games - Free Browser Games, No Install` (45).
- Keep the tagline "One more round" as visible hero text (brand), it just leaves the `<title>`.
- Add below the hero one visible factual paragraph (GEO): `Nalbaki Games is an independent studio founded in 2026 that makes original browser games: Parking Lot (a parking race), Last Commit Standing (a 4-minute battle royale) and Floor 42 (a 1v1 office duel). All three are free and run on a laptop or phone with no install. The studio also builds games to order.` ("founded 2026" source: press.html:78.)
- `/games` title: `Free Browser Games by Nalbaki Games - Parking Lot, Battle Royale, 1v1` is 69; use `Play Free Browser Games | Nalbaki Games` (38).
- Acceptance: titles <=60, still unique.

## P1-2. Game hosts (separate repos - engineering opens each)
For `parkinglot.`, `lastcommit.`, `floor42.nalbakigames.com`:
1. Serve a real `/robots.txt` (`User-agent: *\nAllow: /\nSitemap: https://<host>/sitemap.xml`) and `/sitemap.xml` listing only the canonical play URL(s) (soft-404 fix, F3). Must be `text/plain` / `application/xml`.
2. Add `<link rel="canonical">`: Parking Lot -> `https://parkinglot.nalbakigames.com/`; LCS -> `https://lastcommit.nalbakigames.com/` for both `/` and `/play`; Floor 42 `/characters` and `/play` -> canonical to `/` (or `noindex`).
3. Unique `<title>`/description per game in the pattern `<Game> - <what it is> | Nalbaki Games`, matching the landing page.
4. Add a crawlable text block (`<noscript>` or server-rendered `<main>` visible before the canvas): the same summary sentence as the landing page and a link to `/games/<slug>` on the main domain. Parking Lot currently has no text at all.
5. Add the VideoGame JSON-LD from P0-2 (same `@id` as the landing page so it is one entity).
Acceptance: `curl -I` robots/sitemap return 200 with correct content-type; URL Inspection shows the declared canonical.

## P1-3. Image alt text
Apply the alt text above; keep `alt=""` for purely decorative duplicates.

## P1-4. Keep sitemap honest
Script or manual rule: update `lastmod` only when the page content changes.

## P2-1. VideoObject for gameplay clips (optional, uncertain)
On each landing page: `VideoObject` with `name`, `description` (the existing aria-label text), `thumbnailUrl` (poster), `uploadDate` (real date the clip was produced; take from git), `contentUrl` (the mp4). Add YouTube upload later (better for video SEO and AI). Google may still not index short silent clips as video results; low certainty.

## P2-2. llms.txt (low certainty of effect)
`/llms.txt` (markdown): H1 `Nalbaki Games`, blockquote one-sentence summary, then sections `Games` (3 links to landing pages with one-line descriptions), `Studio` (about, press, services), `Optional` (contact). Same facts as page copy. Do not rely on it.

## P2-3. Press page as entity hub
Add the three one-sentence descriptions and a "Facts" list (name, founded 2026, location only if Reis wants it, contact, links). Already largely present at press.html; add `sameAs` once profiles exist.

## P3. Later
- Per-game "how to" content only if real queries appear in Search Console. Devlog/blog on the main domain (real posts, e.g. how the frame-by-frame clips are recorded, how bots work) for earned links.
- Language pages only if a translation ships (no hreflang before then).

---
## MANUAL_STEPS (Reis only; I do not post or submit)
1. **Google Search Console**: add property `nalbakigames.com` as a Domain property (DNS TXT record at your registrar) so subdomains parkinglot./lastcommit./floor42. are included. Then Sitemaps -> submit `https://nalbakigames.com/sitemap.xml`. URL Inspection -> Request indexing for `/`, `/games` and each landing page after P0-1 ships. Tell me when done; check Performance weekly.
2. **Bing Webmaster Tools**: sign in, "Import from Google Search Console" (fastest) or add the site and verify via DNS/meta; submit the sitemap. Optional: IndexNow key (Vercel static: engineering can host the key file) for faster Bing indexing - matters because ChatGPT search and Copilot lean on Bing.
3. **Create brand profiles with the exact name "Nalbaki Games"** and the same one-line description as the home page: itch.io account (page for each game linking to the playable URL), YouTube channel, Reddit/X/Bluesky/LinkedIn as you prefer. Send me the URLs so I add `sameAs` and fill OFFSITE.md.
4. **YouTube**: upload the three gameplay clips (they are silent: add music or voice-over if you want; titles like `Parking Lot - free browser parking race (Nalbaki Games)`; description starts with the summary sentence and the play link). I will draft titles/descriptions on request.
5. **Portals / directories** (submit yourself, follow each one's rules; each has its own review and some require exclusivity or an SDK): CrazyGames, Poki, GameDistribution, Newgrounds, itch.io (web upload or link page). Read each portal's terms first (revenue share, branding rules, whether linking to your own site is allowed). The About page already says the games are "being prepared for web game portals such as CrazyGames".
6. **Community posts** (only where self-promo is allowed: e.g. r/WebGames, r/playmygame, itch.io devlog, Show HN is for projects with something to discuss): I will draft; you post from your real account and respond to comments. No sockpuppets, no upvote asks.
7. **Confirm facts I could not verify**: real launch dates per game, whether LCS rooms with friends exist, Floor 42 invite-link behaviour, real controls per game, correct genre wording for LCS (top-down vs 3rd/1st person).
8. After ~2-4 weeks: run PageSpeed Insights on `/` and a landing page and send scores; re-run my visibility queries.

## Measurement
- KPIs: pages indexed (GSC), impressions/clicks for brand queries, AI-prompt checks in VISIBILITY.md (monthly), referral traffic from portals.
- Do not expect ranking changes for generic terms in <3 months; first success = brand queries return the right pages with sitelinks and the right description.
