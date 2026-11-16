import React from 'react';
import {AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {ACCENT, Bug, Kicker, LINE, MONO, MUTED, PANEL, PAPER, Progress, Rise, SceneFade, Stage, useBrandFonts} from './brand';
import data from './compound.json';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const H1: React.CSSProperties = {fontSize: 104, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3};
const H2: React.CSSProperties = {fontSize: 74, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2};
const Body: React.CSSProperties = {fontSize: 46, lineHeight: 1.3};
const pad: React.CSSProperties = {padding: '0 90px'};
const SAM = PAPER;
const A = data.A as Record<string, number>;
const B = data.B as Record<string, number>;
const val = (s: Record<string, number>, age: number) => s[String(age)] ?? 0;
const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

// ---------- scenes ----------
const Hook: React.FC = () => (
  <AbsoluteFill style={{...pad, justifyContent: 'center'}}>
    <Rise><Kicker>Same $200 a month</Kicker></Rise>
    <Rise at={8}><div style={{...H1, marginTop: 30}}>One saves for<br /><span style={{color: ACCENT}}>10 years.</span></div></Rise>
    <Rise at={40}><div style={{...H1, marginTop: 30}}>One saves for<br />30 years.</div></Rise>
    <Rise at={85}><div style={{...Body, color: MUTED, marginTop: 60}}>Who ends up with more?</div></Rise>
  </AbsoluteFill>
);

const Person: React.FC<{name: string; color: string; ages: string; total: string; note: string; at: number}> = ({name, color, ages, total, note, at}) => (
  <Rise at={at}>
    <div style={{background: PANEL, border: `2px solid ${LINE}`, borderLeft: `14px solid ${color}`, borderRadius: 28, padding: '44px 48px', marginBottom: 44}}>
      <div style={{fontSize: 70, fontWeight: 700, color}}>{name}</div>
      <div style={{fontFamily: MONO, fontSize: 36, color: MUTED, marginTop: 8}}>{ages}</div>
      <div style={{fontSize: 44, marginTop: 26}}>{note}</div>
      <div style={{display: 'flex', alignItems: 'baseline', marginTop: 22}}>
        <div style={{fontFamily: MONO, fontSize: 30, color: MUTED, letterSpacing: 2}}>TOTAL PUT IN&nbsp;&nbsp;</div>
        <div style={{fontFamily: MONO, fontSize: 56, fontWeight: 700}}>{total}</div>
      </div>
    </div>
  </Rise>
);

const Setup: React.FC = () => (
  <AbsoluteFill style={{...pad, paddingTop: 260}}>
    <Kicker>Meet the savers</Kicker>
    <div style={{marginTop: 50}}>
      <Person at={10} name="Alex" color={ACCENT} ages="AGE 25 → 35" note="Saves for 10 years, then stops. Never adds another cent." total="$24,000" />
      <Person at={70} name="Sam" color={SAM} ages="AGE 35 → 65" note="Starts at 35. Saves every month for 30 years." total="$72,000" />
    </div>
    <Rise at={150}><div style={{...Body, color: MUTED, fontFamily: MONO, fontSize: 36}}>Both earn 7% a year on average.</div></Rise>
  </AbsoluteFill>
);

// Chart geometry
const CX = 150, CW = 820, CY = 560, CH = 860, YMAX = 300000;
const xFor = (age: number) => CX + ((age - 25) / 40) * CW;
const yFor = (v: number) => CY + CH - (v / YMAX) * CH;
const pathUpTo = (s: Record<string, number>, upto: number) => {
  const pts: string[] = [];
  for (let a = 25; a <= Math.floor(upto); a++) pts.push(`${xFor(a)},${yFor(val(s, a))}`);
  const f = upto - Math.floor(upto);
  if (f > 0 && upto < 65) {
    const a0 = Math.floor(upto);
    const v = val(s, a0) + (val(s, a0 + 1) - val(s, a0)) * f;
    pts.push(`${xFor(upto)},${yFor(v)}`);
  }
  return 'M' + pts.join(' L');
};
const interp = (s: Record<string, number>, age: number) => {
  const a0 = Math.floor(age);
  if (a0 >= 65) return val(s, 65);
  return val(s, a0) + (val(s, a0 + 1) - val(s, a0)) * (age - a0);
};

const Chart: React.FC<{dur: number}> = ({dur}) => {
  const frame = useCurrentFrame();
  const age = interpolate(frame, [30, dur - 60], [25, 65], {...clamp, easing: Easing.inOut(Easing.quad)});
  const a = interp(A, age), b = interp(B, age);
  const note = (from: number, text: string, x: number, y: number, color = MUTED) => (
    <div style={{position: 'absolute', left: x, top: y, fontFamily: MONO, fontSize: 30, color,
      opacity: interpolate(age, [from, from + 1.5], [0, 1], clamp)}}>{text}</div>
  );
  return (
    <AbsoluteFill>
      <div style={{...pad, paddingTop: 220}}>
        <Kicker>The race</Kicker>
        <div style={{display: 'flex', gap: 60, marginTop: 30}}>
          <div><div style={{fontFamily: MONO, fontSize: 30, color: ACCENT}}>ALEX</div><div style={{fontFamily: MONO, fontSize: 60, fontWeight: 700, color: ACCENT}}>{money(a)}</div></div>
          <div><div style={{fontFamily: MONO, fontSize: 30, color: SAM}}>SAM</div><div style={{fontFamily: MONO, fontSize: 60, fontWeight: 700}}>{money(b)}</div></div>
        </div>
      </div>
      <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
        {[0, 100000, 200000, 300000].map((v) => (
          <g key={v}>
            <line x1={CX} x2={CX + CW} y1={yFor(v)} y2={yFor(v)} stroke={LINE} strokeWidth={2} />
            <text x={CX - 20} y={yFor(v) + 10} fill={MUTED} fontFamily="JetBrains Mono" fontSize={26} textAnchor="end">{v === 0 ? '0' : `${v / 1000}k`}</text>
          </g>
        ))}
        {[25, 35, 45, 55, 65].map((g) => (
          <text key={g} x={xFor(g)} y={CY + CH + 50} fill={MUTED} fontFamily="JetBrains Mono" fontSize={28} textAnchor="middle">{g}</text>
        ))}
        <text x={CX + CW / 2} y={CY + CH + 100} fill={MUTED} fontFamily="JetBrains Mono" fontSize={26} textAnchor="middle">AGE</text>
        <line x1={xFor(35)} x2={xFor(35)} y1={CY} y2={CY + CH} stroke={LINE} strokeWidth={3} strokeDasharray="10 10" opacity={age >= 35 ? 1 : 0} />
        <path d={pathUpTo(B, age)} fill="none" stroke={SAM} strokeWidth={9} strokeLinejoin="round" strokeLinecap="round" />
        <path d={pathUpTo(A, age)} fill="none" stroke={ACCENT} strokeWidth={9} strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={xFor(age)} cy={yFor(a)} r={16} fill={ACCENT} />
        {age > 35 && <circle cx={xFor(age)} cy={yFor(b)} r={16} fill={SAM} />}
      </svg>
      {note(34, 'Alex stops saving →', xFor(35) - 330, CY + 40, ACCENT)}
      {note(35, '← Sam starts', xFor(35) + 20, CY + 100)}
      {note(52, 'Sam never catches up', xFor(37), yFor(200000), SAM)}
    </AbsoluteFill>
  );
};

const Reveal: React.FC = () => (
  <AbsoluteFill style={{...pad, paddingTop: 280}}>
    <Kicker>At age 65</Kicker>
    <Rise at={8}>
      <div style={{marginTop: 50}}>
        <div style={{fontFamily: MONO, fontSize: 34, color: ACCENT}}>ALEX · PUT IN $24,000</div>
        <div style={{fontFamily: MONO, fontSize: 132, fontWeight: 700, color: ACCENT, letterSpacing: -4}}>{money(A['65'])}</div>
      </div>
    </Rise>
    <Rise at={40}>
      <div style={{marginTop: 40}}>
        <div style={{fontFamily: MONO, fontSize: 34, color: MUTED}}>SAM · PUT IN $72,000</div>
        <div style={{fontFamily: MONO, fontSize: 132, fontWeight: 700, letterSpacing: -4}}>{money(B['65'])}</div>
      </div>
    </Rise>
    <Rise at={110}><div style={{...H2, marginTop: 90}}>A third of the effort.<br /><span style={{color: ACCENT}}>More money.</span></div></Rise>
  </AbsoluteFill>
);

const Bar: React.FC<{label: string; color: string; put: number; total: number; at: number}> = ({label, color, put, total, at}) => {
  const frame = useCurrentFrame();
  const g = interpolate(frame, [at, at + 40], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const W = 900;
  const putW = (put / 300000) * W * g, growW = ((total - put) / 300000) * W * g;
  return (
    <div style={{marginBottom: 70}}>
      <div style={{fontSize: 52, fontWeight: 700, color, marginBottom: 20}}>{label}</div>
      <div style={{display: 'flex', height: 90}}>
        <div style={{width: putW, background: MUTED, borderRadius: '14px 0 0 14px'}} />
        <div style={{width: growW, background: color, borderRadius: '0 14px 14px 0'}} />
      </div>
      <div style={{fontFamily: MONO, fontSize: 30, color: MUTED, marginTop: 16, opacity: g}}>
        {money(put)} in · {money(total - put)} growth
      </div>
    </div>
  );
};

const Why: React.FC = () => (
  <AbsoluteFill style={{...pad, paddingTop: 260}}>
    <Kicker>Why?</Kicker>
    <Rise at={6}><div style={{...H2, marginTop: 24}}>Growth earns <span style={{color: ACCENT}}>growth.</span></div></Rise>
    <div style={{marginTop: 90}}>
      <Bar at={30} label="Alex" color={ACCENT} put={24000} total={A['65']} />
      <Bar at={60} label="Sam" color={SAM} put={72000} total={B['65']} />
    </div>
    <Rise at={110}><div style={Body}>Alex's money had <b>10 extra years</b> to<br />compound. Time did the heavy lifting.</div></Rise>
  </AbsoluteFill>
);

const Outro: React.FC = () => (
  <AbsoluteFill style={{...pad, justifyContent: 'center'}}>
    <Rise><div style={H2}>The best time to start<br />was yesterday.<br /><span style={{color: ACCENT}}>The next best is today.</span></div></Rise>
    <Rise at={40}><div style={{fontFamily: MONO, fontSize: 28, color: MUTED, marginTop: 80, lineHeight: 1.5}}>
      Illustration only: assumes a steady 7% yearly return,<br />compounded monthly, before fees, tax and inflation.<br />Real returns vary. Not financial advice.
    </div></Rise>
  </AbsoluteFill>
);

const timeline: [React.FC<any>, number][] = [
  [Hook, 150],
  [Setup, 300],
  [Chart, 660],
  [Reveal, 270],
  [Why, 270],
  [Outro, 150],
];
export const COMPOUND_DURATION = timeline.reduce((a, [, d]) => a + d, 0);

export const Compound: React.FC = () => {
  useBrandFonts();
  let from = 0;
  return (
    <Stage>
      {timeline.map(([Comp, dur], i) => {
        const el = (
          <Sequence key={i} from={from} durationInFrames={dur}>
            <SceneFade dur={dur}><Comp dur={dur} /></SceneFade>
          </Sequence>
        );
        from += dur;
        return el;
      })}
      <Progress />
      <Bug text="MONEY, IN DATA" />
    </Stage>
  );
};
