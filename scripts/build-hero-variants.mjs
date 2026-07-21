/* Hero variant pipeline.
 *
 * Takes raw Nano Banana outputs (896x1195, generated from the 1536x2048
 * gen-source that framed Serious3.png at 618x1800, left 459 / top 248),
 * strips their backgrounds (rembg, run beforehand), maps them onto the
 * padded base canvas (903x2298; original 703x2048 at left 100 / top 250),
 * applies per-variant grades, and writes finished variants plus alignment
 * previews.
 *
 * Usage:
 *   node scripts/build-hero-variants.mjs <cutout-dir> <out-dir> <preview-dir>
 *
 * Per-image nudges (pixels in final canvas space, +x right, +y down) live
 * in NUDGE below; tweak after eyeballing the previews.
 */

import sharp from 'sharp';
import { readdirSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const [cutoutDir, outDir, previewDir] = process.argv.slice(2);
if (!cutoutDir || !outDir || !previewDir) {
  console.error('usage: node scripts/build-hero-variants.mjs <cutout-dir> <out-dir> <preview-dir>');
  process.exit(1);
}

const BASE_PADDED = 'public/images/Edited/Serious3-padded.png';

// Gen space: 1536x2048. The padded-canvas window inside gen space:
const GEN = { left: 371, top: 28, width: 794, height: 2020 };
const OUT = { width: 903, height: 2298 };

const NUDGE = {
  // name: { dx: 0, dy: 0 }
};

const GRADES = {
  detective: (img) => img.grayscale().linear(1.15, -12),
};

await mkdir(outDir, { recursive: true });
await mkdir(previewDir, { recursive: true });

const files = readdirSync(cutoutDir).filter((f) => f.endsWith('.png'));
for (const file of files) {
  const name = path.basename(file, '.png');
  const src = path.join(cutoutDir, file);

  // Upscale to gen space, crop the padded-canvas window, scale to output.
  const genSpace = await sharp(src).resize(1536, 2048).toBuffer();
  let aligned = sharp(genSpace)
    .extract(GEN)
    .resize(OUT.width, OUT.height);

  const nudge = NUDGE[name];
  if (nudge && (nudge.dx || nudge.dy)) {
    const buf = await aligned.toBuffer();
    aligned = sharp({
      create: { ...OUT, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
    }).composite([{ input: buf, left: nudge.dx, top: nudge.dy }]);
  }

  let graded = aligned;
  if (GRADES[name]) graded = GRADES[name](graded);

  const outPath = path.join(outDir, `${name}.png`);
  const finalBuf = await graded.png().toBuffer();
  await sharp(finalBuf).toFile(outPath);

  // Alignment preview: variant at 50% over the padded base.
  const ghost = await sharp(finalBuf)
    .composite([{
      input: Buffer.from([255, 255, 255, 128]),
      raw: { width: 1, height: 1, channels: 4 },
      tile: true,
      blend: 'dest-in',
    }])
    .toBuffer();
  await sharp(BASE_PADDED)
    .composite([{ input: ghost }])
    .png()
    .toFile(path.join(previewDir, `${name}-overlay.png`));

  console.log(`built ${name}`);
}
console.log('done');
