// Sport, by the numbers: "The Springbok backline, by the numbers." Ireland 20-17 South Africa, Dublin, 21 Nov 2026.
// Cross-verified: backline attack criticised (AP/ABC "the backline attack was poor"; Daily Maverick "one-dimensional";
// RugbyPass ratings "a real lack of cohesion"). Tries 3-2 (DM, RugbyPass, PA). SA tries: van den Berg from a 5m scrum
// (AP, SA Rugby mag, Marking The Spot) and hooker Malcolm Marx (AP, PA, DM, SAR). Baloucoune 2 tries (AP, PA, DM).
// Baloucoune's first: McCloskey pass (PA, Irish Examiner, MTS), stepped inside / slipped fullback Willemse (PA, AP).
// High ball: AP "lost the aerial battle"; DM Arendse and Hooker "could not win those duels"; RugbyPass Arendse
// "came off second best in the air". Exits: Felix Jones quote, rugby365 ("capitalise from a couple of our exits");
// Irish Examiner headline "Ireland capitalised on Springbok failures". Through on points difference: DM, rugby365.
// Final at Twickenham next Saturday: AP, Irish Examiner.
// SINGLE-SOURCED, flagged on screen: passes 149 (Ireland) v 107 (SA) — RugbyPass match summary only.
// NOT used: Willemse intercept (AP only); player ratings; 60% territory (DM only); 11 penalties (rugby365 only);
// Erasmus ban (kept out, as in WieseRed); van Staden card (yellow vs "20-minute red" conflict, not this story);
// final opponent (not confirmed in sources). Positions illustrative. No view taken on selection.
import type {BoardRecipe} from '../board';
import t from './BoksBackline.timing.json';

const T = t as {dur: number; cues: number[]}[];
const S = T.reduce<number[]>((a, s) => [...a, a[a.length - 1] + s.dur], [0]);  // beat start frames
const c = (beat: number, cue: number) => S[beat] + T[beat].cues[cue];
const END = S[T.length];
const PASS = c(2, 1) + 10;     // McCloskey to Baloucoune
const STEP = c(2, 2) + 10;     // step inside the fullback
const OVER = c(2, 3) + 6;      // dives over
const KICK = S[3] + 10;        // Bok exit kick
const CATCH = c(3, 2);         // Irish catch

export const boksBackline: BoardRecipe = {
  id: 'BoksBackline', audio: 'audio/BoksBackline.mp3', dur: END, series: 'Sport, by the numbers',
  match: 'Ireland 20–17 South Africa · 21 Nov 2026',
  note: 'Rebuilt from match reports. Positions illustrative, not to scale. Pass counts from one stats sheet (RugbyPass) only. No view taken on selection.',
  teams: {a: 'South Africa', b: 'Ireland'},
  dots: [
    // Springbok defence
    {id: 'sa1', team: 'a', kf: [[S[2], 11, 6], [OVER, 14, 4]]},
    {id: 'sa2', team: 'a', kf: [[S[2], 15.5, 5.5], [OVER, 18.5, 4]]},
    {id: 'sa3', team: 'a', kf: [[S[2], 20, 6], [STEP, 22, 4.6]]},
    {id: 'fb', team: 'a', label: '15', kf: [[S[2], 24.5, 2.6], [STEP - 8, 26.2, 3.6], [OVER, 26.4, 2.4]], ring: [c(2, 2), OVER]},
    // Ireland attack
    {id: 'ir1', team: 'b', kf: [[S[2], 13, 12], [OVER, 17, 8]]},
    {id: 'mcc', team: 'b', label: 'SM', kf: [[S[2], 17, 10], [PASS, 19.5, 8.8], [OVER, 20.5, 7]]},
    {id: 'rb', team: 'b', label: 'RB', kf: [[S[2], 25, 14], [PASS, 24, 10], [c(2, 2), 26, 5], [STEP, 24.4, 3.2], [OVER, 25.4, -0.9], [S[3] + 20, 25.4, -0.9], [c(3, 3), 16, 21]], ring: [PASS, OVER]},
    // the kicking duel
    {id: 'hk', team: 'b', label: 'HK', kf: [[S[3], 22.5, 26.5], [CATCH, 20.6, 23]], ring: [CATCH, c(3, 3) + 30]},
    {id: 'wing', team: 'a', kf: [[S[3], 27, 10], [CATCH + 12, 21.8, 21.4]]},
  ],
  ball: [[S[2], 17.5, 9.6], [PASS - 10, 17.6, 9.6], [PASS, 23.6, 9.6], [c(2, 2), 26.4, 4.4], [STEP, 24.8, 2.8], [OVER, 25.8, -1.4],
    [KICK, 18.5, 3.6], [CATCH, 20.6, 22.4]],
  captions: [
    {from: S[0], to: S[1], kicker: 'Ireland 20–17 South Africa', lines: [{at: c(0, 0), text: 'Into the final'}, {at: c(0, 1), text: 'But the backline?'}, {at: c(0, 3), text: 'By the numbers'}]},
    {from: S[1], to: S[2], kicker: 'Tries', lines: [{at: c(1, 0), text: 'South Africa: 2'}, {at: c(1, 3), text: 'Ireland: 3'}]},
    {from: S[2], to: S[3], kicker: "Baloucoune's first try", lines: [{at: c(2, 1), text: 'McCloskey pass'}, {at: c(2, 2), text: 'Step inside the fullback'}, {at: c(2, 3), text: 'Try'}]},
    {from: S[3], to: S[4], kicker: 'The kicking duel', lines: [{at: c(3, 1), text: '3 reports agree'}, {at: c(3, 2), text: 'Ireland won the high ball'}, {at: c(3, 3), text: 'Bok wings lost the duels'}]},
    {from: S[4], to: S[5], kicker: 'Passes · one stats sheet', lines: []},
    {from: S[5], to: S[6], kicker: 'Felix Jones, SA assistant coach', lines: []},
    {from: S[6], to: END + 30, kicker: 'Nations Championship', lines: [{at: c(6, 0), text: 'Lost by 3'}, {at: c(6, 1), text: 'Through on points difference'}, {at: c(6, 2), text: 'Final: Twickenham'}]},
  ],
  overlays: [
    {type: 'path', from: PASS - 10, to: c(2, 3), pts: [[17.6, 9.6], [23.6, 9.6]], color: '#F3EDE2'},
    {type: 'path', from: c(2, 2), to: S[3], pts: [[26, 5], [24.4, 3.2], [25.4, -0.9]], color: '#3D6FD1'},
    {type: 'burst', from: OVER, to: OVER + 40, x: 25.6, y: -1},
    {type: 'path', from: KICK, to: S[4], pts: [[18.5, 3.6], [21, 13], [20.6, 22.4]], color: '#E9B93B'},
    {type: 'label', from: KICK + 10, to: S[4], x: 12, y: 13, text: 'Bok kick', tone: 'gold', size: 32},
    {type: 'label', from: CATCH, to: S[4], x: 12.5, y: 24, text: 'Irish catch', tone: 'navy', size: 32},
  ],
  bigs: [
    {from: c(0, 2), to: S[1], y: 1000, lines: [{at: c(0, 2), text: 'The backline', tone: 'cream', size: 84}, {at: c(0, 3), text: 'barely fired', tone: 'red', size: 84}]},
    {from: c(1, 1), to: S[2], y: 920, lines: [{at: c(1, 1), text: '5-metre scrum', tone: 'gold', size: 60}, {at: c(1, 2), text: 'Marx, the hooker', tone: 'gold', size: 60}, {at: c(1, 4), text: 'Baloucoune: 2', tone: 'navy', size: 72}]},
    {from: c(4, 1), to: S[5], y: 980, lines: [{at: c(4, 1), text: 'Ireland: 149', tone: 'navy', size: 84}, {at: c(4, 2), text: 'South Africa: 107', tone: 'gold', size: 84}]},
    {from: c(5, 0), to: S[6], y: 1000, lines: [{at: c(5, 1), text: '“Ireland did really well', tone: 'cream', size: 52}, {at: c(5, 1) + 8, text: 'to capitalise from a', tone: 'cream', size: 52}, {at: c(5, 1) + 16, text: 'couple of our exits”', tone: 'cream', size: 52}]},
    {from: c(6, 3), to: END + 30, y: 1060, lines: [{at: c(6, 3), text: 'Backs, or forwards again?', tone: 'cream', size: 62}, {at: c(6, 4), text: 'You be the selector', tone: 'gold', size: 58}]},
  ],
};
