// Episode 1 (long-form, 16:9): "Time does the work". All figures: 7% a year compounded monthly, before fees, tax and inflation.
import {WideRecipe, WScene, WBody} from '../wide';
import d from '../ep1.data.json';
import t from './Ep1.timing.json';

const $ = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

const scenes: WBody[] = [
  {type: 'hook', kicker: 'Two savers · $200 a month', lines: ['One saves for *10 years.*', 'One saves for *30.*'], question: 'Who ends up with more?'},
  {type: 'people', kicker: 'Same $200 a month · 7% a year', footnote: 'Leo puts in *three times as much.*', people: [
    {name: 'Maya', color: 'accent', tag: 'SAVES FROM 25 TO 35', note: '$200 a month for 10 years, then stops.', statLabel: 'PUTS IN', stat: '$24,000'},
    {name: 'Leo', color: 'paper', tag: 'SAVES FROM 35 TO 65', note: '$200 a month for 30 years.', statLabel: 'PUTS IN', stat: '$72,000'},
  ]},
  {type: 'race', kicker: 'Balance by age', xLabel: 'Age', xStart: 25, xEnd: 65, xTicks: [25, 35, 45, 55, 65], yMax: 300000, yTicks: [0, 100000, 200000, 300000], marker: 35,
    series: [{name: 'Maya', color: 'accent', data: d.maya}, {name: 'Leo', color: 'paper', data: d.leo, startAt: 35}],
    notes: [{at: 35, x: 35, yValue: 230000, text: 'Maya stops\nat 35', color: 'accent'}]},
  {type: 'reveal', kicker: 'At 65', punch: 'A third of the work.\n*And she still wins.*', items: [
    {label: 'MAYA · PUT IN $24,000', value: $(d.maya['65']), color: 'accent'},
    {label: 'LEO · PUT IN $72,000', value: $(d.leo['65']), color: 'paper'},
  ]},
  {type: 'hook', kicker: 'Episode 1', lines: ['Time does', '*the work.*'], question: 'Welcome to The Sum of It.'},
  {type: 'race', kicker: 'Doubled daily', xLabel: 'Day', xStart: 0, xEnd: 30, xTicks: [0, 5, 10, 15, 20, 25, 30], yMax: 5600000, yTicks: [0, 1000000, 2000000, 3000000, 4000000, 5000000],
    series: [{name: 'The penny', color: 'accent', data: d.penny, cents: true}, {name: '$1 million today', color: 'muted', data: d.million}],
    notes: [{at: 20, x: 12, yValue: 1000000, dy: -110, text: 'Day 20: the penny is\nworth just $5,242.88'}, {at: 29.6, x: 16.5, yValue: 4700000, text: 'Day 30: $5.37 million.\nHalf of it arrived today.', color: 'accent'}]},
  {type: 'hook', kicker: 'Real life · about 7% a year, with bad years', lines: ['Not daily doubling.', 'But the same shape:\nslow, slow, *then sudden.*'], question: "That's compounding: growth earning growth of its own."},
  {type: 'chapter', n: '1', title: 'Deposits add.\nReturns *multiply.*'},
  {type: 'hook', kicker: 'Why it starts slowly', lines: ['Year one: a small return\non a small pile.', 'Every year after:\na *bigger pile.*']},
  {type: 'race', kicker: '$200 a month', xLabel: 'Year', xStart: 0, xEnd: 40, xTicks: [0, 10, 20, 30, 40], yMax: 550000, yTicks: [0, 100000, 200000, 300000, 400000, 500000], marker: 18,
    series: [{name: 'Balance', color: 'accent', data: d.bal}, {name: 'You put in', color: 'muted', data: d.dep}],
    notes: [{at: 18, x: 18, yValue: 300000, text: 'Year 18: growth\ntakes the lead', color: 'accent'}, {at: 39.5, x: 3, yValue: 470000, text: 'After 40 years: $428,963\nof the $524,963 is growth'}]},
  {type: 'chapter', n: '2', title: 'The most expensive\nhabit: *waiting.*'},
  {type: 'rank', kicker: '$200 a month · 7% · balance at 65', max: 560000, footnote: 'Ten years late: *more than half gone.*', rows: [
    {label: 'Start at 25', value: 524963, display: '$524,963', color: 'accent'},
    {label: 'Wait 1 year', value: 487260, display: '$487,260 (−$37,703)', color: 'paper'},
    {label: 'Wait 5 years', value: 360211, display: '$360,211 (−$164,752)', color: 'paper'},
    {label: 'Wait 10 years', value: 243994, display: '$243,994 (−$280,968)', color: 'alert'},
  ]},
  {type: 'hook', kicker: 'Why waiting costs so much', lines: ['A late start doesn’t cut\nyears from the start.', 'It cuts them *from the end.*'], question: 'And the end is where the biggest years live.'},
  {type: 'chapter', n: '3', title: 'Small amounts,\n*big numbers.*'},
  {type: 'rank', kicker: 'Invested every day for 40 years · 7%', max: 1700000, footnote: '$20 a day: *about the price of a lunch out.*', rows: [
    {label: '$1 a day', value: 79838, display: '$79,838', color: 'muted'},
    {label: '$10 a day', value: 798381, display: '$798,381', color: 'paper'},
    {label: '$20 a day', value: 1596761, display: '$1,596,761', color: 'accent'},
  ]},
  {type: 'reveal', kicker: '$5 a day for 30 years', punch: "Nobody's saying *never buy coffee.*\nJust know what the habit costs.", items: [
    {label: 'SPENT ON COFFEE', value: '$54,750', color: 'muted'},
    {label: 'INVESTED INSTEAD', value: '$185,537', color: 'accent'},
  ]},
  {type: 'chapter', n: '4', title: 'The rate\n*matters too.*'},
  {type: 'reveal', kicker: 'The rule of 72 · years to double', punch: '72 ÷ your yearly return\n= *years to double.*', items: [
    {label: 'AT 4% A YEAR', value: '18 yrs', color: 'muted'},
    {label: 'AT 7%', value: '10 yrs', color: 'paper'},
    {label: 'AT 10%', value: '7 yrs', color: 'accent'},
  ]},
  {type: 'rank', kicker: '$300 a month for 40 years', max: 1100000, footnote: 'One percentage point: *$259,858.*', rows: [
    {label: '7% a year', value: 787444, display: '$787,444', color: 'paper'},
    {label: '8% a year', value: 1047302, display: '$1,047,302', color: 'accent'},
  ]},
  {type: 'rank', kicker: '$300 a month · 30 years · 7% before fees', max: 380000, footnote: 'Fees compound too: *$98,762 gone.*', rows: [
    {label: '2% yearly fee', value: 249678, display: '$249,678', color: 'alert'},
    {label: '0.25% yearly fee', value: 348440, display: '$348,440', color: 'paper'},
  ]},
  {type: 'chapter', n: '5', title: 'What if the market\n*crashes?*'},
  {type: 'reveal', kicker: 'Losses hurt more than gains help', punch: 'The 7% average\n*includes the bad years.*', items: [
    {label: 'IF IT FALLS', value: '−50%', color: 'alert'},
    {label: 'IT MUST THEN RISE', value: '+100%', color: 'accent'},
  ]},
  {type: 'hook', kicker: 'Saving every month', lines: ['When prices fall,', '*your $200 buys more.*'], question: 'Time gives you the runway to recover.'},
  {type: 'chapter', n: '6', title: '*Free* money.', sub: 'The employer match.'},
  {type: 'rank', kicker: 'Earn $50,000 · save 5% · 30 years · 7%', max: 560000, footnote: 'Same effort, *doubled.*', rows: [
    {label: 'Your own savings', value: 254161, display: '$254,161', color: 'paper'},
    {label: 'With the match', value: 508321, display: '$508,321', color: 'accent'},
  ]},
  {type: 'chapter', n: '7', title: 'The million-dollar\n*question.*'},
  {type: 'people', kicker: '$1 million by 65 · 7% a year', footnote: 'Every ten years you wait *more than doubles* the bill.', people: [
    {name: 'Start at 25', color: 'accent', tag: 'PUTS IN $182,880', note: 'For 40 years.', statLabel: 'EACH MONTH', stat: '$381'},
    {name: 'Start at 35', color: 'paper', tag: 'PUTS IN $295,200', note: 'For 30 years.', statLabel: 'EACH MONTH', stat: '$820'},
    {name: 'Start at 45', color: 'alert', tag: 'PUTS IN $460,800', note: 'For 20 years.', statLabel: 'EACH MONTH', stat: '$1,920'},
  ]},
  {type: 'hook', kicker: 'Started late?', lines: ['Reading this at 40, or 50?', 'The best time was *yesterday.*\nThe second best is *today.*']},
  {type: 'list', kicker: 'Three things to take away', items: ['Deposits add. Returns *multiply.*', 'Waiting removes your *biggest* years.', 'Small amounts, low fees, *a long runway.*']},
  {type: 'outro', lines: 'Time does the work.\n*That’s the sum of it.*',
    disclaimer: 'Every figure is calculated: 7% a year, compounded monthly, before fees, tax and inflation unless stated.\nAn illustration, not financial advice. Real returns vary, and markets fall as well as rise.'},
];

export const ep1: WideRecipe = {
  id: 'Ep1', audio: 'audio/Ep1.mp3', series: 'Episode 1 · Time does the work',
  scenes: scenes.map((s, i) => ({...s, ...(t as {dur: number; cues: number[]}[])[i]}) as WScene),
};
