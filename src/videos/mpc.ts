// SARB MPC reaction (same-day). Data: calc/mpc.py -> src/mpc.data.json; script scripts/MPC.txt. Run: python3 calc/mpc.py <hold|cut|hike>
import {Recipe} from '../template';
import d from '../mpc.data.json';
import tM from './MPC.timing.json';

type T = {dur: number; cues: number[]}[];
const timed = (r: Recipe, tt: T): Recipe => ({...r, audio: `audio/${r.id}.mp3`, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});
const R = (n: number) => 'R' + Math.round(n).toLocaleString('en-US');
const pct = (n: number) => `${n}%`;
const k = d.kind as 'hold' | 'cut' | 'hike';
const hook = {hold: '*held the rate.*', cut: '*cut the rate.*', hike: '*raised the rate.*'}[k];
const gap = k === 'hold' ? 'No change\n*this time.*' : `${d.diff > 0 ? '+' : '−'}${R(Math.abs(d.diff))} a month\n*${d.diff > 0 ? 'more' : 'less'} than before.*`;
const outro = {hold: 'No change this time.\n*Watch the next one.*', cut: 'Relief, but small.\n*Keep paying the old amount.*', hike: 'Small each month.\n*Big over 20 years.*'}[k];

export const mpc = timed({
  id: 'MPC', channel: 'THE SUM OF IT', currency: 'R',
  thumb: {kicker: 'SARB · RATE DECISION', from: `Repo ${pct(d.repo)}. Prime ${pct(d.prime)}.`, link: 'R1.5m bond, per month:', to: R(d.p1), foot: k === 'hold' ? 'no change' : `${d.diff > 0 ? '+' : '−'}${R(Math.abs(d.diff))} a month`},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'Rate decision', lines: ['The Reserve Bank', hook]},
    {type: 'reveal', dur: 330, kicker: 'SA Reserve Bank · MPC', punch: 'Prime sets\n*your bond.*', items: [
      {label: 'REPO RATE', value: pct(d.repo), color: 'paper'},
      {label: 'PRIME', value: pct(d.prime), color: k === 'hike' ? 'alert' : 'accent'},
    ]},
    {type: 'reveal', dur: 400, kicker: 'R1.5 million bond · 20 years', punch: gap, items: [
      {label: 'MONTHLY REPAYMENT', value: R(d.p1), color: k === 'hike' ? 'alert' : 'paper'},
    ]},
    {type: 'outro', dur: 150, lines: outro, disclaimer: `Illustration: R1.5 million home loan over 20 years at prime ${pct(d.prime)}, fixed at that level, monthly repayments (before: prime 10.75%). Banks may price your bond above or below prime. Source: SA Reserve Bank. Not financial advice.`},
  ],
}, tM as T);
