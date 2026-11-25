// Sport, by the numbers: "Not given first time." Real Madrid 5-1 PSV, Bernabéu, 24 Nov 2026 (Champions League league phase, MD5).
// Cross-verified: Tchouaméni stood/stepped on Sven Mijnans' foot inside the box (NL Times, TuFutbolero, Goal); penalty
// followed a VAR review with referee Espen Eskås going to the pitchside monitor (NL Times, TuFutbolero, Goal; beIN and
// 101 Great Goals: after VAR review); Tchouaméni booked (LaLiga match centre 30', TuFutbolero/Mundo Deportivo);
// Perišić scored, 32' (LaLiga, beIN, 101GG); 0-1 at half-time (NL Times, LaLiga); five Madrid goals after the break:
// Valverde, Bellingham, Mbappé x2, Vinícius; 5-1 (NL Times, beIN, 101GG, TuFutbolero).
// IFAB VAR protocol: VAR may assist "only in the event of a 'clear and obvious error' or 'serious missed incident'";
// "The final decision is always taken by the referee" (theifab.com, VAR protocol, principles 1 and 5).
// SINGLE-SOURCED, labelled on screen: Archivo VAR (X account) backing the penalty, via Goal only.
// CONFLICT, shown: award minute 28'/29' (LaLiga timeline) vs 30' (NL Times).
// NOT used: VAR named as Darren England (NL Times only); penalty direction (sources differ); Real/PSV table positions
// (Goal only); third Real yellow (unidentified); goal minutes not cross-verified. Positions illustrative. No view taken.
import type {BoardRecipe, KF} from '../board';
import t from './PSVPenalty.timing.json';

const T = t as {dur: number; cues: number[]}[];
const S = T.reduce<number[]>((a, s) => [...a, a[a.length - 1] + s.dur], [0]);  // beat start frames
const c = (beat: number, cue: number) => S[beat] + T[beat].cues[cue];
const END = S[T.length];
const CONTACT = c(1, 3) + 8;    // Tchouaméni stands on Mijnans' foot
const SPOT = c(2, 4);           // points to the spot
const KICK = c(5, 0) + 12;      // Perišić strikes
const GOAL = KICK + 16;
const GONE = c(5, 2);           // board clears for the numbers
const UP = S[3] + 25;           // players step back up the box while the protocol is on screen
const HOLD = S[5] - 30;

export const psvPenalty: BoardRecipe = {
  id: 'PSVPenalty', audio: 'audio/PSVPenalty.mp3', dur: END, series: 'Sport, by the numbers', pitch: 'football-box', ballUntil: GONE,
  match: 'Real Madrid 5–1 PSV · Bernabéu · 24 Nov 2026',
  note: 'Rebuilt from match reports and the IFAB VAR protocol. Positions illustrative, not to scale. Archivo VAR verdict is one account (via Goal). No view taken.',
  teams: {a: 'Real Madrid', b: 'PSV'},
  dots: [
    // Real Madrid, defending the goal at the top (y = 0)
    {id: 'gk', team: 'a', until: GONE, kf: [[S[1], 16.9, 1.2], [S[5], 16.9, 0.6]]},
    {id: 'tch', team: 'a', label: 'AT', until: GONE, kf: [[S[1], 19.5, 16.5], [CONTACT, 15.6, 12.6], [SPOT, 15.8, 12.8], [UP, 20.5, 9.2], [HOLD, 20.5, 9.2], [S[5] - 5, 20.5, 17.6]], ring: [c(1, 1), c(2, 5) + 40]},
    {id: 'rm3', team: 'a', until: GONE, kf: [[S[1], 10.5, 10.5], [CONTACT, 12, 9.5], [UP, 10.5, 8.8], [HOLD, 10.5, 8.8], [S[5] - 5, 13.2, 17.8]]},
    {id: 'rm4', team: 'a', until: GONE, kf: [[S[1], 23.5, 9.5], [CONTACT, 21, 8.8], [UP, 25, 8.6], [HOLD, 25, 8.6], [S[5] - 5, 24.5, 17.8]]},
    // PSV, attacking upwards
    {id: 'mij', team: 'b', label: 'SM', until: GONE, kf: [[S[1], 11.5, 21], [CONTACT, 14.6, 12.4], [CONTACT + 18, 14.4, 11.6], [UP, 13.4, 9], [HOLD, 13.4, 9], [S[5] - 5, 11.8, 17.6]], ring: [c(1, 3), c(2, 1)]},
    {id: 'psv2', team: 'b', until: GONE, kf: [[S[1], 22, 22], [CONTACT, 20, 13.5], [UP, 23, 9.6], [HOLD, 23, 9.6], [S[5] - 5, 22.6, 17.4]]},
    {id: 'psv3', team: 'b', until: GONE, kf: [[S[1], 7, 26], [CONTACT, 8.5, 18], [UP, 7.5, 9.4], [HOLD, 7.5, 9.4], [S[5] - 5, 9.6, 17.8]]},
    {id: 'per', team: 'b', label: 'IP', until: GONE, kf: [[S[2], 17.4, 15.8], [UP, 18.6, 9.4], [HOLD, 18.6, 9.4], [S[5] - 5, 17.4, 14.2], [KICK, 16.9, 11.6], [KICK + 20, 16.6, 10.6]], ring: [c(5, 0), GOAL + 20]},
  ],
  ball: [[S[1], 8, 22.5], [c(1, 1), 8, 22.5], [c(1, 2), 13.4, 14.2], [CONTACT, 14.4, 12.6], [CONTACT + 20, 15, 10.8],
    [SPOT, 15, 10.8], [SPOT + 18, 16.9, 11], [KICK, 16.9, 11], [GOAL, 14.2, -0.7]],
  captions: [
    {from: S[0], to: S[1], kicker: 'Real Madrid v PSV · Champions League', lines: [{at: c(0, 1), text: 'PSV go in front'}, {at: c(0, 2), text: 'Not given first time'}]},
    {from: S[1], to: S[2], kicker: 'Rebuilt from match reports', lines: [{at: c(1, 0), text: 'First half, in the box'}, {at: c(1, 2), text: 'Tchouaméni goes for the ball'}, {at: c(1, 3), text: "Stands on Mijnans' foot"}]},
    {from: S[2], to: S[3], kicker: 'VAR · on-field review', lines: [{at: c(2, 0), text: 'Play goes on'}, {at: c(2, 1), text: 'Referee Espen Eskås'}, {at: c(2, 4), text: 'Penalty'}, {at: c(2, 5), text: 'Tchouaméni booked'}]},
    {from: S[3], to: S[4], kicker: 'IFAB · VAR protocol', lines: [{at: c(3, 0), text: 'The bar'}]},
    {from: S[4], to: S[5], kicker: "Reports differ: 28', 29' or 30'", lines: [{at: c(4, 0), text: 'Clear and obvious?'}]},
    {from: S[5], to: S[6], kicker: "Perišić · 32'", lines: [{at: c(5, 0), text: 'Perisic scores'}, {at: c(5, 1), text: 'Half-time: 0–1'}, {at: c(5, 2), text: 'Then Madrid score five'}]},
    {from: S[6], to: END + 30, kicker: 'Real Madrid 5–1 PSV', lines: [{at: c(6, 0), text: 'One VAR call'}]},
  ],
  overlays: [
    {type: 'path', from: c(1, 1), to: S[2], pts: [[8, 22.5], [11, 18], [13.4, 14.2]], color: '#F3EDE2'},
    {type: 'path', from: c(1, 1), to: S[2], pts: [[19.5, 16.5], [17.4, 14.2], [15.6, 12.6]], color: '#E9B93B'},
    {type: 'burst', from: CONTACT, to: CONTACT + 40, x: 15, y: 12.5},
    {type: 'label', from: c(1, 3) + 10, to: S[2], x: 25.5, y: 22.5, text: 'foot trodden on', tone: 'cream', size: 30},
    {type: 'label', from: c(2, 0), to: c(2, 1), x: 25.5, y: 22.5, text: 'play on', tone: 'cream', size: 30},
    {type: 'label', from: c(2, 2), to: S[3], x: 25.5, y: 22.5, text: 'ON-FIELD REVIEW', tone: 'navy', size: 28},
    {type: 'label', from: SPOT, to: S[3], x: 8.4, y: 6.2, text: 'PENALTY', tone: 'red', size: 34},
    {type: 'label', from: c(2, 5), to: S[3], x: 25.5, y: 25, text: 'Yellow · Tchouaméni', tone: 'gold', size: 28},
    {type: 'path', from: KICK, to: GONE, pts: [[16.9, 11], [15.4, 5], [14.2, -0.7]], color: '#F3EDE2'},
    {type: 'burst', from: GOAL, to: GOAL + 40, x: 14.2, y: -0.7},
  ],
  bigs: [
    {from: c(0, 1), to: S[1], y: 1000, lines: [{at: c(0, 1), text: '0–1', tone: 'gold', size: 150}, {at: c(0, 2), text: 'after a VAR review', tone: 'cream', size: 52}]},
    {from: c(3, 1), to: S[4], y: 1180, lines: [
      {at: c(3, 1), text: 'VAR may only assist for a', tone: 'cream', size: 48},
      {at: c(3, 2), text: '"clear and obvious error"', tone: 'gold', size: 56},
      {at: c(3, 3), text: 'Final decision: the referee', tone: 'cream', size: 48}]},
    {from: c(4, 1), to: HOLD, y: 1180, lines: [
      {at: c(4, 1), text: 'Archivo VAR: right call', tone: 'cream', size: 50},
      {at: c(4, 1) + 15, text: 'ONE ACCOUNT · via Goal', tone: 'navy', size: 30},
      {at: c(4, 2), text: "Awarded 28'–30'", tone: 'gold', size: 56},
      {at: c(4, 2) + 15, text: 'DISPUTED · reports differ', tone: 'navy', size: 30}]},
    {from: c(5, 2), to: S[6], y: 700, lines: [
      {at: c(5, 2), text: '0–1 at half-time', tone: 'cream', size: 52},
      {at: c(5, 3), text: '1–1 · Valverde', tone: 'cream', size: 50},
      {at: c(5, 4), text: '2–1 · Bellingham', tone: 'cream', size: 50},
      {at: c(5, 5), text: '4–1 · Mbappé ×2', tone: 'cream', size: 50},
      {at: c(5, 6), text: '5–1 · Vinícius', tone: 'cream', size: 50},
      {at: c(5, 7), text: '5–1', tone: 'gold', size: 120}]},
    {from: c(6, 0), to: END + 30, y: 860, lines: [{at: c(6, 0), text: '1 VAR call', tone: 'gold', size: 120}, {at: c(6, 1), text: "didn't survive the second half", tone: 'cream', size: 46},
      {at: c(6, 2), text: 'Clear and obvious,', tone: 'cream', size: 52}, {at: c(6, 2) + 12, text: 'or soft?', tone: 'cream', size: 52}, {at: c(6, 3), text: 'You be the referee', tone: 'gold', size: 56}]},
  ],
};
