// Week 2 Shorts (#1-3). Figures from batch2.data.json (calc/batch2.py); timings from calc/timing.py.
import {Recipe} from '../template';
import d from '../batch2.data.json';
import tEarly from './EarlyStart.timing.json';
import tDaily from './Daily.timing.json';
import tRate from './Rate.timing.json';

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
const CH = 'MONEY, IN DATA';
const timed = (r: Recipe, t: {dur: number; cues: number[]}[], audio: string): Recipe => ({
  ...r, audio, scenes: r.scenes.map((s, i) => ({...s, ...t[i]})),
});

// ---------- 1. Start at 25 or 35 ----------
const e = d.early;
const m65 = e.maya['65'], l65 = e.leo['65'];
export const earlyStart: Recipe = timed({
  id: 'EarlyStart',
  channel: CH,
  thumb: {kicker: 'SAVE FOR 10 YEARS FROM 25', from: '$24,000', to: fmt(m65), foot: 'beats $72,000 started at 35'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'Same $200 a month', lines: ['One saves for\n*10 years.*', 'One saves for\n30 years.'], question: 'Who ends up with more?'},
    {
      type: 'people', dur: 300, kicker: 'Meet the savers', footnote: 'Both earn 7% a year on average.',
      people: [
        {name: 'Maya', color: 'accent', tag: 'AGE 25 → 35', note: 'Saves for 10 years, then stops. Never adds another cent.', statLabel: 'TOTAL PUT IN', stat: '$24,000'},
        {name: 'Leo', color: 'paper', tag: 'AGE 35 → 65', note: 'Starts at 35. Saves every month for 30 years.', statLabel: 'TOTAL PUT IN', stat: '$72,000'},
      ],
    },
    {
      type: 'race', dur: 400, kicker: 'The race', xLabel: 'AGE', xStart: 25, xEnd: 65, xTicks: [25, 35, 45, 55, 65],
      yMax: 300000, yTicks: [0, 100000, 200000, 300000], marker: 35,
      series: [
        {name: 'Maya', color: 'accent', data: e.maya},
        {name: 'Leo', color: 'paper', data: e.leo, startAt: 35},
      ],
      notes: [
        {at: 34, text: 'Maya stops saving', x: 25.5, yValue: 290000, color: 'accent'},
        {at: 36, text: 'Leo starts →', x: 25.5, yValue: 250000, color: 'muted'},
        {at: 52, text: 'Leo never catches up', x: 36.5, yValue: 200000, color: 'paper'},
      ],
    },
    {
      type: 'reveal', dur: 300, kicker: 'At age 65',
      items: [
        {label: 'MAYA · PUT IN $24,000', value: fmt(m65), color: 'accent'},
        {label: 'LEO · PUT IN $72,000', value: fmt(l65), color: 'paper'},
      ],
      punch: 'A third of the effort.\n*More money.*',
    },
    {
      type: 'bars', dur: 270, kicker: 'Why?', title: 'Growth earns *growth.*', max: 300000,
      bars: [
        {label: 'Maya', color: 'accent', base: 24000, extra: m65 - 24000, caption: `$24,000 in · ${fmt(m65 - 24000)} growth`},
        {label: 'Leo', color: 'paper', base: 72000, extra: l65 - 72000, caption: `$72,000 in · ${fmt(l65 - 72000)} growth`},
      ],
      body: "Maya's money had *10 extra years*\nto compound.",
    },
    {
      type: 'outro', dur: 150, lines: 'The best time to start\nwas yesterday.\n*The next best is today.*',
      disclaimer: 'Illustration only: $200 a month, steady 7% yearly return,\ncompounded monthly, before fees, tax and inflation.\nReal returns vary. Not financial advice.',
    },
  ],
}, tEarly, 'audio/EarlyStart.mp3');

// ---------- 2. $1, $10 or $20 a day ----------
const dd = d.daily;
export const daily: Recipe = timed({
  id: 'Daily',
  channel: CH,
  thumb: {kicker: 'INVESTED FOR 40 YEARS', from: '$20 a day', to: '$1.6M', foot: 'at 7% a year'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'Small daily amounts', lines: ['$1 a day.', '$10 a day.', '*$20 a day.*'], question: 'For 40 years. What does each become?'},
    {
      type: 'people', dur: 300, kicker: 'Three savers', footnote: 'All invested at 7% a year.',
      people: [
        {name: '$1 a day', color: 'muted', tag: 'ABOUT $30 A MONTH', note: 'Invested every month for 40 years.', statLabel: 'PUT IN', stat: '$14,600'},
        {name: '$10 a day', color: 'paper', tag: 'ABOUT $304 A MONTH', note: 'Invested every month for 40 years.', statLabel: 'PUT IN', stat: '$146,000'},
        {name: '$20 a day', color: 'accent', tag: 'ABOUT $608 A MONTH', note: 'Invested every month for 40 years.', statLabel: 'PUT IN', stat: '$292,000'},
      ],
    },
    {
      type: 'race', dur: 400, kicker: '40 years at 7%', xLabel: 'YEARS', xStart: 0, xEnd: 40, xTicks: [0, 10, 20, 30, 40],
      yMax: 1700000, yTicks: [0, 500000, 1000000, 1500000],
      series: [
        {name: '$20/day', color: 'accent', data: dd['20']},
        {name: '$10/day', color: 'paper', data: dd['10']},
        {name: '$1/day', color: 'muted', data: dd['1']},
      ],
      notes: [
        {at: 8, text: 'First decade: barely moving', x: 1, yValue: 1550000, color: 'muted'},
        {at: 24, text: 'Then compounding\ntakes over', x: 1, yValue: 1250000, color: 'accent'},
      ],
    },
    {
      type: 'reveal', dur: 400, kicker: 'After 40 years',
      items: [
        {label: '$1 A DAY', value: fmt(dd['1']['40']), color: 'muted'},
        {label: '$10 A DAY', value: fmt(dd['10']['40']), color: 'paper'},
        {label: '$20 A DAY', value: fmt(dd['20']['40']), color: 'accent'},
      ],
      punch: 'A lunch out a day.\n*A $1.6M retirement fund.*',
    },
    {
      type: 'outro', dur: 150, lines: 'Small amounts.\nLong time.\n*Big numbers.*',
      disclaimer: 'Illustration only: steady 7% yearly return, compounded\nmonthly, before fees, tax and inflation.\nReal returns vary. Not financial advice.',
    },
  ],
}, tDaily, 'audio/Daily.mp3');

// ---------- 3. 7% vs 8% ----------
const r = d.rate;
const gap = r['8']['40'] - r['7']['40'];
export const rateGap: Recipe = timed({
  id: 'Rate',
  channel: CH,
  thumb: {kicker: 'OVER 40 YEARS', from: '7% vs 8%', link: 'is worth', to: fmt(gap), foot: 'difference on $300 a month'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'One percentage point', lines: ['*7%* or *8%?*', 'Over 40 years.'], question: 'How much can 1% really matter?'},
    {
      type: 'people', dur: 300, kicker: 'Meet the investors', footnote: 'Same money. Same 40 years.',
      people: [
        {name: 'Priya', color: 'paper', tag: 'EARNS 7% A YEAR', note: 'Invests $300 a month for 40 years.', statLabel: 'PUT IN', stat: '$144,000'},
        {name: 'Tom', color: 'accent', tag: 'EARNS 8% A YEAR', note: 'Invests the same $300 a month.', statLabel: 'PUT IN', stat: '$144,000'},
      ],
    },
    {
      type: 'race', dur: 400, kicker: 'Watch the gap', xLabel: 'YEARS', xStart: 0, xEnd: 40, xTicks: [0, 10, 20, 30, 40],
      yMax: 1200000, yTicks: [0, 300000, 600000, 900000, 1200000],
      series: [
        {name: 'Tom · 8%', color: 'accent', data: r['8']},
        {name: 'Priya · 7%', color: 'paper', data: r['7']},
      ],
      notes: [
        {at: 8, text: 'Almost on top of each other', x: 1, yValue: 1120000, color: 'muted'},
        {at: 26, text: 'The gap compounds too', x: 1, yValue: 960000, color: 'accent'},
      ],
    },
    {
      type: 'reveal', dur: 400, kicker: 'After 40 years',
      items: [
        {label: 'PRIYA · 7% A YEAR', value: fmt(r['7']['40']), color: 'paper'},
        {label: 'TOM · 8% A YEAR', value: fmt(r['8']['40']), color: 'accent'},
      ],
      punch: `One percentage point.\n*${fmt(gap)} more.*`,
    },
    {
      type: 'outro', dur: 150, lines: 'Small percentages.\n*Big money.*',
      disclaimer: 'Illustration only: $300 a month, steady yearly returns,\ncompounded monthly, before fees, tax and inflation.\nReal returns vary. Not financial advice.',
    },
  ],
}, tRate, 'audio/Rate.mp3');
