// Batch 7 (Nov 2026): Money in South Africa, in rands. Figures from calc/batch7.py.
// Sources: SARB MPC (repo 7.25%, prime 10.75% from 23 Sep 2026; next decision 19 Nov 2026),
// Jan 2026 prime 10.25% (repo 6.75%). Bond maths: 20 years, monthly.
import {Recipe} from '../template';
import d from '../batch7.data.json';
import tRH from './RateHikes.timing.json';
import tBE from './BondExtra.timing.json';

type T = {dur: number; cues: number[]}[];
const timed = (r: Recipe, tt: T): Recipe => ({...r, audio: `audio/${r.id}.mp3`, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});
const R = (n: number) => 'R' + Math.round(n).toLocaleString('en-US');
const CH = 'THE SUM OF IT';
const BOND = 'Illustration: R1.5 million home loan over 20 years, rate fixed at the level shown, monthly repayments.\nBanks may price your bond above or below prime. Not financial advice.';

export const rateHikes = timed({
  id: 'RateHikes', channel: CH, currency: 'R',
  thumb: {kicker: 'R1.5M BOND · 20 YEARS', from: 'Two rate hikes in 2026:', link: 'the same bond now costs', to: `+${R(d.hike.p1075 - d.hike.p1025)}`, foot: 'a month'},
  scenes: [
    {type: 'hook', dur: 120, kicker: 'R1.5 million bond · 20 years', lines: ['Two rate hikes.', '*What did they cost?*']},
    {type: 'reveal', dur: 450, kicker: 'Same bond, monthly repayment', punch: 'Hikes in May\n*and September.*', items: [
      {label: 'JANUARY · PRIME 10.25%', value: R(d.hike.p1025), color: 'paper'},
      {label: 'NOW · PRIME 10.75%', value: R(d.hike.p1075), color: 'alert'},
    ]},
    {type: 'reveal', dur: 400, kicker: 'The difference', punch: `Each 0.25% ≈\n*${R(d.hike.per25)} a month.*`, items: [
      {label: 'EVERY MONTH', value: `+${R(d.hike.p1075 - d.hike.p1025)}`, color: 'alert'},
      {label: 'OVER 20 YEARS', value: 'R120,000+', color: 'alert'},
    ]},
    {type: 'outro', dur: 150, lines: 'Next decision:\n*19 November.*', disclaimer: BOND + '\nSource: SA Reserve Bank (repo 7.25%, prime 10.75% from 23 Sep 2026).'},
  ],
}, tRH as T);

export const bondExtra = timed({
  id: 'BondExtra', channel: CH, currency: 'R',
  thumb: {kicker: 'R1.5M BOND · 10.75%', from: 'Add R1,000 a month:', link: 'paid off 3.5 years sooner, and', to: R(d.extra.saved), foot: 'less interest'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'R1.5 million bond · 10.75% · 20 years', lines: [R(d.extra.pay), '*a month.*']},
    {type: 'reveal', dur: 300, kicker: 'Interest over 20 years', punch: 'More than\n*the house.*', items: [
      {label: 'TOTAL INTEREST', value: R(d.extra.int_base), color: 'alert'},
    ]},
    {type: 'people', dur: 400, kicker: 'Same bond', footnote: `Paid off ${d.extra.saved_m / 12} years sooner.`, people: [
      {name: 'Standard', color: 'paper', tag: R(d.extra.pay) + ' A MONTH', note: '20 years.', statLabel: 'INTEREST', stat: R(d.extra.int_base)},
      {name: '+R1,000', color: 'accent', tag: R(d.extra.pay + 1000) + ' A MONTH', note: `${Math.floor(d.extra.months / 12)} years ${d.extra.months % 12} months.`, statLabel: 'INTEREST', stat: R(d.extra.int_extra)},
    ]},
    {type: 'outro', dur: 150, lines: `R1,000 a month.\n*${R(d.extra.saved)} back.*`, disclaimer: 'Illustration: R1.5 million over 20 years at 10.75% (prime, Nov 2026), fixed, extra paid monthly.\nCheck your bank’s terms. Not financial advice.'},
  ],
}, tBE as T);
