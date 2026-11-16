// "The Sum of It" — editorial video template. Same Recipe format as template.tsx, new look.
// Cream paper, ink type, claret accent, navy second series. Fraunces (headlines), DM Mono (data).
import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, continueRender, delayRender, Easing, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import type {BarsScene, HookScene, OutroScene, PeopleScene, RaceScene, RankScene, Recipe, RevealScene, Scene} from './template';

export const CHANNEL = 'The Sum of It';
export const HANDLE = '@thesumofit';

// ---------- palette ----------
export const P = {
  paper: '#F3EDE2', paper2: '#E8DFCF', hi: '#FBF8F2',
  ink: '#16130F', sub: '#6F665B', faint: '#DCD2C1', rule: '#C9BDA9',
  claret: '#A3192E', navy: '#1F3A5F', ochre: '#B8641B', stone: '#9A8F80',
};
const COL = {accent: P.claret, paper: P.navy, alert: P.ochre, muted: P.stone} as const;
type CName = keyof typeof COL;
const col = (c?: CName) => COL[c ?? 'paper'];
export const SERIF = 'Fraunces, Georgia, serif';
export const MONO = '"DM Mono", monospace';

const FONTS: [string, string, string, string?][] = [
  ['Fraunces', 'fraunces-latin-400-normal.woff2', '400'], ['Fraunces', 'fraunces-latin-600-normal.woff2', '600'],
  ['Fraunces', 'fraunces-latin-700-normal.woff2', '700'], ['Fraunces', 'fraunces-latin-400-italic.woff2', '400', 'italic'],
  ['DM Mono', 'dm-mono-latin-400-normal.woff2', '400'], ['DM Mono', 'dm-mono-latin-500-normal.woff2', '500'],
];
export const useFonts = () => {
  const [h] = useState(() => delayRender('fonts'));
  useEffect(() => {
    Promise.all(FONTS.map(([f, file, w, s]) => new FontFace(f, `url(${staticFile(file)})`, {weight: w, style: s ?? 'normal'}).load().then((x) => document.fonts.add(x))))
      .catch((e) => console.error(e)).finally(() => continueRender(h));
  }, [h]);
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const cue = (s: {cues?: number[]}, i: number, fb: number) => s.cues?.[i] ?? fb;
let CUR = '$';
const usd = (n: number) => CUR + Math.round(n).toLocaleString('en-US');

// *word* -> italic claret, \n -> line break
export const Rich: React.FC<{text: string; accent?: string}> = ({text, accent = P.claret}) => (
  <>
    {text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {i > 0 && <br />}
        {line.split(/(\*[^*]+\*)/).map((part, j) =>
          part.startsWith('*') && part.endsWith('*')
            ? <i key={j} style={{color: accent, fontWeight: 400}}>{part.slice(1, -1)}</i>
            : <React.Fragment key={j}>{part}</React.Fragment>)}
      </React.Fragment>
    ))}
  </>
);

// ---------- motion helpers ----------
export const In: React.FC<{at?: number; children: React.ReactNode; style?: React.CSSProperties; y?: number}> = ({at = 0, children, style, y = 40}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const s = spring({frame: f - at, fps, config: {damping: 200, mass: 0.9}});
  return <div style={{opacity: s, transform: `translateY(${(1 - s) * y}px)`, ...style}}>{children}</div>;
};
// headline revealed line by line behind a mask
export const Lines: React.FC<{text: string; at: number; style: React.CSSProperties; step?: number}> = ({text, at, style, step = 5}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  return (
    <div style={style}>
      {text.split('\n').map((ln, i) => {
        const s = spring({frame: f - at - i * step, fps, config: {damping: 200}});
        return (
          <div key={i} style={{overflow: 'hidden', paddingBottom: '0.08em', marginBottom: '-0.08em'}}>
            <div style={{transform: `translateY(${(1 - s) * 105}%)`}}><Rich text={ln} /></div>
          </div>
        );
      })}
    </div>
  );
};
// count-up number
export const Count: React.FC<{value: string; at: number; dur?: number}> = ({value, at, dur = 32}) => {
  const f = useCurrentFrame();
  const m = value.match(/^([^0-9]*)([\d,.]+)(.*)$/);
  if (!m) return <>{value}</>;
  const target = parseFloat(m[2].replace(/,/g, '')); const dec = (m[2].split('.')[1] ?? '').length;
  const t = interpolate(f, [at, at + dur], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const v = target * t;
  const txt = dec ? v.toLocaleString('en-US', {minimumFractionDigits: dec, maximumFractionDigits: dec}) : Math.round(v).toLocaleString('en-US', {useGrouping: m[2].includes(',')});
  return <>{m[1]}{txt}{m[3]}</>;
};
export const Rule: React.FC<{at?: number; color?: string; w?: number; h?: number; style?: React.CSSProperties}> = ({at = 0, color = P.ink, w = 920, h = 2, style}) => {
  const f = useCurrentFrame();
  const g = interpolate(f, [at, at + 22], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  return <div style={{height: h, width: w * g, background: color, ...style}} />;
};
export const Kicker: React.FC<{children: React.ReactNode; at?: number}> = ({children, at = 0}) => (
  <In at={at} y={16}>
    <div style={{display: 'flex', alignItems: 'center', gap: 20, fontFamily: MONO, fontSize: 30, letterSpacing: 7, color: P.claret, textTransform: 'uppercase'}}>
      <div style={{width: 46, height: 3, background: P.claret}} />{children}
    </div>
  </In>
);

// ---------- frame furniture ----------
export const Paper: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{background: P.paper, color: P.ink, fontFamily: SERIF}}>
    <AbsoluteFill style={{background: `radial-gradient(110% 60% at 50% 0%, ${P.hi} 0%, ${P.paper} 55%, ${P.paper2} 100%)`}} />
    <AbsoluteFill style={{opacity: 0.05, backgroundImage: `url(${staticFile('grain.png')})`, backgroundSize: '512px 512px'}} />
    {children}
  </AbsoluteFill>
);

// accounting "total" mark: a single rule above, a double rule below
export const Mark: React.FC<{size?: number; color?: string}> = ({size = 60, color = P.claret}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x="12" y="20" width="76" height="7" fill={color} />
    <path d="M70 36 H30 L50 52 L30 68 H70" fill="none" stroke={color} strokeWidth="7" strokeLinejoin="miter" />
    <rect x="12" y="76" width="76" height="5" fill={color} /><rect x="12" y="86" width="76" height="5" fill={color} />
  </svg>
);

const Masthead: React.FC<{series?: string}> = ({series}) => {
  const f = useCurrentFrame(); const {durationInFrames} = useVideoConfig();
  return (
    <div style={{position: 'absolute', left: 80, right: 80, top: 120}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <div style={{fontFamily: SERIF, fontSize: 40, fontWeight: 600, letterSpacing: -0.5}}>The Sum <i style={{fontWeight: 400}}>of</i> It</div>
        <div style={{fontFamily: MONO, fontSize: 22, letterSpacing: 4, color: P.sub}}>{(series ?? 'MONEY, RUN THROUGH THE NUMBERS').toUpperCase()}</div>
      </div>
      <div style={{height: 2, background: P.ink, marginTop: 18}} />
      <div style={{height: 6, background: P.faint, marginTop: 6, position: 'relative'}}>
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(f / durationInFrames) * 100}%`, background: P.claret}} />
      </div>
    </div>
  );
};

// ---------- scenes ----------
const PAD: React.CSSProperties = {position: 'absolute', left: 80, right: 80};
const H1: React.CSSProperties = {fontFamily: SERIF, fontWeight: 600, fontSize: 132, lineHeight: 0.98, letterSpacing: -3.5};
const H2: React.CSSProperties = {fontFamily: SERIF, fontWeight: 600, fontSize: 84, lineHeight: 1.04, letterSpacing: -2};

const Hook: React.FC<{s: HookScene}> = ({s}) => (
  <div style={{...PAD, top: 470}}>
    <Kicker>{s.kicker}</Kicker>
    {s.lines.map((l, i) => (
      <Lines key={i} text={l} at={i === 0 ? Math.min(cue(s, 0, 8), 14) : cue(s, i, 8 + i * 30)} style={{...H1, marginTop: i ? 36 : 44, color: i > 0 && s.lines.length > 1 && !l.includes('*') ? P.ink : P.ink}} />
    ))}
    {s.question && (
      <div style={{marginTop: 80}}>
        <Rule at={cue(s, s.lines.length, 70) - 6} color={P.claret} w={160} h={4} />
        <In at={cue(s, s.lines.length, 70)}><div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 58, marginTop: 34, color: P.ink}}>{s.question}</div></In>
      </div>
    )}
  </div>
);

const People: React.FC<{s: PeopleScene}> = ({s}) => {
  const three = s.people.length > 2;
  return (
    <div style={{...PAD, top: 330}}>
      <Kicker>{s.kicker}</Kicker>
      <div style={{marginTop: 46}}>
        {s.people.map((p, i) => (
          <In key={p.name} at={i === 0 ? Math.min(cue(s, 0, 10), 24) : cue(s, i, 10 + i * 50)} y={50}>
            <div style={{marginBottom: three ? 40 : 60}}>
              <Rule at={i === 0 ? Math.min(cue(s, 0, 10), 24) : cue(s, i, 10 + i * 50)} color={col(p.color)} h={5} />
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 22}}>
                <div style={{fontFamily: SERIF, fontWeight: 600, fontSize: three ? 76 : 92, letterSpacing: -2, color: col(p.color)}}>{p.name}</div>
                <div style={{fontFamily: MONO, fontSize: 26, letterSpacing: 3, color: P.sub}}>{p.tag}</div>
              </div>
              <div style={{fontFamily: SERIF, fontSize: three ? 40 : 46, lineHeight: 1.3, marginTop: 10, color: P.ink}}>{p.note}</div>
              <div style={{display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 18}}>
                <div style={{fontFamily: MONO, fontSize: 26, letterSpacing: 3, color: P.sub}}>{p.statLabel}</div>
                <div style={{flex: 1, borderBottom: `3px dotted ${P.rule}`, transform: 'translateY(-8px)'}} />
                <div style={{fontFamily: MONO, fontSize: three ? 50 : 60, fontWeight: 500, color: P.ink}}>{p.stat}</div>
              </div>
            </div>
          </In>
        ))}
      </div>
      {s.footnote && <In at={cue(s, s.people.length, 200)}><div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 40, color: P.sub}}>{s.footnote}</div></In>}
    </div>
  );
};

// smooth path through points
export const smooth = (pts: [number, number][]) => {
  if (pts.length < 2) return pts.length ? `M${pts[0][0]},${pts[0][1]}` : '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2;
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  return d;
};
export const valAt = (d: Record<string, number>, x: number) => {
  const x0 = Math.floor(x); const a = d[String(x0)] ?? 0, b = d[String(x0 + 1)] ?? a;
  return a + (b - a) * (x - x0);
};
const tick = (v: number) => (v >= 1e6 ? `${CUR}${+(v / 1e6).toFixed(1)}m` : v >= 1000 ? `${CUR}${v / 1000}k` : `${CUR}${v}`);

const Race: React.FC<{s: RaceScene}> = ({s}) => {
  const f = useCurrentFrame();
  const x = interpolate(f, [cue(s, 0, 30), cue(s, 1, s.dur - 60)], [s.xStart, s.xEnd], {...clamp, easing: Easing.inOut(Easing.quad)});
  const CX = 80, CW = 800, CY = 860, CH = 700;
  const px = (v: number) => CX + ((v - s.xStart) / (s.xEnd - s.xStart)) * CW;
  const py = (v: number) => CY + CH - (Math.min(v, s.yMax * 1.02) / s.yMax) * CH;
  const pts = (d: Record<string, number>, from: number) => {
    const out: [number, number][] = [];
    const step = (s.xEnd - s.xStart) > 60 ? 1 : 1;
    for (let k = Math.ceil(from); k <= Math.floor(x); k += step) out.push([px(k), py(d[String(k)] ?? 0)]);
    if (x % 1 > 0 && x > from) out.push([px(x), py(valAt(d, x))]);
    return out;
  };
  const many = s.series.length > 2;
  const grid = interpolate(f, [0, 20], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <div style={{...PAD, top: 330}}>
        <Kicker>{s.kicker}</Kicker>
        <div style={{display: 'flex', gap: many ? 36 : 60, marginTop: 34}}>
          {s.series.map((se) => (
            <div key={se.name} style={{borderTop: `4px solid ${col(se.color)}`, paddingTop: 14, flex: 1}}>
              <div style={{fontFamily: MONO, fontSize: 24, letterSpacing: 3, color: P.sub}}>{se.name.toUpperCase()}</div>
              <div style={{fontFamily: MONO, fontSize: many ? 44 : 62, fontWeight: 500, color: col(se.color), letterSpacing: -1, marginTop: 4}}>{s.cents ? '$' + valAt(se.data, x).toFixed(2) : usd(valAt(se.data, x))}</div>
            </div>
          ))}
        </div>
      </div>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        <defs>
          <clipPath id="plot"><rect x={CX - 20} y={CY - 40} width={CW + 40} height={CH + 40} /></clipPath>
          {s.series.map((se, i) => (
            <linearGradient key={i} id={`fill${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={col(se.color)} stopOpacity={0.16} /><stop offset="1" stopColor={col(se.color)} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <g opacity={grid}>
          {s.yTicks.map((v) => (
            <g key={v}>
              <line x1={CX} x2={CX + CW} y1={py(v)} y2={py(v)} stroke={v === 0 ? P.ink : P.rule} strokeWidth={v === 0 ? 2.5 : 1.5} />
              {v > 0 && <text x={CX + CW + 14} y={py(v) + 9} fill={P.sub} fontFamily="DM Mono" fontSize={24}>{s.cents ? `$${v}` : tick(v)}</text>}
            </g>
          ))}
          {s.xTicks.map((t) => (
            <text key={t} x={px(t)} y={CY + CH + 46} fill={P.sub} fontFamily="DM Mono" fontSize={26} textAnchor="middle">{s.xTickLabels?.[String(t)] ?? t}</text>
          ))}
          <text x={CX} y={CY + CH + 100} fill={P.sub} fontFamily="DM Mono" fontSize={24} letterSpacing={3}>{s.xLabel}</text>
        </g>
        {s.marker !== undefined && x >= s.marker && (
          <line x1={px(s.marker)} x2={px(s.marker)} y1={CY - 20} y2={CY + CH} stroke={P.ink} strokeOpacity={0.45} strokeWidth={2} strokeDasharray="3 9" />
        )}
        {[...s.series].map((se, i) => ({se, i})).reverse().map(({se, i}) => {
          const p = pts(se.data, se.startAt ?? s.xStart);
          if (p.length < 2) return null;
          return (
            <g key={se.name} clipPath="url(#plot)">
              <path d={`${smooth(p)} L${p[p.length - 1][0]},${CY + CH} L${p[0][0]},${CY + CH} Z`} fill={`url(#fill${i})`} />
              <path d={smooth(p)} fill="none" stroke={col(se.color)} strokeWidth={i === 0 ? 7 : 5.5} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          );
        })}
        {s.series.map((se) => x > (se.startAt ?? s.xStart) ? (
          <g key={se.name}>
            <circle cx={px(x)} cy={py(valAt(se.data, x))} r={22} fill={col(se.color)} opacity={0.15} />
            <circle cx={px(x)} cy={py(valAt(se.data, x))} r={11} fill={P.paper} stroke={col(se.color)} strokeWidth={5} />
          </g>
        ) : null)}
      </svg>
      {(s.notes ?? []).map((n, i) => {
        const o = interpolate(x, [n.at, n.at + (s.xEnd - s.xStart) * 0.04], [0, 1], clamp);
        return (
          <div key={i} style={{position: 'absolute', left: px(n.x), top: py(n.yValue), opacity: o, transform: `translateY(${(1 - o) * 14}px)`,
            fontFamily: SERIF, fontStyle: 'italic', fontSize: 38, lineHeight: 1.2, whiteSpace: 'pre-line', color: n.color && n.color !== 'muted' ? col(n.color) : P.sub,
            borderLeft: `3px solid ${n.color && n.color !== 'muted' ? col(n.color) : P.rule}`, paddingLeft: 16}}>{n.text}</div>
        );
      })}
    </AbsoluteFill>
  );
};

const Reveal: React.FC<{s: RevealScene}> = ({s}) => {
  const many = s.items.length > 2;
  return (
    <div style={{...PAD, top: 380}}>
      <Kicker>{s.kicker}</Kicker>
      {s.items.map((it, i) => {
        const at = cue(s, i, 8 + i * 32);
        return (
          <In key={i} at={at} y={30}>
            <div style={{marginTop: i === 0 ? 50 : many ? 30 : 46}}>
              <div style={{fontFamily: MONO, fontSize: 28, letterSpacing: 3, color: P.sub}}>{it.label}</div>
              <div style={{fontFamily: SERIF, fontWeight: 600, fontSize: many ? 124 : 150, letterSpacing: -4, lineHeight: 1.02, color: col(it.color), fontVariantNumeric: 'tabular-nums lining-nums'}}>
                <Count value={it.value} at={at} />
              </div>
              <Rule at={at + 6} color={P.rule} h={2} />
            </div>
          </In>
        );
      })}
      <Lines text={s.punch} at={cue(s, s.items.length, 120)} style={{...H2, marginTop: 70}} />
    </div>
  );
};

// ranked horizontal bars, rows sweep in one after another (cues: start, footnote)
const Rank: React.FC<{s: RankScene}> = ({s}) => {
  const f = useCurrentFrame();
  const start = cue(s, 0, 20); const step = Math.max(5, Math.min(14, Math.floor((s.dur - start - 90) / s.rows.length)));
  const W = 470;
  return (
    <div style={{...PAD, top: 330}}>
      <Kicker>{s.kicker}</Kicker>
      {s.title && <Lines text={s.title} at={6} style={{...H2, fontSize: 64, marginTop: 24}} />}
      <div style={{marginTop: 44}}>
        {s.rows.map((r, i) => {
          const per = (s.cues?.length ?? 0) === s.rows.length + 1;
          const at = per ? s.cues![i] : start + i * step;
          const g = interpolate(f, [at, at + 24], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
          return (
            <div key={r.label} style={{display: 'flex', alignItems: 'center', height: 70, opacity: Math.min(1, g * 2), borderBottom: `1.5px solid ${P.faint}`}}>
              <div style={{width: 300, whiteSpace: 'nowrap', fontFamily: SERIF, fontWeight: 600, fontSize: 34, color: P.ink}}>{r.label}</div>
              <div style={{width: (r.value / s.max) * W * g, height: 30, background: col(r.color)}} />
              <div style={{marginLeft: 16, fontFamily: MONO, fontWeight: 500, fontSize: 32, color: col(r.color)}}>{r.display}</div>
            </div>
          );
        })}
      </div>
      {s.footnote && <In at={(s.cues?.length ?? 0) === s.rows.length + 1 ? s.cues![s.rows.length] : cue(s, 1, start + s.rows.length * step + 20)}><div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 40, color: P.sub, marginTop: 40, whiteSpace: 'pre-line'}}><Rich text={s.footnote} /></div></In>}
    </div>
  );
};
const Bars: React.FC<{s: BarsScene}> = ({s}) => {
  const f = useCurrentFrame();
  const W = 920;
  return (
    <div style={{...PAD, top: 360}}>
      <Kicker>{s.kicker}</Kicker>
      <Lines text={s.title} at={6} style={{...H2, marginTop: 30}} />
      <div style={{marginTop: 80}}>
        {s.bars.map((b, i) => {
          const at = cue(s, i, 30 + i * 30);
          const g = interpolate(f, [at, at + 40], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
          return (
            <div key={b.label} style={{marginBottom: 64}}>
              <div style={{fontFamily: SERIF, fontWeight: 600, fontSize: 56, color: col(b.color), marginBottom: 16}}>{b.label}</div>
              <div style={{display: 'flex', height: 72}}>
                <div style={{width: (b.base / s.max) * W * g, background: `repeating-linear-gradient(135deg, ${P.stone} 0 3px, transparent 3px 12px)`, border: `2px solid ${P.stone}`, boxSizing: 'border-box'}} />
                {b.extra > 0 && <div style={{width: (b.extra / s.max) * W * g, background: col(b.color)}} />}
              </div>
              <div style={{fontFamily: MONO, fontSize: 28, color: P.sub, marginTop: 14, opacity: g}}>{b.caption}</div>
            </div>
          );
        })}
        {s.bars.some((b) => b.base > 0) && <In at={cue(s, 0, 30) + 20}>
          <div style={{display: 'flex', gap: 40, fontFamily: MONO, fontSize: 24, letterSpacing: 2, color: P.sub, marginTop: -20}}>
            <span style={{display: 'flex', alignItems: 'center', gap: 12}}><span style={{width: 28, height: 18, background: `repeating-linear-gradient(135deg, ${P.stone} 0 3px, transparent 3px 8px)`, border: `2px solid ${P.stone}`}} />PUT IN / OWED</span>
            <span style={{display: 'flex', alignItems: 'center', gap: 12}}><span style={{width: 28, height: 18, background: P.ink}} />GROWTH / INTEREST</span>
          </div>
        </In>}
      </div>
      {s.body && <Lines text={s.body} at={cue(s, s.bars.length, 150)} style={{fontFamily: SERIF, fontSize: 52, lineHeight: 1.25, marginTop: 70}} />}
    </div>
  );
};

const Outro: React.FC<{s: OutroScene}> = ({s}) => {
  const f = useCurrentFrame();
  const sign = interpolate(f, [s.dur - 70, s.dur - 50], [0, 1], clamp);
  return (
    <>
      <div style={{...PAD, top: 560}}>
        <Lines text={s.lines} at={cue(s, 0, 0)} style={{...H2, fontSize: 80}} />
        {s.disclaimer && <In at={cue(s, 1, 40)}><div style={{fontFamily: MONO, fontSize: 25, color: P.sub, marginTop: 70, lineHeight: 1.55, whiteSpace: 'pre-line'}}>{s.disclaimer}</div></In>}
      </div>
      <div style={{position: 'absolute', left: 80, right: 80, bottom: 200, opacity: sign, transform: `translateY(${(1 - sign) * 20}px)`}}>
        <div style={{height: 2, background: P.ink}} />
        <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 26}}>
          <Mark size={78} />
          <div>
            <div style={{fontFamily: SERIF, fontWeight: 600, fontSize: 52, letterSpacing: -1}}>That's the sum <i style={{fontWeight: 400, color: P.claret}}>of it.</i></div>
            <div style={{fontFamily: MONO, fontSize: 24, letterSpacing: 3, color: P.sub, marginTop: 4}}>FOLLOW {HANDLE.toUpperCase()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

const renderScene = (s: Scene) => {
  switch (s.type) {
    case 'hook': return <Hook s={s} />;
    case 'people': return <People s={s} />;
    case 'race': return <Race s={s} />;
    case 'reveal': return <Reveal s={s} />;
    case 'bars': return <Bars s={s} />;
    case 'rank': return <Rank s={s} />;
    case 'outro': return <Outro s={s} />;
  }
};

// scene transition: quick fade with a slight lift
const Scene_: React.FC<{dur: number; children: React.ReactNode}> = ({dur, children}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 7, dur - 7, dur], [0, 1, 1, 0], clamp);
  const y = interpolate(f, [dur - 7, dur], [0, -24], clamp);
  return <AbsoluteFill style={{opacity: o, transform: `translateY(${y}px)`}}>{children}</AbsoluteFill>;
};

export type SumRecipe = Recipe & {series?: string};
const THUMB_FRAMES = 20;
export const sumDuration = (r: Recipe) => r.scenes.reduce((a, s) => a + s.dur, 0) + (r.thumb ? THUMB_FRAMES : 0);

export const SumVideo: React.FC<{recipe: SumRecipe}> = ({recipe}) => {
  useFonts();
  CUR = recipe.currency ?? '$';
  let from = 0;
  return (
    <Paper>
      {recipe.scenes.map((s, i) => {
        const el = <Sequence key={i} from={from} durationInFrames={s.dur}><Scene_ dur={s.dur}>{renderScene(s)}</Scene_></Sequence>;
        from += s.dur; return el;
      })}
      <Masthead series={recipe.series} />
      {recipe.audio && <Audio src={staticFile(recipe.audio)} />}
      {recipe.thumb && <Sequence from={from} durationInFrames={THUMB_FRAMES}><SumThumb {...recipe.thumb} series={recipe.series} /></Sequence>}
    </Paper>
  );
};

// ---------- thumbnail (1080x1920; key content in the centre band) ----------
export const SumThumb: React.FC<{kicker: string; from: string; to: string; foot: string; link?: string; series?: string}> = ({kicker, from, to, foot, link = 'becomes'}) => {
  useFonts();
  return (
    <Paper>
      <div style={{position: 'absolute', left: 80, right: 80, top: 140, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontFamily: SERIF, fontSize: 44, fontWeight: 600}}>The Sum <i style={{fontWeight: 400}}>of</i> It</div>
        <Mark size={70} />
      </div>
      <div style={{position: 'absolute', left: 80, right: 80, top: 236, height: 2, background: P.ink}} />
      <div style={{position: 'absolute', left: 80, right: 80, top: 420}}>
        <div style={{fontFamily: MONO, fontSize: 40, letterSpacing: 8, color: P.claret}}>{kicker}</div>
        <div style={{fontFamily: SERIF, fontWeight: 600, fontSize: Math.min(170, 1500 / Math.max(from.length, 1)), letterSpacing: -5, lineHeight: 1, marginTop: 40, whiteSpace: 'nowrap'}}>{from}</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 24, margin: '46px 0 30px'}}>
          <div style={{height: 3, width: 120, background: P.ink}} />
          <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 64, color: P.sub}}>{link}</div>
        </div>
        <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: Math.min(210, 1480 / Math.max(to.length, 1)), letterSpacing: -6, lineHeight: 1, color: P.claret, whiteSpace: 'nowrap'}}>{to}</div>
        <div style={{marginTop: 30}}>
          <div style={{height: 5, width: '100%', background: P.claret}} />
          <div style={{height: 5, width: '100%', background: P.claret, marginTop: 8}} />
        </div>
        <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 66, marginTop: 40, color: P.ink}}>{foot}</div>
      </div>
    </Paper>
  );
};

// ---------- channel art ----------
export const SumAvatar: React.FC = () => {
  useFonts();
  return (
    <AbsoluteFill style={{background: P.claret, alignItems: 'center', justifyContent: 'center'}}>
      <div style={{width: 520, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{height: 22, width: 420, background: P.paper}} />
        <div style={{fontFamily: SERIF, fontWeight: 600, fontSize: 300, color: P.paper, lineHeight: 1.05, letterSpacing: -10}}>S<i style={{fontWeight: 400}}>o</i>I</div>
        <div style={{height: 16, width: 420, background: P.paper}} />
        <div style={{height: 16, width: 420, background: P.paper, marginTop: 14}} />
      </div>
    </AbsoluteFill>
  );
};
export const SumBanner: React.FC = () => {
  useFonts();
  return (
    <Paper>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div style={{width: 1546, height: 423, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 50}}>
            <Mark size={200} />
            <div>
              <div style={{fontFamily: SERIF, fontWeight: 600, fontSize: 150, letterSpacing: -4, lineHeight: 1}}>The Sum <i style={{fontWeight: 400, color: P.claret}}>of</i> It</div>
              <div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 50, color: P.sub, marginTop: 20}}>Everyday money decisions, run through the numbers.</div>
            </div>
          </div>
          <div style={{height: 3, background: P.ink, marginTop: 40}} />
          <div style={{fontFamily: MONO, fontSize: 34, letterSpacing: 6, color: P.claret, marginTop: 20}}>NEW CHARTS EVERY MON · WED · FRI</div>
        </div>
      </AbsoluteFill>
    </Paper>
  );
};
