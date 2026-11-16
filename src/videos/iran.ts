// "What the Iran war has cost the average American" — figures as of mid-October 2026.
// Sources: EIA weekly retail prices; AAA (via AP, 17 Oct 2026); Moody's Analytics / Mark Zandi (via AP, Oct 2026);
// ITEP Iran War Fuel Cost tracker (16 Oct 2026); Pentagon estimate to 3 Sep 2026 (CQ Roll Call, 18 Sep 2026); IATA; BLS CPI.
import {Recipe} from '../template';
import d from '../iran.data.json';
import t from './IranWar.timing.json';

const timed = (r: Recipe, tt: {dur: number; cues: number[]}[], audio: string): Recipe => ({...r, audio, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});

export const iranWar: Recipe = timed({
  id: 'IranWar',
  channel: 'THE SUM OF IT',
  thumb: {kicker: 'THE IRAN WAR, PER HOUSEHOLD', from: '7 months', link: 'has cost', to: '$2,000', foot: 'and rising ~$50 a week'},
  scenes: [
    {type: 'hook', dur: 150, kicker: 'Seven months of war', lines: ['*$2,000.*', 'Per American\nhousehold.'], question: "Here's where it went."},
    {
      type: 'race', dur: 420, kicker: 'At the pump · $ per gallon', xLabel: '2026', xStart: 0, xEnd: 40, xTicks: [0, 8, 17, 26, 35],
      xTickLabels: {'0': 'JAN', '8': 'MAR', '17': 'MAY', '26': 'JUL', '35': 'SEP'}, cents: true,
      yMax: 7.5, yTicks: [0, 2, 4, 6], marker: 7.7,
      series: [
        {name: 'Gasoline', color: 'accent', data: d.gas},
        {name: 'Diesel', color: 'paper', data: d.diesel},
      ],
      notes: [
        {at: 8, text: 'War begins\n28 Feb', x: 0.5, yValue: 7.4, color: 'muted'},
        {at: 37, text: 'Diesel record\n$6.53, September', x: 17, yValue: 7.4, color: 'paper'},
      ],
    },
    {
      type: 'people', dur: 300, kicker: 'Before the war → now', footnote: 'Airfares: up 22% on a year ago.',
      people: [
        {name: 'Gasoline', color: 'accent', tag: 'UP 45%', note: '$2.98 a gallon before the war.', statLabel: 'NOW', stat: '$4.33'},
        {name: 'Diesel', color: 'paper', tag: 'UP 68%', note: '$3.76 a gallon before the war.', statLabel: 'NOW', stat: '$6.33'},
        {name: 'Jet fuel', color: 'alert', tag: 'NEARLY DOUBLED', note: '$99 a barrel before the war.', statLabel: 'SEPTEMBER', stat: '~$195'},
      ],
    },
    {
      type: 'reveal', dur: 300, kicker: 'Cost per household · Moody\'s',
      items: [
        {label: 'ENERGY', value: '$1,100', color: 'accent'},
        {label: 'HIGHER INTEREST RATES', value: '$540', color: 'paper'},
        {label: 'THE MILITARY CAMPAIGN', value: '$360', color: 'alert'},
      ],
      punch: 'And it grows\n*~$50 every week.*',
    },
    {
      type: 'bars', dur: 270, kicker: 'Who has paid more?', title: 'At the pump:\n*$116 billion.*', max: 125,
      bars: [
        {label: 'Drivers', color: 'accent', base: 0, extra: d.pump_extra_bn, caption: '$116.3bn extra on gas + diesel, to 16 Oct'},
        {label: 'Pentagon', color: 'paper', base: 0, extra: d.pentagon_bn, caption: '$43.6bn official war cost, to 3 Sep'},
      ],
      body: 'The pump bill is\n*more than double.*',
    },
    {
      type: 'outro', dur: 150, lines: 'The war is fought\nfar away.\n*The bill comes home.*',
      disclaimer: 'Figures as of mid-October 2026. Sources: EIA & AAA prices, Moody\'s Analytics (Mark Zandi), ITEP fuel-cost tracker, Pentagon estimate via CQ Roll Call, IATA, BLS. Estimates vary between sources.',
    },
  ],
}, t as {dur: number; cues: number[]}[], 'audio/IranWar.mp3');
