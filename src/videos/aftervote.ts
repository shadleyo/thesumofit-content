// "After 3 November": what EIA forecasts for fuel. Iran war series.
// Sources: EIA STEO / Winter Fuels Outlook press release, 6 Oct 2026 (Brent 4Q26 $105; gasoline 2027 $3.56; diesel >$6 Oct, ~$4.50 2027; heating oil homes +21%);
// Brent pre-war close $72.48 (27 Feb); AAA national 21 Oct 2026: regular $4.26, diesel $6.32; pre-war EIA weekly: gas $2.98, diesel $3.76.
import {Recipe} from '../template';
import t from './AfterVote.timing.json';

const timed = (r: Recipe, tt: {dur: number; cues: number[]}[], audio: string): Recipe => ({...r, audio, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});

export const afterVote: Recipe = timed({
  id: 'AfterVote',
  channel: 'THE SUM OF IT',
  thumb: {kicker: 'GAS AFTER THE MIDTERMS', from: 'Gas in 2027', link: 'forecast', to: '$3.56', foot: 'vs $2.98 before the war · EIA'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'After 3 November', lines: ['The vote ends.', '*The bill doesn’t.*'], question: 'What government forecasters expect next.'},
    {
      type: 'reveal', dur: 270, kicker: 'Brent oil · per barrel',
      items: [
        {label: 'BEFORE THE WAR · 27 FEB', value: '$72', color: 'muted'},
        {label: 'EIA FORECAST · OCT–DEC 2026', value: '$105', color: 'alert'},
      ],
      punch: 'Forecast by the\n*U.S. government.*',
    },
    {
      type: 'rank', dur: 330, kicker: 'Regular gas · per gallon', max: 4.6,
      rows: [
        {label: 'Before the war', value: 2.98, display: '$2.98', color: 'muted'},
        {label: 'Today', value: 4.26, display: '$4.26', color: 'alert'},
        {label: '2027 forecast', value: 3.56, display: '$3.56', color: 'accent'},
      ],
      footnote: 'Lower, but *still above* where it started.',
    },
    {
      type: 'people', dur: 330, kicker: 'Diesel and heating oil', footnote: 'EIA forecasts, October 2026.',
      people: [
        {name: 'Diesel', color: 'alert', tag: 'TODAY $6.32 A GALLON', note: '2027 forecast: about $4.50', statLabel: 'BEFORE THE WAR', stat: '$3.76'},
        {name: 'Heating oil', color: 'accent', tag: 'MOSTLY THE NORTHEAST', note: 'Paid by homes this winter', statLabel: 'VS LAST WINTER', stat: '+21%'},
      ],
    },
    {
      type: 'outro', dur: 150, lines: 'Prices may fall.\n*Not all the way back.*',
      disclaimer: 'EIA Short-Term Energy Outlook and Winter Fuels Outlook, 6 Oct 2026. Brent pre-war close 27 Feb 2026. AAA national averages 21 Oct 2026; pre-war gas and diesel: EIA weekly averages. Forecasts can change.',
    },
  ],
}, t as {dur: number; cues: number[]}[], 'audio/AfterVote.mp3');
