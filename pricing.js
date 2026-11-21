// ============================================================================
// OWNER: SET YOUR PRICES HERE. This is the only place prices live.
//
// price: a number in `currency` (e.g. 1200), or null while it is not decided.
//        null shows a dashed "Price TBD" badge on /services.
// days:  delivery time in working days, shown on the package card.
//        These are suggested starting values; confirm or change them.
// unit:  the small text after the price.
// ============================================================================
window.NALBAKI_PRICING = {
  currency: 'USD',
  packages: {
    playable: { price: 249, days: 5, unit: 'per playable' },
    portal: { price: 229, days: 5, unit: 'per game' },
    game: { price: 599, days: 10, unit: 'fixed price' },
    webgl: { price: 199, days: 5, unit: 'per sprint' },
  },
};
