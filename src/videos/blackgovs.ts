// "Three elected Black governors at once". 4 Nov 2026.
// Sources: AP calls (FL, GA, MD governor, 3-4 Nov 2026); NBC News "Tuesday's elections bring historic first for Black governors";
// CBS Miami (Donalds: first Black Republican governor in US history); AP/PBS Aug 2026 (only 3 Black governors ever elected: Wilder 1989, Patrick 2006, Moore 2022).
import {Recipe} from '../template';
import t from './BlackGovs.timing.json';

const timed = (r: Recipe, tt: {dur: number; cues: number[]}[], audio: string): Recipe => ({...r, audio, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});

export const blackGovs: Recipe = timed({
  id: 'BlackGovs',
  channel: 'THE SUM OF IT',
  thumb: {kicker: 'US GOVERNORS · AP CALLS', from: 'Elected Black governors', link: 'serving together, ever:', to: '0 → 3', foot: 'Maryland, Florida and Georgia'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'US midterms · AP calls', lines: ['Three elected Black governors,', '*serving at the same time.*'], question: 'A first in American history.'},
    {type: 'people', dur: 400, kicker: 'Black governors ever elected · before this week', footnote: 'None of them served together.', people: [
      {name: 'Wilder', color: 'paper', tag: 'VIRGINIA · D', note: 'The first, in 1989.', statLabel: 'ELECTED', stat: '1989'},
      {name: 'Patrick', color: 'paper', tag: 'MASSACHUSETTS · D', note: 'Two terms.', statLabel: 'ELECTED', stat: '2006'},
      {name: 'Moore', color: 'paper', tag: 'MARYLAND · D', note: 'Elected in 2022.', statLabel: 'ELECTED', stat: '2022'},
    ]},
    {type: 'people', dur: 450, kicker: 'Elected this week · AP calls', footnote: 'Bottoms: the first Black woman ever elected governor.', people: [
      {name: 'Moore', color: 'paper', tag: 'MARYLAND · D', note: 'Wins a second term.', statLabel: 'STATE', stat: 'MD'},
      {name: 'Donalds', color: 'alert', tag: 'FLORIDA · R', note: 'First Black Republican governor.', statLabel: 'STATE', stat: 'FL'},
      {name: 'Bottoms', color: 'accent', tag: 'GEORGIA · D', note: 'First Black woman elected governor.', statLabel: 'STATE', stat: 'GA'},
    ]},
    {type: 'outro', dur: 150, lines: 'Two parties. Three states.\n*One first.*',
      disclaimer: 'Race calls: Associated Press, 3–4 Nov 2026. History: AP, NBC News, CBS News. Figures only; no endorsement.'},
  ],
}, t as {dur: number; cues: number[]}[], 'audio/BlackGovs.mp3');
