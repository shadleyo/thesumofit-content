import json
D={}
r=0.07/12
# LumpSum: $10,000 untouched at 7% monthly comp
D['lump']={str(y):round(10000*(1+r)**(12*y)) for y in range(41)}
# Holiday: $1,000 on 22% card, minimum = interest + 1% (min $25)
b=1000; m=0; tot=0
while b>0.005:
    it=b*0.22/12; p=min(max(it+0.01*b,25),b+it); b=b+it-p; tot+=p; m+=1
D['holiday']={'months':m,'total':round(tot),'interest':round(tot-1000)}
# vs paying $100/month
b=1000; m2=0; t2=0
while b>0.005:
    b*=1+0.22/12; p=min(100,b); b-=p; t2+=p; m2+=1
D['holiday100']={'months':m2,'interest':round(t2-1000)}
# RealRaise: salary $50,000, 3% raise, 3% inflation; also 2% raise vs 4% inflation over 5 years
D['real']={'nominal5':round(50000*1.02**5),'real5':round(50000*1.02**5/1.04**5)}
# BlackFriday: $400 item 50% off = $200 spent; invested 20 yrs at 7%
D['bf']={'spent':200,'inv20':round(200*(1+r)**240)}
json.dump(D,open('src/batch6.data.json','w'),indent=1)
print({k:v for k,v in D.items() if k!='lump'}, D['lump']['10'],D['lump']['20'],D['lump']['30'],D['lump']['40'])
