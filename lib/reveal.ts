import type {CSSProperties} from 'react';

// Scroll-reveal hooks (see components/ScrollReveal.tsx and the "Scroll reveal" block in app/globals.scss).
// Spread onto an element: {...reveal(2)} fades/slides it in when it enters the viewport, delayed by
// index × 90ms so siblings cascade. Variants: 'up' (default), 'left', 'right', 'scale', and 'lines'
// for rich headlines whose lines rise from a mask.
export type RevealVariant = 'up' | 'left' | 'right' | 'scale' | 'lines';

export function reveal(index = 0, variant: RevealVariant = 'up') {
  return {
    'data-reveal': variant,
    style: {'--reveal-i': index} as CSSProperties,
    // ScrollReveal may add data-revealed before a late (Suspense) boundary hydrates; that attribute is
    // intentional and React keeps it, so silence the attribute-mismatch warning on this element only.
    suppressHydrationWarning: true,
  };
}
