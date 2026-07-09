/* ============================================================
   SITE DATA
   ------------------------------------------------------------
   Two things live here, both meant to be edited freely:

   1. HERO_IMAGES - the photos that rotate behind the hero quote.
      Three original generated backgrounds ship as defaults.
      TO ADD YOUR OWN PHOTOS:
        a) drop the image file into assets/images/hero/
        b) add its filename to the HERO_IMAGES array below
        c) delete lines you don't want (the defaults are safe
           to remove once you have real photos)
      Use wide/landscape photos, ideally 1900px+ wide, so they
      stay sharp on large screens.

   2. QUOTES - one is chosen at random on every page load and
      shown over the hero image. Add / remove / edit freely -
      keep "text" and "author" as separate fields.
============================================================ */

const HERO_IMAGES = [
  'assets/images/hero/hero-1.svg',
  'assets/images/hero/hero-2.svg',
  'assets/images/hero/hero-3.svg',
];

const QUOTES = [
  {
    text: "Behind it all is surely an idea so simple, so beautiful, that when we grasp it — in a decade, a century, or a millennium — we will all say to each other, how could it have been otherwise?",
    author: "John Archibald Wheeler"
  },
  {
    text: "I think I can safely say that nobody understands quantum mechanics.",
    author: "Richard Feynman"
  },
  {
    text: "Anyone who is not shocked by quantum theory has not understood it.",
    author: "Niels Bohr"
  },
  {
    text: "God does not play dice with the universe.",
    author: "Albert Einstein"
  },
  {
    text: "The task is not so much to see what no one has yet seen, but to think what nobody has yet thought, about that which everybody sees.",
    author: "Erwin Schrödinger"
  },
  {
    text: "Not only is the Universe stranger than we think, it is stranger than we can think.",
    author: "Werner Heisenberg"
  },
  {
    text: "Science cannot solve the ultimate mystery of nature. And that is because, in the last analysis, we ourselves are part of the mystery that we are trying to solve.",
    author: "Max Planck"
  },
  {
    text: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
    author: "Marie Curie"
  },
  {
    text: "What I cannot create, I do not understand.",
    author: "Richard Feynman"
  },
  {
    text: "My goal is simple. It is a complete understanding of the universe, why it is as it is and why it exists at all.",
    author: "Stephen Hawking"
  },
];

// Exposed on window so main.js can read them without a bundler/import step.
window.SITE_DATA = { HERO_IMAGES, QUOTES };
