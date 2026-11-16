const http=require('http'),fs=require('fs'),path=require('path'),{Server}=require('socket.io'),S=require('./public/sim.js');
const PORT=process.env.PORT||3000,PUB=path.join(__dirname,'public'),MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8'};
const srv=http.createServer((q,r)=>{const u=q.url.split('?')[0],f=path.join(PUB,u==='/'?'index.html':path.normalize(u));
 if(!f.startsWith(PUB)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);return r.end()}
 r.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'text/plain'});fs.createReadStream(f).pipe(r)});
const io=new Server(srv,{cors:{origin:'*'}});
const rooms=new Map();
const code=()=>{let c;do c=String(100000+Math.floor(Math.random()*900000));while(rooms.has(c));return c};
const addP=(r,id,nick)=>{const n0=r.players.filter(p=>p.t==0).length,n1=r.players.length-n0;
 r.players.push({id,nick,w:8,a:null,t:n0>n1?1:0,wl:3,al:1,iw:[],ia:[]})};
const bc=r=>{const pub={code:r.code,host:r.host,mode:r.mode,phase:r.phase,players:r.players.map(p=>({id:p.id,nick:p.nick,w:p.w,a:p.a,t:p.t}))};
 for(const p of r.players)if(!p.left)io.to(p.id).emit('room',{...pub,me:{wl:p.wl,al:p.al,iw:p.iw,ia:p.ia}})};
function fixHost(r){const a=r.players.filter(p=>!p.left);if(!a.length){clearInterval(r.iv);rooms.delete(r.code);return 0}
 if(!a.some(p=>p.id==r.host))r.host=a[0].id;return 1}
function finish(r){clearInterval(r.iv);r.phase='lobby';r.players=r.players.filter(p=>!p.left);
 for(const p of r.players)Object.assign(p,{w:8,a:null,wl:3,al:1,iw:[],ia:[]});
 if(fixHost(r))bc(r)}
io.on('connection',s=>{
 let r=null;const nk=n=>String(n||'').trim().slice(0,10),me=()=>r&&r.players.find(p=>p.id==s.id);
 s.on('create',(d,cb)=>{const n=nk(d&&d.nick);if(!n)return cb({err:'닉네임을 입력하세요'});
  r={code:code(),host:s.id,mode:'ffa',phase:'lobby',players:[],st:null,iv:null};addP(r,s.id,n);rooms.set(r.code,r);s.join(r.code);cb({ok:1});bc(r)});
 s.on('join',(d,cb)=>{const n=nk(d&&d.nick),q=rooms.get(String(d&&d.code||'').trim());
  if(!n)return cb({err:'닉네임을 입력하세요'});if(!q)return cb({err:'방을 찾을 수 없어요'});
  if(q.phase!='lobby')return cb({err:'이미 전투 중이에요'});if(q.players.length>=4)return cb({err:'방이 가득 찼어요'});
  if(q.players.some(p=>p.nick==n))return cb({err:'이미 사용 중인 닉네임이에요'});
  r=q;addP(r,s.id,n);s.join(r.code);cb({ok:1});bc(r)});
 s.on('roll',k=>{const p=me();if(!p||r.phase!='lobby')return;
  if(k==0&&p.wl>0){p.wl--;const rest=[0,1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,17,18,19,20].filter(x=>!p.iw.includes(x));p.iw.push(rest[Math.floor(Math.random()*rest.length)])}else if(k==1&&p.al>0){p.al--;p.ia.push([0,1,2,3,4,5,7,8,9,10,11,12,13][Math.floor(Math.random()*13)])}bc(r)});
 s.on('equip',d=>{const p=me();if(!p||r.phase!='lobby'||!d)return;
  if(d.k=='w'&&p.iw[d.j]!=null)p.w=p.iw[d.j];if(d.k=='a'&&p.ia[d.j]!=null)p.a=p.ia[d.j];bc(r)});
 s.on('mode',m=>{if(r&&r.host==s.id&&r.phase=='lobby'){r.mode=m=='team'?'team':'ffa';bc(r)}});
 s.on('team',id=>{if(r&&r.host==s.id&&r.phase=='lobby'){const p=r.players.find(x=>x.id==id);if(p){p.t^=1;bc(r)}}});
 s.on('start',()=>{if(!r||r.host!=s.id||r.phase!='lobby')return;const ps=r.players;
  if(ps.length<2)return s.emit('err','플레이어가 2명 이상 필요해요');
  if(r.mode=='team'&&(!ps.some(p=>p.t==0)||!ps.some(p=>p.t==1)))return s.emit('err','양 팀에 최소 1명씩 필요해요');
  r.phase='battle';S.init(ps.map(p=>({n:p.nick,w:p.w,a:p.a,t:p.t})),r.mode);r.st=S.get();bc(r);io.to(r.code).emit('begin');
  const q=r;q.iv=setInterval(()=>{S.set(q.st);S.step(1/30);q.st=S.get();const sn=S.snap();io.to(q.code).emit('snap',sn);if(sn.over)finish(q)},33)});
 s.on('disconnect',()=>{if(!r)return;const i=r.players.findIndex(p=>p.id==s.id);if(i<0)return;
  if(r.phase=='battle'){r.players[i].left=1;const f=r.st.F[i];if(f&&!f.dead){f.dead=1;f.hp=0;f.dt=0}}else r.players.splice(i,1);
  if(fixHost(r))bc(r)})});
srv.listen(PORT,()=>console.log('멜론 샌드박스 서버: http://localhost:'+PORT));
