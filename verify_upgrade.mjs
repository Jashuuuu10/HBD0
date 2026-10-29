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
        if (msg.method === 'Runtime.exceptionThrown') {
          console.error('BROWSER RUNTIME ERROR:', msg.params.exceptionDetails?.exception?.description || msg.params.exceptionDetails?.text);
        }
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
    let stage2Mounted = false;
    for (let i = 0; i < 30; i++) {
      await delay(500);
      stage2Mounted = await client.eval(`!!document.querySelector('.stage-2-card')`);
      if (stage2Mounted) {
        console.log(`Stage 2 card ready at ${(i * 0.5).toFixed(1)}s`);
        break;
      }
    }
    if (!stage2Mounted) throw new Error('Stage 2 card did not mount in time');

    await delay(1200); // Allow card entry animation to settle
    console.log('Clicking "Enter Your World" button...');
    const clickMsg = await client.eval(`(() => {
      const btn = document.querySelector('.stage-2-card__btn');
      if (btn) {
        btn.click();
        return 'BUTTON_CLICKED: ' + btn.innerText;
      }
      return 'BUTTON_NOT_FOUND';
    })()`);
    console.log('Click result:', clickMsg);

    // Wait for Stage 3 to mount
    let stage3Mounted = false;
    for (let i = 0; i < 30; i++) {
      await delay(400);
      stage3Mounted = await client.eval(`!!document.querySelector('.stage-3-page')`);
      if (stage3Mounted) {
        console.log(`Stage 3 mounted successfully at ${(i * 0.4).toFixed(1)}s!`);
        break;
      }
    }
    if (!stage3Mounted) {
      const bodyHtml = await client.eval(`document.body.innerHTML.substring(0, 300)`);
      throw new Error(`Stage 3 did not mount. Current body: ${bodyHtml}`);
    }

    await delay(1200); // Allow stage 3 entry to settle

    // 2. Test Our Cinema — Parallel Universes
    console.log('Testing Our Cinema...');
    const cinemaCardsCount = await client.eval(`document.querySelectorAll('.cinema-card-v2').length`);
    console.log('Our Cinema cards rendered:', cinemaCardsCount);
    if (cinemaCardsCount < 30) throw new Error(`Expected at least 30 cinema cards, got ${cinemaCardsCount}`);

    // Click first cinema card
    await client.eval(`document.querySelectorAll('.cinema-card-v2')[0]?.click()`);
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
    await client.eval(`document.querySelector('.reason-modal-header .game-modal-close-btn-v2')?.click()`);
    await delay(400);

    // Test Surprise Me button
    await client.eval(`document.querySelector('.reasons-action-btn--surprise')?.click()`);
    await delay(500);
    const randomReasonTitle = await client.eval(`document.querySelector('.reason-modal-title')?.innerText`);
    console.log('Surprise Me opened random reason:', randomReasonTitle);
    await client.eval(`document.querySelector('.reason-modal-header .game-modal-close-btn-v2')?.click()`);
    await delay(400);

    // Test Read All 100 reasons modal
    await client.eval(`document.querySelector('.reasons-action-btn--readall')?.click()`);
    await delay(500);
    const readAllItemsCount = await client.eval(`document.querySelectorAll('.readall-reason-item').length`);
    console.log('Read All modal items rendered:', readAllItemsCount);
    if (readAllItemsCount !== 100) throw new Error(`Expected 100 items in Read All, got ${readAllItemsCount}`);
    await client.eval(`document.querySelector('.readall-modal-header .game-modal-close-btn-v2')?.click()`);
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

    // 6. Test Game C: Finish Our Love Story
    console.log('Testing Game C: Finish Our Love Story...');
    await client.eval(`document.querySelectorAll('.game-card__play-btn')[2]?.click()`);
    await delay(600);
    const storyPrompt1 = await client.eval(`document.querySelector('.story-step-prompt')?.innerText`);
    console.log('Story Step 1 Prompt:', storyPrompt1);

    // Step through the 5 chapters
    for (let step = 0; step < 5; step++) {
      // Pick first choice
      await client.eval(`document.querySelectorAll('.story-choice-btn')[0]?.click()`);
      await delay(300);
      // Click continue / reveal
      await client.eval(`document.querySelector('.story-next-btn')?.click()`);
      await delay(400);
    }

    const endingTitle = await client.eval(`document.querySelector('.story-ending-title')?.innerText`);
    console.log('Story Ending Earned:', endingTitle);
    await client.screenshot('verify_game_c.png');

    // Close Game C
    await client.eval(`document.querySelector('.game-modal-close-btn-v2')?.click()`);
    await delay(400);

    // 7. Test Final Surprise (Stage 1 & Stage 2 Birthday Cake)
    console.log('Testing Final Surprise Modal...');
    await client.eval(`document.querySelector('.navbar-v2__surprise-btn')?.click()`);
    await delay(800);

    const surpriseLeadText = await client.eval(`document.querySelector('.surprise-letter-title')?.innerText`);
    console.log('Surprise Stage 1 letter salutation:', surpriseLeadText);
    await client.screenshot('verify_surprise_stage1.png');

    // Click "Make a Birthday Wish 🎂" to enter Stage 2 (Cake)
    console.log('Transitioning to Stage 2 Birthday Cake...');
    await client.eval(`document.querySelector('.surprise-cta-btn')?.click()`);
    await delay(800);

    const cakeTitle = await client.eval(`document.querySelector('.cake-main-heading')?.innerText`);
    console.log('Cake scene title:', cakeTitle);
    const initialLitCandles = await client.eval(`document.querySelectorAll('.realistic-candle--lit').length`);
    console.log('Initial lit candles:', initialLitCandles);
    if (initialLitCandles !== 5) throw new Error(`Expected 5 lit candles, got ${initialLitCandles}`);
    await client.screenshot('verify_cake_lit.png');

    // Tap first candle to blow it out individually
    console.log('Tapping candle 1 to blow it out individually...');
    await client.eval(`document.querySelectorAll('.realistic-candle')[0]?.click()`);
    await delay(400);
    const remainingLitCandles = await client.eval(`document.querySelectorAll('.realistic-candle--lit').length`);
    console.log('Remaining lit candles after 1 tap:', remainingLitCandles);
    if (remainingLitCandles !== 4) throw new Error(`Expected 4 remaining candles, got ${remainingLitCandles}`);

    // Click "Blow Out All Candles 💨"
    console.log('Clicking "Blow Out All Candles 💨"...');
    await client.eval(`document.querySelector('.cake-blow-btn-v2')?.click()`);
    await delay(1200);

    const finalLitCandles = await client.eval(`document.querySelectorAll('.realistic-candle--lit').length`);
    console.log('Lit candles after blowout:', finalLitCandles);
    if (finalLitCandles !== 0) throw new Error('Expected 0 lit candles');

    const celebrationMessage = await client.eval(`document.querySelector('.cake-intimate-wish-text')?.innerText`);
    console.log('Celebration intimate wish text:', celebrationMessage);
    await client.screenshot('verify_cake_celebration.png');

    // Test "Relight Candles 🎂" to relight candles
    console.log('Testing "Relight Candles" to relight candles...');
    await client.eval(`document.querySelector('.cake-relight-btn-v2')?.click()`);
    await delay(500);
    const relitCandles = await client.eval(`document.querySelectorAll('.realistic-candle--lit').length`);
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
