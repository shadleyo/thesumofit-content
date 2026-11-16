import json
D={}
def fv(pm,a,n): r=a/12; return pm*((1+r)**n-1)/r
def pmt(P,a,n): r=a/12; return P*r/(1-(1+r)**-n)
# 1 Wedding: R150,000 lump at 7% for 30 years (monthly compounding)
D['wed']={'cost':150000,'fv30':round(150000*(1+0.07/12)**360),'mult':round((1+0.07/12)**360,1)}
# 2 Car: R400,000, 72 months, 12.75% (prime 10.75% + 2)
p=pmt(400000,0.1275,72); D['car']={'pmt':round(p),'total':round(p*72),'int':round(p*72-400000)}
# 3 Retirement: R1m at 4% drawdown; capital needed for R20,000/month = R240,000/yr
D['ret']={'yr':round(1e6*0.04),'mo':round(1e6*0.04/12),'need20':round(20000*12/0.04)}
# 4 Delivery: R35 fee, 3 orders/week -> monthly, yearly, 40y at 7%
m=35*3*52/12; D['del']={'month':round(m),'year':round(35*3*52),'fv40':round(fv(m,0.07,480)),'spent40':round(35*3*52*40)}
# 5 Cash under mattress: R100,000, 4% inflation, 20 years
D['mat']={'real20':round(100000/1.04**20),'lost':round(100000-100000/1.04**20)}
json.dump(D,open('src/batch9.data.json','w'),indent=1); print(json.dumps(D))
