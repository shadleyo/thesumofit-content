import React from 'react';
import {AbsoluteFill, Easing, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  ACCENT, ALERT, Bug, INK, Kicker, LINE, MONO, MUTED, PANEL, PAPER, Progress, Rise, SceneFade, Stage, useBrandFonts,
} from './brand';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const H1: React.CSSProperties = {fontSize: 112, fontWeight: 700, lineHeight: 1.0, letterSpacing: -3};
const H2: React.CSSProperties = {fontSize: 76, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2};
const Body: React.CSSProperties = {fontSize: 46, fontWeight: 400, lineHeight: 1.3, color: PAPER};
const pad: React.CSSProperties = {padding: '0 90px'};

// ---------- props ----------
const Card: React.FC<{style?: React.CSSProperties}> = ({style}) => (
  <div
    style={{
      width: 560, height: 350, borderRadius: 36, background: `linear-gradient(135deg, ${PANEL}, #1F2840)`,
      border: `2px solid ${LINE}`, position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', ...style,
    }}
  >
    <div style={{position: 'absolute', left: 54, top: 110, width: 96, height: 74, borderRadius: 14,
      background: 'linear-gradient(135deg,#E9D9A6,#B99B52)'}} />
    <svg style={{position: 'absolute', left: 175, top: 112}} width="70" height="70" viewBox="0 0 70 70">
      {[14, 26, 38].map((r) => (
        <path key={r} d={`M ${20} ${35 - r * 0.7} A ${r} ${r} 0 0 1 ${20} ${35 + r * 0.7}`}
          fill="none" stroke={PAPER} strokeWidth="5" strokeLinecap="round" opacity={0.8} />
      ))}
    </svg>
    <div style={{position: 'absolute', left: 54, bottom: 50, fontFamily: MONO, fontSize: 34, color: MUTED, letterSpacing: 4}}>
      •••• •••• •••• 4417
    </div>
  </div>
);

const Terminal: React.FC<{lit?: boolean; text?: string}> = ({lit, text}) => (
  <div style={{width: 380, height: 560, borderRadius: 48, background: PANEL, border: `2px solid ${LINE}`,
    display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 50}}>
    <div style={{width: 290, height: 190, borderRadius: 20, background: lit ? ACCENT : INK,
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 40,
      fontWeight: 700, color: lit ? INK : PAPER, transition: 'none'}}>
      {text}
    </div>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 70px)', gap: 18, marginTop: 50}}>
      {Array.from({length: 9}).map((_, i) => (
        <div key={i} style={{width: 70, height: 50, borderRadius: 12, background: LINE}} />
      ))}
    </div>
  </div>
);

// ---------- scenes ----------
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const tap = spring({frame: frame - 18, fps, config: {damping: 12}});
  const lit = frame > 34;
  return (
    <AbsoluteFill style={{alignItems: 'center'}}>
      <div style={{marginTop: 260, position: 'relative', height: 760, width: 900}}>
        <div style={{position: 'absolute', left: 260, top: 160}}>
          <Terminal lit={lit} text={lit ? 'APPROVED' : 'R 49.00'} />
        </div>
        <Card style={{position: 'absolute', left: 260 + interpolate(tap, [0, 1], [-420, 40]),
          top: interpolate(tap, [0, 1], [-60, 380]), transform: `rotate(${interpolate(tap, [0, 1], [-18, -8])}deg)`}} />
      </div>
      <div style={{...pad, textAlign: 'center'}}>
        <Rise at={40}><div style={{...H1, marginTop: 40}}>Tap. Beep.<br />Done.</div></Rise>
        <Rise at={75}><div style={{...Body, color: MUTED, marginTop: 30}}>But in those 2 seconds, your card<br />just talked to <span style={{color: ACCENT}}>3 companies</span>.</div></Rise>
      </div>
    </AbsoluteFill>
  );
};

const Nfc: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{...pad, paddingTop: 240}}>
      <Kicker>Step 1 · Power</Kicker>
      <Rise at={6}><div style={{...H2, marginTop: 24}}>Your card has<br /><span style={{color: ACCENT}}>no battery.</span></div></Rise>
      <div style={{position: 'relative', height: 760, marginTop: 40}}>
        {[0, 1, 2, 3].map((i) => {
          const t = ((frame + i * 18) % 72) / 72;
          return (
            <div key={i} style={{position: 'absolute', left: 450 - t * 380, top: 380 - t * 380, width: t * 760, height: t * 760,
              borderRadius: '50%', border: `4px solid ${ACCENT}`, opacity: (1 - t) * 0.8}} />
          );
        })}
        <Card style={{position: 'absolute', left: 170, top: 205, transform: 'rotate(-6deg)'}} />
      </div>
      <Rise at={50}><div style={Body}>The terminal sends out a radio field.<br />The chip's antenna catches it, and<br />that is what <b>switches the chip on</b>.</div></Rise>
      <Rise at={130}><div style={{...Body, color: MUTED, marginTop: 30, fontFamily: MONO, fontSize: 38}}>Range ≈ 4 cm. That's why you tap.</div></Rise>
    </AbsoluteFill>
  );
};

const Cryptogram: React.FC = () => {
  const frame = useCurrentFrame();
  const chars = '0123456789ABCDEF';
  const target = '8F3A 91C2 E07B 4D6E';
  const settle = 110;
  const code = target
    .split('')
    .map((c, i) => (c === ' ' || frame > settle + i * 3 ? c : chars[(frame * 7 + i * 13) % 16]))
    .join('');
  const strike = interpolate(frame, [20, 40], [0, 1], clamp);
  return (
    <AbsoluteFill style={{...pad, paddingTop: 240}}>
      <Kicker>Step 2 · Secret code</Kicker>
      <Rise at={6}><div style={{...H2, marginTop: 24}}>It never sends your<br />card number <span style={{color: ACCENT}}>as-is.</span></div></Rise>
      <div style={{marginTop: 110, position: 'relative', fontFamily: MONO, fontSize: 64, color: MUTED}}>
        4532 8810 0291 4417
        <div style={{position: 'absolute', left: 0, top: 40, height: 8, background: ALERT, width: `${strike * 100}%`}} />
      </div>
      <Rise at={45}>
        <div style={{marginTop: 60, background: PANEL, border: `2px solid ${LINE}`, borderRadius: 28, padding: '50px 50px'}}>
          <div style={{fontFamily: MONO, fontSize: 30, color: MUTED, letterSpacing: 3}}>ONE-TIME CRYPTOGRAM</div>
          <div style={{fontFamily: MONO, fontSize: 60, fontWeight: 700, color: ACCENT, marginTop: 16, whiteSpace: 'nowrap'}}>{code}</div>
        </div>
      </Rise>
      <Rise at={150}><div style={{...Body, marginTop: 70}}>The chip signs <b>this exact payment</b>:<br />amount, shop, time. Copy it, and it's<br /><span style={{color: ALERT}}>useless</span> for anything else.</div></Rise>
    </AbsoluteFill>
  );
};

const stops = [
  {name: 'The terminal', sub: 'at the shop'},
  {name: "Shop's bank", sub: 'the "acquirer"'},
  {name: 'Card network', sub: 'Visa, Mastercard…'},
  {name: 'Your bank', sub: 'the "issuer"'},
];
const NODE_Y = (i: number) => 520 + i * 300;

const Journey: React.FC<{dir: 'down' | 'up'; dur: number}> = ({dir, dur}) => {
  const frame = useCurrentFrame();
  const travel = dir === 'down' ? [30, dur - 40] : [10, dur - 40];
  const p = interpolate(frame, travel, [0, 3], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const pos = dir === 'down' ? p : 3 - p;
  const dotY = NODE_Y(0) + pos * 300;
  const color = dir === 'down' ? ACCENT : ACCENT;
  return (
    <AbsoluteFill style={{...pad, paddingTop: 230}}>
      <Kicker>{dir === 'down' ? 'Step 3 · The trip' : 'Step 5 · The way back'}</Kicker>
      <Rise at={4}><div style={{...H2, marginTop: 24}}>{dir === 'down' ? <>A request, <span style={{color: ACCENT}}>4 stops.</span></> : <>Same road, <span style={{color: ACCENT}}>in reverse.</span></>}</div></Rise>
      <div style={{position: 'absolute', left: 160, top: NODE_Y(0), width: 6, height: 900, background: LINE}} />
      <div style={{position: 'absolute', left: 160, top: dir === 'down' ? NODE_Y(0) : dotY, width: 6,
        height: dir === 'down' ? dotY - NODE_Y(0) : NODE_Y(3) - dotY, background: color}} />
      {stops.map((s, i) => {
        const reached = dir === 'down' ? pos >= i - 0.05 : pos <= i + 0.05;
        return (
          <div key={s.name} style={{position: 'absolute', left: 120, top: NODE_Y(i) - 43, display: 'flex', alignItems: 'center'}}>
            <div style={{width: 86, height: 86, borderRadius: '50%', background: reached ? color : INK,
              border: `6px solid ${reached ? color : LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: MONO, fontWeight: 700, fontSize: 36, color: reached ? INK : MUTED}}>{i + 1}</div>
            <div style={{marginLeft: 50, opacity: reached ? 1 : 0.35}}>
              <div style={{fontSize: 60, fontWeight: 700}}>{s.name}</div>
              <div style={{fontFamily: MONO, fontSize: 32, color: MUTED, marginTop: 6}}>{s.sub}</div>
            </div>
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 140, top: dotY - 23, width: 46, height: 46, borderRadius: '50%',
        background: PAPER, boxShadow: `0 0 50px ${ACCENT}`}} />
      {dir === 'up' && (
        <div style={{position: 'absolute', left: 730, top: dotY - 30, fontFamily: MONO, fontWeight: 700, fontSize: 40,
          color: INK, background: ACCENT, padding: '8px 22px', borderRadius: 12, opacity: interpolate(frame, [5, 15], [0, 1], clamp)}}>
          APPROVED
        </div>
      )}
    </AbsoluteFill>
  );
};

const Decision: React.FC = () => {
  const checks = ['Is the code genuine?', 'Is there enough money?', 'Does this look like fraud?'];
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{...pad, paddingTop: 240}}>
      <Kicker>Step 4 · The decision</Kicker>
      <Rise at={4}><div style={{...H2, marginTop: 24}}>Your bank asks<br /><span style={{color: ACCENT}}>three questions.</span></div></Rise>
      <div style={{marginTop: 120}}>
        {checks.map((c, i) => {
          const at = 40 + i * 55;
          const done = frame > at + 25;
          return (
            <Rise key={c} at={at}>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: 56, background: PANEL,
                border: `2px solid ${done ? ACCENT : LINE}`, borderRadius: 26, padding: '38px 40px'}}>
                <div style={{width: 64, height: 64, borderRadius: 16, background: done ? ACCENT : INK,
                  border: `3px solid ${done ? ACCENT : LINE}`, color: INK, fontSize: 46, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{done ? '✓' : ''}</div>
                <div style={{fontSize: 50, fontWeight: 500, marginLeft: 36}}>{c}</div>
              </div>
            </Rise>
          );
        })}
      </div>
      <Rise at={225}><div style={{...Body, color: MUTED, fontFamily: MONO, fontSize: 38}}>Fraud models score the payment<br />in milliseconds.</div></Rise>
    </AbsoluteFill>
  );
};

const Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [10, 60], [0, 1.8], clamp);
  return (
    <AbsoluteFill style={{...pad, paddingTop: 300}}>
      <div style={{fontFamily: MONO, fontSize: 210, fontWeight: 700, color: ACCENT, letterSpacing: -6}}>{t.toFixed(1)}s</div>
      <Rise at={40}><div style={{...H2, marginTop: 20}}>The whole round trip.<br />Often across borders.</div></Rise>
      <Rise at={110}>
        <div style={{marginTop: 110, borderLeft: `8px solid ${ACCENT}`, paddingLeft: 40}}>
          <div style={{fontSize: 52, fontWeight: 700}}>Plot twist:</div>
          <div style={{...Body, marginTop: 14}}>No money moved yet. That was only<br />a <b>promise</b>. The actual cash settles<br />later, usually within a day or two.</div>
        </div>
      </Rise>
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => (
  <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center', ...pad}}>
    <Rise><Kicker>Next up</Kicker></Rise>
    <Rise at={8}><div style={{...H2, marginTop: 30}}>Where does your money<br />go when a payment <span style={{color: ALERT}}>fails?</span></div></Rise>
    <Rise at={30}><div style={{...Body, color: MUTED, marginTop: 50}}>Follow so you don't miss it.</div></Rise>
  </AbsoluteFill>
);

// ---------- timeline (30 fps, 60 s) ----------
const timeline: [React.FC<any>, number, any?][] = [
  [Hook, 160],
  [Nfc, 230],
  [Cryptogram, 290],
  [Journey, 330, {dir: 'down'}],
  [Decision, 300],
  [Journey, 150, {dir: 'up'}],
  [Payoff, 230],
  [Outro, 110],
];
export const TAP_DURATION = timeline.reduce((a, [, d]) => a + d, 0);

export const TapCard: React.FC = () => {
  useBrandFonts();
  let from = 0;
  return (
    <Stage>
      {timeline.map(([Comp, dur, props], i) => {
        const seq = (
          <Sequence key={i} from={from} durationInFrames={dur}>
            <SceneFade dur={dur}><Comp {...props} dur={dur} /></SceneFade>
          </Sequence>
        );
        from += dur;
        return seq;
      })}
      <Progress />
      <Bug text="HOW IT REALLY WORKS" />
    </Stage>
  );
};
