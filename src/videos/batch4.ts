// Batch 4 (evergreen money Shorts, Nov 2026). Figures from calc/batch4.py -> src/batch4.data.json.
// 7% a year compounded monthly unless stated; before fees, tax and inflation.
import {Recipe} from '../template';
import d from '../batch4.data.json';
import tSubs from './Subs.timing.json';
import tCar from './CarLoan.timing.json';
import tMort from './Mortgage100.timing.json';
import tRaise from './Raise.timing.json';
import tInfl from './Inflation.timing.json';
import tRule from './Rule4.timing.json';
import tEm from './Emergency.timing.json';

type T = {dur: number; cues: number[]}[];
const timed = (r: Recipe, tt: T): Recipe => ({...r, audio: `audio/${r.id}.mp3`, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});
const $ = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
const CH = 'THE SUM OF IT';
const GROWTH = 'Illustration only: assumes a steady 7% yearly return,\ncompounded monthly, before fees, tax and inflation.\nReal returns vary. Not financial advice.';

export const subs = timed({
  id: 'Subs', channel: CH,
  thumb: {kicker: '5 SUBSCRIPTIONS · $75 A MONTH', from: '$75 a month', link: 'invested for 20 years:', to: $(d.subs.inv['20']), foot: 'vs $18,000 spent'},
  scenes: [
    {type: 'hook', dur: 150, kicker: '$75 a month', lines: ['Five subscriptions.', '*$15 each.*', '$75 a month.'], question: 'What do they really cost?'},
    {type: 'people', dur: 250, kicker: 'Two choices', footnote: 'Same money. Different choice.', people: [
      {name: 'Sam', color: 'paper', tag: 'KEEPS ALL FIVE', note: '$75 a month on subscriptions, for 20 years.', statLabel: 'SPENT', stat: '$18,000'},
      {name: 'Kai', color: 'accent', tag: 'INVESTS THE $75', note: 'Cancels them and invests the same money.', statLabel: 'PUT IN', stat: '$18,000'},
    ]},
    {type: 'race', dur: 250, kicker: 'Watch the gap', xLabel: 'YEARS', xStart: 0, xEnd: 20, xTicks: [0, 5, 10, 15, 20], yMax: 40000, yTicks: [0, 10000, 20000, 30000, 40000],
      series: [{name: 'Kai invested', color: 'accent', data: d.subs.inv}, {name: 'Sam spent', color: 'paper', data: d.subs.spent}],
      notes: [{at: 19, text: 'Year 19: growth overtakes\nwhat Kai put in', x: 1, yValue: 34000, color: 'accent'}]},
    {type: 'reveal', dur: 300, kicker: 'After 20 years', punch: `Same $75 a month.\n*${$(d.subs.inv['20'] - 18000)} apart.*`, items: [
      {label: 'SAM · SPENT', value: '$18,000', color: 'paper'},
      {label: 'KAI · INVESTED', value: $(d.subs.inv['20']), color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: 'Keep the ones you use.\n*Cancel the ones you forgot.*', disclaimer: GROWTH},
  ],
}, tSubs as T);

export const carLoan = timed({
  id: 'CarLoan', channel: CH,
  thumb: {kicker: '$30,000 CAR · 9% A YEAR', from: 'Borrow for 7 years,', link: 'pay in interest:', to: $(10544), foot: '35% of the car, again'},
  scenes: [
    {type: 'hook', dur: 150, kicker: '$30,000 car · 9% a year', lines: ['Same car.', '*Different price.*'], question: 'It depends how long you borrow.'},
    {type: 'rank', dur: 360, kicker: 'Total interest paid', max: 11000, footnote: 'Payment: $954 → $483 a month.', rows: [
      {label: '3 years', value: 4344, display: '$4,344', color: 'paper'},
      {label: '5 years', value: 7365, display: '$7,365', color: 'paper'},
      {label: '7 years', value: 10544, display: '$10,544', color: 'alert'},
    ]},
    {type: 'reveal', dur: 300, kicker: '7-year loan', punch: 'That’s *35% of the car*\nagain, in interest.', items: [
      {label: 'MONTHLY PAYMENT', value: '$483', color: 'paper'},
      {label: 'TOTAL INTEREST', value: '$10,544', color: 'alert'},
    ]},
    {type: 'outro', dur: 150, lines: 'A lower payment\n*isn’t a lower price.*', disclaimer: 'Illustration: $30,000 borrowed at 9% APR, fixed monthly payments.\nReal rates and fees vary. Not financial advice.'},
  ],
}, tCar as T);

export const mortgage100 = timed({
  id: 'Mortgage100', channel: CH,
  thumb: {kicker: '$300,000 MORTGAGE · 7%', from: 'An extra $100', link: 'a month saves', to: $(d.mort.saved), foot: 'and 50 months of payments'},
  scenes: [
    {type: 'hook', dur: 150, kicker: '$300,000 mortgage · 7% · 30 years', lines: ['One extra $100', '*a month.*'], question: 'What does it do?'},
    {type: 'reveal', dur: 300, kicker: 'The normal loan', punch: 'More than\n*the house.*', items: [
      {label: 'MONTHLY PAYMENT', value: $(d.mort.pmt), color: 'paper'},
      {label: 'TOTAL INTEREST', value: $(d.mort.int0), color: 'alert'},
    ]},
    {type: 'reveal', dur: 300, kicker: 'Plus $100 a month', punch: 'Four years and two months\n*sooner.*', items: [
      {label: 'PAID OFF SOONER', value: '50 months', color: 'accent'},
      {label: 'INTEREST SAVED', value: $(d.mort.saved), color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: '$100 a month.\n*$69,338 saved.*', disclaimer: 'Illustration: $300,000 at 7% fixed over 30 years, extra $100 paid each month.\nCheck your lender’s terms on early repayment. Not financial advice.'},
  ],
}, tMort as T);

export const raise = timed({
  id: 'Raise', channel: CH,
  thumb: {kicker: 'A $300 RAISE · 25 YEARS', from: 'Invest the raise,', link: 'not the lifestyle:', to: $(d.raise.inv['25']), foot: 'vs $90,000 spent'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'A $300 raise', lines: ['You get a raise.', '*$300 more a month.*'], question: 'What if you didn’t spend it?'},
    {type: 'people', dur: 250, kicker: 'Same raise', footnote: 'Same money. Different habit.', people: [
      {name: 'Ben', color: 'paper', tag: 'UPGRADES HIS LIFESTYLE', note: 'Spends the extra $300 a month.', statLabel: 'SPENT', stat: '$90,000'},
      {name: 'Ana', color: 'accent', tag: 'INVESTS THE RAISE', note: 'Invests the $300 and lives as before.', statLabel: 'PUT IN', stat: '$90,000'},
    ]},
    {type: 'race', dur: 250, kicker: 'Watch the gap', xLabel: 'YEARS', xStart: 0, xEnd: 25, xTicks: [0, 5, 10, 15, 20, 25], yMax: 250000, yTicks: [0, 50000, 100000, 150000, 200000, 250000],
      series: [{name: 'Ana invested', color: 'accent', data: d.raise.inv}, {name: 'Ben spent', color: 'paper', data: d.raise.spent}],
      notes: [{at: 19, text: 'Year 19: growth overtakes\nwhat Ana put in', x: 1, yValue: 215000, color: 'accent'}]},
    {type: 'reveal', dur: 300, kicker: 'After 25 years', punch: 'Same raise.\n*Different habit.*', items: [
      {label: 'BEN · SPENT', value: '$90,000', color: 'paper'},
      {label: 'ANA · INVESTED', value: $(d.raise.inv['25']), color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: 'Next raise,\n*try investing half.*', disclaimer: GROWTH},
  ],
}, tRaise as T);

export const inflation = timed({
  id: 'Inflation', channel: CH,
  thumb: {kicker: '3% INFLATION · 30 YEARS', from: '$100 today', link: 'buys in 30 years:', to: '$41', foot: 'cash shrinks'},
  scenes: [
    {type: 'hook', dur: 120, kicker: '$100 · 3% inflation a year', lines: ['$100 today.', '*What will it buy?*']},
    {type: 'race', dur: 400, kicker: 'What $100 buys', xLabel: 'YEARS', xStart: 0, xEnd: 30, xTicks: [0, 10, 20, 30], yMax: 100, yTicks: [0, 25, 50, 75, 100], cents: true,
      series: [{name: 'What $100 buys', color: 'alert', data: d.infl}],
      notes: [{at: 10, text: 'Year 10: $74.41', x: 11, yValue: 90, color: 'muted'}, {at: 29.5, text: 'Year 30: $41.20', x: 19, yValue: 62, color: 'alert'}]},
    {type: 'reveal', dur: 220, kicker: 'After 30 years', punch: 'Cash doesn’t stay still.\n*It shrinks.*', items: [
      {label: 'TODAY', value: '$100', color: 'paper'},
      {label: 'IN 30 YEARS', value: '$41.20', color: 'alert'},
    ]},
    {type: 'outro', dur: 150, lines: 'Money needs to grow\n*at least as fast as prices.*', disclaimer: 'Illustration: prices rise a steady 3% a year.\nReal inflation varies. Not financial advice.'},
  ],
}, tInfl as T);

export const rule4 = timed({
  id: 'Rule4', channel: CH,
  thumb: {kicker: 'THE 4% RULE', from: '$3,000 a month', link: 'in retirement needs', to: '$900,000', foot: '25× your yearly spending'},
  scenes: [
    {type: 'hook', dur: 120, kicker: 'Retirement', lines: ['How much do you', '*need to retire?*']},
    {type: 'reveal', dur: 400, kicker: 'The 4% rule', punch: 'You need *25×*\nyour yearly spending.', items: [
      {label: 'TAKE EACH YEAR', value: '4%', color: 'accent'},
      {label: 'HAS TENDED TO LAST', value: '~30 yrs', color: 'paper'},
    ]},
    {type: 'rank', dur: 300, kicker: 'Savings needed · 4% rule', max: 1600000, footnote: 'A starting point, *not a guarantee.*', rows: [
      {label: '$2,000 a month', value: 600000, display: '$600,000', color: 'paper'},
      {label: '$3,000 a month', value: 900000, display: '$900,000', color: 'paper'},
      {label: '$5,000 a month', value: 1500000, display: '$1,500,000', color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: 'It turns a vague goal\n*into a number.*', disclaimer: 'The 4% rule is a historical rule of thumb (US stocks and bonds, ~30-year retirements).\nIt is not a guarantee. Not financial advice.'},
  ],
}, tRule as T);

export const emergency = timed({
  id: 'Emergency', channel: CH,
  thumb: {kicker: '$1,000 REPAIR · 22% CARD', from: 'Paying $30 a month', link: 'takes 52 months and costs', to: '$1,560', foot: 'vs $1,000 from savings'},
  scenes: [
    {type: 'hook', dur: 150, kicker: '$1,000 repair · 22% card', lines: ['A $1,000 repair.', '*On a credit card.*'], question: 'Paying $30 a month. How long?'},
    {type: 'reveal', dur: 300, kicker: 'Paying $30 a month', punch: '$560 of it\n*is interest.*', items: [
      {label: 'TIME TO CLEAR', value: '52 months', color: 'paper'},
      {label: 'TOTAL PAID', value: '$1,560', color: 'alert'},
    ]},
    {type: 'people', dur: 250, kicker: 'Same repair', people: [
      {name: 'Card', color: 'alert', tag: 'ON A 22% CARD', note: 'Cleared after more than 4 years.', statLabel: 'TOTAL PAID', stat: '$1,560'},
      {name: 'Fund', color: 'accent', tag: 'FROM AN EMERGENCY FUND', note: 'Paid today. No interest.', statLabel: 'TOTAL PAID', stat: '$1,000'},
    ]},
    {type: 'outro', dur: 150, lines: 'That’s why an emergency fund\n*comes first.*', disclaimer: 'Illustration: $1,000 at 22% APR, $30 fixed monthly payment.\nReal card terms vary. Not financial advice.'},
  ],
}, tEm as T);
