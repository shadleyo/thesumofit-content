// Sport, by the numbers: "Verstappen, Russell, Turn 14." Las Vegas GP, FP3, 21 Nov 2026.
// Cross-verified: the pass, early brake and change of direction under braking, and Russell's contact while
// moving inside — stewards' own written verdict (PlanetF1, "FIA confirms Max Verstappen punishment"), corroborated
// by Sunday Guardian's account of the FP3 Turn 14 clash. Penalty: a Driver Warning only, no grid or points
// penalty (stewards' verdict via PlanetF1). Separate investigation (weaving at Colapinto, no further action) —
// left out, not part of this incident.
// SINGLE-STORY BUT WIDELY REPORTED, flagged on screen as "not in the stewards' verdict": the onboard gesture —
// PlanetF1 ("untelevised footage... Verstappen holding up his middle finger") and MotorBiscuit (independently
// describes onboard footage "shared on social media," gesture "widely reported" as a middle finger) both report
// it; neither the written FIA verdict nor Formula1.com's race report mentions it at all.
// Quotes: Russell at the FIA press conference, "No confusion... it was pretty clear, I think" (MotorBiscuit);
// "Somebody's got to stand up to that guy" (MotorBiscuit). Verstappen: "Nothing happened" (MotorBiscuit).
// Not shown (unclear / not needed for this story): exact lap number, stewards' investigation number, grid order
// after the penalties round. Positions illustrative, not to scale. No view taken on the stewards' decision.
import type {BoardRecipe} from '../board';
import t from './VerstappenRussell.timing.json';

const T = t as {dur: number; cues: number[]}[];
const S = T.reduce<number[]>((a, s) => [...a, a[a.length - 1] + s.dur], [0]);  // beat start frames
const c = (beat: number, cue: number) => S[beat] + T[beat].cues[cue];
const END = S[T.length];
const BRAKE = c(1, 2);      // Verstappen brakes early, cuts across
const CUT = c(1, 3);        // changes direction under braking
const CONTACT = c(2, 2);    // Russell moves inside, contact

export const verstappenRussell: BoardRecipe = {
  id: 'VerstappenRussell', audio: 'audio/VerstappenRussell.mp3', dur: END, series: 'Sport, by the numbers',
  pitch: 'track', trackLabel: 'Turn 14',
  match: 'Las Vegas Grand Prix · FP3, 21 Nov 2026',
  note: 'Rebuilt from stewards\' and press reports. Positions illustrative, not to scale. The onboard gesture is widely reported but not mentioned in the stewards\' written verdict. No view taken on the penalty.',
  teams: {a: 'Verstappen', b: 'Russell', aColor: '#1E3A6E'},
  dots: [
    {id: 'ver', team: 'a', label: 'VER', kf: [[S[1], 13, 25], [BRAKE - 20, 13.5, 14], [BRAKE, 15, 9], [CUT, 15.6, 6.5], [CONTACT, 16, 4.5], [S[3] + 40, 16.4, 1]], ring: [CONTACT - 10, CONTACT + 36]},
    {id: 'rus', team: 'b', label: 'RUS', kf: [[S[1], 19, 24], [BRAKE - 20, 18.6, 13.5], [BRAKE, 18, 8.5], [CUT, 16.8, 6.8], [CONTACT, 16.3, 4.7], [S[3] + 40, 15.8, 1.2]], ring: [CONTACT - 10, CONTACT + 36]},
  ],
  ball: [[0, 16, 10]],  // unused: no ball is drawn for pitch: 'track'
  captions: [
    {from: S[0], to: S[1], kicker: 'Las Vegas Grand Prix · FP3', lines: [{at: c(0, 0), text: 'Verstappen, Russell'}, {at: c(0, 1), text: 'Collide at Turn 14'}, {at: c(0, 3), text: "Here's how it added up"}]},
    {from: S[1], to: S[2], kicker: 'The back straight', lines: [{at: c(1, 0), text: 'Verstappen passes Russell'}, {at: c(1, 2), text: 'Then brakes early'}, {at: c(1, 3), text: 'Changes direction'}]},
    {from: S[2], to: S[3], kicker: 'Turn 14', lines: [{at: c(2, 0), text: 'Russell moves inside'}, {at: c(2, 2), text: 'Contact'}]},
    {from: S[3], to: S[4], kicker: 'FIA stewards', lines: [{at: c(3, 0), text: '"Unpredictable"'}, {at: c(3, 1), text: 'Below the standard expected'}, {at: c(3, 3), text: 'Driver warning'}, {at: c(3, 4), text: 'No points'}]},
    {from: S[4], to: S[5], kicker: "Untelevised footage · widely reported", lines: [{at: c(4, 0), text: 'Onboard footage, shared online'}, {at: c(4, 2), text: 'Appears to show a gesture'}, {at: c(4, 3), text: "Not in the stewards' verdict"}]},
    {from: S[5], to: S[6], kicker: 'After qualifying', lines: [{at: c(5, 0), text: 'Russell: "Pretty clear"'}, {at: c(5, 2), text: '"Somebody\'s got to stand up"'}, {at: c(5, 3), text: 'Verstappen: "Nothing happened"'}]},
    {from: S[6], to: END + 30, kicker: 'The verdict', lines: [{at: c(6, 0), text: 'A warning, not a penalty'}, {at: c(6, 1), text: 'Right call?'}]},
  ],
  overlays: [
    {type: 'path', from: BRAKE - 20, to: BRAKE, pts: [[13, 14], [14.5, 10], [15, 9]], color: '#00E5FF'},
    {type: 'path', from: BRAKE, to: CONTACT, pts: [[18, 8.5], [17, 7.3], [16.3, 4.7]], color: '#E10600'},
    {type: 'burst', from: CONTACT, to: CONTACT + 40, x: 16, y: 4.6},
    {type: 'zone', from: c(3, 0), to: S[4], x: 13, y: 2, w: 6, h: 10},
    {type: 'label', from: c(3, 0), to: S[4], x: 16, y: -2, text: 'braking zone', tone: 'cream', size: 28},
    {type: 'label', from: c(4, 2), to: S[5], x: 16.4, y: 3.4, text: 'gesture: reported, not in verdict', tone: 'navy', size: 24},
  ],
  bigs: [
    {from: CONTACT, to: S[3], y: 1000, lines: [{at: CONTACT, text: 'CONTACT', tone: 'red', size: 100}]},
    {from: c(3, 3), to: S[4], y: 1000, lines: [{at: c(3, 3), text: 'Driver warning', tone: 'gold', size: 84}, {at: c(3, 4), text: 'No grid drop · no points', tone: 'cream', size: 44}]},
    {from: c(4, 3), to: S[5], y: 1000, lines: [{at: c(4, 3), text: 'Widely reported', tone: 'navy', size: 72}, {at: c(4, 4), text: "Not in the stewards' verdict", tone: 'cream', size: 38}]},
    {from: c(6, 1), to: END + 30, y: 1060, lines: [{at: c(6, 1), text: 'Right call?', tone: 'cream', size: 72}, {at: c(6, 2), text: 'You be the steward', tone: 'gold', size: 58}]},
  ],
};
