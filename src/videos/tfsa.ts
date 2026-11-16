// "R10 a day from age 12" — a TFSA Short for South African kids.
// Rules: SARS Tax Free Investments page (annual limit R46,000 from 1 March 2026; lifetime R500,000; 40% on excess;
// parents may invest on behalf of a minor, using the child's own limits; withdrawals can't be replaced).
// Growth: calc in tfsa.data.json — R300/month, 6% a year after inflation (today's rands), monthly compounding, before fees.
import {Recipe} from '../template';
import d from '../tfsa.data.json';
import t from './TFSAKids.timing.json';

const timed = (r: Recipe, tt: {dur: number; cues: number[]}[], audio: string): Recipe => ({...r, audio, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});
const R = (n: number) => 'R' + Math.round(n).toLocaleString('en-US');

export const tfsaKids: Recipe = timed({
  id: 'TFSAKids',
  channel: 'THE SUM OF IT',
  currency: 'R',
  thumb: {kicker: 'R10 A DAY, FROM AGE 12', from: 'R300/mo', link: 'becomes', to: R(d.lerato.end), foot: 'tax-free by 60, in today\'s money'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'For South African kids', lines: ['*R10 a day.*', 'About R300\na month.'], question: 'Start at 12. What could it become?'},
    {
      type: 'people', dur: 300, kicker: 'Same savings. Different start', footnote: 'Both use a tax-free savings account (TFSA).',
      people: [
        {name: 'Lerato', color: 'accent', tag: 'STARTS AT 12', note: 'Birthday + pocket money. A parent opens a TFSA in her name.', statLabel: 'EVERY MONTH', stat: 'R300'},
        {name: 'Ayanda', color: 'paper', tag: 'STARTS AT 25', note: 'Waits until he is working, then saves the same.', statLabel: 'EVERY MONTH', stat: 'R300'},
      ],
    },
    {
      type: 'race', dur: 400, kicker: 'Watch them grow', xLabel: 'AGE', xStart: 12, xEnd: 60, xTicks: [12, 25, 40, 60],
      yMax: 1000000, yTicks: [0, 250000, 500000, 750000, 1000000],
      series: [
        {name: 'Lerato · from 12', color: 'accent', data: d.lerato.curve},
        {name: 'Ayanda · from 25', color: 'paper', data: d.ayanda.curve, startAt: 25},
      ],
      notes: [
        {at: 25, text: 'Ayanda starts', x: 14, yValue: 900000, color: 'paper'},
        {at: 52, text: 'The gap keeps\nwidening', x: 14, yValue: 740000, color: 'accent'},
      ],
    },
    {
      type: 'reveal', dur: 300, kicker: 'At 60 · in today\'s money',
      items: [
        {label: `AYANDA · PUT IN ${R(d.ayanda.put_in)}`, value: R(d.ayanda.end), color: 'paper'},
        {label: `LERATO · PUT IN ${R(d.lerato.put_in)}`, value: R(d.lerato.end), color: 'accent'},
      ],
      punch: 'More than double.\n*Just by starting earlier.*',
    },
    {
      type: 'reveal', dur: 330, kicker: 'The TFSA rules · SARS',
      items: [
        {label: 'TAX ON YOUR GROWTH', value: 'R0', color: 'accent'},
        {label: 'MAX PER YEAR (FROM 1 MARCH 2026)', value: 'R46,000', color: 'paper'},
        {label: 'MAX IN YOUR LIFETIME', value: 'R500,000', color: 'alert'},
      ],
      punch: 'Go over: *40% penalty.*\nMoney taken out\ncan\'t go back in.',
    },
    {
      type: 'outro', dur: 150, lines: 'Ask a parent to open one\nin your name.\n*Start with what you can.*',
      disclaimer: 'Illustration only: R300 a month, 6% a year after inflation (today\'s rands), compounded monthly, before fees. Investments can fall as well as rise. TFSA limits per SARS, 2026/27 tax year. Not financial advice.',
    },
  ],
}, t as {dur: number; cues: number[]}[], 'audio/TFSAKids.mp3');
