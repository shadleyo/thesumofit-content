// Sport, by the numbers: "Penalty try, or not?" France 21-19 South Africa, 13 Nov 2026.
// Reconstruction from match reports (RUCK: inside the French 22, deliberate knock-down, two-man overlap, yellow card, no penalty try;
// Planet Rugby: two attackers against no defenders, no French cover behind). Positions illustrative. Law 8.3 (penalty try: probable try; 7 points).
// CORRECTION 15 Nov (see research/batch10-sources.md): Yahoo Sports' live report of the same incident says the opposite —
// "They decide that there is cover." The published video (already live, left as-is) stated "0 defenders" as flat fact;
// this file now shows the covering defender as DISPUTED rather than omitting him, per the new house rule: show source
// conflicts, don't silently pick a side. Not re-rendered/re-published — this is the corrected source for any future reuse.
import type {BoardRecipe, KF} from '../board';
import t from './PenaltyTry.timing.json';

const T = t as {dur: number; cues: number[]}[];
const S = T.reduce<number[]>((a, s) => [...a, a[a.length - 1] + s.dur], [0]);  // beat start frames
const c = (beat: number, cue: number) => S[beat] + T[beat].cues[cue];
const END = S[T.length];
const PASS = c(3, 0) + 6, HIT = c(3, 1) + 4, DOWN = HIT + 14;
const still = (x: number, y: number, from = S[1]): KF[] => [[from, x, y]];
const run = (x0: number, y0: number, x1: number, y1: number): KF[] => [[S[1], x0, y0], [HIT, x1, y1]];

export const penaltyTry: BoardRecipe = {
  id: 'PenaltyTry', audio: 'audio/PenaltyTry.mp3', dur: END, series: 'Sport, by the numbers',
  match: 'France 21–19 South Africa · 13 Nov 2026', note: 'Rebuilt from match reports. Positions illustrative, not to scale.',
  teams: {a: 'South Africa', b: 'France'},
  dots: [
    {id: 'c', team: 'a', kf: run(12.5, 14, 14, 9.5)},
    {id: 'r1', team: 'a', kf: run(19.5, 13.5, 21, 9), ring: [c(2, 1), S[3]]},
    {id: 'r2', team: 'a', kf: run(26, 14, 27.5, 9.5), ring: [c(2, 1), S[3]]},
    {id: 's4', team: 'a', kf: run(7, 16, 8, 13)},
    {id: 's5', team: 'a', kf: run(2.5, 17, 3, 14.5)},
    {id: 'f1', team: 'b', kf: [[S[1], 16.5, 6], [PASS, 17, 7.5], [HIT, 17.6, 9]], ring: [c(3, 1), S[5]]},
    {id: 'f2', team: 'b', kf: run(10.5, 8, 11.5, 9)},
    {id: 'f3', team: 'b', kf: run(6, 9, 6.5, 10)},
    {id: 'f4', team: 'b', kf: run(2, 10, 2.5, 11)},
    // Yahoo Sports' live report says officials judged there was cover here; Planet Rugby says there wasn't. Shown disputed.
    {id: 'cov', team: 'b', kf: run(22, 2.5, 22.8, 8.2), disputed: true},
  ],
  ball: [[S[1], 12.5, 13.2], [PASS, 14.2, 9.3], [HIT, 17.6, 9.3], [DOWN, 17.2, 11.2]],
  captions: [
    {from: S[0], to: S[1], kicker: 'France v South Africa', lines: [{at: c(0, 0), text: 'Should the Springboks have'}, {at: c(0, 0) + 8, text: 'had a penalty try?'}, {at: c(0, 1), text: 'The law, and the numbers'}]},
    {from: S[1], to: S[2], kicker: 'Rebuilt from match reports', lines: [{at: c(1, 0), text: 'Half-time: France 21–7'}, {at: c(1, 1), text: 'Early in the second half'}, {at: c(1, 2), text: 'Boks attack inside the 22'}]},
    {from: S[2], to: S[3], kicker: 'The overlap', lines: [{at: c(2, 0), text: 'A two-man overlap'}, {at: c(2, 1), text: 'Two attackers'}, {at: c(2, 2), text: 'Reports disagree on cover'}]},
    {from: S[3], to: S[4], kicker: 'The moment', lines: [{at: c(3, 0), text: 'The pass goes wide'}, {at: c(3, 1), text: 'A French hand knocks it down'}, {at: c(3, 2), text: 'Deliberately'}]},
    {from: S[4], to: S[5], kicker: 'The decision', lines: [{at: c(4, 0), text: 'Penalty'}, {at: c(4, 1), text: 'Yellow card'}]},
    {from: S[5], to: S[6], kicker: 'Law 8 · Scoring', lines: [{at: c(5, 0), text: 'Penalty try: when foul play'}, {at: c(5, 0) + 30, text: 'prevents a probable try'}]},
    {from: S[6], to: S[7], kicker: 'The numbers', lines: [{at: c(6, 0), text: 'A penalty try is worth'}]},
    {from: S[7], to: END + 30, kicker: 'France 21–19 South Africa', lines: [{at: c(7, 0), text: 'Two on none, inside the 22'}]},
  ],
  overlays: [
    {type: 'zone', from: c(2, 2), to: S[3], x: 18.5, y: 0.6, w: 11.5, h: 6.6},
    {type: 'label', from: c(2, 2), to: S[3], x: 24.2, y: 4, text: 'cover disputed', tone: 'cream', size: 38},
    {type: 'label', from: c(2, 1), to: S[3], x: 24.3, y: 11.6, text: '2 attackers', tone: 'gold', size: 38},
    {type: 'burst', from: HIT, to: HIT + 40, x: 17.6, y: 9.3},
    {type: 'card', from: c(4, 1), to: S[5], x: 20.4, y: 6.4},
    {type: 'path', from: c(7, 0), to: END + 30, pts: [[21, 8.2], [21.5, 0.3]], color: '#E9B93B'},
    {type: 'path', from: c(7, 0) + 6, to: END + 30, pts: [[27.5, 8.7], [28, 0.3]], color: '#E9B93B'},
    {type: 'label', from: c(7, 1), to: END + 30, x: 24.6, y: 4.2, text: '?', tone: 'gold', size: 90},
  ],
  bigs: [
    {from: c(4, 2), to: S[5], y: 1180, lines: [{at: c(4, 2), text: 'No penalty try', tone: 'red', size: 88}]},
    {from: c(5, 1), to: S[6], y: 1180, lines: [{at: c(5, 1), text: 'Possible', tone: 'navy', size: 80, strike: c(5, 1) + 14}, {at: c(5, 2), text: 'Probable', tone: 'gold', size: 96}]},
    {from: c(6, 1), to: S[7], y: 1180, lines: [{at: c(6, 1), text: '7 points', tone: 'gold', size: 100}, {at: c(6, 2), text: 'Lost by 2', tone: 'red', size: 88}]},
    {from: c(7, 1), to: END + 30, y: 1180, lines: [{at: c(7, 1), text: 'Probable, or not?', tone: 'cream', size: 92}, {at: c(7, 2), text: 'You be the referee', tone: 'gold', size: 60}]},
  ],
};
