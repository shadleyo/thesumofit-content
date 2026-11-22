// Sport, by the numbers: "How a boot on the chalk added up." Ireland 20-17 South Africa, Dublin, 21 Nov 2026.
// Cross-verified: final 20-17, half-time 17-10 (SA Rugby mag, Marking The Spot, Irish Examiner, RugbyPass, Citizen);
// Canan Moodie try ruled out for touch, soon after the restart, in the corner (Irish Examiner x2, SA Rugby mag
// incl. SuperSport commentary "The TMO rules that Moodie was in touch", Marking The Spot; RugbyPass: "scrubbed off").
// TMO review: SA Rugby mag (and its quoted SuperSport commentary) only says so explicitly; script says "the TMO checks".
// SINGLE-SOURCED, said as "one report" / "another": Mack Hansen pushing Moodie into touch (Marking The Spot only);
// "a boot scrape the chalk a split second before he touched down" (Irish Examiner, O'Brien, only).
// Then Prendergast penalty 20-10; Marx try, converted, 20-17 (SAR, MTS, IE). Losing bonus point = top of the southern
// table and a place in the final (SAR, Citizen, MTS). Law 18.1(a), World Rugby: ball-carrier touches the touchline = touch.
// Not shown (single source / unclear): clock minute (none given), 54' penalty (SAR only), TMO name, final opponent.
// Positions illustrative. No view taken on the decision.
import type {BoardRecipe} from '../board';
import t from './MoodieTouch.timing.json';

const T = t as {dur: number; cues: number[]}[];
const S = T.reduce<number[]>((a, s) => [...a, a[a.length - 1] + s.dur], [0]);  // beat start frames
const c = (beat: number, cue: number) => S[beat] + T[beat].cues[cue];
const END = S[T.length];
const RUN = c(1, 2);            // Moodie sets off
const GROUND = c(1, 3) + 20;    // Moodie stretches over in the corner

export const moodieTouch: BoardRecipe = {
  id: 'MoodieTouch', audio: 'audio/MoodieTouch.mp3', dur: END, series: 'Sport, by the numbers',
  match: 'Ireland 20–17 South Africa · 21 Nov 2026',
  note: 'Rebuilt from match reports. Positions illustrative, not to scale. The push and the boot on the chalk are each in one report only. No view taken on the decision.',
  teams: {a: 'South Africa', b: 'Ireland'},
  dots: [
    // Irish defence, scrambling across
    {id: 'ir1', team: 'b', kf: [[S[1], 8, 6], [GROUND, 11, 4.5]]},
    {id: 'ir2', team: 'b', kf: [[S[1], 13, 4], [GROUND, 17, 3]]},
    {id: 'ir3', team: 'b', kf: [[S[1], 17, 7], [GROUND, 22, 4.2]]},
    // SA support, trailing the break
    {id: 'sa1', team: 'a', kf: [[S[1], 16, 15], [GROUND, 22.5, 7.5]]},
    {id: 'sa2', team: 'a', kf: [[S[1], 12, 16], [GROUND, 18, 8]]},
    // Hansen, covering to the corner
    {id: 'hansen', team: 'b', label: 'MH', kf: [[S[1], 22, 4], [RUN, 23.5, 4.6], [GROUND - 14, 28, 2.2], [GROUND, 29, 0.9]], ring: [c(2, 1), c(2, 2)]},
    // Moodie: up the right wing, stretches over in the corner
    {id: 'moodie', team: 'a', label: 'CM', kf: [[S[1], 20, 18], [RUN, 21, 16], [GROUND - 14, 28.6, 3], [GROUND, 30.1, -0.5]], ring: [c(1, 3), c(2, 1)]},
  ],
  ball: [[S[1], 20.6, 17.3], [RUN, 21.6, 15.3], [GROUND - 14, 29.2, 2.3], [GROUND, 29.8, -1.4]],
  captions: [
    {from: S[0], to: S[1], kicker: 'Ireland v South Africa', lines: [{at: c(0, 0), text: 'A try in the corner'}, {at: c(0, 1), text: "Then it's gone"}, {at: c(0, 2), text: 'How it added up'}]},
    {from: S[1], to: S[2], kicker: 'Rebuilt from match reports', lines: [{at: c(1, 0), text: 'Ireland lead 17–10'}, {at: c(1, 1), text: 'Soon after the restart'}, {at: c(1, 2), text: 'Moodie, in the corner'}]},
    {from: S[2], to: S[3], kicker: 'TMO review', lines: [{at: c(2, 0), text: 'The TMO checks'}, {at: c(2, 1), text: 'One report: a Hansen push'}, {at: c(2, 2), text: 'Another: boot on the chalk'}]},
    {from: S[3], to: S[4], kicker: 'World Rugby Law 18.1(a)', lines: [{at: c(3, 1), text: 'Ball-carrier touches'}, {at: c(3, 1) + 12, text: 'the touchline: in touch'}]},
    {from: S[4], to: S[5], kicker: 'The scoreboard', lines: [{at: c(4, 2), text: 'Minutes later'}, {at: c(4, 2) + 12, text: 'Ireland penalty'}]},
    {from: S[5], to: S[6], kicker: 'Ireland 20–17 South Africa', lines: [{at: c(5, 0), text: 'Marx try, converted'}, {at: c(5, 2), text: 'SA lose by 3'}, {at: c(5, 3), text: 'Losing bonus point'}]},
    {from: S[6], to: END + 30, kicker: 'The sum', lines: [{at: c(6, 0), text: 'A try: 5 points'}, {at: c(6, 1), text: 'The margin: 3'}]},
  ],
  overlays: [
    {type: 'path', from: RUN, to: S[3], pts: [[21, 16], [28.6, 3], [30.1, -0.5]], color: '#E9B93B'},
    {type: 'path', from: c(2, 1), to: c(2, 2) + 30, pts: [[26.5, 2.6], [30.4, 0.6]], color: '#F3EDE2'},
    {type: 'label', from: c(2, 1), to: S[3], x: 24.5, y: 10, text: 'push? (1 report)', tone: 'cream', size: 30},
    {type: 'burst', from: c(2, 3), to: c(2, 3) + 40, x: 31, y: -0.2},
    {type: 'label', from: c(2, 3), to: S[3], x: 18.5, y: -2.4, text: 'boot on the chalk? (1 report)', tone: 'navy', size: 28},
    {type: 'zone', from: c(3, 1), to: S[4], x: 30.2, y: -5, w: 1.6, h: 14},
    {type: 'label', from: c(3, 2), to: S[4], x: 25.5, y: 11, text: 'touchline', tone: 'gold', size: 32},
  ],
  bigs: [
    {from: c(0, 0), to: S[1], y: 1000, lines: [{at: c(0, 0), text: 'Try', tone: 'gold', size: 120, strike: c(0, 1) + 6}]},
    {from: c(3, 3), to: S[4], y: 1150, lines: [{at: c(3, 3), text: 'No try', tone: 'red', size: 110}]},
    {from: c(4, 0), to: S[5], y: 1000, lines: [{at: c(4, 0), text: '−5 points', tone: 'red', size: 100}, {at: c(4, 1), text: '(7 if converted)', tone: 'navy', size: 50}, {at: c(4, 3), text: '20–10', tone: 'cream', size: 100}]},
    {from: c(5, 1), to: S[6], y: 1020, lines: [{at: c(5, 1), text: '20–17', tone: 'cream', size: 110}, {at: c(5, 3) + 20, text: 'Still into the final', tone: 'gold', size: 58}]},
    {from: c(6, 2), to: END + 30, y: 1080, lines: [{at: c(6, 2), text: 'Right call?', tone: 'cream', size: 72}, {at: c(6, 3), text: 'You be the TMO', tone: 'gold', size: 58}]},
  ],
};
