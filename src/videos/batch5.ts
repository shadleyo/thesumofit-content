// Batch 5 (evergreen money Shorts, Nov 2026). Figures from calc/batch5.py -> src/batch5.data.json.
import {Recipe} from '../template';
import d from '../batch5.data.json';
import tPhone from './Phone.timing.json';
import tPay from './PayFirst.timing.json';
import tUsed from './UsedCar.timing.json';
import tEF from './EFund.timing.json';
import tStu from './StudentLoan.timing.json';
import tHY from './HighYield.timing.json';
import tBud from './Budget.timing.json';

type T = {dur: number; cues: number[]}[];
const timed = (r: Recipe, tt: T): Recipe => ({...r, audio: `audio/${r.id}.mp3`, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});
const $ = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
const CH = 'THE SUM OF IT';
const GROWTH = 'Illustration only: assumes a steady 7% yearly return,\ncompounded monthly, before fees, tax and inflation.\nReal returns vary. Not financial advice.';
const byAge = Object.fromEntries(Object.entries(d.payfirst.bal).map(([y, v]) => [String(25 + Number(y)), v]));
const depAge = Object.fromEntries(Object.keys(d.payfirst.bal).map(y => [String(25 + Number(y)), 4800 * Number(y)]));

export const phone = timed({
  id: 'Phone', channel: CH,
  thumb: {kicker: '$1,500 PHONE · 20% · 24 MONTHS', from: '$76 a month', link: 'adds up to', to: '$1,832', foot: '$332 just to borrow'},
  scenes: [
    {type: 'hook', dur: 150, kicker: '$1,500 phone · 20% · 24 months', lines: ['$76 a month.', '*Sounds manageable.*'], question: 'What does it really cost?'},
    {type: 'reveal', dur: 300, kicker: 'After 24 payments', punch: '*$332*\njust to borrow.', items: [
      {label: 'TOTAL PAID', value: '$1,832', color: 'alert'},
      {label: 'INTEREST', value: '$332', color: 'alert'},
    ]},
    {type: 'people', dur: 250, kicker: 'Same phone', people: [
      {name: 'Borrow', color: 'alert', tag: '$76 FOR 24 MONTHS', note: 'The phone today.', statLabel: 'TOTAL PAID', stat: '$1,832'},
      {name: 'Save', color: 'accent', tag: 'SAVE $76 A MONTH', note: 'The phone in under 20 months.', statLabel: 'TOTAL PAID', stat: '$1,500'},
    ]},
    {type: 'outro', dur: 150, lines: 'Same phone.\n*$332 kept.*', disclaimer: 'Illustration: $1,500 at 20% APR over 24 fixed monthly payments.\nReal finance terms vary. Not financial advice.'},
  ],
}, tPhone as T);

export const payFirst = timed({
  id: 'PayFirst', channel: CH,
  thumb: {kicker: '10% OF $4,000 · AGE 25 TO 65', from: '$400 a month', link: 'paid to yourself first:', to: $(d.payfirst.bal['40']), foot: 'from $192,000 put in'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'Pay yourself first', lines: ['Move 10% of your pay', '*the day it lands.*']},
    {type: 'reveal', dur: 150, kicker: '$4,000 monthly take-home', punch: 'Before rent.\n*Before shopping.*', items: [
      {label: '10% EACH MONTH', value: '$400', color: 'accent'},
    ]},
    {type: 'race', dur: 300, kicker: '$400 a month · 7% a year', xLabel: 'AGE', xStart: 25, xEnd: 65, xTicks: [25, 35, 45, 55, 65], yMax: 1100000, yTicks: [0, 250000, 500000, 750000, 1000000],
      series: [{name: 'Invested', color: 'accent', data: byAge}, {name: 'You put in', color: 'muted', data: depAge}],
      notes: [{at: 64, text: 'Age 65: just over $1 million', x: 26, yValue: 900000, color: 'accent'}]},
    {type: 'reveal', dur: 200, kicker: 'At 65', punch: 'Most of it:\n*growth.*', items: [
      {label: 'YOU PUT IN', value: '$192,000', color: 'paper'},
      {label: 'YOU END UP WITH', value: $(d.payfirst.bal['40']), color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: 'Automate it.\n*You never see it to miss it.*', disclaimer: GROWTH},
  ],
}, tPay as T);

export const usedCar = timed({
  id: 'UsedCar', channel: CH,
  thumb: {kicker: 'NEW $40,000 VS USED $25,000', from: 'Invest the $15,000', link: 'for 10 years at 7%:', to: $(d.used.inv10), foot: 'roughly double'},
  scenes: [
    {type: 'people', dur: 250, kicker: 'Same model', footnote: '$15,000 apart.', people: [
      {name: 'New', color: 'paper', tag: 'STRAIGHT FROM THE DEALER', note: 'Brand new.', statLabel: 'PRICE', stat: '$40,000'},
      {name: 'Used', color: 'accent', tag: 'THREE YEARS OLD', note: 'Same model.', statLabel: 'PRICE', stat: '$25,000'},
    ]},
    {type: 'hook', dur: 120, kicker: 'Depreciation', lines: ['New cars lose value', '*fastest at the start.*']},
    {type: 'reveal', dur: 300, kicker: 'Invest the $15,000 · 7% · 10 years', punch: 'Roughly *double.*', items: [
      {label: 'INVESTED', value: '$15,000', color: 'paper'},
      {label: 'AFTER 10 YEARS', value: $(d.used.inv10), color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: 'Let someone else pay\n*for the new-car smell.*', disclaimer: GROWTH},
  ],
}, tUsed as T);

export const eFund = timed({
  id: 'EFund', channel: CH,
  thumb: {kicker: 'EMERGENCY FUND', from: 'Essentials of $3,000 a month', link: 'means a fund of', to: '$9k–$18k', foot: '3 to 6 months'},
  scenes: [
    {type: 'hook', dur: 120, kicker: 'Emergency fund', lines: ['How big should your', '*emergency fund be?*']},
    {type: 'reveal', dur: 250, kicker: 'The common guide', punch: 'Not your income.\n*Your rent, food, transport, bills.*', items: [
      {label: 'ESSENTIAL EXPENSES', value: '3–6 months', color: 'accent'},
    ]},
    {type: 'rank', dur: 330, kicker: 'Essentials of $3,000 a month', max: 19000, footnote: 'Start smaller. *Then build.*', rows: [
      {label: '3 months', value: 9000, display: '$9,000', color: 'paper'},
      {label: '6 months', value: 18000, display: '$18,000', color: 'accent'},
      {label: 'Starter', value: 1000, display: '$1,000', color: 'muted'},
    ]},
    {type: 'outro', dur: 150, lines: 'It’s not an investment.\n*It’s insurance.*', disclaimer: 'A common rule of thumb, not a rule. The right size depends on your job,\nhousehold and costs. Not financial advice.'},
  ],
}, tEF as T);

export const studentLoan = timed({
  id: 'StudentLoan', channel: CH,
  thumb: {kicker: '$30,000 LOAN · 6% · 10 YEARS', from: 'An extra $50', link: 'a month: paid off', to: '20 months', foot: 'sooner, $1,804 less interest'},
  scenes: [
    {type: 'hook', dur: 150, kicker: '$30,000 loan · 6% · 10 years', lines: ['An extra $50', '*a month.*'], question: 'What does it change?'},
    {type: 'reveal', dur: 250, kicker: 'The standard plan', punch: 'Over\n*ten years.*', items: [
      {label: 'MONTHLY PAYMENT', value: $(d.student.pmt), color: 'paper'},
      {label: 'TOTAL INTEREST', value: $(d.student.int0), color: 'alert'},
    ]},
    {type: 'reveal', dur: 250, kicker: 'Plus $50 a month', punch: 'Every extra dollar\n*cuts the balance.*', items: [
      {label: 'PAID OFF SOONER', value: '20 months', color: 'accent'},
      {label: 'INTEREST SAVED', value: $(d.student.saved), color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: '$50 a month.\n*20 months of freedom.*', disclaimer: 'Illustration: $30,000 at 6% fixed over 10 years, extra $50 paid each month.\nCheck your lender’s terms. Not financial advice.'},
  ],
}, tStu as T);

export const highYield = timed({
  id: 'HighYield', channel: CH,
  thumb: {kicker: '$10,000 · 10 YEARS', from: '0.5% vs 4.5% savings', link: 'the difference:', to: $(d.hys.gap), foot: 'for choosing a different account'},
  scenes: [
    {type: 'hook', dur: 120, kicker: '$10,000 in savings', lines: ['Same money.', '*Two accounts.*']},
    {type: 'people', dur: 200, kicker: 'Two savings accounts', people: [
      {name: 'Account A', color: 'paper', tag: 'LOW RATE', note: 'Pays half a percent a year.', statLabel: 'RATE', stat: '0.5%'},
      {name: 'Account B', color: 'accent', tag: 'HIGHER RATE', note: 'Pays four and a half percent.', statLabel: 'RATE', stat: '4.5%'},
    ]},
    {type: 'race', dur: 250, kicker: 'Balance after each year', xLabel: 'YEARS', xStart: 0, xEnd: 10, xTicks: [0, 2, 4, 6, 8, 10], yMax: 16000, yTicks: [0, 4000, 8000, 12000, 16000],
      series: [{name: 'At 4.5%', color: 'accent', data: d.hys.hiS}, {name: 'At 0.5%', color: 'paper', data: d.hys.loS}]},
    {type: 'reveal', dur: 200, kicker: 'After 10 years', punch: `*${$(d.hys.gap)} more*\nfor choosing a different account.`, items: [
      {label: 'AT 0.5%', value: $(d.hys.lo), color: 'paper'},
      {label: 'AT 4.5%', value: $(d.hys.hi), color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: 'Check the rate\n*your savings earn.*', disclaimer: 'Illustration: fixed rates, compounded monthly, no deposits or withdrawals.\nReal rates change. Not financial advice.'},
  ],
}, tHY as T);

export const budget = timed({
  id: 'Budget', channel: CH,
  thumb: {kicker: 'THE 50/30/20 RULE', from: '20% of $4,000', link: 'invested for 30 years:', to: $(d.budget.save30), foot: 'about $976,000'},
  scenes: [
    {type: 'hook', dur: 120, kicker: 'The 50/30/20 rule', lines: ['Split your pay', '*three ways.*']},
    {type: 'rank', dur: 450, kicker: '$4,000 take-home', max: 2100, footnote: 'Needs, wants, *future you.*', rows: [
      {label: 'Needs · 50%', value: 2000, display: '$2,000', color: 'paper'},
      {label: 'Wants · 30%', value: 1200, display: '$1,200', color: 'paper'},
      {label: 'Save · 20%', value: 800, display: '$800', color: 'accent'},
    ]},
    {type: 'reveal', dur: 250, kicker: '$800 a month · 30 years · 7%', punch: 'Close to\n*a million.*', items: [
      {label: 'YOU PUT IN', value: '$288,000', color: 'paper'},
      {label: 'AFTER 30 YEARS', value: $(d.budget.save30), color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: 'A starting point,\n*not a rule to obey.*', disclaimer: GROWTH},
  ],
}, tBud as T);
