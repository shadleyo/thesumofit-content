# Batch 4 figures. 7% a year compounded monthly unless stated.
import json
r=0.07/12
def fv(pmt, months, rate=r, start=0):
    b=start; out={}
    for m in range(months+1):
        if m%12==0: out[str(m//12)]=round(b)
        b=b*(1+rate)+pmt
    return out
def pmt_loan(P, apr, n):
    i=apr/12; return P*i/(1-(1+i)**-n)
D={}
# 1 Subscriptions: 5 x $15 = $75/month, 20 years
s=fv(75,240); D['subs']={'inv':s,'spent':{k:75*12*int(k) for k in s}}
# 2 Car loan: $30,000 at 9% over 6 years (72 months)
p=pmt_loan(30000,0.09,72); D['car']={'pmt':round(p,2),'total':round(p*72),'interest':round(p*72-30000)}
# saver: invests the same payment for 6 years at 7% then buys? Instead: after loan ends, keep investing payment for 10 yrs
# 3 Mortgage: $300,000 at 7% 30y; +$100/month
def amort(P,apr,n,extra=0):
    i=apr/12; pm=P*i/(1-(1+i)**-n); b=P; m=0; tot=0
    while b>0.005:
        intr=b*i; pay=min(pm+extra,b+intr); b=b+intr-pay; tot+=pay; m+=1
    return pm,m,tot-P
pm,m0,i0=amort(300000,0.07,360); _,m1,i1=amort(300000,0.07,360,100)
D['mort']={'pmt':round(pm,2),'months0':m0,'int0':round(i0),'months1':m1,'int1':round(i1),'saved':round(i0-i1),'monthsSaved':m0-m1}
# 4 Raise: $300/month raise invested vs spent, 25 years
s=fv(300,300); D['raise']={'inv':s,'spent':{k:300*12*int(k) for k in s}}
# 5 Inflation: $100 purchasing power at 3% over 30 years
D['infl']={str(y):round(100/1.03**y,2) for y in range(31)}
# 6 4% rule: income -> pot
D['rule4']={str(x):x*12*25 for x in (2000,3000,4000,5000)}
# 7 Emergency: $1,000 on card at 22% paying $30 min vs from savings
b=1000; m=0; tot=0
while b>0:
    b=b*(1+0.22/12); pay=min(30,b); b-=pay; tot+=pay; m+=1
D['emerg']={'months':m,'paid':round(tot,2),'interest':round(tot-1000,2)}
json.dump(D,open('src/batch4.data.json','w'),indent=1)
for k,v in D.items():
    if k in('subs','raise'): print(k, v['inv'][str(len(v['inv'])-1)], v['spent'][str(len(v['spent'])-1)])
    elif k=='infl': print(k, v['10'],v['20'],v['30'])
    else: print(k,v)
# crossover year when growth > contributions
for k in ('subs','raise'):
    for y,b in D[k]['inv'].items():
        if b-D[k]['spent'][y]>D[k]['spent'][y] and int(y)>0: print(k,'growth>contrib at',y); break
