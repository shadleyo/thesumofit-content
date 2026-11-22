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
export type Dot = {id: string; team: 'a' | 'b'; label?: string; kf: KF[]; ring?: [number, number]; disputed?: boolean};
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
};

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
const toneFor = (p: typeof B) => ({cream: [p.cream, p.ink], gold: [p.gold, p.ink], red: [p.red, '#fff'], navy: [p.navy, p.cream]} as const);

const Pitch: React.FC = () => (
  <AbsoluteFill>
    <AbsoluteFill style={{background: B.bg}} />
    {/* mown stripes, 5 m wide, from the dead-ball area down */}
    {Array.from({length: 11}).map((_, i) => (
      <div key={i} style={{position: 'absolute', left: 0, right: 0, top: Y(-5 + i * 5), height: 5 * M, background: i % 2 ? B.pitch : B.stripe}} />
    ))}
    {/* in-goal tint */}
    <div style={{position: 'absolute', left: 0, right: 0, top: Y(-5), height: 5 * M, background: 'rgba(0,0,0,0.16)'}} />
    {/* try line, 5 m dashes, 22 */}
    <div style={{position: 'absolute', left: 0, width: X(31), top: Y(0) - 3, height: 6, background: B.line}} />
    <div style={{position: 'absolute', left: 0, width: X(31), top: Y(5) - 2, height: 4, backgroundImage: `repeating-linear-gradient(90deg, ${B.line} 0 40px, transparent 40px 80px)`, opacity: 0.55}} />
    <div style={{position: 'absolute', left: 0, width: X(31), top: Y(22) - 2, height: 4, background: B.line, opacity: 0.9}} />
    {/* touchline */}
    <div style={{position: 'absolute', left: X(31) - 3, width: 6, top: Y(-5), bottom: 0, background: B.line}} />
    <div style={{position: 'absolute', left: 28, top: Y(0) - 44, fontFamily: MONO, fontSize: 22, letterSpacing: 4, color: B.line, opacity: 0.75}}>TRY LINE</div>
    <div style={{position: 'absolute', left: 28, top: Y(22) - 44, fontFamily: MONO, fontSize: 22, letterSpacing: 4, color: B.line, opacity: 0.75}}>22</div>
  </AbsoluteFill>
);

// Football: same stripes, touchline on the right, halfway line 10 m down, centre circle (9.15 m) centred off-screen left.
const FootballPitch: React.FC = () => (
  <AbsoluteFill>
    <AbsoluteFill style={{background: B.bg}} />
    {Array.from({length: 11}).map((_, i) => (
      <div key={i} style={{position: 'absolute', left: 0, right: 0, top: Y(-5 + i * 5), height: 5 * M, background: i % 2 ? B.pitch : B.stripe}} />
    ))}
    <div style={{position: 'absolute', left: 0, width: X(31), top: Y(10) - 3, height: 6, background: B.line, opacity: 0.9}} />
    <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
      <circle cx={X(-3)} cy={Y(10)} r={9.15 * M} stroke={B.line} strokeWidth={5} fill="none" opacity={0.85} />
    </svg>
    <div style={{position: 'absolute', left: X(31) - 3, width: 6, top: Y(-5), bottom: 0, background: B.line}} />
    <div style={{position: 'absolute', left: X(9), top: Y(10) - 44, fontFamily: MONO, fontSize: 22, letterSpacing: 4, color: B.line, opacity: 0.75}}>HALFWAY</div>
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

const Chip: React.FC<{text: string; tone?: 'cream' | 'gold' | 'red' | 'navy'; size?: number; s: number; strike?: number; pal: typeof B}> = ({text, tone = 'cream', size = 46, s, strike = 0, pal}) => {
  const TONE = toneFor(pal);
  return (
    <div style={{display: 'inline-block', position: 'relative', background: TONE[tone][0], color: TONE[tone][1], fontFamily: SERIF, fontWeight: 600, fontSize: size, lineHeight: 1.12,
      padding: `${size * 0.22}px ${size * 0.42}px`, borderRadius: pal.radius ?? 10, opacity: s, transform: `translateY(${(1 - s) * 24}px)`, boxShadow: '0 6px 18px rgba(0,0,0,0.28)'}}>
      {text}
      {strike > 0 && <div style={{position: 'absolute', left: '6%', top: '52%', height: Math.max(5, size * 0.08), width: `${88 * strike}%`, background: pal.red}} />}
    </div>
  );
};

export const boardDuration = (r: BoardRecipe) => r.dur;

export const BoardVideo: React.FC<{recipe: BoardRecipe}> = ({recipe: r}) => {
  useFonts();
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const sp = (a: number) => spring({frame: f - a, fps, config: {damping: 200, mass: 0.8}});
  const isTrack = r.pitch === 'track';
  const pal = isTrack ? F : B;
  const col = {a: r.teams.aColor ?? pal.gold, b: r.teams.bColor ?? pal.blue};
  const [bx, by] = at(r.ball, f);
  return (
    <AbsoluteFill style={{background: pal.bg}}>
      {r.audio && <Audio src={staticFile(r.audio)} />}
      {isTrack ? <TrackSurface label={r.trackLabel} /> : r.pitch === 'football' ? <FootballPitch /> : <Pitch />}
      {isTrack && <HUDCorners />}
      {/* zones and paths under the players */}
      {r.overlays.map((o, i) => {
        const v = vis(f, o.from, o.to); if (v <= 0) return null;
        if (o.type === 'zone') return <div key={i} style={{position: 'absolute', left: X(o.x), top: Y(o.y), width: o.w * M, height: o.h * M, background: 'rgba(243,237,226,0.16)', border: `3px dashed ${pal.cream}`, borderRadius: pal.radius ?? 10, opacity: v}} />;
        if (o.type === 'path') {
          const d = o.pts.map((p, j) => `${j ? 'L' : 'M'}${X(p[0])},${Y(p[1])}`).join(' ');
          const len = o.pts.slice(1).reduce((a, p, j) => a + Math.hypot(X(p[0]) - X(o.pts[j][0]), Y(p[1]) - Y(o.pts[j][1])), 0);
          const t = interpolate(f, [o.from, o.from + 24], [0, 1], clamp);
          return (
            <svg key={i} width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0, opacity: v}}>
              <defs><mask id={`m${i}`}><path d={d} stroke="#fff" strokeWidth={14} fill="none" strokeDasharray={len} strokeDashoffset={len * (1 - t)} /></mask></defs>
              <path d={d} stroke={o.color ?? pal.cream} strokeWidth={7} fill="none" strokeDasharray="18 14" strokeLinecap="round" mask={`url(#m${i})`} />
            </svg>
          );
        }
        return null;
      })}
      {/* players */}
      {r.dots.map((d) => {
        const [x, y] = at(d.kf, f); const a = sp(d.kf[0][0] - 6);
        const ring = d.ring ? vis(f, d.ring[0], d.ring[1]) : 0;
        const pulse = 1 + 0.12 * Math.sin(f / 5);
        return (
          <React.Fragment key={d.id}>
            {ring > 0 && <div style={{position: 'absolute', left: X(x) - 50, top: Y(y) - 50, width: 100, height: 100, borderRadius: 50, border: `5px solid ${pal.cream}`, opacity: ring, transform: `scale(${pulse})`}} />}
            <div style={{position: 'absolute', left: X(x) - 29, top: Y(y) - 29, width: 58, height: 58, borderRadius: isTrack ? 14 : 29, background: col[d.team],
              border: d.disputed ? `4px dashed ${d.team === 'a' ? pal.ink : pal.cream}` : `4px solid ${d.team === 'a' ? pal.ink : pal.cream}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 500, fontSize: 26, color: d.team === 'a' ? pal.ink : '#fff',
              opacity: a * (d.disputed ? 0.55 : 1), transform: `scale(${0.6 + 0.4 * a})`, boxShadow: '0 4px 10px rgba(0,0,0,0.35)'}}>
              {d.label}
            </div>
            {d.disputed && <div style={{position: 'absolute', left: X(x) + 16, top: Y(y) - 42, opacity: a, fontFamily: MONO, fontSize: 15, letterSpacing: 1, color: pal.cream, background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: 5}}>DISPUTED</div>}
          </React.Fragment>
        );
      })}
      {/* ball (F1 track has no ball) */}
      {!isTrack && <div style={{position: 'absolute', left: X(bx) - 15, top: Y(by) - (r.pitch === 'football' ? 15 : 11), width: 30, height: r.pitch === 'football' ? 30 : 22, borderRadius: '50%', background: '#fff', border: `3px solid ${pal.ink}`, opacity: sp(r.ball[0][0] - 6), boxShadow: '0 3px 8px rgba(0,0,0,0.4)'}} />}
      {/* labels, cards, bursts above the players */}
      {r.overlays.map((o, i) => {
        const v = vis(f, o.from, o.to); if (v <= 0) return null;
        const s = sp(o.from);
        if (o.type === 'label') return <div key={i} style={{position: 'absolute', left: X(o.x), top: Y(o.y), opacity: v, transform: 'translate(-50%,-50%)'}}><Chip text={o.text} tone={o.tone} size={o.size ?? 34} s={s} pal={pal} /></div>;
        if (o.type === 'card') return <div key={i} style={{position: 'absolute', left: X(o.x) - 26, top: Y(o.y) - 38, width: 52, height: 76, borderRadius: 7, background: o.color === 'red' ? pal.red : pal.yellow, border: `3px solid ${pal.ink}`, opacity: v, transform: `rotate(${-10 + 10 * s}deg) scale(${s})`, boxShadow: '0 6px 14px rgba(0,0,0,0.4)'}} />;
        if (o.type === 'burst') return <div key={i} style={{position: 'absolute', left: X(o.x) - 60, top: Y(o.y) - 60, width: 120, height: 120, borderRadius: 60, border: `8px solid ${pal.red}`, opacity: v * (1 - interpolate(f, [o.from, o.from + 26], [0, 1], clamp) * 0.6), transform: `scale(${0.4 + interpolate(f, [o.from, o.from + 26], [0, 1.2], clamp)})`}} />;
        return null;
      })}
      {/* header */}
      <div style={{position: 'absolute', left: 60, right: 60, top: 58, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: pal.cream}}>
        <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: 40}}>The Sum <i style={{fontWeight: 400}}>of</i> It</div>
        <div style={{fontFamily: MONO, fontSize: 21, letterSpacing: 4, color: pal.sub}}>{r.series.toUpperCase()}</div>
      </div>
      <div style={{position: 'absolute', left: 60, right: 60, top: 118, height: 3, background: pal.cream, opacity: 0.35}} />
      <div style={{position: 'absolute', left: 60, top: 118, height: 3, width: (960 * f) / r.dur, background: pal.gold}} />
      {/* captions */}
      {r.captions.map((c, i) => {
        const v = vis(f, c.from, c.to); if (v <= 0) return null;
        return (
          <div key={i} style={{position: 'absolute', left: 60, right: 60, top: 150, opacity: v}}>
            {c.kicker && <div style={{fontFamily: MONO, fontSize: 24, letterSpacing: 4, color: pal.gold, marginBottom: 14, opacity: sp(c.from)}}>{c.kicker.toUpperCase()}</div>}
            {c.lines.map((l, j) => <div key={j} style={{marginBottom: 10}}><Chip text={l.text} s={sp(l.at)} size={44} pal={pal} /></div>)}
          </div>
        );
      })}
      {/* big statements */}
      {r.bigs.map((b, i) => {
        const v = vis(f, b.from, b.to); if (v <= 0) return null;
        return (
          <div key={i} style={{position: 'absolute', left: 60, right: 60, top: b.y, opacity: v, textAlign: 'center'}}>
            {b.lines.map((l, j) => <div key={j} style={{marginBottom: 16}}><Chip text={l.text} tone={l.tone} size={l.size ?? 84} s={sp(l.at)} strike={l.strike ? interpolate(f, [l.strike, l.strike + 12], [0, 1], clamp) : 0} pal={pal} /></div>)}
          </div>
        );
      })}
      {/* legend and note */}
      <div style={{position: 'absolute', left: 60, top: Y(-5) + 16, display: 'flex', gap: 26, fontFamily: MONO, fontSize: 21, letterSpacing: 2, color: pal.cream}}>
        <span><span style={{display: 'inline-block', width: 20, height: 20, borderRadius: 10, background: col.a, marginRight: 9, verticalAlign: -3}} />{r.teams.a.toUpperCase()}</span>
        <span><span style={{display: 'inline-block', width: 20, height: 20, borderRadius: 10, background: col.b, marginRight: 9, verticalAlign: -3}} />{r.teams.b.toUpperCase()}</span>
      </div>
      <div style={{position: 'absolute', left: 60, right: 200, bottom: 330, fontFamily: MONO, fontSize: 19, lineHeight: 1.45, letterSpacing: 1, color: pal.sub}}>{r.match}<br />{r.note}</div>
    </AbsoluteFill>
  );
};
