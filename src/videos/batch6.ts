// Batch 6 (Nov 2026): Episode 2 spin-offs + seasonal. Figures from calc/batch6.py, calc/ep2.py.
import {Recipe} from '../template';
import d from '../batch6.data.json';
import e2 from '../ep2.data.json';
import tAv from './Avalanche.timing.json';
import tZ from './ZeroTrap.timing.json';
import tS from './StopPaying.timing.json';
import tL from './LumpSum.timing.json';
import tH from './Holiday.timing.json';
import tB from './BlackFriday.timing.json';
import tR from './RealRaise.timing.json';

type T = {dur: number; cues: number[]}[];
const timed = (r: Recipe, tt: T): Recipe => ({...r, audio: `audio/${r.id}.mp3`, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});
const $ = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
const CH = 'THE SUM OF IT';
const GROWTH = 'Illustration only: assumes a steady 7% yearly return,\ncompounded monthly, before fees, tax and inflation.\nReal returns vary. Not financial advice.';
const CARD = 'Illustration: 22% APR, compounded monthly. Minimum = month’s interest + 1% of balance.\nReal card terms vary. Not financial advice.';

export const avalanche = timed({
  id: 'Avalanche', channel: CH,
  thumb: {kicker: '3 DEBTS · $12,500', from: 'Avalanche vs snowball:', link: 'both beat the minimums by', to: '$2,200+', foot: 'which debt to pay first'},
  scenes: [
    {type: 'hook', dur: 150, kicker: '3 debts · $12,500', lines: ['Which debt', '*first?*']},
    {type: 'people', dur: 400, kicker: 'Three debts', footnote: 'Minimums only: 52 months, $3,410 interest.', people: [
      {name: 'Card A', color: 'alert', tag: '22% A YEAR', note: 'Minimum $90.', statLabel: 'OWED', stat: '$3,000'},
      {name: 'Card B', color: 'paper', tag: '18% A YEAR', note: 'Minimum $45.', statLabel: 'OWED', stat: '$1,500'},
      {name: 'Car loan', color: 'paper', tag: '7% A YEAR', note: 'Minimum $200.', statLabel: 'OWED', stat: '$8,000'},
    ]},
    {type: 'hook', dur: 90, kicker: 'The plan', lines: ['Add *$300 a month.*']},
    {type: 'people', dur: 450, kicker: 'One debt at a time', footnote: 'Both: debt-free in 22 months.', people: [
      {name: 'Avalanche', color: 'accent', tag: 'HIGHEST RATE FIRST', note: 'First debt gone in 9 months.', statLabel: 'INTEREST', stat: '$1,163'},
      {name: 'Snowball', color: 'paper', tag: 'SMALLEST BALANCE FIRST', note: 'First debt gone in 5 months.', statLabel: 'INTEREST', stat: '$1,203'},
    ]},
    {type: 'outro', dur: 150, lines: 'Avalanche saves money.\n*Snowball gives you a win.*', disclaimer: 'Illustration: minimums $335 a month plus $300 extra, monthly compounding.\nFrom Episode 2, Interest works both ways. Not financial advice.'},
  ],
}, tAv as T);

export const zeroTrap = timed({
  id: 'ZeroTrap', channel: CH,
  thumb: {kicker: '0% FOR 12 MONTHS', from: '$3,000 at $150 a month', link: 'leaves you owing', to: '$1,200', foot: 'when the rate jumps to 22%'},
  scenes: [
    {type: 'hook', dur: 150, kicker: '0% for 12 months', lines: ['Sounds free.', '*It can be.*'], question: 'If you clear it in time.'},
    {type: 'reveal', dur: 300, kicker: 'Spend $3,000 · pay $150 a month', punch: 'Still owed\n*when the offer ends.*', items: [
      {label: 'AFTER 12 MONTHS', value: '$1,200', color: 'alert'},
    ]},
    {type: 'reveal', dur: 300, kicker: 'Then the rate jumps to 22%', punch: '9 more months.\n*$110 of interest.*', items: [
      {label: 'NEW RATE', value: '22%', color: 'alert'},
    ]},
    {type: 'reveal', dur: 300, kicker: 'The fix', punch: 'Divide the balance\n*by the months you have.*', items: [
      {label: '$3,000 ÷ 12 MONTHS', value: '$250', color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: 'Done before\n*the clock runs out.*', disclaimer: 'Illustration: 0% for 12 months, then 22% APR compounded monthly.\nCheck your card’s terms. Not financial advice.'},
  ],
}, tZ as T);

export const stopPaying = timed({
  id: 'StopPaying', channel: CH,
  thumb: {kicker: '$5,000 · 22% CARD', from: 'Stop paying,', link: 'and in 5 years it becomes', to: '$14,872', foot: 'nearly triple'},
  scenes: [
    {type: 'hook', dur: 120, kicker: '$5,000 · 22% credit card', lines: ['What if you', '*stop paying?*']},
    {type: 'hook', dur: 150, kicker: 'Interest on interest', lines: ['Interest is added every month.', '*Then charged interest too.*']},
    {type: 'race', dur: 400, kicker: 'Balance, no payments', xLabel: 'YEARS', xStart: 0, xEnd: 5, xTicks: [0, 1, 2, 3, 4, 5], yMax: 16000, yTicks: [0, 4000, 8000, 12000, 16000],
      series: [{name: 'Balance', color: 'alert', data: e2.stop}],
      notes: [{at: 4.9, text: 'Year 5: $14,872.\nNearly triple.', x: 0.3, yValue: 14500, color: 'alert'}]},
    {type: 'outro', dur: 150, lines: 'Compounding,\n*working against you.*', disclaimer: 'Illustration: 22% APR compounded monthly, no payments and no fees.\nPenalty rates and fees can make it worse. Not financial advice.'},
  ],
}, tS as T);

export const lumpSum = timed({
  id: 'LumpSum', channel: CH,
  thumb: {kicker: '$10,000 · INVESTED ONCE', from: 'Never touched', link: 'for 40 years at 7%:', to: $(d.lump['40']), foot: 'doubling roughly every 10 years'},
  scenes: [
    {type: 'hook', dur: 120, kicker: '$10,000 · invested once', lines: ['Invested once.', '*Never touched.*']},
    {type: 'rank', dur: 450, kicker: '$10,000 at 7% a year', max: 170000, footnote: 'Doubling roughly *every 10 years.*', rows: [
      {label: '10 years', value: d.lump['10'], display: $(d.lump['10']), color: 'paper'},
      {label: '20 years', value: d.lump['20'], display: $(d.lump['20']), color: 'paper'},
      {label: '30 years', value: d.lump['30'], display: $(d.lump['30']), color: 'paper'},
      {label: '40 years', value: d.lump['40'], display: $(d.lump['40']), color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: 'The money did\n*all the work.*', disclaimer: GROWTH},
  ],
}, tL as T);

export const holiday = timed({
  id: 'Holiday', channel: CH,
  thumb: {kicker: '$1,000 OF GIFTS · 22% CARD', from: 'Paying the minimum', link: 'takes almost 6 years and costs', to: '$766', foot: 'in interest'},
  scenes: [
    {type: 'hook', dur: 120, kicker: '$1,000 holiday shopping · 22% card', lines: ['$1,000 of gifts.', '*On a credit card.*']},
    {type: 'people', dur: 400, kicker: 'Same $1,000', people: [
      {name: 'Minimum', color: 'alert', tag: 'PAYS THE MINIMUM', note: 'Almost 6 years to clear.', statLabel: 'INTEREST', stat: '$766'},
      {name: '$100 a month', color: 'accent', tag: 'FIXED PAYMENT', note: 'Gone in 12 months.', statLabel: 'INTEREST', stat: '$115'},
    ]},
    {type: 'reveal', dur: 150, kicker: 'Same gifts', punch: '*$651* apart.', items: [
      {label: 'THE DIFFERENCE', value: '$651', color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: 'Budget before you shop.\n*Plan before you swipe.*', disclaimer: CARD},
  ],
}, tH as T);

export const blackFriday = timed({
  id: 'BlackFriday', channel: CH,
  thumb: {kicker: '50% OFF', from: 'Didn’t plan to buy it?', link: 'You didn’t save $200. Invested instead:', to: '$808', foot: 'in 20 years'},
  scenes: [
    {type: 'hook', dur: 150, kicker: '50% off', lines: ['$400 item.', '*Now $200.*'], question: 'You just saved $200. Or did you?'},
    {type: 'reveal', dur: 200, kicker: 'If it wasn’t on your list', punch: 'You didn’t save $200.\n*You spent $200.*', items: [
      {label: 'SAVED', value: '$0', color: 'muted'},
      {label: 'SPENT', value: '$200', color: 'alert'},
    ]},
    {type: 'reveal', dur: 300, kicker: '$200 invested · 7% · 20 years', punch: 'A discount only saves money\n*on what you’d buy anyway.*', items: [
      {label: 'INSTEAD', value: '$808', color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: 'Make the list\n*before the sale.*', disclaimer: GROWTH},
  ],
}, tB as T);

export const realRaise = timed({
  id: 'RealRaise', channel: CH,
  thumb: {kicker: '2% RAISES · 4% INFLATION', from: '$50,000 becomes $55,204', link: 'but in today’s money:', to: $(d.real.real5), foot: 'going backwards'},
  scenes: [
    {type: 'hook', dur: 120, kicker: '2% raises · 4% inflation', lines: ['A raise every year.', '*Sounds like progress.*']},
    {type: 'hook', dur: 120, kicker: 'But', lines: ['Prices rising faster?', '*You’re going backwards.*']},
    {type: 'reveal', dur: 350, kicker: '$50,000 salary · after 5 years', punch: 'A real raise\n*beats inflation.*', items: [
      {label: 'ON YOUR PAYSLIP', value: $(d.real.nominal5), color: 'paper'},
      {label: 'IN TODAY’S MONEY', value: $(d.real.real5), color: 'alert'},
    ]},
    {type: 'outro', dur: 150, lines: 'Check the number,\n*not just the raise.*', disclaimer: 'Illustration: steady 2% raises and 4% inflation a year.\nReal figures vary. Not financial advice.'},
  ],
}, tR as T);
