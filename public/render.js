const $=q=>document.querySelector(q),cv=$('#cv'),c=cv.getContext('2d');
function draw(){c.clearRect(0,0,900,400);c.fillStyle='#7cb342';c.fillRect(0,340,900,60);c.fillStyle='#5d8f2f';c.fillRect(0,340,900,5);
 for(const m of M){c.fillStyle=Math.sin(performance.now()/150)>0?'#f33':'#822';c.beginPath();c.arc(m.x,340,7,Math.PI,0);c.fill()}
 for(const z of Z){if(z.k=='fire'){const g=c.createLinearGradient(0,0,0,340);g.addColorStop(0,'rgba(255,120,0,.15)');g.addColorStop(1,'rgba(255,60,0,.7)');c.fillStyle=g;c.fillRect(z.x-z.w/2,0,z.w,340)}else{c.globalAlpha=.4;c.fillStyle=z.k=='gas'?'#6c3':z.k=='bar'?'#fb3':'#74f';c.beginPath();c.arc(z.x,290,z.r*2,0,7);c.fill();c.globalAlpha=.8;c.fillStyle=z.k=='gas'?'#4a2':z.k=='bar'?'#fe8':'#fe4';c.beginPath();c.arc(z.x,290,z.r,0,7);c.fill();c.globalAlpha=1}}for(const f of F)body(f);
 for(const p of P){const col=p.k=='sp'&&p.ret?'#e33':p.c;c.strokeStyle=c.fillStyle=col;if(p.sp){c.shadowColor=col;c.shadowBlur=14}c.lineWidth=(p.k=='sp'?3:Math.max(2,p.r*.6))*(p.sp?1.8:1);const l=(p.k=='sp'?.06:p.k=='ar'?.04:.025)*(p.sp?2.2:1);c.beginPath();c.moveTo(p.x,p.y);c.lineTo(p.x-p.vx*l,p.y-p.vy*l);c.stroke();if(p.ex||p.hm||p.sp){c.beginPath();c.arc(p.x,p.y,p.r+(p.sp?2:0),0,7);c.fill()}c.shadowBlur=0}
 c.textAlign='center';for(const e of E){if(e.tx){c.font='bold 14px sans-serif';c.fillStyle='#d22';c.globalAlpha=Math.min(1,e.t*2);c.fillText(e.tx,e.x,e.y);c.globalAlpha=1;continue}
  c.globalAlpha=Math.min(1,e.t*3);c.fillStyle=e.c;if(e.rock){for(let k=-2;k<=2;k++){c.beginPath();c.moveTo(e.x+k*20-8,340);c.lineTo(e.x+k*20,340-30*(1-Math.abs(k)*.2));c.lineTo(e.x+k*20+8,340);c.fill()}}else{c.beginPath();c.arc(e.x,e.y,e.r,0,7);c.fill();if(e.ring){c.strokeStyle=e.c;c.lineWidth=4;c.beginPath();c.arc(e.x,e.y,e.r*1.4,0,7);c.stroke()}}c.globalAlpha=1}
 $('#al').textContent=' 생존 '+F.filter(f=>!f.dead).length+' '}
function body(f){const s=f.s,col=mode=='team'?COL[f.team]:COL[f.i];
 c.save();c.translate(f.x,f.y);c.scale(s,s);c.lineWidth=3;c.lineCap='round';
 if(f.dead){const o=Math.min(f.dt*30,12);c.strokeStyle=col;c.beginPath();c.moveTo(-34,-3);c.lineTo(-8,-3);c.moveTo(-20,-3);c.lineTo(-24,-12);c.stroke();
  for(const g of[-1,1]){c.fillStyle='#ff6b6b';c.strokeStyle='#4f8a2a';c.lineWidth=2;c.beginPath();c.arc(g*o,-12,14,g<0?Math.PI/2:-Math.PI/2,g<0?Math.PI*1.5:Math.PI/2);c.closePath();c.fill();c.stroke()}
  c.restore();return}
 if(f.mb>0){c.strokeStyle='#f80';c.lineWidth=3;c.beginPath();c.arc(0,-28,36+Math.sin(f.t*20)*3,0,7);c.stroke();c.lineWidth=3}if(f.wl>0){const a0=f.face>0?0:Math.PI;c.strokeStyle='#4af';c.lineWidth=5;c.beginPath();c.arc(0,-30,36,a0-1.1,a0+1.1);c.stroke();c.lineWidth=3}if(f.hf>0)c.globalAlpha=.6;const sw=Math.sin(f.t*12)*(Math.abs(f.mvx)>1?9:0);
 c.strokeStyle=col;c.beginPath();c.moveTo(0,-34);c.lineTo(0,-14);c.moveTo(0,-14);c.lineTo(-sw,0);c.moveTo(0,-14);c.lineTo(sw,0);c.moveTo(0,-30);c.lineTo(f.face*14,-22);c.stroke();
 c.fillStyle='#8fd14f';c.strokeStyle='#3b7a1e';c.lineWidth=2;c.beginPath();c.arc(0,-48,14,0,7);c.fill();c.stroke();
 c.beginPath();c.ellipse(0,-48,5,14,0,0,7);c.stroke();c.beginPath();c.ellipse(0,-48,10,14,0,0,7);c.stroke();
 c.fillStyle='#222';c.fillRect(f.face*5-1,-52,3,3);
 c.save();c.translate(f.face*14,-24);c.scale(f.face,1);c.rotate(f.sw>0?-1.2+(.25-f.sw)*10:0);c.font='20px serif';c.textAlign='center';c.fillText(EM[f.w],0,6);c.restore();
 c.restore();c.globalAlpha=1;
 const top=f.y-68*s;c.fillStyle='#0005';c.fillRect(f.x-22,top,44,5);c.fillStyle=f.hp/f.mx>.5?'#4c4':f.hp/f.mx>.25?'#ec3':'#e44';c.fillRect(f.x-22,top,44*Math.max(0,f.hp/f.mx),5);
 c.font='11px sans-serif';c.textAlign='center';c.fillStyle='#223';c.fillText(f.n+(f.bn>0?'🔥':'')+(f.fz>0?'🧊':'')+(f.pl>0?'⚡':'')+(f.bl>0?'🩸':'')+(f.ar>0?'🌪':'')+(f.sh?'🛡':'')+(f.sn>0?'💫':'')+(f.ps>0?'☠':'')+(f.tl>0?'📜':''),f.x,top-4);if(f.lb){c.font='bold 13px sans-serif';c.fillStyle='#e60';c.fillText(f.lb,f.x,top-18)}}
