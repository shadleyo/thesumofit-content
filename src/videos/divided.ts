// "Divided government: what it means for your money". 4 Nov 2026, after AP called both chambers for Democrats.
// Sources: AP via PBS NewsHour & Spectrum News (3-4 Nov 2026: Democrats win Senate and House; 7 GOP Senate seats flipped);
// Aviation Week 24 Jun 2026 ($67.1bn request); US Constitution Art. I s.7 (2/3 override); 20th Amendment (3 Jan);
// Fortune 3 Nov 2026 (funding to 11 Dec; debt ~$40tn; tariffs under Section 301); Deutsche Bank (debt limit 2027).
import {Recipe} from '../template';
import t from './Divided.timing.json';

const timed = (r: Recipe, tt: {dur: number; cues: number[]}[], audio: string): Recipe => ({...r, audio, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});

export const divided: Recipe = timed({
  id: 'Divided',
  channel: 'THE SUM OF IT',
  thumb: {kicker: 'US MIDTERMS · AP CALLS', from: 'Congress: Democratic.', link: 'President: Republican.', to: 'Divided', foot: 'What it means for your money'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'US midterms · AP calls', lines: ['Democrats win', '*the Senate too.*'], question: 'Seven Republican seats flipped.'},
    {type: 'people', dur: 300, kicker: 'From 3 January 2027', footnote: 'Divided government.', people: [
      {name: 'Congress', color: 'accent', tag: 'HOUSE AND SENATE', note: 'Democratic majorities.', statLabel: 'CONTROL', stat: 'D'},
      {name: 'President', color: 'alert', tag: 'UNTIL JAN 2029', note: 'Republican.', statLabel: 'PARTY', stat: 'R'},
    ]},
    {type: 'reveal', dur: 300, kicker: 'The Iran war bill', punch: 'Now needs Democratic votes\n*in both chambers.*', items: [
      {label: 'PENTAGON REQUEST', value: '$67.1bn', color: 'accent'},
    ]},
    {type: 'reveal', dur: 300, kicker: 'Every new law', punch: 'Neither side\n*has that.*', items: [
      {label: 'TO OVERRIDE A VETO', value: '2/3', color: 'paper'},
    ]},
    {type: 'hook', dur: 150, kicker: 'Tariffs', lines: ['Set mostly by the president.', '*Hard for Congress to change.*']},
    {type: 'reveal', dur: 300, kicker: 'Two deadlines', punch: 'National debt:\n*near $40 trillion.*', items: [
      {label: 'FEDERAL FUNDING RUNS OUT', value: '11 Dec', color: 'alert'},
      {label: 'DEBT LIMIT RETURNS', value: '2027', color: 'paper'},
    ]},
    {type: 'outro', dur: 150, lines: 'New Congress, same president.\n*The budget fights are just beginning.*',
      disclaimer: 'Chamber calls: Associated Press, 3–4 Nov 2026. War request: $67.1bn (24 Jun 2026). Funding deadline and debt: Fortune, 3 Nov 2026. US Constitution, Art. I s.7. Figures only; no endorsement.'},
  ],
}, t as {dur: number; cues: number[]}[], 'audio/Divided.mp3');
