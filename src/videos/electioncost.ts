// "The most expensive midterm ever" — 2026 US midterms, posted on election night.
// Sources: AdImpact via CBC/Newscord 29 Oct 2026 ($11.6bn 2026 projection; $8.9bn 2022; $11.2bn 2024 cycle, also Axios);
// KSAT/AdImpact 3 Nov 2026 (Texas Senate ads $573.2m, as of 30 Oct); Al Jazeera 1 Nov 2026 (Talarico $146m, Paxton ~$22m raised;
// outside groups ~$300m for Paxton, ~$80m for Talarico; donors via Politico: Musk $446m, Uihleins ~$150m, Bloomberg $84.2m+$36m, Yass $110m, Soros ~$102m);
// households: 134.8m (Census/FRED 2025).
import {Recipe} from '../template';
import t from './ElectionCost.timing.json';

const timed = (r: Recipe, tt: {dur: number; cues: number[]}[], audio: string): Recipe => ({...r, audio, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});

export const electionCost: Recipe = timed({
  id: 'ElectionCost',
  channel: 'THE SUM OF IT',
  thumb: {kicker: 'US MIDTERMS · AD SPENDING', from: 'Most expensive', link: 'midterm ever', to: '$11.6bn', foot: 'more than the 2024 presidential cycle'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'US midterms · 3 November', lines: ['*$11.6 billion*', 'on election ads.'], question: 'The most expensive midterm ever.'},
    {type: 'rank', dur: 300, kicker: 'Political ad spending · AdImpact', max: 12, footnote: 'A midterm outspending\n*a presidential cycle.*', rows: [
      {label: '2022 midterms', value: 8.9, display: '$8.9bn', color: 'muted'},
      {label: '2024 cycle', value: 11.2, display: '$11.2bn', color: 'paper'},
      {label: '2026 midterms', value: 11.6, display: '$11.6bn', color: 'accent'},
    ]},
    {type: 'reveal', dur: 200, kicker: 'Split across every US household', punch: 'On ads alone.', items: [
      {label: 'PER HOUSEHOLD', value: '$86', color: 'accent'},
    ]},
    {type: 'reveal', dur: 260, kicker: 'Texas Senate · ad spending', punch: 'The costliest race ever\n*for any office but president.*', items: [
      {label: 'PAXTON VS TALARICO', value: '$573m', color: 'accent'},
    ]},
    {type: 'people', dur: 400, kicker: 'Texas · where the money came from', footnote: 'Candidate fundraising vs outside groups.', people: [
      {name: 'Talarico', color: 'paper', tag: 'DEMOCRAT', note: 'Outside groups for him: ~$80m', statLabel: 'RAISED FROM DONORS', stat: '$146m'},
      {name: 'Paxton', color: 'accent', tag: 'REPUBLICAN', note: 'Outside groups for him: ~$300m', statLabel: 'RAISED FROM DONORS', stat: '$22m'},
    ]},
    {type: 'rank', dur: 400, kicker: 'Biggest donors · 2026', max: 470, footnote: 'Red: Republican-aligned.\nBlue: Democratic.', rows: [
      {label: 'Elon Musk', value: 446, display: '$446m', color: 'accent'},
      {label: 'The Uihleins', value: 150, display: '~$150m', color: 'accent'},
      {label: 'M. Bloomberg', value: 120, display: '$120m', color: 'paper'},
      {label: 'The Yasses', value: 110, display: '$110m', color: 'accent'},
      {label: 'George Soros', value: 102, display: '~$102m', color: 'paper'},
    ]},
    {type: 'outro', dur: 150, lines: 'Tonight, votes decide it.\n*The bill is already in.*',
      disclaimer: 'Ad spending: AdImpact (2026 projection, 29 Oct; Texas as of 30 Oct). Fundraising and donors: FEC filings and Politico, via Al Jazeera, 1 Nov 2026. Per household: 134.8m US households. Figures only; no endorsement.'},
  ],
}, t as {dur: number; cues: number[]}[], 'audio/ElectionCost.mp3');
