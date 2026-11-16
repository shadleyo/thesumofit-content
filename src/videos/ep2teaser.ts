// TikTok/Shorts teaser for Episode 2: the cold open (audio cut from the episode + a pointer to YouTube).
import {Recipe} from '../template';
import d from '../ep2.data.json';
import t from './Ep2Teaser.timing.json';

const timed = (r: Recipe, tt: {dur: number; cues: number[]}[], audio: string): Recipe => ({...r, audio, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});

export const ep2Teaser: Recipe = timed({
  id: 'Ep2Teaser',
  channel: 'THE SUM OF IT',
  thumb: {kicker: '$5,000 · 22% CREDIT CARD', from: 'Paying the minimum', link: 'takes 19 years and costs', to: '$8,100', foot: 'in interest. A fixed $150: $2,798'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'From Episode 2 · $5,000 at 22%', lines: ['Two people.', '*Same debt.*']},
    {type: 'people', dur: 300, kicker: 'Same $5,000 · 22% a year', footnote: 'Almost the same start.', people: [
      {name: 'Sam', color: 'alert', tag: 'PAYS THE MINIMUM', note: 'Interest plus 1% of the balance.', statLabel: 'FIRST PAYMENT', stat: '$142'},
      {name: 'Jo', color: 'accent', tag: 'PAYS A FIXED $150', note: 'The same $150 every month.', statLabel: 'FIRST PAYMENT', stat: '$150'},
    ]},
    {type: 'race', dur: 350, kicker: 'Balance left', xLabel: 'YEARS', xStart: 0, xEnd: 20, xTicks: [0, 5, 10, 15, 20], yMax: 5000, yTicks: [0, 1000, 2000, 3000, 4000, 5000],
      series: [{name: 'Sam · minimum', color: 'alert', data: d.min.hist}, {name: 'Jo · fixed $150', color: 'accent', data: d.f150.hist}]},
    {type: 'reveal', dur: 250, kicker: 'Interest paid', punch: '15 years and\n*$5,302 apart.*', items: [
      {label: 'JO · FIXED $150', value: '$2,798', color: 'accent'},
      {label: 'SAM · MINIMUM', value: '$8,100', color: 'alert'},
    ]},
    {type: 'outro', dur: 250, lines: 'The full episode:\n*Interest works both ways.*', disclaimer: 'On YouTube: The Sum of It.\nMinimum = month’s interest + 1% of balance. Illustration only, not financial advice.'},
  ],
}, t as {dur: number; cues: number[]}[], 'audio/Ep2Teaser.mp3');
