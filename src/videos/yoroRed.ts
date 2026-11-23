// Sport, by the numbers: "Inside ten minutes." Liverpool 4-0 Manchester United, Anfield, 22 Nov 2026 (Premier League, MW11).
// Cross-verified: straight red for Leny Yoro on Alexander Isak, just outside the box, for DOGSO, checked and confirmed by
// VAR (Premier League MW11 "VAR decisions explained"; Evening Standard and Independent via Yahoo; Sky Sports; Brit Brief);
// referee Sam Barrott (PL official spelling; others spell it Barratt/Barrett); De Ligt misjudged a long ball (Standard,
// Brit Brief, Sky); Szoboszlai scored the resulting free kick (Standard, Independent, Sky, Brit Brief); Wirtz second
// (Independent "three minutes later", Sky); two more after half-time, 4-0 (Sky, Brit Brief x2). Isak's touch "heavy"
// (Independent, Sky). United manager/players say not a red (Sky headline + Brit Brief).
// DISPUTED, shown as such: whether it was still an obvious chance (officials: yes; United: never a red). Minute
// reported as 9' (PL), 8' (Standard, Independent, Brit Brief), 7' (Brit Brief #2): on screen as "reports differ".
// Law 12 considerations as quoted by former referee Mark Halsey (Brit Brief) and Sky Sports.
// NOT used: VAR name (one report only); who played the long ball (Jacquet vs Araujo — conflict); Keane/Neville
// pundit lines; United's league position. Pitch positions are not in any report: illustrative. No view taken.
import type {BoardRecipe, KF} from '../board';
import t from './YoroRed.timing.json';

const T = t as {dur: number; cues: number[]}[];
const S = T.reduce<number[]>((a, s) => [...a, a[a.length - 1] + s.dur], [0]);  // beat start frames
const c = (beat: number, cue: number) => S[beat] + T[beat].cues[cue];
const END = S[T.length];
const LAND = c(1, 1) + 6;       // long ball drops past De Ligt
const TOUCH = c(1, 2) + 4;      // Isak's heavy touch
const CONTACT = c(2, 1) + 8;    // Yoro brings him down
const RED = c(2, 4);            // straight red
const FK = c(5, 0) + 14;        // Szoboszlai strikes
const GOAL = FK + 16;
const GONE = S[6] + 10;         // board clears for the numbers
const still = (x: number, y: number, from = S[1]): KF[] => [[from, x, y]];

export const yoroRed: BoardRecipe = {
  id: 'YoroRed', audio: 'audio/YoroRed.mp3', dur: END, series: 'Sport, by the numbers', pitch: 'football-box', ballUntil: GONE,
  match: 'Liverpool 4–0 Man Utd · Anfield · 22 Nov 2026',
  note: 'Rebuilt from match reports and the Premier League\'s VAR explainer. Positions illustrative, not to scale. Whether it was still an obvious chance is disputed. No view taken.',
  teams: {a: 'Man Utd', b: 'Liverpool'},
  dots: [
    // Manchester United, defending the goal at the top (y = 0)
    {id: 'gk', team: 'a', label: 'SL', until: GONE, kf: [[S[1], 16.9, 1.2], [CONTACT + 20, 16.9, 5.4], [S[5], 16.9, 0.8]]},
    {id: 'deligt', team: 'a', label: 'MdL', until: GONE, kf: [[S[1], 20.6, 20.8], [LAND, 18.9, 20.2], [CONTACT, 18.4, 19.2], [S[5], 15.2, 8.7]], ring: [c(1, 1), c(1, 2) + 10]},
    {id: 'yoro', team: 'a', label: 'LY', until: RED + 70, kf: [[S[1], 10.5, 20.5], [LAND, 13.4, 19.8], [CONTACT, 16.1, 18.4], [RED + 70, 3, 18.5]], ring: [c(2, 0), RED + 20]},
    {id: 'mu4', team: 'a', until: GONE, kf: [[S[1], 3.5, 15.5], [S[5], 16.4, 8.7]]},
    {id: 'mu5', team: 'a', until: GONE, kf: [[S[1], 29, 19.5], [S[5], 17.6, 8.7]]},
    {id: 'mu6', team: 'a', until: GONE, kf: [[S[1], 8, 32.5], [S[5], 9, 15]]},
    // Liverpool, attacking upwards
    {id: 'isak', team: 'b', label: 'AI', until: GONE, kf: [[S[1], 13.8, 32], [LAND, 16.9, 20.6], [CONTACT, 16.8, 18], [CONTACT + 20, 17.1, 17.5], [S[5], 20, 13]], ring: [c(1, 2), CONTACT + 30]},
    {id: 'lv2', team: 'b', until: GONE, kf: [[S[1], 25, 32], [S[5], 22.5, 12]]},
    {id: 'lv3', team: 'b', until: GONE, kf: [[S[1], 7, 34], [S[5], 11, 12.5]]},
    {id: 'szobo', team: 'b', label: 'DS', until: GONE, kf: [[S[5], 18.8, 20.4], [FK, 17, 18.4], [FK + 20, 17.6, 17]], ring: [c(5, 0), GOAL + 20]},
  ],
  ball: [[S[1], 24, 37], [c(1, 0), 24, 37], [LAND, 17.6, 20.8], [TOUCH, 17.1, 19.6], [CONTACT + 16, 16.9, 12.6],
    [S[5], 16.9, 12.6], [S[5] + 12, 16.7, 17.8], [FK, 16.7, 17.8], [GOAL, 14.2, -0.7]],
  captions: [
    {from: S[0], to: S[1], kicker: 'Liverpool v Man Utd', lines: [{at: c(0, 0), text: 'Inside ten minutes'}, {at: c(0, 1), text: 'Down to ten'}]},
    {from: S[1], to: S[2], kicker: 'Rebuilt from match reports', lines: [{at: c(1, 0), text: 'A long ball over the top'}, {at: c(1, 1), text: 'De Ligt misjudges it'}, {at: c(1, 2), text: 'Isak is through'}]},
    {from: S[2], to: S[3], kicker: "Reports differ: 7', 8' or 9'", lines: [{at: c(2, 0), text: 'Yoro gets back'}, {at: c(2, 3), text: 'Referee Sam Barrott'}, {at: c(2, 4), text: 'Straight red · DOGSO'}, {at: c(2, 6), text: 'VAR: confirmed'}]},
    {from: S[3], to: S[4], kicker: 'IFAB Law 12 · DOGSO', lines: [{at: c(3, 0), text: 'Four things to weigh'}]},
    {from: S[4], to: S[5], kicker: 'The argument', lines: [{at: c(4, 0), text: 'Could Isak control it?'}]},
    {from: S[5], to: S[6], kicker: 'The free kick', lines: [{at: c(5, 0), text: 'Szoboszlai scores'}, {at: c(5, 1), text: 'Wirtz: 2–0'}, {at: c(5, 2), text: 'Two more after the break'}]},
    {from: S[6], to: END + 30, kicker: 'Liverpool 4–0 Man Utd', lines: [{at: c(6, 0), text: 'Eleven against ten'}]},
  ],
  overlays: [
    {type: 'path', from: c(1, 0), to: S[2], pts: [[24, 37], [20.5, 29], [17.6, 20.8]], color: '#F3EDE2'},
    {type: 'path', from: c(2, 0), to: S[3], pts: [[13.4, 19.8], [16.1, 18.4]], color: '#E9B93B'},
    {type: 'burst', from: CONTACT, to: CONTACT + 40, x: 16.5, y: 18.4},
    {type: 'label', from: c(2, 2), to: S[3], x: 25, y: 14.4, text: 'outside the box', tone: 'cream', size: 30},
    {type: 'label', from: RED, to: S[3], x: 7.2, y: 12.6, text: 'RED CARD', tone: 'red', size: 34},
    {type: 'path', from: c(4, 1), to: S[5], pts: [[17.1, 19.6], [16.9, 12.6], [16.9, 5.4]], color: '#E9B93B'},
    {type: 'label', from: c(4, 1), to: S[5], x: 25.2, y: 8.2, text: 'heavy touch', tone: 'gold', size: 30},
    {type: 'label', from: c(4, 2), to: S[5], x: 25.2, y: 10.6, text: 'towards the keeper', tone: 'cream', size: 28},
    {type: 'label', from: c(4, 3), to: S[5], x: 8.6, y: 20.6, text: 'Officials: still a chance', tone: 'cream', size: 30},
    {type: 'label', from: c(4, 4), to: S[5], x: 8.6, y: 22.6, text: 'United: never a red', tone: 'navy', size: 30},
    {type: 'label', from: c(4, 4) + 20, to: S[5], x: 8.6, y: 24.4, text: 'DISPUTED', tone: 'gold', size: 24},
    {type: 'path', from: FK, to: S[6], pts: [[16.7, 17.8], [15.4, 8], [14.2, -0.7]], color: '#F3EDE2'},
    {type: 'burst', from: GOAL, to: GOAL + 40, x: 14.2, y: -0.7},
  ],
  bigs: [
    {from: c(0, 0), to: S[1], y: 1000, lines: [{at: c(0, 0), text: '11 → 10', tone: 'gold', size: 150}, {at: c(0, 1), text: 'before the 10th minute', tone: 'cream', size: 52}]},
    {from: c(3, 1), to: S[4], y: 1040, lines: [
      {at: c(3, 1), text: '1 · Distance to goal', tone: 'cream', size: 50},
      {at: c(3, 2), text: '2 · Direction of play', tone: 'cream', size: 50},
      {at: c(3, 3), text: '3 · Control of the ball', tone: 'gold', size: 50},
      {at: c(3, 4), text: '4 · Where the defenders are', tone: 'cream', size: 50}]},
    {from: c(5, 0) + 40, to: c(5, 3), y: 1320, lines: [{at: c(5, 0) + 40, text: '1–0', tone: 'gold', size: 110}]},
    {from: c(5, 3), to: S[6], y: 1320, lines: [{at: c(5, 3), text: '4–0', tone: 'gold', size: 130}]},
    {from: c(6, 0), to: END + 30, y: 860, lines: [{at: c(6, 0), text: '80+ minutes', tone: 'gold', size: 120}, {at: c(6, 0) + 15, text: 'with ten men', tone: 'cream', size: 56},
      {at: c(6, 1), text: 'Obvious chance, or', tone: 'cream', size: 52}, {at: c(6, 1) + 12, text: "the keeper's ball?", tone: 'cream', size: 52}, {at: c(6, 2), text: 'You be the referee', tone: 'gold', size: 56}]},
  ],
};
