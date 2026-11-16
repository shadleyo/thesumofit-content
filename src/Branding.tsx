import React from 'react';
import {AbsoluteFill} from 'remotion';
import {ACCENT, INK, LINE, MONO, MUTED, PAPER, SANS, useBrandFonts} from './brand';

// Exponential "growth" curve used as the channel mark.
const curve = (w: number, h: number, pad: number) => {
  const pts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const y = (Math.pow(1.07, t * 40) - 1) / (Math.pow(1.07, 40) - 1);
    pts.push(`${pad + t * (w - 2 * pad)},${h - pad - y * (h - 2 * pad)}`);
  }
  return 'M' + pts.join(' L');
};

const Grid: React.FC<{size: number}> = ({size}) => (
  <AbsoluteFill
    style={{
      backgroundImage: `linear-gradient(${LINE}66 2px, transparent 2px), linear-gradient(90deg, ${LINE}66 2px, transparent 2px)`,
      backgroundSize: `${size}px ${size}px`,
    }}
  />
);

// 800x800 profile picture. Platforms crop it to a circle, so the mark sits inside the centre ~70%.
export const Avatar: React.FC = () => {
  useBrandFonts();
  const W = 800, pad = 225;
  const d = curve(W, W, pad);
  const endX = W - pad, endY = pad;
  return (
    <AbsoluteFill style={{background: INK}}>
      <Grid size={100} />
      <svg width={W} height={W} style={{position: 'absolute'}}>
        <line x1={pad} x2={W - pad} y1={W - pad} y2={W - pad} stroke={MUTED} strokeWidth={10} strokeLinecap="round" />
        <path d={d} fill="none" stroke={ACCENT} strokeWidth={40} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={endX} cy={endY} r={44} fill={PAPER} />
      </svg>
    </AbsoluteFill>
  );
};

// 2560x1440 YouTube banner. Everything important stays in the centre 1546x423 "safe area".
export const Banner: React.FC = () => {
  useBrandFonts();
  const W = 2560, H = 1440;
  return (
    <AbsoluteFill style={{background: INK, fontFamily: SANS, color: PAPER}}>
      <Grid size={80} />
      {/* decorative curves on the wide edges (visible on TV/desktop, harmless when cropped) */}
      <svg width={W} height={H} style={{position: 'absolute'}}>
        <path d={curve(700, 600, 0)} transform={`translate(${W - 760}, ${H / 2 - 120})`} fill="none" stroke={ACCENT} strokeWidth={14} opacity={0.5} />
      </svg>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div style={{width: 1546, height: 423, display: 'flex', alignItems: 'center', gap: 70}}>
          <svg width={300} height={300} viewBox="0 0 800 800" style={{flexShrink: 0}}>
            <rect width={800} height={800} rx={140} fill="#151B2B" stroke={LINE} strokeWidth={8} />
            <line x1={190} x2={610} y1={610} y2={610} stroke={MUTED} strokeWidth={10} strokeLinecap="round" />
            <path d={curve(800, 800, 190)} fill="none" stroke={ACCENT} strokeWidth={40} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={610} cy={190} r={44} fill={PAPER} />
          </svg>
          <div>
            <div style={{fontSize: 150, fontWeight: 700, letterSpacing: -5, lineHeight: 1}}>
              Money<span style={{color: ACCENT}}>,</span> in Data
            </div>
            <div style={{fontSize: 46, color: PAPER, opacity: 0.85, marginTop: 26, whiteSpace: 'nowrap'}}>
              Everyday money choices, run through the numbers.
            </div>
            <div style={{fontFamily: MONO, fontSize: 36, color: ACCENT, marginTop: 26, letterSpacing: 3}}>
              @MONEYINDATAHQ · NEW CHARTS EVERY WEEK
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Reusable vertical thumbnail (1080x1920). Key content sits in the centre band,
// which survives the crops YouTube and TikTok use in feeds and search.
export type ThumbProps = {kicker: string; from: string; to: string; foot: string; link?: string};
export const Thumb: React.FC<ThumbProps> = ({kicker, from, to, foot}) => {
  useBrandFonts();
  const W = 1080, H = 1920;
  return (
    <AbsoluteFill style={{background: INK, fontFamily: SANS, color: PAPER, alignItems: 'center', justifyContent: 'center'}}>
      <Grid size={90} />
      <svg width={W} height={H} style={{position: 'absolute'}}>
        <path d={curve(1000, 900, 0)} transform="translate(40, 760)" fill="none" stroke={ACCENT} strokeWidth={22} opacity={0.22} strokeLinecap="round" />
      </svg>
      <div style={{textAlign: 'center', position: 'relative'}}>
        <div style={{fontFamily: MONO, fontSize: 52, fontWeight: 700, color: ACCENT, letterSpacing: 6}}>{kicker}</div>
        <div style={{fontSize: 190, fontWeight: 700, letterSpacing: -7, lineHeight: 1, marginTop: 40}}>{from}</div>
        <svg width={140} height={170} viewBox="0 0 140 170" style={{margin: '40px 0 30px'}}>
          <path d="M70 10 L70 140 M20 95 L70 145 L120 95" fill="none" stroke={ACCENT} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{fontFamily: MONO, fontSize: 200, fontWeight: 700, letterSpacing: -10, lineHeight: 1, color: ACCENT,
          textShadow: `0 0 80px ${ACCENT}55`}}>{to}</div>
        <div style={{fontSize: 64, fontWeight: 500, color: PAPER, opacity: 0.85, marginTop: 50}}>{foot}</div>
      </div>
    </AbsoluteFill>
  );
};
