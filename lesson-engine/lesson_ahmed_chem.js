// Ahmed, Grade 8 (2nd prep), Science Unit 2: Lesson 1 Chemical Reactions + Lesson 2 Chemical Equations.
// Teen style (age 13+): lab/detective mission, real-life examples, why-questions, predict-observe-explain, sorting, balancing lab.
// ---------- helpers ----------
const SUBD='₀₁₂₃₄₅₆₇₈₉';
const F=s=>s.replace(/([A-Za-z)])(\d+)/g,(m,a,d)=>a+d.replace(/\d/g,x=>SUBD[x]));   // 'H2SO4' -> 'H₂SO₄'
const parseF=f=>{const o={};f.replace(/([A-Z][a-z]?)(\d*)/g,(m,e,n)=>{o[e]=(o[e]||0)+(n?+n:1);return m;});return o;};
const parseEq=s=>{const side=t=>t.split('+').map(x=>{const m=x.match(/^(\d*)(.+)$/);return [m[1]?+m[1]:1,m[2]];});const [l,r]=s.split('>');return {l:side(l),r:side(r)};};
const showEq=(e,cl,cr)=>{const t=(side,cs)=>side.map((x,i)=>{const c=cs?cs[i]:x[0];return (c===1?'':c)+F(x[1]);}).join(' + ');return t(e.l,cl)+' → '+t(e.r,cr);};
const atoms=(side,cs)=>{const o={};side.forEach((x,i)=>{const c=cs?cs[i]:x[0],p=parseF(x[1]);for(const k in p)o[k]=(o[k]||0)+c*p[k];});return o;};
const unbal=(e,cl,cr)=>{const L=atoms(e.l,cl),R=atoms(e.r,cr);return Object.keys(Object.assign({},L,R)).filter(k=>(L[k]||0)!==(R[k]||0)).map(k=>[k,L[k]||0,R[k]||0]);};
const EQS=['N2+3H2>2NH3','CH4+2O2>CO2+2H2O','2Mg+O2>2MgO','2H2+O2>2H2O','C+O2>CO2','2Na+Cl2>2NaCl','4NH3+5O2>4NO+6H2O','CaCO3>CaO+CO2',
 'Zn+CuSO4>ZnSO4+Cu','AgNO3+NaCl>NaNO3+AgCl','2Cu+O2>2CuO','H2+Cl2>2HCl','NaHCO3+HCl>NaCl+H2O+CO2'].map(parseEq);

// ---------- Section A: physical or chemical change ----------
const CHG=[
 ['Melting of ice',0,'Ice becomes liquid water: still H₂O, only the state changes.'],
 ['Dissolving salt in water',0,'The salt is still salt: evaporate the water and you get it back.'],
 ['Dissolving sugar in water',0,'The sugar is still there (the water tastes sweet). No new substance.'],
 ['Melting of wax',0,'Solid wax becomes liquid wax: the same substance.'],
 ['Evaporation of water',0,'Liquid water becomes vapour: still water.'],
 ['Iodine sublimation',0,'Solid iodine turns straight into iodine vapour: still iodine.'],
 ['A full, closed glass bottle of water cracks in the freezer',0,'Water expands when it freezes. The chemical composition of the water and the glass does not change.'],
 ['Iron rusting',1,'Iron reacts with oxygen and moisture to form rust: a new substance with a new colour.'],
 ['Wood combustion',1,'Burning wood forms new substances (ash, smoke, CO₂) with different properties.'],
 ['Burning of bread',1,'The bread turns black: a new substance (carbon) forms.'],
 ['Milk turning into yoghurt',1,'Milk changes into new substances: new taste and texture.'],
 ['An orange going rotten',1,'A colour change and a bad smell show that new substances formed.'],
 ['Combustion of wax (a burning candle)',1,'Burning wax reacts with oxygen to form CO₂ and water vapour, with light and heat.'],
 ['Clear limewater turning milky with CO₂',1,'A new insoluble substance forms and makes the limewater milky.'],
 ['Frying an egg',1,'The colour and consistency change and cannot be undone: new substances.'],
 ['A cut apple turning brown in air',1,'The apple reacts with oxygen in the air and forms a brown substance.'],
 ['Cooking meat',1,'The colour, texture and smell change: new substances form, and you cannot undo it.']];
const TN=['Physical change','Chemical change'];
const RS=['Chemical: a new substance forms','Physical: same substance, only its state or shape changes','Chemical: because its state changes','Physical: because no heat is used'];
const RW={2:'A change of state (solid, liquid, gas) is PHYSICAL. Ask: is there a new substance?',3:'Heat or no heat does not decide it. Ask: is there a new substance?'};
const gClassE=n=>{const c=pick(CHG),a=TN[c[1]];
 return why(mk(`<b>${c[0]}</b> is a...`,a,[[TN[1-c[1]],c[2]],['No change at all','Something clearly changes here. Is it only the state/shape, or a new substance?']],
  ['Ask one question: did a NEW substance form?','New substance → chemical. Same substance, new state/shape → physical.'],n),
  [`Why is it a ${a.toLowerCase()}?`,c[1]?RS[0]:RS[1],c[1]?[RS[1],RS[2]]:[RS[0],RS[3]],c[2]]);};
const gClassH=n=>{const c=pick(CHG),a=c[1]?RS[0]:RS[1];
 return mk(`Classify with the reason: <b>${c[0]}</b>`,a,RS.filter(x=>x!==a).map((x,i)=>[x,RW[RS.indexOf(x)]||c[2]]),
  ['First: is there a new substance at the end?','Then pick the option whose TYPE and REASON are both right.'],n);};
const gOdd=n=>{const t=Math.random()<.5?1:0,same=shuffle(CHG.filter(c=>c[1]===t)).slice(0,3),odd=pick(CHG.filter(c=>c[1]!==t));
 return mk('Three of these are the <b>same type</b> of change. Which one is the <b>odd one out</b>?',odd[0],same.map(c=>[c[0],`That is a ${TN[t].toLowerCase()} like the others. ${c[2]}`]),
  [`Classify each one: physical or chemical?`,`Three are ${TN[t].toLowerCase()}s. Find the one that is different.`],n);};
const factA=factQ([
 ['A <b>physical change</b> is a change in...','the state or shape of a substance without changing its chemical composition',[['the chemical composition of a substance','That is a chemical change.'],'the colour of a substance only','the mass of a substance'],['Physical = same substance, new look.']],
 ['A <b>chemical change</b> is a change that...','results in new substances with different chemical properties',[['changes only the shape of a substance','That is a physical change.'],'always needs a fire','only happens in a lab'],['Chemical = NEW substance.']],
 ['Melting of ice is a physical change because...','its state and shape change with heat, but its chemical composition does not',['it needs heat',['new substances form','No new substance: liquid water is still H₂O.'],'it is fast'],['Is the water still water at the end?']],
 ['Combustion of wood is a chemical change because...','it forms new substances whose chemical properties differ from those of wood',['it changes the shape of the wood','it makes the wood hot',['the wood melts','Wood does not melt; it burns into NEW substances.']],['Ash and smoke are not wood.']]]);
const factAX=factQ([
 ['A full, closed bottle of water cracks in the freezer. Did a chemical change happen?','No: water expands as it freezes, but nothing changes in its chemical composition',[['Yes: the glass broke, so a new substance formed','Breaking is a change of SHAPE (physical).'],'Yes: ice is a new substance','No: because it happened in the cold'],['Is there any new substance at the end?']],
 ['Sugar "disappears" in water. Why is this NOT a chemical change?','The sugar is still there (the water tastes sweet); no new substance forms',['Because it is fast','Because no gas is produced',['Because the sugar is destroyed','Matter is never destroyed. The sugar is just spread out in the water.']],['Taste the water: is the sugar gone?']],
 ['Melting wax and burning wax: what is the difference?','Melting is physical (still wax); burning is chemical (CO₂ + water vapour form)',['Both are physical','Both are chemical',['Melting is chemical; burning is physical','It is the other way round.']],['Which one forms new substances?']],
 ['Is cooking meat just mixing its components?','No: new substances form (colour, smell, texture change) and it cannot be undone',['Yes: it can be separated again','Yes: only the shape changes','No: the meat only loses water'],['Mixing can be undone. Cooking cannot.']]]);
const A={E:[gClassE,factA,gClassE],H:[gClassH,gOdd,factA],X:[gOdd,factAX,gClassH]};

// ---------- Section B: inside a reaction + the 4 clues ----------
const CLUE=['Formation of a precipitate','Colour change','Evolution of a gas','Emission of light and heat'];
const RX=[
 ['Adding silver nitrate solution to sodium chloride solution','A white precipitate (silver chloride) that turns violet in sunlight',0],
 ['Placing a zinc plate in blue copper sulphate solution','The blue colour disappears and reddish-brown copper deposits on the zinc',1],
 ['Adding a magnesium strip to dilute hydrochloric acid','Bubbles of hydrogen gas form on the strip',2],
 ['Igniting a magnesium strip in air','A bright light and heat, leaving a white powder (magnesium oxide)',3],
 ['Adding baking soda to vinegar','Effervescence: bubbles of carbon dioxide gas',2],
 ['Passing carbon dioxide through clear limewater','The clear limewater turns milky (turbid)',0],
 ['Lighting fireworks','Emission of light and heat',3],
 ['Leaving a cut apple in the air','The apple turns brown',1]];
const gInd=n=>{const r=pick(RX);
 return mk(`What shows that a chemical reaction happened? <b>${r[0]}</b>`,r[1],RX.filter(x=>x!==r&&x[1]!==r[1]).map(x=>[x[1],'That happens when: '+x[0].toLowerCase()+'.']),
  ['Picture the experiment: what would you SEE?',`This one belongs to the clue: ${CLUE[r[2]].toLowerCase()}.`],n);};
const gClue=n=>{const r=pick(RX);
 return mk(`Which of the 4 clues is this? <b>${r[1]}</b>`,CLUE[r[2]],CLUE.filter((_,i)=>i!==r[2]).map(c=>[c,'Read the observation again: what exactly is seen?']),
  ['The 4 clues: precipitate, colour change, gas, light & heat.','A precipitate is a solid that does not dissolve; a gas makes bubbles.'],n);};
const gWhichR=n=>{const t=ri(0,3),good=pick(RX.filter(x=>x[2]===t)),bad=shuffle(RX.filter(x=>x[2]!==t));
 const seenT=new Set(),ws=bad.filter(x=>!seenT.has(x[2])&&seenT.add(x[2])).concat(bad).map(x=>[x[0],'That gives: '+x[1].toLowerCase()+'.']);
 return mk(`Which reaction is shown by <b>${CLUE[t].toLowerCase()}</b>?`,good[0],ws,['Imagine each experiment and what you would see.',`You are looking for: ${CLUE[t].toLowerCase()}.`],n);};
const gMech=orderQ(['The bonds between the atoms of the reactant molecules break','The atoms rearrange','New bonds form between the atoms of the product molecules'],'⚛️ Inside a chemical reaction:');
const factB=factQ([
 ['In a chemical reaction, the starting substances are called...','reactants',[['products','Products are the NEW substances formed.'],'catalysts','precipitates'],['They REACT, so they are...']],
 ['In a chemical reaction, the new substances formed are called...','products',[['reactants','Reactants are the starting substances.'],'indicators','solutions'],['They are PRODUCED.']],
 ['In CHG₄ + 2O₂ → CO₂ + 2H₂O, the reactants are...','methane and oxygen',[['carbon dioxide and water','Those are on the RIGHT: products.'],'methane and water','oxygen and carbon dioxide'],['Reactants are on the left of the arrow.']],
 ['A chemical reaction is the process of...','breaking bonds in the reactant molecules and forming new bonds in the products',['mixing substances without changing them','changing the state of a substance','dissolving a substance in water'],['Break old bonds, make new bonds.']]]);
const factBX=factQ([
 ['Which gas puts out a lit match?','carbon dioxide',['oxygen',['hydrogen','Hydrogen burns with a pop; it does not put out the match.'],'water vapour'],['Fire extinguishers use this gas.']],
 ['Which gas makes a glowing splint glow more?','oxygen',['carbon dioxide','hydrogen','nitrogen'],['Fire needs this gas.']],
 ['A student sees bubbles when water boils. Is this a chemical reaction?','No: the bubbles are water vapour, still water (physical)',[['Yes: bubbles always mean a new gas','Bubbles are a clue only if the gas is a NEW substance.'],'Yes: heat always causes a reaction','No: because there is no colour change'],['Is the gas a new substance?']],
 ['In a chemical reaction, the number of atoms of each element...','stays the same: the atoms only rearrange',['increases, because new products form','decreases, because the reactants are used up','depends on the temperature'],['Atoms are never created or destroyed.']],
 ['Why must you hold a burning magnesium strip with tongs and wear a mask?','To avoid burns, and to protect your eyes from the very bright light',['Because magnesium is poisonous to touch','To stop the gas escaping','Because the strip is wet'],['Think: very hot + very bright.']],
 ['After zinc is placed in copper sulphate, the solution becomes...','colourless (zinc sulphate)',['dark blue','green','milky white'],['The blue colour came from copper sulphate.']]]);
const B={E:[gInd,factB,gClue],H:[gWhichR,gInd,gMech,gClue],X:[factBX,gWhichR,gMech]};

// ---------- Section C: equations, conservation of mass, balancing ----------
const ST=[['Silver chloride precipitate','(s)'],['Calcium oxide powder','(s)'],['Iron metal','(s)'],['Water','(l)'],['Mercury metal','(l)'],
 ['Carbon dioxide bubbles','(g)'],['Hydrogen gas','(g)'],['Water vapour','(v)'],['Sodium chloride dissolved in water','(aq)'],['Dilute hydrochloric acid','(aq)']];
const STM={'(s)':'solid','(l)':'liquid','(g)':'gas','(v)':'vapour','(aq)':'aqueous solution (dissolved in water, acid or alkali)'};
const gState=n=>{const s=pick(ST);
 return mk(`Which physical-state symbol goes with <b>${s[0]}</b>?`,s[1],Object.keys(STM).filter(k=>k!==s[1]).map(k=>[k,`${k} means ${STM[k]}.`]),
  ['(s) solid · (l) liquid · (g) gas · (v) vapour · (aq) aqueous solution','A precipitate or powder is solid. Anything dissolved is (aq).'],n);};
const CD=[['Δ','heating'],['cat','using a catalyst'],['dil','using a dilute acid or alkali'],['conc','using a concentrated acid or alkali']];
const gCond=n=>{const c=pick(CD);
 return mk(`On the reaction arrow, <b>${c[0]}</b> means...`,c[1],CD.filter(x=>x!==c).map(x=>[x[1],`That is ${x[0]}.`]),['Conditions are written ON the arrow.','Δ heat · cat catalyst · dil dilute · conc concentrated'],n);};
const SP=['H2O','CO2','NH3','CH4','H2SO4','CaCO3','NaHCO3','O2','AgNO3','CuSO4','NaNO3','ZnSO4','HCl'];
const gAtoms=n=>{const f=pick(SP),p=parseF(f),e=pick(Object.keys(p)),k=ri(2,5),s=p[e],a=k*s;
 return mk(`How many <b>${e}</b> atoms are in <b>${k}${F(f)}</b>?`,String(a),
  [[String(k),`${k} is the number of molecules. Multiply it by the subscript of ${e}.`],[String(s),`${s} is in ONE molecule. There are ${k} molecules.`],[String(k+s),'Multiply, do not add: coefficient × subscript.'],String(a+2),String(a+1)],
  ['Atoms = coefficient × subscript',`Coefficient = ${k}. Subscript of ${e} = ${s}${s===1?' (1 is not written)':''}.`,`${k} × ${s} = ${a}`],n);};
const gCoef=hard=>n=>{let e,i,side;do{e=pick(hard?EQS:EQS.slice(0,6));side=pick(['l','r']);i=ri(0,e[side].length-1);}while(e[side][i][0]<2);
 const c=e[side][i][0],cl=e.l.map(x=>x[0]),cr=e.r.map(x=>x[0]);
 const shown=t=>{const L=cl.slice(),R=cr.slice();(side=='l'?L:R)[i]=t;return {L,R};};
 const blank=showEq(e).split(' → ').map((part,si)=>(si===(side=='l'?0:1))?part.split(' + ').map((t,ti)=>ti===i?'__'+F(e[side][i][1]):t).join(' + '):part).join(' → ');
 const ws=[1,2,3,4,5,6].filter(w=>w!==c).map(w=>{const s=shown(w),u=unbal(e,s.L,s.R)[0];return [String(w),u?`With ${w}: ${u[0]} atoms → left ${u[1]}, right ${u[2]}. Not equal.`:'Check every element again.'];});
 const u0=unbal(e,...Object.values(shown(1)))[0];
 return mk(`Balance it: <b>${blank}</b><br>The missing coefficient is...`,String(c),ws,
  ['Count the atoms of each element on both sides.',u0?`Look at ${u0[0]}: you need the same number on both sides.`:'Try each number and count.','Change only the big numbers (coefficients), never the subscripts.'],n);};
const gBal=n=>{const e=pick(EQS.filter(x=>x.l.concat(x.r).some(t=>t[0]>1)));const cl=e.l.map(x=>x[0]),cr=e.r.map(x=>x[0]),bad=[];
 for(let t=0;t<40&&bad.length<4;t++){const L=cl.slice(),R=cr.slice(),arr=Math.random()<.5?L:R,j=ri(0,arr.length-1);arr[j]=Math.max(1,arr[j]+pick([-1,1,2]));
  const u=unbal(e,L,R);if(u.length){const s=showEq(e,L,R);if(!bad.some(b=>b[0]===s))bad.push([s,`Not balanced: ${u[0][0]} atoms → left ${u[0][1]}, right ${u[0][2]}.`]);}}
 return why(mk('Which equation is <b>balanced</b>?',showEq(e),bad,['Pick one equation and count each element on both sides.','Atoms = coefficient × subscript.'],n),
  ['Why is it balanced?','Each element has the same number of atoms on both sides',['The sum of the coefficients is equal on both sides','It has the fewest molecules','All the coefficients are bigger than 1'],
   'Balanced = same atoms of each element on both sides (law of conservation of mass). The sums of coefficients do NOT need to match: 2Mg + O₂ → 2MgO has 3 on the left and 2 on the right.']);};
const MT=[[['Mercury oxide'],['Mercury','Oxygen'],[217],[201,16]],[['Calcium','Sulphuric acid'],['Calcium sulphate','Hydrogen'],[40,98],[136,2]],
 [['Methane','Oxygen'],['Carbon dioxide','Water vapour'],[16,64],[44,36]],[['Magnesium','Oxygen'],['Magnesium oxide'],[48,32],[80]],
 [['Carbon','Oxygen'],['Carbon dioxide'],[12,32],[44]],[['Calcium carbonate'],['Calcium oxide','Carbon dioxide'],[100],[56,44]]];
const gMass=n=>{const t=pick(MT),all=t[2].concat(t[3]),ks=[.25,.5,1,2,3].filter(k=>all.every(x=>Number.isInteger(x*k))),k=pick(ks);
 const L=t[2].map(x=>x*k),R=t[3].map(x=>x*k),names=t[0].concat(t[1]),vals=L.concat(R),h=ri(0,vals.length-1),a=vals[h];
 const sh=(arr,nm,off)=>arr.map((v,i)=>`${nm[i]} ${i+off===h?'<b>?</b>':v+' g'}`).join(' + ');
 const tot=vals.reduce((s,v,i)=>i===h?s:s+v,0);
 return mk(`Law of conservation of mass: ${sh(L,t[0],0)} → ${sh(R,t[1],L.length)}. Find the missing mass.`,a+' g',
  [[tot+' g','You added everything. Mass of reactants = mass of products, so subtract.'],[(a+2)+' g','Check the subtraction again.'],[Math.abs(a-1)+' g','Close: check the subtraction.'],[(L.reduce((s,v)=>s+v,0)+R.reduce((s,v)=>s+v,0))+' g','That is both sides added together.']],
  ['Total mass of reactants = total mass of products',`Reactants: ${L.join(' + ')} = ${L.reduce((s,v)=>s+v,0)} g`,`Products: ${R.join(' + ')} = ${R.reduce((s,v)=>s+v,0)} g`],n);};
const factC=factQ([
 ['A word equation (carbon + oxygen → carbon dioxide) is not enough because it does not show...','the ratio of the molecules and the physical states',['the names of the substances','the arrow',['the products','It shows the products by name.']],['What is missing: numbers and states.']],
 ['A <b>catalyst</b> is a substance that...','speeds up a reaction without being consumed or changed',[['is used up in the reaction','A catalyst is not consumed.'],'slows the reaction down','is always a gas'],['cat on the arrow.']],
 ['The law of conservation of mass says...','the total mass of the reactants equals the total mass of the products',['the products are always heavier','the reactants are always heavier','mass is lost as gas'],['Nothing is lost, nothing is created.']],
 ['The law of conservation of matter says that matter...','is neither destroyed nor created from nothing; it changes from one form to another',['is destroyed when it burns','is created in a reaction','turns into energy'],['Same atoms, new arrangement.']],
 ['The first scientist to formulate the law of conservation of mass was...','Antoine Lavoisier',['Isaac Newton','John Dalton','Marie Curie'],['The "Father of Chemistry", a French chemist.']],
 ['In a symbolic equation, the reactants are written...','on the left of the arrow',[['on the right of the arrow','The products go on the right.'],'above the arrow','below the arrow'],['Read it like a sentence: start → finish.']],
 ['The only metal that is liquid at room temperature is...','mercury (l)',['iron (l)','sodium (l)','copper (l)'],['All other metals are (s).']]]);
const factCX=factQ([
 ['To balance an equation, you may change...','only the coefficients (the big numbers in front)',[['the subscripts','Changing a subscript changes the substance itself.'],['both coefficients and subscripts','Never touch subscripts.'],'the arrow direction'],['Big numbers only.']],
 ['Ali "balanced" H₂ + O₂ → H₂O by writing H₂ + O₂ → H₂O₂. What is wrong?','He changed a subscript, so H₂O₂ is a different substance, not water',['Nothing: the atoms are equal now',['He should write 2H₂ + 2O₂ → 2H₂O₂','Still changing the substance. The answer is 2H₂ + O₂ → 2H₂O.'],'He forgot the (aq) symbols'],['Correct: 2H₂ + O₂ → 2H₂O.']],
 ['In 2Mg + O₂ → 2MgO the coefficients add up to 3 on the left and 2 on the right. Is it balanced?','Yes: each element has the same number of atoms on both sides',[['No: the sums must be equal','The sums do NOT need to be equal; only the atoms.'],'No: magnesium is not balanced','Yes: because 3 is bigger than 2'],['Count Mg and O on each side.']],
 ['Why is the test tube of calcium chloride placed carefully INSIDE the flask?','To avoid mixing the two solutions before the first weighing',['To heat it','To make it react faster','To measure its volume'],['We weigh BEFORE the reaction starts.']],
 ['Why is the flask turned upside down?','To let the two solutions react together',['To pour it out','To cool it','To remove the gas'],['Now the reaction starts, with nothing able to escape.']],
 ['In 4NH₃ + 5O₂ → 4NO + 6H₂O, the sum of the coefficients of the reactants is...','9',['19','10','4'],['Only the reactants: 4 + 5.']]]);
const C={E:[gState,gCond,gAtoms,factC],H:[gAtoms,gCoef(false),gMass,factC],X:[gBal,gCoef(true),gMass,factCX]};

// ---------- challenge pool (his book's questions) ----------
const POOL=[
 ['Melting of wax is...','a physical change',['a chemical change','a combustion reaction','a precipitate']],
 ['Combustion of wax is...','a chemical change',['a physical change','melting','dissolving']],
 ['Which is a chemical change?','The conversion of milk into yoghurt',['Dissolving sugar in water','Melting of ice','Evaporation of water']],
 ['Silver nitrate + sodium chloride gives...','a white precipitate that turns violet in sunlight',['bubbles of hydrogen gas','a bright light and heat','a blue colour']],
 ['A magnesium strip in dilute hydrochloric acid gives bubbles of...','hydrogen gas',['oxygen gas','carbon dioxide gas','chlorine gas']],
 ['Which gas puts out a lit match?','carbon dioxide',['oxygen','hydrogen','nitrogen']],
 ['The symbol (aq) means...','aqueous solution',['liquid','vapour','gas']],
 ['The only liquid metal is...','mercury',['iron','sodium','copper']],
 ['How many hydrogen atoms are in 2H₂O?','4',['2','3','6']],
 ['N₂ + __H₂ → 2NH₃. The missing coefficient is...','3',['2','6','1']],
 ['222 g of mercury oxide gives 16 g of oxygen and how much mercury?','206 g',['238 g','222 g','16 g']],
 ['Who is called the Father of Chemistry?','Antoine Lavoisier',['Isaac Newton','Albert Einstein','Marie Curie']],
 ['In 4NH₃ + 5O₂ → 4NO + 6H₂O, the sum of the reactant coefficients is...','9',['19','10','4']],
 ['A catalyst is a substance that...','speeds up a reaction without being consumed',['is used up in the reaction','slows the reaction down','is always a gas']]];

// ---------- Learn tab ----------
const BR=[
 {e:'🧊',t:'Physical vs Chemical',c:'#0ea5e9',d:'#0369a1',l:'#e0f2fe',x:180,y:40,tip:'Ask ONE question: did a NEW substance form? Yes → chemical. No → physical.',
  story:'In the kitchen: ice melts in your juice (still water, just liquid now). Toast burns black (that black stuff is carbon: a NEW substance).',
  chain:[['🔷','same substance'],['⚖️','or'],['✨','new substance']],
  L:[['🧊','<b>Physical change:</b> a change in the state or shape of a substance without changing its chemical composition. <i>Melting ice, dissolving salt or sugar, melting wax, evaporation, iodine sublimation.</i>'],
     ['🔥','<b>Chemical change:</b> a change that results in new substances whose chemical properties differ. <i>Iron rusting, wood combustion, burning bread, milk → yoghurt, rotting fruit.</i>'],
     ['❓','<b>G.R.</b> Melting ice is physical: its state and shape change, not its chemical composition. Burning wood is chemical: it forms new substances.'],
     ['⚠️','<b>Traps:</b> melting wax = physical, but BURNING wax = chemical · sugar "disappearing" in water = physical · a water bottle cracking in the freezer = physical.']]},
 {e:'⚛️',t:'Inside a reaction',c:'#8b5cf6',d:'#6d28d9',l:'#ede9fe',x:302,y:128,tip:'Same atoms, new partners.',
  story:'Think LEGO: take a car apart (break the bonds), rearrange the same bricks, and build a plane (new bonds). Same bricks, brand new thing.',
  chain:[['🧱','reactants'],['💥','break bonds'],['🔄','rearrange'],['🔗','new bonds'],['✨','products']],
  L:[['🧪','<b>Reactants</b> = the starting substances. <b>Products</b> = the new substances formed.'],
     ['💥','<b>Step 1:</b> the bonds between the atoms of the reactant molecules break.'],
     ['🔗','<b>Step 2:</b> new bonds form between the atoms of the product molecules.'],
     ['🔥','<b>Example:</b> CHG₄ + 2O₂ → CO₂ + 2H₂O. The bonds in CHG₄ and O₂ break; new bonds make CO₂ and H₂O.'],
     ['📌','<b>Chemical reaction:</b> breaking the bonds in the reactant molecules and forming new bonds in the product molecules.']]},
 {e:'🔍',t:'The 4 clues',c:'#f59e0b',d:'#b45309',l:'#fef3c7',x:262,y:290,tip:'P-C-G-L: Police Catch Gas Leaks = Precipitate, Colour, Gas, Light & heat.',
  story:'Detective mode: you cannot see atoms, but a reaction always leaves clues. Your code: Police Catch Gas Leaks.',
  chain:[['🧂','Precipitate'],['🎨','Colour'],['🫧','Gas'],['💡','Light & heat']],
  L:[['🧂','<b>Precipitate:</b> AgNO₃ + NaCl → white silver chloride, insoluble, turns violet in sunlight. Also: limewater turns milky with CO₂.'],
     ['🎨','<b>Colour change:</b> zinc in blue CuSO₄ → the blue disappears (colourless ZnSO₄) and reddish-brown copper covers the zinc.'],
     ['🫧','<b>Gas:</b> Mg + dilute HCl → hydrogen bubbles. Baking soda + vinegar → CO₂ (effervescence).'],
     ['💡','<b>Light & heat:</b> burning magnesium → bright light, heat, white powder MgO. Use tongs and a mask!'],
     ['🧯','<b>Gas tests:</b> CO₂ puts out a lit match · O₂ makes a glowing splint glow more.']]},
 {e:'✍️',t:'Writing equations',c:'#10b981',d:'#047857',l:'#d1fae5',x:98,y:290,tip:'Left = what you start with. Right = what you get. Conditions ride ON the arrow.',
  story:'An equation is a recipe card in code: ingredients on the left, the dish on the right, the oven setting on the arrow.',
  chain:[['🧪','reactants'],['➡️','arrow + conditions'],['✨','products'],['🏷️','states']],
  L:[['📝','A <b>word equation</b> (carbon + oxygen → carbon dioxide) is not enough: it does not show the <b>ratio</b> of molecules or the <b>physical states</b>.'],
     ['🔣','<b>Symbolic equation:</b> uses symbols and formulas with the simplest whole-number ratio: C<sub>(s)</sub> + O₂<sub>(g)</sub> → CO₂<sub>(g)</sub>.'],
     ['🏷️','<b>States:</b> (s) solid: precipitate, salt, powder · (l) liquid · (g) gas: bubbles · (v) vapour · (aq) dissolved in water, acid or alkali. All metals are (s) except mercury (l).'],
     ['🔥','<b>Conditions on the arrow:</b> Δ heat · cat catalyst · dil dilute acid/alkali · conc concentrated acid/alkali.'],
     ['⚡','<b>Catalyst:</b> speeds up a reaction without being consumed or changed.']]},
 {e:'⚖️',t:'Balancing',c:'#ec4899',d:'#be185d',l:'#fce7f3',x:58,y:128,tip:'Change the BIG numbers (coefficients), never the small ones (subscripts): a new subscript = a new substance!',
  story:'Lavoisier, the "Father of Chemistry": nothing is lost, nothing is created. In the book the scale shows 184.34 g before AND after the reaction.',
  chain:[['✍️','formulas'],['🔢','count atoms'],['➕','coefficients'],['✅','check']],
  L:[['🧑‍🔬','<b>Conservation of matter:</b> matter is neither destroyed nor created from nothing; it changes form. <b>Conservation of mass:</b> mass of reactants = mass of products.'],
     ['🧮','<b>Example:</b> 222 g mercury oxide → 16 g oxygen + ? mercury. 222 − 16 = <b>206 g</b>.'],
     ['🔢','<b>Coefficient</b> = big number in front (number of molecules). <b>Subscript</b> = small number below (atoms in ONE molecule). 1 is never written.'],
     ['✖️','<b>Atoms = coefficient × subscript:</b> 2H₂O → H = 2 × 2 = 4, O = 2 × 1 = 2.'],
     ['⚖️','<b>Balanced:</b> each element has the same number of atoms on both sides. N₂ + H₂ → NH₃ ✗ → N₂ + 3H₂ → 2NH₃ ✓. The sums of coefficients need not be equal (2Mg + O₂ → 2MgO).']]}];
const PRE=[
 ['Cooking meat: is it just mixing, or a change you cannot undo?','A change you cannot undo: new substances form',['Just mixing: you could separate it again','Only the shape changes'],'Colour, smell and texture all change because NEW substances form. Branch 1 and 3 explain how to tell.'],
 ['Wood burns inside a closed box. The total mass of everything inside...','stays the same',['decreases: the ash is lighter','increases: the fire adds mass'],'The atoms are not destroyed: they become ash and gases, all still in the box. Branch 5: Lavoisier\'s law.'],
 ['In H₂O, the small 2 means...','2 hydrogen atoms in one molecule',['2 water molecules','water heated twice'],'A small number below = atoms in ONE molecule. A big number in front (2H₂O) = 2 molecules. Branch 5.']];
const LEARN=`<style>
.mm{background:linear-gradient(180deg,#f0f9ff,#faf5ff);border-radius:22px;padding:6px;border:3px solid #bae6fd}
.mm svg{width:100%;display:block;touch-action:manipulation}.mm g.nd{cursor:pointer}
.mm path.fl{stroke-dasharray:7 7;animation:flow 1.4s linear infinite}@keyframes flow{to{stroke-dashoffset:-28}}
.mm .ctr{animation:pulse 2.4s ease-in-out infinite;transform-origin:180px 185px}@keyframes pulse{50%{transform:scale(1.06)}}
.mmbar{display:flex;gap:8px;align-items:center;justify-content:space-between;margin:8px 0;flex-wrap:wrap}
.mmbar button{border:3px solid #a5b4fc;background:#fff;border-radius:14px;padding:6px 10px;font:inherit;font-weight:800;cursor:pointer;color:#312e81;min-height:44px}
.mmbar button.on{background:#312e81;color:#fff}
.bp{border:4px solid #ddd;border-radius:20px;padding:10px;margin:6px 0;background:#fff}
.story{background:#0f172a;color:#e0f2fe;border-radius:14px;padding:8px 10px;margin:8px 0;font-weight:600;font-size:16px}
.leaf{display:flex;gap:8px;align-items:flex-start;background:#fafafa;border-radius:12px;padding:6px 8px;margin:5px 0;border-left:5px solid var(--bc);font-size:16px}
.leaf .ic{font-size:22px;line-height:1.2}.leaf.hid span.tx{filter:blur(7px);cursor:pointer}.leaf.hid{cursor:pointer}
.chain{display:flex;flex-wrap:wrap;gap:4px;align-items:center;justify-content:center;font-size:28px;background:#fffbeb;border:3px dashed #fcd34d;border-radius:16px;padding:6px;margin-top:8px}
.chain i{font-style:normal;font-size:16px;color:#d97706}.chain small{display:block;font-size:11px;font-weight:700;color:#475569;text-align:center}.chain div{text-align:center}
.tip{font-size:15px;margin-top:6px;color:#7c2d12;font-weight:700}
.eqrow{display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:center;font-size:22px;font-weight:800;margin:8px 0}
.term{display:flex;flex-direction:column;align-items:center;background:#fff;border:3px solid #c7d2fe;border-radius:14px;padding:2px 6px}
.term .cf{display:flex;align-items:center;gap:4px}.term button{width:40px;height:40px;border-radius:10px;border:0;background:#e0e7ff;font:inherit;font-size:20px;font-weight:800;cursor:pointer}
.atom{transition:transform 1.1s cubic-bezier(.5,0,.3,1)}.bond{animation:bf .6s ease-out}@keyframes bf{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){.atom{transition:none}}
.atab{width:100%;border-collapse:collapse;margin:6px 0;font-size:16px}.atab td,.atab th{border:2px solid #e2e8f0;padding:4px;text-align:center}
</style>
<h2>🧪 Mission: The Kitchen Lab</h2>
<div class="bubble" style="margin:8px 0">Ahmed, your mission: find out what really happens when things <b>change</b>, and learn to write it in the secret code of chemists: <b>equations</b>. ${playBtn('intro','🔊 Mission briefing')}</div>
<div class="lab"><h3>🔮 Warm-up: guess first!</h3><p style="margin:2px 0">No hearts, no stress. A guess (even a wrong one) helps your brain catch the answer later.</p><div id="pre"></div></div>
<h3>🗺️ The mission map</h3>
<div class="mm"><svg id="mmap" viewBox="0 0 360 360" role="img" aria-label="Mind map: chemical reactions and equations"></svg></div>
<div class="mmbar"><span id="mmCount" style="font-weight:800;color:#312e81"></span><button id="recall">🧠 Recall mode: hide details</button></div>
<div id="bp"></div>
<div class="lab"><h3>⚛️ Lab 1: Watch the atoms</h3><p style="margin:2px 0">Methane burns in oxygen. Watch what the atoms really do.</p><div id="atoms"></div></div>
<div class="lab"><h3>🔍 Lab 2: The 4 clues</h3><p style="margin:2px 0">Four experiments from your book. For each one: <b>predict</b>, <b>watch</b>, then <b>explain</b>.</p><div id="clues"></div></div>
<div class="lab"><h3>🎈 Lab 3: The balloon experiment</h3><p style="margin:2px 0">Baking soda is in the balloon, vinegar in the bottle. <b>Predict</b>, then <b>watch</b>, then <b>explain</b>.</p><div id="poe"></div></div>
<div class="lab"><h3>🗂️ Lab 4: Physical or chemical?</h3><p style="margin:2px 0">Tap a card, then tap the right box.</p><div id="sort"></div></div>
<div class="lab"><h3>⚖️ Lab 5: Balance it!</h3><p style="margin:2px 0">Use <b>−</b> and <b>+</b> to change the coefficients until the scale is level. You can never change the small numbers.</p><div id="bal"></div></div>
<div class="prog" id="labsProg"></div>`;
const LABN={map:'🗺️ Map',atoms:'⚛️ Atoms',clues:'🔍 Clues',poe:'🎈 Balloon',sort:'🗂️ Sort',bal:'⚖️ Balance'};
function labsProgress(){if(typeof CLUES!=='undefined'&&CLUES.every(c=>labIsDone(c[0]))&&!labIsDone('clues')){labDone('clues');return;}if(clueLab.paint)clueLab.paint();const el=$('labsProg');if(el)el.textContent='Mission progress: '+Object.keys(LABN).map(k=>(labIsDone(k)?'✅ ':'⬜ ')+LABN[k]).join(' · ');}
function balloonRun(stage){
  stage.innerHTML=`<svg viewBox="0 0 200 220" style="width:100%;max-width:260px;display:block;margin:6px auto"><ellipse id="bl" cx="100" cy="62" rx="18" ry="22" fill="#f87171"/><rect x="92" y="78" width="16" height="16" fill="#f87171"/>
   <rect x="70" y="92" width="60" height="110" rx="12" fill="#e0f2fe" stroke="#334155" stroke-width="3"/><rect id="vin" x="73" y="160" width="54" height="39" rx="8" fill="#fde68a"/><g id="bub"></g><g id="pow"></g></svg><div style="text-align:center;font-weight:800" id="obs"></div>`;
  const bl=stage.querySelector('#bl'),bub=stage.querySelector('#bub'),pow=stage.querySelector('#pow'),obs=stage.querySelector('#obs');let t=0;
  return new Promise(res=>{const iv=setInterval(()=>{t++;
    if(t<8){pow.innerHTML=[0,1,2,3].map(k=>`<circle cx="${88+k*8}" cy="${96+t*8}" r="3" fill="#fff" stroke="#94a3b8"/>`).join('');obs.textContent='The baking soda falls into the vinegar...';}
    else{pow.innerHTML='';const r=Math.min(18+(t-8)*2.6,64);bl.setAttribute('rx',r);bl.setAttribute('ry',r*1.15);bl.setAttribute('cy',78-r*1.05);
      bub.innerHTML=Array.from({length:12},()=>`<circle cx="${78+Math.random()*44}" cy="${110+Math.random()*80}" r="${2+Math.random()*4}" fill="#fff" stroke="#38bdf8"/>`).join('');obs.textContent='🫧 Fizzing (effervescence)... the balloon inflates!';}
    if(t>26){clearInterval(iv);res();}},110);});
}
// ---- shared frame runner for the 4 clue experiments (about 3 s each) ----
const runFrames=(stage,svg,n,step,ms)=>{stage.innerHTML=svg+'<div style="text-align:center;font-weight:800;min-height:24px" class="obs"></div>';
  const obs=stage.querySelector('.obs');let t=0;return new Promise(res=>{const iv=setInterval(()=>{t++;step(t,stage,obs);if(t>=n){clearInterval(iv);res();}},ms||110);});};
const BEAKER=(fill,id)=>`<path d="M60 70 L60 196 Q60 206 70 206 L130 206 Q140 206 140 196 L140 70" fill="none" stroke="#334155" stroke-width="3"/><rect id="${id}" x="62" y="120" width="76" height="84" rx="6" fill="${fill}"/>`;
const SV=inner=>`<svg viewBox="0 0 200 220" style="width:100%;max-width:240px;display:block;margin:6px auto">${inner}</svg>`;
function runPrecip(stage){
  return runFrames(stage,SV(BEAKER('#e0f2fe','liq')+`<g id="drop"><rect x="92" y="10" width="16" height="40" rx="4" fill="#cbd5e1"/><circle cx="100" cy="56" r="4" fill="#e0f2fe"/></g><g id="pp"></g>`),30,(t,s,obs)=>{
    const pp=s.querySelector('#pp');
    if(t<6){s.querySelector('#drop circle').setAttribute('cy',56+t*10);obs.textContent='Adding silver nitrate (AgNO₃) to sodium chloride (NaCl)...';}
    else if(t<22){pp.innerHTML=Array.from({length:Math.min(40,(t-5)*4)},(_,k)=>`<circle cx="${68+(k*37)%64}" cy="${Math.min(198,126+((k*53)%40)+(t-6)*3)}" r="${2+k%3}" fill="#fff" stroke="#94a3b8" stroke-width=".5"/>`).join('');obs.textContent='🧂 A white solid appears and sinks: a precipitate!';}
    else{pp.querySelectorAll('circle').forEach(c=>c.setAttribute('fill','#c084fc'));s.querySelector('#liq').setAttribute('fill','#fef9c3');obs.textContent='☀️ In sunlight it turns violet.';}
  });}
function runColour(stage){
  return runFrames(stage,SV(BEAKER('#3b82f6','liq')+`<rect x="94" y="40" width="14" height="160" rx="3" fill="#94a3b8" stroke="#475569"/><rect id="cu" x="94" y="120" width="14" height="80" rx="3" fill="#b45309" opacity="0"/>`),30,(t,s,obs)=>{
    const k=Math.min(1,t/26),c=v=>Math.round(v);
    s.querySelector('#liq').setAttribute('fill',`rgb(${c(59+(224-59)*k)},${c(130+(242-130)*k)},${c(246+(254-246)*k)})`);
    s.querySelector('#cu').setAttribute('opacity',k.toFixed(2));
    obs.textContent=t<10?'A zinc plate in blue copper sulphate (CuSO₄)...':t<26?'🎨 The blue is fading...':'🎨 Colourless zinc sulphate + reddish-brown copper on the zinc!';
  });}
function runGas(stage){
  return runFrames(stage,SV(`<path d="M75 30 L75 190 Q75 210 100 210 Q125 210 125 190 L125 30" fill="#f8fafc" stroke="#334155" stroke-width="3"/><rect x="78" y="90" width="44" height="110" fill="#e0f2fe"/><path id="mg" d="M92 120 l16 10 l-16 10 l16 10 l-16 10 l16 10" fill="none" stroke="#64748b" stroke-width="5"/><g id="bb"></g>`),30,(t,s,obs)=>{
    s.querySelector('#bb').innerHTML=t<4?'':Array.from({length:14},(_,k)=>{const y=180-((t*9+k*23)%95);return `<circle cx="${86+(k*13)%30}" cy="${y}" r="${2+k%3}" fill="#fff" stroke="#0ea5e9"/>`;}).join('');
    s.querySelector('#mg').setAttribute('stroke-width',Math.max(2,5-t*0.1));
    obs.textContent=t<4?'Magnesium ribbon into dilute hydrochloric acid (HCl)...':'🫧 Bubbles of gas on the magnesium!';
  });}
function runFlame(stage){
  return runFrames(stage,SV(`<rect id="bg" x="0" y="0" width="200" height="220" fill="#0f172a"/><path d="M10 60 L90 100" stroke="#94a3b8" stroke-width="6"/><rect id="strip" x="88" y="96" width="60" height="6" fill="#cbd5e1"/><g id="sp"></g><path d="M100 210 q-14 -30 0 -60 q14 30 0 60" fill="#f97316"/>`),30,(t,s,obs)=>{
    const lit=t>6&&t<24;s.querySelector('#bg').setAttribute('fill',lit?(t%2?'#fefce8':'#ffffff'):'#0f172a');
    s.querySelector('#sp').innerHTML=lit?Array.from({length:10},(_,k)=>`<line x1="118" y1="99" x2="${118+Math.cos(k+t)*30}" y2="${99+Math.sin(k+t)*30}" stroke="#facc15" stroke-width="2"/>`).join(''):'';
    if(t>=24){s.querySelector('#strip').setAttribute('fill','#f8fafc');s.querySelector('#strip').setAttribute('height','10');}
    obs.textContent=t<=6?'Holding a magnesium strip in the flame with tongs...':lit?'💡 Dazzling white light and heat! (never look straight at it)':'Left behind: a white powder.';
  });}
const CLUES=[
 ['clueP','🧂 Precipitate',{predict:['Silver nitrate is added to sodium chloride solution. You will see...','a white solid forming and sinking',['bubbles of gas','the liquid turning blue','nothing at all']],run:runPrecip,
   explain:['What is the white solid?','Silver chloride: a new substance that does not dissolve in water',['Salt coming out of the water','Frozen water','Silver metal'],'AgNO₃ + NaCl → NaNO₃ + AgCl. Silver chloride is insoluble, so it appears as a precipitate and turns violet in sunlight. Clue: formation of a precipitate.']}],
 ['clueC','🎨 Colour',{predict:['A zinc plate sits in blue copper sulphate solution. After a while...','the blue fades and a reddish-brown layer covers the zinc',['the solution turns darker blue','a white precipitate forms','nothing happens']],run:runColour,
   explain:['Why does the blue colour disappear?','Copper sulphate is used up: colourless zinc sulphate forms and copper deposits',['The blue evaporates','The zinc soaks up the colour like a sponge','Light bleaches the colour'],'Zn + CuSO₄ → ZnSO₄ + Cu. The blue came from copper sulphate; zinc sulphate is colourless and the reddish-brown layer is copper. Clue: colour change.']}],
 ['clueG','🫧 Gas',{predict:['A magnesium ribbon goes into dilute hydrochloric acid. You will see...','bubbles of gas on the magnesium',['a white precipitate','the acid turning blue','a dazzling light']],run:runGas,
   explain:['Which gas is in the bubbles?','Hydrogen: a new gas made by the reaction',['Air that was trapped in the acid','Water vapour from boiling','Oxygen from the acid'],'Mg + 2HCl → MgCl₂ + H₂. The bubbles are a NEW gas, hydrogen. Clue: evolution of a gas.']}],
 ['clueL','💡 Light & heat',{predict:['A magnesium strip is held in a flame with tongs. It will...','burn with a dazzling white light and leave a white powder',['melt into a silver liquid','turn blue','do nothing: metals cannot burn']],run:runFlame,
   explain:['What is the white powder?','Magnesium oxide: magnesium joined with oxygen from the air',['Ash from the tongs','Magnesium that cooled down','Table salt'],'2Mg + O₂ → 2MgO. The light and heat show a reaction. Safety: tongs (it is very hot), a mask (the light can hurt your eyes), and do not touch the hot powder. Clue: emission of light and heat.']}]];
const POE_TXT={s1:'1️⃣ Predict',s3:'3️⃣ Explain',watch:'2️⃣ Watch...',predOk:'🎯 Your prediction was right!',predNo:'😮 Surprise! Look at what happened.',toExplain:'Now explain it ➡',tryAgain:'Not quite. Look at the experiment again.'};
function clueLab(){
  const box=$('clues');
  box.innerHTML=`<div class="chips" id="clueBtns"></div>`+CLUES.map(c=>`<div id="${c[0]}" hidden></div>`).join('');
  const paint=()=>{$('clueBtns').innerHTML=CLUES.map((c,i)=>`<button data-i="${i}">${labIsDone(c[0])?'✅ ':''}${c[1]}</button>`).join('');
    $('clueBtns').querySelectorAll('button').forEach(b=>b.onclick=()=>{CLUES.forEach((c,j)=>{$(c[0]).hidden=j!=+b.dataset.i;});
      $('clueBtns').querySelectorAll('button').forEach(x=>x.classList.toggle('sel',x===b));});};
  CLUES.forEach(c=>poeLab(c[0],c[2],POE_TXT));paint();$(CLUES[0][0]).hidden=false;$('clueBtns').querySelector('button').classList.add('sel');
  clueLab.paint=paint;
}
// ---- atoms in motion: CH4 + 2O2 -> CO2 + 2H2O ----
const AT=[['C',0],['H',0],['H',0],['H',0],['H',0],['O',1],['O',1],['O',2],['O',2]];   // [element, start molecule]
const APOS=[
 [[60,85],[60,62],[60,108],[37,85],[83,85],[140,55],[164,55],[140,115],[164,115]],        // reactants
 [[70,85],[62,40],[66,130],[22,92],[104,70],[150,30],[196,62],[136,140],[188,120]],       // bonds broken, atoms apart
 [[240,85],[270,40],[296,40],[270,130],[296,130],[214,85],[283,58],[266,85],[283,112]],   // rearranged (no bonds yet)
 [[240,85],[268,46],[298,46],[268,124],[298,124],[216,85],[283,62],[264,85],[283,108]]];  // products: O=C=O + 2 H-O-H
const BONDS=[[[0,1],[0,2],[0,3],[0,4],[5,6],[7,8]],[],[],[[5,0],[0,7],[1,6],[2,6],[3,8],[4,8]]];
const ACOL={C:['#1f2937',13],H:['#f8fafc',8],O:['#ef4444',11]};
const ACAP=['Reactants: 1 methane (CH₄) + 2 oxygen (O₂). Tap ▶ to start.','💥 Step 1: the bonds in CH₄ and O₂ break.','🔄 Step 2: the same atoms move and rearrange.','🔗 Step 3: new bonds form: 1 CO₂ + 2 H₂O. Same 9 atoms, new partners!'];
function atomLab(){
  const box=$('atoms');let st=0,busy=false;
  box.innerHTML=`<svg viewBox="0 0 340 170" style="width:100%;max-width:440px;display:block;margin:0 auto;background:#0f172a;border-radius:16px" aria-label="Atoms rearranging"><g id="abonds"></g>${AT.map((a,i)=>`<g class="atom" id="at${i}"><circle r="${ACOL[a[0]][1]}" fill="${ACOL[a[0]][0]}" stroke="#94a3b8" stroke-width="1.5"/><text y="4" text-anchor="middle" font-size="10" font-weight="800" fill="${a[0]=='H'?'#0f172a':'#fff'}">${a[0]}</text></g>`).join('')}</svg>
   <div class="fb hint" id="acap"></div><div class="row" style="justify-content:center"><button class="big g" id="atomPlay">▶ Play the reaction</button></div>
   <table class="atab" id="acount" hidden><tr><th>Atoms</th><th>Before</th><th>After</th></tr><tr><td>C</td><td>1</td><td>1 ✅</td></tr><tr><td>H</td><td>4</td><td>4 ✅</td></tr><tr><td>O</td><td>4</td><td>4 ✅</td></tr></table>`;
  function set(s){st=s;AT.forEach((_,i)=>{$('at'+i).style.transform=`translate(${APOS[s][i][0]}px,${APOS[s][i][1]}px)`;});
    $('abonds').innerHTML=BONDS[s].map(b=>`<line x1="${APOS[s][b[0]][0]}" y1="${APOS[s][b[0]][1]}" x2="${APOS[s][b[1]][0]}" y2="${APOS[s][b[1]][1]}" stroke="#e2e8f0" stroke-width="4" class="bond"/>`).join('');
    $('acap').textContent=ACAP[s];$('acount').hidden=s<3;}
  set(0);
  $('atomPlay').onclick=()=>{if(busy)return;busy=true;set(0);[1,2,3].forEach((s,k)=>setTimeout(()=>{set(s);if(s===3){busy=false;$('atomPlay').textContent='🔁 Play again';labDone('atoms');}},1400*(k+1)));};
}
const BL=['N2+H2>NH3','H2+O2>H2O','CH4+O2>CO2+H2O','Mg+O2>MgO','Na+Cl2>NaCl'].map(parseEq);
function balLab(){
  const box=$('bal');let q=0,solved=0,cl,cr;
  const gcd=(a,b)=>b?gcd(b,a%b):a;
  function start(){const e=BL[q%BL.length];cl=e.l.map(()=>1);cr=e.r.map(()=>1);draw();}
  function draw(){
    const e=BL[q%BL.length],L=atoms(e.l,cl),R=atoms(e.r,cr),els=Object.keys(Object.assign({},L,R)),ok=els.every(k=>L[k]===R[k]);
    const lt=Object.values(L).reduce((a,b)=>a+b,0),rt=Object.values(R).reduce((a,b)=>a+b,0),ang=ok?0:Math.max(-16,Math.min(16,(rt-lt)*4));
    const term=(x,i,s)=>`<div class="term"><div class="cf"><button data-s="${s}" data-i="${i}" data-d="-1" aria-label="less">−</button><span>${(s=='l'?cl:cr)[i]}</span><button data-s="${s}" data-i="${i}" data-d="1" aria-label="more">+</button></div><div>${F(x[1])}</div></div>`;
    const simplest=cl.concat(cr).reduce(gcd)===1;
    box.innerHTML=`<div class="prog">Equation ${q%BL.length+1} of ${BL.length} · solved: ${solved}</div><div class="eqrow">${e.l.map((x,i)=>term(x,i,'l')).join('<span>+</span>')}<span>→</span>${e.r.map((x,i)=>term(x,i,'r')).join('<span>+</span>')}</div>
     <svg viewBox="0 0 240 90" style="width:100%;max-width:300px;display:block;margin:0 auto"><polygon points="110,86 130,86 120,40" fill="#64748b"/><g transform="rotate(${ang} 120 40)"><rect x="20" y="36" width="200" height="8" rx="4" fill="${ok?'#22c55e':'#f59e0b'}"/><text x="40" y="28" font-size="14" font-weight="800">Left ${lt}</text><text x="160" y="28" font-size="14" font-weight="800">Right ${rt}</text></g></svg>
     <table class="atab"><tr><th>Element</th><th>Left</th><th>Right</th><th></th></tr>${els.map(k=>`<tr><td><b>${k}</b></td><td>${L[k]||0}</td><td>${R[k]||0}</td><td>${L[k]===R[k]?'✅':'❌'}</td></tr>`).join('')}</table>
     <div class="fb ${ok?'good':'hint'}">${ok?(simplest?`✅ Balanced! ${showEq(e,cl,cr)}`:'Balanced, but not the simplest ratio: divide all the coefficients by the same number.'):'Count again: which element is not equal yet? Change a coefficient in front of a formula that contains it.'}</div>
     ${ok&&simplest?`<button class="big g" id="balNext">Next equation ➡</button>`:''}`;
    box.querySelectorAll('.term button').forEach(b=>b.onclick=()=>{const a=b.dataset.s=='l'?cl:cr,i=+b.dataset.i;a[i]=Math.max(1,Math.min(9,a[i]+ +b.dataset.d));draw();});
    if(ok&&simplest){const nb=$('balNext');nb.onclick=()=>{solved++;if(solved>=3)labDone('bal');q++;start();};}
  }
  start();
}
function learnInit(){
  wirePlay($('learn'));
  preTest('pre',PRE,{n:(i,t)=>`Guess ${i} of ${t}`,good:'🎯 Nice instinct!',guess:'🤔 Interesting guess. Here is the real answer:',done:'✅ Warm-up done. Now open the map and see why.'});
  mindMap({BR,center:{e:'🧪',l1:'Reactions &',l2:'Equations',c1:'#38bdf8',c2:'#312e81'},ids:{svg:'mmap',bp:'bp',count:'mmCount',recall:'recall'},
    txt:{all:'🗺️ All 5 branches opened!',count:(n,t)=>`Branches opened: ${n} of ${t}`,tap:'👆 Tap a branch on the map. Tap 🔊 to hear it explained.',recall:'🧠 Recall mode: hide details',show:'👀 Show details',listen:'🔊 Listen'}});
  poeLab('poe',{predict:['When the baking soda falls into the vinegar, the balloon will...','inflate',['stay the same','be sucked into the bottle','pop straight away']],run:balloonRun,
    explain:['Why did the balloon inflate?','A chemical reaction made a NEW gas (carbon dioxide)',['The vinegar evaporated and pushed the balloon','The powder dissolved and took up space','Air from outside got into the bottle'],
     'Baking soda + vinegar react. The fizzing (effervescence) is a new gas, CO₂, which fills the balloon. A new substance = a chemical change. Clue: evolution of a gas.']},
    {s1:'1️⃣ Predict',s3:'3️⃣ Explain',watch:'2️⃣ Watch...',predOk:'🎯 Your prediction was right!',predNo:'😮 Surprise! Look at what happened.',toExplain:'Now explain it ➡',tryAgain:'Not quite. Think: where did the extra gas come from?'});
  sortLab('sort',{bins:['🧊 Physical','🔥 Chemical'],items:shuffle(CHG).slice(0,10).map(c=>[c[0],c[1],c[2]])},
    {left:n=>`Cards left: ${n}`,now:'Now tap the right box 👇',first:'Tap a card first 👆',done:'🗂️ All sorted! You can spot a new substance.'});
  atomLab();clueLab();balLab();labsProgress();
}
const LESSON={ui:'en',child:'Ahmed',key:'ahmed_chem_u2_g8_v1',age:'teen',conf:true,finite:6,
 title:'🧪 Ahmed\'s Chemistry Lab: Reactions & Equations',
 css:'body{background:linear-gradient(180deg,#e0f2fe,#f1f5f9)}header{background:linear-gradient(135deg,#0f172a,#1e3a8a 55%,#0e7490);box-shadow:0 6px 0 #0f172a}nav button{color:#0f172a;box-shadow:0 3px 0 #7dd3fc}h2{color:#1e3a8a}h3{color:#0e7490}.bubble{background:#f0f9ff;border-color:#7dd3fc}.bubble:before{border-right-color:#7dd3fc!important}.qbox{background:#f0f9ff}',
 mX:'Open all 5 map branches and finish all 5 labs',labs:['map','atoms','clues','poe','sort','bal'],
 tabs:['🧪 Learn','🧊 Changes','🔍 Reactions','⚖️ Equations'],
 secs:[{h:'🧊 Physical or chemical change?',short:'Changes',intro:'One question decides it: <b>did a new substance form?</b> Yes → chemical. No (only state or shape) → physical.'},
       {h:'🔍 Inside a reaction & the 4 clues',short:'Reactions',intro:'Bonds break, atoms rearrange, new bonds form. Spot it with <b>P-C-G-L</b>: Precipitate, Colour, Gas, Light & heat.'},
       {h:'⚖️ Equations & balancing',short:'Equations',intro:'States (s)(l)(g)(v)(aq), conditions on the arrow, and <b>mass in = mass out</b>. Balance with coefficients only.'}],
 stk:[['🎯','First Reaction'],['🧊','Change Spotter'],['🔥','Change Expert'],['🔍','Clue Finder'],['🕵️','Lab Detective'],['✍️','Equation Writer'],['⚖️','Balance Master'],['🧪','Lab Explorer'],['🔥','Chain Reaction'],['⚡','Lightning'],['👑','Lavoisier Crown'],['🏆','Chief Scientist']],
 learnHTML:LEARN,banks:[A,B,C],pool:POOL};
