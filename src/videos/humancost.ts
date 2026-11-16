// "The cost no budget covers": deaths in the 2026 Iran war. Iran war series.
// Sources: Pentagon via Washington Post / The New Arab, 11 Oct 2026 (21 killed, 865 wounded);
// HRANA via Wikipedia "Casualties of the 2026 Iran war" (3,684 killed; 1,701 civilians and 254+ children as of 7 Apr, +20 civilians 8-17 Jul);
// Lebanese Health Ministry 4,383 (Sep 2026); Israel 72 (5 Aug); Gulf states ~50 (UAE 16, Oman 16, Kuwait 12, Saudi 3, Bahrain 2, Qatar 1). Sources and dates differ.
import {Recipe} from '../template';
import t from './HumanCost.timing.json';

const timed = (r: Recipe, tt: {dur: number; cues: number[]}[], audio: string): Recipe => ({...r, audio, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});

export const humanCost: Recipe = timed({
  id: 'HumanCost',
  channel: 'THE SUM OF IT',
  thumb: {kicker: 'THE IRAN WAR, IN NUMBERS', from: 'Lives lost', link: 'since 28 February', to: '8,000+', foot: 'The cost no budget covers'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'The Iran war, in numbers', lines: ['The cost', '*no budget covers.*'], question: 'Lives lost since 28 February.'},
    {
      type: 'reveal', dur: 240, kicker: 'U.S. service members · Pentagon',
      items: [
        {label: 'KILLED', value: '21', color: 'alert'},
        {label: 'WOUNDED', value: '865', color: 'paper'},
      ],
      punch: 'As of\n*October 2026.*',
    },
    {
      type: 'reveal', dur: 270, kicker: 'Iran · HRANA count',
      items: [
        {label: 'KILLED', value: '3,600+', color: 'paper'},
        {label: 'CIVILIANS', value: '1,700+', color: 'alert'},
      ],
      punch: 'At least *250*\nwere children.',
    },
    {
      type: 'rank', dur: 330, kicker: 'Killed, by country', max: 4500,
      rows: [
        {label: 'Lebanon', value: 4383, display: '4,383', color: 'paper'},
        {label: 'Iran', value: 3684, display: '3,684', color: 'paper'},
        {label: 'Israel', value: 72, display: '72', color: 'muted'},
        {label: 'Gulf states', value: 50, display: '~50', color: 'muted'},
        {label: 'United States', value: 21, display: '21', color: 'muted'},
      ],
      footnote: '*More than 8,000* people.',
    },
    {
      type: 'outro', dur: 180, lines: 'Budgets can be repaid.\n*This part never is.*',
      disclaimer: 'U.S.: Pentagon, Oct 2026. Iran: HRANA (civilian and child counts as of April, plus later reports). Lebanon: Health Ministry, Sep 2026. Israel: 5 Aug 2026. Gulf: UAE, Oman, Kuwait, Saudi Arabia, Bahrain, Qatar. Sources and dates differ.',
    },
  ],
}, t as {dur: number; cues: number[]}[], 'audio/HumanCost.mp3');
