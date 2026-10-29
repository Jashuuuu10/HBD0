# BDAY2027 — A Cinematic Birthday Universe for Manisha ❤️

A personal, romantic, and interactive birthday website built for Manisha (October 31, 2026).
The experience feels like a romantic short film and a personal universe to explore, designed with a custom **Liquid Glass** aesthetic over the Attack on Titan theme vista.

---

## 🌟 The Exact Three-Screen Experience

1. **Screen 1: Cinematic Introduction**
   - Full-screen photograph of Manisha (`/assets/manisha-intro.jpg` with fallback to `/assets/manisha.jpg`).
   - Pure, minimal, emotional presentation with edge-to-edge coverage and zero overlay UI.
   - Slow, smooth cinematic zoom (~5.5 seconds) with subtle depth.
   - Automatically transitions into Screen 2.

2. **Screen 2: The Black Message Screen**
   - Pure black background with a centered Liquid Glass card.
   - Heartfelt message:
     > “Before the world sees what I made for you, I want you to know something. You came into my life and made ordinary moments feel special. You became my peace, my favourite person, and the one I keep choosing, even on the difficult days. This little world is made with love, for you and only you. Happy Birthday, Manisha. ❤️”
   - Prompt: `Inka Start Chedama? ❤️`
   - Glowing button: `Enter Your World ✨` (transitions to Screen 3 on user click; no auto-advance).

3. **Screen 3: The Main Birthday Experience**
   - Clearly visible theme background using `public/assets/aot.PNG` with subtle vignettes preserving both artwork recognition and text readability.
   - **Feature 1: Interactive Our Universe** — Star constellation map with 6 clickable stars, discovery tracking (`X of 6`), and Liquid Glass detail modals.
   - **Feature 2: Hidden Romantic Messages** — 8 discoverable secrets scattered across the universe with a progress tracker, drawer modal, and hint reveals.
   - **Feature 3: Three Functional Mini-Games**:
     * **Catch The Hearts**: 20-second reflex game with falling hearts and score feedback.
     * **Find The Matching Hearts**: 6-pair memory match puzzle with move counting and win state.
     * **Which One Is You?**: 5-question personality quiz with affectionate reactions and personal conclusion.
   - **Feature 4: Interactive Make a Wish** — Quiet midnight wishing well with optional wish input and a rising glowing orb animation.
   - **Feature 5: Final Cinematic Surprise** — Full-screen emotional climax with pulsing central heart, constellation lines, romantic letter, and replayable modal.
   - **Retained Sections**:
     * **Our Story**: 3 milestone cards.
     * **Reasons I Love You**: 6 elegant cards.
     * **Memories Gallery**: 3 photo frames with responsive Lightbox.
     * **Birthday Letter Modal**: Accessible letter dialog (`Read Letter 💌`).
     * **Footer**: `Made with love for Manisha ❤️` and `Back to Top`.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```
Generates a verified production bundle in `dist/`.

### 4. Code Linting
```bash
npm run lint
```

---

## 📁 Where to Place Your Personal Assets

All static assets are located in the `public/assets/` folder:

| Asset File | Purpose | Note |
|---|---|---|
| `public/assets/manisha-intro.jpg` | Screen 1 opening photograph | Edge-to-edge portrait (falls back to `manisha.jpg` or gradient if missing) |
| `public/assets/aot.PNG` | Screen 3 panoramic theme background | Keep clearly visible behind the entire UI |
| `public/assets/memory-1.jpg` | Memories Gallery: Photo 1 | Falls back to `manisha.jpg` if not yet added |
| `public/assets/memory-2.jpg` | Memories Gallery: Photo 2 | Falls back to `aot.PNG` if not yet added |
| `public/assets/memory-3.jpg` | Memories Gallery: Photo 3 | Falls back to `manisha.jpg` if not yet added |
| `public/assets/our-song.mp3` | Optional background audio | Optional personal song file |

---

## ✍️ How to Personalize the Messages & Content

All content is kept cleanly separated in `src/data/`:

- `src/data/universe.js`: Star names, subtitles, coordinates, and quotes for the 6 constellation stars.
- `src/data/messages.js`: The 8 hidden secrets and their clue descriptions.
- `src/data/games.js`: Mini-game configurations, score feedback, and quiz questions/choices/reactions.
- `src/data/memories.js`: Milestone chapters (Our Story), 6 reasons why you love her, and gallery captions.
- `src/data/birthdayContent.js`: The editable birthday letter modal content and final surprise script.

---

## 🛠️ Architecture & Files

```
bday2027/
├── public/
│   └── assets/
│       ├── aot.PNG               (AOT Theme Background)
│       ├── manisha.jpg           (Original portrait)
│       └── manisha-intro.jpg     (Screen 1 intro photo)
├── src/
│   ├── App.jsx                   (3-screen state controller and scroll manager)
│   ├── index.css                 (Custom Liquid Glass design system & variables)
│   ├── main.jsx
│   ├── data/
│   │   ├── universe.js           (Star map constellation data)
│   │   ├── messages.js           (8 hidden romantic secrets)
│   │   ├── games.js              (Catch, Memory, and Quiz configs)
│   │   ├── memories.js           (Story milestones, reasons, and gallery)
│   │   └── birthdayContent.js    (Letter & surprise climax scripts)
│   ├── components/
│   │   ├── Stage1Photo.jsx       (Screen 1: Photo only with cinematic zoom)
│   │   ├── Stage2Welcome.jsx     (Screen 2: Black message screen)
│   │   ├── Stage3AOTWebsite.jsx  (Screen 3: Main website orchestrator)
│   │   ├── Navbar.jsx            (Glass navbar with mobile drawer)
│   │   ├── HeroSection.jsx       (Hero with metrics and right thumbnail panel)
│   │   ├── OurUniverse.jsx       (Feature 1: Interactive Star Map)
│   │   ├── HiddenMessages.jsx    (Feature 2: Secrets tracker & drawer)
│   │   ├── GamesSection.jsx      (Feature 3: Game cards & modal window)
│   │   ├── CatchTheHearts.jsx    (Game A: 20s falling hearts game)
│   │   ├── MemoryMatch.jsx       (Game B: 6-pair card matching game)
│   │   ├── WhichOneIsYou.jsx     (Game C: 5-question personality quiz)
│   │   ├── MakeAWish.jsx         (Feature 4: Wishing well & rising orb)
│   │   ├── SurpriseModal.jsx     (Feature 5: Final cinematic surprise)
│   │   ├── OurStory.jsx          (3 Milestone cards)
│   │   ├── ReasonsSection.jsx    (6 Reasons cards)
│   │   ├── MemoriesGallery.jsx   (Gallery with Lightbox modal)
│   │   ├── BirthdayWishModal.jsx (Heartfelt birthday letter modal)
│   │   └── Footer.jsx            (Footer with Back to Top)
│   ├── hooks/
│   │   └── useReducedMotionPreference.js
│   └── utils/
│       └── lockBodyScroll.js     (Safe modal scroll lock utility)
├── package.json
└── vite.config.js
```

---

## 🧪 Testing & Verification Report

- **Vite Production Build**: `npm run build` succeeds with zero errors in ~100ms.
- **Linter**: `npm run lint` passes with 0 warnings across all `src` files.
- **Screen 1**: Tested edge-to-edge photo zoom (5.5s), zero UI, with fallback support.
- **Screen 2**: Verified exact message text, "Inka Start Chedama? ❤️", and "Enter Your World ✨" button.
- **Screen 3**: Verified clearly visible `aot.PNG` background, responsive glass navbar, active link tracking, 6 star constellation modals, 8 hidden message discovery triggers, 3 mini-games, wish-releasing orb animation, final surprise climax, and body scroll locking.
