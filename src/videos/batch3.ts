// Week 3 Shorts (#4-6). Figures from batch3.data.json (calc/batch3.py); timings from calc/timing.py.
import {Recipe} from '../template';
import d from '../batch3.data.json';
import tPenny from './Penny.timing.json';
import tMillion from './Million.timing.json';
import tStore from './StoreCard.timing.json';

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
const CH = 'MONEY, IN DATA';
const timed = (r: Recipe, t: {dur: number; cues: number[]}[], audio: string): Recipe => ({
  ...r, audio, scenes: r.scenes.map((s, i) => ({...s, ...t[i]})),
});

// ---------- 4. A penny doubled every day for 30 days ----------
const p30 = d.penny['30'], p29 = d.penny['29'];
export const penny: Recipe = timed({
  id: 'Penny',
  channel: CH,
  thumb: {kicker: 'DOUBLED DAILY FOR 30 DAYS', from: '$0.01', to: '$5.37M', foot: 'beats $1 million today'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'The classic question', lines: ['$1,000,000\n*today.*', 'Or a penny, doubled\nevery day for 30 days.'], question: 'Which would you take?'},
    {
      type: 'people', dur: 300, kicker: 'Two choices', footnote: 'Same 30 days. No more money added.',
      people: [
        {name: 'Jordan', color: 'paper', tag: 'TAKES THE MILLION', note: 'Gets $1,000,000 on day one. Keeps it.', statLabel: 'DAY 1', stat: '$1,000,000'},
        {name: 'Riley', color: 'accent', tag: 'TAKES THE PENNY', note: 'Starts with one cent. It doubles every day.', statLabel: 'DAY 1', stat: '$0.01'},
      ],
    },
    {
      type: 'race', dur: 400, kicker: 'Watch the race', xLabel: 'DAY', xStart: 0, xEnd: 30, xTicks: [0, 10, 20, 30],
      yMax: 6000000, yTicks: [0, 2000000, 4000000, 6000000],
      series: [
        {name: 'Riley · penny', color: 'accent', data: d.penny},
        {name: 'Jordan · $1M', color: 'paper', data: d.million},
      ],
      notes: [
        {at: 20, text: `Day 20: just ${fmt(d.penny['20'])}`, x: 1, yValue: 5600000, color: 'muted'},
        {at: 28, text: 'Day 28: passes\nthe million', x: 1, yValue: 4600000, color: 'accent'},
      ],
    },
    {
      type: 'reveal', dur: 300, kicker: 'On day 30',
      items: [
        {label: 'JORDAN · TOOK THE MILLION', value: fmt(1000000), color: 'paper'},
        {label: 'RILEY · TOOK THE PENNY', value: fmt(p30), color: 'accent'},
      ],
      punch: 'More than *5×*\nthe million.',
    },
    {
      type: 'bars', dur: 270, kicker: 'Where it came from', title: 'Half of it arrived\non the *last day.*', max: 6000000,
      bars: [
        {label: 'Riley', color: 'accent', base: p29, extra: p30 - p29, caption: '$2.68M by day 29 · $2.68M on day 30'},
        {label: 'Jordan', color: 'paper', base: 1000000, extra: 0, caption: '$1M on day 1 · $1M on day 30'},
      ],
      body: 'Slow, slow,\nthen *sudden.*',
    },
    {
      type: 'outro', dur: 150, lines: 'Real money doesn\'t double daily.\nBut the curve looks the same.\n*Give it time.*',
      disclaimer: 'Thought experiment: one cent doubled once a day, day 1 to day 30.\nNo real investment grows like this. Not financial advice.',
    },
  ],
}, tPenny, 'audio/Penny.mp3');

// ---------- 5. How much a month for $1M by 65? ----------
const b = d.by65;
export const million: Recipe = timed({
  id: 'Million',
  channel: CH,
  thumb: {kicker: 'TO HAVE $1M BY 65', from: 'Start at 25', link: 'needs', to: `${fmt(b['25'].monthly)}/mo`, foot: `start at 45: ${fmt(b['45'].monthly)}/mo`},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'The million-dollar question', lines: ['$1,000,000\nby *65.*', 'How much\na month?'], question: 'It depends on when you start.'},
    {
      type: 'people', dur: 300, kicker: 'Three savers', footnote: 'All invest every month and earn 7% a year.',
      people: [
        {name: 'Ana', color: 'accent', tag: 'STARTS AT 25', note: 'Invests every month until 65.', statLabel: 'YEARS TO GO', stat: '40'},
        {name: 'Ben', color: 'paper', tag: 'STARTS AT 35', note: 'Invests every month until 65.', statLabel: 'YEARS TO GO', stat: '30'},
        {name: 'Cleo', color: 'alert', tag: 'STARTS AT 45', note: 'Invests every month until 65.', statLabel: 'YEARS TO GO', stat: '20'},
      ],
    },
    {
      type: 'race', dur: 400, kicker: 'The race to $1M', xLabel: 'AGE', xStart: 25, xEnd: 65, xTicks: [25, 35, 45, 55, 65],
      yMax: 1000000, yTicks: [0, 250000, 500000, 750000, 1000000],
      series: [
        {name: 'Ana', color: 'accent', data: b['25'].curve},
        {name: 'Ben', color: 'paper', data: b['35'].curve, startAt: 35},
        {name: 'Cleo', color: 'alert', data: b['45'].curve, startAt: 45},
      ],
      notes: [
        {at: 46, text: 'Cleo starts at 45', x: 26, yValue: 920000, color: 'alert'},
        {at: 60, text: 'All three reach\n$1M at 65', x: 26, yValue: 780000, color: 'accent'},
      ],
    },
    {
      type: 'reveal', dur: 300, kicker: 'Needed each month',
      items: [
        {label: 'ANA · FROM 25', value: fmt(b['25'].monthly), color: 'accent'},
        {label: 'BEN · FROM 35', value: fmt(b['35'].monthly), color: 'paper'},
        {label: 'CLEO · FROM 45', value: fmt(b['45'].monthly), color: 'alert'},
      ],
      punch: 'Wait ten years:\n*more than double.*',
    },
    {
      type: 'bars', dur: 270, kicker: 'Same million', title: 'Same million.\nDifferent *effort.*', max: 1000000,
      bars: [
        {label: 'Ana', color: 'accent', base: b['25'].put_in, extra: 1000000 - b['25'].put_in, caption: `${fmt(b['25'].put_in)} in · ${fmt(1000000 - b['25'].put_in)} growth`},
        {label: 'Cleo', color: 'alert', base: b['45'].put_in, extra: 1000000 - b['45'].put_in, caption: `${fmt(b['45'].put_in)} in · ${fmt(1000000 - b['45'].put_in)} growth`},
      ],
      body: 'The difference\nis *time.*',
    },
    {
      type: 'outro', dur: 150, lines: 'Every 10 years you wait\nmore than doubles it.\n*Start with what you can.*',
      disclaimer: 'Illustration only: steady 7% yearly return, compounded\nmonthly, before fees, tax and inflation.\nReal returns vary. Not financial advice.',
    },
  ],
}, tMillion, 'audio/Million.mp3');

// ---------- 6. A $1,000 store card at 29% ----------
const s = d.store;
export const storeCard: Recipe = timed({
  id: 'StoreCard',
  channel: CH,
  thumb: {kicker: 'MINIMUM PAYMENTS ON', from: '$1,000', link: 'takes', to: '7 years', foot: `and ${fmt(s.min.interest)} in interest`},
  scenes: [
    {type: 'hook', dur: 150, kicker: '29% interest', lines: ['$1,000 on a\n*store card.*', 'Pay the minimum.'], question: "How long until it's gone?"},
    {
      type: 'people', dur: 300, kicker: 'Same debt. Two plans', footnote: '29% interest a year. No new spending.',
      people: [
        {name: 'Sam', color: 'alert', tag: 'PAYS THE MINIMUM', note: 'Starts at ~$34 a month, shrinking as the balance falls.', statLabel: 'FIRST PAYMENT', stat: `$${s.min.first.toFixed(2)}`},
        {name: 'Alex', color: 'accent', tag: 'PAYS $50 A MONTH', note: 'Same card, same debt. A fixed $50, every month.', statLabel: 'EVERY MONTH', stat: '$50'},
      ],
    },
    {
      type: 'race', dur: 400, kicker: 'Balance left', xLabel: 'MONTHS', xStart: 0, xEnd: 84, xTicks: [0, 12, 24, 36, 48, 60, 72, 84],
      yMax: 1000, yTicks: [0, 250, 500, 750, 1000],
      series: [
        {name: 'Sam', color: 'alert', data: s.min.curve},
        {name: 'Alex', color: 'accent', data: s.fixed.curve},
      ],
      notes: [
        {at: 29, text: `Alex: clear in\n${s.fixed.months} months`, x: 31, yValue: 400, color: 'accent'},
        {at: 60, text: 'Sam is still paying…', x: 46, yValue: 990, color: 'alert'},
      ],
    },
    {
      type: 'reveal', dur: 300, kicker: 'Interest paid',
      items: [
        {label: `SAM · ${s.min.months} MONTHS`, value: fmt(s.min.interest), color: 'alert'},
        {label: `ALEX · ${s.fixed.months} MONTHS`, value: fmt(s.fixed.interest), color: 'accent'},
      ],
      punch: 'More interest than\nthe *purchase itself.*',
    },
    {
      type: 'bars', dur: 270, kicker: 'Where the money went', title: `$16 more a month\nsaved *${fmt(s.min.interest - s.fixed.interest)}.*`, max: 2300,
      bars: [
        {label: 'Sam', color: 'alert', base: 1000, extra: s.min.interest, caption: `$1,000 debt · ${fmt(s.min.interest)} interest`},
        {label: 'Alex', color: 'accent', base: 1000, extra: s.fixed.interest, caption: `$1,000 debt · ${fmt(s.fixed.interest)} interest`},
      ],
      body: 'Store cards often charge\nsome of the *highest rates.*',
    },
    {
      type: 'outro', dur: 150, lines: 'Check the rate.\n*Pay more than the minimum.*',
      disclaimer: 'Illustration only: $1,000 balance, 29% APR, no new spending.\nMinimum = interest + 1% of balance (at least $25).\nCard terms vary. Not financial advice.',
    },
  ],
}, tStore, 'audio/StoreCard.mp3');
