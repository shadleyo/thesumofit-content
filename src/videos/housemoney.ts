// "Democrats win the House: what it changes for your money". Posted 4 Nov 2026 after CNN's projection.
// Sources: CNN live updates 3-4 Nov 2026 (projection); Fortune 3 Nov 2026 (funding runs out 11 Dec; debt ~$40tn; debt limit 2027);
// Aviation Week 24 Jun 2026 ($67.1bn Pentagon request); US Constitution Art. I s.7 (revenue bills originate in the House), Art. I s.7 (2/3 veto override);
// 20th Amendment (Congress meets 3 Jan); Fortune (Supreme Court struck down emergency tariffs; Section 301 structure).
import {Recipe} from '../template';
import t from './HouseMoney.timing.json';

const timed = (r: Recipe, tt: {dur: number; cues: number[]}[], audio: string): Recipe => ({...r, audio, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});

export const houseMoney: Recipe = timed({
  id: 'HouseMoney',
  channel: 'THE SUM OF IT',
  thumb: {kicker: 'US MIDTERMS · CNN PROJECTION', from: 'Democrats win', link: 'the House. Next:', to: '$67.1bn', foot: 'the war bill now needs their votes'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'US midterms · CNN projection', lines: ['Democrats win', '*the House.*'], question: "What it does, and doesn't, change for your money."},
    {type: 'reveal', dur: 300, kicker: 'Two dates to know', punch: 'The first fight comes\n*before the new House arrives.*', items: [
      {label: 'NEW HOUSE SWORN IN', value: '3 Jan', color: 'paper'},
      {label: 'FEDERAL FUNDING RUNS OUT', value: '11 Dec', color: 'alert'},
    ]},
    {type: 'reveal', dur: 300, kicker: 'The Iran war bill', punch: 'From January, it would need\n*Democratic votes.*', items: [
      {label: 'PENTAGON REQUEST', value: '$67.1bn', color: 'accent'},
    ]},
    {type: 'people', dur: 330, kicker: 'Also needs the House', people: [
      {name: 'Tax bills', color: 'paper', tag: 'US CONSTITUTION', note: 'Must start in the House.', statLabel: 'ARTICLE', stat: 'I'},
      {name: 'Debt limit', color: 'alert', tag: 'DUE AGAIN IN 2027', note: 'National debt near $40 trillion.', statLabel: 'DEBT', stat: '$40tn'},
    ]},
    {type: 'people', dur: 360, kicker: "What it can't easily change", people: [
      {name: 'Tariffs', color: 'muted', tag: 'SET MOSTLY BY THE PRESIDENT', note: 'Changing them needs a law, and a veto can block it.', statLabel: 'TO OVERRIDE A VETO', stat: '2/3'},
      {name: 'Gas prices', color: 'muted', tag: 'FOLLOW OIL AND THE WAR', note: 'Not set by Congress.', statLabel: 'DRIVEN BY', stat: 'Oil'},
    ]},
    {type: 'hook', dur: 120, kicker: 'Still counting', lines: ['The Senate:', '*too close to call.*']},
    {type: 'outro', dur: 150, lines: 'The election is over.\n*The budget fights are just beginning.*',
      disclaimer: 'House: CNN projection, 4 Nov 2026. Funding deadline and debt: Fortune, 3 Nov 2026. Pentagon request: $67.1bn (24 Jun 2026). US Constitution, Art. I s.7. Figures only; no endorsement.'},
  ],
}, t as {dur: number; cues: number[]}[], 'audio/HouseMoney.mp3');
