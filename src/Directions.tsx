// Three premium visual directions, shown as stills: thumbnail, hook frame, chart frame.
// Data: the "start at 25 vs 35" story (batch2.data.json).
import React, {useEffect, useState} from 'react';
import {AbsoluteFill, continueRender, delayRender, staticFile} from 'remotion';
import d from './batch2.data.json';

type Theme = {
  name: string; bg: string; bg2: string; ink: string; sub: string; faint: string; line: string;
  a: string; b: string; head: string; num: string; headWeight: number; serif?: boolean; light?: boolean;
};
export const THEMES: Record<string, Theme> = {
  terminal: {name: 'Terminal', bg: '#06080C', bg2: '#0E1219', ink: '#EEF1F5', sub: '#8A93A3', faint: '#1A202B', line: '#232B38',
    a: '#FFB23F', b: '#7FB8FF', head: '"Inter Tight"', num: '"IBM Plex Mono"', headWeight: 700},
  editorial: {name: 'Editorial', bg: '#F2ECE1', bg2: '#E9E1D3', ink: '#141210', sub: '#6E655A', faint: '#DDD3C3', line: '#CFC4B2',
    a: '#A3192E', b: '#1F3A5F', head: 'Fraunces', num: '"DM Mono"', headWeight: 600, serif: true, light: true},
  obsidian: {name: 'Obsidian', bg: '#040506', bg2: '#0C0F10', ink: '#F4F2EC', sub: '#8E938F', faint: '#141818', line: '#1F2524',
    a: '#3DF2B0', b: '#E7C98A', head: 'Manrope', num: 'Manrope', headWeight: 800},
};

const FONTS: [string, string, string, string?][] = [
  ['Inter Tight', 'inter-tight-latin-500-normal.woff2', '500'], ['Inter Tight', 'inter-tight-latin-700-normal.woff2', '700'],
  ['Inter Tight', 'inter-tight-latin-800-normal.woff2', '800'],
  ['IBM Plex Mono', 'ibm-plex-mono-latin-400-normal.woff2', '400'], ['IBM Plex Mono', 'ibm-plex-mono-latin-600-normal.woff2', '600'],
  ['Fraunces', 'fraunces-latin-400-normal.woff2', '400'], ['Fraunces', 'fraunces-latin-600-normal.woff2', '600'],
  ['Fraunces', 'fraunces-latin-400-italic.woff2', '400', 'italic'],
  ['DM Mono', 'dm-mono-latin-400-normal.woff2', '400'], ['DM Mono', 'dm-mono-latin-500-normal.woff2', '500'],
  ['Manrope', 'manrope-latin-500-normal.woff2', '500'], ['Manrope', 'manrope-latin-700-normal.woff2', '700'],
  ['Manrope', 'manrope-latin-800-normal.woff2', '800'],
];
const useFonts = () => {
  const [h] = useState(() => delayRender('fonts'));
  useEffect(() => {
    Promise.all(FONTS.map(([f, file, w, s]) => new FontFace(f, `url(${staticFile(file)})`, {weight: w, style: s ?? 'normal'}).load().then((x) => document.fonts.add(x))))
      .finally(() => continueRender(h));
  }, [h]);
};

const W = 1080, H = 1920;
const maya = d.early.maya as Record<string, number>, leo = d.early.leo as Record<string, number>;
const k = (n: number) => '$' + Math.round(n / 1000) + 'k';
const usd = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

// Background treatment per theme
const Backdrop: React.FC<{t: Theme}> = ({t}) => (
  <AbsoluteFill style={{background: t.bg}}>
    {t.light ? (
      <AbsoluteFill style={{background: `radial-gradient(120% 70% at 50% 0%, #FBF7F0 0%, ${t.bg} 55%, ${t.bg2} 100%)`}} />
    ) : t.name === 'Terminal' ? (
      <>
        <AbsoluteFill style={{backgroundImage: `linear-gradient(${t.faint} 1px, transparent 1px), linear-gradient(90deg, ${t.faint} 1px, transparent 1px)`, backgroundSize: '54px 54px', opacity: 0.55}} />
        <AbsoluteFill style={{background: `radial-gradient(90% 60% at 50% 45%, transparent 0%, ${t.bg} 85%)`}} />
      </>
    ) : (
      <>
        <AbsoluteFill style={{background: `radial-gradient(70% 45% at 85% 20%, ${t.a}22 0%, transparent 70%), radial-gradient(60% 40% at 10% 85%, ${t.b}1A 0%, transparent 70%)`}} />
        <AbsoluteFill style={{background: `radial-gradient(120% 90% at 50% 50%, transparent 40%, #000 100%)`}} />
      </>
    )}
    {/* film grain */}
    <AbsoluteFill style={{opacity: t.light ? 0.08 : 0.06, mixBlendMode: t.light ? 'multiply' : 'screen',
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`}} />
  </AbsoluteFill>
);

const Brand: React.FC<{t: Theme}> = ({t}) => (
  <div style={{position: 'absolute', left: 80, bottom: 90, display: 'flex', alignItems: 'center', gap: 18, fontFamily: t.num, fontSize: 26, letterSpacing: 4, color: t.sub}}>
    <div style={{width: 16, height: 16, borderRadius: t.serif ? 0 : 8, background: t.a}} />
    YOUR CHANNEL NAME
  </div>
);

// Smooth path through points (Catmull-Rom -> Bezier)
const smooth = (pts: [number, number][]) => {
  let s = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2;
    s += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  return s;
};

const Chart: React.FC<{t: Theme; w: number; h: number; labels?: boolean}> = ({t, w, h, labels = true}) => {
  const X = (age: number) => ((age - 25) / 40) * w, Y = (v: number) => h - (v / 300000) * h;
  const ser = (data: Record<string, number>, from: number) => {
    const p: [number, number][] = [];
    for (let a = from; a <= 65; a++) p.push([X(a), Y(data[String(a)])]);
    return p;
  };
  const m = ser(maya, 25), l = ser(leo, 35);
  const area = (p: [number, number][]) => `${smooth(p)} L${p[p.length - 1][0]},${h} L${p[0][0]},${h} Z`;
  const glow = !t.light;
  return (
    <svg width={w} height={h} style={{overflow: 'visible'}}>
      <defs>
        <linearGradient id={`ga${t.name}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={t.a} stopOpacity={t.light ? 0.18 : 0.35} /><stop offset="1" stopColor={t.a} stopOpacity="0" /></linearGradient>
        <linearGradient id={`gb${t.name}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={t.b} stopOpacity={t.light ? 0.12 : 0.22} /><stop offset="1" stopColor={t.b} stopOpacity="0" /></linearGradient>
        <filter id={`gl${t.name}`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="10" /></filter>
      </defs>
      {[0, 100000, 200000, 300000].map((v) => (
        <g key={v}>
          <line x1={0} x2={w} y1={Y(v)} y2={Y(v)} stroke={t.line} strokeWidth={v === 0 ? 2 : 1.5} strokeDasharray={v === 0 || t.serif ? undefined : '4 8'} />
          {labels && v > 0 && <text x={w + 16} y={Y(v) + 9} fill={t.sub} fontFamily={t.num} fontSize={24}>{k(v)}</text>}
        </g>
      ))}
      {[25, 35, 45, 55, 65].map((a) => (
        <text key={a} x={X(a)} y={h + 46} fill={t.sub} fontFamily={t.num} fontSize={24} textAnchor="middle">{a}</text>
      ))}
      <line x1={X(35)} x2={X(35)} y1={0} y2={h} stroke={t.sub} strokeOpacity={0.5} strokeWidth={1.5} strokeDasharray="2 8" />
      <path d={area(l)} fill={`url(#gb${t.name})`} />
      <path d={area(m)} fill={`url(#ga${t.name})`} />
      {glow && <path d={smooth(m)} fill="none" stroke={t.a} strokeWidth={10} opacity={0.55} filter={`url(#gl${t.name})`} />}
      <path d={smooth(l)} fill="none" stroke={t.b} strokeWidth={t.serif ? 4 : 6} strokeLinecap="round" />
      <path d={smooth(m)} fill="none" stroke={t.a} strokeWidth={t.serif ? 5 : 7} strokeLinecap="round" />
      {[[m, t.a], [l, t.b]].map(([p, c], i) => {
        const e = (p as [number, number][])[(p as [number, number][]).length - 1];
        return (
          <g key={i}>
            {glow && <circle cx={e[0]} cy={e[1]} r={26} fill={c as string} opacity={0.25} />}
            <circle cx={e[0]} cy={e[1]} r={11} fill={t.bg} stroke={c as string} strokeWidth={5} />
          </g>
        );
      })}
    </svg>
  );
};

// ---------- 1. Chart frame ----------
export const DirChart: React.FC<{theme: string}> = ({theme}) => {
  useFonts(); const t = THEMES[theme];
  const Card: React.FC<{who: string; c: string; v: number; note: string}> = ({who, c, v, note}) => (
    <div style={{flex: 1, padding: '26px 30px', borderRadius: t.serif ? 0 : 22,
      background: t.light ? 'transparent' : `linear-gradient(160deg, ${t.bg2}EE, ${t.bg}CC)`,
      border: t.light ? 'none' : `1px solid ${t.line}`, borderTop: t.light ? `4px solid ${c}` : `1px solid ${t.line}`,
      boxShadow: t.light ? 'none' : `inset 0 1px 0 #ffffff10, 0 30px 60px #00000060`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, fontFamily: t.num, fontSize: 24, letterSpacing: 3, color: t.sub}}>
        <div style={{width: 12, height: 12, borderRadius: 6, background: c, boxShadow: t.light ? 'none' : `0 0 16px ${c}`}} />{who}
      </div>
      <div style={{fontFamily: t.num, fontSize: 68, fontWeight: t.name === 'Obsidian' ? 800 : 500, color: c, marginTop: 10, letterSpacing: -2,
        fontVariantNumeric: 'tabular-nums'}}>{usd(v)}</div>
      <div style={{fontFamily: t.head, fontSize: 26, color: t.sub, marginTop: 4}}>{note}</div>
    </div>
  );
  return (
    <AbsoluteFill style={{color: t.ink}}>
      <Backdrop t={t} />
      <div style={{position: 'absolute', left: 80, right: 80, top: 210}}>
        <div style={{fontFamily: t.num, fontSize: 26, letterSpacing: 6, color: t.a}}>THE RACE · $200 A MONTH</div>
        <div style={{fontFamily: t.head, fontWeight: t.headWeight, fontSize: t.serif ? 86 : 80, lineHeight: 1.04, letterSpacing: t.serif ? -1.5 : -3, marginTop: 22}}>
          Maya stops at 35.{' '}{t.serif ? <i style={{fontWeight: 400, color: t.a}}>Leo never catches up.</i> : <span style={{color: t.a}}>Leo never catches up.</span>}
        </div>
        <div style={{display: 'flex', gap: 22, marginTop: 46}}>
          <Card who="MAYA · 25–35" c={t.a} v={maya['65']} note="put in $24,000" />
          <Card who="LEO · 35–65" c={t.b} v={leo['65']} note="put in $72,000" />
        </div>
      </div>
      <div style={{position: 'absolute', left: 80, top: 960}}><Chart t={t} w={820} h={640} /></div>
      <div style={{position: 'absolute', left: 80, top: 1690, fontFamily: t.num, fontSize: 22, color: t.sub, letterSpacing: 1}}>AGE · 7% A YEAR, COMPOUNDED MONTHLY</div>
      <Brand t={t} />
    </AbsoluteFill>
  );
};

// ---------- 2. Hook frame ----------
export const DirHook: React.FC<{theme: string}> = ({theme}) => {
  useFonts(); const t = THEMES[theme];
  return (
    <AbsoluteFill style={{color: t.ink}}>
      <Backdrop t={t} />
      <div style={{position: 'absolute', left: 80, right: 80, top: 520}}>
        <div style={{fontFamily: t.num, fontSize: 28, letterSpacing: 6, color: t.a}}>SAME $200 A MONTH</div>
        <div style={{fontFamily: t.head, fontWeight: t.headWeight, fontSize: t.serif ? 150 : 140, lineHeight: 0.98, letterSpacing: t.serif ? -3 : -6, marginTop: 34}}>
          {t.serif ? <>Save for <i style={{fontWeight: 400, color: t.a}}>10</i> years.</> : <>Save for <span style={{color: t.a}}>10</span> years.</>}
        </div>
        <div style={{fontFamily: t.head, fontWeight: t.headWeight, fontSize: t.serif ? 150 : 140, lineHeight: 0.98, letterSpacing: t.serif ? -3 : -6, marginTop: 30, color: t.sub}}>
          Or for 30.
        </div>
        <div style={{height: 2, width: 160, background: t.a, marginTop: 70}} />
        <div style={{fontFamily: t.head, fontSize: 52, marginTop: 40, fontWeight: 500, fontStyle: t.serif ? 'italic' : 'normal'}}>Who ends up richer?</div>
      </div>
      <Brand t={t} />
    </AbsoluteFill>
  );
};

// ---------- 3. Thumbnail ----------
export const DirThumb: React.FC<{theme: string}> = ({theme}) => {
  useFonts(); const t = THEMES[theme];
  return (
    <AbsoluteFill style={{color: t.ink}}>
      <Backdrop t={t} />
      <div style={{position: 'absolute', left: 70, right: 70, top: 300, textAlign: 'left'}}>
        <div style={{fontFamily: t.num, fontSize: 40, letterSpacing: 8, color: t.sub}}>INVEST $200/MONTH</div>
        <div style={{fontFamily: t.head, fontWeight: t.headWeight, fontSize: t.serif ? 190 : 176, lineHeight: 0.92, letterSpacing: t.serif ? -4 : -8, marginTop: 30}}>
          10 years{' '}
          {t.serif ? <i style={{fontWeight: 400, color: t.a}}>beat</i> : <span style={{color: t.a}}>beat</span>}
          {' '}30.
        </div>
      </div>
      <div style={{position: 'absolute', left: 70, right: 70, top: 1000, display: 'flex', flexDirection: 'column', gap: 30}}>
        {[{who: 'STARTED AT 25', v: maya['65'], c: t.a, w: 1}, {who: 'STARTED AT 35', v: leo['65'], c: t.b, w: leo['65'] / maya['65']}].map((r) => (
          <div key={r.who}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: t.num, fontSize: 34, letterSpacing: 3, color: t.sub}}>
              <span>{r.who}</span><span style={{color: r.c, fontSize: 64, fontWeight: 600, letterSpacing: -1}}>{k(r.v)}</span>
            </div>
            <div style={{height: 44, marginTop: 10, width: `${r.w * 100}%`, background: r.c, borderRadius: t.serif ? 0 : 22,
              boxShadow: t.light ? 'none' : `0 0 50px ${r.c}66`}} />
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', left: 70, top: 1440, opacity: 0.9}}><Chart t={t} w={940} h={250} labels={false} /></div>
    </AbsoluteFill>
  );
};
