// Batch 8 (Nov 2026): "Uncomfortable maths". Provocative hooks, calculated figures. Data: calc/batch8.py -> src/batch8.data.json.
// Sources: research/batch8-sources.md
import {Recipe} from '../template';
import d from '../batch8.data.json';
import tH from './HouseAsset.timing.json';
import tO from './OnePercent.timing.json';
import tL from './Lotto.timing.json';
import tB from './BankFees.timing.json';
import tT from './TwoPotNation.timing.json';
import tP from './PetrolWar.timing.json';

type T = {dur: number; cues: number[]}[];
const timed = (r: Recipe, tt: T): Recipe => ({...r, audio: `audio/${r.id}.mp3`, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});
const R = (n: number) => 'R' + Math.round(n).toLocaleString('en-US');
const $ = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
const CH = 'THE SUM OF IT';
const SEVEN = 'Illustration only: assumes a steady 7% yearly return, compounded monthly, before fees, tax and inflation.\nReal returns vary. Not financial advice.';

export const houseAsset = timed({
  id: 'HouseAsset', channel: CH,
  thumb: {kicker: '$400,000 HOME · 30 YEARS', from: 'Your house is not an investment:', link: 'you pay $1.1m, and it’s worth', to: '$1.1m', foot: 'you broke even'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'The maths nobody shows you', lines: ['Your house is', '*not an investment.*']},
    {type: 'reveal', dur: 400, kicker: '$400,000 home · 20% down · $320,000 at 6.5% · 30 years', punch: 'Interest alone.', items: [
      {label: 'MONTHLY', value: $(d.house.pmt), color: 'paper'},
      {label: 'INTEREST OVER 30 YEARS', value: $(d.house.interest), color: 'alert'},
    ]},
    {type: 'reveal', dur: 300, kicker: 'Plus tax, insurance and maintenance · ~$10,000 a year', punch: 'Paid over\n*30 years.*', items: [
      {label: 'TOTAL OUT OF POCKET', value: $(d.house.total), color: 'alert'},
    ]},
    {type: 'reveal', dur: 200, kicker: 'Worth after 30 years · prices up 3.5% a year', punch: 'You broke\n*even.*', items: [
      {label: 'HOUSE VALUE', value: $(d.house.value30), color: 'paper'},
    ]},
    {type: 'outro', dur: 150, lines: 'A place to live.\n*Not an investment.*', disclaimer: 'Illustration: 6.5% fixed, 1.1% property tax, 1% maintenance, $1,500 insurance a year (held flat), 3.5% yearly appreciation. Ignores rent you’d otherwise pay. Not financial advice.'},
  ],
}, tH as T);

export const onePercent = timed({
  id: 'OnePercent', channel: CH, currency: 'R',
  thumb: {kicker: 'R5,000 A MONTH · 40 YEARS', from: 'A 1% fee costs you', link: 'more than your house:', to: R(d.fee.gap), foot: 'gone'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'Yes, really', lines: ['A 1% fee costs more', '*than your house.*']},
    {type: 'reveal', dur: 200, kicker: 'R5,000 a month · 40 years', punch: '*R2.4 million* in.', items: [
      {label: 'PAID IN', value: R(d.fee.in), color: 'paper'},
    ]},
    {type: 'people', dur: 300, kicker: 'Same money, same 40 years', footnote: 'One percentage point.', people: [
      {name: '10%', color: 'accent', tag: 'NO FEE', note: 'R5,000 a month.', statLabel: 'AT 40 YEARS', stat: R(d.fee.g10)},
      {name: '9%', color: 'alert', tag: 'AFTER A 1% FEE', note: 'R5,000 a month.', statLabel: 'AT 40 YEARS', stat: R(d.fee.g9)},
    ]},
    {type: 'reveal', dur: 200, kicker: 'The difference', punch: 'Gone, for\n*1% a year.*', items: [
      {label: 'LOST TO THE FEE', value: R(d.fee.gap), color: 'alert'},
    ]},
    {type: 'outro', dur: 150, lines: 'Nobody feels 1%.\n*Everybody feels 8 million.*', disclaimer: 'Illustration: steady 10% vs 9% a year, compounded monthly, before tax and inflation. Real returns vary. Not financial advice.'},
  ],
}, tO as T);

export const lotto = timed({
  id: 'Lotto', channel: CH, currency: 'R',
  thumb: {kicker: 'R20 A WEEK · 40 YEARS', from: 'Lotto tickets: R41,600 spent.', link: 'Invested instead, about', to: R(d.lotto.fv), foot: 'maths, not luck'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'Here’s why', lines: ['The lottery is a tax on', '*people who can’t do maths.*']},
    {type: 'reveal', dur: 330, kicker: 'Lotto jackpot', punch: `*${d.lotto.ratio}× more likely*\nto be struck by lightning.`, items: [
      {label: 'ODDS', value: '1 in 20,358,520', color: 'alert'},
    ]},
    {type: 'reveal', dur: 220, kicker: 'R20 a week on tickets', punch: 'Over\n*40 years.*', items: [
      {label: 'SPENT', value: R(d.lotto.spent), color: 'alert'},
    ]},
    {type: 'reveal', dur: 300, kicker: 'Same R20 a week · invested at 7%', punch: 'Guaranteed by maths,\n*not luck.*', items: [
      {label: 'AFTER 40 YEARS', value: R(d.lotto.fv), color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: 'Play for fun.\n*Don’t call it a plan.*', disclaimer: SEVEN + '\nOdds: Ithuba Lotto (6 of 52). Lightning: 1 in 350,000 (SA Weather Service).'},
  ],
}, tL as T);

export const bankFees = timed({
  id: 'BankFees', channel: CH, currency: 'R',
  thumb: {kicker: 'R99 A MONTH · 40 YEARS', from: 'Bank fees, invested instead:', link: 'about', to: R(d.bank.f99), foot: 'check what you pay for'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'Here’s what it adds up to', lines: ['Your bank charges you', '*to hold your own money.*']},
    {type: 'reveal', dur: 300, kicker: 'Published 2026 fee schedules', punch: 'Every month,\n*for the account.*', items: [
      {label: 'TYPICAL MID-TIER', value: 'R99', color: 'paper'},
      {label: 'PREMIUM', value: 'R250', color: 'alert'},
    ]},
    {type: 'reveal', dur: 300, kicker: 'R99 a month · 40 years', punch: 'Invested at 7%\n*instead.*', items: [
      {label: 'IN FEES', value: R(d.bank.spent99), color: 'alert'},
      {label: 'INVESTED', value: R(d.bank.f99), color: 'accent'},
    ]},
    {type: 'reveal', dur: 250, kicker: 'R250 a month · 40 years', punch: 'Invested at 7%\n*instead.*', items: [
      {label: 'IN FEES', value: R(d.bank.spent250), color: 'alert'},
      {label: 'INVESTED', value: R(d.bank.f250), color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: 'Cheapest accounts: under R10.\n*Check what you pay for.*', disclaimer: SEVEN + '\nFees from published 2026 schedules; bundled accounts include transactions and rewards. Compare for your own usage.'},
  ],
}, tB as T);

export const twoPotNation = timed({
  id: 'TwoPotNation', channel: CH, currency: 'R',
  thumb: {kicker: 'TWO-POT · FIRST 5 MONTHS', from: 'R43 billion withdrawn.', link: 'Left invested 25 years, worth', to: 'R194bn', foot: 'in today’s money'},
  scenes: [
    {type: 'hook', dur: 190, kicker: 'Together', lines: ['The biggest retirement withdrawal', '*in SA history.*']},
    {type: 'reveal', dur: 420, kicker: 'Two-pot · first five months · SARS', punch: 'About *R18,000* each,\nbefore tax.', items: [
      {label: 'WITHDRAWALS APPROVED', value: '2.4 million', color: 'paper'},
      {label: 'TAKEN OUT', value: 'R43.4 billion', color: 'alert'},
    ]},
    {type: 'reveal', dur: 320, kicker: 'Left invested · 25 years · 6% after inflation', punch: 'In today’s\n*money.*', items: [
      {label: 'WOULD BECOME', value: 'R194 billion', color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: 'Before you withdraw,\n*do the maths.*', disclaimer: 'SARS: R43.42bn gross, 2,403,379 directives approved, to 31 Jan 2025. Growth: 6% a year after inflation, compounded monthly, before fees. Withdrawals are taxed at marginal rates. Not financial advice.'},
  ],
}, tT as T);

export const petrolWar = timed({
  id: 'PetrolWar', channel: CH, currency: 'R',
  thumb: {kicker: '95 UNLEADED · INLAND', from: 'March: R20.30. Now: R30.24.', link: 'Two tanks a month costs', to: `+${R(d.petrol.diff_month)}`, foot: 'every month'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'Here’s the maths', lines: ['The Iran war is costing you', '*R1,000 a month.*']},
    {type: 'reveal', dur: 330, kicker: '95 unleaded · inland · per litre', punch: `Up *${d.petrol.pct}%*\nin eight months.`, items: [
      {label: 'MARCH 2026', value: 'R20.30', color: 'paper'},
      {label: 'NOVEMBER 2026', value: 'R30.24', color: 'alert'},
    ]},
    {type: 'reveal', dur: 330, kicker: 'A 50-litre tank', punch: `*+${R(d.petrol.diff_tank)}*\nevery tank.`, items: [
      {label: 'MARCH', value: R(d.petrol.tank_mar), color: 'paper'},
      {label: 'NOW', value: R(d.petrol.tank_nov), color: 'alert'},
    ]},
    {type: 'reveal', dur: 210, kicker: 'Two tanks a month', punch: 'Every month.\n*For a war on another continent.*', items: [
      {label: 'EXTRA', value: `+${R(d.petrol.diff_month)}`, color: 'alert'},
    ]},
    {type: 'outro', dur: 150, lines: 'Oil is global.\n*Your tank is not.*', disclaimer: 'Inland 95 prices: March 2026 R20.30, from 4 Nov 2026 R30.24 (DMRE), the latter including R1.50/ℓ temporary levy relief. Figures only; no position on the war. Not financial advice.'},
  ],
}, tP as T);
