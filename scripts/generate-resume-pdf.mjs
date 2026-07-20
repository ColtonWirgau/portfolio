// Generate a PDF of /resume (or /resume/<slug>) using Playwright.
//
// Usage:
//   npm run resume:pdf                       # default variant, assumes dev server on :3000
//   npm run resume:pdf -- --variant=it-business-analyst
//   npm run resume:pdf -- --url=http://localhost:4000
//
// Prereq: the Next.js dev server (or any server) is reachable at the
// URL. Run `npm run dev` in another terminal first.
//
// Output: ./out/resume/<variant>-<YYYY-MM-DD>.pdf  (./out is gitignored)

import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { existsSync } from 'node:fs';

function parseArgs(argv) {
  const out = {};
  for (const arg of argv.slice(2)) {
    const m = arg.match(/^--([^=]+)=(.*)$/);
    if (m) out[m[1]] = m[2];
    else if (arg.startsWith('--')) out[arg.slice(2)] = 'true';
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv);
  const variant = args.variant || 'it-business-analyst';
  const baseUrl = args.url || 'http://localhost:3000';
  const path = variant === 'default' ? '/resume' : `/resume/${variant}`;
  // `print=1` opts into the print/PDF build: the server injects the private
  // cell number (RESUME_PHONE from .env.local) that the public page omits.
  const url = `${baseUrl}${path}?print=1`;

  const outDir = resolve(process.cwd(), 'out', 'resume');
  if (!existsSync(outDir)) await mkdir(outDir, { recursive: true });
  const date = new Date().toISOString().slice(0, 10);
  const outPath = args.out
    ? resolve(process.cwd(), args.out)
    : join(outDir, `${variant}-${date}.pdf`);

  console.log(`→ Rendering ${url}`);

  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  // Surface any console errors from the page so render failures aren't silent.
  page.on('pageerror', (err) => console.error('page error:', err.message));

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });
  } catch (err) {
    console.error(`\n✗ Could not load ${url}.`);
    console.error('  Is the dev server running? Try `npm run dev` in another terminal.\n');
    await browser.close();
    process.exit(1);
  }

  // Wait for web fonts (Anton, Montserrat, Playfair) before printing,
  // otherwise the PDF can ship with system fallbacks.
  await page.evaluate(() => document.fonts.ready);

  // Apply the print media so styled-jsx `@media print` rules take effect.
  await page.emulateMedia({ media: 'print' });

  await page.pdf({
    path: outPath,
    format: 'Letter',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  await browser.close();

  console.log(`✓ Wrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
