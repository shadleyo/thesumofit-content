// Sport, by the numbers: "Should Arendse's try have stood?" France 21-19 South Africa, 13 Nov 2026.
// Reconstruction from match reports (Irish Times: "ruled offside after he sliced through the French defence
// at the back of a long lineout"; RugbyPass: Marx's long throw, Arendse "encroached on the 10 metres").
// Positions illustrative. World Rugby Law 18 (lineout: 10m offside line until the ball leaves the hands).
import type {BoardRecipe, KF} from '../board';
import t from './ArendseOffside.timing.json';

const T = t as {dur: number; cues: number[]}[];
const S = T.reduce<number[]>((a, s) => [...a, a[a.length - 1] + s.dur], [0]);  // beat start frames
const c = (beat: number, cue: number) => S[beat] + T[beat].cues[cue];
const END = S[T.length];
const THROW = c(1, 2) + 4;     // Marx throws long
const EARLY = THROW - 18;      // Arendse starts moving just before the ball leaves the hand
const CATCH = c(2, 0) + 10;    // Arendse breaks through / takes the ball
const DOWN = c(2, 1) + 6;      // runs it in
const still = (x: number, y: number, from = S[1]): KF[] => [[from, x, y]];

export const arendseOffside: BoardRecipe = {
  id: 'ArendseOffside', audio: 'audio/ArendseOffside.mp3', dur: END, series: 'Sport, by the numbers',
  match: 'France 21–19 South Africa · 13 Nov 2026', note: 'Rebuilt from match reports. Positions illustrative, not to scale. No view taken on the decision.',
  teams: {a: 'South Africa', b: 'France'},
  dots: [
    // the two files of forwards at the lineout, line of touch at y=8
    {id: 'a1', team: 'a', kf: still(28.5, 8)}, {id: 'a2', team: 'a', kf: still(26, 8)}, {id: 'a3', team: 'a', kf: still(23.5, 8)}, {id: 'a4', team: 'a', kf: still(21, 8)}, {id: 'a5', team: 'a', kf: still(18.5, 8)},
    {id: 'b1', team: 'b', kf: still(28.5, 9.2)}, {id: 'b2', team: 'b', kf: still(26, 9.2)}, {id: 'b3', team: 'b', kf: still(23.5, 9.2)}, {id: 'b4', team: 'b', kf: still(21, 9.2)}, {id: 'b5', team: 'b', kf: still(18.5, 9.2)},
    // thrower, at the touchline
    {id: 'marx', team: 'a', kf: still(30, 8)},
    // a French cover defender tracking back
    {id: 'f14', team: 'b', kf: [[S[1], 18, 12], [DOWN, 18.5, 6]]},
    // Arendse: starts behind the 10m line, breaks early, runs it in
    {id: '14', team: 'a', kf: [[S[1], 19, 18], [EARLY, 19, 18], [CATCH, 18.5, 8.3], [DOWN, 18, 3]], ring: [EARLY, c(3, 3)]},
  ],
  ball: [[THROW, 30, 8], [CATCH, 18.5, 8.3], [DOWN, 18, 3]],
  captions: [
    {from: S[0], to: S[1], kicker: 'France v South Africa', lines: [{at: c(0, 0), text: "Should Kurt-Lee Arendse's"}, {at: c(0, 0) + 8, text: 'try have stood?'}, {at: c(0, 1), text: "Here's the law, and the call"}]},
    {from: S[1], to: S[2], kicker: 'Rebuilt from match reports', lines: [{at: c(1, 0), text: 'South Africa have a lineout'}, {at: c(1, 1), text: 'Deep in French territory'}, {at: c(1, 2), text: 'Marx throws long, over the top'}]},
    {from: S[2], to: S[3], kicker: 'The break', lines: [{at: c(2, 0), text: 'Arendse breaks through'}, {at: c(2, 1), text: 'Runs it in'}, {at: c(2, 2), text: 'The crowd thinks: try'}]},
    {from: S[3], to: S[4], kicker: 'Law 18 · Lineout', lines: [{at: c(3, 0), text: 'The referee rules him offside'}, {at: c(3, 1), text: 'Law eighteen: stay 10m back'}, {at: c(3, 4), text: "until the ball leaves the hand"}]},
    {from: S[4], to: S[5], kicker: 'The call', lines: [{at: c(4, 0), text: 'By the reports: he went early'}, {at: c(4, 1), text: 'The try is chalked off'}, {at: c(4, 2), text: 'No points'}]},
    {from: S[5], to: S[6], kicker: 'France 21–19 South Africa', lines: [{at: c(5, 0), text: 'France won by two'}, {at: c(5, 2), text: 'The margin was metres, not points'}]},
    {from: S[6], to: END + 30, kicker: 'The call', lines: [{at: c(6, 0), text: 'Harsh, or by the book?'}]},
  ],
  overlays: [
    {type: 'zone', from: S[1], to: S[4], x: 16, y: 17.3, w: 15, h: 1.4},
    {type: 'label', from: S[1] + 10, to: S[4], x: 23.5, y: 16.2, text: '10m offside line', tone: 'navy', size: 32},
    {type: 'path', from: S[2], to: CATCH + 10, pts: [[19, 18], [18.6, 11], [18.5, 8.3]], color: '#F3EDE2'},
    {type: 'burst', from: EARLY, to: EARLY + 40, x: 19, y: 17.8},
    {type: 'label', from: c(3, 2), to: S[4], x: 23.5, y: 19.6, text: 'went early', tone: 'red', size: 34},
    {type: 'path', from: c(6, 0), to: END + 30, pts: [[15, 7], [15.5, 0.3]], color: '#E9B93B'},
    {type: 'path', from: c(6, 0) + 6, to: END + 30, pts: [[21, 7.5], [21.5, 0.3]], color: '#E9B93B'},
    {type: 'label', from: c(6, 1), to: END + 30, x: 18.2, y: 4.2, text: '?', tone: 'gold', size: 90},
  ],
  bigs: [
    {from: c(4, 1), to: S[5], y: 1180, lines: [{at: c(4, 1), text: 'Offside', tone: 'red', size: 96}, {at: c(4, 2), text: 'No try', tone: 'red', size: 88}]},
    {from: c(5, 0), to: S[6], y: 1180, lines: [{at: c(5, 0), text: 'France 21–19', tone: 'gold', size: 88}, {at: c(5, 1), text: 'Lost by 2', tone: 'red', size: 80}]},
    {from: c(6, 1), to: END + 30, y: 1180, lines: [{at: c(6, 1), text: 'Harsh, or by the book?', tone: 'cream', size: 76}, {at: c(6, 2), text: 'You be the referee', tone: 'gold', size: 60}]},
  ],
};
