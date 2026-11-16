// "The Iran war bill, per household". Iran war series.
// Sources: Roll Call 18 Sep 2026 (Pentagon estimate $43.6bn to 3 Sep; CBO $2-3bn/month); Aviation Week 24 Jun 2026 ($67.15bn Pentagon in $87.6bn supplemental);
// PBS 22 Jul 2026 (House budget resolution 216-214: $60bn Pentagon + $13bn other national security in $95bn package); FRED TTLHH 2025: 134.79m households.
import {Recipe} from '../template';
import t from './WarBill.timing.json';

const timed = (r: Recipe, tt: {dur: number; cues: number[]}[], audio: string): Recipe => ({...r, audio, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});
const HH = 134.79e6;
const days = 188; // 28 Feb to 3 Sep 2026 inclusive
const perDay = Math.round(43.6e9 / days / 1e7) * 10; // $m, rounded to 10
const perHH = (bn: number) => '$' + Math.round(bn * 1e9 / HH / 10) * 10;

export const warBill: Recipe = timed({
  id: 'WarBill',
  channel: 'THE SUM OF IT',
  thumb: {kicker: 'THE IRAN WAR BILL', from: 'Per household', link: 'so far', to: perHH(43.6), foot: "Pentagon's own count, to 3 Sep 2026"},
  scenes: [
    {type: 'hook', dur: 150, kicker: "The Pentagon's own count", lines: ['*$43.6bn*', 'and counting.'], question: 'What the Iran war has cost the U.S. military so far.'},
    {
      type: 'reveal', dur: 270, kicker: '28 February – 3 September',
      items: [
        {label: 'PER DAY OF WAR', value: `$${perDay}m`, color: 'paper'},
        {label: 'PER U.S. HOUSEHOLD', value: perHH(43.6), color: 'accent'},
      ],
      punch: 'And that’s only\n*what’s been counted.*',
    },
    {
      type: 'rank', dur: 360, kicker: 'Spent, asked for, planned', max: 80,
      rows: [
        {label: 'Spent to 3 Sep', value: 43.6, display: '$43.6bn', color: 'muted'},
        {label: 'Asked for · Jun', value: 67.1, display: '$67.1bn', color: 'accent'},
        {label: 'House plan · Jul', value: 73, display: '$73bn', color: 'alert'},
      ],
      footnote: 'The House plan passed *216–214.*',
    },
    {
      type: 'reveal', dur: 210, kicker: 'Congressional Budget Office',
      items: [{label: 'EVERY MONTH THE WAR GOES ON', value: '$2–3bn', color: 'alert'}],
      punch: 'The meter is\n*still running.*',
    },
    {
      type: 'outro', dur: 150, lines: 'Fought overseas.\n*Paid for at home.*',
      disclaimer: 'Pentagon estimate to 3 Sep 2026 (Roll Call, 18 Sep). $67.1bn Pentagon supplemental request (24 Jun). House budget resolution, 22 Jul: $60bn Pentagon + $13bn national security. Per household: 134.8m U.S. households (Census/FRED, 2025). Figures overlap and are not additive.',
    },
  ],
}, t as {dur: number; cues: number[]}[], 'audio/WarBill.mp3');
