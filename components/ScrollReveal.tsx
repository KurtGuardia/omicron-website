'use client';
import {useEffect} from 'react';

// Marks every [data-reveal] element with data-revealed once it scrolls into view (CSS animates the
// change). New elements — client navigation, filtered result lists — are picked up via MutationObserver.
// The hidden start state is gated by html[data-js], which app/layout.tsx sets before first paint and removes
// after 3s unless this component has signalled readiness, so content can never stay invisible.
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    (window as Window & {__revealReady?: boolean}).__revealReady = true;
    if (!('IntersectionObserver' in window)) { root.removeAttribute('data-js'); return; }
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-revealed', '');
        observer.unobserve(entry.target);
      }
    }, {rootMargin: '0px 0px -8% 0px', threshold: 0.12});
    const pending = '[data-reveal]:not([data-revealed])';
    const scan = (node: ParentNode) => node.querySelectorAll(pending).forEach(element => observer.observe(element));
    scan(document);
    const mutations = new MutationObserver(records => {
      for (const record of records) for (const node of record.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches(pending)) observer.observe(node);
        scan(node);
      }
    });
    mutations.observe(document.body, {childList: true, subtree: true});
    return () => { observer.disconnect(); mutations.disconnect(); };
  }, []);
  return null;
}
