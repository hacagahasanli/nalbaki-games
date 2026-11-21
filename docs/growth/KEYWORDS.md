# Keywords and AI prompts

Date: 2026-11-21. ASSUMPTION: no keyword-tool data (Ahrefs not authenticated, Search Console not set up). Queries below are my judgement of how players phrase things; volume and difficulty are unmeasured. Validate with Google autocomplete / People Also Ask / Search Console once live. Competition notes are qualitative.

Reality check: generic head terms ("parking game", "battle royale browser") are dominated by CrazyGames, Poki, Y8, itch.io, Wikipedia-class pages. A new one-developer domain will not win these soon. Realistic order: (1) brand queries, (2) long-tail descriptive queries, (3) portal listings that rank on the head terms for us.

Owner pages: LP = new landing page on nalbakigames.com (PLAN P0-1). Status: all `planned`.

## Studio
| Query | Intent | Owner page | Notes |
|---|---|---|---|
| nalbaki games | navigational/brand | `/` | Must own #1; unique name, low competition. Verify indexing first. |
| nalbaki games browser games | navigational | `/games` | |
| nalbakigames.com | navigational | `/` | |
| free browser games no download | commercial/browse | `/games` | Very high competition; support goal only. |
| indie browser game studio | informational | `/about` | Low volume. |
| hire browser game developer / custom browser game developer | commercial (B2B) | `/services` | Medium competition; fixed prices once set in `pricing.js`. |
| playable ads developer / HTML5 playable ad studio | commercial (B2B) | `/playables` | Niche, beatable; MRAID/AppLovin/Unity/Meta/Google terms already in copy. |
| portal-ready HTML5 game CrazyGames Poki SDK developer | commercial (B2B) | `/services` | Niche. |
| three.js game developer for hire | commercial | `/services` | Medium. |
| Nalbaki Games press kit | navigational | `/press` | |

## Parking Lot (careful-driving parking race, solo vs 3 bots, 1-3 min rounds)
| Query | Intent | Owner | Notes |
|---|---|---|---|
| parking lot game online free | play | LP /games/parking-lot | Ambiguous with puzzle "Parking Lot" (Novel Games, itch.io) - seen in my 2026-11-21 search. Name collision risk: always pair with "Nalbaki". |
| car parking game browser no download | play | LP | High competition (portals). |
| parking game vs bots race | play | LP | Long-tail, our real differentiator (race to the bay). |
| parking race game online | play | LP | Low-medium. |
| car parking game on phone no install | play | LP | |
| parking game where you race for the last spot | play | LP | Descriptive long-tail; good for AI answers. |
| Nalbaki Parking Lot | brand | LP | |
AI prompts: "What is a free browser parking game where you race other cars to the only free space?", "Best browser car parking games that work on a phone", "Is there a parking game with bots I can play without downloading?"

## Last Commit Standing (battle royale, 20 players = you + 19 bots, ~4 min rounds, parachute drop, shrinking zone)
| Query | Intent | Owner | Notes |
|---|---|---|---|
| battle royale browser game free | play | LP /games/last-commit-standing | Very high competition (Krunker-type, Surviv-type). |
| battle royale no download phone | play | LP | |
| 3d battle royale browser vs bots | play | LP | Long-tail; matches "solo against 19 bots". |
| short battle royale 4 minute rounds | play | LP | Distinctive angle. |
| battle royale you can play on a laptop without installing | play | LP | |
| Last Commit Standing game | brand | LP | Unique name. |
| game with a parachute drop in the browser | play | LP | |
AI prompts: "Best free battle royale games that run in a browser", "Is there a battle royale I can play on my phone without downloading?", "What is Last Commit Standing?"
Note: do not claim multiplayer rooms; copy says "rooms with friends coming soon" (games.html:158).

## Floor 42 (1v1 office shootout, bot or online, first to five KOs)
| Query | Intent | Owner | Notes |
|---|---|---|---|
| 1v1 shooting game browser | play | LP /games/floor-42 | High competition; online 1v1 is the angle. |
| two player shooter online no download | play | LP | |
| office shooter game browser | play | LP | Low-medium; distinctive setting. |
| play 1v1 against a bot browser | play | LP | |
| online 1v1 duel game link invite friend | play | LP | Only claim invite links if the game supports them (verify with BRIEF.md). |
| Floor 42 game | brand | LP | Ambiguous (Douglas Adams, buildings): add "Nalbaki". |
AI prompts: "Free 1v1 browser shooter I can play against a friend", "What is Floor 42 by Nalbaki Games?"

## Cross-game / list queries (earned via portals and lists)
| Query | Owner | Notes |
|---|---|---|
| best browser games no download 2026 | off-site lists | Pitch only where lists accept submissions (OFFSITE, later). |
| free browser games that work on phone | `/games` | |
| games like <known browser game> | do not target | Competitor-name ranking is off-limits except honest comparison. |

## Next measurement steps
1. After indexing: Search Console Performance -> real queries replace this list.
2. Re-run each AI prompt above monthly in ChatGPT, Perplexity, Gemini, Google AI Mode, Claude; record in VISIBILITY.md (date, tool, query, result).
