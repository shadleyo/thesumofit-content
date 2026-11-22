// Sport, by the numbers: "How a seven-point swing added up." England 37-12 New Zealand, Twickenham, 21 Nov 2026.
// First All Blacks video on the premium black theme (board.tsx theme: 'black').
// Cross-verified: England 12-0 up (Sky score summary; van Poortvliet 32'); Lakai turnover at the breakdown (1News,
// Telegraph live blog via Yahoo); knock-on at the base of the ruck, then England scrum in the NZ 22 (Sky, 1News, Telegraph);
// Ben Earl try from the base of the scrum (Sky, ESPN/PA, Planet Rugby, RUCK, 1News, Telegraph), converted by Fin Smith -> 19-0
// (Sky). Final 37-12, tries 5-2 (Sky, ESPN, 1News, Planet). Biggest-ever England winning margin over NZ (AP via Yahoo,
// Planet Rugby "biggest any England side has managed"). Referee Nic Berry (Sky, 1News).
// DISPUTED, shown with DISPUTED dots: who knocked on. 1News + Telegraph: Cam Roigard. Sky: Fletcher Newell passing from
// the ruck, "an errant boot caused a knock-on". Video shows both, takes neither.
// SINGLE-SOURCED, flagged as "one report": Berry not awarding a turnover penalty "saying they had already stolen
// possession" (Sky only).
// NOT used: run distance (18m Planet / 25m ESPN / 35m 1News conflict); "10+ phases" (Telegraph only); stats (Planet
// internally inconsistent on missed tackles); Rennie pressure; TMO reviews on other tries (single-sourced each).
// Positions illustrative. No view taken on the officials.
import type {BoardRecipe} from '../board';
import t from './LakaiSteal.timing.json';

const T = t as {dur: number; cues: number[]}[];
const S = T.reduce<number[]>((a, s) => [...a, a[a.length - 1] + s.dur], [0]);  // beat start frames
const c = (beat: number, cue: number) => S[beat] + T[beat].cues[cue];
const END = S[T.length];
const STEAL = c(1, 3);          // Lakai over the ball
const KNOCK = c(2, 0) + 8;      // ball spills at the base
const SCRUM = c(3, 3);          // England scrum forms
const PICK = c(4, 0) + 4;       // Earl picks up
const OVER = c(4, 1) + 14;      // Earl grounds
const GONE = S[5] + 10;         // board clears for the numbers

export const lakaiSteal: BoardRecipe = {
  id: 'LakaiSteal', audio: 'audio/LakaiSteal.mp3', dur: END, series: 'Sport, by the numbers', theme: 'black', ballUntil: GONE,
  match: 'England 37–12 New Zealand · 21 Nov 2026',
  note: 'Rebuilt from match reports. Positions illustrative, not to scale. Who knocked on is disputed; the ruling on the steal is in one report (Sky Sports) only. No view taken on the officials.',
  teams: {a: 'New Zealand', b: 'England', aColor: '#0A0A0B', bColor: '#F4F5F7'},
  dots: [
    // New Zealand, defending their line (y < 13)
    {id: 'nz1', team: 'a', until: GONE, kf: [[S[1], 9, 9], [SCRUM, 10, 9.5]]},
    {id: 'nz2', team: 'a', until: GONE, kf: [[S[1], 21.5, 9], [SCRUM, 20, 9.5]]},
    {id: 'nz3', team: 'a', until: GONE, kf: [[S[1], 25, 5], [PICK, 17, 6], [OVER, 14.6, 1.6]]},
    {id: 'lakai', team: 'a', label: 'PL', until: GONE, kf: [[S[1], 15.6, 11.8], [STEAL, 15.2, 12.3], [SCRUM, 13.6, 11.8], [PICK + 20, 13.8, 10.6]], ring: [STEAL, c(2, 0)]},
    {id: 'roigard', team: 'a', label: 'CR', disputed: true, until: GONE, kf: [[S[1], 12, 10.6], [SCRUM, 9.6, 12.6], [PICK + 16, 12.6, 9.6]]},
    {id: 'newell', team: 'a', label: 'FN', disputed: true, until: GONE, kf: [[S[1], 18.6, 10.8], [SCRUM, 16.8, 11.8]]},
    // England, attacking (y > 13)
    {id: 'en1', team: 'b', until: GONE, kf: [[S[1], 12.5, 14.8], [SCRUM, 14.2, 14.2]]},
    {id: 'en2', team: 'b', until: GONE, kf: [[S[1], 17.6, 15], [SCRUM, 16.2, 14.2]]},
    {id: 'en3', team: 'b', until: GONE, kf: [[S[1], 9, 17], [SCRUM, 11, 17]]},
    {id: 'en4', team: 'b', until: GONE, kf: [[S[1], 21, 17.5], [SCRUM, 20, 17]]},
    {id: 'earl', team: 'b', label: 'BE', until: GONE, kf: [[S[1], 15.4, 17.6], [SCRUM, 15.2, 16], [PICK, 15.2, 15.6], [PICK + 26, 13.4, 9.2], [OVER, 12.8, -0.8]], ring: [PICK, OVER + 20]},
  ],
  ball: [[S[1], 15.2, 13], [KNOCK, 15.2, 13], [KNOCK + 14, 15.9, 14.6], [SCRUM, 15.2, 13.2], [PICK, 15.3, 15.2], [PICK + 26, 13.7, 8.8], [OVER, 13.1, -1.2]],
  captions: [
    {from: S[0], to: S[1], kicker: 'England v New Zealand', lines: [{at: c(0, 0), text: 'NZ win the ball back'}, {at: c(0, 1), text: 'England score from it'}, {at: c(0, 2), text: 'The seven-point swing'}]},
    {from: S[1], to: S[2], kicker: 'England 12–0 · first half', lines: [{at: c(1, 1), text: 'Rebuilt from match reports'}, {at: c(1, 3), text: 'Lakai steals it'}]},
    {from: S[2], to: S[3], kicker: 'Knock-on · reports differ', lines: [{at: c(2, 0), text: 'At the base of the ruck'}, {at: c(2, 1), text: '2 reports: Roigard'}, {at: c(2, 2), text: '1 report: Newell pass, a boot'}]},
    {from: S[3], to: S[4], kicker: 'One report · Sky Sports', lines: [{at: c(3, 1), text: 'Berry: NZ already had it'}, {at: c(3, 2), text: 'No penalty for the steal'}, {at: c(3, 3), text: 'England scrum, NZ 22'}]},
    {from: S[4], to: S[5], kicker: 'Ben Earl', lines: [{at: c(4, 0), text: 'Pick from the base'}, {at: c(4, 2), text: 'Try. Converted'}]},
    {from: S[5], to: S[6], kicker: 'Full time · Twickenham', lines: [{at: c(5, 0), text: 'Five tries to two'}]},
    {from: S[6], to: END + 30, kicker: 'The sum', lines: [{at: c(6, 0), text: 'Turnover won'}, {at: c(6, 1), text: 'Seven points conceded'}]},
  ],
  overlays: [
    {type: 'zone', from: S[1], to: c(3, 0), x: 13, y: 11.2, w: 4.6, h: 3.6},
    {type: 'label', from: STEAL, to: S[2], x: 23.6, y: 13, text: 'turnover', tone: 'gold', size: 32},
    {type: 'burst', from: KNOCK, to: KNOCK + 36, x: 15.6, y: 13.8},
    {type: 'label', from: c(2, 1), to: S[3], x: 7.2, y: 7.4, text: 'Roigard?', tone: 'cream', size: 30},
    {type: 'label', from: c(2, 2), to: S[3], x: 22.8, y: 6.6, text: 'Newell + boot?', tone: 'cream', size: 30},
    {type: 'zone', from: SCRUM, to: PICK + 10, x: 12, y: 11, w: 6.4, h: 6.4},
    {type: 'label', from: SCRUM, to: S[4], x: 24, y: 14.4, text: 'England put-in', tone: 'navy', size: 30},
    {type: 'path', from: PICK, to: S[5], pts: [[15.2, 15.6], [13.4, 9.2], [12.8, -0.8]], color: '#FFFFFF'},
    {type: 'burst', from: OVER, to: OVER + 40, x: 12.8, y: -0.8},
  ],
  bigs: [
    {from: c(0, 0), to: S[1], y: 960, lines: [{at: c(0, 0), text: 'Turnover', tone: 'cream', size: 86}, {at: c(0, 1), text: '+7 England', tone: 'gold', size: 86}]},
    {from: c(4, 3), to: S[5], y: 1280, lines: [{at: c(4, 3), text: '19–0', tone: 'gold', size: 110}]},
    {from: c(5, 1), to: S[6], y: 860, lines: [{at: c(5, 1), text: '37–12', tone: 'gold', size: 150}, {at: c(5, 2), text: "England's biggest-ever", tone: 'cream', size: 56}, {at: c(5, 2) + 10, text: 'winning margin over NZ', tone: 'cream', size: 56}]},
    {from: c(6, 2), to: END + 30, y: 980, lines: [{at: c(6, 2), text: 'Right call?', tone: 'cream', size: 80}, {at: c(6, 3), text: 'You be the referee', tone: 'gold', size: 60}]},
  ],
};
