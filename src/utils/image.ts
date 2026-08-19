/* =========================
   src/utils/image.ts
========================= */

import type { SyntheticEvent } from 'react';

const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#eeeeee"/>
      <g fill="#aaaaaa">
        <rect x="150" y="110" width="100" height="70" rx="6" fill="none" stroke="#aaaaaa" stroke-width="4"/>
        <circle cx="175" cy="135" r="8"/>
        <path d="M150 165 L180 145 L205 165 L230 140 L250 165 L250 180 L150 180 Z"/>
      </g>
      <text x="200" y="210" font-family="Arial, sans-serif" font-size="14" fill="#999999" text-anchor="middle">
        Imagem indisponível
      </text>
    </svg>
  `);

export function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  const target = event.currentTarget;

  // Evita loop infinito caso o próprio fallback falhe
  if (target.src === FALLBACK_IMAGE) return;

  target.src = FALLBACK_IMAGE;
  target.alt = 'Imagem indisponível';
}