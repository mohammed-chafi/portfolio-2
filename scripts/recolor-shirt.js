/**
 * Repaint the shirt white while keeping its folds.
 *
 * A flood fill seeded inside the torso, with a tolerance well below the
 * distance to the trousers and shoes, so the fill cannot leak out of the
 * garment. Each filled pixel keeps its own shading: the difference between its
 * luminance and the garment's base luminance is re-applied, amplified, on top
 * of the new white so the creases stay readable on a light fill.
 *
 * Usage: node scripts/recolor-shirt.js <in.png> <out.png>
 */
const sharp = require('sharp');
const [, , SRC, OUT] = process.argv;

const WHITE = [247, 248, 250];
const TOL = 50;      // < 71, the distance from shirt blue to the trousers
const GAIN = Number(process.argv[4] || 0.6); // low: the source carries pixel noise that a high gain turns into blotches

const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true }).then(async ({ data, info }) => {
  const { width: W, height: H, channels: C } = info;
  const at = (x, y) => (y * W + x) * C;

  // Seed in the middle of the chest.
  const sx = Math.round(W * 0.5), sy = Math.round(H * 0.26);
  const si = at(sx, sy);
  const base = [data[si], data[si + 1], data[si + 2]];
  const baseLum = lum(...base);

  const near = (i) => {
    const dr = data[i] - base[0], dg = data[i + 1] - base[1], db = data[i + 2] - base[2];
    return Math.sqrt(dr * dr + dg * dg + db * db) <= TOL;
  };

  const seen = new Uint8Array(W * H);
  const stack = [[sx, sy]];
  let filled = 0;
  while (stack.length) {
    const [x, y] = stack.pop();
    if (x < 0 || y < 0 || x >= W || y >= H) continue;
    const p = y * W + x;
    if (seen[p]) continue;
    const i = at(x, y);
    if (data[i + 3] === 0 || !near(i)) continue;
    seen[p] = 1;
    filled++;
    const scale = 1 + ((lum(data[i], data[i + 1], data[i + 2]) - baseLum) / baseLum) * GAIN;
    for (let k = 0; k < 3; k++) data[i + k] = Math.max(0, Math.min(255, Math.round(WHITE[k] * scale)));
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  await sharp(Buffer.from(data), { raw: { width: W, height: H, channels: C } })
    .png({ compressionLevel: 9 }).toFile(OUT);
  console.log(`seed rgb(${base}) baseLum=${baseLum.toFixed(1)}  repainted ${filled} px (${(filled / (W * H) * 100).toFixed(1)}%)`);
});
