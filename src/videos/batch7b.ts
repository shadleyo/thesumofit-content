// Batch 7b: SA in rands, part 2. Figures from calc/batch7.py. Sources: Budget 2026 (TFSA R46,000/yr, R500,000 lifetime;
// RA deduction 27.5% capped at R430,000; 2026/27 brackets), MTBPS 21 Oct 2026 (fuel levy relief), DMRE Nov 2026 fuel prices.
import {Recipe} from '../template';
import d from '../batch7.data.json';
import tP from './PetrolRelief.timing.json';
import tT from './TFSAMax.timing.json';
import tR from './RARefund.timing.json';
import tW from './TwoPot.timing.json';
import tB from './TaxBracket.timing.json';

type T = {dur: number; cues: number[]}[];
const timed = (r: Recipe, tt: T): Recipe => ({...r, audio: `audio/${r.id}.mp3`, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});
const R = (n: number) => 'R' + Math.round(n).toLocaleString('en-US');
const CH = 'THE SUM OF IT';
const REAL = 'Illustration only: 6% a year after inflation (today’s rands), compounded monthly, before fees.\nReal returns vary. Not financial advice.';

export const petrolRelief = timed({
  id: 'PetrolRelief', channel: CH, currency: 'R',
  thumb: {kicker: '95 UNLEADED · INLAND', from: 'A 50-litre tank:', link: 'and the levy cut saves', to: 'R75', foot: 'a tank, until 1 December'},
  scenes: [
    {type: 'reveal', dur: 300, kicker: '95 unleaded · inland · November', punch: 'A 50-litre tank:\n*R1,512.*', items: [
      {label: 'PER LITRE', value: 'R30.24', color: 'alert'},
    ]},
    {type: 'reveal', dur: 300, kicker: 'Temporary fuel levy cut', punch: 'Saved on\n*every tank.*', items: [
      {label: 'TO 1 DECEMBER', value: '−R1.50/ℓ', color: 'accent'},
      {label: 'PER 50ℓ TANK', value: 'R75', color: 'accent'},
    ]},
    {type: 'reveal', dur: 300, kicker: '2 December to 5 January', punch: 'Then the relief\n*is scheduled to end.*', items: [
      {label: 'LEVY CUT', value: '−R1.00/ℓ', color: 'paper'},
      {label: 'PER 50ℓ TANK', value: 'R50', color: 'paper'},
    ]},
    {type: 'outro', dur: 150, lines: 'Know your tank.\n*Plan the December drive.*', disclaimer: 'Inland 95 price from 4 Nov 2026 (DMRE). Levy relief announced in the MTBPS, 21 Oct 2026.\nCoastal prices are lower. Not financial advice.'},
  ],
}, tP as T);

export const tfsaMax = timed({
  id: 'TFSAMax', channel: CH, currency: 'R',
  thumb: {kicker: 'TFSA · R46,000 A YEAR', from: 'R500,000 in, from age 30:', link: 'by 65, tax-free, about', to: 'R3 million', foot: 'in today’s money'},
  scenes: [
    {type: 'reveal', dur: 300, kicker: 'Tax-free savings account', punch: 'About\n*R3,833 a month.*', items: [
      {label: 'ANNUAL LIMIT', value: 'R46,000', color: 'accent'},
    ]},
    {type: 'reveal', dur: 300, kicker: 'Max it from age 30', punch: 'Then you\n*stop paying in.*', items: [
      {label: 'LIFETIME LIMIT', value: 'R500,000', color: 'paper'},
      {label: 'REACHED IN', value: '< 11 years', color: 'paper'},
    ]},
    {type: 'reveal', dur: 400, kicker: 'Left to grow until 65', punch: 'And not one rand\n*of growth is taxed.*', items: [
      {label: 'AT 65', value: R(d.tfsa.at65), color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: 'Fill it early.\n*Then leave it alone.*', disclaimer: REAL + '\nLimits from 1 March 2026. Over-contributions taxed at 40%.'},
  ],
}, tT as T);

export const raRefund = timed({
  id: 'RARefund', channel: CH, currency: 'R',
  thumb: {kicker: 'RETIREMENT ANNUITY', from: 'R2,000 a month at a 31% tax rate:', link: 'SARS gives back', to: R(d.ra.refund), foot: 'a year'},
  scenes: [
    {type: 'reveal', dur: 250, kicker: 'Retirement annuity', punch: '*R24,000* a year.', items: [
      {label: 'EVERY MONTH', value: 'R2,000', color: 'paper'},
    ]},
    {type: 'reveal', dur: 400, kicker: 'Tax-deductible, up to 27.5% of income', punch: 'Back from SARS,\n*every year.*', items: [
      {label: 'TOP TAX RATE', value: '31%', color: 'paper'},
      {label: 'REFUND', value: R(d.ra.refund), color: 'accent'},
    ]},
    {type: 'reveal', dur: 250, kicker: 'So each R2,000', punch: 'Really costs you\n*about R1,380.*', items: [
      {label: 'REAL COST', value: R(d.ra.net), color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: 'Tax later.\n*Refund now.*', disclaimer: 'Illustration: 2026/27 rules, deduction capped at 27.5% of income and R430,000 a year.\nYour refund depends on your marginal rate. Not tax advice.'},
  ],
}, tR as T);

export const twoPot = timed({
  id: 'TwoPot', channel: CH, currency: 'R',
  thumb: {kicker: 'TWO-POT · R30,000', from: 'Withdraw it: R20,700.', link: 'Leave it 25 years:', to: R(d.pot.left25), foot: 'in today’s money'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'R30,000 in your savings pot', lines: ['You can take it out.', '*What does it cost?*']},
    {type: 'reveal', dur: 350, kicker: 'Taxed at your marginal rate · 31%', punch: 'What you\n*actually get.*', items: [
      {label: 'TO SARS', value: 'R9,300', color: 'alert'},
      {label: 'TO YOU', value: 'R20,700', color: 'paper'},
    ]},
    {type: 'reveal', dur: 350, kicker: 'Left invested · 25 years', punch: 'In today’s\n*money.*', items: [
      {label: 'INSTEAD', value: R(d.pot.left25), color: 'accent'},
    ]},
    {type: 'outro', dur: 180, lines: 'Sometimes you need it.\n*Just know the price.*', disclaimer: REAL + '\nWithdrawals are taxed at your marginal rate; fund fees may apply.'},
  ],
}, tW as T);

export const taxBracket = timed({
  id: 'TaxBracket', channel: CH, currency: 'R',
  thumb: {kicker: 'R380,000 → R400,000', from: 'A higher bracket?', link: 'Of a R20,000 raise, you keep', to: R(d.bracket.keep), foot: 'not a loss'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'The tax bracket myth', lines: ['A higher bracket.', '*Do you lose money?*']},
    {type: 'reveal', dur: 450, kicker: 'Taxable income R380,000 → R400,000', punch: 'Only this part\n*is taxed at 31%.*', items: [
      {label: '31% STARTS AT', value: 'R383,100', color: 'paper'},
      {label: 'ABOVE THE LINE', value: 'R16,900', color: 'accent'},
    ]},
    {type: 'reveal', dur: 350, kicker: 'The R20,000 raise', punch: 'More money,\n*not less.*', items: [
      {label: 'EXTRA TAX', value: R(d.bracket.extra), color: 'alert'},
      {label: 'YOU KEEP', value: R(d.bracket.keep), color: 'accent'},
    ]},
    {type: 'outro', dur: 150, lines: 'It taxes the next rand,\n*not every rand.*', disclaimer: '2026/27 SARS tax tables, under 65. Rebates don’t change the difference.\nIllustration, not tax advice.'},
  ],
}, tB as T);
