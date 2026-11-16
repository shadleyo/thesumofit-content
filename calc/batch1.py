"""Figures for videos 2-4. Run: python3 calc/batch1.py"""
import json

# --- 2. Credit card: minimum payment vs fixed $200 ---
BAL, APR = 5000, 0.22
r = APR / 12
def card(pay_fn):
    bal, months, interest, track = BAL, 0, 0.0, {0: BAL}
    while bal > 0.005:
        i = bal * r
        pay = min(pay_fn(bal, i), bal + i)
        bal = bal + i - pay
        interest += i; months += 1
        if months % 12 == 0: track[months // 12] = round(max(bal, 0))
    track[-(-months // 12)] = 0
    return months, round(interest), track
minimum = lambda bal, i: max(i + 0.01 * bal, 25)   # interest + 1% of balance, at least $25
fixed = lambda bal, i: 200
m_min, int_min, t_min = card(minimum)
m_fix, int_fix, t_fix = card(fixed)
first_min = round(max(BAL * r + 0.01 * BAL, 25), 2)
print(f"CARD minimum: first payment ${first_min}, {m_min} months ({m_min/12:.1f} yrs), interest ${int_min:,}")
print(f"CARD fixed $200: {m_fix} months ({m_fix/12:.1f} yrs), interest ${int_fix:,}")

# --- 3. Fees: 0.25% vs 2% a year on $300/month for 30 years, 7% gross ---
def invest(monthly, net, years):
    rr, bal, out = net / 12, 0.0, {0: 0}
    for mth in range(1, years * 12 + 1):
        bal = bal * (1 + rr) + monthly
        if mth % 12 == 0: out[mth // 12] = round(bal)
    return out
low = invest(300, 0.07 - 0.0025, 30)
high = invest(300, 0.07 - 0.02, 30)
print(f"FEES put in $108,000 | 0.25% fee: ${low[30]:,} | 2% fee: ${high[30]:,} | gap ${low[30]-high[30]:,}")

# --- 4. Rule of 72: $10,000 lump sum at 4%, 7%, 10% for 40 years (yearly compounding) ---
rates = {"4": 0.04, "7": 0.07, "10": 0.10}
r72 = {k: {y: round(10000 * (1 + v) ** y) for y in range(41)} for k, v in rates.items()}
for k, v in rates.items():
    import math
    print(f"R72 {k}%: rule says {72/(v*100):.1f} yrs, exact {math.log(2)/math.log(1+v):.1f} yrs, after 40 yrs ${r72[k][40]:,}")

json.dump({"card": {"min": t_min, "fixed": t_fix, "m_min": m_min, "m_fix": m_fix, "int_min": int_min, "int_fix": int_fix, "first_min": first_min},
           "fees": {"low": low, "high": high},
           "r72": r72}, open("src/batch1.data.json", "w"))
