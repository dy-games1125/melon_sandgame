let F=[],P=[],M=[],E=[],Z=[],ended=0,et=0,win=-1,mode='ffa';const R=Math.random,rn=(a,b)=>a+R()*(b-a),H=Math.hypot;
const EM=['🔫','🔫','🚀','🗡️','💣','🏹','🪄','🔱','','⚔️','💫','🔨','👊','🔫','🛡️','➰','🔪','📜','🎯','🪓','🔥'],COL=['#e5484d','#3e8bff','#f5a524','#a855f7'];
const W=[
{n:'리볼버',d:45,i:1.5,cd:15,s:'호크아이: 유도탄 65 (반드시 명중, 방어·반사·순간이동 무시)'},
{n:'미니건',d:8,i:.2,cd:17,s:'2초간 발사량 15% 증가'},
{n:'RPG',d:50,i:4,cd:20,s:'특수 미사일 70, 느린 탄속, 큰 폭발'},
{n:'카타나',d:35,i:1,cd:0,s:'패시브: 투사체 30% 반사 (피해 110%)'},
{n:'폭탄',d:65,i:2.5,cd:15,s:'광란의 폭탄병: 폭탄 8개를 사방으로 투척'},
{n:'활',d:25,i:1.5,cd:15,s:'화살 3발 부채꼴 발사'},
{n:'지팡이',d:30,i:2,cd:15,s:'텔레포트: 순간이동 후 공격(+30% 피해), 최대체력 15% 회복. 일반 공격은 4종 마법 무작위(상태이상 30%)'},
{n:'창',d:40,i:1.8,cd:15,s:'부메랑 투창: 유도 투척 후 되돌아옴, 되돌아올 때 5초 출혈. 긴 사거리'},
{n:'없음',d:0,i:99,cd:0,s:'-'},
{n:'마검',d:30,i:1,cd:25,s:'근접. 확률(각 25%)로 불기둥(6초, 초당10, 화상) / 썬더볼트(5초, 초당7, 끌어당김·마비·공격불가) / 아이스스피어(3줄, 15, 확정 빙결) / 윈드슬래시(돌진 후 Z베기 20x3)'},
{n:'광선검',d:40,i:1.2,cd:20,s:'근접 원형 공격(범위 60). 세이버 투척: 벽에 닿으면 되돌아오는 광선검, 70, 50% 5초 기절'},
{n:'망치',d:60,i:2.2,cd:20,s:'근접, 느린 내려찍기. 해머 크래쉬: 끌어와 올려치기 20 + 내려찍기 30, 3초 기절'},
{n:'보이지 않는 주먹',d:8,i:.2,cd:20,s:'근접 연타. 광속연타: 끌어와 2초 기절, 0.1초마다 20연타(각 3)'},
{n:'쌍권총',d:12,i:.35,cd:20,s:'원거리 빠른 연사. 난사 회피: 뒤로 물러나며 사방으로 12발(각 10)'},
{n:'방패',d:20,i:1.3,cd:25,s:'근접, 타격 시 0.5초 기절. 철벽: 3초간 정면 투사체를 막아 반사'},
{n:'채찍',d:25,i:1.2,cd:20,s:'긴 사거리 근접. 끌어당기기: 적을 끌어와 4연타(각 10), 1.2초 기절'},
{n:'독 단검',d:12,i:.6,cd:20,s:'근접, 타격마다 중독 중첩(최대 5, 중첩당 초당 3). 맹독 안개: 6초간 독 구역'},
{n:'부적',d:10,i:1.6,cd:20,s:'원거리, 맞은 적에게 붙어 2초 뒤 폭발(25). 결계: 6초간 구역 안 적을 느리게 하고 점프 불가'},
{n:'저격총',d:55,i:2.8,cd:22,s:'원거리 고데미지 저속 연사. 헤드샷: 80 피해 + 1.5초 기절'},
{n:'도끼',d:45,i:1.5,cd:18,s:'근접. 지진파: 바닥을 따라 나가는 충격파(40), 맞은 적을 1초 띄움'},
{n:'화염방사기',d:5,i:.15,cd:25,s:'단거리 연사, 15% 확률 화상. 불바다: 5초간 넓은 화염 구역(초당 10, 화상)'}];
const A=[
{n:'머슬',e:'체력 450, 공격 피해 +10%'},{n:'타이니',e:'크기·피격 판정 감소, 이동속도 +15%'},
{n:'리플렉터',e:'30% 확률로 받은 피해의 절반 반사'},{n:'힐러',e:'체력 50% 이하일 때 체력을 모두 회복 (1회)'},
{n:'디펜더',e:'체력 350, 20초마다 공격 1회 방어'},{n:'리바이벌',e:'사망 시 1회 부활 (체력 50%), 이후 받는 피해 -20%'},
{n:'없음',e:'-'},
{n:'광전사',e:'체력 50% 이하: 이속 +7%·공속 +8% (각성) / 25% 이하: 이속 +10%·공속 +10%·공격력 +7% (최종 각성). 중첩되지 않음'},
{n:'데드리스',e:'죽기 전에 3.5초간 무적 (이때 내 공격은 피해 20%만), 무적 중 받은 피해의 35% 회복'},
{n:'흡혈',e:'공격 적중 시 입힌 피해의 15% 회복'},
{n:'신속',e:'이동속도 +20%, 공격속도 +10%'},
{n:'치명타',e:'20% 확률로 피해 2배'},
{n:'아머',e:'체력 350, 받는 피해 15% 감소'},
{n:'재생',e:'초당 최대체력의 1.5% 회복'}];
const SN={0:'호크아이',1:'광란의 사격',2:'미스틱밤',4:'광란의 폭탄병',5:'다중 사격',6:'텔레포트',7:'부메랑 투창',10:'세이버 투척',11:'해머 크래쉬',12:'광속연타',13:'난사 회피',14:'철벽',15:'끌어당기기',16:'맹독 안개',17:'결계',18:'헤드샷',19:'지진파',20:'불바다'},ML=[3,7,9,10,11,12,14,15,16,19],WN=[220,180,260,40,200,230,220,85,200,40,40,45,40,220,40,120,40,230,300,40,110],RG=[450,450,450,85,450,450,450,125,0,85,75,85,70,450,85,150,85,450,450,85,150];
function init(ch,m){mode=m;ended=0;et=0;win=-1;P=[];M=[];E=[];Z=[];
F=ch.map((x,i)=>{const a=x.a,hp=a==0?450:a==4||a==12?350:300,ty=a==1;
 return{i,n:x.n,w:x.w,a,team:m=='team'?x.t:i,x:110+i*225,y:340,vx:0,vy:0,hp,mx:hp,face:i<2?1:-1,ac:rn(.5,1.2),sc:rn(4,9),mb:0,sh:a==4?1:0,st:0,rv:a==5?1:0,rd:0,hd:0,bn:0,fz:0,pl:0,ar:0,bl:0,dead:0,dm:a==0?1.1:1,s:ty?.7:1,sp:(ty?1.15:1)*(ML.includes(x.w)?1.05:1)*(a==10?1.2:1),r:ty?11:17,t:0,sw:0,hf:0,dt:0,jt:rn(1,3),mvx:0,rtm:0,dl:0,dli:0,dsum:0,bz:0,lt:0,lb:'',lk:0,sn:0,wl:0,jb:0,ps:0,pt:0,tl:0,tlo:null,as:a==10?1.1:1}});}
const txt=(x,y,s)=>E.push({x,y,t:.8,tx:s});
function raw(f,v){if(f.dli>0){f.dsum+=v;return}f.hp-=v;if(f.hp<=0)die(f)}
function die(f){if(f.a==8&&!f.dl){f.dl=1;f.dli=3.5;f.dsum=0;f.hp=1;return}if(f.rv){f.rv=0;f.rd=1;f.hp=f.mx*.5;f.lb='리바이벌';f.lt=2;return}f.dead=1;f.hp=0;f.dt=0}
function hurt(t,d,o,pr,nr,kb){if(t.dead||d<=0)return;
 if(!pr){if(t.sh){t.sh=0;t.st=0;txt(t.x,t.y-70,'방어!');return}if(t.a==2&&!nr&&R()<.3){txt(t.x,t.y-80,'반사');hurt(o,d/2,t,0,1)}}
 d*=o.dm*(t.rd?.8:1)*(o.dli>0?.2:1)*(t.a==12?.85:1);if(o.a==11&&R()<.2){d*=2;txt(t.x,t.y-80,'치명타!')}if(t.dli>0){t.dsum+=d;txt(t.x,t.y-62,'무적');return}t.hp-=d;if(o.a==9&&o.hp>0&&!o.dead)o.hp=Math.min(o.mx,o.hp+d*.15);t.hf=.15;if(kb)t.vx+=Math.sign(t.x-o.x)*130;txt(t.x+rn(-8,8),t.y-62,Math.round(d));
 if(t.a==3&&!t.hd&&t.hp>0&&t.hp<=t.mx/2){t.hd=1;t.hp=t.mx;t.lb='힐';t.lt=1.5}
 if(t.hp<=0)die(t)}
function hit(e,d,o,fx,pr,bl){hurt(e,d,o,pr);if(e.dead)return;if(bl)e.bl=5;else if(fx&&R()<(fx[2]||.3)){e[fx[0]]=fx[1];if(fx[0]=='tl')e.tlo=o}}
function boom(x,y,r,d,o,fx,ec,ring){E.push({x,y,r,t:ring?.5:.3,c:ec||'#fa3',ring});for(const e of F)if(!e.dead&&e.team!=o.team&&H(e.x-x,e.y-30*e.s-y)<r+e.r)hit(e,d,o,fx)}
function sh(f,T,o){const sx=f.x+f.face*14,sy=f.y-35*f.s,dx=T.x-sx,dy=T.y-30*T.s-sy+(o.sy||0),L=H(dx,dy)||1;
 const p={x:sx,y:sy,vx:dx/L*o.sp,vy:dy/L*o.sp-(o.up||0),g:o.g||0,d:o.d,o:f,k:o.k||'b',r:o.r||4,ex:o.ex,hm:o.hm,tg:T,pr:o.pr,fx:o.fx,sp:o.s2,ec:o.ec,bm:o.bm,life:o.life||3,c:o.c||'#333'};P.push(p);return p}
function attack(f,T){const dd=Math.abs(T.x-f.x);
 switch(f.w){
 case 0:sh(f,T,{sp:700,d:45,sy:rn(-8,8),c:'#555'});break;
 case 1:sh(f,T,{sp:800,d:8,sy:rn(-30,30),r:f.mb>0?3:2,c:f.mb>0?'#f33':'#fa0'});break;
 case 2:sh(f,T,{sp:287.5,d:50,ex:60,r:7.8,k:'rk',c:'#c33'});break;
 case 3:f.sw=.25;hurt(T,35,f,0,0,1);break;
 case 4:P.push({x:f.x,y:f.y-35,vx:(T.x-f.x)/1.05,vy:-310,g:600,d:65,o:f,k:'gr',r:5,ex:47.5,life:3,c:'#222'});break;
 case 5:sh(f,T,{sp:600,d:25,g:500,up:dd*.4,k:'ar',c:'#6b4'});break;
 case 6:{const m=Math.floor(R()*4),MD=[30,30,30,30],MC=['#f60','#6cf','#ee2','#964'];
  if(m==3){const x=T.x;E.push({x,y:340,r:50,t:.5,c:'#964',rock:1,fn:()=>boom(x,320,50,30,f,['ar',3])})}
  else sh(f,T,{sp:450,d:MD[m],r:6,c:MC[m],fx:[['bn',5],['fz',5],['pl',7]][m]});break}
 case 7:f.sw=.25;hurt(T,40,f,0,0,1);break;
 case 9:f.sw=.25;hurt(T,30,f,0,0,1);break;
 case 10:f.sw=.3;E.push({x:f.x,y:f.y-30,r:60,t:.3,c:'#4ef',ring:1});for(const e of F)if(!e.dead&&e.team!=f.team&&H(e.x-f.x,e.y-30*e.s-(f.y-30))<60+e.r)hit(e,40,f);break;
 case 11:f.sw=.4;E.push({x:T.x,y:340,r:25,t:.3,c:'#ca8',ring:1});hurt(T,60,f,0,0,1);break;
 case 12:E.push({x:T.x+rn(-12,12),y:T.y-30+rn(-15,15),r:7,t:.08,c:'#fff'});hurt(T,8,f);break;
 case 13:sh(f,T,{sp:650,d:12,sy:rn(-10,10),r:3,c:'#fb4'});break;
 case 14:f.sw=.3;hurt(T,20,f,0,0,1);T.sn=Math.max(T.sn,.5);break;
 case 15:f.sw=.3;E.push({x:T.x,y:T.y-30,r:10,t:.12,c:'#fa6'});hurt(T,25,f,0,0,1);break;
 case 16:f.sw=.2;hurt(T,12,f,0,0,1);T.ps=Math.min(5,T.ps+1);T.pt=5;break;
 case 17:sh(f,T,{sp:500,d:10,r:5,c:'#fd6',fx:['tl',2,1]});break;
 case 18:sh(f,T,{sp:1100,d:55,r:4,c:'#ddd'});break;
 case 19:f.sw=.35;hurt(T,45,f,0,0,1);break;
 case 20:sh(f,T,{sp:400,d:5,r:5,life:.35,sy:rn(-12,12),c:'#f80',fx:['bn',5,.15]})}}
function special(f,T){const dd=Math.abs(T.x-f.x);if(SN[f.w]){f.lb=SN[f.w];f.lt=1.5}
 switch(f.w){
 case 0:sh(f,T,{sp:420,d:65,hm:1,pr:1,c:'#f0f',r:6,life:5,s2:1});break;
 case 1:f.mb=2;E.push({x:f.x,y:f.y-30,r:34,t:.5,c:'#f80',ring:1});txt(f.x,f.y-80,'발사 +15%');break;
 case 2:sh(f,T,{sp:230,d:70,ex:90,r:11.7,k:'rk',c:'#e0f',s2:1,ec:'#e0f'});break;
 case 4:for(let k=0;k<8;k++)P.push({x:f.x,y:f.y-35,vx:(k-3.5)*120,vy:-310-(k%2)*70,g:600,d:65,o:f,k:'gr',r:5,ex:47.5,life:3,c:'#222'});break;
 case 5:for(const a of[-.18,0,.18])sh(f,T,{sp:600,d:25,g:500,up:dd*.4,sy:a*500,k:'ar',c:'#fd0',s2:1});break;
 case 6:E.push({x:f.x,y:f.y-30,r:34,t:.5,c:'#a6f',ring:1});f.x=Math.min(870,Math.max(30,T.x-f.face*55));E.push({x:f.x,y:f.y-30,r:34,t:.5,c:'#a6f',ring:1});f.sw=.25;hurt(T,39,f);f.hp=Math.min(f.mx,f.hp+f.mx*.15);txt(f.x,f.y-80,'+'+Math.round(f.mx*.15));break;
 case 7:{const p=sh(f,T,{sp:520,d:40,g:300,up:dd*.3,k:'sp',r:7,life:5,c:'#4cf',s2:1,hm:1,bm:1});p.hit=new Set;p.ret=0}break;
 case 9:{const r=Math.floor(R()*4);f.lb=['불기둥','썬더볼트','아이스스피어','윈드슬래시'][r];f.lt=1.6;
  if(r==0){for(const o of[-60,0,60])Z.push({k:'fire',x:Math.min(880,Math.max(20,T.x+o)),w:44,r:0,t:6,acc:0,o:f})}
  else if(r==1)Z.push({k:'bolt',x:T.x,w:0,r:70,t:5,acc:0,o:f});
  else if(r==2){for(const y of[330,305,280])P.push({x:f.x+f.face*14,y,vx:f.face*600,vy:0,g:0,d:15,o:f,k:'ic',r:5,fx:['fz',5,1],sp:1,life:2,c:'#8ef'})}
  else{E.push({x:f.x,y:f.y-30,r:30,t:.3,c:'#9ff',ring:1});
   if(dd<300&&T.y>=335&&!T.ar){f.x=Math.min(880,Math.max(20,T.x-f.face*40));hurt(T,5,f);T.ar=1.3;
    for(let k=1;k<=3;k++)E.push({x:T.x,y:0,r:0,t:.25*k+.1,fn:()=>{if(!T.dead){hurt(T,20,f);E.push({x:T.x,y:T.y-60,r:34,t:.2,c:'#9ff',ring:1})}}})}
   else f.x=Math.min(880,Math.max(20,f.x+f.face*Math.min(dd,200)))}
  break}
 case 10:P.push({x:f.x+f.face*14,y:f.y-35,vx:f.face*480,vy:0,g:0,d:70,o:f,k:'sb',r:9,bm:1,ret:0,hit:new Set,fx:['sn',5,.5],life:6,c:'#4ef',sp:1});break;
 case 11:{T.x=Math.min(880,Math.max(20,f.x+f.face*45));hurt(T,20,f);T.ar=.7;E.push({x:T.x,y:T.y,r:30,t:.3,c:'#ca8',ring:1});
  E.push({x:T.x,y:340,r:0,t:.7,fn:()=>{if(!T.dead){hurt(T,30,f);T.sn=3;E.push({x:T.x,y:340,r:50,t:.4,c:'#ca8',ring:1})}}});break}
 case 12:{T.x=Math.min(880,Math.max(20,f.x+f.face*40));T.sn=2;
  for(let k=1;k<=20;k++)E.push({x:T.x,y:0,r:0,t:.1*k,fn:()=>{if(!T.dead){hurt(T,3,f);E.push({x:T.x+rn(-14,14),y:T.y-30+rn(-20,20),r:7,t:.08,c:'#fff'})}}})}
 case 13:{for(let k=0;k<12;k++){const a=k*Math.PI/6;P.push({x:f.x,y:f.y-35,vx:Math.cos(a)*500,vy:Math.sin(a)*500,g:0,d:10,o:f,k:'b',r:3,sp:1,life:1.2,c:'#fb4'})}f.vx=-f.face*420;f.vy=-260;break}
 case 14:f.wl=3;E.push({x:f.x,y:f.y-30,r:36,t:.4,c:'#4af',ring:1});break;
 case 15:{T.x=Math.min(880,Math.max(20,f.x+f.face*50));T.sn=1.2;for(let k=1;k<=4;k++)E.push({x:T.x,y:0,r:0,t:.25*k,fn:()=>{if(!T.dead){hurt(T,10,f);E.push({x:T.x,y:T.y-30,r:14,t:.1,c:'#fa6'})}}});break}
 case 16:Z.push({k:'gas',x:f.x,w:0,r:60,t:6,acc:0,o:f});break;
 case 17:Z.push({k:'bar',x:T.x,w:0,r:45,t:6,acc:0,o:f});break;
 case 18:sh(f,T,{sp:1300,d:80,r:5,c:'#fff',s2:1,fx:['sn',1.5,1]});break;
 case 19:P.push({x:f.x+f.face*20,y:330,vx:f.face*450,vy:0,g:0,d:40,o:f,k:'sw',r:12,hit:new Set,fx:['ar',1,1],life:2,c:'#a86',sp:1});break;
 case 20:Z.push({k:'fire',x:T.x,w:150,r:0,t:5,acc:0,o:f})}}
function near(f){let b=null,bd=1e9;for(const e of F)if(!e.dead&&e.team!=f.team){const d=Math.abs(e.x-f.x);if(d<bd){bd=d;b=e}}return b}
function step(dt){
 for(const f of F){f.t+=dt;f.hf-=dt;f.sw-=dt;f.lt-=dt;if(f.dead){f.dt+=dt;continue}
  for(const k of['bn','fz','pl','ar','bl','sn','lk','wl','jb'])if(f[k]>0)f[k]-=dt;
  if(f.bn>0)raw(f,f.mx*.005*dt);if(f.bl>0&&!f.dead)raw(f,f.mx*.01*dt);if(f.pt>0&&!f.dead){f.pt-=dt;raw(f,f.ps*3*dt);if(f.pt<=0)f.ps=0}if(f.tl>0&&!f.dead){f.tl-=dt;if(f.tl<=0&&f.tlo){boom(f.x,f.y-30,45,25,f.tlo);f.tlo=null}}if(f.dead)continue;
  f.bz=f.a==7?(f.hp<=f.mx*.25?2:f.hp<=f.mx*.5?1:0):0;if(f.bz){f.dm=f.bz==2?1.07:1;f.lb=f.bz==2?'최종 각성':'각성';f.lt=.15}
  if(f.dli>0){f.dli-=dt;f.lb='데드리스';f.lt=.15;if(f.dli<=0){f.dli=0;f.hp=Math.min(f.mx,f.dsum*.35);if(f.hp<1)die(f)}}
  if(f.dead)continue;
  if(f.a==13)f.hp=Math.min(f.mx,f.hp+f.mx*.015*dt);
  if(f.a==4&&!f.sh){f.st+=dt;if(f.st>=20)f.sh=1}
  const T=near(f),stun=f.fz>0||f.ar>0||f.sn>0;
  if(f.ar>0){f.y+=(260-f.y)*dt*3;f.vy=0}else{f.vy+=900*dt;f.y+=f.vy*dt;if(f.y>=340){f.y=340;f.vy=0}}
  let mv=0;
  if(T&&!stun){const dx=T.x-f.x,d=Math.abs(dx),want=WN[f.w];f.face=dx>0?1:-1;
   if(d>want+25)mv=f.face;else if(d<want-60&&!ML.includes(f.w)){f.rtm-=dt;if(f.rtm<-1)f.rtm=rn(.5,1.5);if(f.rtm>0&&f.x>90&&f.x<810)mv=-f.face}
   mv*=90*f.sp*(f.pl>0?.8:1)*(f.jb>0?.5:1)*(d>300?1.6:1)*[1,1.07,1.1][f.bz];
   f.jt-=dt;if(f.jt<=0&&f.y>=340&&!(f.jb>0)){f.vy=-380*(f.pl>0?.7:1);f.jt=rn(1.5,4)}
   for(const p of P)if(p.o.team!=f.team&&f.y>=340&&!(f.jb>0)&&Math.abs(p.x-f.x)<90&&Math.sign(f.x-p.x)==Math.sign(p.vx)&&Math.abs(p.y-(f.y-30))<35&&R()<.06){f.vy=-380;break}
   f.ac-=dt;f.sc-=dt;if(f.mb>0)f.mb-=dt;
   if(f.lk<=0&&d<450&&f.sc<=0&&W[f.w].cd){special(f,T);f.sc=W[f.w].cd}
   if(d<RG[f.w]&&f.ac<=0&&f.lk<=0){attack(f,T);f.ac=W[f.w].i/(f.mb>0?1.15:1)/[1,1.08,1.1][f.bz]/f.as}}
  if(stun)f.vx*=.5;f.mvx=stun?0:mv;f.x=Math.min(880,Math.max(20,f.x+(f.vx+f.mvx)*dt));f.vx*=Math.pow(.01,dt)}
 for(let i=P.length-1;i>=0;i--){const p=P[i];p.life-=dt;
  if(p.hm&&p.tg&&!p.tg.dead){const dx=p.tg.x-p.x,dy=p.tg.y-30-p.y,L=H(dx,dy)||1;p.vx=dx/L*420;p.vy=dy/L*420;if(L<30)p.hm=0}
  if(p.bm&&p.ret){const dx=p.o.x-p.x,dy=p.o.y-35-p.y,L=H(dx,dy)||1;p.vx=dx/L*450;p.vy=dy/L*450;if(L<22)p.life=0}
  p.vy+=p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;let rm=p.life<=0;
  if(!rm&&p.bm&&!p.ret&&(p.y>=340||p.x<10||p.x>890)){p.ret=1;p.hit=new Set;p.g=0;p.life=5}
  else if(!rm&&!p.bm&&(p.y>=340||p.x<0||p.x>900)){if(p.ex&&p.y>=340)boom(p.x,340,p.ex,p.d,p.o,p.fx,p.ec,p.sp);rm=1}
  if(!rm)for(const e of F){if(e.dead||e.team==p.o.team)continue;
   if(Math.abs(p.x-e.x)<e.r+p.r&&p.y>e.y-62*e.s&&p.y<e.y+4){
    if(p.hit&&p.hit.has(e))continue;
    if(((e.w==3&&R()<.3)||e.wl>0)&&!p.pr&&!p.bm){p.o=e;p.vx*=-1;p.vy*=-1;p.d*=1.1;p.tg=null;p.hm=0;txt(e.x,e.y-75,'패링!');break}
    if(p.hit)p.hit.add(e);
    if(p.ex){boom(p.x,p.y,p.ex,p.d,p.o,p.fx,p.ec,p.sp);rm=1}else{hit(e,p.d,p.o,p.fx,p.pr,p.k=='sp'&&p.ret);if(!p.hit)rm=1}
    break}}
  if(rm)P.splice(i,1)}
 for(let i=M.length-1;i>=0;i--){const m=M[i];for(const f of F)if(!f.dead&&f.team!=m.o.team&&Math.abs(f.x-m.x)<20&&f.y>=330){E.push({x:m.x,y:338,r:60,t:.5,c:'#f55',ring:1});hurt(f,f.hp*.5,m.o);M.splice(i,1);break}}
 for(let i=Z.length-1;i>=0;i--){const z=Z[i];z.t-=dt;z.acc+=dt;const tick=z.acc>=.5;if(tick)z.acc-=.5;
  for(const e of F){if(e.dead||e.team==z.o.team)continue;
   if(z.k=='fire'){if(tick&&Math.abs(e.x-z.x)<z.w/2+e.r){hurt(e,5,z.o);e.bn=5}}
   else if(z.k=='gas'){if(tick&&Math.abs(e.x-z.x)<z.r*2){hurt(e,4,z.o);e.ps=Math.min(5,e.ps+1);e.pt=5}}else if(z.k=='bar'){if(Math.abs(e.x-z.x)<z.r*2)e.jb=.3}else{const dx=z.x-e.x;if(Math.abs(dx)<z.r*2){e.x+=dx*2*dt;if(Math.abs(dx)<z.r){e.pl=5;e.lk=.2;if(tick)hurt(e,3.5,z.o)}}}}
  if(z.t<=0)Z.splice(i,1)}
 for(let i=E.length-1;i>=0;i--){const e=E[i];e.t-=dt;if(e.tx)e.y-=25*dt;if(e.t<=0){e.fn&&e.fn();E.splice(i,1)}}
 if(!ended){const al=F.filter(f=>!f.dead);if(new Set(al.map(f=>f.team)).size<=1){ended=1;win=al[0]?al[0].i:-1}}else et+=dt;}

const snap=()=>({F:F.map(f=>({i:f.i,n:f.n,w:f.w,team:f.team,x:Math.round(f.x),y:Math.round(f.y),face:f.face,hp:f.hp,mx:f.mx,dead:f.dead,dt:f.dt,hf:f.hf,sw:f.sw,s:f.s,t:f.t,mvx:f.mvx,bn:f.bn,fz:f.fz,pl:f.pl,bl:f.bl,ar:f.ar,sh:f.sh,mb:f.mb,sn:f.sn,wl:f.wl,ps:f.ps,tl:f.tl,lb:f.lt>0?f.lb:''})),P:P.map(p=>({x:Math.round(p.x),y:Math.round(p.y),vx:Math.round(p.vx),vy:Math.round(p.vy),k:p.k,r:p.r,c:p.c,ex:p.ex,hm:p.hm,sp:p.sp,ret:p.ret})),M:M.map(m=>({x:Math.round(m.x)})),Z:Z.map(z=>({k:z.k,x:Math.round(z.x),r:z.r,w:z.w})),E:E.map(e=>({x:Math.round(e.x),y:Math.round(e.y),r:e.r,t:e.t,c:e.c,tx:e.tx,rock:e.rock,ring:e.ring})),over:ended&&et>1.2,win});
if(typeof module!='undefined')module.exports={W,A,init,step,snap,get:()=>({F,P,M,E,Z,ended,et,win,mode}),set:s=>{F=s.F;P=s.P;M=s.M;E=s.E;Z=s.Z;ended=s.ended;et=s.et;win=s.win;mode=s.mode}};
