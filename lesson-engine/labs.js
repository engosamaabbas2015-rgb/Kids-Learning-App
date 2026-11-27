// labs.js: reusable deep-learning widgets for the Learn tab (call them from learnInit).
// All are optional; old lessons do not use them. Progress is stored in S.explored as 'lab:<name>'.
const why=(o,w)=>{o.why=w;return o;};            // attach a "why?" follow-up: [question, answer, [wrongs], explanation]
function labDone(name){
  const k='lab:'+name;if(!S.explored.includes(k)){S.explored.push(k);save();hud();}
  const need=LESSON.labs||[];if(need.length&&need.every(n=>S.explored.includes('lab:'+n)))award('explorer');
  if(typeof labsProgress==='function')labsProgress();
}
const labIsDone=n=>S.explored.includes('lab:'+n);

// ---- audio player: one clip at a time. btn = a .play button, key = AUDIO key ----
let _aud=null,_audBtn=null;
function playClip(key,btn){
  if(!AUDIO[key])return;
  if(_aud){_aud.pause();if(_audBtn){_audBtn.classList.remove('on');_audBtn.textContent=_audBtn.dataset.l;}if(_audBtn===btn){_aud=null;_audBtn=null;return;}}
  _aud=new Audio(AUDIO[key]);_audBtn=btn;btn.classList.add('on');btn.textContent='⏸ '+(U.lang=='ar'?'إيقاف':'Stop');
  _aud.onended=()=>{btn.classList.remove('on');btn.textContent=btn.dataset.l;_aud=null;_audBtn=null;};
  _aud.play().catch(()=>{});
}
const playBtn=(key,label)=>AUDIO[key]?`<button class="play" data-k="${key}" data-l="${label}">${label}</button>`:'';
function wirePlay(root){root.querySelectorAll('.play').forEach(b=>b.onclick=()=>playClip(b.dataset.k,b));}

// ---- mind map with optional narration per branch (AUDIO['b'+i]) ----
// opts={BR, center:{e,l1,l2,c1,c2}, ids:{svg,bp,count,recall}, txt:{all,count(n,t),tap,recall,show}}
function mindMap(o){
  const svg=$(o.ids.svg),CX=180,CY=185,BR=o.BR;let sel=-1,recall=false;
  const nOpen=()=>S.explored.filter(x=>typeof x==='number').length;
  svg.innerHTML=`<defs><radialGradient id="cg" cx="35%" cy="30%"><stop offset="0" stop-color="${o.center.c1}"/><stop offset="1" stop-color="${o.center.c2}"/></radialGradient></defs>`
   +BR.map((b,i)=>{const mx=(CX+b.x)/2+(i%2?14:-14),my=(CY+b.y)/2;return `<path class="fl" d="M${CX},${CY} Q${mx},${my} ${b.x},${b.y}" fill="none" stroke="${b.c}" stroke-width="5" stroke-linecap="round" opacity=".75"/>`;}).join('')
   +`<g class="ctr"><circle cx="${CX}" cy="${CY}" r="48" fill="url(#cg)" stroke="#fff" stroke-width="4"/><text x="${CX}" y="${CY-8}" text-anchor="middle" font-size="22">${o.center.e}</text><text x="${CX}" y="${CY+11}" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">${o.center.l1}</text><text x="${CX}" y="${CY+26}" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">${o.center.l2}</text></g>`
   +BR.map((b,i)=>`<g class="nd" data-i="${i}" tabindex="0" role="button" aria-label="${b.t}"><rect x="${b.x-56}" y="${b.y-27}" width="112" height="56" rx="18" fill="${b.l}" stroke="${b.c}" stroke-width="4"/><text x="${b.x}" y="${b.y-4}" text-anchor="middle" font-size="22">${b.e}</text><text x="${b.x}" y="${b.y+19}" text-anchor="middle" font-size="12" font-weight="800" fill="${b.d}">${b.t}</text><circle cx="${b.x+46}" cy="${b.y-24}" r="11" fill="${b.c}" stroke="#fff" stroke-width="2"/><text x="${b.x+46}" y="${b.y-20}" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">${ar(i+1)}</text><text class="ck" x="${b.x-54}" y="${b.y-18}" font-size="14"></text></g>`).join('');
  function marks(){svg.querySelectorAll('g.nd').forEach((g,k)=>{g.querySelector('.ck').textContent=S.explored.includes(k)?'✅':'';});
    $(o.ids.count).textContent=nOpen()>=BR.length?o.txt.all:o.txt.count(nOpen(),BR.length);}
  function show(i){
    sel=i;const b=BR[i];
    if(!S.explored.includes(i)){S.explored.push(i);save();hud();}
    svg.querySelectorAll('g.nd').forEach((g,k)=>{const r=g.querySelector('rect');r.setAttribute('stroke-width',k===i?7:4);r.setAttribute('fill',k===i?BR[k].c+'55':BR[k].l);});
    $(o.ids.bp).innerHTML=`<div class="bp" style="border-color:${b.c};--bc:${b.c}"><div class="row" style="justify-content:space-between"><h3 style="color:${b.d};margin:0">${b.e} ${ar(i+1)}) ${b.t}</h3>${playBtn('b'+i,o.txt.listen)}</div>`
      +(b.story?`<div class="story">🎬 ${b.story}</div>`:'')
      +b.L.map(l=>`<div class="leaf ${recall?'hid':''}"><span class="ic">${l[0]}</span><span class="tx">${l[1]}</span></div>`).join('')
      +`<div class="chain">${b.chain.map((c,k)=>(k?`<i>${U.dir=='rtl'?'◀':'▶'}</i>`:'')+`<div>${c[0]}<small>${c[1]}</small></div>`).join('')}</div><div class="tip">💡 ${b.tip}</div></div>`;
    $(o.ids.bp).querySelectorAll('.leaf').forEach(l=>l.onclick=()=>l.classList.remove('hid'));
    wirePlay($(o.ids.bp));marks();
    if(nOpen()>=BR.length)labDone('map');
  }
  svg.querySelectorAll('g.nd').forEach(g=>{g.onclick=()=>show(+g.dataset.i);g.onkeydown=e=>{if(e.key==='Enter'||e.key===' ')show(+g.dataset.i);};});
  $(o.ids.recall).onclick=()=>{recall=!recall;$(o.ids.recall).classList.toggle('on',recall);$(o.ids.recall).textContent=recall?o.txt.show:o.txt.recall;if(sel>=0)show(sel);};
  $(o.ids.bp).innerHTML=`<div class="bubble" style="margin:8px 0">${o.txt.tap}</div>`;marks();
}

// ---- pre-test: guess BEFORE learning (no hearts, no penalty). items=[[q, ans, [wrongs], reveal]] ----
function preTest(id,items,txt){
  const box=$(id);let i=0;
  function draw(){
    if(i>=items.length){box.innerHTML=`<div class="done">${txt.done}</div>`;labDone('pre');return;}
    const it=items[i],opts=shuffle([it[1]].concat(it[2]));
    box.innerHTML=`<div class="prog">${txt.n(i+1,items.length)}</div><div class="qtext">${it[0]}</div><div class="opts">${opts.map(o=>`<button>${o}</button>`).join('')}</div><div class="fb"></div>`;
    let done=false;
    box.querySelectorAll('.opts button').forEach(b=>b.onclick=()=>{if(done)return;done=true;const ok=b.innerHTML===it[1];
      b.classList.add(ok?'right':'sel');box.querySelectorAll('.opts button').forEach(x=>{if(x.innerHTML===it[1])x.classList.add('right');});
      box.querySelector('.fb').className='fb '+(ok?'good':'hint');
      box.querySelector('.fb').innerHTML=(ok?txt.good:txt.guess)+'<br>'+it[3]+`<div style="margin-top:8px"><button class="big g">${U.next}</button></div>`;
      box.querySelector('.fb button').onclick=()=>{i++;draw();};});
  }
  if(labIsDone('pre'))box.innerHTML=`<div class="done">${txt.done}</div> <button class="big gr" id="${id}Again">${U.again}</button>`,$(id+'Again').onclick=()=>{i=0;draw();};
  else draw();
}

// ---- sort lab: tap an item, then tap the right bin. cfg={bins:[label...], items:[[text, binIdx, why]]} ----
function sortLab(id,cfg,txt){
  const box=$(id);let left=shuffle(cfg.items.map((_,k)=>k)),pickd=-1;const placed=cfg.bins.map(()=>[]);
  function draw(){
    box.innerHTML=`<div class="prog">${txt.left(left.length)}</div><div class="chips">${left.map(k=>`<button data-k="${k}" class="${k===pickd?'sel':''}">${cfg.items[k][0]}</button>`).join('')}</div>
     <div class="bins">${cfg.bins.map((b,j)=>`<div class="bin" data-j="${j}" role="button" tabindex="0"><h4>${b}</h4>${placed[j].map(k=>`<div class="it">✅ ${cfg.items[k][0]}</div>`).join('')}</div>`).join('')}</div><div class="fb"></div>`;
    box.querySelectorAll('.chips button').forEach(b=>b.onclick=()=>{pickd=+b.dataset.k;draw();box.querySelector('.fb').className='fb hint';box.querySelector('.fb').textContent=txt.now;});
    box.querySelectorAll('.bin').forEach(bn=>bn.onclick=()=>{
      if(pickd<0){box.querySelector('.fb').className='fb hint';box.querySelector('.fb').textContent=txt.first;return;}
      const it=cfg.items[pickd],j=+bn.dataset.j;
      if(it[1]===j){placed[j].push(pickd);left=left.filter(k=>k!==pickd);pickd=-1;draw();
        const f=box.querySelector('.fb');f.className='fb good';f.innerHTML='✅ '+it[2];
        if(!left.length){f.innerHTML+='<br><b>'+txt.done+'</b>';labDone(id);}}
      else{bn.classList.remove('shk');void bn.offsetWidth;bn.classList.add('shk');const f=box.querySelector('.fb');f.className='fb bad';f.innerHTML='🤔 '+it[2];}
    });
  }
  draw();
}

// ---- predict / observe / explain. cfg={predict:[q,ans,[wrongs]], run:(stage)=>Promise, explain:[q,ans,[wrongs],why]} ----
function poeLab(id,cfg,txt){
  const box=$(id);(window.__poe=window.__poe||{})[id]=cfg;   // test hook
  function mcq(it,cb){const opts=shuffle([it[1]].concat(it[2]));
    return `<div class="qtext">${it[0]}</div><div class="opts">${opts.map(o=>`<button>${o}</button>`).join('')}</div>`;}
  function step1(){
    box.innerHTML=`<div class="prog">${txt.s1}</div>`+mcq(cfg.predict)+'<div class="stage"></div><div class="fb"></div>';
    let done=false;
    box.querySelectorAll('.opts button').forEach(b=>b.onclick=()=>{if(done)return;done=true;b.classList.add('sel');
      const guess=b.innerHTML,f=box.querySelector('.fb');f.className='fb hint';f.textContent=txt.watch;
      cfg.run(box.querySelector('.stage')).then(()=>{
        const ok=guess===cfg.predict[1];box.querySelectorAll('.opts button').forEach(x=>{if(x.innerHTML===cfg.predict[1])x.classList.add('right');});
        f.className='fb '+(ok?'good':'hint');f.innerHTML=(ok?txt.predOk:txt.predNo)+`<div style="margin-top:8px"><button class="big g">${txt.toExplain}</button></div>`;
        f.querySelector('button').onclick=step2;});});
  }
  function step2(){
    const old=box.querySelector('.stage').innerHTML;
    box.innerHTML=`<div class="prog">${txt.s3}</div><div class="stage">${old}</div>`+mcq(cfg.explain)+'<div class="fb"></div>';
    let done=false;
    box.querySelectorAll('.opts button').forEach(b=>b.onclick=()=>{if(done)return;const ok=b.innerHTML===cfg.explain[1],f=box.querySelector('.fb');
      if(!ok){b.classList.add('wrong');f.className='fb bad';f.textContent=txt.tryAgain;return;}
      done=true;b.classList.add('right');f.className='fb good';f.innerHTML='✅ '+cfg.explain[3]+`<div style="margin-top:8px"><button class="big gr">${U.again}</button></div>`;
      f.querySelector('button').onclick=step1;labDone(id);});
  }
  step1();
}
