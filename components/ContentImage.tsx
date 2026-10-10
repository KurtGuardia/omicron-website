'use client';

import Image, {type ImageProps} from 'next/image';
import {useState} from 'react';
import {assets} from '@/data/assets';

// Shared fallback for supplied content images; resets naturally when the source changes.
export function ContentImage({src, fallback = assets.project, onError, ...props}: Omit<ImageProps, 'src'> & {src?: ImageProps['src']; fallback?: ImageProps['src']}) {
  const [failedSource, setFailedSource] = useState<ImageProps['src']>();
  const source = src && src !== failedSource ? src : fallback;
  return <Image {...props} src={source} onError={event => {if (source !== fallback) setFailedSource(src); onError?.(event);}}/>;
}
