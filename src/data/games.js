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


/* ─────────────────────────────────────────────────────────────────────────
 * GAME C: Choose Our Movie Universe 🎥
 * ───────────────────────────────────────────────────────────────────────── */
export const movieUniverseChoices = [
  {
    id: 'aot',
    pair: 'Eren & Mikasa',
    franchise: 'Attack on Titan',
    badge: 'Fierce Devotion',
    symbol: '🧣',
    theme: 'The Red Scarf of Endless Shelter',
    bgGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(180, 83, 9, 0.25))',
    accentColor: '#f97316',
    description:
      'A bond forged through chaos where loyalty never wavers. No matter how wild the world gets, wrapping that warm scarf around you is a promise to always stand by your side.',
    resultReflection:
      'You are the calm in my storm. Like Mikasa’s scarf, your love wraps around me, giving me warmth and shelter no matter how unpredictable life becomes.',
  },
  {
    id: 'stranger-things',
    pair: 'Mike & Eleven',
    franchise: 'Stranger Things',
    badge: 'Magical & Whimsical',
    symbol: '📻',
    theme: 'Static Over The Walkie-Talkie',
    bgGradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(59, 130, 246, 0.25))',
    accentColor: '#c084fc',
    description:
      'A little weird, a little magical, and always worth fighting for. Across mysterious dimensions and quiet static, two souls who understand each other without words.',
    resultReflection:
      'Our bond has that rare, otherworldly sweetness. We have our secret signals, our inside jokes, and a frequency of love that only the two of us can tune into.',
  },
  {
    id: 'telugu-cinema',
    pair: 'Anandan & Rupa',
    franchise: 'Telugu Cinema Classics',
    badge: 'Rooted Home',
    symbol: '🌸',
    theme: 'Katha Mariyu Prema',
    bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(16, 185, 129, 0.25))',
    accentColor: '#34d399',
    description:
      'Grounded in timeless warmth, gentle glances, and chinna chinna vishayalu. A classic Telugu romance where being together feels like coming home to mother’s cooking.',
    resultReflection:
      'With you, life feels culturally familiar, deeply respectful, and comforting. You make ordinary days feel rich with warmth and laughter.',
  },
  {
    id: 'spiderman',
    pair: 'Peter Parker & MJ',
    franchise: 'Spider-Man',
    badge: 'Grounded & Real',
    symbol: '🕸️',
    theme: 'Taking Off The Mask',
    bgGradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.25), rgba(239, 68, 68, 0.25))',
    accentColor: '#38bdf8',
    description:
      'Carrying the weight of the city on your shoulders, but finding one person who lets you take off the mask, exhale, and be your true, imperfect self.',
    resultReflection:
      'You are the person who sees the real me behind all the daily pressures. In every multiverse, you are the girl I’d swing across the skyline just to see smile.',
  },
];
