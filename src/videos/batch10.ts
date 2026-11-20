// Batch 10 (Nov 2026): "Sport, by the numbers". Figures only from match reports; no footage, no opinion on officials.
// Sources: research/batch10-sources.md
import {Recipe} from '../template';
import tF from './FranceBoks.timing.json';
import tW from './WalesAB.timing.json';

type T = {dur: number; cues: number[]}[];
const timed = (r: Recipe, tt: T): Recipe => ({...r, audio: `audio/${r.id}.mp3`, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});
const CH = 'THE SUM OF IT';

export const franceBoks = timed({
  id: 'FranceBoks', channel: CH, theme: 'rugby',
  thumb: {kicker: 'FRANCE 21–19 SOUTH AFRICA', from: 'The Springboks lost by two points.', link: 'A try is worth', to: '5', foot: 'the numbers'},
  scenes: [
    {type: 'hook', dur: 120, kicker: 'Nations Championship · Paris', lines: ['The Springboks lost', '*by two points.*']},
    {type: 'reveal', dur: 146, kicker: 'Full time · Stade de France', punch: 'Two points.\n*In Paris.*', items: [
      {label: 'FRANCE', value: '21', color: 'paper'},
      {label: 'SOUTH AFRICA', value: '19', color: 'paper'},
    ]},
    {type: 'reveal', dur: 248, kicker: 'Half-time: 21–7', punch: '*Second half.*', items: [
      {label: 'FRANCE', value: '0', color: 'alert'},
      {label: 'SOUTH AFRICA', value: '12', color: 'accent'},
    ]},
    {type: 'reveal', dur: 235, kicker: 'The cards', punch: 'In one match.', items: [
      {label: 'CARDS · 1 RED, 4 YELLOW', value: '5', color: 'paper'},
      {label: 'FRANCE A PLAYER SHORT · 2ND HALF', value: '28 min', color: 'alert'},
    ]},
    {type: 'reveal', dur: 189, kicker: 'Minutes 61 to 65', punch: 'In a row.', items: [
      {label: 'SCRUM PENALTIES WON BY SOUTH AFRICA', value: '4', color: 'accent'},
    ]},
    {type: 'reveal', dur: 132, kicker: 'Rugby arithmetic', punch: 'Figures,\n*not opinions.*', items: [
      {label: 'A TRY', value: '5 pts', color: 'paper'},
      {label: 'THE MARGIN', value: '2 pts', color: 'alert'},
    ]},
    {type: 'outro', dur: 228, lines: 'Two points.\n*That’s the sum.*', disclaimer: 'Figures from match reports (Daily Maverick, RUCK), 13 Nov 2026. No opinion on any decision.'},
  ],
}, tF as T);

export const walesAB = timed({
  id: 'WalesAB', channel: CH, theme: 'rugby',
  thumb: {kicker: 'WALES 35–28 NEW ZEALAND', from: 'Wales beat the All Blacks.', link: 'The last time was', to: '1953', foot: '73 years'},
  scenes: [
    {type: 'hook', dur: 175, kicker: 'Nations Championship · Cardiff', lines: ['Wales beat the All Blacks.', '*It took 73 years.*']},
    {type: 'reveal', dur: 187, kicker: 'Full time · Principality Stadium', punch: 'Five tries\n*to four.*', items: [
      {label: 'WALES', value: '35', color: 'accent'},
      {label: 'NEW ZEALAND', value: '28', color: 'paper'},
    ]},
    {type: 'reveal', dur: 119, kicker: 'The last time', punch: '*73 years.*', items: [
      {label: 'WALES’ PREVIOUS WIN', value: '1953', color: 'paper'},
    ]},
    {type: 'reveal', dur: 244, kicker: 'Same stadium · 12 months', punch: '*33-point*\nswing.', items: [
      {label: 'NOV 2025', value: 'Lost 26–52', color: 'alert'},
      {label: 'NOV 2026', value: 'Won 35–28', color: 'accent'},
    ]},
    {type: 'reveal', dur: 149, kicker: 'Final quarter', punch: 'Held up.', items: [
      {label: 'ALL BLACKS HELD UP OVER THE LINE', value: '3 times', color: 'paper'},
    ]},
    {type: 'outro', dur: 223, lines: 'Seventy-three years.\n*That’s the sum.*', disclaimer: 'Figures from match reports (1News, ESPN), 14 Nov 2026 and 22 Nov 2025. No opinion on any decision.'},
  ],
}, tW as T);
