# Nalbaki Games

The studio website for **Nalbaki Games** at [nalbakigames.com](https://nalbakigames.com): an independent studio making
original browser games, and building games to order.

Plain HTML, CSS and a few lines of JS. No build step, no dependencies.

## Pages

| Path | File | What it is |
| --- | --- | --- |
| `/` | `index.html` | "One more round" hero over looping gameplay with a game-select row, featured Parking Lot, full-bleed key art chapter per game, the studio, house rules, hire |
| `/games` | `games.html` | Parking Lot, Hazefall, Pewfield: real gameplay clips, how a round plays, play links |
| `/games/<slug>` | `games/*.html` | One page per game (parking-lot, hazefall, pewfield): summary, facts, FAQ, VideoGame data. Old slugs 301 in vercel.json |
| `/services` | `services.html` | Four fixed-price packages with scope; prices come from `pricing.js` |
| `/work` | `work.html` | Case studies; every number lists its source |
| `/playables` | `playables.html` | Three live playable ads in phone frames (builds in `assets/playables/`, styles and loader in `playables.css` and `playables.js`); numbers from each playable repo's size and verify reports |
| `/about` | `about.html` | One-developer studio, how the work is done, the name |
| `/contact` | `contact.html` | `mailto:hello@nalbakigames.com` and what to put in a brief |
| `/press` | `press.html` | Fact sheet, descriptions, logos, colours, screenshots |
| (any) | `404.html` | Not found |

## Set the prices

Edit **`pricing.js`**. It is the only place prices live:

```js
playable: { price: null, days: 5, unit: 'per playable' },
```

`price: null` shows a dashed "Price TBD" badge; a number (e.g. `1200`) shows `$1,200 per playable`.
`days` is the delivery time shown on the card; the defaults are suggestions, confirm them.

## Run locally

```bash
npx serve .          # http://localhost:3000, clean URLs (/games serves games.html)
```

## Deploy (Vercel)

`vercel.json` turns on clean URLs, caches `/assets` for 30 days, adds basic security headers and redirects the old
`/donate.html` to `/`, and redirects /games/last-commit-standing and /games/floor-42 to the renamed pages. Import the repo in Vercel as a static site (framework preset "Other", no build command, output
directory `.`), then add `nalbakigames.com` and `www.nalbakigames.com` under Settings > Domains.

## Brand

The mark is a heavy, slanted N cut by a single slash; the wordmark is NALBAKI GAMES in Bricolage Grotesque, heavy and
slanted. Colours: signal orange `#FF4D2E`, night `#0B0C10`, bone `#F2EFE8`; each game keeps its own accent (Parking Lot
yellow, Hazefall green, Pewfield gold). Text on orange is always the dark night colour (white fails contrast).

- `assets/brand/`: SVG logo lockups (`-on-dark`, `-on-light`, `-mono-light`, `-mono-dark`), wordmarks, the mark in
  orange, light and dark, the app icon (orange chamfered tile), the square tile and a 512 px avatar PNG.
- `favicon.ico` (16-64 px, the slashed N on night, same as the app icon), `assets/favicon-16.png`,
  `assets/favicon-32.png`, `apple-touch-icon.png`, `assets/icon-192.png`, `assets/icon-512.png`, `assets/og-v2.jpg`.
- `docs/screens-redesign/brand-sheet.png` shows every version at size, including 16 and 32 px, the key art and the
  share image.

## Key art and clips

`assets/img/ka-*.{avif,webp}` (960, 1600, 2560 px) are frames captured from the games running locally at 2x:
Parking Lot from its cover camera rig, Hazefall from the parachute drop over the farm (seeded solo round),
Pewfield (called Floor 42 until November 2026) from a real bot-against-bot frame on OFFSITE (Creative Director set,
`brand/pewfield/site/`; its home card uses `ka-pewfield-960`). `assets/img/card-*-960.{avif,webp}` are tighter
crops of the same frames for the home page game cards. Pewfield has no gameplay clip yet; the home hero loop
(`hero-v2-*`) is Hazefall and Parking Lot only until one exists. Titled 2560x1440 versions are in `assets/press/keyart-*.jpg`.

The gameplay clips are recorded frame by frame: each game runs in Chrome on virtual time (requestAnimationFrame,
`performance.now` and `Date.now` advance 1/60 s per frame, with `Math.random` seeded), every frame is screenshotted
at 1920x1080 and the frames are encoded afterwards, so the footage is smooth whatever the machine. HUD text is hidden.
Each game has `assets/video/<game>-1080.{webm,mp4}` (60 fps) and `<game>-720.{webm,mp4}` (30 fps, for phones):
VP9 two-pass and H.264 High CRF 20, 12-15 s, silent, with a poster `assets/img/<game>-poster-1280.webp` from the same
footage. `assets/video/hero-v2-*` (built by `scripts/build-hero.sh`) is the home page's gameplay loop; it loads after the page.

## Files

- `styles.css`: the whole design system (tokens at the top; each game has its own accent: `.ch-pl`, `.ch-lcs`, `.ch-f42`).
- `site.js`: phone menu, header that steps aside on scroll, scroll reveals, pointer tilt, the home hero loop,
  key-art zoom, gameplay clips that play only while on screen (never with reduced motion or Save-Data), and prices.
- `assets/img/`: WebP posters and frames from the real games. `assets/video/`: 1080p60 and 720p30 clips (VP9 WebM and H.264 MP4), silent, 12-15 s.
- `assets/press/`: full-size screenshots and logo PNGs.
- `assets/fonts/bricolage-var.woff2`: Bricolage Grotesque variable latin subset, weight 400-800, width 75-100
  (SIL Open Font License 1.1).
- `docs/screens-redesign/`: desktop (1440 px) and phone (390 px) screenshots of every page.
- `sitemap.xml`, `robots.txt`.
