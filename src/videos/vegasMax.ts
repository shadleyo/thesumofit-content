// Sport, by the numbers: "What Verstappen does in Vegas, stays in Vegas." Tribute after the 2026 Las Vegas GP win.
// 2023: inaugural race, won despite a five-second penalty and damage (FIA "Verstappen overcomes penalty and damage to win
//   Las Vegas Grand Prix ahead of Leclerc, Perez"; F1.com; Yahoo/AFP "Verstappen overcomes penalty, damage").
// 2024: finished 5th (Russell won), clinched 4th title; "sixth driver" with four titles (NBC News, Al Jazeera).
// 2025: won; "nearly 21 seconds" ahead of Norris on the road (F1.com), 20.741s (Al Jazeera, F1 race programme);
//   Norris and Piastri disqualified for skid wear (F1.com, RNT results table).
// 2026: pole after Antonelli's five-place grid penalty (official F1 starting grid + RNT; Antonelli fastest in Q).
//   Winner Verstappen, Norris 2nd (Autosport live text + The Big Lead). Russell off late (Autosport "into the wall at
//   Turn 5"; Big Lead "locked up ... veered off course") — said as "goes off". Antonelli late problem (Autosport "derate";
//   Big Lead "appeared to have an issue"). Lead changes Norris/Antonelli -> Verstappen: Autosport live text ONLY,
//   flagged on screen ("one live report").
// NOT used: 0.6s margin (Big Lead only, unofficial); Piastri P3 (Autosport only); Ferrari clash and penalties; FP3
//   Russell incident (separate video); 2026 win count / career totals (not found). Official classification not yet
//   published at build time. Positions illustrative, not to scale.
import type {BoardRecipe, KF} from '../board';
import t from './VegasMax.timing.json';

const T = t as {dur: number; cues: number[]}[];
const S = T.reduce<number[]>((a, s) => [...a, a[a.length - 1] + s.dur], [0]);  // beat start frames
const c = (beat: number, cue: number) => S[beat] + T[beat].cues[cue];
const END = S[T.length];
const VL = 28.2, RL = 25.6;   // Verstappen lane, rivals lane (kept right so the big numbers stay clear)
const run = (from: number, to: number, x: number, y0 = 36, y1 = -3): KF[] => [[from, x, y0], [to, x, y1]];

// 2026 battle beat
const B4 = c(4, 3);
const NOR_P = B4 + 15, VER_1 = B4 + 50, ANT_P = B4 + 85, VER_2 = c(4, 4);
const OFF = c(5, 0) + 30;     // Russell off
const SLOW = c(5, 1) + 10;    // Antonelli problem
const FLAG = c(5, 2) + 20;    // chequered flag

export const vegasMax: BoardRecipe = {
  id: 'VegasMax', audio: 'audio/VegasMax.mp3', dur: END, series: 'Sport, by the numbers',
  pitch: 'track', trackLabel: 'Las Vegas Strip',
  match: 'Las Vegas Grand Prix · 2023–2026',
  note: 'From race reports and the official grid. 2026 lead changes from one live report (Autosport). Official 2026 classification pending at publication. Positions illustrative.',
  teams: {a: 'Verstappen', b: 'Rivals', aColor: '#FFC906'},
  dots: [
    // 2023: one long run up the Strip
    {id: 'ver23', team: 'a', label: 'VER', until: S[2], kf: run(S[1], S[2] - 10, VL, 36, 3), ring: [c(1, 4), S[2]]},
    // 2024: four cars ahead, Verstappen fifth
    ...[0, 1, 2, 3].map((i) => ({id: 'p24' + i, team: 'b' as const, until: S[3], kf: [[S[2], i % 2 ? VL : RL, 26 + i * 3], [S[3] - 20, i % 2 ? VL : RL, 1 + i * 3]] as KF[]})),
    {id: 'ver24', team: 'a', label: 'VER', until: S[3], kf: [[S[2], VL, 40], [S[3] - 20, VL, 13.5]], ring: [c(2, 2), S[3]]},
    // 2025: clear air, McLarens far behind, then disqualified
    {id: 'ver25', team: 'a', label: 'VER', until: S[4], kf: run(S[3], S[4] - 20, VL, 30, 2), ring: [c(3, 1), S[4]]},
    {id: 'nor25', team: 'b', label: 'NOR', until: c(3, 2) + 30, kf: run(S[3] + 10, S[4], RL, 44, 30)},
    {id: 'pia25', team: 'b', label: 'PIA', until: c(3, 2) + 30, kf: run(S[3] + 10, S[4], VL, 47, 33)},
    // 2026: pole, lead swaps, then the finish
    {id: 'ver26', team: 'a', label: 'VER', kf: [[S[4], VL, 9], [NOR_P, VL, 9], [NOR_P + 20, VL, 10.5], [VER_1, VL, 6.5], [ANT_P, VL, 7.5], [ANT_P + 20, VL, 9.5], [VER_2, VL, 5.5], [c(5, 2), VL, 6], [FLAG, VL, -2.5]], ring: [VER_2, VER_2 + 50]},
    {id: 'nor26', team: 'b', label: 'NOR', kf: [[S[4], RL, 15], [B4, RL, 12], [NOR_P + 20, RL, 7.5], [VER_1, RL, 9.5], [ANT_P - 40, 22.8, 11], [ANT_P, 22.8, 13], [c(5, 2), 22.8, 9], [FLAG + 10, 22.8, 0.5]]},
    {id: 'rus26', team: 'b', label: 'RUS', kf: [[S[4], RL, 12], [B4, VL, 16], [OFF - 20, VL, 15], [OFF, 30.4, 11.5]]},
    {id: 'ant26', team: 'b', label: 'ANT', kf: [[S[4], RL, 21], [ANT_P - 30, RL, 12.5], [ANT_P + 20, RL, 7], [VER_2, RL, 8.5], [SLOW, RL, 9], [SLOW + 60, RL, 17]]},
  ],
  ball: [[0, 16, 10]],  // unused: no ball is drawn for pitch: 'track'
  captions: [
    {from: S[0], to: S[1], kicker: 'Las Vegas Grand Prix', lines: [{at: c(0, 2), text: 'Four races on the Strip'}, {at: c(0, 3), text: 'How they add up'}]},
    {from: S[1], to: S[2], kicker: '2023 · the first Vegas GP', lines: [{at: c(1, 2), text: 'Five-second penalty'}, {at: c(1, 3), text: 'Damaged car'}, {at: c(1, 4), text: 'Still wins'}]},
    {from: S[2], to: S[3], kicker: '2024', lines: [{at: c(2, 1), text: 'Finishes fifth'}, {at: c(2, 2), text: 'Leaves a 4-time champion'}, {at: c(2, 3), text: 'Only the sixth driver ever'}]},
    {from: S[3], to: S[4], kicker: '2025', lines: [{at: c(3, 1), text: 'Wins by 20+ seconds'}, {at: c(3, 2), text: 'Both McLarens disqualified'}]},
    {from: S[4], to: S[5], kicker: '2026 · one live report on the lead', lines: [{at: c(4, 1), text: 'Pole, after Antonelli penalty'}, {at: c(4, 3), text: 'Norris leads. Then Antonelli'}, {at: c(4, 4), text: 'Verstappen back, both times'}]},
    {from: S[5], to: S[6], kicker: '2026 · the finish', lines: [{at: c(5, 0), text: 'Russell goes off'}, {at: c(5, 1), text: 'Antonelli has a problem'}, {at: c(5, 3), text: 'Norris second'}]},
    {from: S[6], to: END + 30, kicker: 'Verstappen in Vegas', lines: [{at: c(6, 0), text: 'Four races'}]},
  ],
  overlays: [
    // 2023 penalty and damage
    {type: 'label', from: c(1, 2), to: S[2], x: 22.6, y: 4, text: '+5s', tone: 'red', size: 40},
    {type: 'burst', from: c(1, 3), to: c(1, 3) + 40, x: VL, y: 7.5},
    {type: 'label', from: c(1, 3), to: S[2], x: 22.6, y: 8, text: 'damage', tone: 'navy', size: 32},
    // 2024
    {type: 'label', from: c(2, 1), to: S[3], x: 23.9, y: 13.5, text: 'P5', tone: 'cream', size: 40},
    // 2025 gap
    {type: 'path', from: c(3, 1), to: c(3, 2) + 30, pts: [[RL - 2.2, 26], [RL - 2.2, 8]], color: '#00E5FF'},
    {type: 'label', from: c(3, 1), to: c(3, 2) + 30, x: 19.5, y: 17, text: '20s+', tone: 'gold', size: 40},
    {type: 'label', from: c(3, 2) + 10, to: S[4], x: 19.5, y: 31.5, text: 'DSQ ×2', tone: 'red', size: 34},
    // 2026
    {type: 'label', from: c(4, 1), to: c(4, 3), x: 20.5, y: 9, text: 'POLE', tone: 'gold', size: 34},
    {type: 'burst', from: VER_1, to: VER_1 + 30, x: VL, y: 6.5},
    {type: 'burst', from: VER_2, to: VER_2 + 30, x: VL, y: 5.5},
    {type: 'burst', from: OFF, to: OFF + 40, x: 30.4, y: 11.5},
    {type: 'label', from: SLOW, to: S[6], x: 20.5, y: 17, text: 'ANT: problem', tone: 'navy', size: 28},
    {type: 'zone', from: c(5, 2), to: S[6], x: 0.3, y: -0.4, w: 30.4, h: 0.8},
    {type: 'label', from: FLAG, to: S[6], x: 20.5, y: -2.4, text: 'P1 · VER', tone: 'gold', size: 36},
  ],
  bigs: [
    {from: c(0, 0), to: S[1], y: 1000, lines: [{at: c(0, 0), text: 'What Verstappen', tone: 'cream', size: 66}, {at: c(0, 0) + 10, text: 'does in Vegas', tone: 'cream', size: 66}, {at: c(0, 1), text: 'stays in Vegas', tone: 'gold', size: 66}]},
    {from: S[1], to: S[2] - 6, y: 1040, lines: [{at: S[1] + 4, text: '2023', tone: 'cream', size: 120}, {at: c(1, 4), text: 'P1', tone: 'gold', size: 96}]},
    {from: S[2], to: S[3] - 6, y: 1040, lines: [{at: S[2] + 4, text: '2024', tone: 'cream', size: 120}, {at: c(2, 2), text: '4× champion', tone: 'gold', size: 72}]},
    {from: S[3], to: S[4] - 6, y: 1040, lines: [{at: S[3] + 4, text: '2025', tone: 'cream', size: 120}, {at: c(3, 1), text: 'P1', tone: 'gold', size: 96}]},
    {from: S[4], to: c(4, 3), y: 1040, lines: [{at: S[4] + 4, text: '2026', tone: 'cream', size: 120}]},
    {from: c(5, 2), to: S[6] - 6, y: 1040, lines: [{at: c(5, 2), text: '2026', tone: 'cream', size: 100}, {at: FLAG, text: 'P1', tone: 'gold', size: 96}]},
    {from: c(6, 1), to: END + 30, y: 930, lines: [{at: c(6, 1), text: '3 wins', tone: 'gold', size: 110}, {at: c(6, 2), text: '+ 1 world title', tone: 'cream', size: 64}, {at: c(6, 3), text: 'What happens in Vegas…', tone: 'navy', size: 48}]},
  ],
};
