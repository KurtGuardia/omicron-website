'use client';

import {Fragment, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {X} from 'lucide-react';
import {useTranslations} from 'next-intl';
import styles from './LegalLinks.module.scss';

type LegalDocuments = {terms: string; privacy: string};
type Block = {kind: 'heading' | 'paragraph'; text: string} | {kind: 'list'; items: string[]};

function parseDocument(markdown: string) {
  const lines = markdown.trim().split(/\r?\n/);
  const title = lines.shift()!.replace(/^# /, '');
  const blocks: Block[] = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    if (line.startsWith('## ')) blocks.push({kind: 'heading', text: line.slice(3)});
    else if (line.startsWith('- ')) {
      const previous = blocks.at(-1);
      if (previous?.kind === 'list') previous.items.push(line.slice(2));
      else blocks.push({kind: 'list', items: [line.slice(2)]});
    } else blocks.push({kind: 'paragraph', text: line});
  }
  return {title, blocks};
}

function InlineText({text}: {text: string}) {
  return <>{text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => <Fragment key={index}>{part.startsWith('**') ? <strong>{part.slice(2, -2)}</strong> : part}</Fragment>)}</>;
}

function LegalModal({markdown, onClose}: {markdown: string; onClose: () => void}) {
  const legal = useTranslations('Legal');
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeAction = useRef(onClose);
  closeAction.current = onClose;
  const {title, blocks} = parseDocument(markdown);

  useEffect(() => setRoot(document.body), []);
  useEffect(() => {
    if (!root) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    const overlay = closeRef.current?.closest('[role="dialog"]')?.parentElement;
    const background = Array.from(document.body.children)
      .filter((node): node is HTMLElement => node instanceof HTMLElement && node !== overlay)
      .map(element => ({element, inert: element.inert, hidden: element.getAttribute('aria-hidden')}));
    document.body.style.overflow = 'hidden';
    for (const {element} of background) { element.inert = true; element.setAttribute('aria-hidden', 'true'); }
    closeRef.current?.focus({preventScroll: true});
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { event.preventDefault(); closeAction.current(); } };
    window.addEventListener('keydown', escape);
    return () => {
      window.removeEventListener('keydown', escape);
      document.body.style.overflow = overflow;
      for (const {element, inert, hidden} of background) {
        element.inert = inert;
        if (hidden === null) element.removeAttribute('aria-hidden'); else element.setAttribute('aria-hidden', hidden);
      }
      if (previous?.isConnected) previous.focus({preventScroll: true});
    };
  }, [root]);

  if (!root) return null;
  return createPortal(<div className={styles.backdrop} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <article className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="legal-dialog-title" onKeyDown={event => {
      if (event.key !== 'Tab') return;
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex="0"]'));
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}>
      <header className={styles.header}><h2 id="legal-dialog-title">{title}</h2><button ref={closeRef} type="button" onClick={onClose} aria-label={legal('close')}><X aria-hidden="true" size={25}/></button></header>
      <div className={styles.body} tabIndex={0} role="region" aria-label={title}>
        {blocks.map((block, index) => block.kind === 'heading' ? <h3 key={index}><InlineText text={block.text}/></h3> : block.kind === 'list' ? <ul key={index}>{block.items.map((item, itemIndex) => <li key={itemIndex}><InlineText text={item}/></li>)}</ul> : <p key={index}><InlineText text={block.text}/></p>)}
      </div>
    </article>
  </div>, root);
}

export function LegalLinks({documents}: {documents: LegalDocuments}) {
  const t = useTranslations('Footer');
  const [selected, setSelected] = useState<keyof LegalDocuments | null>(null);
  return <><button className={styles.link} type="button" onClick={() => setSelected('terms')}>{t('terms')}</button><button className={styles.link} type="button" onClick={() => setSelected('privacy')}>{t('privacy')}</button>{selected && <LegalModal markdown={documents[selected]} onClose={() => setSelected(null)}/>}</>;
}
