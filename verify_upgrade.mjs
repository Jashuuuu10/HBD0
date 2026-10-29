import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9223;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(err);
          }
        });
      })
      .on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    const { WebSocket } = await import('node:http').then(() => globalThis);
    this.ws = new WebSocket(this.wsUrl);
    return new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve: res, reject: rej } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) rej(msg.error);
          else res(msg.result);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res?.exceptionDetails) {
      throw new Error(`Eval error: ${JSON.stringify(res.exceptionDetails)}`);
    }
    return res?.result?.value;
  }

  async screenshot(path) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path, Buffer.from(res.data, 'base64'));
    console.log(`Saved screenshot: ${path}`);
  }
}

async function run() {
  console.log('🚀 Starting Chrome for end-to-end testing...');
  const chrome = spawn(CHROME_PATH, [
    '--headless',
    `--remote-debugging-port=${PORT}`,
    '--window-size=1440,900',
    'http://localhost:5173/',
  ]);

  try {
    let targets = null;
    for (let i = 0; i < 30; i++) {
      await delay(300);
      try {
        targets = await getJson(`http://127.0.0.1:${PORT}/json`);
        if (targets && targets.length > 0) break;
      } catch {}
    }

    if (!targets || targets.length === 0) {
      throw new Error('Could not connect to Chrome DevTools on port ' + PORT);
    }

    const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
    const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();
    await client.send('Page.enable');
    await client.send('Runtime.enable');

    console.log('Connected to DevTools on target:', pageTarget.url);

    // 1. Wait for Stage 2 & Advance to Stage 3
    console.log('Waiting for Stage 2 card...');
    for (let i = 0; i < 20; i++) {
      await delay(500);
      const hasStage2 = await client.eval(`!!document.querySelector('.stage-2-card')`);
      if (hasStage2) break;
    }

    console.log('Clicking "Enter Your World" to enter Stage 3...');
    await client.eval(`document.querySelector('.stage-2-card__btn')?.click()`);
    await delay(1200);

    const isStage3Mounted = await client.eval(`!!document.querySelector('.stage-3-page')`);
    console.log('Stage 3 mounted:', isStage3Mounted);

    // 2. Test Our Cinema — Parallel Universes
    console.log('Testing Our Cinema...');
    const cinemaCardsCount = await client.eval(`document.querySelectorAll('.cinema-card').length`);
    console.log('Our Cinema cards rendered:', cinemaCardsCount);
    if (cinemaCardsCount !== 4) throw new Error(`Expected 4 cinema cards, got ${cinemaCardsCount}`);

    // Click first cinema card (AOT)
    await client.eval(`document.querySelectorAll('.cinema-card')[0]?.click()`);
    await delay(600);
    const cinemaModalTitle = await client.eval(`document.querySelector('.cinema-modal-title')?.innerText`);
    console.log('Cinema modal open:', cinemaModalTitle);
    await client.screenshot('verify_cinema_modal.png');

    // Click Next in cinema modal
    await client.eval(`document.querySelectorAll('.cinema-nav-btn')[1]?.click()`);
    await delay(400);
    const cinemaModalTitle2 = await client.eval(`document.querySelector('.cinema-modal-title')?.innerText`);
    console.log('Cinema next universe:', cinemaModalTitle2);

    // Close cinema modal with Escape
    await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
    await delay(400);
    const cinemaModalClosed = await client.eval(`!document.querySelector('.cinema-modal-backdrop')`);
    console.log('Cinema modal closed via Escape:', cinemaModalClosed);

    // 3. Test 100 Reasons Section
    console.log('Testing 100 Reasons Section...');
    const reasonsCount = await client.eval(`document.querySelectorAll('.reason-box').length`);
    console.log('Total reason boxes rendered:', reasonsCount);
    if (reasonsCount !== 100) throw new Error(`Expected exactly 100 reason boxes, got ${reasonsCount}`);

    // Click Reason Box #1
    await client.eval(`document.querySelectorAll('.reason-box')[0]?.click()`);
    await delay(500);
    const reason1Title = await client.eval(`document.querySelector('.reason-modal-title')?.innerText`);
    console.log('Reason 1 title:', reason1Title);
    await client.screenshot('verify_reason_modal.png');

    // Next reason via right arrow
    await client.eval(`document.querySelectorAll('.reason-modal-nav button')[1]?.click()`);
    await delay(400);
    const reason2Title = await client.eval(`document.querySelector('.reason-modal-title')?.innerText`);
    console.log('Reason 2 title:', reason2Title);

    // Close reason modal
    await client.eval(`document.querySelector('.reason-modal-header .star-detail-card__close')?.click()`);
    await delay(400);

    // Test Surprise Me button
    await client.eval(`document.querySelector('.reasons-action-btn--surprise')?.click()`);
    await delay(500);
    const randomReasonTitle = await client.eval(`document.querySelector('.reason-modal-title')?.innerText`);
    console.log('Surprise Me opened random reason:', randomReasonTitle);
    await client.eval(`document.querySelector('.reason-modal-header .star-detail-card__close')?.click()`);
    await delay(400);

    // Test Read All 100 reasons modal
    await client.eval(`document.querySelector('.reasons-action-btn--readall')?.click()`);
    await delay(500);
    const readAllItemsCount = await client.eval(`document.querySelectorAll('.readall-reason-item').length`);
    console.log('Read All modal items rendered:', readAllItemsCount);
    if (readAllItemsCount !== 100) throw new Error(`Expected 100 items in Read All, got ${readAllItemsCount}`);
    await client.eval(`document.querySelector('.readall-modal-header .star-detail-card__close')?.click()`);
    await delay(400);

    // 4. Test Game A: Mission Find My Heart
    console.log('Testing Game A: Mission Find My Heart...');
    // Open Game A
    await client.eval(`document.querySelectorAll('.game-card__play-btn')[0]?.click()`);
    await delay(600);
    const gameModalTitle = await client.eval(`document.querySelector('.game-modal-header-v2__title')?.innerText`);
    console.log('Game A modal title:', gameModalTitle);
    await client.screenshot('verify_game_a.png');

    // Start Game A adventure
    await client.eval(`document.querySelector('.maze-overlay .hero-btn-primary-v2')?.click()`);
    await delay(500);

    // Move player using arrow keys
    await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowRight', code: 'ArrowRight' });
    await delay(100);
    await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowRight', code: 'ArrowRight' });
    await delay(100);
    await client.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowDown', code: 'ArrowDown' });
    await delay(200);

    // Close Game A modal
    await client.eval(`document.querySelector('.game-modal-close-btn-v2')?.click()`);
    await delay(400);

    // 5. Test Game B: How Well Do You Know Us?
    console.log('Testing Game B: How Well Do You Know Us?...');
    await client.eval(`document.querySelectorAll('.game-card__play-btn')[1]?.click()`);
    await delay(600);
    const quizQ1 = await client.eval(`document.querySelector('.quiz-card-question')?.innerText`);
    console.log('Quiz Q1:', quizQ1);

    // Pick first option
    await client.eval(`document.querySelectorAll('.quiz-option-button')[0]?.click()`);
    await delay(400);
    const explanationVisible = await client.eval(`!!document.querySelector('.quiz-commentary-box')`);
    console.log('Quiz commentary revealed:', explanationVisible);
    await client.screenshot('verify_game_b.png');

    // Close Game B
    await client.eval(`document.querySelector('.game-modal-close-btn-v2')?.click()`);
    await delay(400);

    // 6. Test Game C: Choose Our Movie Universe
    console.log('Testing Game C: Choose Our Movie Universe...');
    await client.eval(`document.querySelectorAll('.game-card__play-btn')[2]?.click()`);
    await delay(600);
    const choiceCardsCount = await client.eval(`document.querySelectorAll('.choice-card-item').length`);
    console.log('Choice cards count:', choiceCardsCount);

    // Select Spider-Man option
    await client.eval(`document.querySelectorAll('.choice-card-item')[3]?.click()`);
    await delay(500);
    const revealedUniverseTitle = await client.eval(`document.querySelector('.choice-revealed-title')?.innerText`);
    console.log('Revealed choice universe:', revealedUniverseTitle);
    await client.screenshot('verify_game_c.png');

    // Close Game C
    await client.eval(`document.querySelector('.game-modal-close-btn-v2')?.click()`);
    await delay(400);

    // 7. Test Final Surprise (Stage 1 & Stage 2 Birthday Cake)
    console.log('Testing Final Surprise Modal...');
    await client.eval(`document.querySelector('.navbar-v2__surprise-btn')?.click()`);
    await delay(800);

    const surpriseLeadText = await client.eval(`document.querySelector('.surprise-p-lead')?.innerText`);
    console.log('Surprise Stage 1 letter lead:', surpriseLeadText);
    await client.screenshot('verify_surprise_stage1.png');

    // Click "One Last Surprise 🎂" to enter Stage 2 (Cake)
    console.log('Transitioning to Stage 2 Birthday Cake...');
    await client.eval(`document.querySelector('.surprise-cta-btn')?.click()`);
    await delay(800);

    const cakeTitle = await client.eval(`document.querySelector('.cake-main-title')?.innerText`);
    console.log('Cake scene title:', cakeTitle);
    const initialLitCandles = await client.eval(`document.querySelectorAll('.cake-candle-unit--lit').length`);
    console.log('Initial lit candles:', initialLitCandles);
    if (initialLitCandles !== 5) throw new Error(`Expected 5 lit candles, got ${initialLitCandles}`);
    await client.screenshot('verify_cake_lit.png');

    // Tap first candle to blow it out individually
    console.log('Tapping candle 1 to blow it out individually...');
    await client.eval(`document.querySelectorAll('.cake-candle-unit')[0]?.click()`);
    await delay(400);
    const remainingLitCandles = await client.eval(`document.querySelectorAll('.cake-candle-unit--lit').length`);
    console.log('Remaining lit candles after 1 tap:', remainingLitCandles);
    if (remainingLitCandles !== 4) throw new Error(`Expected 4 remaining candles, got ${remainingLitCandles}`);

    // Click "Blow Out All Candles 💨"
    console.log('Clicking "Blow Out All Candles 💨"...');
    await client.eval(`document.querySelector('.cake-blow-btn')?.click()`);
    await delay(1200);

    const finalLitCandles = await client.eval(`document.querySelectorAll('.cake-candle-unit--lit').length`);
    console.log('Lit candles after blowout:', finalLitCandles);
    if (finalLitCandles !== 0) throw new Error('Expected 0 lit candles');

    const celebrationMessage = await client.eval(`document.querySelector('.cake-final-heading')?.innerText`);
    console.log('Celebration final message heading:', celebrationMessage);
    await client.screenshot('verify_cake_celebration.png');

    // Test "Celebrate Again 🎂" to relight candles
    console.log('Testing "Celebrate Again" to relight candles...');
    await client.eval(`document.querySelector('.cake-relight-btn')?.click()`);
    await delay(500);
    const relitCandles = await client.eval(`document.querySelectorAll('.cake-candle-unit--lit').length`);
    console.log('Candles relit count:', relitCandles);
    if (relitCandles !== 5) throw new Error(`Expected 5 relit candles, got ${relitCandles}`);

    // Close Surprise Modal
    await client.eval(`document.querySelector('.surprise-close-btn-v2')?.click()`);
    await delay(500);

    // 8. Mobile Viewport Check (375 x 667)
    console.log('Testing Mobile Viewport (375x667)...');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await delay(500);

    const hasHorizontalScroll = await client.eval(`document.documentElement.scrollWidth > window.innerWidth`);
    console.log('Mobile horizontal overflow detected:', hasHorizontalScroll);

    // Check mobile hamburger menu
    await client.eval(`document.querySelector('.navbar-v2__mobile-toggle')?.click()`);
    await delay(400);
    const mobileMenuOpen = await client.eval(`!!document.querySelector('.navbar-v2__mobile-drawer')`);
    console.log('Mobile navigation drawer opened:', mobileMenuOpen);
    await client.screenshot('verify_mobile_nav.png');

    console.log('✅ ALL VERIFICATIONS COMPLETED SUCCESSFULLY!');
  } finally {
    chrome.kill();
  }
}

run().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
