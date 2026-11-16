"""Figures for the $5 coffee video. Run: python3 calc/coffee.py"""
import json
RATE = 0.07          # yearly return
MONTHLY = 5 * 365 / 12   # $5 a day as a monthly amount
YEARS = 30
r = RATE / 12
bal = cash = 0.0
invested, spent = {0: 0}, {0: 0}
for month in range(1, YEARS * 12 + 1):
    bal = bal * (1 + r) + MONTHLY
    cash += MONTHLY
    if month % 12 == 0:
        invested[month // 12] = round(bal)
        spent[month // 12] = round(cash)
json.dump({"invested": invested, "cash": spent}, open("src/coffee.data.json", "w"))
print(f"monthly {MONTHLY:.2f} | spent {spent[YEARS]:,} | invested {invested[YEARS]:,}")
