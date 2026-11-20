// Sport, by the numbers: "How Jasper Wiese's card added up." France 21-19 South Africa, 13 Nov 2026.
// Cross-verified (Planet Rugby, RugbyPass, The Citizen, SA Rugby magazine, SuperSport/AFP, all 18 Nov 2026):
// clean-out on Kalvin Gourgues at a ruck, early 2nd half; yellow on field, upgraded on bunker review to a
// 20-minute red (Law 9.20b, contact above the line of the shoulders; RugbyPass/Citizen/SuperSport say head);
// Foul Play Review Committee: mid-range entry point, 4 weeks, 3 with World Rugby's Coaching Intervention
// Programme; misses Ireland (21 Nov), finals weekend and two Japan League One club games; admitted guilt.
// 20-minute red replacement rule: World Rugby Law 9.30 global trial (replacement after 20 mins playing time).
// Minute deliberately not shown: only SuperSport/AFP gives one (44'). Positions illustrative. No view taken.
import type {BoardRecipe, KF} from '../board';
import t from './WieseRed.timing.json';

const T = t as {dur: number; cues: number[]}[];
const S = T.reduce<number[]>((a, s) => [...a, a[a.length - 1] + s.dur], [0]);  // beat start frames
const c = (beat: number, cue: number) => S[beat] + T[beat].cues[cue];
const END = S[T.length];
const CONTACT = c(1, 3) + 4;   // Wiese reaches Gourgues at the ruck
const OFF = c(3, 2) + 6;       // Wiese walks off
const REP = c(3, 3) + 24;      // replacement comes on
const still = (x: number, y: number, from = S[1]): KF[] => [[from, x, y]];

export const wieseRed: BoardRecipe = {
  id: 'WieseRed', audio: 'audio/WieseRed.mp3', dur: END, series: 'Sport, by the numbers',
  match: 'France 21–19 South Africa · 13 Nov 2026', note: 'Rebuilt from match and disciplinary reports. Positions illustrative, not to scale. No view taken on the sanction.',
  teams: {a: 'South Africa', b: 'France'},
  dots: [
    // the ruck: ball on the ground at (15, 9)
    {id: 'sa1', team: 'a', kf: still(13.6, 9.9)}, {id: 'sa2', team: 'a', kf: still(16.4, 10.2)},
    {id: 'fr1', team: 'b', kf: still(13.8, 8)}, {id: 'fr2', team: 'b', kf: still(16.6, 7.8)},
    // Gourgues, over the ball
    {id: 'gourgues', team: 'b', label: 'KG', kf: [[S[1], 15, 8.2], [CONTACT, 15, 8.2], [CONTACT + 14, 15.4, 7.1]], ring: [c(1, 3), c(2, 1)]},
    // Wiese: arrives from behind the ruck, clears out, later walks off; never returns
    {id: 'wiese', team: 'a', label: 'JW', kf: [[S[1], 21, 15], [c(1, 2), 20, 14], [CONTACT, 15.6, 9.2], [OFF, 15.6, 9.2], [OFF + 50, 36, 13]], ring: [c(2, 0), OFF]},
    // replacement, after 20 minutes
    {id: 'rep', team: 'a', kf: [[REP, 29.5, 15], [REP + 40, 21, 14]]},
  ],
  ball: [[S[1], 15, 9]],
  captions: [
    {from: S[0], to: S[1], kicker: 'France v South Africa', lines: [{at: c(0, 0), text: 'Yellow. Then red.'}, {at: c(0, 2), text: 'Then a four-week ban'}, {at: c(0, 3), text: 'How the card added up'}]},
    {from: S[1], to: S[2], kicker: 'Rebuilt from match reports', lines: [{at: c(1, 0), text: 'Early in the second half'}, {at: c(1, 1), text: 'A ruck in Paris'}, {at: c(1, 2), text: 'Wiese clears out Gourgues'}]},
    {from: S[2], to: S[3], kicker: 'Law 9.20(b)', lines: [{at: c(2, 0), text: 'Yellow on the field'}, {at: c(2, 2), text: 'No contact above the'}, {at: c(2, 2) + 10, text: 'line of the shoulders'}]},
    {from: S[3], to: S[4], kicker: 'Bunker review', lines: [{at: c(3, 0), text: 'Upgraded'}, {at: c(3, 1), text: 'A 20-minute red'}, {at: c(3, 3), text: 'Replacement after 20 mins'}]},
    {from: S[4], to: S[5], kicker: 'Foul Play Review Committee', lines: [{at: c(4, 0), text: "The panel's sum"}, {at: c(4, 1), text: 'Mid-range offence'}]},
    {from: S[5], to: S[6], kicker: 'What he misses', lines: [{at: c(5, 0), text: 'Ireland, 21 Nov'}, {at: c(5, 1), text: 'Finals weekend'}, {at: c(5, 2), text: '2 club games in Japan'}]},
    {from: S[6], to: END + 30, kicker: 'France 21–19 South Africa', lines: [{at: c(6, 0), text: 'France won by two'}]},
  ],
  overlays: [
    {type: 'zone', from: S[1], to: S[4], x: 12.2, y: 6.4, w: 5.8, h: 4.8},
    {type: 'path', from: c(1, 2), to: c(2, 0), pts: [[20, 14], [15.6, 9.2]], color: '#E9B93B'},
    {type: 'burst', from: CONTACT, to: CONTACT + 40, x: 15.3, y: 8.6},
    {type: 'label', from: c(1, 3), to: S[2], x: 22.5, y: 6.2, text: 'clean-out', tone: 'cream', size: 34},
    {type: 'card', from: c(2, 0), to: c(3, 1), x: 19, y: 9.4},
    {type: 'label', from: c(2, 3), to: S[3], x: 22.8, y: 4.4, text: 'reports: to the head', tone: 'navy', size: 28},
    {type: 'card', from: c(3, 1), to: S[4], x: 19, y: 9.4, color: 'red'},
    {type: 'label', from: OFF + 10, to: S[4], x: 24.5, y: 11.2, text: 'off for good', tone: 'red', size: 30},
    {type: 'label', from: REP + 20, to: S[4], x: 24, y: 17, text: 'on after 20:00', tone: 'gold', size: 30},
  ],
  bigs: [
    {from: c(0, 1), to: S[1], y: 960, lines: [{at: c(0, 0), text: 'Yellow', tone: 'gold', size: 80}, {at: c(0, 1), text: 'Red', tone: 'red', size: 80}, {at: c(0, 2), text: '4 weeks', tone: 'cream', size: 80}]},
    {from: c(4, 2), to: S[5], y: 1040, lines: [{at: c(4, 2), text: '4 weeks', tone: 'red', size: 110, strike: c(4, 4)}, {at: c(4, 3), text: 'Coaching programme', tone: 'navy', size: 50}, {at: c(4, 4), text: '3 weeks', tone: 'gold', size: 110}]},
    {from: c(5, 3), to: S[6], y: 1180, lines: [{at: c(5, 3), text: 'Admitted. Accepted.', tone: 'cream', size: 66}]},
    {from: c(6, 1), to: END + 30, y: 1100, lines: [{at: c(6, 1), text: 'Too light, too heavy,', tone: 'cream', size: 62}, {at: c(6, 1) + 30, text: 'or about right?', tone: 'cream', size: 62}, {at: c(6, 2), text: 'You be the panel', tone: 'gold', size: 58}]},
  ],
};
