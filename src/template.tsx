// Reusable "Money, in data" video template.
// A video is a Recipe: a list of scenes, each with a type, a duration and its content.
// Text supports *accent* words and \n line breaks.
import React from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Thumb, ThumbProps} from './Branding';
import {ACCENT, ALERT, Bug, Kicker, LINE, MONO, MUTED, PANEL, PAPER, Progress, Rise, SceneFade, Stage, useBrandFonts} from './brand';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const H1: React.CSSProperties = {fontSize: 104, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3};
const H2: React.CSSProperties = {fontSize: 74, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2};
const Body: React.CSSProperties = {fontSize: 46, lineHeight: 1.3};
const pad: React.CSSProperties = {padding: '0 90px'};

export const COLORS = {accent: ACCENT, paper: PAPER, alert: ALERT, muted: MUTED};
type ColorName = keyof typeof COLORS;
const col = (c?: ColorName) => COLORS[c ?? 'paper'];

export const money = (n: number, prefix = '$') => prefix + Math.round(n).toLocaleString('en-US');

// "*word*" -> accent colour, "\n" -> line break
export const Rich: React.FC<{text: string; accent?: string}> = ({text, accent = ACCENT}) => (
  <>
    {text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {i > 0 && <br />}
        {line.split(/(\*[^*]+\*)/).map((part, j) =>
          part.startsWith('*') && part.endsWith('*') ? (
            <span key={j} style={{color: accent}}>{part.slice(1, -1)}</span>
          ) : (
            <React.Fragment key={j}>{part}</React.Fragment>
          )
        )}
      </React.Fragment>
    ))}
  </>
);

// ---------- scene content types ----------
export type HookScene = {type: 'hook'; dur: number; kicker: string; lines: string[]; question?: string};
export type PeopleScene = {
  type: 'people'; dur: number; kicker: string; footnote?: string;
  people: {name: string; color?: ColorName; tag: string; note: string; statLabel: string; stat: string}[];
};
export type RaceScene = {
  type: 'race'; dur: number; kicker: string; xLabel: string;
  xStart: number; xEnd: number; xTicks: number[]; yMax: number; yTicks: number[];
  series: {name: string; color?: ColorName; data: Record<string, number>; startAt?: number}[];
  notes?: {at: number; text: string; x: number; yValue: number; color?: ColorName}[];
  marker?: number; // dashed vertical line at this x
  cents?: boolean; // show live values as $4.33 instead of $4
  xTickLabels?: Record<string, string>; // custom x tick text
};
export type RevealScene = {
  type: 'reveal'; dur: number; kicker: string;
  items: {label: string; value: string; color?: ColorName}[]; punch: string;
};
export type BarsScene = {
  type: 'bars'; dur: number; kicker: string; title: string; max: number; body?: string;
  bars: {label: string; color?: ColorName; base: number; extra: number; caption: string}[];
};
export type RankScene = {
  type: 'rank'; dur: number; kicker: string; title?: string; max: number; unit?: string;
  rows: {label: string; value: number; display: string; color?: ColorName}[]; footnote?: string;
};
export type OutroScene = {type: 'outro'; dur: number; lines: string; disclaimer?: string};
export type Scene = (HookScene | PeopleScene | RaceScene | RevealScene | BarsScene | RankScene | OutroScene) & {
  // Optional frame offsets (from the scene start) for when each element appears, in order:
  // hook: lines…, question | people: people…, footnote | race: grow start, grow end
  // reveal: items…, punch | bars: bars…, body | outro: lines, disclaimer
  cues?: number[];
};
// thumb: a still added as the last frames, so it can be picked as the thumbnail in the YouTube/TikTok apps.
// theme: optional palette name for templates that support theming (e.g. sumofit.tsx's SumVideo:
// 'money' default cream/claret, 'rugby' dark pitch-green/gold, 'cricket' ivory/navy).
export type Recipe = {id: string; channel: string; audio?: string; thumb?: ThumbProps; scenes: Scene[]; currency?: string; theme?: 'money' | 'rugby' | 'cricket'};
const THUMB_FRAMES = 20;
const cue = (s: {cues?: number[]}, i: number, fallback: number) => s.cues?.[i] ?? fallback;

export const recipeDuration = (r: Recipe) => r.scenes.reduce((a, s) => a + s.dur, 0) + (r.thumb ? THUMB_FRAMES : 0);

// ---------- scenes ----------
const Hook: React.FC<{s: HookScene}> = ({s}) => (
  <AbsoluteFill style={{...pad, justifyContent: 'center'}}>
    <Rise><Kicker>{s.kicker}</Kicker></Rise>
    {s.lines.map((l, i) => (
      <Rise key={i} at={cue(s, i, 8 + i * 32)}><div style={{...H1, marginTop: 30}}><Rich text={l} /></div></Rise>
    ))}
    {s.question && <Rise at={cue(s, s.lines.length, 8 + s.lines.length * 32 + 20)}><div style={{...Body, color: MUTED, marginTop: 60}}>{s.question}</div></Rise>}
  </AbsoluteFill>
);

const People: React.FC<{s: PeopleScene}> = ({s}) => (
  <AbsoluteFill style={{...pad, paddingTop: 260}}>
    <Kicker>{s.kicker}</Kicker>
    <div style={{marginTop: 50}}>
      {s.people.map((p, i) => (
        <Rise key={p.name} at={cue(s, i, 10 + i * 60)}>
          <div style={{background: PANEL, border: `2px solid ${LINE}`, borderLeft: `14px solid ${col(p.color)}`, borderRadius: 28, padding: '44px 48px', marginBottom: 44}}>
            <div style={{fontSize: 70, fontWeight: 700, color: col(p.color)}}>{p.name}</div>
            <div style={{fontFamily: MONO, fontSize: 36, color: MUTED, marginTop: 8}}>{p.tag}</div>
            <div style={{fontSize: 44, marginTop: 26}}>{p.note}</div>
            <div style={{display: 'flex', alignItems: 'baseline', marginTop: 22}}>
              <div style={{fontFamily: MONO, fontSize: 30, color: MUTED, letterSpacing: 2}}>{p.statLabel}&nbsp;&nbsp;</div>
              <div style={{fontFamily: MONO, fontSize: 56, fontWeight: 700}}>{p.stat}</div>
            </div>
          </div>
        </Rise>
      ))}
    </div>
    {s.footnote && <Rise at={cue(s, s.people.length, 10 + s.people.length * 60 + 30)}><div style={{fontFamily: MONO, fontSize: 36, color: MUTED}}>{s.footnote}</div></Rise>}
  </AbsoluteFill>
);

const CX = 150, CW = 820, CY = 560, CH = 860;
const valAt = (d: Record<string, number>, x: number) => {
  const x0 = Math.floor(x);
  const a = d[String(x0)] ?? 0, b = d[String(x0 + 1)] ?? a;
  return a + (b - a) * (x - x0);
};
const fmtTick = (v: number) => (v >= 1e6 ? `${v / 1e6}m` : v >= 1000 ? `${v / 1000}k` : String(v));

const Race: React.FC<{s: RaceScene}> = ({s}) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [cue(s, 0, 30), cue(s, 1, s.dur - 60)], [s.xStart, s.xEnd], {...clamp, easing: Easing.inOut(Easing.quad)});
  const px = (v: number) => CX + ((v - s.xStart) / (s.xEnd - s.xStart)) * CW;
  const py = (v: number) => CY + CH - (v / s.yMax) * CH;
  const path = (d: Record<string, number>) => {
    const pts: string[] = [];
    for (let k = s.xStart; k <= Math.floor(x); k++) pts.push(`${px(k)},${py(d[String(k)] ?? 0)}`);
    if (x % 1 > 0) pts.push(`${px(x)},${py(valAt(d, x))}`);
    return 'M' + pts.join(' L');
  };
  return (
    <AbsoluteFill>
      <div style={{...pad, paddingTop: 220}}>
        <Kicker>{s.kicker}</Kicker>
        <div style={{display: 'flex', gap: s.series.length > 2 ? 40 : 60, marginTop: 30}}>
          {s.series.map((se) => (
            <div key={se.name}>
              <div style={{fontFamily: MONO, fontSize: 30, color: col(se.color)}}>{se.name.toUpperCase()}</div>
              <div style={{fontFamily: MONO, fontSize: s.series.length > 2 ? 46 : 60, fontWeight: 700, color: col(se.color)}}>{money(valAt(se.data, x))}</div>
            </div>
          ))}
        </div>
      </div>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        {s.yTicks.map((v) => (
          <g key={v}>
            <line x1={CX} x2={CX + CW} y1={py(v)} y2={py(v)} stroke={LINE} strokeWidth={2} />
            <text x={CX - 20} y={py(v) + 10} fill={MUTED} fontFamily="JetBrains Mono" fontSize={26} textAnchor="end">{fmtTick(v)}</text>
          </g>
        ))}
        {s.xTicks.map((t) => (
          <text key={t} x={px(t)} y={CY + CH + 50} fill={MUTED} fontFamily="JetBrains Mono" fontSize={28} textAnchor="middle">{t}</text>
        ))}
        <text x={CX + CW / 2} y={CY + CH + 100} fill={MUTED} fontFamily="JetBrains Mono" fontSize={26} textAnchor="middle">{s.xLabel}</text>
        {s.marker !== undefined && (
          <line x1={px(s.marker)} x2={px(s.marker)} y1={CY} y2={CY + CH} stroke={LINE} strokeWidth={3} strokeDasharray="10 10" opacity={x >= s.marker ? 1 : 0} />
        )}
        {[...s.series].reverse().map((se) => (
          <path key={se.name} d={path(se.data)} fill="none" stroke={col(se.color)} strokeWidth={9} strokeLinejoin="round" strokeLinecap="round" />
        ))}
        {s.series.map((se) =>
          x >= (se.startAt ?? s.xStart) ? <circle key={se.name} cx={px(x)} cy={py(valAt(se.data, x))} r={16} fill={col(se.color)} /> : null
        )}
      </svg>
      {(s.notes ?? []).map((n, i) => (
        <div key={i} style={{position: 'absolute', left: px(n.x), top: py(n.yValue), fontFamily: MONO, fontSize: 30, color: col(n.color ?? 'muted'), whiteSpace: 'pre-line', lineHeight: 1.4,
          opacity: interpolate(x, [n.at, n.at + (s.xEnd - s.xStart) * 0.04], [0, 1], clamp)}}>{n.text}</div>
      ))}
    </AbsoluteFill>
  );
};

const Reveal: React.FC<{s: RevealScene}> = ({s}) => (
  <AbsoluteFill style={{...pad, paddingTop: 280}}>
    <Kicker>{s.kicker}</Kicker>
    {s.items.map((it, i) => (
      <Rise key={i} at={cue(s, i, 8 + i * 32)}>
        <div style={{marginTop: i === 0 ? 50 : 40}}>
          <div style={{fontFamily: MONO, fontSize: 34, color: it.color ? col(it.color) : MUTED}}>{it.label}</div>
          <div style={{fontFamily: MONO, fontSize: 132, fontWeight: 700, color: col(it.color), letterSpacing: -4}}>{it.value}</div>
        </div>
      </Rise>
    ))}
    <Rise at={cue(s, s.items.length, 8 + s.items.length * 32 + 40)}><div style={{...H2, marginTop: 90}}><Rich text={s.punch} /></div></Rise>
  </AbsoluteFill>
);

const Bars: React.FC<{s: BarsScene}> = ({s}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{...pad, paddingTop: 260}}>
      <Kicker>{s.kicker}</Kicker>
      <Rise at={6}><div style={{...H2, marginTop: 24}}><Rich text={s.title} /></div></Rise>
      <div style={{marginTop: 90}}>
        {s.bars.map((b, i) => {
          const at = cue(s, i, 30 + i * 30);
          const g = interpolate(frame, [at, at + 40], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
          const W = 900;
          return (
            <div key={b.label} style={{marginBottom: 70}}>
              <div style={{fontSize: 52, fontWeight: 700, color: col(b.color), marginBottom: 20}}>{b.label}</div>
              <div style={{display: 'flex', height: 90}}>
                <div style={{width: (b.base / s.max) * W * g, background: MUTED, borderRadius: b.extra ? '14px 0 0 14px' : 14}} />
                {b.extra > 0 && <div style={{width: (b.extra / s.max) * W * g, background: col(b.color), borderRadius: '0 14px 14px 0'}} />}
              </div>
              <div style={{fontFamily: MONO, fontSize: 30, color: MUTED, marginTop: 16, opacity: g}}>{b.caption}</div>
            </div>
          );
        })}
      </div>
      {s.body && <Rise at={cue(s, s.bars.length, 30 + s.bars.length * 30 + 50)}><div style={Body}><Rich text={s.body}/></div></Rise>}
    </AbsoluteFill>
  );
};

const Outro: React.FC<{s: OutroScene}> = ({s}) => (
  <AbsoluteFill style={{...pad, justifyContent: 'center'}}>
    <Rise at={cue(s, 0, 0)}><div style={H2}><Rich text={s.lines} /></div></Rise>
    {s.disclaimer && (
      <Rise at={cue(s, 1, 40)}><div style={{fontFamily: MONO, fontSize: 28, color: MUTED, marginTop: 80, lineHeight: 1.5, whiteSpace: 'pre-line'}}>{s.disclaimer}</div></Rise>
    )}
  </AbsoluteFill>
);

const renderScene = (s: Scene) => {
  switch (s.type) {
    case 'hook': return <Hook s={s} />;
    case 'people': return <People s={s} />;
    case 'race': return <Race s={s} />;
    case 'reveal': return <Reveal s={s} />;
    case 'bars': return <Bars s={s} />;
    case 'outro': return <Outro s={s} />;
  }
};

export const RecipeVideo: React.FC<{recipe: Recipe}> = ({recipe}) => {
  useBrandFonts();
  let from = 0;
  return (
    <Stage>
      {recipe.scenes.map((s, i) => {
        const el = (
          <Sequence key={i} from={from} durationInFrames={s.dur}>
            <SceneFade dur={s.dur}>{renderScene(s)}</SceneFade>
          </Sequence>
        );
        from += s.dur;
        return el;
      })}
      {recipe.audio && <Audio src={staticFile(recipe.audio)} />}
      <Progress />
      <Bug text={recipe.channel} />
      {recipe.thumb && (
        <Sequence from={from} durationInFrames={THUMB_FRAMES}><Thumb {...recipe.thumb} /></Sequence>
      )}
    </Stage>
  );
};
