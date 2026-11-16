// "What gas costs in the 13 Senate battlegrounds" — Iran war series.
// Prices: AAA state averages 20–21 Oct 2026; pre-war = AAA 13 Oct price minus change since 26 Feb (Newsweek, 13 Oct 2026).
// Battleground list: Newsweek's 13 Senate battleground states (13 Oct 2026). Household figure: ITEP Iran War Fuel Cost tracker, 16 Oct 2026.
import {Recipe} from '../template';
import d from '../swing.data.json';
import t from './SwingGas.timing.json';

const timed = (r: Recipe, tt: {dur: number; cues: number[]}[], audio: string): Recipe => ({...r, audio, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});
const S = Object.fromEntries(d.states.map((x) => [x.state, x]));
const up = (n: number) => '+$' + n.toFixed(2);

export const swingGas: Recipe = timed({
  id: 'SwingGas',
  channel: 'THE SUM OF IT',
  thumb: {kicker: 'GAS IN THE 13 SENATE BATTLEGROUNDS', from: 'Montana', link: 'is up', to: up(S['Montana'].increase), foot: 'a gallon since the Iran war began'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'Midterms · 3 November', lines: ['*13 states*', 'could decide\nthe Senate.'], question: "Here's what gas costs there now."},
    {
      type: 'reveal', dur: 300, kicker: 'Biggest jumps · per gallon',
      items: [
        {label: `MONTANA · $${S['Montana'].prewar.toFixed(2)} → $${S['Montana'].now.toFixed(2)}`, value: up(S['Montana'].increase), color: 'accent'},
        {label: `NEBRASKA · $${S['Nebraska'].prewar.toFixed(2)} → $${S['Nebraska'].now.toFixed(2)}`, value: up(S['Nebraska'].increase), color: 'paper'},
        {label: `IOWA · $${S['Iowa'].prewar.toFixed(2)} → $${S['Iowa'].now.toFixed(2)}`, value: up(S['Iowa'].increase), color: 'alert'},
      ],
      punch: 'Around *60% more*\nthan before the war.',
    },
    {
      type: 'people', dur: 300, kicker: 'One 15-gallon fill-up', footnote: 'Extra per tank vs. before the war.',
      people: [
        {name: 'Michigan', color: 'accent', tag: `UP ${S['Michigan'].pct}%`, note: `$${S['Michigan'].prewar.toFixed(2)} → $${S['Michigan'].now.toFixed(2)} a gallon`, statLabel: 'EXTRA PER TANK', stat: '+$' + Math.round(S['Michigan'].tank15)},
        {name: 'Maine', color: 'paper', tag: `UP ${S['Maine'].pct}%`, note: `$${S['Maine'].prewar.toFixed(2)} → $${S['Maine'].now.toFixed(2)} a gallon`, statLabel: 'EXTRA PER TANK', stat: '+$' + Math.round(S['Maine'].tank15)},
        {name: 'North Carolina', color: 'alert', tag: 'SMALLEST RISE', note: `$${S['North Carolina'].prewar.toFixed(2)} → $${S['North Carolina'].now.toFixed(2)} a gallon`, statLabel: 'EXTRA PER TANK', stat: '+$' + Math.round(S['North Carolina'].tank15)},
      ],
    },
    {
      type: 'rank', dur: 330, kicker: 'All 13 · rise per gallon', max: 1.8,
      rows: d.states.map((x) => ({label: x.state, value: x.increase, display: up(x.increase), color: (x.increase >= 1 ? 'accent' : 'muted') as 'accent' | 'muted'})),
      footnote: '11 of 13: up *more than $1 a gallon.*',
    },
    {
      type: 'reveal', dur: 240, kicker: 'Across the U.S.',
      items: [{label: 'EXTRA PAID PER HOUSEHOLD · GAS + DIESEL', value: '$870', color: 'accent'}],
      punch: 'Since the war began\non 28 February.',
    },
    {
      type: 'outro', dur: 150, lines: 'Whoever wins,\n*this is the bill.*',
      disclaimer: 'Regular gas, AAA state averages, 20–21 Oct 2026, vs. before the war (26 Feb). Battleground list: Newsweek, 13 Oct 2026. Household figure: ITEP fuel-cost tracker, 16 Oct 2026. Prices change daily.',
    },
  ],
}, t as {dur: number; cues: number[]}[], 'audio/SwingGas.mp3');
