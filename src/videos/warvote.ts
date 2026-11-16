// "49 to 50": the Senate war powers votes. Iran war series.
// Sources: ABC News / Carolina Political Review (24 Sep 2026: 49-50, Alsobrooks not voting; 14 Senate votes, passed once);
// Al Jazeera 24 Jun 2026 (Senate 50-48 on 23 Jun; House 215-208 on 3 Jun; "largely symbolic");
// Al Jazeera 23 Jul 2026 (House 214-208; Senate 47-49; June measure was a concurrent resolution, not sent to the president).
import {Recipe} from '../template';
import t from './WarVote.timing.json';

const timed = (r: Recipe, tt: {dur: number; cues: number[]}[], audio: string): Recipe => ({...r, audio, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});

export const warVote: Recipe = timed({
  id: 'WarVote',
  channel: 'THE SUM OF IT',
  thumb: {kicker: 'SENATE VOTE TO END THE IRAN WAR', from: 'Yes 49', link: 'vs', to: 'No 50', foot: 'One senator did not vote'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'War powers · 24 September', lines: ['*49 to 50.*', 'That close.'], question: "On ending America's part in the Iran war."},
    {
      type: 'reveal', dur: 200, kicker: 'Senate votes since 28 Feb',
      items: [
        {label: 'TIMES THE SENATE VOTED', value: '14', color: 'paper'},
        {label: 'TIMES IT FAILED', value: '13', color: 'alert'},
      ],
      punch: 'Since the war\nbegan.',
    },
    {
      type: 'people', dur: 330, kicker: 'The one that passed · June', footnote: 'A concurrent resolution: it never goes to the president.',
      people: [
        {name: 'Senate', color: 'accent', tag: '23 JUNE · PASSED', note: 'Yes 50 · No 48', statLabel: 'MARGIN', stat: '2'},
        {name: 'House', color: 'accent', tag: '3 JUNE · PASSED', note: 'Yes 215 · No 208', statLabel: 'MARGIN', stat: '7'},
        {name: 'Experts', color: 'muted', tag: 'THE VERDICT', note: '“Largely symbolic”', statLabel: 'BINDING', stat: 'No'},
      ],
    },
    {
      type: 'rank', dur: 330, kicker: 'After the ceasefire · % voting yes', max: 60,
      rows: [
        {label: 'July · House', value: 214 / 422 * 100, display: '214–208', color: 'accent'},
        {label: 'July · Senate', value: 47 / 96 * 100, display: '47–49', color: 'muted'},
        {label: 'Sept · Senate', value: 49 / 99 * 100, display: '49–50', color: 'alert'},
      ],
      footnote: 'The Senate fell *one vote* short.',
    },
    {
      type: 'outro', dur: 150, lines: 'Fourteen votes.\n*The closest came down to one.*',
      disclaimer: 'Senate war powers votes, 2026: 50–48 (23 Jun), 47–49 (23 Jul), 49–50 (24 Sep). House: 215–208 (3 Jun), 214–208 (23 Jul). Sources: ABC News, Al Jazeera, Carolina Political Review.',
    },
  ],
}, t as {dur: number; cues: number[]}[], 'audio/WarVote.mp3');
