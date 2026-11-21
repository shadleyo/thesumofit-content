// Sport, by the numbers: "Three votes to two." Leeds 1-0 Tottenham, Elland Road, 7 Nov 2026 (Premier League).
// Cross-verified: score 1-0 (PA/Irish News, Reuters/TimesLIVE, VAVEL, Yorkshire Post); 34th minute (PA + Football
// Today; Reuters "just after the half-hour"); referee John Brooks, free kick, no card (YEP, Yorkshire Post, PA, Reuters);
// VAR did not send Brooks to the monitor (PA, Yorkshire Post, YEP, False 9); Tel off before half-time, replaced by
// Solanke (PA, Reuters, VAVEL); KMI Panel of five split 3-2 for no red (YEP + Football Today), majority: "reckless" but
// without the "speed, force or intensity" for serious foul play; two panellists wanted red.
// DISPUTED (shown on screen as such): contact point. Panel wording / YEP: back of the ankle. PA: "high on the Achilles
// with his studs". Video shows both, picks neither.
// Law 12 (IFAB 2026-27 via thefa.com): reckless must be cautioned; endangering an opponent's safety = serious foul play.
// NOT used (single-sourced): VAR name (YEP only, + False 9 citing BBC); "almost five-minute" review (VAVEL only); VAR's
// Match Centre audio quote (SportBible only); Round 10 "27 decisions / 78%" (Football Today only); Spurs' letter to
// PGMOL (PA only). Pitch position of the foul is not in any report: positions illustrative. No view taken.
import type {BoardRecipe, KF} from '../board';
import t from './BogleTel.timing.json';

const T = t as {dur: number; cues: number[]}[];
const S = T.reduce<number[]>((a, s) => [...a, a[a.length - 1] + s.dur], [0]);  // beat start frames
const c = (beat: number, cue: number) => S[beat] + T[beat].cues[cue];
const END = S[T.length];
const CONTACT = c(1, 3) + 6;   // Bogle reaches Tel
const OFF = c(4, 1);           // Tel goes off
const still = (x: number, y: number, from = S[1]): KF[] => [[from, x, y]];

export const bogleTel: BoardRecipe = {
  id: 'BogleTel', audio: 'audio/BogleTel.mp3', dur: END, series: 'Sport, by the numbers', pitch: 'football',
  match: 'Leeds 1–0 Tottenham · Elland Road · 7 Nov 2026', note: 'Rebuilt from match reports and the KMI Panel verdict. Positions illustrative, not to scale. No view taken.',
  teams: {a: 'Leeds', b: 'Tottenham'},
  dots: [
    {id: 'le2', team: 'a', kf: still(9, 4)}, {id: 'le3', team: 'a', kf: still(26.5, 2)},
    {id: 'sp2', team: 'b', kf: still(12, 0.5)},
    // Tel: carries the ball in from the right, is caught, later goes off at the touchline
    {id: 'tel', team: 'b', label: 'MT', kf: [[S[1], 26, 13], [CONTACT, 19.4, 7.4], [OFF, 19.4, 7.6], [OFF + 60, 30, 9]], ring: [c(1, 3), c(2, 0)]},
    // Bogle: closes from behind
    {id: 'bogle', team: 'a', label: 'JB', kf: [[S[1], 13, 12.5], [c(1, 2), 15, 10.5], [CONTACT, 18.5, 8.2], [CONTACT + 30, 18, 9]], ring: [c(3, 1), S[4]]},
  ],
  ball: [[S[1], 25.2, 12.4], [CONTACT, 18.7, 7.0], [CONTACT + 24, 17.2, 5.6]],
  captions: [
    {from: S[0], to: S[1], kicker: 'Premier League · KMI Panel', lines: [{at: c(0, 0), text: 'Three votes to two'}, {at: c(0, 2), text: 'Red card, or not?'}]},
    {from: S[1], to: S[2], kicker: 'Rebuilt from match reports', lines: [{at: c(1, 0), text: 'Leeds v Tottenham'}, {at: c(1, 1), text: '34th minute'}, {at: c(1, 2), text: 'Bogle on Tel'}]},
    {from: S[2], to: S[3], kicker: 'Reports differ', lines: [{at: c(2, 0), text: 'Where did it land?'}]},
    {from: S[3], to: S[4], kicker: 'On the field', lines: [{at: c(3, 0), text: 'Referee John Brooks'}, {at: c(3, 1), text: 'Free kick. No card'}, {at: c(3, 2), text: 'VAR: no screen review'}]},
    {from: S[4], to: S[5], kicker: 'Before half-time', lines: [{at: c(4, 0), text: "Tel can't carry on"}, {at: c(4, 2), text: 'Leeds win 1–0'}]},
    {from: S[5], to: S[6], kicker: 'Key Match Incidents Panel', lines: [{at: c(5, 0), text: 'Five members vote'}]},
    {from: S[6], to: S[7], kicker: 'IFAB Law 12', lines: [{at: c(6, 1), text: 'Reckless: a yellow'}, {at: c(6, 2), text: 'Endangering: a red'}]},
    {from: S[7], to: END + 30, kicker: 'Leeds 1–0 Tottenham', lines: [{at: c(7, 0), text: 'The panel split 3–2'}]},
  ],
  overlays: [
    {type: 'path', from: c(1, 2), to: S[3], pts: [[13, 12.5], [15, 10.5], [18.5, 8.2]], color: '#E9B93B'},
    {type: 'path', from: c(1, 0), to: S[2], pts: [[26, 13], [19.4, 7.4]], color: '#F3EDE2'},
    {type: 'burst', from: CONTACT, to: CONTACT + 40, x: 19, y: 7.8},
    {type: 'label', from: c(2, 1), to: S[3], x: 16.5, y: 2.6, text: 'Panel: back of the ankle', tone: 'cream', size: 32},
    {type: 'label', from: c(2, 2), to: S[3], x: 16.5, y: 13.6, text: 'PA: high on the Achilles', tone: 'navy', size: 32},
    {type: 'label', from: c(2, 2) + 20, to: S[3], x: 16.5, y: 16.2, text: 'DISPUTED', tone: 'gold', size: 24},
    {type: 'label', from: c(3, 1), to: S[4], x: 23, y: 12.6, text: 'free kick', tone: 'cream', size: 32},
    {type: 'label', from: OFF + 30, to: S[5], x: 24.5, y: 13, text: 'off injured', tone: 'red', size: 30},
  ],
  bigs: [
    {from: c(0, 0), to: S[1], y: 880, lines: [{at: c(0, 0), text: '3–2', tone: 'gold', size: 170}, {at: c(0, 1), text: 'Premier League panel', tone: 'navy', size: 52}]},
    {from: c(4, 2), to: S[5], y: 1200, lines: [{at: c(4, 2), text: 'Leeds 1–0 Spurs', tone: 'cream', size: 70}]},
    {from: c(5, 1), to: S[6], y: 1120, lines: [{at: c(5, 1), text: '3 · no red', tone: 'gold', size: 84}, {at: c(5, 2), text: '"reckless", not serious foul play', tone: 'cream', size: 40}, {at: c(5, 3), text: '2 · red', tone: 'red', size: 84}]},
    {from: c(6, 3), to: S[7], y: 1180, lines: [{at: c(6, 3), text: 'Shown: no card', tone: 'cream', size: 80}]},
    {from: c(7, 0), to: END + 30, y: 1010, lines: [{at: c(7, 0), text: '3–2', tone: 'gold', size: 124}, {at: c(7, 1), text: 'Right call, or one vote', tone: 'cream', size: 50}, {at: c(7, 1) + 20, text: 'from a red?', tone: 'cream', size: 50}, {at: c(7, 2), text: 'You be the panel', tone: 'gold', size: 52}]},
  ],
};
