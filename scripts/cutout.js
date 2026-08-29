/**
 * Flat-background cutout.
 *
 * The generated character sits on a uniform light grey that is not in the site
 * palette. A flood fill inward from the borders removes only background that is
 * connected to the edge, so same-toned pixels inside the figure survive, and the
 * alpha edge is feathered so the cutout does not read as jagged.
 *
 * Usage: node scripts/cutout.js <in.png> <out.png> [tolerance]
 */
const sharp = require('sharp');
const [, , SRC, OUT, TOL_ARG] = process.argv;
const TOL = Number(TOL_ARG || 46);

sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true }).then(async ({ data, info }) => {
  const { width: W, height: H, channels: C } = info;
  const at = (x, y) => (y * W + x) * C;

  const corners = [[2, 2], [W - 3, 2], [2, H - 3], [W - 3, H - 3]]
    .map(([x, y]) => { const i = at(x, y); return [data[i], data[i + 1], data[i + 2]]; });
  const bg = [0, 1, 2].map((k) => Math.round(corners.reduce((s, c) => s + c[k], 0) / corners.length));

  const isBg = (i) => {
    const dr = data[i] - bg[0], dg = data[i + 1] - bg[1], db = data[i + 2] - bg[2];
    return Math.sqrt(dr * dr + dg * dg + db * db) <= TOL;
  };

  const mask = new Uint8Array(W * H);
  const stack = [];
  for (let x = 0; x < W; x++) stack.push([x, 0], [x, H - 1]);
  for (let y = 0; y < H; y++) stack.push([0, y], [W - 1, y]);
  while (stack.length) {
    const [x, y] = stack.pop();
    if (x < 0 || y < 0 || x >= W || y >= H) continue;
    const p = y * W + x;
    if (mask[p] || !isBg(at(x, y))) continue;
    mask[p] = 1;
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  // Feather: a kept pixel touching background gets partial alpha.
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const p = y * W + x;
      if (mask[p]) { data[at(x, y) + 3] = 0; continue; }
      let n = 0;
      for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < W && ny < H && mask[ny * W + nx]) n++;
      }
      if (n) data[at(x, y) + 3] = Math.round(255 * (1 - n / 6));
    }
  }

  let minX = W, minY = H, maxX = 0, maxY = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (!mask[y * W + x]) {
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
  const pad = 10;
  minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad);
  maxX = Math.min(W - 1, maxX + pad); maxY = Math.min(H - 1, maxY + pad);

  await sharp(Buffer.from(data), { raw: { width: W, height: H, channels: C } })
    .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
    .png({ compressionLevel: 9 })
    .toFile(OUT);

  const removed = mask.reduce((s, v) => s + v, 0);
  console.log(`bg rgb(${bg})  tol=${TOL}  removed=${(removed / (W * H) * 100).toFixed(1)}%  out=${maxX - minX + 1}x${maxY - minY + 1}`);
});
