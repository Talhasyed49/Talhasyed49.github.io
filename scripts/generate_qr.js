/**
 * QR Code Generator & Permanence Manager (ES Module)
 * Implements Requirements 11 & 12:
 * 1. Checks configured GitHub Pages URL
 * 2. Checks QR permanence rules (never overwrite locked deployed QR)
 * 3. Generates:
 *    - public/birthday-heart-qr.png (Artistic red heart silhouette QR)
 *    - public/birthday-heart-qr-hd.png (High-Res 2048x2048 print card)
 *    - public/birthday-qr-standard.png (Standard fallback QR)
 *    - public/qr-config.json (Saved state & permanent target URL)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import qrcode from 'qrcode';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_PATH = path.join(__dirname, '../public/qr-config.json');
const PUBLIC_DIR = path.join(__dirname, '../public');

let config = {
  githubUsername: 'Talhasyed49',
  configuredUrl: 'https://talhasyed49.github.io/',
  deployedUrl: 'https://talhasyed49.github.io/',
  status: 'deployed', // 'pending_deployment' | 'deployed'
  isLocked: true,
  generatedAt: null,
  files: {
    heartQr: 'birthday-heart-qr.png',
    heartQrHd: 'birthday-heart-qr-hd.png',
    standardQr: 'birthday-qr-standard.png'
  }
};

if (fs.existsSync(CONFIG_PATH)) {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
    config = { ...config, ...JSON.parse(raw) };
  } catch (e) {
    console.warn('Could not read existing qr-config.json:', e);
  }
}

// Support CLI argument for URL or username
const args = process.argv.slice(2);
let targetUrl = config.configuredUrl;
let forceRegenerate = false;
let markAsDeployed = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--url' && args[i + 1]) {
    targetUrl = args[i + 1];
    i++;
  } else if (args[i] === '--username' && args[i + 1]) {
    const u = args[i + 1].toLowerCase();
    config.githubUsername = args[i + 1];
    targetUrl = `https://${u}.github.io/`;
    i++;
  } else if (args[i] === '--force') {
    forceRegenerate = true;
  } else if (args[i] === '--deployed') {
    markAsDeployed = true;
  }
}

console.log(`[QR Generator] Target URL: ${targetUrl}`);
console.log(`[QR Generator] Current Status: ${config.status}, Locked: ${config.isLocked}`);

// PERMANENCE CHECK:
// If QR was already generated for a verified deployment and locked, do not overwrite unless --force is given.
if (config.isLocked && !forceRegenerate) {
  if (config.configuredUrl === targetUrl) {
    console.log('[QR Generator] ✅ Permanence check: Existing QR is permanently locked and matches target URL. Skipping overwrite.');
    process.exit(0);
  } else {
    console.warn(`[QR Generator] ⚠️ WARNING: Target URL (${targetUrl}) differs from locked deployed URL (${config.configuredUrl}).`);
    console.warn('To replace the locked QR, explicitly pass --force.');
    process.exit(1);
  }
}

async function run() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  // 1. Generate Standard Fallback QR
  const standardQrPath = path.join(PUBLIC_DIR, 'birthday-qr-standard.png');
  await qrcode.toFile(standardQrPath, targetUrl, {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 600,
    margin: 3,
    color: {
      dark: '#991B1B', // Deep Cherry Red
      light: '#FFFDF9'  // Warm Cream
    }
  });
  console.log(`[QR Generator] Generated Standard Fallback QR -> ${standardQrPath}`);

  // 2. Extract QR matrix for Artistic Heart QR synthesis
  const qrData = qrcode.create(targetUrl, { errorCorrectionLevel: 'H' });
  const size = qrData.modules.size;
  const matrix = [];
  for (let r = 0; r < size; r++) {
    const row = [];
    for (let c = 0; c < size; c++) {
      row.push(qrData.modules.get(r, c));
    }
    matrix.push(row);
  }

  // Save temporary matrix for Python generator
  const tempMatrixPath = path.join(__dirname, 'temp_matrix.json');
  fs.writeFileSync(tempMatrixPath, JSON.stringify({
    url: targetUrl,
    size: size,
    matrix: matrix
  }));

  // 3. Invoke Python PIL engine to render Artistic Heart QR & HD Print Card
  try {
    const pyScript = path.join(__dirname, 'draw_heart_qr.py');
    console.log('[QR Generator] Calling Python rendering engine for Heart QR & Print Card...');
    execSync(`python "${pyScript}" "${tempMatrixPath}" "${PUBLIC_DIR}"`, { stdio: 'inherit' });
  } catch (err) {
    console.error('[QR Generator] Python rendering error:', err);
  } finally {
    if (fs.existsSync(tempMatrixPath)) {
      fs.unlinkSync(tempMatrixPath);
    }
  }

  // 4. Update and lock configuration
  config.configuredUrl = targetUrl;
  config.generatedAt = new Date().toISOString();
  if (markAsDeployed) {
    config.status = 'deployed';
    config.deployedUrl = targetUrl;
    config.isLocked = true;
    console.log('[QR Generator] 🔒 QR successfully locked for deployment URL!');
  }

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log(`[QR Generator] Configuration saved to ${CONFIG_PATH}`);
}

run().catch((err) => {
  console.error('[QR Generator] Error:', err);
  process.exit(1);
});
