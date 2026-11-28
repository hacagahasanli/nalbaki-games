# Spec: rename Floor 42 to Pewfield on nalbakigames.com and the game host

Owner: game-search-growth. Date: 2026-11-28. Status: spec, ready for engineering after the gates in section 1.
Implements: owner decision 2026-11-28 (Floor 42 is now PEWFIELD). Template: the Hazefall rename (site commits `815efe8`, `809e63b`; `vercel.json` redirects).
Nothing here is posted, submitted or registered. Engineering implements; Reis does section 6 by hand.

Sources read: site repo (every file grep-matched below), `vercel.json`, `sitemap.xml`, `robots.txt`, `README.md`; game repo `floor-42` (`docs/HANDOFF.md`, `README.md`, `src/app/layout.tsx`, route pages, `public/`, `docs/collab/CREATIVE/brand/README.md` section 4, `docs/collab/REQUESTS.md` R-029, `docs/growth/game-name*.md`); `hazefall` repo `vercel.json` and `README.md`. Live checks by curl and dig on 2026-11-28 (section 0).

---

## 0. Problems first (read before implementing)

1. **The game host still serves Floor 42.** `https://floor42.nalbakigames.com/` returns `<title>Floor 42 · Nalbaki Games</title>` (curl, 2026-11-28). The rename lives on `portal-build`, which is 116 commits ahead of `main` (`git rev-list --count main..portal-build`) and is not pushed (HANDOFF). If the site says "Pewfield" while the Play button opens a Floor 42 office game with the old fighters, players and crawlers see two names for one thing. **Gate G1: the site rename ships only after the game host serves the Pewfield build.**
2. **The online server does not answer, but the site sells online play.** `https://floor42-game.fly.dev/` returned HTTP 000 (connection failure) twice on 2026-11-28; HANDOFF and memory say online is parked with no server spend. Today the live site has a "Play online 1v1" button, the Floor 42 FAQ says "Yes. Online 1v1 lets you invite a friend", the facts list "online 1v1", and `services.html` says "Floor 42 has a 60 Hz online duel on its own server". These are false today, whatever the name. **This spec removes every live-online claim** (variant ONLINE-OFF). If Reis turns the server back on, use the ONLINE-ON lines in section 3.9.
3. **Every Floor 42 image on the site shows the old game.** Key art, cards, clips, poster, press shots and the hero montage show the night office and the old developer fighters (Hotfix, Legacy, Standup, Intern), who no longer exist under those names or looks. Calling those pictures "Pewfield" misleads. New art is a dependency (section 5, R-items to the Creative Director and video lead). Until it exists, the spec says exactly what to remove or relabel; the one ready-made Pewfield image is the logo-only share image `floor-42/public/og.jpg` (1200x630, wordmark on sky and sand, no fighters; I viewed it).
4. **The game's meta description still uses the office tagline.** `layout.tsx` builds the description from `COPY.tagline` = "Two coworkers. One grudge. No mercy." The office theme is gone and the game README now says "Two fighters. One field. First to five KOs." Engineering item E-3 below.
5. **Store copy does not exist yet.** `floor-42/docs/collab/CREATIVE/brand/crazygames-store.md` was not found (find over games-studio, 2026-11-28); R-029 is open with the Creative Director. So every player-facing line below is **SEO-required fields only, marked [align with CD copy]**. When the CD file lands, its tagline and hook replace mine; titles, meta descriptions, JSON-LD and FAQ facts stay unless they contradict the build.
6. **Search equity at stake is small.** Earlier audit (AUDIT.md, 2026-11-21): `site:nalbakigames.com` returned nothing from the domain; the brand query returned nothing about the studio. So the redirects are about not breaking links (portals, README, shared invite links), not about saving rankings. Do them properly anyway: they are cheap.
7. **Inconsistency found on the way (not part of this rename, flag only):** `services.html:231` says "Hazefall has online rooms of up to ten people", while `games/hazefall.html` FAQ says "Is there multiplayer? Not yet." One of them is wrong. Engineering/Reis to confirm; growth will fix the copy once the fact is known. Also P2: Hazefall's VideoGame data has no `alternateName: "Last Commit Standing"`; add it with a visible "called Last Commit Standing until November 2026" line, same pattern as 3.1.

---

## 1. Gates and order

| Step | Who | Done when |
|---|---|---|
| G0 | Reis | Trademark search for PEWFIELD done (HANDOFF "Waiting on Reis" 1). CrazyGames already gets the name today, so this is about the site, not a blocker for it, but do not buy anything (domains) before it. |
| G1 | Engineering + Reis | The Pewfield build is live on the game's Vercel project (merge/push `portal-build` -> production branch, Reis approves the push). Check: `curl -s https://floor42.nalbakigames.com/ \| grep -o '<title>[^<]*'` shows Pewfield. |
| G2 | Reis | `pewfield.nalbakigames.com` added and valid on Vercel + Cloudflare (section 4, steps 1-3). |
| G3 | Engineering | Game metadata E-1..E-5 shipped (section 7). |
| G4 | Engineering | Site changes (sections 2-3) shipped in one deploy, with the `vercel.json` redirects. |
| G5 | Reis | Old host redirect switched on (section 4, step 4), then section 6 checks. |
| Later | CD / video lead | New art (section 5) swapped in; sitemap `lastmod` bumped again on that deploy. |

G4 can ship with interim visuals (section 5 says what). Do not hold the text rename for new art: a page with the right name and no stale fighters is better than a page with the old name.

---

## 2. Every site file that mentions Floor 42

From `grep -rniI "floor.\?42\|floor42"` in `nalbaki-games/` on 2026-11-28, excluding `docs/growth/`. Line numbers are from that grep; match on text, not numbers.

| File | Lines | What changes | Section |
|---|---|---|---|
| `games/floor-42.html` | whole file | `git mv` to `games/pewfield.html`, rewritten head, JSON-LD and body | 3.1 |
| `vercel.json` | redirects | two new 301s | 3.2 |
| `sitemap.xml` | 7 | new URL + lastmods | 3.3 |
| `index.html` | 7, 13, 94, 116-121, 136, 192-237, 364 | meta, hero label, pick card, band, chapter, footer | 3.4 |
| `games.html` | 7, 13, 71, 174-220, 275 | meta, jump link, chapter, footer | 3.5 |
| `press.html` | 7, 13, 81, 95, 134-135, 179-181, 203-209, 228 | meta, fact sheet, long description, logo tile, screenshots, footer | 3.6 |
| `work.html` | 7, 13, 102-108, 193 | meta, case heading/alt, footer | 3.7 |
| `playables.html` | 94-110, 185 | sample caption, link, footer | 3.8 |
| `services.html` | 231, 279 | FAQ line, footer | 3.9 |
| `about.html` | 82, 117 | body line, footer | 3.10 |
| `support.html` | 7, 13, 162 | meta, footer | 3.10 |
| `contact.html`, `privacy.html`, `404.html` | 114 / 134 / 89 | footer only | 3.10 |
| the 11 pages with a studio share image (index, games, press, work, playables, services, about, support, contact, privacy, 404) | `og:image:alt` (line 18) | **no change until `assets/og.jpg` is remade** (the alt describes the image, which still shows Floor 42) | 5 |
| `games/hazefall.html`, `games/parking-lot.html` | 214 / 204 (cross-link), 232 / 222 (footer) | cross-link + footer | 3.10 |
| `site.js` | 317 | add host to the analytics map | 3.11 |
| `vendor/nalbaki-support/core.js` | 123 | support "Servers" line (also vendored in the game repo, `src/vendor/nalbaki-support/core.js`) | 3.11 |
| `README.md` | 13, 49, 62 | pages table, accent colour, key art note | 3.12 |
| `assets/brand/games/floor-42/` | logo.svg, emblem.svg | new folder `assets/brand/games/pewfield/` | 5 |
| `assets/playables/floor-42.html` | 7, 84, 88 | **keep as is** (a client-style sample made before the rename; see 3.8) | 3.8 |
| `scripts/build-hero.sh`, `scripts/encode-video.sh` | 11 / 4 | source paths and slug when new footage exists | 5 |
| `styles.css` | `.ch-f42`, `.pick.f42`, `--f42-*` | **keep** internal class names (Hazefall kept `lcs` classes) | - |

Rules for every page: the game is **Pewfield** in sentences and titles, never "PewField", "Pew Field" or "PEWFIELD" in running text (CD brand rule, `brand.ts`: "PEWFIELD in capitals, Pewfield in sentences"; capitals only inside the logo). **FLOOR 42** survives only as the office arena's name. Section ids `floor-42` become `pewfield`; internal links follow.

---

## 3. Exact new text

Character counts measured with Python `len()`.

### 3.1 `games/pewfield.html` (was `games/floor-42.html`)

`git mv games/floor-42.html games/pewfield.html`, then:

**Head**
- `<title>`: `Pewfield - Free 2 Player Shooter in Your Browser | Nalbaki` (58)
- `<meta name="description">`: `Pewfield is a free 1v1 shooting game in your browser: fight a bot or a friend on the same keyboard. Four fighters, two arenas, first to five KOs. No install.` (157)
- `<link rel="canonical" href="https://nalbakigames.com/games/pewfield" />`
- `og:title` = title; `og:description` = description; `og:url` = `https://nalbakigames.com/games/pewfield`
- `og:image` = `https://nalbakigames.com/assets/press/pewfield-share-1200x630.jpg` (copy of `floor-42/public/og.jpg` until a share image with fighters exists; width 1200, height 630)
- `og:image:alt` = `Pewfield logo: the word PEW! in a yellow burst and FIELD on an orange pennant, over blue sky and sand` (describes the current file; change it when the image changes)
- Add `<meta name="twitter:title">` and `<meta name="twitter:description">` with the same text is optional (Twitter falls back to OG). Keep `twitter:card` = `summary_large_image`.

**JSON-LD VideoGame** (replace the block; every field is visible on the page):
```json
{
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "@id": "https://nalbakigames.com/games/pewfield#game",
  "name": "Pewfield",
  "alternateName": "Floor 42",
  "url": "https://nalbakigames.com/games/pewfield",
  "description": "A free side-on 1v1 shooting game in the browser. Fight a bot or a friend on the same keyboard with one of four fighters, in the OFFSITE desert or the FLOOR 42 office. First to five knockouts wins.",
  "image": "https://nalbakigames.com/assets/press/pewfield-share-1200x630.jpg",
  "genre": ["Action", "Shooter"],
  "gamePlatform": "Web browser",
  "applicationCategory": "Game",
  "operatingSystem": "Any (web browser)",
  "playMode": ["SinglePlayer", "MultiPlayer"],
  "numberOfPlayers": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 2 },
  "inLanguage": "en",
  "isAccessibleForFree": true,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://pewfield.nalbakigames.com/"
  },
  "author": { "@id": "https://nalbakigames.com/#org" },
  "publisher": { "@id": "https://nalbakigames.com/#org" }
}
```
Notes: `MultiPlayer` is true through local 2 PLAYER, not online. `alternateName` stays for at least 12 months (until 2027-11) and only while the page says "called Floor 42 until November 2026" (it does, see the lead). Swap `image` to `keyart-pewfield-2560x1440.jpg` when it exists. Add `"sameAs": ["https://www.crazygames.com/game/<slug>"]` only after the CrazyGames page is public and Reis gives the URL. No ratings, no `datePublished` (launch date not confirmed), no `trailer` until a Pewfield clip exists (then add a `VideoObject` with `name`, `description`, `thumbnailUrl`, `uploadDate`, `contentUrl`).

**JSON-LD BreadcrumbList**: position 3 -> `"name": "Pewfield"`, `"item": "https://nalbakigames.com/games/pewfield"`.

**Body**
- Visible breadcrumb last item: `Pewfield`
- `<h1>`: `Pewfield: a free 1v1 shootout for 2 players or vs a bot` (55)
- Lead (GEO summary, self-contained; [align with CD copy] for tone, keep every fact):
  `Pewfield is a free side-on 1v1 shooting game by Nalbaki Games that runs in the browser. Pick one of four fighters, each with a signature trait, and fight a bot (easy, normal or hard) or a friend on the same keyboard, in the OFFSITE desert or the FLOOR 42 office. Your gun aims itself, so it comes down to moving, jumping and timing. First to five knockouts wins. Pewfield was called Floor 42 until November 2026.`
- Actions (ONLINE-OFF):
  - `<a class="btn accent big" href="https://pewfield.nalbakigames.com/characters">Fight a bot <span class="arrow" aria-hidden="true">&rarr;</span></a>`
  - `<a class="btn ghost big" href="https://pewfield.nalbakigames.com/">2 players, one keyboard</a>` (the 2 PLAYER entry is in the main menu; there is no direct 2P URL in the README. If engineering adds one, link it here.)
- Media: remove the Floor 42 `<video>` and both Floor 42 `<figure class="fighters">` blocks until Pewfield assets exist (section 5). Interim: one `<figure>` with the wordmark `/assets/brand/games/pewfield/logo.svg` is acceptable, alt `Pewfield logo`.
- `How to play` (`<ol class="steps3">`):
  1. `<b>Pick</b><span>Four fighters: BRIX, ORMO, ZUZU and TAVO. Each has a signature trait and a little more or less health.</span>`
  2. `<b>Grab a gun</b><span>Everyone starts with a pistol that never runs dry. An SMG, shotgun, Uzi, railgun or rocket launcher turns up on the field.</span>`
  3. `<b>Knock them out</b><span>Dash through shots, take cover, and Force Push to knock your rival back and send their bullets home. First to five KOs wins.</span>`
- `Facts` (`<dl class="spec">`):
  - Genre: `Side-on 1v1 shooter`
  - Modes: `One player against a bot (easy, normal or hard), or two players on one keyboard (first to 3, 5 or 7 KOs)`
  - To win: `First to 5 KOs against the bot`
  - Fighters: `BRIX, ORMO, ZUZU, TAVO, each with a signature trait`
  - Arenas: `OFFSITE, a desert canyon (default), and FLOOR 42, an office after hours`
  - Weapons: `Pistol, SMG, shotgun, Uzi, railgun, rocket launcher, and a bomb that drops in`
  - Plays on: `Laptop with a keyboard; phone or tablet in landscape against the bot, with touch controls`
  - Price: `Free`
  - Made by: `Nalbaki Games`
  - Also known as: `Floor 42 (the name until November 2026)`
- New `Controls` block (replaces the old TODO comment; facts from `floor-42/README.md` Controls; engineering re-checks against the deployed build, G1):
  - `<h2 class="h3-like">Controls</h2>`
  - One player: `A / D move · W jump (twice in the air) · Space shoot · Shift dash · Q Force Push · F swap gun · T switch to mouse aim`
  - Two players on one keyboard: `Player 1: A / D move, W jump, F shoot, G Force Push, H dash. Player 2: arrow keys move and jump, ; shoot, L Force Push, K dash. Gamepads work too.`
- FAQ heading: `Questions about Pewfield`. Items (visible `<details>` only; **no FAQPage markup**: Google limits FAQ rich results to government and health sites since 2023, so the markup buys nothing):
  1. `Is Pewfield free?` -> `Yes, it is free to play in the browser.`
  2. `Do I need to install it?` -> `No. It runs in the browser on a laptop, phone or tablet.`
  3. `Can two people play on one computer?` -> `Yes. Pick 2 PLAYER in the main menu: one player uses WASD, the other the arrow keys, first to 3, 5 or 7 KOs. One or two gamepads work too.`
  4. `Does it work on a phone?` -> `Yes, against the bot, with touch controls in landscape. Two players on one phone need two gamepads.`
  5. `Is Pewfield the same game as Floor 42?` -> `Yes. Floor 42 was renamed Pewfield in November 2026. The office map is still called FLOOR 42.`
  (Drop the old "Can I play online with a friend?" item under ONLINE-OFF.)
- "More games" list: unchanged (Parking Lot, Hazefall).
- Footer Play link: see 3.10.

**Acceptance**: title <= 60, description 120-160, one h1, canonical = own URL, both JSON-LD blocks parse and pass validator.schema.org with zero errors, Rich Results Test shows the breadcrumb, no "Hotfix/Legacy/Standup/Intern" anywhere on the page, no word "online" in a claim of a live feature.

### 3.2 `vercel.json` redirects (append; same pattern as Hazefall)
```json
{ "source": "/games/floor-42", "destination": "/games/pewfield", "permanent": true },
{ "source": "/games/floor-42.html", "destination": "/games/pewfield", "permanent": true }
```
Vercel serves `permanent: true` as 308; Google treats 308 like 301 (Search Central, "Redirects and Google Search"). Acceptance: `curl -sI https://nalbakigames.com/games/floor-42` -> 308, `location: /games/pewfield`. Keep these redirects permanently (they cost nothing; Google advises at least a year).

### 3.3 `sitemap.xml`
- Replace line 7 with `<url><loc>https://nalbakigames.com/games/pewfield</loc><lastmod>DEPLOY_DATE</lastmod></url>`.
- Set `<lastmod>DEPLOY_DATE</lastmod>` (YYYY-MM-DD of the G4 deploy) on every URL whose visible text changes in this spec: `/`, `/games`, `/games/parking-lot`, `/games/hazefall`, `/games/pewfield`, `/services`, `/work`, `/playables`, `/about`, `/contact`, `/press`, `/support` (footer counts). Old URL must not appear.
- `robots.txt`: no change.

### 3.4 `index.html`
- `<meta name="description">` and `og:description`: `Nalbaki Games is an independent studio making original browser games: Parking Lot, Hazefall and Pewfield. Free to play on a laptop or a phone, no install.` (154)
- Hero `<video aria-label>`: keep the label truthful to the footage. Until the montage is re-cut (R-V1): `Gameplay from Hazefall, Parking Lot and Pewfield (from when it was called Floor 42)`. After R-V1: `Gameplay from Pewfield, Hazefall and Parking Lot`.
- Pick card (line 116-121): `href="https://pewfield.nalbakigames.com/characters"`; `<small>1v1 duel &middot; bot or 2 players</small>`; logo `src="/assets/brand/games/pewfield/logo.svg" width="1200" height="520" alt="Pewfield"`; card image: needs `card-pewfield-960.{avif,webp}` (R-A2). Interim if R-A2 is late: keep the card with the old image is **not** allowed (old fighters); use the logo on the card's accent background (CD to confirm the look).
- Band ticker (line 136): both `Floor 42` spans -> `Pewfield`.
- Chapter (192-237): `id="pewfield"`, `aria-labelledby="f42-title-pewfield"`, h2 id `f42-title-pewfield`; logo as on the card, `alt="Pewfield"`; hook `<p class="game-hook">` -> `Two fighters. One field. First to five KOs.` [align with CD copy: from the game README; the old "Code review got personal." is developer-theme copy and must go]; buttons as 3.1 (Fight a bot -> `/characters`; second button `2 players, one keyboard` -> host root); `<p class="desc">`: `A side-on 1v1 shootout in the OFFSITE desert or the FLOOR 42 office. Your gun aims itself, so it all comes down to moving: jump, dash, take cover, and Force Push their bullets straight back at them.` [align with CD copy]; spec list: Genre `Side-on 1v1 shooter` / Mode `Against a bot (easy, normal or hard), or 2 players on one keyboard` / To win `First to 5 KOs` / Plays on `Laptop, or phone in landscape against the bot`; steps3 = the three items in 3.1; remove the old KO figure and video until R-A1/R-V1 (or swap in the new ones); last action `<a class="btn ghost big" href="/games/pewfield">About Pewfield</a>`. Key art background: `ka-pewfield-*` (R-A1); without it the chapter needs a CD-approved fallback (see section 5).
- Footer (364): see 3.10.

### 3.5 `games.html`
- Meta description and `og:description`: `Play Parking Lot, Hazefall and Pewfield: original browser games for laptops and phones. Free, no install, no account.` (117)
- Jump link (71): `<a class="btn ghost" href="#pewfield">Pewfield</a>`
- Chapter (174-220): same changes as the index chapter in 3.4, plus the second action `<a class="btn ghost big" href="/work#pewfield">Speed and specs</a>`.
- Footer (275): 3.10.

### 3.6 `press.html`
- Meta description and `og:description`: `Nalbaki Games press kit: logo, mark and wordmark, colours, key art, screenshots of Parking Lot, Hazefall and Pewfield, a fact sheet and descriptions.` (149)
- Fact sheet (81): `<dt>Games</dt><dd>Parking Lot, Hazefall, Pewfield</dd>`
- Long description (95), replace the Floor 42 clause: `...; and Pewfield (called Floor 42 until November 2026), a side-on 1v1 shooter for one player against a bot or two players on one keyboard, where the first to five knockouts wins.`
- Logo tile (134-135): image `/assets/brand/games/pewfield/logo.svg` `alt="Pewfield logo"` `width="1200" height="520"`; caption `Pewfield logo`; downloads `SVG` -> same svg, `PNG` -> `/assets/press/pewfield-logo-1024.png`, `Share image` -> `/assets/press/pewfield-share-1200x630.jpg`. Note: the logo is drawn for a light/colour background (white letters with grape outline); check it on the `box dark` tile and use `box light` if it reads badly (CD call).
- Screenshots (179-181, 203-209): remove the three Floor 42 figures (old key art, old KO, old titled key art). Add Pewfield figures when R-A1/R-A3 land, with alt text written from the actual images (pattern: `Pewfield: <who> <does what> in the <OFFSITE desert / FLOOR 42 office>`). A press kit must not hand out art of characters that are no longer in the game.
- Footer (228): 3.10.

### 3.7 `work.html`
- Meta description and `og:description`: `How Parking Lot, Pewfield and Hazefall play: load times, download sizes, frame rate and online play that stays fair, measured on the shipped builds.` (148). The netcode was built and measured, so the case study can stand; it describes work, not a live service.
- `<article class="case" id="pewfield">`
- `<h2>`: `Pewfield: an online duel that stays fair`
- First paragraph, prepend: `Pewfield, called Floor 42 until November 2026, is a side-on 1v1 shootout. ` then the existing sentence from "The server, or the host's browser, ..." (adjust the capital). Add after it under ONLINE-OFF: `Public online play is paused for now; the netcode below was built and measured.`
- Image (104): until R-A3, keep the old `floor-42-720.webp` only with alt `Pewfield when it was called Floor 42: a fighter leaps over a desk and fires a rocket across a night-time office` (truthful, no old character names); swap to a Pewfield FLOOR 42 arena capture when available.
- Footer (193): 3.10.

### 3.8 `playables.html`
The Floor 42 playable ad is a finished sample of client-style work; it was made under the old name and the file itself says "FLOOR 42" and "Play Floor 42". Keep it (rebuilding a playable is out of scope) and label it honestly:
- `<article class="pa-item" id="floor-42">` stays (no inbound links to rename).
- `data-title="Floor 42 playable ad"` stays.
- `<h2>`: `Floor 42 (now Pewfield)`
- Description, replace "shoot Legacy" with "shoot your rival", "he" stays; add a last sentence: `Made before the game was renamed Pewfield.`
- Poster alt: `Floor 42 playable: a fighter aims across a night-time office at a rival behind a filing cabinet, with the hint to drag to aim`
- `Play the full game` -> `https://pewfield.nalbakigames.com/`
- Footer (185): 3.10.

### 3.9 `services.html` (231) and online variants
- ONLINE-OFF: `Yes. Pewfield has a server-authoritative online duel that runs a 60 Hz simulation (public play is paused for now), and Hazefall has online rooms of up to ten people, filled to twenty with bots. Multiplayer is quoted separately because it needs a server and more testing.` (Hazefall clause unchanged; see problem 7.)
- ONLINE-ON (only after Reis restarts the server and `/play` works end to end): services line `Yes. Pewfield has a 60 Hz online duel on its own server, ...`; restore a second CTA `Play online 1v1` -> `https://pewfield.nalbakigames.com/play`; add FAQ `Can I play online with a friend?` -> `Yes. Online 1v1 lets you invite a friend with a link or take a quick match.`; add to the meta description nothing (length).
- Footer (279): 3.10.

### 3.10 Footers, cross-links, small lines
- Footer Play link on all 14 pages (index, games, press, work, playables, services, about, support, contact, privacy, 404, games/pewfield, games/hazefall, games/parking-lot): `<li><a href="https://pewfield.nalbakigames.com/characters">Pewfield</a></li>`
- `games/hazefall.html` and `games/parking-lot.html` "More games": `<li><a href="/games/pewfield">Pewfield, a free browser 1v1 shooter for 2 players</a></li>`
- `about.html` (82): `The first three, <a href="/games">Parking Lot, Hazefall and Pewfield</a>, each try ...` (rest unchanged)
- `support.html` meta description and `og:description`: `Our games are free. Support Nalbaki Games to help make the next one, or get help with Parking Lot, Hazefall and Pewfield: report a bug or share feedback.` (145; the old 167-char version was too long, "ask a question" dropped).

### 3.11 Scripts
- `site.js` (317): `const GAMES = { 'parkinglot.nalbakigames.com': 'parking-lot', 'hazefall.nalbakigames.com': 'lcs', 'pewfield.nalbakigames.com': 'floor-42', 'floor42.nalbakigames.com': 'floor-42' };` (keep the internal id `floor-42` so stats stay one series, as Hazefall kept `lcs`; keep the old host key for stray links.)
- `vendor/nalbaki-support/core.js` (123), same change in `floor-42/src/vendor/nalbaki-support/core.js`: `line: 'to switch Pewfield's online duels back on, and for Hazefall rooms.'`, `short: 'for online duels'`. [align with CD copy; under ONLINE-ON use `'for quick online duels in Pewfield and rooms in Hazefall.'`]. Escape the apostrophe or use a template string.

### 3.12 Site `README.md`
- Line 13: `| /games | games.html | Parking Lot, Hazefall, Pewfield: real gameplay clips, how a round plays, play links |`
- Add a row after `/games`: `| /games/<slug> | games/*.html | One page per game (parking-lot, hazefall, pewfield): summary, facts, FAQ, VideoGame data. Old slugs 301 in vercel.json |`
- Line 49: `Pewfield gold` instead of `Floor 42 gold` (or the accent the CD picks in R-A4).
- Line 62: `Pewfield from ...` once new captures exist; until then `Floor 42 (now Pewfield) from a bot-against-bot match in the old office; to be replaced`.
- Deploy paragraph: add `and redirects /games/last-commit-standing and /games/floor-42 to the renamed pages` after the donate redirect note.

---

## 4. Game host: floor42.nalbakigames.com -> pewfield.nalbakigames.com

**How Hazefall is set up (verified 2026-11-28):**
- DNS is on Cloudflare (`dig NS nalbakigames.com`: `cory.ns.cloudflare.com`, `anahi.ns.cloudflare.com`).
- `hazefall.` and `lastcommit.` both CNAME to the same Vercel target (`d666e5f8edac1d59.vercel-dns-017.com.`), so both are domains on one Vercel project. The records resolve to Vercel, not to Cloudflare IPs, so they are DNS-only (grey cloud).
- `lastcommit.nalbakigames.com/` and `/play` return **308** to `hazefall.nalbakigames.com` with the path kept, and `/play?room=AbC12` keeps the query (`location: https://hazefall.nalbakigames.com/play?room=AbC12`). The hazefall repo's `vercel.json` has no host redirect, so this is the Vercel project's **Domains -> Redirect to another domain** setting.
- `floor42.nalbakigames.com` CNAMEs to `5d2e2b52607fdbaa.vercel-dns-017.com.` (the game's Vercel project). The `floor-42` repo has no `vercel.json` and no `.vercel/` folder, so its project settings live only in the Vercel dashboard (Next.js preset).
- `pewfield.nalbakigames.com` does not resolve yet.

**Steps (Reis, needs the Vercel and Cloudflare accounts; about 15 minutes):**
1. Vercel -> the project that serves `floor42.nalbakigames.com` -> Settings -> Domains -> Add `pewfield.nalbakigames.com`. Vercel shows the CNAME target it wants.
2. Cloudflare -> nalbakigames.com -> DNS -> Add record: Type `CNAME`, Name `pewfield`, Target = the value Vercel shows, Proxy status **DNS only** (grey cloud), like `floor42` and `hazefall`.
3. Wait for Vercel to show "Valid Configuration" and the certificate. Check `curl -sI https://pewfield.nalbakigames.com/` -> 200 and the Pewfield title.
4. Only after G3 (metadata points at pewfield) and G4: in Vercel Domains, edit `floor42.nalbakigames.com` -> **Redirect to** `pewfield.nalbakigames.com`, status **308 Permanent**. Then make `pewfield.` the primary domain if Vercel asks.
5. Keep the `floor42` CNAME and the redirect for good (at least 12 months; cost is zero). Do not delete the old domain from the project.
6. Skip the `pew-field.` typo subdomain the brand README suggests: nobody types a subdomain from memory, and search engines handle "pew field" as a query. One more domain to maintain, no benefit. (Disagreeing with CD brand README section 4, once.)
7. The Fly app `floor42-game` and `wss://floor42-game.fly.dev` stay (internal; renaming costs a redeploy for no player-visible gain). The Colyseus server has no origin allowlist (grep of `server/` for "origin" found nothing), so the host change does not break online play if it returns.

**Acceptance (after step 4):**
- `curl -sI https://floor42.nalbakigames.com/characters` -> 308, `location: https://pewfield.nalbakigames.com/characters`
- `curl -sI "https://floor42.nalbakigames.com/play?room=AbC12"` -> 308 to `https://pewfield.nalbakigames.com/play?room=AbC12`
- `curl -sI "https://floor42.nalbakigames.com/arena?p1=legacy&p2=standup&bot=hard"` keeps path and query.
- One hop only (no 308 -> 308 chain).

---

## 5. Assets: what the rename needs and what to do meanwhile

Requests for the Creative Director and video lead (engineering relays them as R-items in `floor-42/docs/collab/REQUESTS.md`; I do not write there). Pewfield brand files already exist in the game repo and can be copied now.

| ID | Need | Source / owner | Interim until it exists |
|---|---|---|---|
| R-A0 | `assets/brand/games/pewfield/logo.svg` and `emblem.svg` | copy `floor-42/public/brand/logo.svg` (1200x520) and `emblem.svg` now | - |
| R-A0b | `assets/press/pewfield-share-1200x630.jpg`, `pewfield-logo-1024.png` | copy `floor-42/public/og.jpg`; export the PNG from `CREATIVE/brand/png/a-wordmark.png` | - |
| R-A1 | Key art `ka-pewfield-{960,1600,2560}.{avif,webp}` + `assets/press/keyart-pewfield-2560x1440.jpg`: two of the new fighters facing off in OFFSITE, textless (the page prints the logo) | CD; can reuse the R-029 CrazyGames 1920x1080 cover capture | Chapters on `/` and `/games` need a CD-approved fallback (for example the accent background plus logo). **Not** the old office art. |
| R-A2 | Card `card-pewfield-960.{avif,webp}` (tight crop of R-A1) | CD | logo on accent background |
| R-A3 | Press screenshots: one OFFSITE, one FLOOR 42 office with the new roster, one knockout; 1600x900 JPG + 720/1280 webp | CD / engineering capture | none shown |
| R-A4 | Site accent colour for Pewfield (`--f42-acc` today = gold) and logo-on-dark check | CD | keep gold |
| R-A5 | New `assets/og.jpg` (studio share image) without Floor 42 art; then change the 11 `og:image:alt` lines to `Nalbaki Games logo over key art from Parking Lot, Hazefall and Pewfield` | CD | keep the old file **and** its old alt (they match) |
| R-V1 | Pewfield gameplay clips `assets/video/pewfield-{720,1080}.{webm,mp4}` + poster `pewfield-poster-1280.webp`, and a new hero montage | game-video-lead (`scripts/encode-video.sh`, `scripts/build-hero.sh`: update `F42_SRC` path and slug) | remove the Floor 42 clip from the game page and chapters; hero keeps the old montage with the interim aria-label (3.4) |

Old `floor-42*` asset files: stop referencing them; move them to `games-studio/_archive/2026-11/` once nothing links to them (Reis approved archive, not delete, HANDOFF). Do not 301 image URLs (no value).

When R-A1/R-V1 land: put the video and figures back on `/games/pewfield` with alt text written from the real frames, add the `VideoObject` (3.1 notes), bump sitemap `lastmod`.

---

## 6. Reis by hand (accounts, nothing posted)

1. Section 4 steps 1-5 (Vercel domain, Cloudflare CNAME, then the 308 redirect).
2. Approve the push/merge of `portal-build` to the game's production branch (G1).
3. Decide ONLINE-OFF (default) or ONLINE-ON. ON only if the Fly server is running and an invite link works between two devices.
4. Search Console: if the `nalbakigames.com` Domain property exists (PLAN.md manual step 1), the new subdomain is covered; submit `https://nalbakigames.com/sitemap.xml` again and URL-inspect `https://nalbakigames.com/games/pewfield` -> Request indexing. The Change of Address tool is optional here: the old host had no measurable search presence (AUDIT.md). [Uncertain value]
5. Bing Webmaster Tools: submit the sitemap again; URL Submission for `/games/pewfield` (Bing feeds ChatGPT search and Copilot).
6. Update the name wherever it is outside our repos and Reis controls it: CrazyGames listing (R-029, today), any itch.io page, GitHub repo description/website field (`hacagahasanli/pewfield` already renamed), social bios. Same name, same one-line description everywhere (entity consistency).

---

## 7. Engineering items in the game repo (`floor-42`, Next.js)

| ID | File | Change | Acceptance |
|---|---|---|---|
| E-1 | `src/app/layout.tsx` | `metadataBase: new URL('https://pewfield.nalbakigames.com')` and delete the "address stays floor42" comment. Ship together with G2 (before the old host redirects), so OG/canonical URLs never point at a host that is about to redirect. | built HTML on `/` shows `og:image` = `https://pewfield.nalbakigames.com/og.jpg` |
| E-2 | `layout.tsx` | add `applicationName: 'Pewfield'`, `alternates: { canonical: '/' }`, and a full `openGraph: { type: 'website', siteName: 'Pewfield', url: '/', title: <default title>, description: <description>, images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Pewfield logo: the word PEW! in a yellow burst and FIELD on an orange pennant' }] }` and `twitter: { card: 'summary_large_image', title, description, images: ['/og.jpg'] }` | `curl -s https://pewfield.nalbakigames.com/ \| grep -E 'canonical\|og:title\|og:description\|og:url'` shows all four |
| E-3 | `layout.tsx` description | stop using `COPY.tagline` (office copy). SEO-required content: free, 1v1 / two players, bot, browser, studio. Text: `A free side-on 1v1 shootout from Nalbaki Games: fight a bot or a friend on one keyboard, four fighters, two arenas, first to five KOs.` (134) [align with CD copy: R-029 approves or replaces it; CD also owns whether `COPY.tagline` changes in-game] | description 120-160 chars, no "coworkers" |
| E-4 | title default | keep `Pewfield — 1v1 shootout · Nalbaki Games` (39) unless R-029 replaces the suffix. From search: "1v1" matches observed queries ("1v1 shooter games online"); "2 player" would match more ("2 player shooter games"); either is fine, CD decides. Template `%s · Pewfield` stays. | title contains "Pewfield" and "Nalbaki Games" |
| E-5 | route metadata | `src/app/characters/page.tsx`: `alternates: { canonical: '/characters' }`. `src/app/play/page.tsx`: `alternates: { canonical: '/play' }` (invite links `?room=` collapse to it). `src/app/arena/page.tsx`: `robots: { index: false, follow: true }` (endless `?p1=&p2=&bot=` variants, no content of its own). | arena HTML has `<meta name="robots" content="noindex, follow">` |
| E-6 | `portal/index.html` (CrazyGames build) | `<title>` and meta description per R-029 (CD) | matches CG listing |
| E-7 | `README.md` (game) | line 9 links -> `pewfield.nalbakigames.com/play` and `/characters`; replace the `Last Commit Standing` link with `[Hazefall](https://hazefall.nalbakigames.com)`; Status row "live at pewfield.nalbakigames.com" | no `floor42.nalbakigames.com` in README except a "formerly" note |
| E-8 | `src/components/lobby/lobbyView.test.ts` 152-155 | add a `pewfield.nalbakigames.com/play?room=` case next to the floor42 one (old links still parse) | test passes |
| E-9 | storage keys `floor42:*`, Fly app `floor42-game` | **no change** (saved settings survive; CD brand README agrees) | - |

Optional, P2: VideoGame JSON-LD on the game host root pointing `@id` to `https://nalbakigames.com/games/pewfield#game` (one entity, two pages). Low value; the studio page is the entity home.

---

## 8. Keyword research (2026-11-28)

**Method and limits.** Google autocomplete via `suggestqueries.google.com` (client=firefox, hl=en, gl=us), WebSearch (US), direct URL checks on CrazyGames. No keyword tool or Search Console data, so **there are no volumes here**: anything about size or difficulty is [Estimate]. Autocomplete shows that a query is typed often enough to be suggested, not how often.

**Observed**
| Seed | Autocomplete suggestions (verbatim, selection) | Read |
|---|---|---|
| `pewfield` | none | Brand demand is zero today, as expected for a new name. |
| `pew field game` | none | |
| WebSearch `"pewfield" game` | no result with the exact name (nearest: Pew Pew Puzzle Defense, PewZoomBoom, Pew Pew Pets) | The branded SERP is empty, so once indexed we should own it. [Estimate] |
| `2 player shooting games` | ps5, offline, **online**, pc, xbox, switch | Head term; console-heavy intent. |
| `2 player shooter` | games, games ps5, games pc, **arcade games** | |
| `1v1 shooter` | games, roblox, **online**, steam, **games online**, free | |
| `1v1 shooting games` | **online**, roblox, mobile, steam, `1v1 gun games`, `1vs1 shooting games` | |
| `1v1 browser game` | browser games **online**, **with friends**, reddit, `1v1 web games`, `1v1 online games free` | Browser intent exists and is "with friends". |
| `2 player games same keyboard` | **one keyboard**, pc same keyboard, `two player games online one keyboard`, keyboard and controller | Exactly our 2 PLAYER mode. |
| `2 player gun game` | gun games, **online**, **poki**, **free**, pc, flash | Portal intent ("poki", "flash"). |
| `shooting games 2 player` | online, pc, `gun games 2 player` | |
| `1v1 game online free` | `fun 1v1 games online free`, `1v1 lol ...` | 1v1.LOL owns much of "1v1 ... online free". |
| CrazyGames categories | `/t/2-player` -> 301 to `/multiplayer?tab=2-player`; `/t/shooting` -> 302 to `/c/shooting`; `/t/gun` 200; `/t/1v1` 404 | Portal taxonomy is "2 player", "shooting", "gun"; "1v1" is not a CrazyGames tag. |

**Targets for `/games/pewfield`** (status: spec'd in section 3)
| Query | Intent | Target | Note |
|---|---|---|---|
| pewfield / pewfield game / pewfield nalbaki | brand | LP + host | Zero demand now; grows with CrazyGames plays. Must return us first. |
| 2 player shooter games (browser / free / online) | play | LP title + h1 | Head term owned by portals and console lists [Estimate: hard to rank in 6 months]; we use it for relevance, not expected top-10. |
| 2 player games one keyboard / same keyboard shooter | play | LP FAQ 3, controls | Best long-tail fit; real, distinctive mode. [Estimate: winnable] |
| 1v1 shooter games online / 1v1 gun games | play | LP h1, description | "online" implies online play: honest only under ONLINE-ON. Rank for "1v1 shooter browser/free" instead. |
| 1v1 browser games with friends | play | LP | Local 2P qualifies; online would make it stronger. |
| 2 player gun games poki / crazygames | portal nav | CrazyGames listing | Portal pages win these; the CG listing (R-029) is our entry, not the site. |
| floor 42 game nalbaki | old brand | LP via `alternateName` + "Is Pewfield the same game as Floor 42?" | Keeps old links and mentions joined to the new name. |

AI prompts to test after indexing (log in `VISIBILITY.md`): "What is Pewfield?", "free 2 player shooting game on one keyboard in the browser", "1v1 browser shooter I can play against a bot", "Is Floor 42 by Nalbaki Games the same as Pewfield?".

**For CrazyGames (CD owns the copy, R-029; my input only):** suggested tags `2 Player`, `Shooting`, `Gun` (these are real CG category pages; `1v1` is not). The CD name doc suggested the CG title `Pewfield: 2 Player Duel`; from the autocomplete data "2 player" is the right modifier, and CrazyGames titles usually carry only the name. Reis/CD decide.

---

## 9. Measurement

- After G5: run every acceptance check in sections 3.1, 3.2 and 4; record results in `docs/growth/LOG.md`.
- +7 days: `site:nalbakigames.com pewfield` and the query `pewfield` on Google and Bing; record in `VISIBILITY.md` (date, engine, query, result).
- +14 days: the four AI prompts above in ChatGPT search, Perplexity and Gemini where reachable; record what is actually shown.
- Search Console (if verified): impressions for queries containing "pewfield", "2 player", "one keyboard" on `/games/pewfield`.
