// Derives public/images/logo-light.png (for dark backgrounds) from public/images/logo.png.
// Navy wordmark pixels are blended to white; the brand colours (green, light blue,
// orange) and the alpha channel are preserved. Re-run whenever logo.png changes:
//   node scripts/prepare-logo-variants.mjs
import {createRequire} from 'node:module'
import path from 'node:path'

// sharp ships with Next.js; resolve it through next so no extra dependency is needed.
const require = createRequire(import.meta.url)
const sharp = require(require.resolve('sharp', {paths: [path.dirname(require.resolve('next/package.json'))]}))

const source = 'public/images/logo.png'
const target = 'public/images/logo-light.png'

const {data, info} = await sharp(source).ensureAlpha().raw().toBuffer({resolveWithObject: true})
const smoothstep = (edge0, edge1, x) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

for (let i = 0; i < data.length; i += 4) {
  const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]]
  if (a === 0 || b < 20) continue
  // Navy has blue far above red/green (g/b ≈ 0.3); the light-blue letter sits near 0.67,
  // green and orange have b below g/r. Anti-aliased edges keep their hue ratios.
  const ratio = Math.max(r, g) / b
  const weight = 1 - smoothstep(0.42, 0.58, ratio)
  if (weight === 0) continue
  data[i] = Math.round(r + (255 - r) * weight)
  data[i + 1] = Math.round(g + (255 - g) * weight)
  data[i + 2] = Math.round(b + (255 - b) * weight)
}

await sharp(data, {raw: info}).png({compressionLevel: 9}).toFile(target)
console.log(`Wrote ${target} (${info.width}×${info.height})`)
