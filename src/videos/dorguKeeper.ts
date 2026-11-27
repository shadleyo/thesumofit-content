// Sport, by the numbers: "Foul, or flap?" Sporting CP 2-2 Manchester United, Estádio José Alvalade, Lisbon, Wed 25 Nov 2026
// (UCL league phase, MD5).
// Cross-verified: 2-2 after Suárez's 80' goal (Sky, africasoccer; K24 "10 minutes remaining"); late United corner, Sporting
// keeper Kaique put the ball into his own net (Sky "punched", K24 "pushed", africasoccer); VAR sent referee Szymon Marciniak
// (K24, Football360, africasoccer) to the monitor and the goal was ruled out for a Dorgu foul on the keeper (Sky, K24,
// Football360, africasoccer). Earlier Diallo goal ruled out because the whistle had gone for a Tielemans foul, so VAR
// could not intervene (Sky, Football360, NotJustOK). Three penalties (Sky, africasoccer; K24). Tielemans second yellow in
// stoppage time (Sky, Football360, africasoccer). United 19th in the UCL (Sky, K24, africasoccer).
// VAR protocol (IFAB, theifab.com, fetched 25 Nov 2026 run): VAR "may assist the referee only in the event of a 'clear and
// obvious error' or 'serious missed incident'"; "The final decision is always taken by the referee".
// DISPUTED, shown: whether it was a foul at all — UEFA/officials: foul before the ball went in; pundits Onuoha and Young (K24)
// say the keeper pushed/flapped at it before he was touched; Andy Davies (ESPN, via Football360) "a poor VAR intervention".
// Minute reported as 82' (Sky, K24), ~83' (africasoccer), 84' (Football360).
// SINGLE-SOURCED, labelled ONE REPORT: UEFA's explanation wording (K24 only).
// NOT used: corner taker (K24 only); Marciniak "initially awarded" the goal (Football360 only); Carragher "very harsh" (Sky
// summary only); United/Sporting points (africasoccer only, which also mislabels it Europa League); VAR official (not named).
// Positions illustrative. No view taken on the officials.
import type {BoardRecipe} from '../board';
import t from './DorguKeeper.timing.json';

const T = t as {dur: number; cues: number[]}[];
const S = T.reduce<number[]>((a, s) => [...a, a[a.length - 1] + s.dur], [0]);  // beat start frames
const c = (beat: number, cue: number) => S[beat] + T[beat].cues[cue];
const END = S[T.length];
const DELIVER = c(1, 1) + 10;   // corner swung in
const TOUCH = c(1, 3);          // keeper and Dorgu meet the ball
const NET = c(1, 4) + 4;        // ball in the net
const UP = S[3] + 25;           // players step towards the goal line so the bigs have room
const GONE = S[5];              // board clears for the Diallo beat and the numbers
const HOLD = S[5] - 6;

export const dorguKeeper: BoardRecipe = {
  id: 'DorguKeeper', audio: 'audio/DorguKeeper.mp3', dur: END, series: 'Sport, by the numbers', pitch: 'football-box', ballUntil: GONE,
  match: 'Sporting 2–2 Man United · Lisbon · 25 Nov 2026',
  note: "Rebuilt from match reports and the VAR protocol. Positions illustrative, not to scale. UEFA's wording is one report. No view taken.",
  teams: {a: 'Man United', b: 'Sporting', aColor: '#DA291C', bColor: '#00A859'},
  dots: [
    // Sporting, defending the goal at the top (y = 0)
    {id: 'gk', team: 'b', label: 'GK', until: GONE, kf: [[S[1], 16.9, 1.0], [DELIVER, 17.6, 1.6], [TOUCH, 18.6, 2.6], [NET, 18.2, 1.8], [UP, 17.6, 1.4], [HOLD, 17.6, 1.4]], ring: [c(1, 2), c(3, 3)]},
    {id: 'b2', team: 'b', until: GONE, kf: [[S[1], 13, 4], [TOUCH, 14.2, 3.4], [UP, 13.5, 3], [HOLD, 13.5, 3]]},
    {id: 'b3', team: 'b', until: GONE, kf: [[S[1], 21.5, 5.5], [TOUCH, 21, 4.4], [UP, 22.5, 3.6], [HOLD, 22.5, 3.6]]},
    {id: 'b4', team: 'b', until: GONE, kf: [[S[1], 10, 7], [TOUCH, 11.5, 6], [UP, 10.5, 5], [HOLD, 10.5, 5]]},
    // Man United, attacking the corner
    {id: 'pd', team: 'a', label: 'PD', until: GONE, kf: [[S[1], 21, 8.5], [DELIVER, 20.4, 5.6], [TOUCH, 19.6, 3.4], [NET, 19.4, 3.0], [UP, 19.8, 3.6], [HOLD, 19.8, 3.6]], ring: [c(2, 2), c(3, 3)]},
    {id: 'a2', team: 'a', until: GONE, kf: [[S[1], 15, 10], [TOUCH, 15.5, 5.2], [UP, 15, 5.6], [HOLD, 15, 5.6]]},
    {id: 'a3', team: 'a', until: GONE, kf: [[S[1], 11.5, 11], [TOUCH, 12.5, 7.4], [UP, 12, 7], [HOLD, 12, 7]]},
    {id: 'a4', team: 'a', until: GONE, kf: [[S[1], 24, 11], [TOUCH, 23.6, 7.8], [UP, 24.5, 7.2], [HOLD, 24.5, 7.2]]},
  ],
  ball: [[S[1], 33.2, 0.6], [DELIVER, 33.2, 0.6], [TOUCH, 19.0, 2.4], [NET, 17.6, -1.1], [S[5], 17.6, -1.1]],
  captions: [
    {from: S[0], to: S[1], kicker: 'Sporting v Man United · Champions League', lines: [{at: c(0, 0), text: 'A late United winner?'}, {at: c(0, 1), text: 'Then VAR steps in'}]},
    {from: S[1], to: S[2], kicker: "Reports differ: 82', 83' or 84'", lines: [{at: c(1, 0), text: '2–2, late on'}, {at: c(1, 1), text: 'United corner'}, {at: c(1, 4), text: 'Into his own net'}]},
    {from: S[2], to: S[3], kicker: 'Referee Szymon Marciniak', lines: [{at: c(2, 0), text: 'VAR: go to the monitor'}, {at: c(2, 2), text: 'Foul by Dorgu on the keeper'}]},
    {from: S[3], to: S[4], kicker: 'Foul, or flap?', lines: [{at: c(3, 0), text: 'Two readings'}]},
    {from: S[4], to: S[5], kicker: 'IFAB · VAR protocol', lines: [{at: c(4, 0), text: 'When VAR can step in'}]},
    {from: S[5], to: S[6], kicker: "Before half-time · Amad Diallo", lines: [{at: c(5, 0), text: 'Goal two ruled out'}]},
    {from: S[6], to: S[7], kicker: 'Sporting 2–2 Man United', lines: [{at: c(6, 0), text: 'One wild night'}]},
    {from: S[7], to: END + 30, kicker: 'Sporting 2–2 Man United', lines: [{at: c(7, 0), text: 'No goal'}]},
  ],
  overlays: [
    {type: 'path', from: DELIVER, to: S[2], pts: [[33.2, 0.6], [26.5, 3.4], [19.0, 2.4], [17.6, -1.1]], color: '#F3EDE2'},
    {type: 'burst', from: TOUCH, to: TOUCH + 36, x: 18.9, y: 2.8},
    {type: 'label', from: DELIVER, to: TOUCH, x: 27, y: 22.5, text: 'United corner', tone: 'cream', size: 30},
    {type: 'label', from: TOUCH + 6, to: S[2], x: 27, y: 22.5, text: 'keeper · ball · net', tone: 'cream', size: 30},
    {type: 'label', from: c(2, 0), to: S[3], x: 8.4, y: 22.5, text: 'VAR REVIEW', tone: 'navy', size: 28},
    {type: 'label', from: c(2, 2), to: S[3], x: 25.5, y: 22.5, text: 'FOUL ON KEEPER', tone: 'cream', size: 28},
  ],
  bigs: [
    {from: c(0, 1), to: S[1], y: 1000, lines: [{at: c(0, 1), text: 'Late winner?', tone: 'gold', size: 120}, {at: c(0, 2), text: 'VAR: no goal', tone: 'cream', size: 52}]},
    {from: c(2, 3), to: S[3], y: 1120, lines: [{at: c(2, 3), text: 'GOAL', tone: 'gold', size: 110, strike: c(2, 3) + 8}, {at: c(2, 3) + 14, text: 'Ruled out', tone: 'cream', size: 46}]},
    {from: c(3, 0), to: S[4] - 4, y: 900, lines: [
      {at: c(3, 0), text: 'UEFA: foul on the keeper', tone: 'cream', size: 44},
      {at: c(3, 0) + 12, text: 'before the ball went in', tone: 'cream', size: 44},
      {at: c(3, 0) + 26, text: 'ONE REPORT · K24 Digital', tone: 'navy', size: 28},
      {at: c(3, 2), text: 'Onuoha, Young: keeper', tone: 'cream', size: 44},
      {at: c(3, 2) + 10, text: 'played it before contact', tone: 'cream', size: 44},
      {at: c(3, 3), text: 'Davies: "a poor VAR intervention"', tone: 'gold', size: 40},
      {at: c(3, 3) + 20, text: 'DISPUTED · officials vs pundits', tone: 'navy', size: 28}]},
    {from: c(4, 1), to: S[5], y: 1080, lines: [
      {at: c(4, 1), text: 'Only for a', tone: 'cream', size: 50},
      {at: c(4, 2), text: '"clear and obvious error"', tone: 'gold', size: 58},
      {at: c(4, 3), text: 'Final decision:', tone: 'cream', size: 50},
      {at: c(4, 3) + 15, text: 'always the referee', tone: 'cream', size: 50}]},
    {from: c(5, 1), to: S[6], y: 720, lines: [
      {at: c(5, 1), text: 'Diallo: ball in the net', tone: 'cream', size: 52},
      {at: c(5, 2), text: 'Whistle already gone', tone: 'gold', size: 62},
      {at: c(5, 2) + 15, text: 'Tielemans foul', tone: 'cream', size: 48},
      {at: c(5, 3), text: 'VAR can\'t step in', tone: 'cream', size: 52}]},
    {from: c(6, 0), to: S[7], y: 640, lines: [
      {at: c(6, 0), text: '3 penalties', tone: 'cream', size: 70},
      {at: c(6, 1), text: '2 goals ruled out', tone: 'cream', size: 70},
      {at: c(6, 2), text: '1 red · Tielemans', tone: 'red', size: 60},
      {at: c(6, 3), text: '2–2', tone: 'gold', size: 150},
      {at: c(6, 4), text: 'United · 19th in the UCL', tone: 'cream', size: 48}]},
    {from: c(7, 0), to: END + 30, y: 820, lines: [
      {at: c(7, 0), text: '1 corner · 1 keeper', tone: 'cream', size: 60},
      {at: c(7, 0) + 30, text: '0 goals', tone: 'gold', size: 110},
      {at: c(7, 1), text: 'Foul, or flap?', tone: 'cream', size: 60},
      {at: c(7, 2), text: 'You be the referee', tone: 'gold', size: 56}]},
  ],
};
