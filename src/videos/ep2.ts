// Episode 2 (long-form, 16:9): "Interest works both ways". Figures from calc/ep2.py -> src/ep2.data.json.
// Minimum payment = month's interest + 1% of balance (min $25). Illustrations, not advice.
import {WideRecipe, WScene, WBody} from '../wide';
import d from '../ep2.data.json';
import t from './Ep2.timing.json';

const scenes: WBody[] = [
  {type: 'hook', kicker: '$5,000 · 22% credit card', lines: ['Two people.', '*Same debt.*']},
  {type: 'people', kicker: 'Same $5,000 · 22% a year', footnote: 'Almost the *same start.*', people: [
    {name: 'Sam', color: 'alert', tag: 'PAYS THE MINIMUM', note: 'Interest plus 1% of the balance.', statLabel: 'FIRST PAYMENT', stat: '$142'},
    {name: 'Jo', color: 'accent', tag: 'PAYS A FIXED $150', note: 'The same $150, every month.', statLabel: 'FIRST PAYMENT', stat: '$150'},
  ]},
  {type: 'race', kicker: 'Balance left', xLabel: 'Years', xStart: 0, xEnd: 20, xTicks: [0, 5, 10, 15, 20], yMax: 5000, yTicks: [0, 1000, 2000, 3000, 4000, 5000],
    series: [{name: 'Sam · minimum', color: 'alert', data: d.min.hist}, {name: 'Jo · fixed $150', color: 'accent', data: d.f150.hist}],
    notes: [{at: 5, x: 5.5, yValue: 4300, text: 'Jo: debt-free in\n4 years 4 months', color: 'accent'}, {at: 19.5, x: 11, yValue: 2600, text: 'Sam: 19 years', color: 'alert'}]},
  {type: 'reveal', kicker: 'Interest paid', punch: '15 years and *$5,302* apart.', items: [
    {label: 'JO · FIXED $150', value: '$2,798', color: 'accent'},
    {label: 'SAM · MINIMUM', value: '$8,100', color: 'alert'},
  ]},
  {type: 'hook', kicker: 'Episode 2', lines: ['Interest works', '*both ways.*'], question: 'Welcome to The Sum of It.'},
  {type: 'chapter', n: '1', title: 'The same maths,\n*pointed at you.*'},
  {type: 'hook', kicker: 'Episode 1, in reverse', lines: ['Savings: interest\n*works for you.*', 'Debt: the same maths,\n*working against you.*']},
  {type: 'reveal', kicker: '$5,000 at 22% a year', punch: 'Pay less than that,\n*and the debt grows.*', items: [
    {label: 'INTEREST IN ONE MONTH', value: '$91.67', color: 'alert'},
  ]},
  {type: 'race', kicker: 'If you stop paying', xLabel: 'Years', xStart: 0, xEnd: 5, xTicks: [0, 1, 2, 3, 4, 5], yMax: 16000, yTicks: [0, 4000, 8000, 12000, 16000],
    series: [{name: 'Balance', color: 'alert', data: d.stop}],
    notes: [{at: 2, x: 0.3, yValue: 11000, text: 'Year 2: $7,733'}, {at: 4.9, x: 0.3, yValue: 14500, text: 'Year 5: $14,872.\nNearly triple.', color: 'alert'}]},
  {type: 'chapter', n: '2', title: 'The minimum\n*payment trap.*'},
  {type: 'reveal', kicker: 'A common minimum payment', punch: 'The month’s interest,\n*plus 1% of the balance.*', items: [
    {label: 'FIRST PAYMENT ON $5,000', value: '$142', color: 'paper'},
  ]},
  {type: 'hook', kicker: 'Why it takes 19 years', lines: ['The balance falls,', '*so the minimum falls.*'], question: 'It keeps you current. It doesn’t get you out.'},
  {type: 'chapter', n: '3', title: 'Fix\n*the payment.*'},
  {type: 'hook', kicker: 'The simplest move', lines: ['Pick a fixed amount.', '*Keep paying it.*']},
  {type: 'rank', kicker: '$5,000 at 22% · interest paid', max: 8600, footnote: 'Every extra dollar *goes straight to the balance.*', rows: [
    {label: 'Minimum', value: 8100, display: '$8,100 · 19 yrs', color: 'alert'},
    {label: '$150 a month', value: 2798, display: '$2,798 · 4 yrs 4 mths', color: 'paper'},
    {label: '$250 a month', value: 1286, display: '$1,286 · 2 yrs 2 mths', color: 'paper'},
    {label: '$500 a month', value: 574, display: '$574 · 1 yr', color: 'accent'},
  ]},
  {type: 'chapter', n: '4', title: 'Not all debt\n*costs the same.*'},
  {type: 'rank', kicker: 'Borrow $1,000 for a year', max: 320, footnote: 'The rate is *the price of the money.*', rows: [
    {label: '7% car loan', value: 70, display: '$70', color: 'paper'},
    {label: '22% credit card', value: 220, display: '$220', color: 'paper'},
    {label: '29% store card', value: 290, display: '$290', color: 'alert'},
  ]},
  {type: 'reveal', kicker: 'The 0% offer · free only if you clear it in time', punch: 'Mark the end date.\n*Divide by the months left.*', items: [
    {label: 'STILL OWED WHEN IT ENDS', value: '$3,000', color: 'paper'},
    {label: 'NEXT YEAR AT 22%', value: '+$731', color: 'alert'},
  ]},
  {type: 'chapter', n: '5', title: 'Which debt\n*first?*'},
  {type: 'people', kicker: 'Three debts', footnote: 'Minimums: *$335 a month.*', people: [
    {name: 'Card A', color: 'alert', tag: '22% A YEAR', note: 'Minimum $90 a month.', statLabel: 'OWED', stat: '$3,000'},
    {name: 'Card B', color: 'paper', tag: '18% A YEAR', note: 'Minimum $45 a month.', statLabel: 'OWED', stat: '$1,500'},
    {name: 'Car loan', color: 'paper', tag: '7% A YEAR', note: 'Minimum $200 a month.', statLabel: 'OWED', stat: '$8,000'},
  ]},
  {type: 'reveal', kicker: 'Minimums only', punch: 'Now add *$300 a month.*', items: [
    {label: 'TIME TO CLEAR', value: '52 months', color: 'paper'},
    {label: 'INTEREST', value: '$3,410', color: 'alert'},
  ]},
  {type: 'people', kicker: '$635 a month · one debt at a time', footnote: 'Both: debt-free in *22 months.*', people: [
    {name: 'Avalanche', color: 'accent', tag: 'HIGHEST RATE FIRST', note: 'First debt gone in 9 months.', statLabel: 'INTEREST', stat: '$1,163'},
    {name: 'Snowball', color: 'paper', tag: 'SMALLEST BALANCE FIRST', note: 'First debt gone in 5 months.', statLabel: 'INTEREST', stat: '$1,203'},
  ]},
  {type: 'hook', kicker: 'Either way', lines: ['Avalanche: *costs less.*', 'Snowball: *an early win.*'], question: 'Both beat the minimums by over $2,000.'},
  {type: 'chapter', n: '6', title: 'Pay it off,\n*or invest?*'},
  {type: 'reveal', kicker: 'A guaranteed return', punch: 'One is guaranteed.\n*One isn’t.*', items: [
    {label: 'CLEAR A 22% DEBT', value: '22%', color: 'accent'},
    {label: 'EPISODE 1’S ASSUMED RETURN', value: '7%', color: 'paper'},
  ]},
  {type: 'hook', kicker: 'But first', lines: ['Keep a small', '*emergency fund.*'], question: 'So the next surprise doesn’t go back on the card.'},
  {type: 'chapter', n: '7', title: 'Three things\n*to take away.*'},
  {type: 'list', kicker: 'Three things to take away', items: ['Pay a *fixed amount*, not the minimum.', 'Highest rate first saves *the most.*', 'Every debt cleared is a *guaranteed return.*']},
  {type: 'outro', lines: 'Interest works both ways.\n*Make it work for you.*',
    disclaimer: 'Every figure is calculated. Minimum payment: the month’s interest plus 1% of the balance (min $25).\nAn illustration, not financial advice. Real card terms, rates and fees vary.'},
];

export const ep2: WideRecipe = {
  id: 'Ep2', audio: 'audio/Ep2.mp3', series: 'Episode 2 · Interest works both ways',
  scenes: scenes.map((s, i) => ({...s, ...(t as {dur: number; cues: number[]}[])[i]}) as WScene),
};
