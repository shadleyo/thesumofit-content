// Sport, by the numbers: "Unnaturally bigger?" Arsenal 1-1 Borussia Dortmund, Emirates, Tue 24 Nov 2026 (UCL league phase, MD5).
// Cross-verified: Gyökeres opened the scoring early (~10': Goal/Livescore, Football Insider, africasoccer); second-half Dortmund
// corner struck Gyökeres on the arm inside the Arsenal box (Goal, Britbrief, Roundtable, africasoccer, Football Insider,
// getfootballnewsgermany); 51' (africasoccer, Football Insider); referee Maurizio Mariani played on and was not sent to the
// monitor (GFNG, africasoccer, Football Insider, sportsnewsreport); Beier equalised 55' (Goal, Football Insider); 1-1;
// Kovač: "I thought VAR should have looked at the handball" (Goal, Britbrief, Roundtable); Dortmund 7th on 10, Arsenal 5th
// on 11 (Goal, africasoccer, Roundtable). Law 12 (FA 2026/27 Laws of the Game): "Not every touch of a player's hand/arm with
// the ball is an offence"; offence when the hand/arm "has made their body unnaturally bigger", i.e. position "not a
// consequence of, or justifiable by, the player's body movement for that specific situation".
// DISPUTED, shown: whether VAR checked at all — Football Insider "VAR quickly checked but saw nothing wrong" vs Goal
// "the VAR opted not to review" / africasoccer "VAR chose not to intervene".
// SINGLE-SOURCED, labelled ONE REPORT: Keith Hackett "Gyokeres moved his arm towards the ball. It's a penalty." (Football
// Insider); Patrick Ittrich "For me, it was a clear penalty." (getfootballnewsgermany, via Prime Video).
// NOT used: Svensson as corner taker (one source); arm mechanism details (differ); Clattenburg (Roundtable only); Bellingham
// offside goal; 30 shots / woodwork (Britbrief only); VAR official (not named anywhere). Positions illustrative. No view taken.
import type {BoardRecipe} from '../board';
import t from './GyokeresHandball.timing.json';

const T = t as {dur: number; cues: number[]}[];
const S = T.reduce<number[]>((a, s) => [...a, a[a.length - 1] + s.dur], [0]);  // beat start frames
const c = (beat: number, cue: number) => S[beat] + T[beat].cues[cue];
const END = S[T.length];
const DELIVER = c(1, 2) + 10;   // corner swung in
const CONTACT = c(1, 4) + 6;    // ball hits Gyökeres' arm
const GONE = c(5, 0);           // board clears for the numbers
const UP = S[3] + 25;           // players step up towards the goal line while the Law is on screen
const HOLD = S[5] - 6;

export const gyokeresHandball: BoardRecipe = {
  id: 'GyokeresHandball', audio: 'audio/GyokeresHandball.mp3', dur: END, series: 'Sport, by the numbers', pitch: 'football-box', ballUntil: GONE,
  match: 'Arsenal 1–1 Dortmund · Emirates · 24 Nov 2026',
  note: 'Rebuilt from match reports and Law 12. Positions illustrative, not to scale. Hackett and Ittrich verdicts are one report each. No view taken.',
  teams: {a: 'Arsenal', b: 'Dortmund', aColor: '#D2343A', bColor: '#F2C230'},
  dots: [
    // Arsenal, defending the goal at the top (y = 0)
    {id: 'gk', team: 'a', until: GONE, kf: [[S[1], 16.9, 1.0], [CONTACT, 18.2, 1.2], [S[5], 17.4, 1.0]]},
    {id: 'vg', team: 'a', label: 'VG', until: GONE, kf: [[S[1], 25.5, 9.5], [DELIVER, 24.6, 7.4], [CONTACT, 24.0, 6.4], [CONTACT + 20, 23.8, 6.2], [UP, 24.5, 4.4], [HOLD, 24.5, 4.4]], ring: [c(1, 0), c(2, 0) + 40]},
    {id: 'a3', team: 'a', until: GONE, kf: [[S[1], 12, 4.5], [CONTACT, 13.2, 3.8], [UP, 11.5, 3.2], [HOLD, 11.5, 3.2]]},
    {id: 'a4', team: 'a', until: GONE, kf: [[S[1], 18.5, 7], [CONTACT, 19.5, 5.6], [UP, 18.8, 4.0], [HOLD, 18.8, 4.0]]},
    {id: 'a5', team: 'a', until: GONE, kf: [[S[1], 8.5, 8.5], [CONTACT, 10, 7.2], [UP, 8.5, 5], [HOLD, 8.5, 5]]},
    // Dortmund, attacking the corner
    {id: 'b1', team: 'b', until: GONE, kf: [[S[1], 22, 13], [CONTACT, 22.4, 7.8], [UP, 21.6, 6.6], [HOLD, 21.6, 6.6]]},
    {id: 'b2', team: 'b', until: GONE, kf: [[S[1], 15.5, 12], [CONTACT, 16, 6.2], [UP, 15.2, 6.4], [HOLD, 15.2, 6.4]]},
    {id: 'b3', team: 'b', until: GONE, kf: [[S[1], 10.5, 13], [CONTACT, 11.5, 7.6], [UP, 12.4, 7.2], [HOLD, 12.4, 7.2]]},
    {id: 'b4', team: 'b', until: GONE, kf: [[S[1], 19.5, 14], [CONTACT, 19.8, 9.4], [UP, 19, 8.2], [HOLD, 19, 8.2]]},
  ],
  ball: [[S[1], 33.2, 0.6], [DELIVER, 33.2, 0.6], [CONTACT, 24.2, 6.3], [CONTACT + 24, 30.5, 12.5], [S[5], 30.5, 12.5]],
  captions: [
    {from: S[0], to: S[1], kicker: 'Arsenal v Dortmund · Champions League', lines: [{at: c(0, 1), text: 'Dortmund want a penalty'}, {at: c(0, 2), text: 'The referee plays on'}]},
    {from: S[1], to: S[2], kicker: "51' · rebuilt from match reports", lines: [{at: c(1, 0), text: 'Gyökeres: 1–0, early'}, {at: c(1, 1), text: 'Second half · Dortmund corner'}, {at: c(1, 4), text: 'Ball hits his arm'}]},
    {from: S[2], to: S[3], kicker: 'Referee Maurizio Mariani', lines: [{at: c(2, 0), text: 'Play on'}, {at: c(2, 1), text: 'No penalty'}, {at: c(2, 2), text: 'No trip to the monitor'}]},
    {from: S[3], to: S[4], kicker: 'Law 12 · Handling the ball', lines: [{at: c(3, 0), text: 'The test'}]},
    {from: S[4], to: S[5], kicker: 'What they said', lines: [{at: c(4, 0), text: 'Penalty?'}]},
    {from: S[5], to: S[6], kicker: "Maximilian Beier · 55'", lines: [{at: c(5, 0), text: 'Four minutes later'}, {at: c(5, 2), text: '1–1'}]},
    {from: S[6], to: END + 30, kicker: 'Arsenal 1–1 Dortmund', lines: [{at: c(6, 0), text: 'No penalty'}]},
  ],
  overlays: [
    {type: 'path', from: DELIVER, to: S[2], pts: [[33.2, 0.6], [28.6, 4.6], [24.2, 6.3]], color: '#F3EDE2'},
    {type: 'burst', from: CONTACT, to: CONTACT + 40, x: 24.1, y: 6.3},
    {type: 'label', from: DELIVER, to: c(1, 4), x: 27, y: 22.5, text: 'Dortmund corner', tone: 'cream', size: 30},
    {type: 'label', from: c(1, 4) + 10, to: S[2], x: 27, y: 22.5, text: 'ball hits arm', tone: 'cream', size: 30},
    {type: 'label', from: c(2, 0), to: c(2, 3), x: 8.4, y: 22.5, text: 'PLAY ON', tone: 'cream', size: 30},
    {type: 'label', from: c(2, 2), to: c(2, 3), x: 25.5, y: 22.5, text: 'NO ON-FIELD REVIEW', tone: 'navy', size: 28},
  ],
  bigs: [
    {from: c(0, 1), to: S[1], y: 1000, lines: [{at: c(0, 1), text: 'Handball?', tone: 'gold', size: 130}, {at: c(0, 2), text: 'Referee: play on', tone: 'cream', size: 52}]},
    {from: c(2, 3), to: S[3], y: 1100, lines: [
      {at: c(2, 3), text: 'Did VAR check it?', tone: 'gold', size: 52},
      {at: c(2, 3) + 15, text: 'Checked · Football Insider', tone: 'cream', size: 38},
      {at: c(2, 3) + 30, text: 'Not reviewed · Goal, africasoccer', tone: 'cream', size: 38},
      {at: c(2, 3) + 45, text: 'DISPUTED · reports differ', tone: 'navy', size: 30}]},
    {from: c(3, 1), to: S[4], y: 1120, lines: [
      {at: c(3, 1), text: 'Not every touch is an offence', tone: 'cream', size: 46},
      {at: c(3, 2), text: 'Offence: arm made the body', tone: 'cream', size: 46},
      {at: c(3, 3), text: '"unnaturally bigger"', tone: 'gold', size: 62},
      {at: c(3, 4), text: 'not justified by his movement', tone: 'cream', size: 44}]},
    {from: c(4, 0), to: HOLD, y: 985, lines: [
      {at: c(4, 1), text: 'Hackett: "It\'s a penalty"', tone: 'cream', size: 46},
      {at: c(4, 1) + 15, text: 'ONE REPORT · Football Insider', tone: 'navy', size: 28},
      {at: c(4, 2), text: 'Ittrich: "a clear penalty"', tone: 'cream', size: 46},
      {at: c(4, 2) + 15, text: 'ONE REPORT · via Prime Video', tone: 'navy', size: 28},
      {at: c(4, 4), text: 'Kovač: "VAR should have', tone: 'gold', size: 48},
      {at: c(4, 4) + 8, text: 'looked at the handball"', tone: 'gold', size: 48}]},
    {from: c(5, 1), to: S[6], y: 720, lines: [
      {at: c(5, 1), text: "55' · Beier", tone: 'cream', size: 52},
      {at: c(5, 2), text: '1–1', tone: 'gold', size: 150},
      {at: c(5, 3), text: 'A point each', tone: 'cream', size: 52},
      {at: c(5, 4), text: 'Dortmund · 7th · 10 pts', tone: 'cream', size: 48},
      {at: c(5, 5), text: 'Arsenal · 5th · 11 pts', tone: 'cream', size: 48}]},
    {from: c(6, 0), to: END + 30, y: 820, lines: [
      {at: c(6, 0), text: '1 corner · 1 arm', tone: 'cream', size: 60},
      {at: c(6, 0) + 30, text: '0 penalties', tone: 'gold', size: 110},
      {at: c(6, 1), text: 'Unnaturally bigger,', tone: 'cream', size: 52}, {at: c(6, 1) + 12, text: 'or just a hit?', tone: 'cream', size: 52},
      {at: c(6, 2), text: 'You be the referee', tone: 'gold', size: 56}]},
  ],
};
