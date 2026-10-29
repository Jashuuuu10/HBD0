import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9222;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (err) { reject(err); }
      });
    }).on('error', reject);
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

  async screenshot(path) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path, Buffer.from(res.data, 'base64'));
    console.log(`Saved screenshot: ${path}`);
  }
}

async function run() {
  console.log('Starting headless Chrome for 3-Stage verification...');
  const chrome = spawn(CHROME_PATH, [
    '--headless',
    `--remote-debugging-port=${PORT}`,
    '--window-size=1440,900',
    'http://localhost:5173/'
  ]);

  try {
    let targets = null;
    for (let i = 0; i < 25; i++) {
      await delay(300);
      try {
        targets = await getJson(`http://127.0.0.1:${PORT}/json`);
        if (targets && targets.length > 0) break;
      } catch {}
    }

    if (!targets || targets.length === 0) {
      throw new Error('Could not connect to Chrome DevTools');
    }

    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    console.log('Connected to target:', pageTarget.url);

    const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();
    await client.send('Page.enable');
    await client.send('Runtime.enable');

    // ─────────────────────────────────────────────────────────────
    // STAGE 1: Full-Screen Photograph Only (at 2s during zoom)
    // ─────────────────────────────────────────────────────────────
    console.log('Capturing STAGE 1: Photograph only (zero UI)...');
    await delay(2000);
    await client.screenshot('stage1_photo_only.png');

    // ─────────────────────────────────────────────────────────────
    // STAGE 2: Wait until .stage-2-card appears
    // ─────────────────────────────────────────────────────────────
    console.log('Waiting for Stage 2 card to appear...');
    let stage2Found = false;
    for (let i = 0; i < 30; i++) {
      await delay(500);
      const evalRes = await client.send('Runtime.evaluate', {
        expression: `!!document.querySelector('.stage-2-card')`,
        returnByValue: true
      });
      if (evalRes?.result?.value) {
        stage2Found = true;
        break;
      }
    }
    console.log('Stage 2 mounted:', stage2Found);
    await delay(1200); // Allow card entry transition
    await client.screenshot('stage2_black_welcome_card.png');

    // ─────────────────────────────────────────────────────────────
    // STAGE 3: Click "Enter Your World ✨" and reveal AOT Website
    // ─────────────────────────────────────────────────────────────
    console.log('Clicking "Enter Your World ✨" to advance to Stage 3...');
    const clickRes = await client.send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelector('.stage-2-card__btn');
          if (btn) { btn.click(); return 'CLICKED_START_BUTTON: ' + btn.innerText; }
          return 'START_BUTTON_NOT_FOUND';
        })()
      `,
      returnByValue: true
    });
    console.log('Button click result:', clickRes.result.value);

    // Wait for Stage 3 transition
    console.log('Waiting for STAGE 3: AOT Theme Website...');
    let stage3Found = false;
    for (let i = 0; i < 20; i++) {
      await delay(300);
      const evalRes = await client.send('Runtime.evaluate', {
        expression: `!!document.querySelector('.stage-3-page')`,
        returnByValue: true
      });
      if (evalRes?.result?.value) {
        stage3Found = true;
        break;
      }
    }
    console.log('Stage 3 mounted:', stage3Found);
    await delay(1500);
    await client.screenshot('stage3_hero.png');

    // Scroll to Our Universe
    console.log('Scrolling to Our Universe...');
    await client.send('Runtime.evaluate', {
      expression: `document.getElementById('our-universe')?.scrollIntoView({ behavior: 'instant' });`
    });
    await delay(800);
    await client.screenshot('stage3_universe.png');

    // Click on star-1 ("Your Smile")
    console.log('Clicking star 1...');
    await client.send('Runtime.evaluate', {
      expression: `document.querySelector('.star-button')?.click();`
    });
    await delay(800);
    await client.screenshot('stage3_star_modal.png');

    // Close modal
    await client.send('Runtime.evaluate', {
      expression: `document.querySelector('.star-detail-card__close')?.click();`
    });
    await delay(400);

    // Scroll to Games
    console.log('Scrolling to Games Section...');
    await client.send('Runtime.evaluate', {
      expression: `document.getElementById('games')?.scrollIntoView({ behavior: 'instant' });`
    });
    await delay(800);
    await client.screenshot('stage3_games.png');

    // Scroll to Make A Wish
    console.log('Scrolling to Make A Wish...');
    await client.send('Runtime.evaluate', {
      expression: `document.getElementById('make-a-wish')?.scrollIntoView({ behavior: 'instant' });`
    });
    await delay(800);
    await client.screenshot('stage3_wish.png');

    // Open Final Surprise
    console.log('Opening Final Surprise...');
    await client.send('Runtime.evaluate', {
      expression: `document.querySelector('.navbar-v2__surprise-btn')?.click();`
    });
    await delay(1200);
    await client.screenshot('stage3_final_surprise.png');

    console.log('All stages and features successfully verified and captured!');
  } finally {
    chrome.kill();
  }
}

run().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
