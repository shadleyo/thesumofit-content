"""Figures for week 3 (Shorts #4-6). Run: python3 calc/batch3.py -> src/batch3.data.json"""
import json
# 4. A penny doubled every day for 30 days vs $1M today. Keyed by day (day 1 = $0.01).
penny = {str(d): round(0.01 * 2 ** (d - 1), 2) for d in range(1, 31)}
penny["0"] = 0
million = {str(d): 1_000_000 for d in range(0, 31)}
# 5. Monthly amount to reach $1M by 65 at 7%, compounded monthly, from 25 / 35 / 45.
def pmt(fv, rate, years):
    r, n = rate / 12, years * 12
    return fv * r / ((1 + r) ** n - 1)
def grow(monthly, rate, years, start_age):
    r, bal, out = rate / 12, 0.0, {}
    for age in range(25, 66):
        out[str(age)] = round(bal) if age >= start_age else 0
        if age >= 65: break
        for _ in range(12):
            if age >= start_age: bal = bal * (1 + r) + monthly
    return out
million_by = {}
for start in (25, 35, 45):
    p = pmt(1_000_000, .07, 65 - start)
    million_by[str(start)] = {"monthly": round(p), "put_in": round(p) * 12 * (65 - start), "curve": grow(p, .07, 65 - start, start)}
# 6. $1,000 store card at 29% APR. Minimum = interest + 1% of balance, at least $25. vs fixed $50/month.
def card(balance, apr, fixed=None):
    r, m, interest, out = apr / 12, 0, 0.0, {0: balance}
    while balance > 0.005:
        i = balance * r; interest += i; balance += i
        pay = fixed if fixed else max(i + 0.01 * (balance - i), 25)
        pay = min(pay, balance); balance -= pay; m += 1
        out[m] = round(max(balance, 0))
    return {"months": m, "interest": round(interest), "first": round(1000 * r + 10, 2), "curve": {str(k): v for k, v in out.items()}}
store = {"min": card(1000, .29), "fixed": card(1000, .29, 50)}
json.dump({"penny": penny, "million": million, "by65": million_by, "store": store}, open("src/batch3.data.json", "w"))
print("penny day 20/27/28/30:", penny["20"], penny["27"], penny["28"], penny["30"])
for k, v in million_by.items(): print("start", k, "monthly", v["monthly"], "put in", v["put_in"], "end", v["curve"]["65"])
for k, v in store.items(): print(k, "months", v["months"], "interest", v["interest"], "first", v["first"])
