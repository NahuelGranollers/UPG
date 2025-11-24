export function hexToRgb(hex: string) {
  if (!hex) return null;
  const h = hex.replace('#', '').trim();
  if (h.length === 3) {
    return {
      r: parseInt(h[0] + h[0], 16),
      g: parseInt(h[1] + h[1], 16),
      b: parseInt(h[2] + h[2], 16),
    };
  }
  if (h.length !== 6) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function relativeLuminance({ r, g, b }: { r: number; g: number; b: number }) {
  // Convert sRGB to linear
  const srgb = [r, g, b]
    .map(v => v / 255)
    .map(c => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

export function readableTextColor(hex: string, lightFallback = '#fff', darkFallback = '#000') {
  const rgb = hexToRgb(hex || '');
  if (!rgb) return lightFallback;
  const lum = relativeLuminance(rgb);
  // If color is too dark, return light fallback; otherwise return original color
  return lum < 0.18 ? lightFallback : `#${hex.replace('#', '')}`;
}

export default { hexToRgb, relativeLuminance, readableTextColor };
