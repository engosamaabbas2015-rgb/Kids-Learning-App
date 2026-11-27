// Ahmed, Grade 8 (2nd prep): Pythagoras' theorem and its converse. Numbers computed in JS.
const f=x=>String(Math.round(x*100)/100);
const cm=x=>f(x)+' cm';
const TR=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41],[6,8,10],[9,12,15],[12,16,20],[15,20,25],[10,24,26],[12,35,37]];
const small=()=>pick(TR.filter(t=>t[2]<=26));
const flip=t=>Math.random()<.5?[t[0],t[1],t[2]]:[t[1],t[0],t[2]];
const cmpW=(x,y)=>x<y?'is smaller than':x>y?'is bigger than':'equals';

// ---------- Section A: find the missing side ----------
const gHyp=n=>{const [a,b,c]=flip(small());
 return mk(`A right-angled triangle has legs <b>${cm(a)}</b> and <b>${cm(b)}</b>. Find the hypotenuse.`,cm(c),
  [[cm(a+b),'Do not add the sides. Square them first: c² = a² + b².'],[cm(a*a+b*b),`That is c² = ${a*a+b*b}. Take the square root to get c.`],[cm(Math.abs(a-b)),'Pythagoras adds the squares of the two legs.'],cm(c+1),cm(c-1)],
  ['c² = a² + b²',`c² = ${a}² + ${b}² = ${a*a} + ${b*b} = ${a*a+b*b}`,`c = √${a*a+b*b} = ${c}`],n);};
const gLeg=n=>{const [a,b,c]=flip(small());
 return mk(`The hypotenuse of a right-angled triangle is <b>${cm(c)}</b> and one leg is <b>${cm(a)}</b>. Find the other leg.`,cm(b),
  [[cm(c-a),'Subtract the squares, not the sides: b² = c² − a².'],[cm(Math.round(Math.sqrt(a*a+c*c)*10)/10),'The hypotenuse is the longest side, so you must subtract: b² = c² − a².'],[cm(c*c-a*a),`That is b² = ${c*c-a*a}. Take the square root.`],cm(b+1),cm(Math.max(1,b-1))],
  ['The hypotenuse is c, so b² = c² − a²',`b² = ${c}² − ${a}² = ${c*c} − ${a*a} = ${c*c-a*a}`,`b = √${c*c-a*a} = ${b}`],n);};
const factDef=factQ([
 ['Which side is the <b>hypotenuse</b>?','The longest side, opposite the right angle',[['The side next to the right angle','The hypotenuse is opposite the 90° angle.'],'The shortest side','Any side you like'],['It faces the 90° angle.']],
 ['Pythagoras\' theorem says that in a right-angled triangle...','c² = a² + b², where c is the hypotenuse',['c = a + b','c² = a² − b²',['a² = b² + c²','The hypotenuse must be alone on the left: c² = a² + b².']],['The square on the hypotenuse equals the sum of the squares on the other two sides.']]]);
const gArea=n=>{const [a,b,c]=flip(small());
 return mk(`A right-angled triangle has hypotenuse <b>${cm(c)}</b> and one leg <b>${cm(a)}</b>. Find its area.`,f(a*b/2)+' cm²',
  [[f(a*c/2)+' cm²','The height must be the other LEG, not the hypotenuse.'],[f(a*b)+' cm²','Remember the ½ in area = ½ × base × height.'],[f(b)+' cm²',`${b} is the missing leg, not the area.`],f(a*b/2+a)+' cm²'],
  [`First the other leg: b² = ${c}² − ${a}² = ${c*c-a*a}, so b = ${b}`,'Area = ½ × leg × leg',`Area = ½ × ${a} × ${b} = ${f(a*b/2)} cm²`],n);};
const gLadder=n=>{const [h,d,L]=flip(small());
 return mk(`A worker leans a ladder of <b>${L} feet</b> against a wall. Its top is <b>${h} feet</b> above the ground. How far is the base of the ladder from the wall?`,`${d} feet`,
  [[`${L-h} feet`,'The ladder is the hypotenuse, so use Pythagoras instead of subtracting lengths.'],[`${L+h} feet`,'The base is shorter than the ladder.'],[`${d*d} feet`,`That is d² = ${d*d}. Take the square root.`],`${d+1} feet`],
  [`The ladder is the hypotenuse: ${L}`,`d² = ${L}² − ${h}² = ${L*L} − ${h*h} = ${L*L-h*h}`,`d = √${L*L-h*h} = ${d}`],n);};
const gGarden=n=>{const s=pick([10,20,30,40,50,60]),d=Math.round(s*1.414),sv=Math.round(2*s-s*1.414);
 return mk(`Ahmed stands at one corner of a square garden of side <b>${s} m</b>. Instead of walking along two sides, he walks across the diagonal. About how many meters does he save? (use √2 ≈ 1.414)`,`about ${sv} m`,
  [[`about ${d} m`,'That is the length of the diagonal. Subtract it from the path along the two sides.'],[`about ${2*s} m`,'That is the walk along the two sides.'],[`about ${d-s} m`,'Compare the diagonal with BOTH sides (2 × side), not with one side.'],`about ${sv+4} m`],
  [`Diagonal = side × √2 ≈ ${s} × 1.414 ≈ ${d} m`,`Along the sides: ${s} + ${s} = ${2*s} m`,`Saved ≈ ${2*s} − ${d} = ${2*s-d} m`],n);};
const CH4=[[3,4,5,12,13],[6,8,10,24,26],[9,12,15,20,25],[12,16,20,21,29]];
const gPerim=n=>{const [a,b,ac,d,ad]=pick(CH4),p=a+b+d+ad;
 return mk(`In quadrilateral ABCD: ∠B = 90°, ∠ACD = 90°, AB = <b>${a}</b> cm, BC = <b>${b}</b> cm and CD = <b>${d}</b> cm. Find the perimeter of ABCD.`,cm(p),
  [[cm(p+ac),`AC = ${ac} is inside the shape, not on its boundary.`],[cm(a+b+d),'You still need the side AD: use Pythagoras in the triangle ACD.'],[cm(a+b+ac+d),'The sides of the shape are AB, BC, CD and DA.'],cm(p+2)],
  [`Triangle ABC: AC² = ${a}² + ${b}² = ${a*a+b*b}, so AC = ${ac}`,`Triangle ACD: AD² = ${ac}² + ${d}² = ${ac*ac+d*d}, so AD = ${ad}`,`Perimeter = AB + BC + CD + DA = ${a} + ${b} + ${d} + ${ad} = ${p}`],n);};
const gSq=n=>{const [a,b,c]=flip(small());
 return mk(`The squares drawn on the two legs of a right-angled triangle have areas <b>${a*a} cm²</b> and <b>${b*b} cm²</b>. What is the side length of the square drawn on the hypotenuse?`,cm(c),
  [[cm(a*a+b*b),`That is the AREA (${a*a+b*b} cm²) of the big square. The side is its square root.`],[cm(a+b),'Add the AREAS first, then take the square root.'],[cm(c+2),'Check: side² must equal the sum of the two areas.'],cm(Math.abs(a-b))],
  ['Area on the hypotenuse = sum of the two other areas',`${a*a} + ${b*b} = ${a*a+b*b} cm²`,`side = √${a*a+b*b} = ${c} cm`],n);};
const A={E:[gHyp,gLeg,factDef],H:[gLeg,gArea,gLadder,gHyp],X:[gPerim,gSq,gGarden,gArea]};
// ---------- Section B: the converse (is it right-angled?) ----------
const sq2=(x,y)=>x*x+y*y;
const gSet=n=>{const [a,b,c]=small(),good=[a,b,c];
 const bads=[[a,b,c+1],[a,b+1,c],[a+1,b,c+2],[a,b,c-1]].filter(s=>sq2(s[0],s[1])!==s[2]*s[2]);
 const fs=s=>s.join(', ')+' cm';
 return mk('Which set of lengths forms a <b>right-angled</b> triangle?',fs(good),
  bads.map(s=>[fs(s),`${s[0]}² + ${s[1]}² = ${sq2(s[0],s[1])}, but ${s[2]}² = ${s[2]*s[2]}. Not equal.`]),
  ['Square the two short lengths and add them',`Compare with the square of the longest: ${a}² + ${b}² = ${sq2(a,b)} and ${c}² = ${c*c}`,'Only the set where both sides are equal works.'],n);};
const factConv=factQ([
 ['The <b>converse</b> of Pythagoras\' theorem says: if a² + b² = c², then the triangle is...','right-angled, with the right angle opposite c',[['right-angled, with the right angle next to c','The right angle faces the longest side c.'],'acute-angled','equilateral'],['Converse = we start from the lengths and conclude the angle.']],
 ['To prove a triangle is right-angled from its three side lengths, you...','show that the square of the longest side equals the sum of the other two squares',['add the three sides','show that two sides are equal','measure the angles with a protractor'],['That is exactly what the converse is for.']]]);
const gWhere=n=>{const [a,b,c]=small(),right=Math.random()<.6,cc=right?c:c+pick([1,2]),
 [AB,BC,AC]=shuffle([a,b,cc]),L=Math.max(AB,BC,AC),opp={AB:'C',BC:'A',AC:'B'},arr=[['AB',AB],['BC',BC],['AC',AC]],big=arr.find(x=>x[1]===L),V=opp[big[0]],
 o=arr.filter(x=>x!==big).map(x=>x[1]),S=sq2(o[0],o[1]),isR=S===L*L,ans=isR?`Right-angled at ${V}`:'Not right-angled';
 const why=`${o[0]}² + ${o[1]}² = ${S} and ${L}² = ${L*L}: ${S===L*L?'equal':'not equal'}.`;
 const wr=['A','B','C'].map(v=>`Right-angled at ${v}`).concat(['Not right-angled']).filter(x=>x!==ans).map(x=>[x,x==='Not right-angled'?why+' So it IS right-angled.':(isR?'The right angle is opposite the longest side (the hypotenuse).':why+' So it is not right-angled.')]);
 return mk(`In triangle ABC: AB = <b>${AB}</b> cm, BC = <b>${BC}</b> cm and AC = <b>${AC}</b> cm. Is it right-angled? If yes, where is the right angle?`,ans,wr,
  [`The longest side is ${big[0]} = ${L}`,`Compare ${L}² = ${L*L} with ${o[0]}² + ${o[1]}² = ${S}`,'If they are equal the right angle is at the vertex opposite the longest side.'],n);};
const gMult=n=>{const [a,b,c]=pick(TR.filter(t=>t[2]<=15)),k=pick([2,3,4]),fs=s=>s.join(', ');
 return mk(`Which set is a multiple of the Pythagorean triple <b>${a}, ${b}, ${c}</b>?`,fs([k*a,k*b,k*c]),
  [[fs([k*a,k*b,k*c+1]),`${k*a}² + ${k*b}² = ${sq2(k*a,k*b)} but ${k*c+1}² = ${(k*c+1)**2}.`],[fs([a+k,b+k,c+k]),'Adding the same number does not keep a² + b² = c². Multiply instead.'],[fs([k*a+1,k*b+1,k*c+1]),'Multiply every number by the same k.'],fs([k*a,k*b+1,k*c])],
  [`Multiply each number by the same value k`,`With k = ${k}: ${a}×${k}, ${b}×${k}, ${c}×${k}`,'Check: the squares of the two smaller numbers add up to the square of the largest.'],n);};
const SH=[[12,5,13,3,4],[24,10,26,6,8],[8,15,17,9,12],[20,15,25,9,12],[15,20,25,12,16]];   // [AB,BD,AD,BC,CD]
const gShared=n=>{const [ab,bd,ad,bc,cd0]=pick(SH),ok=Math.random()<.65,cd=ok?cd0:cd0+1,a1=ab*bd/2,area=a1+bc*cd/2,Y=x=>`Yes, ∠C = 90°, area of ABCD = ${f(x)} cm²`,NO='No, ∠C is not 90°',
 chk=`BC² + CD² = ${bc*bc} + ${cd*cd} = ${bc*bc+cd*cd}, and BD² = ${bd*bd}.`;
 const wr=ok?[[Y(a1),'That is only the triangle ABD. Add the area of triangle BCD too.'],[Y(a1+bc*cd),'Area of a triangle = ½ × base × height. Do not forget the ½ for BCD.'],[NO,chk+' They are equal, so ∠C IS 90°.']]
            :[[Y(area),chk+' Not equal, so ∠C is not 90°.'],[Y(a1),chk+' Not equal, so ∠C is not 90°.'],[Y(area+3),chk+' Not equal, so ∠C is not 90°.']];
 return mk(`In the figure: ∠ABD = 90°, AB = <b>${ab}</b> cm, AD = <b>${ad}</b> cm, BC = <b>${bc}</b> cm and CD = <b>${cd}</b> cm. Is ∠C = 90°? Choose the correct statement.`,ok?Y(area):NO,wr,
  [`Triangle ABD: BD² = ${ad}² − ${ab}² = ${bd*bd}, so BD = ${bd}`,`Converse: is BC² + CD² equal to BD²?  ${bc*bc} + ${cd*cd} against ${bd*bd}`,`If yes, area = ½ × ${ab} × ${bd} + ½ × ${bc} × ${cd}`],n);};
const B={E:[gSet,factConv],H:[gWhere,gMult,gSet],X:[gShared,gWhere]};

// ---------- Section C: acute, right or obtuse ----------
const NAMES={acute:'Acute-angled',right:'Right-angled',obtuse:'Obtuse-angled'},disp=(v,sc)=>f(v/sc);
const mkSides=type=>{for(;;){let a,b,c;
  if(type==='right'){[a,b,c]=pick(TR.filter(t=>t[2]<=26));}
  else{a=ri(4,16);b=ri(4,16);c=ri(Math.max(a,b),a+b-1);const d=c*c-a*a-b*b;if((type==='acute'&&d>=0)||(type==='obtuse'&&d<=0))continue;}
  return [a,b,c].sort((x,y)=>x-y);}};
const gType=dec=>n=>{const type=pick(['acute','right','obtuse']),sc=dec&&Math.random()<.4?10:1,[a,b,c]=mkSides(type),s2=sc*sc,
 A=f(a*a/s2),Bq=f(b*b/s2),C=f(c*c/s2),S=f((a*a+b*b)/s2),sh=shuffle([a,b,c]).map(v=>disp(v,sc)).join(', ');
 const why=`The longest side is ${disp(c,sc)}: c² = ${C}. a² + b² = ${A} + ${Bq} = ${S}. c² ${cmpW(c*c,a*a+b*b)} a² + b², so the triangle is ${NAMES[type].toLowerCase()}.`;
 return mk(`A triangle has sides <b>${sh} cm</b>. What type is it with respect to its angles?`,NAMES[type],Object.values(NAMES).filter(x=>x!==NAMES[type]).map(x=>[x,why]),
  ['Find the longest side and square it (c²)',`Add the squares of the other two sides: ${A} + ${Bq} = ${S}`,`Compare: c² = ${C} ${cmpW(c*c,a*a+b*b)} ${S}`],n);};
const factIneq=factQ([
 ['In a triangle, c is the longest side. If c² is <b>bigger than</b> a² + b², the triangle is...','Obtuse-angled',['Acute-angled','Right-angled'],['A bigger c² means a wide-open angle opposite c.']],
 ['In a triangle, c is the longest side. If c² is <b>smaller than</b> a² + b², the triangle is...','Acute-angled',['Obtuse-angled','Right-angled'],['A smaller c² means all angles are less than 90°.']],
 ['The <b>greatest angle</b> in a triangle is opposite to...','the longest side',['the shortest side','the middle side'],['Bigger angle, bigger side opposite it.']]]);
const gAngle=n=>{const type=pick(['acute','right','obtuse']),[AB,BC,AC]=shuffle(mkSides(type)),opp={AB:'C',BC:'A',AC:'B'},arr=[['AB',AB],['BC',BC],['AC',AC]],
 big=arr.reduce((m,x)=>x[1]>m[1]?x:m),V=opp[big[0]],asked=pick(['A','B','C']),o=arr.filter(x=>x!==big).map(x=>x[1]),S=sq2(o[0],o[1]),
 ans=(type==='acute'||asked!==V)?'Acute':(type==='right'?'Right (90°)':'Obtuse'),
 why=`The longest side is ${big[0]} = ${big[1]}, opposite ∠${V}. ${big[1]}² = ${big[1]**2} ${cmpW(big[1]**2,S)} ${o[0]}² + ${o[1]}² = ${S}, so the triangle is ${NAMES[type].toLowerCase()}. A triangle has at most one right or obtuse angle.`;
 return mk(`In triangle ABC: AB = <b>${AB}</b> cm, BC = <b>${BC}</b> cm and AC = <b>${AC}</b> cm. What type is <b>∠${asked}</b>?`,ans,
  ['Acute','Right (90°)','Obtuse'].filter(x=>x!==ans).map(x=>[x,why]).concat([['Cannot be decided','We can: the longest side tells us where the biggest angle is.']]),
  [`Find the longest side: ${big[0]} = ${big[1]}. The biggest angle is opposite it, at ${V}.`,`Compare ${big[1]}² = ${big[1]**2} with ${o[0]}² + ${o[1]}² = ${S}`,asked===V?`∠${asked} is the biggest angle, so it takes the triangle's type.`:`∠${asked} is not the biggest angle, so it must be acute.`],n);};
const gRange=n=>{const [a,b,c]=small(),want=pick(['acute','right','obtuse']),val={acute:c-1,right:c,obtuse:c+1}[want],S=sq2(a,b),
 tp=v=>v*v<S?'acute':v*v>S?'obtuse':'right';
 return mk(`A triangle has sides <b>${a} cm</b>, <b>${b} cm</b> and <b>c cm</b>, where c is the longest side. Which value of c makes the triangle <b>${want}-angled</b>?`,`c = ${val}`,
  [c-1,c,c+1].filter(v=>v!==val).map(v=>[`c = ${v}`,`${v}² = ${v*v} ${cmpW(v*v,S)} ${a}² + ${b}² = ${S}, so that gives an ${tp(v)}-angled triangle.`]).concat([[`c = ${a+b+1}`,`c must be smaller than ${a} + ${b} = ${a+b}, otherwise there is no triangle.`]]),
  [`Compare c² with ${a}² + ${b}² = ${S}`,`Right-angled: c² = ${S}, so c = ${c}`,'Acute needs c² smaller than that sum; obtuse needs it bigger (but c must stay below a + b).'],n);};
const C={E:[gType(false),factIneq],H:[gType(true),gAngle],X:[gAngle,gRange,gType(true)]};
// ---------- challenge pool [question, answer, [3 wrong]] ----------
const POOL=[
 ['A right-angled triangle has legs 6 cm and 8 cm. The hypotenuse is...','10 cm',['14 cm','12 cm','100 cm']],
 ['A triangle has sides 5, 12 and 13 cm. It is...','right-angled',['acute-angled','obtuse-angled','equilateral']],
 ['A 13 ft ladder leans on a wall with its top 12 ft above the ground. The base is how far from the wall?','5 feet',['1 foot','7 feet','25 feet']],
 ['Which side is opposite the right angle?','the hypotenuse',['the shortest side','the altitude','the base']],
 ['A triangle has sides 7, 9 and 12 cm. It is...','obtuse-angled',['acute-angled','right-angled','equilateral']],
 ['A triangle has sides 0.9, 1.2 and 1.5 cm. It is...','right-angled',['acute-angled','obtuse-angled','isosceles']],
 ['A square garden has side 60 m. Walking along the diagonal instead of two sides saves about...','35 m',['85 m','60 m','120 m']],
 ['A right-angled triangle has hypotenuse 5 cm and one leg 4 cm. Its area is...','6 cm²',['10 cm²','12 cm²','20 cm²']],
 ['Which set is a Pythagorean triple?','9, 12, 15',['9, 12, 14','8, 15, 18','7, 24, 26']],
 ['In a triangle, c is the longest side and c² is smaller than a² + b². The triangle is...','acute-angled',['right-angled','obtuse-angled','isosceles']],
 ['In triangle ABC: AB = 12, BC = 9 and AC = 15 cm. Where is the right angle?','at B',['at A','at C','there is none']],
 ['The greatest angle of a triangle is opposite to...','the longest side',['the shortest side','the middle side','the base']],
 ['In triangle ABC: AB = 25, BC = 15 and AC = 20 cm. What type is angle C?','right (90°)',['acute','obtuse','45°']],
 ['A right-angled triangle has hypotenuse 5 cm and one leg 4 cm. The other leg is...','3 cm',['1 cm','9 cm','21 cm']]
];
// ---------- Learn tab: two interactive tools ----------
const LEARN=`
<h2>Pythagoras on the move 📐</h2>
<div class="bubble" style="margin:8px 0">In a <b>right-angled triangle</b>, the square on the longest side (the <b>hypotenuse c</b>) has the same area as the two other squares together: <b>c² = a² + b²</b>.</div>
<div class="grid3">
 <div class="mini"><b>1) The theorem</b><br>Know two sides of a right-angled triangle, find the third.</div>
 <div class="mini o"><b>2) The converse</b><br>If a² + b² = c², the triangle is right-angled, and the right angle is opposite c.</div>
 <div class="mini p"><b>3) The inequality</b><br>Compare c² with a² + b² to see if the triangle is acute or obtuse.</div>
</div>
<h3>🔧 Triangle builder</h3>
<p style="margin:2px 0">Slide a and b. Watch the three squares.</p>
<svg id="bsvg" viewBox="0 0 320 300" style="width:100%;max-width:420px;display:block;margin:0 auto"></svg>
<div class="row" style="justify-content:center">a <input id="rA" type="range" min="3" max="15" value="3"> b <input id="rB" type="range" min="3" max="15" value="4"></div>
<div class="eq" id="bInfo" style="font-size:19px;font-weight:800;text-align:center;margin:6px 0"></div>
<h3>🔺 Triangle type tester</h3>
<p style="margin:2px 0">Slide the three sides, or tap a preset. Find an acute, a right and an obtuse triangle.</p>
<svg id="tsvg" viewBox="0 0 320 170" style="width:100%;max-width:420px;display:block;margin:0 auto"></svg>
<div class="row" style="justify-content:center;gap:4px">a <input id="tA" type="range" min="3" max="20" value="6" style="width:80px"> b <input id="tB" type="range" min="3" max="20" value="8" style="width:80px"> c <input id="tC" type="range" min="3" max="20" value="10" style="width:80px"></div>
<div class="row" style="justify-content:center;margin-top:6px"><button class="big g" data-p="6,7,8">Acute</button><button class="big" data-p="6,8,10">Right</button><button class="big o" data-p="6,7,11">Obtuse</button></div>
<div class="eq" id="tInfo" style="font-size:18px;font-weight:800;text-align:center;margin:6px 0"></div>
<div class="prog" id="tProg"></div>`;
function learnInit(){
  const ff=x=>String(Math.round(x*100)/100),sqr=(x,y,w,h,fill,t)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="#334155"/><text x="${x+w/2}" y="${y+h/2+5}" text-anchor="middle" font-weight="800" font-size="15">${t}</text>`;
  function build(){
    const a=+$('rA').value,b=+$('rB').value,u=Math.min(16,270/(2*a+b),290/(a+2*b)),Cx=15+b*u,Cy=15+(a+b)*u,Ax=Cx,Ay=Cy-b*u,Bx=Cx+a*u,By=Cy,nx=b*u,ny=-a*u,c2=a*a+b*b,c=Math.sqrt(c2);
    $('bsvg').innerHTML=`<polygon points="${Ax},${Ay} ${Bx},${By} ${Bx+nx},${By+ny} ${Ax+nx},${Ay+ny}" fill="#fde68a" stroke="#334155"/>
     <text x="${(Ax+Bx)/2+nx/2}" y="${(Ay+By)/2+ny/2+5}" text-anchor="middle" font-weight="800" font-size="15">${ff(c2)}</text>`
     +sqr(Cx-b*u,Cy-b*u,b*u,b*u,'#f9a8d4',b*b)+sqr(Cx,Cy,a*u,a*u,'#86efac',a*a)
     +`<polygon points="${Cx},${Cy} ${Bx},${By} ${Ax},${Ay}" fill="#bfdbfe" stroke="#1e3a8a" stroke-width="2"/><rect x="${Cx}" y="${Cy-9}" width="9" height="9" fill="none" stroke="#1e3a8a"/>
     <text x="${Cx+a*u/2}" y="${Cy-6}" text-anchor="middle" font-size="13" font-weight="700">a</text><text x="${Cx+6}" y="${Cy-b*u/2}" font-size="13" font-weight="700">b</text>`;
    $('bInfo').innerHTML=`${a}² + ${b}² = ${a*a} + ${b*b} = ${c2}<br>c = √${c2} = ${ff(c)} ${Number.isInteger(c)?'✅ a Pythagorean triple':''}`;
  }
  const seen=()=>S.explored.filter(x=>typeof x==='string');
  function tester(track){
    const v=[+$('tA').value,+$('tB').value,+$('tC').value].sort((x,y)=>x-y),[s1,s2,s3]=v,ok=s1+s2>s3;
    if(!ok){$('tsvg').innerHTML='';$('tInfo').textContent='Not a triangle: the two short sides must add up to more than the longest.';return;}
    const x0=(s3*s3+s1*s1-s2*s2)/(2*s3),y0=Math.sqrt(Math.max(0,s1*s1-x0*x0)),k=Math.min(260/s3,110/Math.max(y0,.1)),Px=30,Py=150,Qx=Px+s3*k,Rx=Px+x0*k,Ry=Py-y0*k,
     S2=s1*s1+s2*s2,type=s3*s3<S2?'acute':s3*s3>S2?'obtuse':'right',col={acute:'#bfdbfe',right:'#bbf7d0',obtuse:'#fecaca'}[type];
    $('tsvg').innerHTML=`<polygon points="${Px},${Py} ${Qx},${Py} ${Rx},${Ry}" fill="${col}" stroke="#1e3a8a" stroke-width="2"/><text x="${(Px+Qx)/2}" y="${Py+15}" text-anchor="middle" font-weight="700">${s3}</text>`;
    $('tInfo').innerHTML=`c² = ${s3}² = ${s3*s3} versus a² + b² = ${s1}² + ${s2}² = ${S2}<br>${NAMES[type]} ${type==='right'?'✅':''}`;
    if(track&&!S.explored.includes(type)){S.explored.push(type);save();hud();}
    $('tProg').textContent=`Types found: ${seen().length}/3`+(seen().length>=3&&!has('explorer')?'':'');
    if(track&&seen().length>=3)award('explorer');
  }
  $('rA').oninput=$('rB').oninput=build;
  ['tA','tB','tC'].forEach(id=>$(id).oninput=()=>tester(true));
  document.querySelectorAll('#learn [data-p]').forEach(b=>b.onclick=()=>{const p=b.dataset.p.split(',');$('tA').value=p[0];$('tB').value=p[1];$('tC').value=p[2];tester(true);});
  build();tester(false);
}
const LESSON={ui:'en',child:'Ahmed',key:'ahmed_pyth_g8_v1',
 title:'📐 Ahmed\'s Pythagoras Challenge',
 css:'body{background:linear-gradient(180deg,#e0e7ff,#f1f5f9)}header{background:linear-gradient(135deg,#1e3a8a,#6d28d9);box-shadow:0 6px 0 #312e81}nav button{color:#312e81;box-shadow:0 3px 0 #a5b4fc}h2{color:#312e81}h3{color:#6d28d9}.bubble{background:#eef2ff;border-color:#a5b4fc}.bubble:before{border-right-color:#a5b4fc!important}.qbox{background:#eef2ff}',
 mX:'Find an acute, a right and an obtuse triangle in the tester',
 tabs:['🧠 Learn','📐 Find the side','✅ Right-angled?','🔺 Triangle type'],
 secs:[{h:'📐 Find the missing side',short:'Find the side',intro:'Use <b>c² = a² + b²</b>. c is the hypotenuse: the longest side, opposite the right angle.'},
       {h:'✅ Is it right-angled? (the converse)',short:'The converse',intro:'If a² + b² = c² (c is the longest side), the triangle is right-angled, with the right angle opposite c.'},
       {h:'🔺 Acute, right or obtuse?',short:'Triangle type',intro:'Compare c² (the longest side squared) with a² + b². Smaller: acute. Equal: right. Bigger: obtuse.'}],
 stk:[['🎯','First Hit'],['📐','Side Finder'],['🧮','Hypotenuse Hunter'],['✅','Converse Checker'],['🔍','Proof Master'],['🔺','Angle Reader'],['🧠','Inequality Ace'],['🧩','Triangle Explorer'],['🔥','On Fire'],['⚡','Lightning'],['👑','Pythagoras King'],['🏆','Legend']],
 learnHTML:LEARN,banks:[A,B,C],pool:POOL};
