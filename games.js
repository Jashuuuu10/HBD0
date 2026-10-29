/**
 * ═══════════════════════════════════════════════════════════════════════════
 * EDITABLE DATA FILE FOR THREE MINI-GAMES
 * ═══════════════════════════════════════════════════════════════════════════
 * - Game A: Mission: Find My Heart (Levels, mazes, grids)
 * - Game B: How Well Do You Know Us? (Relationship quiz questions & playful outcomes)
 * - Game C: Choose Our Movie Universe (Fictional couple universe options & outcomes)
 */

/* ─────────────────────────────────────────────────────────────────────────
 * GAME A: Mission: Find My Heart 💗
 * ───────────────────────────────────────────────────────────────────────── */
export const findMyHeartLevels = [
  {
    level: 1,
    title: 'Starry Garden',
    subtitle: 'A gentle path under the starlight to reach Manisha.',
    gridSize: { cols: 9, rows: 7 },
    start: { x: 1, y: 1 },
    heart: { x: 7, y: 5 },
    // 0 = open path, 1 = wall/cosmic obstacle
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 1, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
  {
    level: 2,
    title: 'Twinkling Nebula',
    subtitle: 'Winding nebula paths where love finds its direction.',
    gridSize: { cols: 9, rows: 7 },
    start: { x: 1, y: 1 },
    heart: { x: 7, y: 3 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
  {
    level: 3,
    title: 'Cosmic Labyrinth',
    subtitle: 'Across every obstacle in space, my heart will always reach you.',
    gridSize: { cols: 9, rows: 7 },
    start: { x: 1, y: 5 },
    heart: { x: 7, y: 1 },
    grid: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
  },
];

export const findMyHeartVictoryMessage =
  'No matter how many paths the universe creates, my heart will always find its way to you, Manisha. ❤️';


/* ─────────────────────────────────────────────────────────────────────────
 * GAME B: How Well Do You Know Us? 🎬
 * ───────────────────────────────────────────────────────────────────────── */
export const relationshipQuizQuestions = [
  {
    id: 1,
    question: 'Who is more dramatic in everyday life?',
    choices: [
      { text: 'You (Me)', tag: 'me' },
      { text: 'Manisha', tag: 'manisha' },
      { text: 'Both of us equally', tag: 'both' },
    ],
    explanation: 'Those dramatic sighs, eye rolls, and theatrical pauses make regular life feel like a Tollywood blockbuster! 🎭',
  },
  {
    id: 2,
    question: 'Who gets angry or annoyed first?',
    choices: [
      { text: 'You (Me)', tag: 'me' },
      { text: 'Manisha', tag: 'manisha' },
      { text: 'Depends on hunger levels', tag: 'both' },
    ],
    explanation: 'The famous "tiny angry pout" is cute, but hunger is definitely the secret culprit behind 90% of all mood shifts! 🍟',
  },
  {
    id: 3,
    question: 'Who is usually the first one to say sorry?',
    choices: [
      { text: 'You (Me)', tag: 'me' },
      { text: 'Manisha', tag: 'manisha' },
      { text: 'Whoever misses the other first', tag: 'both' },
    ],
    explanation: 'At the end of the day, ego has zero chance against how much we simply want to talk and hear each other’s voice. ❤️',
  },
  {
    id: 4,
    question: 'Who is secretly more childish and silly?',
    choices: [
      { text: 'You (Me)', tag: 'me' },
      { text: 'Manisha', tag: 'manisha' },
      { text: 'Both when we are alone together', tag: 'both' },
    ],
    explanation: 'With the rest of the world we pretend to be responsible adults, but together we are two goofy kids laughing at nothing! 🧸',
  },
  {
    id: 5,
    question: 'Who would survive longer in a zombie apocalypse?',
    choices: [
      { text: 'You (Me) — running tactics', tag: 'me' },
      { text: 'Manisha — pure survival instinct', tag: 'manisha' },
      { text: 'We stick together or go down together', tag: 'both' },
    ],
    explanation: 'Manisha would probably negotiate with the zombies, or we would build a fortified snack bunker and survive in style! 🧟‍♂️',
  },
  {
    id: 6,
    question: 'Who is more likely to start laughing at a very serious moment?',
    choices: [
      { text: 'You (Me)', tag: 'me' },
      { text: 'Manisha', tag: 'manisha' },
      { text: 'One look at each other and it’s game over', tag: 'both' },
    ],
    explanation: 'Just one accidental eye contact and trying to hold in the laughter becomes a high-stakes endurance sport! 🤫😂',
  },
  {
    id: 7,
    question: 'Who takes longer getting ready for an outing?',
    choices: [
      { text: 'You (Me)', tag: 'me' },
      { text: 'Manisha', tag: 'manisha' },
      { text: 'We both take our sweet time', tag: 'both' },
    ],
    explanation: '"I am ready in 5 minutes" really means "Let me pick between 3 outfits and check the mirror 7 more times." And you look stunning every time! 👗✨',
  },
  {
    id: 8,
    question: 'Who gives the warmest, most comforting hugs?',
    choices: [
      { text: 'You (Me)', tag: 'me' },
      { text: 'Manisha', tag: 'manisha' },
      { text: 'When we hug, all stress melts away', tag: 'both' },
    ],
    explanation: 'Your hugs are literally like wrapping yourself in a warm blanket by a fireplace after walking in the freezing rain. 🤍',
  },
  {
    id: 9,
    question: 'Who gets random food cravings at 11:30 PM?',
    choices: [
      { text: 'You (Me)', tag: 'me' },
      { text: 'Manisha', tag: 'manisha' },
      { text: 'Midnight snack squad forever', tag: 'both' },
    ],
    explanation: '"I am not even hungry... but what if we had ice cream or spicy noodles right now?" Classic midnight tradition! 🍜🍦',
  },
];

export const quizConclusionMessage =
  "Every answer confirms what my heart has always known: whether we are teasing each other, laughing until our stomachs hurt, or being silly kids, we are the absolute best team in this universe. Happy Birthday, my favourite person, Manisha! ❤️";

