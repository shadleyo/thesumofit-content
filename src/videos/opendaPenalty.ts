// Sport, by the numbers: "Ball first, or foul?" Lyon 0-0 Lillestrøm, Groupama Stadium, Décines, Thu 26 Nov 2026
// (UEFA Europa League league phase, MD5).
// Cross-verified: 0-0 (all reports); late on, substitute Loïs Openda (on 81') goes down in the box between two Lillestrøm
// defenders (Foot Mercato "pris en tenaille", Orange "pris en sandwich", Footeo "fauché", Maxifoot "double faute");
// referee Sebastian Gishamer (Austria: lyonfoot, Foot Mercato, Orange) pointed to the spot, then reversed it after VAR
// (lyonfoot, Foot Mercato, Footeo, Orange, stephanelarue, Maxifoot). Early Himbert goal ruled out for a foul on keeper
// Dahlberg (lyonfoot, Footeo, stephanelarue, Orange). Late Elkaer red card cancelled by VAR because the defender touched
// the ball first (lyonfoot, Footeo, stephanelarue; Orange mentions). Lyon on 8 points (lyonfoot, Foot Mercato, Orange,
// stephanelarue). Bacher "si j'avais été arbitre, j'aurais naturellement sifflé le penalty" (lyonfoot, Foot Mercato, Orange).
// VAR protocol (IFAB): VAR "may assist the referee only in the event of a 'clear and obvious error' or 'serious missed
// incident'"; "The final decision is always taken by the referee" (as logged for PSVPenalty/DorguKeeper).
// SINGLE-SOURCED, labelled ONE REPORT: the reason (Foot Mercato only: a defender pushed the ball before the second's foul);
// coach Vicens' "très légère" touch and "peut encore l'atteindre" (Orange only).
// DISPUTED, shown: penalty minute 88' (Footeo, stephanelarue), 89' (Foot Mercato), reversal 90'; league position 14th
// (lyonfoot, Foot Mercato, stephanelarue) vs 15th (Orange).
// NOT used: VAR official (not named); Dacourt/Landreau lines (Foot Mercato only); possession/shots (64% vs ~70%, conflict);
// Elkaer's name on screen; no Lillestrøm view found, so none claimed. Positions illustrative. No view taken on the officials.
import type {BoardRecipe} from '../board';
import t from './OpendaPenalty.timing.json';

const T = t as {dur: number; cues: number[]}[];
const S = T.reduce<number[]>((a, s) => [...a, a[a.length - 1] + s.dur], [0]);  // beat start frames
const c = (beat: number, cue: number) => S[beat] + T[beat].cues[cue];
const END = S[T.length];
const BETWEEN = c(1, 2);        // Openda arrives between the two defenders
const DOWN = c(1, 3);           // goes down
const NUDGE = c(3, 1);          // the one-report reading: first defender plays the ball
const GONE = S[5];              // board clears for the other reversals and the numbers
const HOLD = S[5] - 6;

export const opendaPenalty: BoardRecipe = {
  id: 'OpendaPenalty', audio: 'audio/OpendaPenalty.mp3', dur: END, series: 'Sport, by the numbers', pitch: 'football-box', ballUntil: GONE,
  match: 'Lyon 0–0 Lillestrøm · Décines · 26 Nov 2026',
  note: 'Rebuilt from French match reports and the VAR protocol. Quotes translated. Positions illustrative, not to scale. The reason is one report. No view taken.',
  teams: {a: 'Lyon', b: 'Lillestrøm', aColor: '#1E4FA3', bColor: '#F2C230'},
  dots: [
    // Lillestrøm, defending the goal at the top (y = 0)
    {id: 'gk', team: 'b', label: 'GK', until: GONE, kf: [[S[1], 16.9, 1.0], [DOWN, 16.4, 2.2], [HOLD, 16.4, 2.2]]},
    {id: 'd1', team: 'b', label: '1', until: GONE, kf: [[S[1], 12.6, 13], [BETWEEN, 14.2, 10.8], [DOWN, 14.4, 10.4], [HOLD, 14.4, 10.4]], ring: [c(3, 1), c(3, 2)]},
    {id: 'd2', team: 'b', label: '2', until: GONE, kf: [[S[1], 19.5, 13], [BETWEEN, 17.1, 10.8], [DOWN, 16.9, 10.2], [HOLD, 16.9, 10.2]], ring: [c(3, 1) + 40, c(3, 2)]},
    {id: 'b3', team: 'b', until: GONE, kf: [[S[1], 9.5, 7], [DOWN, 11, 6.5], [HOLD, 11, 6.5]]},
    {id: 'b4', team: 'b', until: GONE, kf: [[S[1], 24, 7.5], [DOWN, 22.5, 7], [HOLD, 22.5, 7]]},
    // Lyon, attacking
    {id: 'lo', team: 'a', label: 'LO', until: GONE, kf: [[S[1], 12.4, 24.5], [BETWEEN, 15.6, 11.4], [DOWN, 15.7, 10.0], [HOLD, 15.7, 10.0]], ring: [c(1, 1), c(2, 1)]},
    {id: 'a2', team: 'a', until: GONE, kf: [[S[1], 22, 19], [DOWN, 21, 13], [HOLD, 21, 13]]},
    {id: 'a3', team: 'a', until: GONE, kf: [[S[1], 7.5, 17], [DOWN, 9.5, 12.5], [HOLD, 9.5, 12.5]]},
  ],
  ball: [[S[1], 13.0, 23.6], [BETWEEN, 15.9, 12.1], [DOWN, 15.9, 11.6], [NUDGE, 15.9, 11.6], [NUDGE + 12, 15.2, 10.2], [S[5], 15.2, 10.2]],
  captions: [
    {from: S[0], to: S[1], kicker: 'Lyon v Lillestrøm · Europa League', lines: [{at: c(0, 0), text: 'Penalty given'}, {at: c(0, 1), text: 'Then VAR takes it away'}]},
    {from: S[1], to: S[2], kicker: "Reports differ: 88', 89' or 90'", lines: [{at: c(1, 0), text: '0–0, closing minutes'}, {at: c(1, 1), text: 'Sub Loïs Openda'}, {at: c(1, 3), text: 'Down between two'}]},
    {from: S[2], to: S[3], kicker: 'Referee Sebastian Gishamer', lines: [{at: c(2, 0), text: 'Points to the spot'}, {at: c(2, 2), text: 'VAR: go to the screen'}, {at: c(2, 4), text: 'No penalty'}]},
    {from: S[3], to: S[4], kicker: 'Ball first, or foul?', lines: [{at: c(3, 0), text: 'Two readings'}]},
    {from: S[4], to: S[5], kicker: 'IFAB · VAR protocol', lines: [{at: c(4, 0), text: 'When VAR can step in'}]},
    {from: S[5], to: S[6], kicker: 'Lyon v Lillestrøm', lines: [{at: c(5, 0), text: 'Not the only reversal'}]},
    {from: S[6], to: S[7], kicker: 'Lyon 0–0 Lillestrøm', lines: [{at: c(6, 0), text: 'Two points dropped'}]},
    {from: S[7], to: END + 30, kicker: 'Lyon 0–0 Lillestrøm', lines: [{at: c(7, 0), text: 'No penalty'}]},
  ],
  overlays: [
    {type: 'path', from: c(1, 1), to: S[2], pts: [[12.4, 24.5], [14.2, 17.5], [15.6, 11.4]], color: '#F3EDE2'},
    {type: 'burst', from: DOWN, to: DOWN + 36, x: 15.7, y: 10.2},
    {type: 'label', from: c(1, 1), to: DOWN, x: 25.5, y: 22.5, text: 'Openda into the box', tone: 'cream', size: 30},
    {type: 'label', from: DOWN + 6, to: S[2], x: 25.5, y: 22.5, text: 'between two defenders', tone: 'cream', size: 30},
    {type: 'label', from: c(2, 1), to: c(2, 2), x: 25.5, y: 22.5, text: 'PENALTY', tone: 'gold', size: 30},
    {type: 'label', from: c(2, 2), to: S[3], x: 8.4, y: 22.5, text: 'VAR REVIEW', tone: 'navy', size: 28},
    {type: 'label', from: c(2, 3), to: S[3], x: 25.5, y: 22.5, text: 'OVERTURNED', tone: 'cream', size: 28},
  ],
  bigs: [
    {from: c(0, 1), to: S[1], y: 1000, lines: [{at: c(0, 1), text: 'Penalty?', tone: 'gold', size: 120}, {at: c(0, 2), text: 'VAR: no', tone: 'cream', size: 52}]},
    {from: c(2, 4), to: S[3], y: 1120, lines: [{at: c(2, 4), text: 'PENALTY', tone: 'gold', size: 110, strike: c(2, 4) + 8}, {at: c(2, 4) + 14, text: 'Overturned', tone: 'cream', size: 46}]},
    {from: c(3, 0), to: S[4] - 4, y: 900, lines: [
      {at: c(3, 0), text: 'Defender 1 played', tone: 'cream', size: 44},
      {at: c(3, 0) + 12, text: 'the ball before the foul', tone: 'cream', size: 44},
      {at: c(3, 0) + 26, text: 'ONE REPORT · Foot Mercato', tone: 'navy', size: 28},
      {at: c(3, 2), text: 'Lyon coach: touch "very light"', tone: 'cream', size: 40},
      {at: c(3, 2) + 26, text: 'ONE REPORT · Orange Sports', tone: 'navy', size: 28},
      {at: c(3, 3), text: 'Bacher: "I\'d have given it"', tone: 'gold', size: 40},
      {at: c(3, 3) + 20, text: 'DISPUTED · officials vs Lyon', tone: 'navy', size: 28}]},
    {from: c(4, 1), to: S[5], y: 1080, lines: [
      {at: c(4, 1), text: 'Only for a', tone: 'cream', size: 50},
      {at: c(4, 2), text: '"clear and obvious error"', tone: 'gold', size: 58},
      {at: c(4, 3), text: 'Final decision:', tone: 'cream', size: 50},
      {at: c(4, 3) + 15, text: 'always the referee', tone: 'cream', size: 50}]},
    {from: c(5, 1), to: S[6], y: 720, lines: [
      {at: c(5, 1), text: 'Early Lyon goal', tone: 'cream', size: 52},
      {at: c(5, 1) + 15, text: 'Ruled out · foul on keeper', tone: 'gold', size: 48},
      {at: c(5, 2), text: 'Late Lillestrøm red', tone: 'red', size: 52},
      {at: c(5, 3), text: 'Cancelled · ball first', tone: 'gold', size: 48}]},
    {from: c(6, 0), to: S[7], y: 640, lines: [
      {at: c(6, 0), text: '0–0', tone: 'gold', size: 150},
      {at: c(6, 1), text: 'Lyon · 8 points', tone: 'cream', size: 64},
      {at: c(6, 2), text: '14th or 15th', tone: 'cream', size: 64},
      {at: c(6, 2) + 15, text: 'DISPUTED · reports differ', tone: 'navy', size: 28}]},
    {from: c(7, 0), to: END + 30, y: 820, lines: [
      {at: c(7, 0), text: '1 box · 2 defenders', tone: 'cream', size: 60},
      {at: c(7, 0) + 30, text: '0 penalties', tone: 'gold', size: 100},
      {at: c(7, 1), text: 'Ball first, or foul?', tone: 'cream', size: 60},
      {at: c(7, 2), text: 'You be the referee', tone: 'gold', size: 56}]},
  ],
};
