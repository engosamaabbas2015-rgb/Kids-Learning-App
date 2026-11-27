// Shared helpers + question builders (lesson.js uses these)
const $=id=>document.getElementById(id);
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const PBUH='ﷺ';
let U;                                   // active UI pack, set by engine
const ar=n=>U&&U.digits?String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]):String(n);
// mk(question, answer, wrongs[str | [str,hint]], hints[], numOptions) -> question object
function mk(q,ans,wrongs,hints,n){
  const seen=new Set([ans]);
  const ws=shuffle(wrongs).filter(w=>{const t=Array.isArray(w)?w[0]:w;if(seen.has(t))return false;seen.add(t);return true;}).slice(0,n-1),trap={};
  ws.forEach(w=>{if(Array.isArray(w))trap[w[0]]=w[1];});
  return {q,ans,opts:shuffle([ans].concat(ws.map(w=>Array.isArray(w)?w[0]:w))),trap,hints};
}
// factQ([[q, ans, wrongs, hints], ...]) -> generator
function factQ(list){return n=>{const f=pick(list);return mk(f[0],f[1],f[2],f[3],n);};}
// timeline helpers (need LESSON.M = [{n,y,e,who,why,res}] and LESSON.ys = year suffix)
const MY=name=>LESSON.M.find(m=>m.n===name);
const yr=y=>ar(y)+(LESSON.ys||'');
function yearQ(names){return n=>{const m=MY(pick(names));
  const all=LESSON.M.map(x=>x.n.replace(' '+PBUH,'')+' '+ar(x.y)).join(U.lang=='ar'?'، ':', ');
  const ys=[...new Set(LESSON.M.map(x=>x.y))].filter(y=>y!==m.y);
  return mk(U.yearQ(m.n),yr(m.y),ys.map(y=>[yr(y),all]),[U.yearHint+m.n,all],n);};}
function resQ(names){return n=>{const m=MY(pick(names));const first=t=>t.split('. ')[0];
  return mk(U.resQ(m.n),first(m.res),LESSON.M.filter(x=>x!==m).map(x=>[first(x.res),U.otherRes+'('+x.n+')']),[U.resHint+m.n,m.res],n);};}
function orderQ(seq,title){return n=>{
  const idx=shuffle(seq.map((_,i)=>i)).slice(0,3).sort((x,y)=>x-y),f=Math.random()<.5;
  const ans=f?seq[idx[0]]:seq[idx[2]];
  const full=U.ordTxt+seq.map((t,i)=>ar(i+1)+') '+t).join(' ← ');
  return mk(U.which(title,f?U.first:U.last),ans,idx.map(i=>seq[i]).filter(x=>x!==ans).map(x=>[x,full]),[U.thinkOrd,full],3);};}
function diffQ(pool){return n=>{
  const L=shuffle(pool.map(MY)).slice(0,2).sort((x,y)=>x.y-y.y),a=L[0],b=L[1],d=b.y-a.y,Y=U.yrs;
  return mk(U.diffQ(a.n,b.n),Y(d),[[Y(d+1),U.dh1],[Y(a.y+b.y),U.dh2],[Y(Math.max(1,d-1)),U.dh3+ar(b.y)+' − '+ar(a.y)],[Y(b.y),U.dh4],[Y(d+2),U.dh5]],
    [`${a.n}: ${yr(a.y)} / ${b.n}: ${yr(b.y)}`,`${U.dsub}${ar(b.y)} − ${ar(a.y)} = ؟`],n);};}

// reusable learn-tab pieces: use as ${OWL} (mascot owl svg) and ${ROAD} (animated camel on a road)
const OWL="<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\">\n    <polygon points=\"22,30 30,8 40,26\" fill=\"#92400e\"/><polygon points=\"78,30 70,8 60,26\" fill=\"#92400e\"/>\n    <ellipse cx=\"50\" cy=\"58\" rx=\"34\" ry=\"38\" fill=\"#b45309\"/><ellipse cx=\"50\" cy=\"68\" rx=\"20\" ry=\"24\" fill=\"#fde68a\"/>\n    <circle cx=\"36\" cy=\"42\" r=\"13\" fill=\"#fff\"/><circle cx=\"64\" cy=\"42\" r=\"13\" fill=\"#fff\"/>\n    <circle cx=\"38\" cy=\"43\" r=\"6\" fill=\"#111\"/><circle cx=\"62\" cy=\"43\" r=\"6\" fill=\"#111\"/>\n    <circle cx=\"40\" cy=\"41\" r=\"2\" fill=\"#fff\"/><circle cx=\"64\" cy=\"41\" r=\"2\" fill=\"#fff\"/>\n    <polygon points=\"45,52 55,52 50,62\" fill=\"#f97316\"/>\n    <rect x=\"30\" y=\"2\" width=\"40\" height=\"7\" fill=\"#065f46\" transform=\"rotate(-6 50 6)\"/><rect x=\"40\" y=\"6\" width=\"20\" height=\"9\" fill=\"#065f46\" transform=\"rotate(-6 50 10)\"/>\n  </svg>";
const ROAD="<div class=\"road\"><svg viewBox=\"0 0 320 56\" aria-hidden=\"true\"><path d=\"M10 40 Q80 10 160 36 T310 30\" stroke=\"#d97706\" stroke-width=\"4\" fill=\"none\" stroke-dasharray=\"8 8\"/>\n    <text font-size=\"28\" y=\"38\">🐪<animateMotion dur=\"6s\" repeatCount=\"indefinite\" path=\"M10 4 Q80 -26 160 0 T300 -6\"/></text></svg></div>";
