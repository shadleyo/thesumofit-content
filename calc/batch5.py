import json
def fv(pmt, months, apr=0.07, start=0):
    r=apr/12; b=start; out={}
    for m in range(months+1):
        if m%12==0: out[str(m//12)]=round(b)
        b=b*(1+r)+pmt
    return out
def pmt(P, apr, n):
    i=apr/12; return P*i/(1-(1+i)**-n)
D={}
# 1 Phone: $1,500 over 24 months at 20% vs save $63/month for 24 months? -> compare total cost
p=pmt(1500,0.20,24); D['phone']={'pmt':round(p,2),'total':round(p*24,2),'interest':round(p*24-1500,2),'saveMonths':round(1500/p,1)}
# 2 Pay yourself first: 10% of $4,000 = $400/month 25->65 at 7%
D['payfirst']={'bal':fv(400,480)}
# 3 Used vs new: new $40,000 vs 3-yr-old $25,000; invest $15,000 difference for 10 years at 7%
b=15000
for _ in range(120): b*=1+0.07/12
D['used']={'diff':15000,'inv10':round(b)}
# 4 Emergency fund size for $3,000/month expenses
D['efund']={'3':9000,'6':18000}
# 5 Student loan $30,000 at 6% 10y + $50/month extra
def amort(P,apr,n,extra=0):
    i=apr/12; pm=P*i/(1-(1+i)**-n); bb=P; m=0; tot=0
    while bb>0.005:
        it=bb*i; pay=min(pm+extra,bb+it); bb=bb+it-pay; tot+=pay; m+=1
    return pm,m,tot-P
pm,m0,i0=amort(30000,0.06,120); _,m1,i1=amort(30000,0.06,120,50)
D['student']={'pmt':round(pm,2),'int0':round(i0),'months1':m1,'int1':round(i1),'saved':round(i0-i1),'monthsSaved':m0-m1}
# 6 Savings rate: $10,000 at 0.5% vs 4.5% for 10 years (monthly compounding)
lo=10000*(1+0.005/12)**120; hi=10000*(1+0.045/12)**120
D['hys']={'lo':round(lo),'hi':round(hi),'gap':round(hi-lo),
  'loS':{str(y):round(10000*(1+0.005/12)**(12*y)) for y in range(11)},'hiS':{str(y):round(10000*(1+0.045/12)**(12*y)) for y in range(11)}}
# 7 50/30/20 on $4,000 take-home
D['budget']={'needs':2000,'wants':1200,'save':800,'save30':fv(800,360)['30']}
json.dump(D,open('src/batch5.data.json','w'),indent=1)
for k,v in D.items():
    print(k, {a:(b if not isinstance(b,dict) else b.get('40',b.get('10'))) for a,b in v.items()})
