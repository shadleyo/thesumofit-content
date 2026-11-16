import json
def card(P, apr, pay_fn, cap=1200):
    b=P; m=0; tot=0; hist={0:round(P)}
    while b>0.005 and m<cap:
        b*=1+apr/12; p=min(pay_fn(b),b); b-=p; tot+=p; m+=1
        if m%12==0: hist[m//12]=round(b)
    return m, round(tot), round(tot-P), hist
minpay=lambda b: max(0.02*b, 25)
D={}
for name,fn in [('min',minpay),('f150',lambda b:150),('f250',lambda b:250),('f500',lambda b:500)]:
    m,t,i,h=card(5000,0.22,fn); D[name]={'months':m,'total':t,'interest':i,'hist':h}
# first month interest on $5,000 at 22%
D['month1']=round(5000*0.22/12,2); D['minFirst']=100
# avalanche vs snowball, extra budget total $635/month (mins 90+45+200=335, +300)
def payoff(debts, order, budget):
    ds=[dict(x) for x in debts]; m=0; tot_int=0; done={}
    while any(d['b']>0.005 for d in ds) and m<600:
        m+=1
        for d in ds:
            if d['b']>0: it=d['b']*d['r']/12; d['b']+=it; tot_int+=it
        avail=budget
        for d in ds:
            if d['b']>0: p=min(d['min'],d['b']); d['b']-=p; avail-=p
        for idx in order:
            d=ds[idx]
            if d['b']>0 and avail>0: p=min(avail,d['b']); d['b']-=p; avail-=p
        for d in ds:
            if d['b']<=0.005 and d['n'] not in done: done[d['n']]=m
    return m, round(tot_int), done
debts=[{'n':'Card A','b':3000,'r':0.22,'min':90},{'n':'Card B','b':1500,'r':0.18,'min':45},{'n':'Car loan','b':8000,'r':0.07,'min':200}]
av=payoff(debts,[0,1,2],635); sn=payoff(debts,[1,0,2],635); mins=payoff(debts,[],335)
D['aval']={'months':av[0],'int':av[1],'done':av[2]}; D['snow']={'months':sn[0],'int':sn[1],'done':sn[2]}; D['mins']={'months':mins[0],'int':mins[1]}
json.dump(D,open('src/ep2.data.json','w'),indent=1)
for k,v in D.items(): print(k, {a:b for a,b in v.items() if a!='hist'} if isinstance(v,dict) else v)
