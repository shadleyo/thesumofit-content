// Sport, by the numbers: "Sandpapergate" reignites, Nov 2026. Khawaja's memoir ("Sabr", 9 Nov) says the
// whole squad knew; Cummins denies it at a press conference (13 Nov, "100% wrong", "utter nonsense"); Warner
// backs Khawaja (Instagram/Kayo, 14 Nov, "stinks of a cover-up"); Cricket Australia stands by its 2018
// findings; a statement reported 18 Nov and attributed to Bancroft says the entire team knew.
// House rule override (user, 20 Nov 2026): this sub-series normally carries no accusations about players.
// Overridden for this one video on the user's explicit instruction. Every claim below is attributed to the
// person who made it — none are stated as settled fact. Sources: Daily Maverick, The Nightly, EWN, 13-18 Nov 2026
// (see research/sandpapergate-sources.md). 2018 bans are Cricket Australia's own, undisputed findings.
import {Recipe} from '../template';
import t from './Sandpapergate.timing.json';

type T = {dur: number; cues: number[]}[];
const timed = (r: Recipe, tt: T): Recipe => ({...r, audio: `audio/${r.id}.mp3`, scenes: r.scenes.map((s, i) => ({...s, ...tt[i]}))});
const CH = 'THE SUM OF IT';

export const sandpapergate = timed({
  id: 'Sandpapergate', channel: CH,
  thumb: {kicker: 'SANDPAPERGATE · 2026', from: "Khawaja says the whole squad knew.", link: 'Cummins says', to: '"Utter nonsense"', foot: 'every claim, attributed'},
  scenes: [
    {type: 'hook', dur: 190, kicker: 'Sport, by the numbers', lines: ["Australia's captain", 'is *under fire.*']},

    {type: 'bars', dur: 456, kicker: 'Cape Town · 2018', title: 'Three bans.\n*One scandal.*', max: 12, body: "Cricket Australia's own findings.\n*What came next is disputed.*",
      bars: [
        {label: 'STEVE SMITH', color: 'alert', base: 0, extra: 12, caption: '12 months · captaincy stripped'},
        {label: 'DAVID WARNER', color: 'alert', base: 0, extra: 12, caption: '12 months · barred from leadership for life'},
        {label: 'CAMERON BANCROFT', color: 'paper', base: 0, extra: 9, caption: '9 months · fined 75% of his match fee'},
      ]},

    {type: 'people', dur: 655, kicker: "Khawaja's memoir, \"Sabr\" · 9 Nov", footnote: 'Cummins called a separate Bancroft claim in the book "genuinely shocking" — and denied it too.',
      people: [
        {name: 'Usman Khawaja', color: 'alert', tag: 'HIS MEMOIR · 9 NOV', note: 'Per Cummins, the book calls him and others "architects of a scheme."', statLabel: 'HIS CLAIM', stat: 'The whole squad knew'},
        {name: 'Pat Cummins', color: 'accent', tag: 'PRESS CONFERENCE · 13 NOV', note: '"If he means we knew sandpaper was going out, he\'s 100% wrong."', statLabel: 'HIS RESPONSE', stat: '"Utter nonsense"'},
      ]},

    {type: 'reveal', dur: 415, kicker: 'David Warner · Instagram & Kayo, 14 Nov', punch: 'His word for it:\n*"Stinks of a cover-up."*',
      items: [
        {label: "ON KHAWAJA'S ACCOUNT", value: '"100% correct"', color: 'accent'},
        {label: "BOWLERS CA DIDN'T INTERVIEW IN 2018", value: '3 of 4', color: 'alert'},
      ]},

    {type: 'reveal', dur: 461, kicker: "Cricket Australia's position", punch: 'CA says some accounts\n*differ substantially* from his.',
      items: [
        {label: 'INVESTIGATION REOPENED', value: 'No', color: 'paper'},
        {label: "BOWLERS' JOINT STATEMENT · 2021", value: '"We did not know"', color: 'muted'},
      ]},

    {type: 'reveal', dur: 278, kicker: 'Reported 18 Nov, attributed to Bancroft', punch: 'Not yet confirmed\n*by Cricket Australia.*',
      items: [
        {label: 'LENGTH OF HIS STATEMENT', value: '~4,000 words', color: 'paper'},
        {label: 'HIS CLAIM', value: 'The entire team knew', color: 'alert'},
      ]},

    {type: 'reveal', dur: 238, kicker: 'Eight years on', punch: 'Still no\n*agreement.*',
      items: [
        {label: "PLAYERS WHO'VE NOW DISPUTED CA'S 2018 ACCOUNT", value: '4', color: 'alert'},
        {label: 'CAPTAINS STILL DENYING IT', value: '1', color: 'paper'},
      ]},

    {type: 'outro', dur: 276, lines: 'Same scandal.\n*New names.*',
      disclaimer: 'Every claim attributed to the person who made it: Khawaja (memoir "Sabr", 9 Nov), Cummins (press conference, 13 Nov), Warner (Instagram/Kayo, 14 Nov), Cricket Australia, and a statement reported 18 Nov and attributed to Bancroft. 2018 bans are Cricket Australia\'s own findings. No view taken on who is right. Sources: Daily Maverick, The Nightly, EWN, 13-18 Nov 2026.'},
  ],
}, t as T);
