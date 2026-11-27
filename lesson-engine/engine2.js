// ----- practice (MCQ) -----
function makePractice(boxId,keyBase,bank){
  const box=$(boxId),FIN=LESSON.finite||0;let lv='E',cur=null,hi=0,locked=false,sel=null,last=-1,ci=-1,sets={};
  box.innerHTML=`<div class="lv"><button data-l="E" class="on">${U.lvE}</button><button data-l="H">${U.lvH}</button><button data-l="X">${U.lvX}</button></div>
  <div class="qbox"><div class="fprog"></div><div class="qtext"></div><div class="opts"></div>
  <div class="row"><button class="big g ck" disabled>${U.check}</button><button class="big o hp">${U.help}</button><button class="big gr sk">${U.skip}</button>${LESSON.conf?`<button class="big gr cf" aria-pressed="false">${U.notSure||'🤔 Not sure'}</button>`:''}</div><div class="fb"></div><div class="fdone" style="display:none"></div></div>`;
  const qt=box.querySelector('.qtext'),ops=box.querySelector('.opts'),ck=box.querySelector('.ck'),fb=box.querySelector('.fb'),rw=box.querySelector('.qbox .row'),fp=box.querySelector('.fprog'),fd=box.querySelector('.fdone');
  const fk=l=>boxId+l,LV=['E','H','X'],lvLab=[U.lvE,U.lvH,U.lvX];
  // ---- finite mode: a fixed, seeded, non-repeating set of questions per level ----
  const rng=sd=>{let a=sd>>>0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};};
  const hash=t=>{let h=2166136261;for(let i=0;i<t.length;i++){h^=t.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;};
  function genAll(){
    const seen=new Set(),orig=Math.random;
    LV.forEach(l=>{
      const st=S.fin[fk(l)]=S.fin[fk(l)]||{r:0,d:[],m:0,n:0},fns=bank[l],out=[];
      Math.random=rng(hash(LESSON.key+boxId+l+st.r));
      try{for(let t=0;t<800&&out.length<FIN;t++){const q=fns[t%fns.length](l==='E'?3:4),k=q.q.replace(/<[^>]+>/g,'')+'|'+q.ans;if(!seen.has(k)){seen.add(k);out.push(q);}}}finally{Math.random=orig;}
      sets[l]=out;st.n=out.length;st.d=st.d.filter(i=>i<out.length);
    });
  }
  function paint(){
    box.querySelectorAll('.lv button').forEach((b,i)=>{const f=S.fin[fk(LV[i])];b.textContent=lvLab[i]+(f&&f.m?' ✅':'');});
    const f=S.fin[fk(lv)];if(!f)return;
    fp.innerHTML=`<span>${U.fq(Math.min(f.d.length+1,f.n),f.n)}</span><span class="dots">${sets[lv].map((_,i)=>`<i class="${f.d.includes(i)?'d':i===ci?'c':''}"></i>`).join('')}</span>`;
  }
  function showDone(){
    const li=LV.indexOf(lv);qt.style.display=ops.style.display=rw.style.display=fb.style.display=fp.style.display='none';
    fd.style.display='block';
    fd.innerHTML=`<div style="font-size:64px">${['🥉','🥈','🥇'][li]}</div><h3>${U.fDoneT}</h3><div>${U.fDoneP(U.lvn[li])}</div>`+(li<2?`<button class="big g" id="${boxId}nx">${U.fNext}</button>`:`<p>${U.fAll}</p>`);
    const nb=$(boxId+'nx');if(nb)nb.onclick=()=>box.querySelectorAll('.lv button')[li+1].click();
  }
  function complete(){
    const f=S.fin[fk(lv)],li=LV.indexOf(lv);if(f.m)return;f.m=1;
    popup(`<h2>${U.fDoneT}</h2><div style="font-size:72px">${['🥉','🥈','🥇'][li]}</div><b style="font-size:20px">${U.medals[li]}</b><div>${SN['abc'.indexOf(keyBase)]}</div>`,true);
    if(lv!=='X')award(keyBase+lv);save();hud();paint();
  }
  window.__fin=window.__fin||{};
  window.__fin[boxId]={regen(){genAll();ci=-1;paint();next();}};
  function next(){
    locked=false;sel=null;ck.disabled=true;hi=0;if(cfb){cfb.classList.remove('on');cfb.setAttribute('aria-pressed','false');}fb.className='fb';fb.textContent='';
    qt.style.display=ops.style.display=rw.style.display=fb.style.display=fp.style.display='';fd.style.display='none';
    if(FIN){
      const f=S.fin[fk(lv)],pend=sets[lv].map((_,i)=>i).filter(i=>!f.d.includes(i));
      if(!pend.length){paint();showDone();return;}
      ci=pend.find(i=>i>ci);if(ci===undefined)ci=pend[0];cur=sets[lv][ci];paint();
    }else{
      const fns=bank[lv];let i;do{i=ri(0,fns.length-1);}while(fns.length>1&&i===last&&Math.random()<.8);last=i;
      cur=fns[i](lv==='E'?3:4);fp.style.display='none';
    }
    qt.innerHTML=cur.q;ops.innerHTML=cur.opts.map(o=>`<button>${o}</button>`).join('');
    ops.querySelectorAll('button').forEach(b=>b.onclick=()=>{if(locked||b.classList.contains('wrong'))return;
      ops.querySelectorAll('button').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');sel=b;ck.disabled=false;});
  }
  box.querySelectorAll('.lv button').forEach(b=>b.onclick=()=>{lv=b.dataset.l;ci=-1;box.querySelectorAll('.lv button').forEach(x=>x.classList.toggle('on',x==b));next();});
  const cfb=box.querySelector('.cf'),unsure=()=>!!(cfb&&cfb.classList.contains('on'));
  if(cfb)cfb.onclick=()=>{cfb.classList.toggle('on');cfb.setAttribute('aria-pressed',unsure());};
  // deep-understanding follow-up: cur.why = [question, answer, [wrongs], explanation]
  function askWhy(){
    const w=cur.why,opts=shuffle([w[1]].concat(w[2]));
    const d=document.createElement('div');d.className='why';
    d.innerHTML=`<div class="wq">🤔 ${w[0]}</div><div class="opts">${opts.map(o=>`<button>${o}</button>`).join('')}</div><div class="wfb"></div>`;
    fb.appendChild(d);
    d.querySelectorAll('.opts button').forEach(b=>b.onclick=()=>{
      if(d.dataset.done)return;d.dataset.done=1;const ok=b.innerHTML===w[1];
      b.classList.add(ok?'right':'wrong');d.querySelectorAll('.opts button').forEach(x=>{if(x.innerHTML===w[1])x.classList.add('right');});
      d.querySelector('.wfb').innerHTML=(ok?'✅ ':'👉 ')+w[3]+`<div style="margin-top:8px"><button class="big g wnx">${U.next}</button></div>`;
      d.querySelector('.wnx').onclick=next;});
  }
  ck.onclick=()=>{
    if(locked||!sel)return;const v=sel.innerHTML;
    if(v===cur.ans){locked=true;sel.classList.add('right');fb.className='fb good';fb.textContent=pick(U.cheers).replace('{n}',LESSON.child);
      if(FIN){const f=S.fin[fk(lv)];if(!f.d.includes(ci))f.d.push(ci);onCorrect(null);paint();if(f.d.length>=f.n)complete();else save();}
      else onCorrect(keyBase+(lv=='E'?'E':'H'));
      const ns=unsure();if(ns)fb.textContent+=' '+(U.guessRight||'Lucky guess? Read the why below to make it stick.');
      if(cur.why)askWhy();else setTimeout(next,1500);}
    else{sel.classList.remove('sel');sel.classList.add('wrong');fb.className='fb bad';fb.innerHTML=(LESSON.conf&&!unsure()?(U.sureWrong||'😮 You were sure! This is the one to remember: ')+'<br>':'')+(cur.trap[v]||U.wrong);sel=null;ck.disabled=true;onWrong();}
  };
  box.querySelector('.hp').onclick=()=>{fb.className='fb hint';fb.innerHTML='💡 '+cur.hints.slice(0,hi+1).join('<br>💡 ');if(hi<cur.hints.length-1)hi++;};
  box.querySelector('.sk').onclick=next;
  window.__cur=window.__cur||{};window.__cur[boxId]=()=>cur;   // test hook
  if(FIN)genAll();
  paint();next();
}
// hearts hook: a flown-away level sticker means that level must be played again (with a NEW set)
function finReset(id){
  const m={aE:['pA','E'],aH:['pA','H'],bE:['pB','E'],bH:['pB','H'],cE:['pC','E'],cH:['pC','H']}[id];if(!m)return;
  const f=S.fin[m[0]+m[1]];if(f){f.r++;f.d=[];f.m=0;}
  if(window.__fin&&window.__fin[m[0]])window.__fin[m[0]].regen();
}
// ----- challenge: LESSON.pool = [[question, answer, [3 wrong]], ...] (12-14 items) -----
const CH={started:false,list:[],i:0,score:0};
function startChal(){CH.started=true;CH.list=shuffle(LESSON.pool).slice(0,8);CH.i=0;CH.score=0;showChal();}
function showChal(){
  const box=$('chalBox');
  if(CH.i>=CH.list.length){
    const all=CH.score==8;
    box.innerHTML=`<div style="text-align:center"><h2>${all?U.perfect:U.well}</h2><div style="font-size:24px;font-weight:800">${ar(CH.score)} / ${ar(8)}</div><p>${all?U.crownTxt:U.tryCrown}</p><button class="big" id="again">${U.again}</button></div>`;
    if(all)award('crown');$('again').onclick=startChal;return;
  }
  const it=CH.list[CH.i];
  box.innerHTML=`<div class="prog">${U.qn(ar(CH.i+1),ar(CH.score))}</div><div class="qtext" style="margin-top:6px">${it[0]}</div>
   <div class="opts">${shuffle([it[1]].concat(it[2])).map(o=>`<button>${o}</button>`).join('')}</div><div class="fb" id="chFb"></div>`;
  let done=false;
  box.querySelectorAll('.opts button').forEach(b=>b.onclick=()=>{
    if(done)return;done=true;
    if(b.innerHTML===it[1]){b.classList.add('right');CH.score++;$('chFb').className='fb good';$('chFb').textContent=U.good;onCorrect(null);setTimeout(()=>{CH.i++;showChal();},1100);}
    else{b.classList.add('wrong');box.querySelectorAll('.opts button').forEach(x=>{if(x.innerHTML===it[1])x.classList.add('right');});
      $('chFb').className='fb bad';$('chFb').innerHTML=U.showRight+` <button class="big" id="chNext">${U.next}</button>`;onWrong();
      $('chNext').onclick=()=>{CH.i++;showChal();};}
  });
}
$('resetBtn').onclick=()=>{
  Q.length=0;showing=true;$('pop').innerHTML=`<h2>${U.rT}</h2><p>${U.rP}</p><div class="row" style="justify-content:center"><button class="big gr" id="rNo">${U.no}</button><button class="big o" id="rYes">${U.yes}</button></div>`;
  $('ov').classList.add('on');$('rNo').onclick=()=>{showing=false;$('ov').classList.remove('on');};
  $('rYes').onclick=()=>{S=fresh();save();showing=false;$('ov').classList.remove('on');drawTL();Object.values(window.__fin||{}).forEach(f=>f.regen());hud();};
};
// ----- init -----
drawTL();LESSON.banks.forEach((b,i)=>makePractice('p'+'ABC'[i],'abc'[i],b));
if(typeof learnInit==='function')learnInit();
hud();
window.__T={LESSON};
