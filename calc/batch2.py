"""Figures for week 2 (Shorts #1-3). Run: python3 calc/batch2.py -> src/batch2.data.json"""
import json
def grow(monthly, rate, years, start=0, stop=None, horizon=None):
    """Monthly contributions from year `start` to `stop`, compounded monthly; yearly balances to `horizon`."""
    stop = years if stop is None else stop; horizon = horizon or years
    r, bal, out = rate / 12, 0.0, {0: 0}
    for m in range(1, horizon * 12 + 1):
        bal *= 1 + r
        if start * 12 < m <= stop * 12: bal += monthly
        if m % 12 == 0: out[m // 12] = round(bal)
    return out
# 1. Start at 25 vs 35: $200/mo, 7%. Maya 25-35 then stops; Leo 35-65. Keyed by age.
maya = grow(200, .07, 10, 0, 10, 40); leo = grow(200, .07, 40, 10, 40, 40)
early = {"maya": {str(25 + k): v for k, v in maya.items()}, "leo": {str(25 + k): v for k, v in leo.items()}}
# 2. $1/$10/$20 a day for 40 years at 7%
daily = {str(d): grow(d * 365 / 12, .07, 40) for d in (1, 10, 20)}
# 3. 7% vs 8%, $300/mo, 40 years
rate = {"7": grow(300, .07, 40), "8": grow(300, .08, 40)}
json.dump({"early": early, "daily": daily, "rate": rate}, open("src/batch2.data.json", "w"))
print("early 65:", early["maya"]["65"], early["leo"]["65"])
print("daily 40:", [daily[k][40] for k in daily])
print("rate 40:", rate["7"][40], rate["8"][40], "gap", rate["8"][40] - rate["7"][40])
