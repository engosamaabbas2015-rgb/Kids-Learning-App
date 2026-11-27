// ---------- engine: UI, state, rewards, practice, challenge ----------
U=UIP[LESSON.ui||'ar_f'];
const COL=[['#fef08a','#f59e0b'],['#fde68a','#d97706'],['#bbf7d0','#15803d'],['#bfdbfe','#2563eb'],['#c7d2fe','#4338ca'],['#e0f2fe','#0284c7'],['#ddd6fe','#7c3aed'],['#fed7aa','#c2410c'],['#fecaca','#dc2626'],['#fef9c3','#ca8a04'],['#fde68a','#b45309'],['#e9d5ff','#9333ea']];
const IDS=['first','aE','aH','bE','bH','cE','cH','explorer','s5','s10','crown','collector'];
const SN=LESSON.secs.map(s=>s.short||s.h);
const HINT={first:U.m1,aE:U.mE(SN[0]),aH:U.mH(SN[0]),bE:U.mE(SN[1]),bH:U.mH(SN[1]),cE:U.mE(SN[2]),cH:U.mH(SN[2]),explorer:LESSON.mX||U.mX,s5:U.m5,s10:U.m10,crown:U.mC,collector:U.mAll};
if(LESSON.finite){HINT.aE=U.fE(SN[0]);HINT.aH=U.fH(SN[0]);HINT.bE=U.fE(SN[1]);HINT.bH=U.fH(SN[1]);HINT.cE=U.fE(SN[2]);HINT.cH=U.fH(SN[2]);}
const STK=IDS.map((id,i)=>({id,e:LESSON.stk[i][0],n:LESSON.stk[i][1],h:HINT[id],c:COL[i]}));
const NT=LESSON.M?LESSON.M.length:0;
const fresh=()=>({earned:[],counts:{aE:0,aH:0,bE:0,bH:0,cE:0,cH:0},explored:[],streak:0,hearts:3,fin:{}});
let S=fresh();
try{const s=JSON.parse(localStorage.getItem(LESSON.key));if(s&&s.earned)S=Object.assign(fresh(),s);}catch(e){}
function save(){try{localStorage.setItem(LESSON.key,JSON.stringify(S));}catch(e){}}
const has=id=>S.earned.includes(id);

// ----- page skeleton -----
document.documentElement.lang=U.lang;document.documentElement.dir=U.dir;
document.documentElement.style.setProperty('--font',"'"+U.font+"'");
document.getElementById('fontlink').href=U.fontUrl;
if(LESSON.finite){const st=document.createElement('style');st.textContent='.fprog{display:flex;align-items:center;gap:8px;justify-content:space-between;margin-bottom:6px;font-weight:800;color:#7c3aed}.dots{display:flex;gap:4px;flex-wrap:wrap}.dots i{width:12px;height:12px;border-radius:50%;background:#e5e7eb;border:2px solid #c4b5fd}.dots i.d{background:#22c55e;border-color:#15803d}.dots i.c{border-color:#f59e0b;background:#fde68a}.fdone{text-align:center;padding:8px}.fdone .big{margin-top:8px}.medals{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.md{background:#f3f4f6;border-radius:14px;padding:6px 2px;text-align:center;filter:grayscale(1);opacity:.55}.md.on{filter:none;opacity:1;background:#fef9c3;border:2px solid #f59e0b}.md span{font-size:30px;display:block}.md small{font-size:11px;font-weight:700;line-height:1.2;display:block}';document.head.appendChild(st);}
if(LESSON.css){const st=document.createElement('style');st.textContent=LESSON.css;document.head.appendChild(st);}
document.title=LESSON.title.replace(/^\S+\s/,'');$('hTitle').textContent=LESSON.title;
const TABS=[['learn',LESSON.tabs[0]],['sa',LESSON.tabs[1]],['sb',LESSON.tabs[2]],['sc',LESSON.tabs[3]],['chal',U.chalT],['stk',U.stkT]];
$('nav').innerHTML=TABS.map((t,i)=>`<button data-t="${t[0]}"${i?'':' class="on"'}>${t[1]}</button>`).join('');
const sec=(id,inner,on)=>`<section id="${id}"${on?' class="on"':''}>${inner}</section>`;
$('secs').innerHTML=sec('learn',LESSON.learnHTML,1)
 +LESSON.secs.map((s,i)=>sec('s'+'abc'[i],`<h2>${s.h}</h2><div class="bubble">${s.intro}</div><div id="p${'ABC'[i]}"></div>`)).join('')
 +sec('chal',`<h2>${U.chalT}</h2><div class="bubble">${U.chalP}</div><div id="chalBox" style="margin-top:10px"></div>`)
 +sec('stk',`<h2>${U.stkT}</h2><p style="margin:2px 0 10px">${U.stkP}</p><div class="stk" id="stkGrid"></div><div id="medalBox"></div><div style="text-align:center;margin-top:16px"><button class="big gr" id="resetBtn">${U.reset}</button></div>`);

function hud(){
  $('hHearts').textContent='❤️'.repeat(S.hearts)+'🤍'.repeat(3-S.hearts);
  $('hStreak').textContent='🔥 '+ar(S.streak);$('hStk').textContent='⭐ '+ar(S.earned.length)+'/'+ar(12);drawStickers();
}
function discHTML(s,x){return `<div class="disc ${x||''}" style="background:radial-gradient(circle at 35% 30%,${s.c[0]},${s.c[1]})">${s.e}</div>`;}
function drawStickers(){
  $('stkGrid').innerHTML=STK.map(s=>{const got=has(s.id);let p='';
    if(!got&&S.counts[s.id]!==undefined){if(LESSON.finite){const f=S.fin['p'+s.id[0].toUpperCase()+s.id[1]];p=f&&f.n?` (${ar(f.d.length)}/${ar(f.n)})`:'';}else p=` (${ar(S.counts[s.id])}/${ar(3)})`;}
    if(!got&&s.id=='explorer'&&NT)p=` (${ar(S.explored.length)}/${ar(NT)})`;
    return `<div class="st ${got?'':'locked'}">${discHTML(s).replace('</div>',got?'</div>':'<span class="lock">🔒</span></div>')}${s.n}<small>${s.h}${p}</small></div>`;}).join('');
  if(LESSON.finite&&$('medalBox'))$('medalBox').innerHTML=`<h3 style="margin:14px 0 6px">${U.medT}</h3><div class="medals">`+LESSON.secs.map((sc,i)=>['E','H','X'].map((l,j)=>{const f=S.fin['p'+'ABC'[i]+l],on=f&&f.m;return `<div class="md ${on?'on':''}"><span>${['🥉','🥈','🥇'][j]}</span><small>${SN[i]}<br>${U.lvn[j]}</small></div>`;}).join('')).join('')+'</div>';
}
const Q=[];let showing=false;
function popup(html,cf){Q.push({html,cf});if(!showing)nextPop();}
function nextPop(){
  if(!Q.length){showing=false;$('ov').classList.remove('on');return;}
  showing=true;const p=Q.shift();
  $('pop').innerHTML=p.html+`<div style="margin-top:12px"><button class="big g" id="popOk">${U.ok}</button></div>`;
  $('ov').classList.add('on');if(p.cf)confetti();$('popOk').onclick=nextPop;
}
function confetti(){
  const cols=['#f43f5e','#facc15','#22c55e','#3b82f6','#a855f7','#f97316'];
  for(let i=0;i<45;i++){const d=document.createElement('div');d.className='conf';
    d.style.left=Math.random()*100+'vw';d.style.background=pick(cols);d.style.animationDuration=(1.6+Math.random()*1.6)+'s';d.style.animationDelay=(Math.random()*.4)+'s';
    document.body.appendChild(d);setTimeout(()=>d.remove(),3800);}
}
function award(id){
  if(has(id))return;S.earned.push(id);const s=STK.find(x=>x.id==id);
  popup(`<h2>${U.newSt}</h2>${discHTML(s)}<b style="font-size:22px">${s.n}</b><div>${s.h}</div>`,true);
  if(id!=='collector'&&STK.filter(x=>x.id!=='collector').every(x=>has(x.id)))award('collector');
  save();hud();
}
function onCorrect(key){
  S.streak++;if(!has('first'))award('first');
  if(key&&!has(key)){S.counts[key]++;if(S.counts[key]>=3)award(key);}
  if(S.streak>=5)award('s5');if(S.streak>=10)award('s10');save();hud();
}
function onWrong(){
  S.streak=0;S.hearts--;
  const h=$('hHearts');h.classList.remove('shake');void h.offsetWidth;h.classList.add('shake');
  if(S.hearts<=0){
    S.hearts=3;
    if(S.earned.length){
      const id=S.earned.pop(),s=STK.find(x=>x.id==id);
      if(S.counts[id]!==undefined)S.counts[id]=0;
      if(LESSON.finite&&typeof finReset==='function')finReset(id);
      if(id=='explorer'){S.explored=[];drawTL();}
      popup(`<h2>${U.oh}</h2>${discHTML(s,'fly')}<div>${U.flew(s.n)}</div><div>${U.refill}</div>`);
    }else popup(`<h2>${U.refill}</h2><div>${U.slow}</div>`);
  }
  save();hud();
}
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('nav button').forEach(x=>x.classList.toggle('on',x==b));
  document.querySelectorAll('section').forEach(s=>s.classList.toggle('on',s.id==b.dataset.t));
  if(b.dataset.t=='chal'&&!CH.started)startChal();
  window.scrollTo({top:0,behavior:'smooth'});
});
// ----- optional timeline in the Learn tab (needs #tl #tcard #learnProg in learnHTML) -----
function drawTL(){
  if(!NT||!$('tl'))return;
  const prog=()=>$('learnProg').textContent=has('explorer')?U.tlDone:U.tlOpen+ar(S.explored.length)+'/'+ar(NT);
  $('tl').innerHTML=LESSON.M.map((m,i)=>`<button data-i="${i}" class="${S.explored.includes(i)?'seen':''}">${m.e}<br>${m.n}<small>${yr(m.y)}</small></button>`).join('');prog();
  $('tl').querySelectorAll('button').forEach(b=>b.onclick=()=>{
    const i=+b.dataset.i,m=LESSON.M[i];
    $('tl').querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
    $('tcard').innerHTML=`<b style="font-size:20px">${m.e} ${m.n} (${yr(m.y)})</b><div class="row2">${U.who} ${m.who}</div><div class="row2">${U.what} ${m.why}</div><div class="row2">${U.res} ${m.res}</div>`;
    if(!S.explored.includes(i)){S.explored.push(i);b.classList.add('seen');}
    if(S.explored.length>=NT)award('explorer');prog();save();hud();
  });
}
