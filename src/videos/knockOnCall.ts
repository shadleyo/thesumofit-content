// Sport, by the numbers: "Should that knock-on have stood?" Wales 35-28 New Zealand, 14 Nov 2026.
// Single-sourced to 1News (15 Nov): Fainga'anuku "held up"; Aumua failed to ground it; "with four minutes
// remaining, Brousset found an All Blacks knock-on" after first signalling play-on; referee "did not reward
// New Zealand's scrum dominance" and didn't "penalise Wales once in the final 10 minutes."
// No second report found for this specific call (see research/batch10-sources.md) — treated as one outlet's
// account, not cross-verified fact, per house rule. Positions illustrative, not to scale. No view taken on the call.
import type {BoardRecipe, KF} from '../board';
import t from './KnockOnCall.timing.json';

const T = t as {dur: number; cues: number[]}[];
const S = T.reduce<number[]>((a, s) => [...a, a[a.length - 1] + s.dur], [0]);  // beat start frames
const c = (beat: number, cue: number) => S[beat] + T[beat].cues[cue];
const END = S[T.length];
const HELDUP1 = c(2, 0) + 14;   // Fainga'anuku held up
const HELDUP2 = c(2, 1) + 10;   // Aumua can't ground it
const RECYCLE = HELDUP2 + 8;
const KNOCKON = c(3, 3) + 6;    // the knock-on itself
const still = (x: number, y: number, from = S[1]): KF[] => [[from, x, y]];

export const knockOnCall: BoardRecipe = {
  id: 'KnockOnCall', audio: 'audio/KnockOnCall.mp3', dur: END, series: 'Sport, by the numbers',
  match: 'Wales 35–28 New Zealand · 14 Nov 2026', note: 'Rebuilt from a single match report (1News). Positions illustrative, not to scale. No view taken on the call.',
  teams: {a: 'New Zealand', b: 'Wales'},
  dots: [
    // Wales defensive wall, packed on their own tryline
    {id: 'w1', team: 'b', kf: still(8, 2.5)}, {id: 'w2', team: 'b', kf: still(13, 2)}, {id: 'w3', team: 'b', kf: still(18, 1.5)}, {id: 'w4', team: 'b', kf: still(23, 2)}, {id: 'w5', team: 'b', kf: still(27, 2.5)},
    // New Zealand forwards stacked behind the ball carriers
    {id: 'nz1', team: 'a', kf: still(14, 9.5)}, {id: 'nz2', team: 'a', kf: still(19, 10)}, {id: 'nz3', team: 'a', kf: still(24, 9.5)},
    // Fainga'anuku: drives at the line, held up
    {id: 'fain', team: 'a', kf: [[S[1], 17, 10], [HELDUP1, 17, 3.5]], ring: [HELDUP1, HELDUP2]},
    // Aumua: follows up, can't ground it
    {id: 'aumua', team: 'a', kf: [[S[1], 19, 11], [HELDUP2, 18.5, 2.7]], ring: [HELDUP2, KNOCKON]},
  ],
  ball: [[S[1], 17, 10], [HELDUP1, 17, 3.5], [RECYCLE, 18.5, 2.7], [KNOCKON, 19, 1.6]],
  captions: [
    {from: S[0], to: S[1], kicker: 'Wales v New Zealand', lines: [{at: c(0, 0), text: 'Should that knock-on'}, {at: c(0, 0) + 8, text: 'have stood?'}, {at: c(0, 1), text: "Here's the moment that ended it"}]},
    {from: S[1], to: S[2], kicker: 'Rebuilt from match reports', lines: [{at: c(1, 0), text: 'Wales lead by seven'}, {at: c(1, 1), text: 'Final quarter'}, {at: c(1, 2), text: 'New Zealand camp on the Welsh line'}]},
    {from: S[2], to: S[3], kicker: 'The pressure', lines: [{at: c(2, 0), text: "Fainga'anuku is held up"}, {at: c(2, 1), text: "Aumua can't ground it"}, {at: c(2, 2), text: 'Wales survive again'}]},
    {from: S[3], to: S[4], kicker: 'The call', lines: [{at: c(3, 0), text: 'Four minutes left'}, {at: c(3, 1), text: 'The referee first waves play on'}, {at: c(3, 2) + 4, text: 'Then reverses it: knock-on'}]},
    {from: S[4], to: S[5], kicker: '1News, 15 Nov', lines: [{at: c(4, 0), text: 'By the reports'}, {at: c(4, 1), text: 'No penalty for Wales'}, {at: c(4, 2), text: "despite New Zealand's scrum"}]},
    {from: S[5], to: S[6], kicker: 'Wales 35–28 New Zealand', lines: [{at: c(5, 0), text: 'Wales hold on'}, {at: c(5, 2), text: 'Their first win in 73 years'}]},
    {from: S[6], to: END + 30, kicker: 'The call', lines: [{at: c(6, 0), text: 'Harsh, or the right one?'}]},
  ],
  overlays: [
    {type: 'zone', from: S[2], to: S[5], x: 5, y: 0.6, w: 24, h: 3.6},
    {type: 'label', from: HELDUP1, to: S[3], x: 22, y: 3.2, text: 'held up', tone: 'red', size: 34},
    {type: 'label', from: HELDUP2 + 6, to: S[3], x: 23.5, y: 1.6, text: "can't ground it", tone: 'red', size: 30},
    {type: 'burst', from: KNOCKON, to: KNOCKON + 40, x: 19, y: 1.6},
    {type: 'label', from: c(3, 3), to: S[4], x: 23.5, y: 4.6, text: 'knock-on', tone: 'gold', size: 36},
    {type: 'label', from: c(4, 1) + 4, to: S[5], x: 23.5, y: 17.6, text: 'no penalty, final 10', tone: 'navy', size: 30},
    {type: 'path', from: c(6, 0), to: END + 30, pts: [[15, 7], [15.5, 0.3]], color: '#E9B93B'},
    {type: 'path', from: c(6, 0) + 6, to: END + 30, pts: [[21, 7.5], [21.5, 0.3]], color: '#E9B93B'},
    {type: 'label', from: c(6, 1), to: END + 30, x: 18.2, y: 4.2, text: '?', tone: 'gold', size: 90},
  ],
  bigs: [
    {from: c(3, 2) + 4, to: S[4], y: 1180, lines: [{at: c(3, 2) + 4, text: 'Knock-on', tone: 'red', size: 96}, {at: c(3, 3), text: 'All Blacks', tone: 'red', size: 70}]},
    {from: c(5, 0), to: S[6], y: 1180, lines: [{at: c(5, 0), text: 'Wales 35–28', tone: 'gold', size: 88}, {at: c(5, 1), text: '73 years in the making', tone: 'cream', size: 54}]},
    {from: c(6, 1), to: END + 30, y: 1180, lines: [{at: c(6, 1), text: 'Harsh, or the right one?', tone: 'cream', size: 70}, {at: c(6, 2), text: 'You be the referee', tone: 'gold', size: 60}]},
  ],
};
