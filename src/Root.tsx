import React from 'react';
import {Composition} from 'remotion';
import {TapCard, TAP_DURATION} from './TapCard';
import {Compound, COMPOUND_DURATION} from './Compound';
import {RecipeVideo, recipeDuration, Recipe} from './template';
import {coffee} from './videos/coffee';
import {creditCard, fees, ruleOf72} from './videos/batch1';
import {earlyStart, daily, rateGap} from './videos/batch2';
import {penny, million, storeCard} from './videos/batch3';
import {iranWar} from './videos/iran';
import {tfsaKids} from './videos/tfsa';
import {swingGas} from './videos/swing';
import {warVote} from './videos/warvote';
import {warBill} from './videos/warbill';
import {afterVote} from './videos/aftervote';
import {humanCost} from './videos/humancost';
import {Avatar, Banner, Thumb} from './Branding';
import {DirChart, DirHook, DirThumb} from './Directions';
import {WideVideo, wideDuration, WideThumb} from './wide';
import {ep1} from './videos/ep1';
import {ep1Teaser} from './videos/ep1teaser';
import {ep2} from './videos/ep2';
import {ep2Teaser} from './videos/ep2teaser';
import {avalanche, zeroTrap, stopPaying, lumpSum, holiday, blackFriday, realRaise} from './videos/batch6';
import {rateHikes, bondExtra} from './videos/batch7';
import {petrolRelief, tfsaMax, raRefund, twoPot, taxBracket} from './videos/batch7b';
import {houseAsset, onePercent, lotto, bankFees, twoPotNation, petrolWar} from './videos/batch8';
import {franceBoks, walesAB} from './videos/batch10';
import {BoardVideo, boardDuration} from './board';
import {penaltyTry} from './videos/penaltyTry';
import {arendseOffside} from './videos/arendseOffside';
import {knockOnCall} from './videos/knockOnCall';
import {wieseRed} from './videos/wieseRed';
import {bogleTel} from './videos/bogleTel';
import {moodieTouch} from './videos/moodieTouch';
import {boksBackline} from './videos/boksBackline';
import {verstappenRussell} from './videos/VerstappenRussell';
import {lakaiSteal} from './videos/lakaiSteal';
import {yoroRed} from './videos/yoroRed';
import {psvPenalty} from './videos/psvPenalty';
import {gyokeresHandball} from './videos/gyokeresHandball';
import {dorguKeeper} from './videos/dorguKeeper';
import {opendaPenalty} from './videos/opendaPenalty';
import {vegasMax} from './videos/vegasMax';
import {mpc} from './videos/mpc';
import {sandpapergate} from './videos/sandpapergate';
import {wedding, carFinance, millionRetire, deliveryFees, mattress} from './videos/batch9';
import {electionCost} from './videos/electioncost';
import {houseMoney} from './videos/housemoney';
import {pappas} from './videos/pappas';
import {blackGovs} from './videos/blackgovs';
import {promises} from './videos/promises';
import {divided} from './videos/divided';
import {subs, carLoan, mortgage100, raise, inflation, rule4, emergency} from './videos/batch4';
import {phone, payFirst, usedCar, eFund, studentLoan, highYield, budget} from './videos/batch5';
import {SumVideo, sumDuration, SumThumb, SumAvatar, SumBanner} from './sumofit';

const SERIES: Record<string, string> = {Coffee: 'Quiet money leaks', Fees: 'Quiet money leaks', CreditCard: 'The cost of debt', StoreCard: 'The cost of debt',
  RuleOf72: 'Time does the work', EarlyStart: 'Time does the work', Daily: 'Time does the work', Rate: 'Time does the work', Penny: 'Time does the work', Million: 'Time does the work', IranWar: 'The cost of the news', TFSAKids: 'South Africa · TFSA', SwingGas: 'The Iran war, in numbers', WarVote: 'The Iran war, in numbers', WarBill: 'The Iran war, in numbers', AfterVote: 'The Iran war, in numbers', HumanCost: 'The Iran war, in numbers', Ep1Teaser: 'Time does the work', ElectionCost: 'The cost of the news', HouseMoney: 'The cost of the news', Pappas: 'Election 2026 · History made', BlackGovs: 'Election 2026 · History made', Promises: 'The cost of the news', Divided: 'The cost of the news', Subs: 'Time does the work', Raise: 'Time does the work', CarLoan: 'The cost of borrowing', Mortgage100: 'The cost of borrowing', Emergency: 'The cost of borrowing', Inflation: 'Money basics', Rule4: 'Money basics', Phone: 'The cost of borrowing', StudentLoan: 'The cost of borrowing', PayFirst: 'Time does the work', UsedCar: 'Quiet money leaks', HighYield: 'Quiet money leaks', EFund: 'Money basics', Budget: 'Money basics', Ep2Teaser: 'Interest works both ways', Avalanche: 'The cost of borrowing', ZeroTrap: 'The cost of borrowing', StopPaying: 'The cost of borrowing', Holiday: 'The cost of borrowing', LumpSum: 'Time does the work', BlackFriday: 'Quiet money leaks', RealRaise: 'Money basics', RateHikes: 'Money in South Africa', BondExtra: 'Money in South Africa', PetrolRelief: 'Money in South Africa', TFSAMax: 'Money in South Africa', RARefund: 'Money in South Africa', TwoPot: 'Money in South Africa', TaxBracket: 'Money in South Africa', HouseAsset: 'Uncomfortable maths', OnePercent: 'Uncomfortable maths', Lotto: 'Uncomfortable maths', BankFees: 'Uncomfortable maths', TwoPotNation: 'Uncomfortable maths', PetrolWar: 'Uncomfortable maths', Wedding: 'Uncomfortable maths', CarFinance: 'Uncomfortable maths', MillionRetire: 'Uncomfortable maths', DeliveryFees: 'Uncomfortable maths', Mattress: 'Uncomfortable maths', MPC: 'Money in South Africa', FranceBoks: 'Sport, by the numbers', WalesAB: 'Sport, by the numbers', Sandpapergate: 'Sport, by the numbers'};

// Add each new video's recipe here.
const recipes: Recipe[] = [coffee, creditCard, fees, ruleOf72, earlyStart, daily, rateGap, penny, million, storeCard, iranWar, tfsaKids, swingGas, warVote, warBill, afterVote, humanCost, ep1Teaser, electionCost, houseMoney, pappas, blackGovs, promises, divided, subs, carLoan, mortgage100, raise, inflation, rule4, emergency, phone, payFirst, usedCar, eFund, studentLoan, highYield, budget, ep2Teaser, avalanche, zeroTrap, stopPaying, lumpSum, holiday, blackFriday, realRaise, rateHikes, bondExtra, petrolRelief, tfsaMax, raRefund, twoPot, taxBracket, houseAsset, onePercent, lotto, bankFees, twoPotNation, petrolWar, wedding, carFinance, millionRetire, deliveryFees, mattress, mpc, franceBoks, walesAB, sandpapergate];

export const Root: React.FC = () => (
  <>
    <Composition id="TapCard" component={TapCard} durationInFrames={TAP_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="Compound" component={Compound} durationInFrames={COMPOUND_DURATION} fps={30} width={1080} height={1920} />
    <Composition id="Avatar" component={Avatar} durationInFrames={1} fps={30} width={800} height={800} />
    <Composition id="Banner" component={Banner} durationInFrames={1} fps={30} width={2560} height={1440} />
    <Composition id="ThumbCoffee" component={Thumb} durationInFrames={1} fps={30} width={1080} height={1920}
      defaultProps={{kicker: 'THE REAL COST OF', from: '$5 coffee', to: '$185,537', foot: 'over 30 years'}} />
    {recipes.map((r) => (
      <Composition key={r.id} id={r.id} component={RecipeVideo} defaultProps={{recipe: r}}
        durationInFrames={recipeDuration(r)} fps={30} width={1080} height={1920} />
    ))}
    {recipes.map((r) => (
      <Composition key={'S' + r.id} id={'Sum-' + r.id} component={SumVideo} defaultProps={{recipe: {...r, series: SERIES[r.id]}}}
        durationInFrames={sumDuration(r)} fps={30} width={1080} height={1920} />
    ))}
    {[penaltyTry, arendseOffside, knockOnCall, wieseRed, bogleTel, moodieTouch, boksBackline, verstappenRussell, lakaiSteal, vegasMax, yoroRed, psvPenalty, gyokeresHandball, dorguKeeper, opendaPenalty].map((b) => (
      <Composition key={'B' + b.id} id={'Sum-' + b.id} component={BoardVideo} defaultProps={{recipe: b}} durationInFrames={boardDuration(b)} fps={30} width={1080} height={1920} />
    ))}
    <Composition id="Wide-Ep1" component={WideVideo} defaultProps={{recipe: ep1}} durationInFrames={wideDuration(ep1)} fps={30} width={1920} height={1080} />
    <Composition id="WideThumb-Ep1" component={WideThumb} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="Wide-Ep2" component={WideVideo} defaultProps={{recipe: ep2}} durationInFrames={wideDuration(ep2)} fps={30} width={1920} height={1080} />
    <Composition id="WideThumb-Ep2" component={WideThumb} defaultProps={{ep: 'EPISODE 2', left: {tag: 'PAID A FIXED $150', name: 'Jo', value: '$2,798'}, right: {tag: 'PAID THE MINIMUM', name: 'Sam', value: '$8,100'}, title: 'Interest works', titleEm: 'both ways.'}} durationInFrames={1} fps={30} width={1280} height={720} />
    <Composition id="SumAvatar" component={SumAvatar} durationInFrames={1} fps={30} width={800} height={800} />
    <Composition id="SumBanner" component={SumBanner} durationInFrames={1} fps={30} width={2560} height={1440} />
    {['terminal', 'editorial', 'obsidian'].map((t) => (
      <React.Fragment key={t}>
        <Composition id={`Dir-${t}-thumb`} component={DirThumb} defaultProps={{theme: t}} durationInFrames={1} fps={30} width={1080} height={1920} />
        <Composition id={`Dir-${t}-hook`} component={DirHook} defaultProps={{theme: t}} durationInFrames={1} fps={30} width={1080} height={1920} />
        <Composition id={`Dir-${t}-chart`} component={DirChart} defaultProps={{theme: t}} durationInFrames={1} fps={30} width={1080} height={1920} />
      </React.Fragment>
    ))}
  </>
);
