import json
D={}
def pmt(P,a,n): r=a/12; return P*r/(1-(1+r)**-n)
# RateHikes: R1.5m bond, 20 years, prime 10.25% (Jan 2026) vs 10.75% (after May + Sep 2026 hikes)
p1=pmt(1.5e6,0.1025,240); p2=pmt(1.5e6,0.1075,240); p0=pmt(1.5e6,0.11,240)
D['hike']={'p1025':round(p1),'p1075':round(p2),'diff':round(p2-p1),'diff20':round((p2-p1)*240),'per25':round(p0-p2)}
# BondExtra: R1.5m at 10.75%, +R1,000/month
b=1.5e6; m=0; it=0; base=p2
while b>0.005:
    i=b*0.1075/12; pay=min(base+1000,b+i); b=b+i-pay; it+=i; m+=1
D['extra']={'pay':round(base),'months':m,'saved_m':240-m,'int_base':round(base*240-1.5e6),'int_extra':round(it),'saved':round(base*240-1.5e6-it)}
# Petrol 95 inland R30.24/l from 4 Nov 2026; relief R1.50/l to 1 Dec, R1/l 2 Dec-5 Jan
D['petrol']={'tank':round(50*30.24,2),'relief1':75,'relief2':50}
# TFSA46: R3,833.33/month from 30 until R500k lifetime limit, then left to grow to 65; 6% real, monthly
r=0.06/12; v=0; c=0; mm=0
for k in range(420):
    add=min(46000/12, 500000-c); c+=add; v=(v+add)*(1+r)
    if add>0: mm=k+1
D['tfsa']={'months':mm,'at65':round(v),'contrib':round(c)}
# RA refund: R2,000/month at 31% marginal
D['ra']={'year':24000,'refund':round(24000*0.31),'net':round(2000*(1-0.31))}
# TwoPot: R30,000 at 31%; left 25 years at 6% real
D['pot']={'tax':9300,'cash':20700,'left25':round(30000*(1+r)**300)}
# Bracket: R380,000 -> R400,000 taxable (2026/27 table)
def tax(x):
    B=[(245100,0.18,0),(383100,0.26,44118),(530200,0.31,79998)]
    if x<=245100: return x*0.18
    if x<=383100: return 44118+0.26*(x-245100)
    return 79998+0.31*(x-383100)
D['bracket']={'t380':round(tax(380000)),'t400':round(tax(400000)),'extra':round(tax(400000)-tax(380000)),'keep':round(20000-(tax(400000)-tax(380000))),'at31':16900}
json.dump(D,open('src/batch7.data.json','w'),indent=1); print(json.dumps(D))
