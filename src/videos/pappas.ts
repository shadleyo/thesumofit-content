// "First openly gay man elected to the Senate". 4 Nov 2026.
// Sources: AP call (via NHPR, 3 Nov 2026: Pappas defeats Sununu "according to the Associated Press"; "tens of millions" outside spending);
// CBS News / NBC News results pages; Senate.gov (about 2,000 senators since 1789); Baldwin (2012) and Sinema (2018) elected as openly LGBTQ senators.
import {Recipe} from '../template';
import t from './Pappas.timing.json';

const timed = (r: Recipe, tt: {dur: number; cues: number[]}[], audio: string): Recipe => ({...r, audio, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});

export const pappas: Recipe = timed({
  id: 'Pappas',
  channel: 'THE SUM OF IT',
  thumb: {kicker: 'US SENATE · AP CALL', from: 'Openly gay men', link: 'elected to the Senate:', to: '0 → 1', foot: 'Chris Pappas, New Hampshire'},
  scenes: [
    {type: 'hook', dur: 120, kicker: 'US midterms · AP call', lines: ['An openly gay man,', '*elected to the Senate.*']},
    {type: 'reveal', dur: 200, kicker: 'New Hampshire · US Senate', punch: 'Democrat Chris Pappas\n*defeats Republican John Sununu.*', items: [
      {label: 'AP CALL', value: 'Pappas', color: 'accent'},
    ]},
    {type: 'reveal', dur: 200, kicker: 'The US Senate since 1789', punch: '*Before tonight.*', items: [
      {label: 'PEOPLE WHO HAVE SERVED', value: '~2,000', color: 'paper'},
      {label: 'OPENLY LGBTQ, EVER ELECTED', value: '2', color: 'accent'},
    ]},
    {type: 'people', dur: 300, kicker: 'Openly LGBTQ senators, elected', footnote: 'Pappas: the first openly gay man.', people: [
      {name: 'Baldwin', color: 'paper', tag: 'WISCONSIN · D', note: 'First openly LGBTQ senator.', statLabel: 'ELECTED', stat: '2012'},
      {name: 'Sinema', color: 'paper', tag: 'ARIZONA · D', note: 'First openly bisexual senator.', statLabel: 'ELECTED', stat: '2018'},
      {name: 'Pappas', color: 'accent', tag: 'NEW HAMPSHIRE · D', note: 'First openly gay man.', statLabel: 'ELECTED', stat: '2026'},
    ]},
    {type: 'hook', dur: 150, kicker: 'One of the year’s marquee races', lines: ['Tens of millions', '*in outside spending.*']},
    {type: 'outro', dur: 150, lines: 'One seat.\n*One first.*',
      disclaimer: 'Race call: Associated Press, 3 Nov 2026. Senators since 1789: Senate.gov. Figures only; no endorsement.'},
  ],
}, t as {dur: number; cues: number[]}[], 'audio/Pappas.mp3');
