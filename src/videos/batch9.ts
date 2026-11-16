// Batch 9 (Nov 2026): "Uncomfortable maths" + SA. Data: calc/batch9.py -> src/batch9.data.json. Spoken follow prompt in every outro.
import {Recipe} from '../template';
import d from '../batch9.data.json';
import tW from './Wedding.timing.json';
import tC from './CarFinance.timing.json';
import tR from './MillionRetire.timing.json';
import tD from './DeliveryFees.timing.json';
import tM from './Mattress.timing.json';

type T = {dur: number; cues: number[]}[];
const timed = (r: Recipe, tt: T): Recipe => ({...r, audio: `audio/${r.id}.mp3`, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});
const R = (n: number) => 'R' + Math.round(n).toLocaleString('en-US');
const CH = 'THE SUM OF IT';
const SEVEN = 'Illustration only: assumes a steady 7% yearly return, compounded monthly, before fees, tax and inflation.\nReal returns vary. Not financial advice.';

export const wedding = timed({
  id: 'Wedding', channel: CH, currency: 'R',
  thumb: {kicker: 'R150,000 · 30 YEARS AT 7%', from: 'A R150,000 wedding, invested instead:', link: 'about', to: R(d.wed.fv30), foot: `${d.wed.mult}× what you put in`},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'Here’s the maths', lines: ['A R150,000 wedding costs you', '*over a million rand.*']},
    {type: 'reveal', dur: 240, kicker: 'The day', punch: 'Gone by\n*midnight.*', items: [{label: 'SPENT ON THE DAY', value: R(d.wed.cost), color: 'paper'}]},
    {type: 'reveal', dur: 400, kicker: 'Same R150,000 · invested at 7% · 30 years', punch: `*${d.wed.mult}×*\nwhat you put in.`, items: [{label: 'AFTER 30 YEARS', value: R(d.wed.fv30), color: 'accent'}]},
    {type: 'outro', dur: 150, lines: 'Your day. Your way.\n*Know the price.*', disclaimer: SEVEN},
  ],
}, tW as T);

export const carFinance = timed({
  id: 'CarFinance', channel: CH, currency: 'R',
  thumb: {kicker: 'R400,000 CAR · 72 MONTHS', from: 'Finance it and pay back', link: 'interest alone:', to: R(d.car.int), foot: 'the price of borrowing'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'Here’s the maths', lines: ['A R400,000 car costs you', `*${R(d.car.total)}.*`]},
    {type: 'reveal', dur: 290, kicker: 'R400,000 · 72 months · 12.75%', punch: 'Every month,\n*for six years.*', items: [{label: 'MONTHLY', value: R(d.car.pmt), color: 'paper'}]},
    {type: 'reveal', dur: 330, kicker: 'Add it up', punch: 'The price of\n*borrowing.*', items: [
      {label: 'TOTAL PAID', value: R(d.car.total), color: 'paper'},
      {label: 'INTEREST', value: R(d.car.int), color: 'alert'},
    ]},
    {type: 'outro', dur: 150, lines: 'A car loses value.\n*The interest doesn’t.*', disclaimer: 'Illustration: R400,000 over 72 months at 12.75% (prime 10.75% + 2), no deposit, fees or balloon. Your rate will differ. Not financial advice.'},
  ],
}, tC as T);

export const millionRetire = timed({
  id: 'MillionRetire', channel: CH, currency: 'R',
  thumb: {kicker: 'R1 MILLION · RETIREMENT', from: 'A million rand pays', link: 'about', to: `${R(d.ret.mo)} a month`, foot: 'you’d need R6 million for R20,000'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'Here’s the maths', lines: ['A million rand sounds like a lot.', `*It’s ${R(d.ret.mo)} a month.*`]},
    {type: 'reveal', dur: 350, kicker: 'The 4% rule of thumb', punch: 'Four percent\n*a year.*', items: [
      {label: 'A YEAR', value: R(d.ret.yr), color: 'paper'},
      {label: 'A MONTH', value: R(d.ret.mo), color: 'alert'},
    ]},
    {type: 'reveal', dur: 240, kicker: 'To live on R20,000 a month', punch: 'So the number\n*isn’t a million.*', items: [{label: 'YOU’D NEED', value: R(d.ret.need20), color: 'accent'}]},
    {type: 'outro', dur: 150, lines: 'Find your number.\n*Start early.*', disclaimer: 'Illustration: 4% a year drawn from savings is a common rule of thumb, not a guarantee. Before tax and inflation. Not financial advice.'},
  ],
}, tR as T);

export const deliveryFees = timed({
  id: 'DeliveryFees', channel: CH, currency: 'R',
  thumb: {kicker: 'R35 FEE · 3 ORDERS A WEEK', from: 'Delivery fees, 40 years:', link: 'invested instead, about', to: R(d.del.fv40), foot: 'see the fee'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'Here’s the maths', lines: ['Three delivery fees a week cost you', '*over a million rand.*']},
    {type: 'reveal', dur: 300, kicker: 'R35 in fees · 3 orders a week', punch: 'Every year.', items: [
      {label: 'A MONTH', value: R(d.del.month), color: 'paper'},
      {label: 'A YEAR', value: R(d.del.year), color: 'alert'},
    ]},
    {type: 'reveal', dur: 380, kicker: '40 years', punch: 'Invested at 7%\n*instead.*', items: [
      {label: 'IN FEES', value: R(d.del.spent40), color: 'alert'},
      {label: 'INVESTED', value: R(d.del.fv40), color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: 'Order the food.\n*Just see the fee.*', disclaimer: SEVEN + '\nR35 a delivery assumed; fees vary by app and distance.'},
  ],
}, tD as T);

export const mattress = timed({
  id: 'Mattress', channel: CH, currency: 'R',
  thumb: {kicker: 'R100,000 IN A DRAWER · 20 YEARS', from: 'Cash in a drawer buys', link: 'what', to: R(d.mat.real20), foot: 'buys today'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'Here’s the maths', lines: ['Cash in a drawer loses', '*over half its value.*']},
    {type: 'reveal', dur: 250, kicker: 'R100,000 in a drawer', punch: 'Nothing happens\n*to the number.*', items: [{label: 'THE NUMBER', value: 'R100,000', color: 'paper'}]},
    {type: 'reveal', dur: 380, kicker: 'After 20 years · prices up 4% a year', punch: 'And you never\n*spent a cent.*', items: [
      {label: 'BUYS WHAT THIS BUYS TODAY', value: R(d.mat.real20), color: 'alert'},
      {label: 'LOST', value: R(d.mat.lost), color: 'alert'},
    ]},
    {type: 'outro', dur: 150, lines: 'Money has to move\n*to keep its value.*', disclaimer: 'Illustration: steady 4% yearly inflation, no interest earned. Real inflation varies. Not financial advice.'},
  ],
}, tM as T);
