"""SARB MPC reaction video. Usage: python3 calc/mpc.py <hold|cut|hike> [bps=25]
Writes src/mpc.data.json + scripts/MPC.txt. Then: python3 calc/voice.py MPC onwK4e9ZLuTAKqWW03F9; python3 calc/timing.py MPC; ./render-sum.sh MPC
Before the decision: repo 7.25%, prime 10.75% (23 Sep 2026). R1.5m bond, 20 years, monthly (same basis as RateHikes)."""
import json, sys
ONES="zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()
TENS="_ _ twenty thirty forty fifty sixty seventy eighty ninety".split()
def words(n):
    if n<20: return ONES[n]
    if n<100: return TENS[n//10]+("-"+ONES[n%10] if n%10 else "")
    if n<1000: return ONES[n//100]+" hundred"+(" and "+words(n%100) if n%100 else "")
    return words(n//1000)+" thousand"+((" and " if n%1000<100 else ", ")+words(n%1000) if n%1000 else "")
def rate(x):  # 7.25 -> "seven point two five"; 11 -> "eleven"
    t=f"{x:.2f}".rstrip("0").rstrip("."); i,_,f=t.partition(".")
    return words(int(i))+(" point "+" ".join(ONES[int(c)] for c in f) if f else "")
def pmt(P,a,n): r=a/12; return P*r/(1-(1+r)**-n)
kind=sys.argv[1]; bps=int(sys.argv[2]) if len(sys.argv)>2 else 25
old_repo,old_prime=7.25,10.75
d={"hold":0,"cut":-bps/100,"hike":bps/100}[kind]
repo=round(old_repo+d,2); prime=round(old_prime+d,2)
p0=round(pmt(1.5e6,old_prime/100,240)); p1=round(pmt(1.5e6,prime/100,240)); diff=p1-p0
D={"kind":kind,"bps":bps,"repo":repo,"prime":prime,"p0":p0,"p1":p1,"diff":diff}
json.dump(D,open("src/mpc.data.json","w"),indent=1)
verb={"hold":f"held the repo rate at {rate(repo)} percent","cut":f"cut the repo rate by {words(bps)} basis points, to {rate(repo)} percent","hike":f"raised the repo rate by {words(bps)} basis points, to {rate(repo)} percent"}[kind]
move={"hold":"stays the same","cut":"falls","hike":"rises"}[kind]
gap={"hold":"no change from before","cut":f"{words(abs(diff))} rand less than before","hike":f"{words(abs(diff))} rand more than before"}[kind]
close={"hold":"No change this time. The next decision is the one to watch.","cut":"Relief, but small. Keep paying the old amount and the bond clears sooner.","hike":"Small each month, big over twenty years. Know your number."}[kind]
txt=f"""The Reserve Bank has {verb}. Here's what it means for your bond.

The repo rate is now {rate(repo)} percent, and prime is {rate(prime)} percent.

On a one point five million rand bond over twenty years, your repayment {move}. That's {words(p1)} rand a month, {gap}.

{close} Follow for the next sum. That's the sum of it.
"""
open("scripts/MPC.txt","w").write(txt); print(txt); print(D)
