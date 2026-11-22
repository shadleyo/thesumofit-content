// "Sport, by the numbers" tactic board. Top-down pitch, moving dots, law captions, a question to end on.
// Pitch-green and navy scheme (distinct from the cream money videos); same wordmark and type.
// Positions are reconstructions from match reports: always labelled "not to scale".
import React from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {MONO, SERIF, useFonts} from './sumofit';

export const B = {
  bg: '#0B2A1F', pitch: '#17553B', stripe: '#1B5F43', line: '#EFE9DC', cream: '#F3EDE2', ink: '#16130F',
  navy: '#12233D', gold: '#E9B93B', blue: '#3D6FD1', red: '#C8102E', yellow: '#F5D21F', sub: '#B9CABF', radius: 10,
};
// F1: carbon-black paddock palette, distinct from the grass pitches — cyan telemetry accent, F1 red for alerts,
// amber for caution, sharper corners for a HUD/premium feel. Used when a BoardRecipe sets pitch: 'track'.
export const F = {
  bg: '#07080B', pitch: '#1B1E23', stripe: '#15171B', line: '#F4F6F8', cream: '#ECEFF3', ink: '#090B0E',
  navy: '#0F2A3D', gold: '#00E5FF', blue: '#00D2BE', red: '#E10600', yellow: '#FFC400', sub: '#8A94A3', radius: 4,
};
const M = 32;            // px per metre
const TRY_Y = 660;       // screen y of the try line
const X = (m: number) => m * M;
const Y = (m: number) => TRY_Y + m * M;
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export type KF = [number, number, number];  // frame, x (m), y (m from try line)
// disputed: true draws this player dashed and faded, for a position/presence the sources don't agree on
// (e.g. a covering defender one report mentions and another doesn't) — show the disagreement, don't pick a side.
export type Dot = {id: string; team: 'a' | 'b'; label?: string; kf: KF[]; ring?: [number, number]; disputed?: boolean; until?: number};  // until: fade out by this frame
export type Caption = {from: number; to: number; kicker?: string; lines: {at: number; text: string}[]};
export type Overlay =
  | {type: 'label'; from: number; to: number; x: number; y: number; text: string; tone?: 'cream' | 'gold' | 'red' | 'navy'; size?: number}
  | {type: 'path'; from: number; to: number; pts: [number, number][]; color?: string}
  | {type: 'zone'; from: number; to: number; x: number; y: number; w: number; h: number}
  | {type: 'card'; from: number; to: number; x: number; y: number; color?: 'yellow' | 'red'}
  | {type: 'burst'; from: number; to: number; x: number; y: number};
export type Big = {from: number; to: number; y: number; lines: {at: number; text: string; tone?: 'cream' | 'gold' | 'red' | 'navy'; size?: number; strike?: number}[]};
export type BoardRecipe = {
  id: string; audio?: string; dur: number; series: string; match: string; note: string;
  teams: {a: string; b: string; aColor?: string; bColor?: string};
  dots: Dot[]; ball: KF[]; captions: Caption[]; overlays: Overlay[]; bigs: Big[];
  pitch?: 'rugby' | 'football' | 'track';  // default rugby (try line + 22); football: halfway + centre circle;
  // track: an F1 straight (carbon/cyan HUD palette instead of the grass pitches). No ball is drawn for 'track'.
  trackLabel?: string;  // overlay label on the track surface, e.g. 'TURN 14'. Default 'TRACK LIMIT'.
  theme?: 'pitch' | 'black';  // default 'pitch'; 'black' = premium dark scheme for All Blacks videos
  ballUntil?: number;  // fade the ball out by this frame
};


// Visual themes. 'pitch' is the original green/navy board; 'black' is a premium dark scheme used for All Blacks videos:
// near-black pitch, hairline silver markings, glass chips, soft glows and a vignette.
export const THEMES = {
  pitch: {...B, lineW: 6, chipBorder: 'none', chipRadius: B.radius, chipWeight: 600, kicker: B.gold, accent: B.gold, headline: B.cream,
    burst: B.red, ring: B.cream, zoneFill: 'rgba(243,237,226,0.16)', zoneBorder: `3px dashed ${B.cream}`, inGoal: 'rgba(0,0,0,0.16)',
    glow: false, dotA: [B.ink, B.ink], dotB: [B.cream, '#fff'], legend: B.cream,
    tone: {cream: [B.cream, B.ink], gold: [B.gold, B.ink], red: [B.red, '#fff'], navy: [B.navy, B.cream]} as Record<string, [string, string]>},
  black: {...B, bg: '#030303', pitch: '#0A0A0B', stripe: '#0F0F11', line: 'rgba(236,239,243,0.82)', cream: '#F4F5F7', sub: '#8A9099', gold: '#C9CED6',
    lineW: 3, chipBorder: '1px solid rgba(255,255,255,0.2)', chipRadius: 4, chipWeight: 500, kicker: '#AEB4BD', accent: '#F4F5F7', headline: '#F4F5F7',
    burst: '#FFFFFF', ring: '#FFFFFF', zoneFill: 'rgba(255,255,255,0.05)', zoneBorder: '1.5px solid rgba(255,255,255,0.5)', inGoal: 'rgba(255,255,255,0.025)',
    glow: true, dotA: ['#D9DCE1', '#F4F5F7'], dotB: ['rgba(0,0,0,0.55)', '#0A0A0A'], legend: '#C9CED6',
    tone: {cream: ['rgba(16,16,18,0.88)', '#F4F5F7'], gold: ['linear-gradient(135deg,#FFFFFF 0%,#C3C8D0 100%)', '#050505'], red: ['#C8102E', '#fff'],
      navy: ['rgba(255,255,255,0.09)', '#E6E8EC']} as Record<string, [string, string]>},
};
export type Theme = typeof THEMES.pitch;
// F1 track: carbon/cyan HUD palette (pitch: 'track' selects it regardless of theme).
const TRACK: Theme = {...THEMES.pitch, ...F, chipRadius: F.radius, kicker: F.gold, accent: F.gold, headline: F.cream, burst: F.red, ring: F.cream,
  zoneBorder: `3px dashed ${F.cream}`, dotA: [F.ink, F.ink], dotB: [F.cream, '#fff'], legend: F.cream,
  tone: {cream: [F.cream, F.ink], gold: [F.gold, F.ink], red: [F.red, '#fff'], navy: [F.navy, F.cream]}};

const at = (kf: KF[], f: number): [number, number] => {
  if (f <= kf[0][0]) return [kf[0][1], kf[0][2]];
  for (let i = 1; i < kf.length; i++) {
    if (f <= kf[i][0]) {
      const t = interpolate(f, [kf[i - 1][0], kf[i][0]], [0, 1], {...clamp, easing: Easing.inOut(Easing.quad)});
      return [kf[i - 1][1] + (kf[i][1] - kf[i - 1][1]) * t, kf[i - 1][2] + (kf[i][2] - kf[i - 1][2]) * t];
    }
  }
  const l = kf[kf.length - 1]; return [l[1], l[2]];
};
const vis = (f: number, from: number, to: number) => interpolate(f, [from, from + 8, to - 8, to], [0, 1, 1, 0], clamp);

const Pitch: React.FC<{P: Theme}> = ({P}) => (
  <AbsoluteFill>
    <AbsoluteFill style={{background: P.bg}} />
    {/* mown stripes, 5 m wide, from the dead-ball area down */}
    {Array.from({length: 11}).map((_, i) => (
      <div key={i} style={{position: 'absolute', left: 0, right: 0, top: Y(-5 + i * 5), height: 5 * M, background: i % 2 ? P.pitch : P.stripe}} />
    ))}
    {/* in-goal tint */}
    <div style={{position: 'absolute', left: 0, right: 0, top: Y(-5), height: 5 * M, background: P.inGoal}} />
    {/* try line, 5 m dashes, 22 */}
    <div style={{position: 'absolute', left: 0, width: X(31), top: Y(0) - 3, height: P.lineW, background: P.line, boxShadow: P.glow ? '0 0 14px rgba(255,255,255,0.35)' : undefined}} />
    <div style={{position: 'absolute', left: 0, width: X(31), top: Y(5) - 2, height: 4, backgroundImage: `repeating-linear-gradient(90deg, ${P.line} 0 40px, transparent 40px 80px)`, opacity: 0.55}} />
    <div style={{position: 'absolute', left: 0, width: X(31), top: Y(22) - 2, height: P.glow ? 2 : 4, background: P.line, opacity: 0.9}} />
    {/* touchline */}
    <div style={{position: 'absolute', left: X(31) - 3, width: P.lineW, top: Y(-5), bottom: 0, background: P.line, boxShadow: P.glow ? '0 0 14px rgba(255,255,255,0.35)' : undefined}} />
    <div style={{position: 'absolute', left: 28, top: Y(0) - 44, fontFamily: MONO, fontSize: 22, letterSpacing: 4, color: P.line, opacity: 0.75}}>TRY LINE</div>
    <div style={{position: 'absolute', left: 28, top: Y(22) - 44, fontFamily: MONO, fontSize: 22, letterSpacing: 4, color: P.line, opacity: 0.75}}>22</div>
  </AbsoluteFill>
);

// Football: same stripes, touchline on the right, halfway line 10 m down, centre circle (9.15 m) centred off-screen left.
const FootballPitch: React.FC<{P: Theme}> = ({P}) => (
  <AbsoluteFill>
    <AbsoluteFill style={{background: P.bg}} />
    {Array.from({length: 11}).map((_, i) => (
      <div key={i} style={{position: 'absolute', left: 0, right: 0, top: Y(-5 + i * 5), height: 5 * M, background: i % 2 ? P.pitch : P.stripe}} />
    ))}
    <div style={{position: 'absolute', left: 0, width: X(31), top: Y(10) - 3, height: 6, background: P.line, opacity: 0.9}} />
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
      <circle cx={X(-3)} cy={Y(10)} r={9.15 * M} stroke={P.line} strokeWidth={5} fill="none" opacity={0.85} />
    </svg>
    <div style={{position: 'absolute', left: X(31) - 3, width: P.lineW, top: Y(-5), bottom: 0, background: P.line, boxShadow: P.glow ? '0 0 14px rgba(255,255,255,0.35)' : undefined}} />
    <div style={{position: 'absolute', left: X(9), top: Y(10) - 44, fontFamily: MONO, fontSize: 22, letterSpacing: 4, color: P.line, opacity: 0.75}}>HALFWAY</div>
  </AbsoluteFill>
);

// F1 straight: dark asphalt, white track-limit lines, red/white kerbing on the apex edge, a turn-number readout.
// Reuses the same X/Y coordinate frame as the pitches so dots, paths and overlays need no special-casing.
const TrackSurface: React.FC<{label?: string}> = ({label = 'TRACK LIMIT'}) => (
  <AbsoluteFill>
    <AbsoluteFill style={{background: F.bg}} />
    {Array.from({length: 11}).map((_, i) => (
      <div key={i} style={{position: 'absolute', left: 0, right: 0, top: Y(-5 + i * 5), height: 5 * M, background: i % 2 ? F.pitch : F.stripe}} />
    ))}
    {/* track-limit lines, left and right */}
    <div style={{position: 'absolute', left: X(0) - 3, width: 6, top: Y(-5), bottom: 0, background: F.line, opacity: 0.9}} />
    <div style={{position: 'absolute', left: X(31) - 3, width: 6, top: Y(-5), bottom: 0, background: F.line, opacity: 0.9}} />
    {/* apex kerbing, red/white rumble strip along the right edge */}
    <div style={{position: 'absolute', left: X(31) - 3, width: 14, top: Y(-5), bottom: 0,
      backgroundImage: `repeating-linear-gradient(0deg, ${F.red} 0 34px, ${F.line} 34px 68px)`, opacity: 0.85}} />
    {/* dashed racing line down the middle */}
    <div style={{position: 'absolute', left: X(15.5) - 2, width: 4, top: Y(-5), bottom: 0,
      backgroundImage: `repeating-linear-gradient(0deg, ${F.sub} 0 30px, transparent 30px 62px)`, opacity: 0.4}} />
    <div style={{position: 'absolute', left: 28, top: Y(0) - 44, fontFamily: MONO, fontSize: 22, letterSpacing: 4, color: F.gold, opacity: 0.85}}>{label.toUpperCase()}</div>
  </AbsoluteFill>
);

// Thin cyan corner brackets, a cheap HUD/telemetry flourish for the F1 track theme.
const HUDCorners: React.FC = () => {
  const c = F.gold; const s = 46; const w = 4;
  const corner = (top: boolean, left: boolean) => ({
    position: 'absolute' as const, [top ? 'top' : 'bottom']: 40, [left ? 'left' : 'right']: 40,
    width: s, height: s, borderTop: top ? `${w}px solid ${c}` : 'none', borderBottom: !top ? `${w}px solid ${c}` : 'none',
    borderLeft: left ? `${w}px solid ${c}` : 'none', borderRight: !left ? `${w}px solid ${c}` : 'none', opacity: 0.6,
  });
  return (
    <>
      <div style={corner(true, true)} /><div style={corner(true, false)} />
      <div style={corner(false, true)} /><div style={corner(false, false)} />
    </>
  );
};

const Chip: React.FC<{P: Theme; text: string; tone?: 'cream' | 'gold' | 'red' | 'navy'; size?: number; s: number; strike?: number}> = ({P, text, tone = 'cream', size = 46, s, strike = 0}) => (
  <div style={{display: 'inline-block', position: 'relative', background: P.tone[tone][0], color: P.tone[tone][1], border: P.chipBorder, fontFamily: SERIF, fontWeight: P.chipWeight, letterSpacing: P.glow ? -0.3 : 0, fontSize: size, lineHeight: 1.12,
    padding: `${size * 0.22}px ${size * 0.42}px`, borderRadius: P.chipRadius, opacity: s, transform: `translateY(${(1 - s) * 24}px)`, boxShadow: P.glow ? '0 10px 30px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)' : '0 6px 18px rgba(0,0,0,0.28)', backdropFilter: P.glow ? 'blur(6px)' : undefined}}>
    {text}
    {strike > 0 && <div style={{position: 'absolute', left: '6%', top: '52%', height: Math.max(5, size * 0.08), width: `${88 * strike}%`, background: P.tone.red[0]}} />}
  </div>
);

export const boardDuration = (r: BoardRecipe) => r.dur;

export const BoardVideo: React.FC<{recipe: BoardRecipe}> = ({recipe: r}) => {
  useFonts();
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const isTrack = r.pitch === 'track';
  const P: Theme = isTrack ? TRACK : THEMES[r.theme ?? 'pitch'];
  const sp = (a: number) => spring({frame: f - a, fps, config: {damping: 200, mass: 0.8}});
  const col = {a: r.teams.aColor ?? P.gold, b: r.teams.bColor ?? P.blue};
  const [bx, by] = at(r.ball, f);
  return (
    <AbsoluteFill style={{background: P.bg}}>
      {r.audio && <Audio src={staticFile(r.audio)} />}
      {isTrack ? <TrackSurface label={r.trackLabel} /> : r.pitch === 'football' ? <FootballPitch P={P} /> : <Pitch P={P} />}
      {isTrack && <HUDCorners />}
      {P.glow && <AbsoluteFill style={{background: 'radial-gradient(ellipse 85% 60% at 50% 48%, rgba(255,255,255,0.045) 0%, transparent 55%, rgba(0,0,0,0.7) 100%)'}} />}
      {P.glow && <AbsoluteFill style={{background: 'linear-gradient(180deg, #030303 0px, rgba(3,3,3,0.92) 420px, transparent 560px)'}} />}
      {/* zones and paths under the players */}
      {r.overlays.map((o, i) => {
        const v = vis(f, o.from, o.to); if (v <= 0) return null;
        if (o.type === 'zone') return <div key={i} style={{position: 'absolute', left: X(o.x), top: Y(o.y), width: o.w * M, height: o.h * M, background: P.zoneFill, border: P.zoneBorder, borderRadius: P.chipRadius, opacity: v}} />;
        if (o.type === 'path') {
          const d = o.pts.map((p, j) => `${j ? 'L' : 'M'}${X(p[0])},${Y(p[1])}`).join(' ');
          const len = o.pts.slice(1).reduce((a, p, j) => a + Math.hypot(X(p[0]) - X(o.pts[j][0]), Y(p[1]) - Y(o.pts[j][1])), 0);
          const t = interpolate(f, [o.from, o.from + 24], [0, 1], clamp);
          return (
            <svg key={i} width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: v, filter: P.glow ? 'drop-shadow(0 0 8px rgba(255,255,255,0.45))' : undefined}}>
              <defs><mask id={`m${i}`}><path d={d} stroke="#fff" strokeWidth={14} fill="none" strokeDasharray={len} strokeDashoffset={len * (1 - t)} /></mask></defs>
              <path d={d} stroke={o.color ?? P.cream} strokeWidth={P.glow ? 5 : 7} fill="none" strokeDasharray={P.glow ? '2 12' : '18 14'} strokeLinecap="round" mask={`url(#m${i})`} />
            </svg>
          );
        }
        return null;
      })}
      {/* players */}
      {r.dots.map((d) => {
        const [x, y] = at(d.kf, f); const a = sp(d.kf[0][0] - 6) * (d.until ? interpolate(f, [d.until - 12, d.until], [1, 0], clamp) : 1);
        if (a <= 0.001 && d.until && f > d.until) return null;
        const ring = d.ring ? vis(f, d.ring[0], d.ring[1]) : 0;
        const pulse = 1 + 0.12 * Math.sin(f / 5);
        return (
          <React.Fragment key={d.id}>
            {ring > 0 && <div style={{position: 'absolute', left: X(x) - 50, top: Y(y) - 50, width: 100, height: 100, borderRadius: 50, border: `${P.glow ? 3 : 5}px solid ${P.ring}`, opacity: ring, boxShadow: P.glow ? '0 0 24px rgba(255,255,255,0.35)' : undefined, transform: `scale(${pulse})`}} />}
            <div style={{position: 'absolute', left: X(x) - 29, top: Y(y) - 29, width: 58, height: 58, borderRadius: isTrack ? 14 : 29, background: col[d.team],
              border: `${P.glow ? 3 : 4}px ${d.disputed ? 'dashed' : 'solid'} ${(d.team === 'a' ? P.dotA : P.dotB)[0]}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 500, fontSize: 26, color: (d.team === 'a' ? P.dotA : P.dotB)[1],
              opacity: a * (d.disputed ? 0.55 : 1), transform: `scale(${0.6 + 0.4 * a})`, boxShadow: P.glow ? '0 0 0 6px rgba(255,255,255,0.04), 0 0 26px rgba(255,255,255,0.16), 0 6px 14px rgba(0,0,0,0.6)' : '0 4px 10px rgba(0,0,0,0.35)'}}>
              {d.label}
            </div>
            {d.disputed && <div style={{position: 'absolute', left: X(x) + 16, top: Y(y) - 42, opacity: a, fontFamily: MONO, fontSize: 15, letterSpacing: 1, color: P.cream, background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: 5}}>DISPUTED</div>}
          </React.Fragment>
        );
      })}
      {/* ball (F1 track has no ball) */}
      {!isTrack && <div style={{position: 'absolute', left: X(bx) - 15, top: Y(by) - (r.pitch === 'football' ? 15 : 11), width: 30, height: r.pitch === 'football' ? 30 : 22, borderRadius: '50%', background: '#fff', border: `3px solid ${P.ink}`, opacity: sp(r.ball[0][0] - 6) * (r.ballUntil ? interpolate(f, [r.ballUntil - 12, r.ballUntil], [1, 0], clamp) : 1), boxShadow: '0 3px 8px rgba(0,0,0,0.4)'}} />}
      {/* labels, cards, bursts above the players */}
      {r.overlays.map((o, i) => {
        const v = vis(f, o.from, o.to); if (v <= 0) return null;
        const s = sp(o.from);
        if (o.type === 'label') return <div key={i} style={{position: 'absolute', left: X(o.x), top: Y(o.y), opacity: v, transform: 'translate(-50%,-50%)'}}><Chip P={P} text={o.text} tone={o.tone} size={o.size ?? 34} s={s} /></div>;
        if (o.type === 'card') return <div key={i} style={{position: 'absolute', left: X(o.x) - 26, top: Y(o.y) - 38, width: 52, height: 76, borderRadius: 7, background: o.color === 'red' ? P.red : P.yellow, border: `3px solid ${P.ink}`, opacity: v, transform: `rotate(${-10 + 10 * s}deg) scale(${s})`, boxShadow: '0 6px 14px rgba(0,0,0,0.4)'}} />;
        if (o.type === 'burst') return <div key={i} style={{position: 'absolute', left: X(o.x) - 60, top: Y(o.y) - 60, width: 120, height: 120, borderRadius: 60, border: `${P.glow ? 4 : 8}px solid ${P.burst}`, boxShadow: P.glow ? '0 0 30px rgba(255,255,255,0.5)' : undefined, opacity: v * (1 - interpolate(f, [o.from, o.from + 26], [0, 1], clamp) * 0.6), transform: `scale(${0.4 + interpolate(f, [o.from, o.from + 26], [0, 1.2], clamp)})`}} />;
        return null;
      })}
      {/* header */}
      <div style={{position: 'absolute', left: 60, right: 60, top: 58, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: P.headline}}>
        <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: 40}}>The Sum <i style={{fontWeight: 400}}>of</i> It</div>
        <div style={{fontFamily: MONO, fontSize: 21, letterSpacing: 4, color: P.sub}}>{r.series.toUpperCase()}</div>
      </div>
      <div style={{position: 'absolute', left: 60, right: 60, top: 118, height: P.glow ? 1 : 3, background: P.headline, opacity: 0.35}} />
      <div style={{position: 'absolute', left: 60, top: 118, height: P.glow ? 2 : 3, width: (960 * f) / r.dur, background: P.accent, boxShadow: P.glow ? '0 0 10px rgba(255,255,255,0.6)' : undefined}} />
      {/* captions */}
      {r.captions.map((c, i) => {
        const v = vis(f, c.from, c.to); if (v <= 0) return null;
        return (
          <div key={i} style={{position: 'absolute', left: 60, right: 60, top: 150, opacity: v}}>
            {c.kicker && <div style={{fontFamily: MONO, fontSize: 24, letterSpacing: P.glow ? 6 : 4, color: P.kicker, marginBottom: 14, opacity: sp(c.from)}}>{c.kicker.toUpperCase()}</div>}
            {c.lines.map((l, j) => <div key={j} style={{marginBottom: 10}}><Chip P={P} text={l.text} s={sp(l.at)} size={44} /></div>)}
          </div>
        );
      })}
      {/* big statements */}
      {r.bigs.map((b, i) => {
        const v = vis(f, b.from, b.to); if (v <= 0) return null;
        return (
          <div key={i} style={{position: 'absolute', left: 60, right: 60, top: b.y, opacity: v, textAlign: 'center'}}>
            {b.lines.map((l, j) => <div key={j} style={{marginBottom: 16}}><Chip P={P} text={l.text} tone={l.tone} size={l.size ?? 84} s={sp(l.at)} strike={l.strike ? interpolate(f, [l.strike, l.strike + 12], [0, 1], clamp) : 0} /></div>)}
          </div>
        );
      })}
      {/* legend and note */}
      <div style={{position: 'absolute', left: 60, top: Y(-5) + 16, display: 'flex', gap: 26, fontFamily: MONO, fontSize: 21, letterSpacing: 2, color: P.legend}}>
        <span><span style={{display: 'inline-block', width: 20, height: 20, borderRadius: 10, background: col.a, border: P.glow ? '1.5px solid #D9DCE1' : undefined, boxSizing: 'border-box', marginRight: 9, verticalAlign: -3}} />{r.teams.a.toUpperCase()}</span>
        <span><span style={{display: 'inline-block', width: 20, height: 20, borderRadius: 10, background: col.b, border: P.glow ? '1.5px solid #D9DCE1' : undefined, boxSizing: 'border-box', marginRight: 9, verticalAlign: -3}} />{r.teams.b.toUpperCase()}</span>
      </div>
      <div style={{position: 'absolute', left: 60, right: 200, bottom: 330, fontFamily: MONO, fontSize: 19, lineHeight: 1.45, letterSpacing: 1, color: P.sub}}>{r.match}<br />{r.note}</div>
    </AbsoluteFill>
  );
};
