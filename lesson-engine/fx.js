// fx.js: celebrations + combo meter. Loaded last; wraps onCorrect / onWrong / award / hud. Works for every lesson.
(function(){
  const RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  const st=document.createElement('style');st.textContent=`
  .fxc{position:fixed;inset:0;pointer-events:none;z-index:70}
  .toast{position:fixed;left:50%;top:calc(env(safe-area-inset-top,0px) + 14px);transform:translateX(-50%);z-index:75;pointer-events:none;
    background:linear-gradient(135deg,#f97316,#db2777);color:#fff;font-weight:800;font-size:22px;border-radius:999px;padding:8px 22px;box-shadow:0 6px 18px rgba(0,0,0,.25);animation:tin 1.9s ease forwards;white-space:nowrap}
  .toast.cool{background:#64748b;font-size:17px}
  @keyframes tin{0%{opacity:0;transform:translate(-50%,-20px) scale(.6)}15%{opacity:1;transform:translate(-50%,0) scale(1.12)}25%{transform:translate(-50%,0) scale(1)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-10px)}}
  .plus{position:fixed;z-index:72;pointer-events:none;font-weight:800;font-size:22px;color:#16a34a;animation:up 1s ease-out forwards}
  @keyframes up{to{transform:translateY(-60px);opacity:0}}
  #hStreak{transition:transform .2s}
  #hStreak.hot{background:#fed7aa;animation:pulse2 1.2s infinite}
  #hStreak.blaze{background:#fdba74;animation:pulse2 .8s infinite;box-shadow:0 0 12px #f97316}
  #hStreak.inferno{background:#fb923c;color:#fff;animation:pulse2 .5s infinite;box-shadow:0 0 18px #ef4444}
  #hStreak.fizz{animation:fizz .6s;background:#e2e8f0;color:#64748b}
  @keyframes pulse2{50%{transform:scale(1.12)}}
  @keyframes fizz{30%{transform:scale(.8) rotate(-6deg)}60%{transform:scale(1.05) rotate(4deg)}}
  .opts button.right{animation:pop .35s}@keyframes pop{50%{transform:scale(1.05)}}
  @media (prefers-reduced-motion:reduce){.toast,.plus,#hStreak.hot,#hStreak.blaze,#hStreak.inferno,#hStreak.fizz,.opts button.right{animation:none}}`;
  document.head.appendChild(st);
  const AR=U.lang=='ar',T=AR?{combo:'كومبو',lost:'💨 الكومبو انطفى',names:['حلو! 👌','مشتعل! 🔥','محدش يوقفك! ⚡','أسطوري! 🌟']}
                            :{combo:'COMBO',lost:'💨 Combo lost',names:['Nice! 👌','On fire! 🔥','Unstoppable! ⚡','Legendary! 🌟']};
  let lx=innerWidth/2,ly=innerHeight/2;
  document.addEventListener('pointerdown',e=>{lx=e.clientX;ly=e.clientY;},true);
  const COLS=['#f43f5e','#facc15','#22c55e','#3b82f6','#a855f7','#f97316','#06b6d4'];
  // particle bursts on a canvas: kind 'spark' (small, at the tap) or 'fireworks' (big, several rockets)
  function particles(kind){
    if(RM)return;
    const c=document.createElement('canvas');c.className='fxc';c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;
    c.style.width=innerWidth+'px';c.style.height=innerHeight+'px';document.body.appendChild(c);
    const g=c.getContext('2d');g.scale(devicePixelRatio,devicePixelRatio);const P=[];
    const boom=(x,y,n,sp)=>{for(let i=0;i<n;i++){const a=Math.random()*6.283,v=sp*(.4+Math.random()*.8);P.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:1,c:pick(COLS),r:2+Math.random()*2.5});}};
    if(kind=='spark')boom(lx,ly,22,4.5);
    else{const n=kind=='fireworks'?5:3;for(let k=0;k<n;k++)setTimeout(()=>boom(innerWidth*(.2+Math.random()*.6),innerHeight*(.18+Math.random()*.35),55,6.5),k*280);}
    const end=performance.now()+(kind=='spark'?900:2600);
    (function f(now){g.clearRect(0,0,innerWidth,innerHeight);
      P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.12;p.vx*=.98;p.l-=.016;if(p.l>0){g.globalAlpha=Math.max(0,p.l);g.fillStyle=p.c;g.beginPath();g.arc(p.x,p.y,p.r,0,6.283);g.fill();}});
      if(now<end)requestAnimationFrame(f);else c.remove();})(performance.now());
  }
  function toast(txt,cls){document.querySelectorAll('.toast').forEach(t=>t.remove());const t=document.createElement('div');t.className='toast '+(cls||'');t.textContent=txt;document.body.appendChild(t);setTimeout(()=>t.remove(),2000);}
  function plus(){if(RM)return;const d=document.createElement('div');d.className='plus';d.textContent='+1';d.style.left=(lx-10)+'px';d.style.top=(ly-30)+'px';document.body.appendChild(d);setTimeout(()=>d.remove(),1000);}
  const _oc=onCorrect,_ow=onWrong,_aw=award,_hud=hud;
  onCorrect=function(k){_oc(k);const s=S.streak;plus();particles('spark');
    const m=[3,5,10,15,20,30];if(m.includes(s)||(s>30&&s%10==0)){const lvl=s<5?0:s<10?1:s<20?2:3;toast(`🔥 ${T.combo} x${ar(s)} · ${T.names[lvl]}`);if(s>=10)particles('fireworks');else if(s>=5)particles('burst');}};
  onWrong=function(){const was=S.streak;_ow();if(was>=3){toast(`${T.lost} (x${ar(was)})`,'cool');const h=$('hStreak');h.classList.remove('fizz');void h.offsetWidth;h.classList.add('fizz');}};
  award=function(id){const had=has(id);_aw(id);if(!had&&(id=='crown'||id=='collector'||id=='explorer'))setTimeout(()=>particles('fireworks'),300);};
  hud=function(){_hud();const h=$('hStreak'),s=S.streak;if(!h)return;
    h.classList.remove('hot','blaze','inferno');if(s>=10)h.classList.add('inferno');else if(s>=5)h.classList.add('blaze');else if(s>=3)h.classList.add('hot');
    h.textContent=(s>=10?'🔥🔥🔥 ':s>=5?'🔥🔥 ':'🔥 ')+ar(s);};
  hud();
})();
