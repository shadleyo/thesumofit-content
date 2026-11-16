import json
D={}
def fv(pm,a,n): r=a/12; return pm*((1+r)**n-1)/r
def pmt(P,a,n): r=a/12; return P*r/(1-(1+r)**-n)
# 1 House: $400k, 20% down, $320k at 6.5% 30y; tax 1.1%, insurance $1,500, maintenance 1%/yr (flat); value grows 3.5%/yr
p=pmt(320000,0.065,360); other=(400000*0.011+1500+400000*0.01)*30
D['house']={'pmt':round(p),'interest':round(p*360-320000),'other':round(other),'total':round(80000+p*360+other),'value30':round(400000*1.035**30)}
# 2 Fee: R5,000/month 40y at 10% vs 9%
D['fee']={'g10':round(fv(5000,0.10,480)),'g9':round(fv(5000,0.09,480)),'gap':round(fv(5000,0.10,480)-fv(5000,0.09,480)),'in':5000*480}
# 3 Lotto: R20/week = R86.67/month, 40y at 7%; odds 1 in 20,358,520; lightning 1 in 350,000
D['lotto']={'month':round(20*52/12,2),'fv':round(fv(20*52/12,0.07,480)),'spent':20*52*40,'odds':20358520,'light':350000,'ratio':round(20358520/350000)}
# 4 Bank fees: R99 and R250 /month, 40y at 7%
D['bank']={'f99':round(fv(99,0.07,480)),'f250':round(fv(250,0.07,480)),'spent99':99*480,'spent250':250*480}
# 5 Two-pot at scale: R43.42bn gross (SARS, to 31 Jan 2025), 2,403,379 approved; 25y at 6% real
D['pot']={'gross':43.42,'n':2403379,'avg':round(43.42e9/2403379),'grown':round(43.42*(1.005)**300,1)}
# 6 Petrol: R20.30 (Mar 2026) -> R30.24 (Nov 2026), 50l tank, 2 tanks/month
D['petrol']={'mar':20.30,'nov':30.24,'pct':round((30.24/20.30-1)*100),'tank_mar':round(50*20.30),'tank_nov':round(50*30.24),'diff_tank':round(50*(30.24-20.30)),'diff_month':round(100*(30.24-20.30))}
json.dump(D,open('src/batch8.data.json','w'),indent=1); print(json.dumps(D,indent=0))
