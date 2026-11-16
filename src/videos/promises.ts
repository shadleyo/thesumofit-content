// "5 promises vs the numbers". 4 Nov 2026. Quotes and data: CBS News "Trump promised to lower prices..." (updated 14 Oct 2026):
// gas $4.37 (9 Oct); food at home +4% since Nov 2024 (CPI); 30-yr mortgage 7.28% vs 7.04% at inauguration (Freddie Mac);
// residential electricity +12.5% Dec 2024-Jul (EIA); credit card 21.58% -> 20.94% (Fed G.19); drugs -3.9% from Feb 2025 peak.
// Inflation 3.7% annual: AP Fact Focus, 21 Oct 2026.
import {Recipe} from '../template';
import t from './Promises.timing.json';

const timed = (r: Recipe, tt: {dur: number; cues: number[]}[], audio: string): Recipe => ({...r, audio, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});

export const promises: Recipe = timed({
  id: 'Promises',
  channel: 'THE SUM OF IT',
  thumb: {kicker: 'US ECONOMY · CAMPAIGN 2024', from: 'Promised: petrol', link: 'below $2 a gallon. Now:', to: '$4.37', foot: '5 promises vs the numbers'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'US economy · 2024 campaign', lines: ['Five promises', '*about prices.*'], question: 'Each one, next to the latest official number.'},
    {type: 'reveal', dur: 300, kicker: '1 · Petrol', punch: 'The Iran war\n*pushed oil up this year.*', items: [
      {label: 'PROMISE', value: 'Under $2', color: 'muted'},
      {label: 'NOW · US AVERAGE', value: '$4.37', color: 'alert'},
    ]},
    {type: 'reveal', dur: 300, kicker: '2 · Groceries', punch: '“Your groceries\n*will be cheaper.*”', items: [
      {label: 'PROMISE', value: 'Cheaper', color: 'muted'},
      {label: 'FOOD AT HOME · SINCE NOV 2024', value: '+4%', color: 'alert'},
    ]},
    {type: 'reveal', dur: 300, kicker: '3 · Mortgages', punch: 'Higher than\n*when he took office.*', items: [
      {label: 'PROMISE', value: '2%', color: 'muted'},
      {label: 'NOW · 30-YEAR AVERAGE', value: '7.28%', color: 'alert'},
    ]},
    {type: 'reveal', dur: 300, kicker: '4 · Electricity', punch: 'Promised:\n*cut prices by half.*', items: [
      {label: 'PROMISE', value: '−50%', color: 'muted'},
      {label: 'RESIDENTIAL COSTS', value: '+12.5%', color: 'alert'},
    ]},
    {type: 'reveal', dur: 300, kicker: '5 · Inflation', punch: 'The Fed’s target\n*is 2%.*', items: [
      {label: 'PROMISE', value: 'Defeat it', color: 'muted'},
      {label: 'LATEST ANNUAL RATE', value: '3.7%', color: 'alert'},
    ]},
    {type: 'people', dur: 300, kicker: 'Moved the promised way', people: [
      {name: 'Credit cards', color: 'accent', tag: 'AVERAGE RATE', note: 'Down from 21.58%.', statLabel: 'NOW', stat: '20.94%'},
      {name: 'Drug prices', color: 'accent', tag: 'FROM FEB 2025 PEAK', note: 'Down almost 4%.', statLabel: 'CHANGE', stat: '−3.9%'},
    ]},
    {type: 'outro', dur: 150, lines: 'Five promises. The numbers are public.\n*You decide.*',
      disclaimer: 'Quotes and data: CBS News (Oct 2026) citing BLS CPI, EIA, Freddie Mac, Fed G.19. Inflation: AP, 21 Oct 2026. Figures only; no endorsement.'},
  ],
}, t as {dur: number; cues: number[]}[], 'audio/Promises.mp3');
