/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FINISH OUR LOVE STORY ✍️❤️ — STORY DATA & BRANCHING
 * ═══════════════════════════════════════════════════════════════════════════
 * 5 decision points leading to 4 distinct romantic endings:
 * 1. The Quiet Kind of Forever
 * 2. Across Every Universe
 * 3. The Unexpected Cinema
 * 4. A Love That Keeps Growing
 */

export const storyDecisions = [
  {
    step: 1,
    prompt: 'Where does our timeline begin?',
    intro:
      'In a busy world of eight billion strangers, two people’s paths suddenly crossed. How did the first spark ignite?',
    choices: [
      {
        id: 'c1_rain',
        label: 'A sudden monsoon shower under a shared chai stall',
        narrative:
          'Rain poured from grey clouds, trapping us under a small roadside awning. Over hot ginger chai and dripping umbrellas, a casual conversation turned into an unexpected connection.',
        trait: 'quiet',
      },
      {
        id: 'c1_station',
        label: 'A crowded train station where our eyes locked',
        narrative:
          'Amidst the rush of arriving trains and echoing announcements, we caught each other’s gaze. In that split second, the noise of the station dissolved into slow motion.',
        trait: 'cinema',
      },
      {
        id: 'c1_book',
        label: 'A quiet library corner reaching for the same story',
        narrative:
          'Our hands brushed over a vintage film book on a forgotten wooden shelf. A shy smile and a whisper started a conversation that lasted until closing time.',
        trait: 'growth',
      },
    ],
  },
  {
    step: 2,
    prompt: 'Our first real conversation takes a turn. What do we talk about?',
    intro:
      'The initial polite greetings quickly gave way to something much deeper. What did we stay up talking about?',
    choices: [
      {
        id: 'c2_dreams',
        label: 'Our childhood ambitions and what scares us about the future',
        narrative:
          'We talked about our quiet insecurities, our secret goals, and the courage it takes to pursue dreams. For the first time, being vulnerable felt completely safe.',
        trait: 'growth',
      },
      {
        id: 'c2_movies',
        label: 'Debating our favourite movie endings and crazy "what-if" theories',
        narrative:
          'We fiercely defended our favourite film characters, laughed at Tollywood drama tropes, and realized our sense of humor matched like two matching puzzle pieces.',
        trait: 'cinema',
      },
      {
        id: 'c2_ordinary',
        label: 'The simple, ordinary things that make us feel at peace',
        narrative:
          'We talked about morning walks, comfort food, and the warmth of home. We realized that neither of us wanted flashy fairytales; we wanted genuine companionship.',
        trait: 'quiet',
      },
    ],
  },
  {
    step: 3,
    prompt: 'Life gets difficult. How do we show up for each other?',
    intro:
      'No relationship is tested on sunny days alone. When an exhausting, stressful week hit, how did we handle it?',
    choices: [
      {
        id: 'c3_silence',
        label: 'Sitting quietly beside each other without demanding words',
        narrative:
          'No interrogations, no pressure to perform. Just a warm shoulder to lean on, a gentle hand squeeze, and holding space until the storm passed.',
        trait: 'quiet',
      },
      {
        id: 'c3_surprise',
        label: 'A surprise late-night visit with her favourite food and silly memes',
        narrative:
          'Showing up unexpectedly with warm food, goofy selfies, and determined jokes that broke through the bad mood until her cheeks hurt from smiling.',
        trait: 'cinema',
      },
      {
        id: 'c3_cheer',
        label: 'Staying up to help organize thoughts and believing in her courage',
        narrative:
          'Reminding each other of inner strength, breaking down the hurdles step by step, and whispering: "We will face this together, team."',
        trait: 'growth',
      },
    ],
  },
  {
    step: 4,
    prompt: 'A stubborn disagreement arises. How do we resolve it?',
    intro:
      'We are both strong-minded individuals. When friction sparked, what chose to win: ego or love?',
    choices: [
      {
        id: 'c4_listen',
        label: 'Stepping back to listen and offering a soft "I am sorry, you matter more"',
        narrative:
          'We took a breath, put away pride, and listened to what the other person was feeling beneath the anger. That quiet apology melted the frost instantly.',
        trait: 'growth',
      },
      {
        id: 'c4_hug',
        label: 'A sudden tight hug that breaks the tension into laughter',
        narrative:
          'Right in the middle of a serious argument, one look at each other’s dramatic faces made us laugh. A warm hug sealed the truce without words.',
        trait: 'quiet',
      },
      {
        id: 'c4_multiverse',
        label: 'Reminding each other: "Even in another timeline, I’d still choose you"',
        narrative:
          'A gentle, teasing reminder of the bigger picture. We aren’t competing against each other; we are in this together across every reality.',
        trait: 'universe',
      },
    ],
  },
  {
    step: 5,
    prompt: 'What is the promise we seal our future with?',
    intro:
      'Looking forward at the years ahead, what is the golden thread running through our love story?',
    choices: [
      {
        id: 'c5_daily',
        label: 'To choose each other intentionally, especially on ordinary days',
        narrative:
          'Not just on birthdays or holidays, but over Tuesday morning chai, grocery runs, and quiet evenings when nothing grand happens.',
        trait: 'quiet',
      },
      {
        id: 'c5_adventure',
        label: 'To keep our sense of wonder alive and celebrate life like cinematic art',
        narrative:
          'To travel, laugh loudly, celebrate each other’s quirks, and keep life feeling like our private, magical movie.',
        trait: 'universe',
      },
      {
        id: 'c5_champion',
        label: 'To always be each other’s safe sanctuary and fiercest champion',
        narrative:
          'To grow into wiser, kinder versions of ourselves hand in hand, cheering for each other’s triumphs until the very end.',
        trait: 'growth',
      },
    ],
  },
];

export const storyEndings = {
  quiet: {
    id: 'quiet',
    title: 'The Quiet Kind of Forever',
    badge: 'PEACE & HOME',
    symbol: '🏡',
    accentColor: '#10b981',
    description:
      'A love that doesn’t need a spotlight or grand applause. Built on morning chai, comfortable silence, mutual respect, and returning home to each other’s arms. Through every year, you remain my sanctuary, Manisha.',
  },
  universe: {
    id: 'universe',
    title: 'Across Every Universe',
    badge: 'MULTIVERSAL BOND',
    symbol: '🌌',
    accentColor: '#8b5cf6',
    description:
      'Like Eren with Mikasa’s scarf, Mike calling on channel 11, and Peter Parker swinging across horizons for MJ — our love feels written into the cosmos. No matter how many timelines exist, my heart will always seek you out.',
  },
  cinema: {
    id: 'cinema',
    title: 'The Unexpected Cinema',
    badge: 'LAUGHTER & MAGIC',
    symbol: '🎬',
    accentColor: '#f59e0b',
    description:
      'A vibrant, joyful, Tollywood-inspired love full of silly teasing, spontaneous giggles, dramatic pouts, and unforgettable inside jokes. Life with you will never be dull; you turn everyday moments into golden cinema.',
  },
  growth: {
    id: 'growth',
    title: 'A Love That Keeps Growing',
    badge: 'LOYALTY & CHAMPIONS',
    symbol: '🌱',
    accentColor: '#0ea5e9',
    description:
      'A partnership of equals who support each other’s dreams, forgive mistakes with grace, and mature together step by step. We don’t just love who we are today; we love who we are becoming together.',
  },
};
