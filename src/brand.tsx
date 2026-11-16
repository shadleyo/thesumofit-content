import React, {useEffect, useState} from 'react';
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

// Channel look: deep ink, warm paper text, one electric accent.
export const INK = '#0B0F1A';
export const PANEL = '#151B2B';
export const LINE = '#2A3247';
export const PAPER = '#F4F1EA';
export const MUTED = '#8D94A8';
export const ACCENT = '#C6FF3D'; // signal lime
export const ALERT = '#FF5C47'; // used sparingly
export const SANS = '"Space Grotesk", sans-serif';
export const MONO = '"JetBrains Mono", monospace';

const fontFiles: [string, string, string][] = [
  ['Space Grotesk', 'space-grotesk-latin-400-normal.woff2', '400'],
  ['Space Grotesk', 'space-grotesk-latin-500-normal.woff2', '500'],
  ['Space Grotesk', 'space-grotesk-latin-700-normal.woff2', '700'],
  ['JetBrains Mono', 'jetbrains-mono-latin-400-normal.woff2', '400'],
  ['JetBrains Mono', 'jetbrains-mono-latin-700-normal.woff2', '700'],
];

export const useBrandFonts = () => {
  const [handle] = useState(() => delayRender('Loading fonts'));
  useEffect(() => {
    Promise.all(
      fontFiles.map(([family, file, weight]) =>
        new FontFace(family, `url(${staticFile(file)}) format('woff2')`, {weight})
          .load()
          .then((f) => document.fonts.add(f))
      )
    )
      .then(() => continueRender(handle))
      .catch((e) => {
        console.error(e);
        continueRender(handle);
      });
  }, [handle]);
};

// Background with a faint grid so the frame never feels empty.
export const Stage: React.FC<{children: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: INK, fontFamily: SANS, color: PAPER}}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${LINE}55 1px, transparent 1px), linear-gradient(90deg, ${LINE}55 1px, transparent 1px)`,
          backgroundSize: '90px 90px',
          backgroundPosition: `0 ${(frame * 0.4) % 90}px`,
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

export const Rise: React.FC<{
  at?: number;
  out?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({at = 0, out, children, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - at, fps, config: {damping: 200}});
  const o =
    out === undefined
      ? 1
      : interpolate(frame, [out, out + 10], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
  return (
    <div style={{opacity: s * o, transform: `translateY(${(1 - s) * 36}px)`, ...style}}>
      {children}
    </div>
  );
};

export const SceneFade: React.FC<{dur: number; children: React.ReactNode}> = ({dur, children}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 8, dur - 8, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{opacity: o}}>{children}</AbsoluteFill>;
};

export const Kicker: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({
  children,
  style,
}) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: 32,
      fontWeight: 700,
      letterSpacing: 4,
      textTransform: 'uppercase',
      color: ACCENT,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Progress: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: 10,
        width: `${(frame / durationInFrames) * 100}%`,
        background: ACCENT,
      }}
    />
  );
};

// Small persistent channel bug, bottom-left.
export const Bug: React.FC<{text: string}> = ({text}) => (
  <div
    style={{
      position: 'absolute',
      bottom: 70,
      left: 70,
      fontFamily: MONO,
      fontSize: 26,
      color: MUTED,
      letterSpacing: 2,
    }}
  >
    {text}
  </div>
);
