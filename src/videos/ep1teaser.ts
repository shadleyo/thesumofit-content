// TikTok teaser for Episode 1: the cost of waiting (audio cut from the episode + a short pointer to YouTube).
import {Recipe} from '../template';
import t from './Ep1Teaser.timing.json';

const timed = (r: Recipe, tt: {dur: number; cues: number[]}[], audio: string): Recipe => ({...r, audio, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});

export const ep1Teaser: Recipe = timed({
  id: 'Ep1Teaser',
  channel: 'THE SUM OF IT',
  thumb: {kicker: '$200 A MONTH · 7% A YEAR', from: 'Wait 10 years', link: 'and lose', to: '$280,968', foot: 'more than half of what you could have had'},
  scenes: [
    {type: 'hook', dur: 120, kicker: 'From Episode 1', lines: ['The most expensive', 'habit: *waiting.*']},
    {type: 'rank', dur: 600, kicker: '$200 a month · 7% · at 65', max: 560000, footnote: 'Ten years late:\n*more than half gone.*', rows: [
      {label: 'Start at 25', value: 524963, display: '$524,963', color: 'accent'},
      {label: 'Wait 1 year', value: 487260, display: '$487,260', color: 'paper'},
      {label: 'Wait 5 years', value: 360211, display: '$360,211', color: 'paper'},
      {label: 'Wait 10 years', value: 243994, display: '$243,994', color: 'alert'},
    ]},
    {type: 'hook', dur: 300, kicker: 'Why it costs so much', lines: ['A late start cuts years', '*from the end.*'], question: 'And the end is where the biggest years live.'},
    {type: 'outro', dur: 200, lines: 'The full episode:\n*Time does the work.*', disclaimer: 'On YouTube: The Sum of It.\n7% a year, compounded monthly, before fees, tax and inflation. Illustration only, not financial advice.'},
  ],
}, t as {dur: number; cues: number[]}[], 'audio/Ep1Teaser.mp3');
