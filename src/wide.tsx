// "The Sum of It" — 16:9 long-form template (1920x1080). Same paper look as the Shorts, laid out wide.
// Scene cues are frame offsets from the scene start (see each scene for what they trigger).
import React from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {P, SERIF, MONO, useFonts, Rich, Mark, In, Lines, Count, Rule, Kicker, Paper, smooth, valAt, HANDLE} from './sumofit';

type C = 'accent' | 'paper' | 'alert' | 'muted';
const COL = {accent: P.claret, paper: P.navy, alert: P.ochre, muted: P.stone} as const;
const col = (c?: C) => COL[c ?? 'paper'];
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const cue = (s: {cues?: number[]}, i: number, fb: number) => s.cues?.[i] ?? fb;
const usd = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
const tick = (v: number) => (v >= 1e6 ? `$${+(v / 1e6).toFixed(1)}m` : v >= 1000 ? `$${v / 1000}k` : `$${v}`);

export type WHook = {type: 'hook'; kicker: string; lines: string[]; question?: string};
export type WChapter = {type: 'chapter'; n: string; title: string; sub?: string};
export type WPeople = {type: 'people'; kicker: string; footnote?: string; people: {name: string; color?: C; tag: string; note: string; statLabel: string; stat: string}[]};
export type WRace = {type: 'race'; kicker: string; xLabel: string; xStart: number; xEnd: number; xTicks: number[]; yMax: number; yTicks: number[];
  series: {name: string; color?: C; data: Record<string, number>; startAt?: number; cents?: boolean}[];
  notes?: {at: number; text: string; x: number; yValue: number; color?: C; dy?: number}[]; marker?: number; xTickLabels?: Record<string, string>};
export type WReveal = {type: 'reveal'; kicker: string; items: {label: string; value: string; color?: C}[]; punch: string};
export type WRank = {type: 'rank'; kicker: string; title?: string; max: number; rows: {label: string; value: number; display: string; color?: C}[]; footnote?: string};
export type WList = {type: 'list'; kicker: string; items: string[]};
export type WOutro = {type: 'outro'; lines: string; disclaimer?: string};
export type WBody = WHook | WChapter | WPeople | WRace | WReveal | WRank | WList | WOutro;
export type WScene = WBody & {dur: number; cues?: number[]};
export type WideRecipe = {id: string; audio?: string; series?: string; scenes: WScene[]};

const L = 150; // side margin
const PAD: React.CSSProperties = {position: 'absolute', left: L, right: L};
const H1: React.CSSProperties = {fontFamily: SERIF, fontWeight: 600, fontSize: 112, lineHeight: 1, letterSpacing: -3};
const H2: React.CSSProperties = {fontFamily: SERIF, fontWeight: 600, fontSize: 66, lineHeight: 1.08, letterSpacing: -1.5};

const Masthead: React.FC<{series?: string}> = ({series}) => {
  const f = useCurrentFrame(); const {durationInFrames} = useVideoConfig();
  return (
    <div style={{position: 'absolute', left: L, right: L, top: 56}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <div style={{fontFamily: SERIF, fontSize: 34, fontWeight: 600}}>The Sum <i style={{fontWeight: 400}}>of</i> It</div>
        <div style={{fontFamily: MONO, fontSize: 20, letterSpacing: 4, color: P.sub}}>{(series ?? '').toUpperCase()}</div>
      </div>
      <div style={{height: 2, background: P.ink, marginTop: 14}} />
      <div style={{height: 5, background: P.faint, marginTop: 5, position: 'relative'}}>
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(f / durationInFrames) * 100}%`, background: P.claret}} />
      </div>
    </div>
  );
};

const Hook: React.FC<{s: WHook}> = ({s}) => (
  <div style={{...PAD, top: 290}}>
    <Kicker>{s.kicker}</Kicker>
    {s.lines.map((l, i) => <Lines key={i} text={l} at={cue(s, i, 8 + i * 30)} style={{...H1, marginTop: i ? 26 : 40}} />)}
    {s.question && (
      <div style={{marginTop: 60}}>
        <Rule at={cue(s, s.lines.length, 70) - 6} color={P.claret} w={140} h={4} />
        <In at={cue(s, s.lines.length, 70)}><div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 50, marginTop: 28}}>{s.question}</div></In>
      </div>
    )}
  </div>
);

const Chapter: React.FC<{s: WChapter}> = ({s}) => {
  const f = useCurrentFrame();
  const g = interpolate(f, [4, 30], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <div style={{...PAD, top: 300, display: 'flex', gap: 80, alignItems: 'flex-start'}}>
      <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: 300, lineHeight: 0.85, color: P.claret, opacity: g, transform: `translateX(${(1 - g) * -40}px)`, fontVariantNumeric: 'lining-nums'}}>{s.n}</div>
      <div style={{paddingTop: 20, flex: 1}}>
        <In at={6} y={16}><div style={{fontFamily: MONO, fontSize: 28, letterSpacing: 7, color: P.sub}}>{s.n === '·' ? 'EPISODE 1' : `CHAPTER ${s.n}`}</div></In>
        <Rule at={8} color={P.ink} w={1000} h={3} style={{marginTop: 22}} />
        <Lines text={s.title} at={12} style={{...H1, fontSize: 104, marginTop: 30}} />
        {s.sub && <In at={30}><div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 44, color: P.sub, marginTop: 30}}>{s.sub}</div></In>}
      </div>
    </div>
  );
};

const People: React.FC<{s: WPeople}> = ({s}) => (
  <div style={{...PAD, top: 250}}>
    <Kicker>{s.kicker}</Kicker>
    <div style={{display: 'flex', gap: 70, marginTop: 60}}>
      {s.people.map((p, i) => (
        <In key={p.name} at={cue(s, i, 10 + i * 50)} y={50} style={{flex: 1, minWidth: 0}}>
          <Rule at={cue(s, i, 10 + i * 50)} color={col(p.color)} h={6} w={(1620 - 70 * (s.people.length - 1)) / s.people.length} />
          <div style={{fontFamily: MONO, fontSize: 24, letterSpacing: 3, color: P.sub, marginTop: 24}}>{p.tag}</div>
          <div style={{fontFamily: SERIF, fontWeight: 600, fontSize: 84, letterSpacing: -2, color: col(p.color), marginTop: 6}}>{p.name}</div>
          <div style={{fontFamily: SERIF, fontSize: 40, lineHeight: 1.3, marginTop: 8}}>{p.note}</div>
          <div style={{fontFamily: MONO, fontSize: 24, letterSpacing: 3, color: P.sub, marginTop: 40}}>{p.statLabel}</div>
          <div style={{fontFamily: SERIF, fontWeight: 600, fontSize: 96, letterSpacing: -3, color: P.ink, fontVariantNumeric: 'tabular-nums lining-nums'}}><Count value={p.stat} at={cue(s, i, 10 + i * 50) + 6} /></div>
        </In>
      ))}
    </div>
    {s.footnote && <In at={cue(s, s.people.length, 200)}><div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 44, color: P.sub, marginTop: 40}}><Rich text={s.footnote} /></div></In>}
  </div>
);

const Race: React.FC<{s: WRace}> = ({s}) => {
  const f = useCurrentFrame();
  const x = interpolate(f, [cue(s, 0, 30), Math.min(cue(s, 1, s.dur - 60), s.dur - 45)], [s.xStart, s.xEnd], {...clamp, easing: Easing.inOut(Easing.quad)});
  const CX = 720, CW = 940, CY = 230, CH = 640;
  const px = (v: number) => CX + ((v - s.xStart) / (s.xEnd - s.xStart)) * CW;
  const py = (v: number) => CY + CH - (Math.min(v, s.yMax * 1.02) / s.yMax) * CH;
  const pts = (d: Record<string, number>, from: number) => {
    const out: [number, number][] = [];
    for (let k = Math.ceil(from); k <= Math.floor(x); k++) out.push([px(k), py(d[String(k)] ?? 0)]);
    if (x % 1 > 0 && x > from) out.push([px(x), py(valAt(d, x))]);
    return out;
  };
  const grid = interpolate(f, [0, 20], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: L, top: 250, width: 520}}>
        <Kicker>{s.kicker}</Kicker>
        {s.series.map((se) => (
          <div key={se.name} style={{borderTop: `5px solid ${col(se.color)}`, paddingTop: 14, marginTop: 44}}>
            <div style={{fontFamily: MONO, fontSize: 24, letterSpacing: 3, color: P.sub}}>{se.name.toUpperCase()}</div>
            <div style={{fontFamily: SERIF, fontWeight: 600, fontSize: 84, letterSpacing: -2, color: col(se.color), fontVariantNumeric: 'tabular-nums lining-nums'}}>
              {se.cents ? '$' + valAt(se.data, Math.max(x, se.startAt ?? s.xStart)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : usd(valAt(se.data, x))}
            </div>
          </div>
        ))}
        <div style={{fontFamily: MONO, fontSize: 26, letterSpacing: 3, color: P.sub, marginTop: 40}}>{s.xLabel.toUpperCase()} <span style={{color: P.ink}}>{s.xTickLabels?.[String(Math.round(x))] ?? Math.floor(x)}</span></div>
      </div>
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        <defs>
          <clipPath id="wplot"><rect x={CX - 20} y={CY - 40} width={CW + 40} height={CH + 40} /></clipPath>
          {s.series.map((se, i) => (
            <linearGradient key={i} id={`wfill${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={col(se.color)} stopOpacity={0.16} /><stop offset="1" stopColor={col(se.color)} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <g opacity={grid}>
          {s.yTicks.map((v) => (
            <g key={v}>
              <line x1={CX} x2={CX + CW} y1={py(v)} y2={py(v)} stroke={v === 0 ? P.ink : P.rule} strokeWidth={v === 0 ? 2.5 : 1.5} />
              {v > 0 && <text x={CX + CW + 14} y={py(v) + 8} fill={P.sub} fontFamily="DM Mono" fontSize={22}>{tick(v)}</text>}
            </g>
          ))}
          {s.xTicks.map((t) => <text key={t} x={px(t)} y={CY + CH + 40} fill={P.sub} fontFamily="DM Mono" fontSize={22} textAnchor="middle">{s.xTickLabels?.[String(t)] ?? t}</text>)}
        </g>
        {s.marker !== undefined && x >= s.marker && <line x1={px(s.marker)} x2={px(s.marker)} y1={CY - 20} y2={CY + CH} stroke={P.ink} strokeOpacity={0.45} strokeWidth={2} strokeDasharray="3 9" />}
        {[...s.series].map((se, i) => ({se, i})).reverse().map(({se, i}) => {
          const p = pts(se.data, se.startAt ?? s.xStart);
          if (p.length < 2) return null;
          return (
            <g key={se.name} clipPath="url(#wplot)">
              <path d={`${smooth(p)} L${p[p.length - 1][0]},${CY + CH} L${p[0][0]},${CY + CH} Z`} fill={`url(#wfill${i})`} />
              <path d={smooth(p)} fill="none" stroke={col(se.color)} strokeWidth={i === 0 ? 6 : 5} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          );
        })}
        {s.series.map((se) => x > (se.startAt ?? s.xStart) ? (
          <g key={se.name}>
            <circle cx={px(x)} cy={py(valAt(se.data, x))} r={20} fill={col(se.color)} opacity={0.15} />
            <circle cx={px(x)} cy={py(valAt(se.data, x))} r={10} fill={P.paper} stroke={col(se.color)} strokeWidth={5} />
          </g>
        ) : null)}
      </svg>
      {(s.notes ?? []).map((n, i) => {
        const o = interpolate(x, [n.at, n.at + (s.xEnd - s.xStart) * 0.03], [0, 1], clamp);
        return (
          <div key={i} style={{position: 'absolute', left: px(n.x) + 14, top: py(n.yValue) + (n.dy ?? 0), opacity: o, fontFamily: SERIF, fontStyle: 'italic', fontSize: 32, lineHeight: 1.2, whiteSpace: 'pre-line',
            color: n.color && n.color !== 'muted' ? col(n.color) : P.sub, borderLeft: `3px solid ${n.color && n.color !== 'muted' ? col(n.color) : P.rule}`, paddingLeft: 14}}>{n.text}</div>
        );
      })}
    </AbsoluteFill>
  );
};

const Reveal: React.FC<{s: WReveal}> = ({s}) => (
  <div style={{...PAD, top: 270}}>
    <Kicker>{s.kicker}</Kicker>
    <div style={{display: 'flex', gap: 80, marginTop: 50}}>
      {s.items.map((it, i) => {
        const at = cue(s, i, 8 + i * 32);
        return (
          <In key={i} at={at} y={30} style={{flex: 1, minWidth: 0}}>
            <div style={{fontFamily: MONO, fontSize: 24, letterSpacing: 3, color: P.sub}}>{it.label}</div>
            <div style={{fontFamily: SERIF, fontWeight: 600, fontSize: s.items.length > 2 ? 120 : 150, letterSpacing: -4, lineHeight: 1.04, color: col(it.color), fontVariantNumeric: 'tabular-nums lining-nums', whiteSpace: 'nowrap'}}>
              <Count value={it.value} at={at} />
            </div>
            <Rule at={at + 6} color={P.rule} h={2} w={(1620 - 80 * (s.items.length - 1)) / s.items.length} />
          </In>
        );
      })}
    </div>
    <Lines text={s.punch} at={cue(s, s.items.length, 120)} style={{...H2, marginTop: 64}} />
  </div>
);

// rank: one cue per row, then footnote
const Rank: React.FC<{s: WRank}> = ({s}) => {
  const f = useCurrentFrame();
  const W = 760;
  return (
    <div style={{...PAD, top: 260}}>
      <Kicker>{s.kicker}</Kicker>
      {s.title && <Lines text={s.title} at={6} style={{...H2, marginTop: 22}} />}
      <div style={{marginTop: 50}}>
        {s.rows.map((r, i) => {
          const at = cue(s, i, 20 + i * 30);
          const g = interpolate(f, [at, at + 26], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
          return (
            <div key={r.label} style={{display: 'flex', alignItems: 'center', height: 104, opacity: Math.min(1, g * 2), borderBottom: `1.5px solid ${P.faint}`}}>
              <div style={{width: 400, whiteSpace: 'nowrap', fontFamily: SERIF, fontWeight: 600, fontSize: 42}}>{r.label}</div>
              <div style={{width: (r.value / s.max) * W * g, height: 44, background: col(r.color)}} />
              <div style={{marginLeft: 22, fontFamily: MONO, fontWeight: 500, fontSize: 38, color: col(r.color), whiteSpace: 'nowrap'}}>{r.display}</div>
            </div>
          );
        })}
      </div>
      {s.footnote && <In at={cue(s, s.rows.length, 200)}><div style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 48, color: P.sub, marginTop: 44}}><Rich text={s.footnote} /></div></In>}
    </div>
  );
};

const List: React.FC<{s: WList}> = ({s}) => (
  <div style={{...PAD, top: 260}}>
    <Kicker>{s.kicker}</Kicker>
    <div style={{marginTop: 40}}>
      {s.items.map((t, i) => (
        <In key={i} at={cue(s, i, 10 + i * 60)} y={30}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 50, padding: '26px 0', borderBottom: `2px solid ${P.faint}`}}>
            <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: 90, color: P.claret, width: 70}}>{i + 1}</div>
            <div style={{...H2, fontSize: 70}}><Rich text={t} /></div>
          </div>
        </In>
      ))}
    </div>
  </div>
);

const Outro: React.FC<{s: WOutro}> = ({s}) => {
  const f = useCurrentFrame();
  const sign = interpolate(f, [cue(s, 2, s.dur - 120), cue(s, 2, s.dur - 120) + 20], [0, 1], clamp);
  return (
    <>
      <div style={{...PAD, top: 250}}>
        <Lines text={s.lines} at={cue(s, 0, 0)} style={{...H1, fontSize: 96}} />
        {s.disclaimer && <In at={cue(s, 1, 40)}><div style={{fontFamily: MONO, fontSize: 24, color: P.sub, marginTop: 50, lineHeight: 1.6, maxWidth: 1400, whiteSpace: 'pre-line'}}>{s.disclaimer}</div></In>}
      </div>
      <div style={{position: 'absolute', left: L, right: L, bottom: 90, opacity: sign, transform: `translateY(${(1 - sign) * 20}px)`}}>
        <div style={{height: 2, background: P.ink}} />
        <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 22}}>
          <Mark size={74} />
          <div>
            <div style={{fontFamily: SERIF, fontWeight: 600, fontSize: 48}}>That's the sum <i style={{fontWeight: 400, color: P.claret}}>of it.</i></div>
            <div style={{fontFamily: MONO, fontSize: 22, letterSpacing: 3, color: P.sub, marginTop: 4}}>SUBSCRIBE {HANDLE.toUpperCase()} · NEW SHORTS MON · WED · FRI</div>
          </div>
        </div>
      </div>
    </>
  );
};

const render = (s: WScene) => {
  switch (s.type) {
    case 'hook': return <Hook s={s} />;
    case 'chapter': return <Chapter s={s} />;
    case 'people': return <People s={s} />;
    case 'race': return <Race s={s} />;
    case 'reveal': return <Reveal s={s} />;
    case 'rank': return <Rank s={s} />;
    case 'list': return <List s={s} />;
    case 'outro': return <Outro s={s} />;
  }
};

const Fade: React.FC<{dur: number; children: React.ReactNode}> = ({dur, children}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 8, dur - 8, dur], [0, 1, 1, 0], clamp);
  return <AbsoluteFill style={{opacity: o, transform: `translateY(${interpolate(f, [dur - 8, dur], [0, -18], clamp)}px)`}}>{children}</AbsoluteFill>;
};

export const wideDuration = (r: WideRecipe) => r.scenes.reduce((a, s) => a + s.dur, 0);

export const WideVideo: React.FC<{recipe: WideRecipe}> = ({recipe}) => {
  useFonts();
  let from = 0;
  return (
    <Paper>
      {recipe.scenes.map((s, i) => {
        const el = <Sequence key={i} from={from} durationInFrames={s.dur}><Fade dur={s.dur}>{render(s)}</Fade></Sequence>;
        from += s.dur; return el;
      })}
      <Masthead series={recipe.series} />
      {recipe.audio && <Audio src={staticFile(recipe.audio)} />}
    </Paper>
  );
};

// 1280x720 YouTube thumbnail
type ThumbSide = {tag: string; name: string; value: string};
export type WideThumbProps = {ep?: string; left?: ThumbSide; right?: ThumbSide; title?: string; titleEm?: string};
export const WideThumb: React.FC<WideThumbProps> = ({ep = 'EPISODE 1', left = {tag: 'SAVED 10 YEARS', name: 'Maya', value: '$280,968'}, right = {tag: 'SAVED 30 YEARS', name: 'Leo', value: '$243,994'}, title = 'Time does', titleEm = 'the work.'}) => {
  useFonts();
  return (
    <Paper>
      <div style={{position: 'absolute', left: 70, right: 70, top: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontFamily: SERIF, fontSize: 36, fontWeight: 600}}>The Sum <i style={{fontWeight: 400}}>of</i> It</div>
        <div style={{fontFamily: MONO, fontSize: 22, letterSpacing: 5, color: P.claret}}>{ep}</div>
      </div>
      <div style={{position: 'absolute', left: 70, right: 70, top: 112, height: 2, background: P.ink}} />
      <div style={{position: 'absolute', left: 70, right: 70, top: 160, display: 'flex', gap: 50}}>
        <div style={{flex: 1}}>
          <div style={{fontFamily: MONO, fontSize: 24, letterSpacing: 4, color: P.sub}}>{left.tag}</div>
          <div style={{fontFamily: SERIF, fontWeight: 600, fontSize: 72, color: P.claret, marginTop: 4}}>{left.name}</div>
          <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: 112, letterSpacing: -4, color: P.claret, lineHeight: 1}}>{left.value}</div>
        </div>
        <div style={{flex: 1}}>
          <div style={{fontFamily: MONO, fontSize: 24, letterSpacing: 4, color: P.sub}}>{right.tag}</div>
          <div style={{fontFamily: SERIF, fontWeight: 600, fontSize: 72, color: P.navy, marginTop: 4}}>{right.name}</div>
          <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: 112, letterSpacing: -4, color: P.navy, lineHeight: 1}}>{right.value}</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 70, right: 70, top: 470}}>
        <div style={{height: 5, background: P.claret}} /><div style={{height: 5, background: P.claret, marginTop: 7}} />
        <div style={{fontFamily: SERIF, fontWeight: 600, fontSize: 84, letterSpacing: -2, marginTop: 30}}>{title} <i style={{fontWeight: 400, color: P.claret}}>{titleEm}</i></div>
      </div>
    </Paper>
  );
};
