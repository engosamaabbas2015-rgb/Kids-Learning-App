// Ahmed, Grade 8 (2nd prep), German: sentence structure (Satzbau). Verb position, questions, modal frame, aber.
// ---------- helpers ----------
const U1=s=>s.charAt(0).toUpperCase()+s.slice(1);
const lw=s=>s.charAt(0).toLowerCase()+s.slice(1);
const sen=(parts,end)=>U1(parts.filter(Boolean).join(' '))+end;
const tiles=parts=>{const a=parts.slice().sort((x,y)=>x.toLowerCase().localeCompare(y.toLowerCase(),'de'));
  return (a.every((t,i)=>t===parts[i])?a.reverse():a).join(' – ');};
const hintStart=(parts)=>'Start like this: '+U1(parts[0])+' '+parts[1]+' ...';
// persons: 0 ich, 1 du, 2 er/sie/es, 3 wir, 4 ihr, 5 sie (plural)
const SUBJ=[{w:'ich',p:0},{w:'du',p:1},{w:'er',p:2},{w:'wir',p:3},{w:'ihr',p:4},{w:'Ali',p:2},{w:'Soha',p:2},{w:'Paul',p:2},
 {w:'meine Freundin',p:2},{w:'mein Bruder',p:2},{w:'die Kinder',p:5},{w:'meine Freunde',p:5}];
const SUBJ2=SUBJ.filter(s=>s.w.includes(' '));
const V={
 spielen:{f:['spiele','spielst','spielt','spielen','spielt','spielen'],o:['Fußball','Tennis','Gitarre','Basketball']},
 lernen:{f:['lerne','lernst','lernt','lernen','lernt','lernen'],o:['Deutsch','Englisch','Vokabeln']},
 trinken:{f:['trinke','trinkst','trinkt','trinken','trinkt','trinken'],o:['Tee','Wasser','Milch','Saft']},
 kaufen:{f:['kaufe','kaufst','kauft','kaufen','kauft','kaufen'],o:['Brot','Obst','ein Buch','Gemüse']},
 hören:{f:['höre','hörst','hört','hören','hört','hören'],o:['Musik','Radio']},
 machen:{f:['mache','machst','macht','machen','macht','machen'],o:['Hausaufgaben','Sport']},
 essen:{f:['esse','isst','isst','essen','esst','essen'],o:['Fisch','Pizza','Obst','Reis']},
 sprechen:{f:['spreche','sprichst','spricht','sprechen','sprecht','sprechen'],o:['Englisch','Deutsch','Italienisch']},
 lesen:{f:['lese','liest','liest','lesen','lest','lesen'],o:['ein Buch','einen Artikel','eine Zeitung']}};
const WOHNEN=['wohne','wohnst','wohnt','wohnen','wohnt','wohnen'];
const VK=Object.keys(V);
const TIME=['heute','jeden Tag','jeden Abend','am Wochenende','im Sommer','am Montag','jetzt','morgen'];
const TIME2=TIME.filter(t=>t.includes(' '));
const ctx=()=>{const s=pick(SUBJ),vk=pick(VK),v=V[vk];return {s:s.w,p:s.p,vk,f:v.f,vf:v.f[s.p],o:pick(v.o),t:pick(TIME)};};
const GN=(p)=>['ich','du','er / sie','wir','ihr','sie (they)'][p];

// ---------- Section A: the verb is in position 2 ----------
const gStmt=n=>{const c=ctx(),ok=[c.s,c.vf,c.t,c.o],a=sen(ok,'.');
 return mk('Put the words in the right order to make a <b>statement</b>:<br><b>'+tiles(ok)+'</b>',a,
  [[sen([c.s,c.t,c.o,c.vf],'.'),'The verb is not the last word. In a statement it is the <b>2nd</b> block.'],
   [sen([c.s,c.t,c.vf,c.o],'.'),'Count again: '+c.s+' is position 1, so the verb must come right after it.'],
   [sen([c.o,c.s,c.vf,c.t],'.'),'The verb must be in position 2, not 3.'],
   [sen([c.s,c.o,c.vf,c.t],'.'),'Only ONE block can stand before the verb.']],
  ['Find the verb (the action word with an ending).','In a statement the conjugated verb is always in position 2.',hintStart(ok)],n);};
const gFront=n=>{const c=ctx(),ok=[c.t,c.vf,c.s,c.o],a=sen(ok,'.');
 return mk('Make a <b>statement</b> that starts with <b>'+c.t+'</b>:<br><b>'+tiles(ok)+'</b>',a,
  [[sen([c.t,c.s,c.vf,c.o],'.'),'After '+c.t+' the verb must come NEXT (position 2). The subject moves behind the verb.'],
   [sen([c.t,c.s,c.o,c.vf],'.'),'The verb is not the last word. It stays in position 2.'],
   [sen([c.t,c.o,c.vf,c.s],'.'),'Position 1 is '+c.t+'. The verb must be next, so '+c.o+' cannot stand before it.']],
  ['Position 1 is '+c.t+'. What must be in position 2?','The verb is always 2nd. The subject (<b>'+c.s+'</b>) goes AFTER the verb.',hintStart(ok)],n);};
const gConj=front=>n=>{const c=ctx(),inf=c.vk,parts=front?[c.t,'___',c.s,c.o]:[c.s,'___',c.t,c.o];
 const ws=[...new Set(c.f.filter(x=>x!==c.vf))];
 return mk('Fill the gap with the right form of <b>'+inf+'</b>:<br><b>'+sen(parts,'.')+'</b>',c.vf,
  ws.map(x=>[x,'That form belongs to '+GN(c.f.indexOf(x))+'. The subject here is <b>'+c.s+'</b> ('+GN(c.p)+').']),
  ['The ending depends on the SUBJECT ('+c.s+'), not on the first word.','ich -e · du -st · er/sie -t · wir -en · ihr -t · sie -en','The right form is the one for '+GN(c.p)+'.'],n);};
const factA=factQ([
 ['In a German <b>statement</b>, the conjugated verb is always in position...','2 (second)',[['1 (first)','Position 1 is the subject or a time/place. The verb comes next.'],'3 (third)','4 (last)'],['Ali SPIELT Fußball: subject first, verb second.']],
 ['A sentence starts with a time word: <b>Heute ... Ali ... Fußball</b>. Where does the verb go?','Heute <b>spielt</b> Ali Fußball.',[['Heute Ali <b>spielt</b> Fußball.','The verb must be 2nd, so it comes right after Heute.'],['Heute Ali Fußball <b>spielt</b>.','The verb is not at the end.'],'<b>Spielt</b> heute Ali Fußball.'],['The verb is 2nd, whatever stands in position 1.']],
 ['When <b>Heute</b> (not the subject) is in position 1, the subject goes...','after the verb',['before the verb','at the end of the sentence','before Heute'],['Heute SPIELT ALI Fußball: verb, then subject.']],
 ['Which word is the conjugated verb in: <b>Am Wochenende lernt Soha Deutsch.</b>','lernt',[['Soha','Soha is the subject.'],'Deutsch',['Am Wochenende','That is the time block in position 1.']],['The verb is the action word with an ending.']],
 ['Which ending goes with <b>du</b>?','-st (du spielst)',['-e (du spiele)','-t (du spielt)','-en (du spielen)'],['ich -e · du -st · er -t · wir -en · ihr -t.']],
 ['A <b>statement</b> starts with the verb. True or false?','False: the verb is in position 2',[['True: the verb always comes first','That is the rule for yes/no QUESTIONS.'],'True: only in German','False: the verb is always last'],['Statement: verb 2nd. Yes/no question: verb 1st.']]]);
// find the wrong sentence
const stmtPair=()=>{const c=ctx(),front=Math.random()<.5,ok=front?[c.t,c.vf,c.s,c.o]:[c.s,c.vf,c.t,c.o];
 const bad=front?pick([[c.t,c.s,c.vf,c.o],[c.t,c.s,c.o,c.vf],[c.t,c.o,c.vf,c.s]]):pick([[c.s,c.t,c.o,c.vf],[c.s,c.t,c.vf,c.o],[c.s,c.o,c.vf,c.t]]);
 return {ok:sen(ok,'.'),bad:sen(bad,'.'),c,front};};
const gOddStmt=n=>{let ps,tries=0;
 do{ps=[stmtPair(),stmtPair(),stmtPair()];tries++;}while(tries<20&&new Set(ps.map(p=>p.ok).concat(ps[0].bad)).size<4);
 return mk('Three sentences are correct. Which one is <b>WRONG</b>?',ps[0].bad,ps.slice(1).map(p=>[p.ok,'This one is correct: the verb is in position 2.']).concat([[ps[0].ok,'This one is correct: the verb is in position 2.']]),
  ['Check each sentence: which word is the verb, and in which position is it?','In a statement the verb must be 2nd. After a time word the subject comes behind the verb.','Look for the sentence where the verb is NOT 2nd.'],n);};
const gPosNum=n=>{const mode=Math.random()<.5?'front':'subj',c=ctx();let blk,parts;
 if(mode==='front'){blk=pick(TIME2);parts=[blk,c.vf,c.s,c.o];}
 else{const s=pick(SUBJ2),vk=pick(VK);blk=s.w;parts=[s.w,V[vk].f[s.p],pick(TIME),pick(V[vk].o)];}
 const tr='Count in BLOCKS, not word by word: <b>'+blk+'</b> is ONE block.';
 return mk('Count in blocks. In <b>'+sen(parts,'.')+'</b> the conjugated verb is in position...','Position 2',
  [['Position 3',tr],['Position 1','Position 1 is the block <b>'+blk+'</b>. The verb comes right after it.'],['Position 4',tr]],
  ['First find the verb: <b>'+parts[1]+'</b>.','Which block comes before it? <b>'+blk+'</b> = position 1.','So the verb is in position 2: the verb is ALWAYS 2nd in a statement.'],n);};
const gWhyWrong=n=>{const c=ctx(),m=pick(['noInv','verbEnd','verb3']);let bad,ok,ans;
 if(m==='noInv'){ok=sen([c.t,c.vf,c.s,c.o],'.');bad=sen([c.t,c.s,c.vf,c.o],'.');ans='Position 1 is “'+c.t+'”, so the verb must come next and the subject after it: “'+ok+'”';}
 else if(m==='verbEnd'){ok=sen([c.s,c.vf,c.t,c.o],'.');bad=sen([c.s,c.t,c.o,c.vf],'.');ans='The verb must be in position 2, not at the end: “'+ok+'”';}
 else{ok=sen([c.s,c.vf,c.t,c.o],'.');bad=sen([c.s,c.t,c.vf,c.o],'.');ans='The verb must come right after the subject (position 2): “'+ok+'”';}
 return mk('Why is <b>'+bad+'</b> wrong?',ans,
  [['A statement must start with a time word.','No. Position 1 can be the subject OR a time word. The problem is the verb position.'],
   ['The verb must come last in German.','Only the infinitive or prefix goes last (modal frame). The conjugated verb is 2nd.'],
   ['The subject must always come before the verb.','Not always: after a time word the subject comes behind the verb.']],
  ['Find the verb first.','The rule: in a statement the conjugated verb is in position 2.','Check what stands in position 1 and what comes right after it.'],n);};
const A={E:[gStmt,gConj(false),factA],H:[gFront,gConj(true),gStmt],X:[gOddStmt,gPosNum,gWhyWrong,gFront]};

// ---------- Section B: questions ----------
const gYN=n=>{const c=ctx(),ok=[c.vf,c.s,c.t,c.o];
 return mk('Make a <b>yes/no question</b>:<br><b>'+tiles([c.s,c.vf,c.t,c.o])+'</b>',sen(ok,'?'),
  [[sen([c.s,c.vf,c.t,c.o],'?'),'That is a statement with a question mark. A yes/no question starts with the VERB.'],
   [sen([c.s,c.t,c.o,c.vf],'?'),'The verb is not the last word. Put it in position 1.'],
   [sen([c.t,c.s,c.vf,c.o],'?'),'A yes/no question starts with the verb, not with a time word.']],
  ['A yes/no question has no question word.','Rule: the VERB goes to position 1, then the subject.',hintStart(ok)],n);};
const gWq=n=>{const c=ctx(),k=pick(['Was','Wann','Wo']);let W=k,rest,vf=c.vf,s=c.s;
 if(k==='Was')rest=[c.t];else if(k==='Wann')rest=[c.o];else{vf=WOHNEN[c.p];rest=['jetzt'];}
 const ok=[W,vf,s].concat(rest);
 return mk('Make a <b>W-question</b>:<br><b>'+tiles([lw(W),vf,s].concat(rest))+'</b>',sen(ok,'?'),
  [[sen([W,s,vf].concat(rest),'?'),'In a W-question the verb comes RIGHT AFTER the question word.'],
   [sen([W,s].concat(rest,[vf]),'?'),'The verb is not at the end: W-word, then verb.'],
   [sen([vf,lw(W),s].concat(rest),'?'),'A W-question starts with the W-word, not with the verb.']],
  ['Start with the W-word: <b>'+W+'</b>.','Formula: W-word + VERB + subject + the rest.',hintStart(ok)],n);};
const WEL=[
 ['Welche Nationalitäten','haben',['diese Schüler']],['Welche Sprachen','sprechen',['die Schüler']],['Welche Fächer','hat',['Soha','heute']],
 ['Welche Hobbys','hast',['du']],['Welche Farbe','hat',['dein Buch']],['Welche Länder','besuchen',['wir','im Sommer']],
 ['Welche Musik','hörst',['du','am Wochenende']],['Welches Buch','liest',['Paul','jetzt']]];
const gWelche=n=>{const w=pick(WEL),np=w[0],v=w[1],r=w[2],f=np.split(' ')[0],noun=np.split(' ')[1],ok=[np,v].concat(r);
 return mk('Put the words in order to make a question:<br><b>'+tiles([lw(f),noun,v].concat(r))+'</b>',sen(ok,'?'),
  [[sen([f,v].concat(r,[noun]),'?'),'<b>'+np+'</b> are a team. Keep the question word and its noun together in position 1.'],
   [sen([np].concat(r,[v]),'?'),'The verb is 2nd: question phrase, then verb.'],
   [sen([v,lw(np)].concat(r),'?'),'A W-question starts with the question phrase, not with the verb.']],
  [f+' + '+noun+' = ONE block (position 1).','Then the verb in position 2, then the subject.',hintStart(ok)],n);};
const WW=[['___ kommst du?','Aus Ägypten.','Woher'],['___ wohnst du?','In Kairo.','Wo'],['___ fährst du im Sommer?','Nach Berlin.','Wohin'],
 ['___ lernst du Deutsch?','Am Montag.','Wann'],['___ heißt du?','Ahmed.','Wie'],['___ spielt Fußball?','Ali.','Wer'],['___ trinkst du?','Tee.','Was'],
 ['___ kommt Soha?','Aus Frankreich.','Woher'],['___ wohnt Paul?','In Berlin.','Wo'],['___ gehst du jetzt?','Nach Hause.','Wohin'],['___ ist dein Bruder?','Dreizehn.','Wie alt']];
const WALL=['Wer','Was','Wo','Woher','Wohin','Wann','Wie'];
const gWword=n=>{const g=pick(WW),a=g[2],ws=(a==='Wie alt'?['Wer','Wann','Wo','Was']:WALL.filter(x=>x!==a));
 return mk('Which <b>W-word</b> fits?<br><b>'+g[0]+'</b> — <i>'+g[1]+'</i>',a,
  ws.map(w=>[w,'<b>'+w+'</b> asks for '+({Wer:'a person',Was:'a thing',Wo:'a place',Woher:'where someone comes from',Wohin:'a direction (where to)',Wann:'a time',Wie:'how / a name'})[w]+'. Look at the answer again.']),
  ['Look at the answer: is it a person, a thing, a place, a direction or a time?','Woher = from where · Wo = where · Wohin = where to · Wann = when · Wer = who · Was = what · Wie = how','The right W-word is <b>'+a+'</b>.'],n);};
const gYNconv=n=>{const c=ctx(),st=sen([c.s,c.vf,c.t,c.o],'.'),wf=c.f.find(x=>x!==c.vf);
 return mk('Turn the statement into a <b>yes/no question</b>:<br><b>'+st+'</b>',sen([c.vf,c.s,c.t,c.o],'?'),
  [[sen([c.s,c.vf,c.t,c.o],'?'),'You only added “?”. Move the verb to the front.'],
   [sen([c.s,c.t,c.o,c.vf],'?'),'The verb goes to position 1, not to the end.'],
   [sen([wf,c.s,c.t,c.o],'?'),'The verb keeps its ending for '+c.s+' ('+c.vf+'). Do not change it.']],
  ['Swap the places of the subject and the verb.','Question: verb 1st, then the subject.','Keep the same verb form: <b>'+c.vf+'</b>.'],n);};
const factB=factQ([
 ['In a <b>yes/no question</b> the conjugated verb is in position...','1 (first)',[['2 (second)','That is for statements and W-questions.'],'3 (third)','last'],['Spielt Ali Fußball? The verb starts the question.']],
 ['Which question is correct?','Kommt ihr aus Amerika?',[['Ihr kommt aus Amerika?','That is a statement with a question mark.'],['Ihr aus Amerika kommt?','The verb is not at the end.'],'Aus Amerika ihr kommt?'],['Yes/no question: verb first.']],
 ['In a <b>W-question</b> the word right after the W-word is the...','verb',['subject','noun','adjective'],['Was MACHST du? W-word, then verb.']],
 ['Which two words are a team in <b>Welche Nationalitäten haben diese Schüler?</b>','Welche + Nationalitäten',['Welche + haben','haben + Schüler','diese + haben'],['The question word and its noun stay together.']],
 ['<b>Woher</b> asks about...','where someone comes from',['where someone lives','where someone goes','when something happens'],['Woher kommst du? Aus Ägypten.']],
 ['Which question is correct?','Was machst du am Wochenende?',[['Was du machst am Wochenende?','After the W-word comes the verb.'],['Machst was du am Wochenende?','Start with the W-word.'],'Was am Wochenende machst du?'],['W-word + verb + subject.']]]);
const GM=[
 ['Aus Ägypten.','Woher kommst du?',['Wo wohnst du?','Wohin gehst du?','Wann kommst du?']],
 ['In Kairo.','Wo wohnt ihr?',['Woher wohnt ihr?','Wohin wohnt ihr?','Wann wohnt ihr?']],
 ['Nach Frankreich.','Wohin fährt Soha?',['Woher fährt Soha?','Wann fährt Soha?','Wer fährt Soha?']],
 ['Am Wochenende.','Wann spielt Ali Fußball?',['Wo spielt Ali Fußball?','Was spielt Ali?','Wer spielt Fußball?']],
 ['Fußball.','Was spielt Ali am Wochenende?',['Wann spielt Ali am Wochenende?','Wo spielt Ali am Wochenende?','Wer spielt am Wochenende?']],
 ['Ali.','Wer kommt aus Berlin?',['Woher kommt Ali?','Wohin kommt Ali?','Wann kommt Ali aus Berlin?']],
 ['Ich heiße Ahmed.','Wie heißt du?',['Wo heißt du?','Wann heißt du?','Woher heißt du?']],
 ['Ich bin dreizehn.','Wie alt bist du?',['Wo bist du alt?','Wer bist du?','Wann bist du alt?']]];
const gMatch=n=>{const g=pick(GM),W=g[1].split(' ')[0];
 return mk('Which question fits the answer <b>“'+g[0]+'”</b>?',g[1],g[2].map(w=>[w,'Check the W-word: <b>'+w.split(' ')[0]+'</b> does not ask for “'+g[0].replace(/\.$/,'')+'”.']),
  ['Is the answer a person, a thing, a place, a direction or a time?','Woher = from where · Wo = where · Wohin = where to · Wann = when · Wer = who · Was = what · Wie = how','The right W-word is <b>'+W+'</b>.'],n);};
const qPairYN=()=>{const c=ctx(),ok=[c.vf,c.s,c.t,c.o],bad=pick([[c.s,c.vf,c.t,c.o],[c.s,c.t,c.o,c.vf],[c.t,c.s,c.vf,c.o]]);return {ok:sen(ok,'?'),bad:sen(bad,'?')};};
const qPairW=()=>{const c=ctx(),W=pick(['Was','Wann']),rest=W==='Was'?[c.t]:[c.o],ok=[W,c.vf,c.s].concat(rest),bad=pick([[W,c.s,c.vf].concat(rest),[W,c.s].concat(rest,[c.vf]),[c.vf,lw(W),c.s].concat(rest)]);return {ok:sen(ok,'?'),bad:sen(bad,'?')};};
const qPair=()=>Math.random()<.5?qPairYN():qPairW();
const gOddQ=n=>{let ps,tries=0;
 do{ps=[qPair(),qPair(),qPair()];tries++;}while(tries<20&&new Set(ps.map(p=>p.ok).concat(ps[0].bad)).size<4);
 return mk('Three questions are correct. Which one is <b>WRONG</b>?',ps[0].bad,ps.slice(1).map(p=>[p.ok,'This question is correct.']).concat([[ps[0].ok,'This question is correct.']]),
  ['Is it a yes/no question or a W-question?','Yes/no: verb FIRST. W-question: W-word, then the verb.','Find the question where the verb is in the wrong place.'],n);};
const gWhyQ=n=>{const yn=Math.random()<.5;let bad,ok,ans;
 if(yn){const c=ctx();ok=sen([c.vf,c.s,c.t,c.o],'?');bad=sen([c.s,c.vf,c.t,c.o],'?');ans='A yes/no question starts with the verb: “'+ok+'”';}
 else{const c=ctx(),W=pick(['Was','Wann']),rest=W==='Was'?[c.t]:[c.o];ok=sen([W,c.vf,c.s].concat(rest),'?');bad=sen([W,c.s,c.vf].concat(rest),'?');ans='In a W-question the verb comes right after the W-word: “'+ok+'”';}
 return mk('Why is <b>'+bad+'</b> wrong?',ans,
  [['A question must start with the subject.','Then it looks like a statement. A question starts with the verb (yes/no) or the W-word.'],
   ['A question needs the verb at the end.','No: the verb stays at the front of the question.'],
   ['A question needs a comma before the verb.','Commas are not the problem here. Look at the verb position.']],
  ['Is it a yes/no question or a W-question?','Yes/no: verb first. W-question: W-word + verb.','Find where the verb should be.'],n);};
const B={E:[gYN,gWq,gYN,gWword,gWq,factB],H:[gYNconv,gWq,gYN,gWelche,gWword,gYNconv],X:[gOddQ,gWhyQ,gMatch,gYN,gWelche,gWhyQ]};

// ---------- Section C: modal frame, separable verbs, aber ----------
const MOD={möchten:['möchte','möchtest','möchte','möchten','möchtet','möchten'],wollen:['will','willst','will','wollen','wollt','wollen'],
 müssen:['muss','musst','muss','müssen','müsst','müssen'],können:['kann','kannst','kann','können','könnt','können'],dürfen:['darf','darfst','darf','dürfen','dürft','dürfen']};
const MK=Object.keys(MOD);
const PRED=[{mid:['im Sommer','nach Frankreich'],inf:'fahren'},{mid:['Fisch'],inf:'essen'},{mid:['jeden Abend','einen Artikel'],inf:'lesen'},
 {mid:['heute','Hausaufgaben'],inf:'machen'},{mid:['am Wochenende','Fußball'],inf:'spielen'},{mid:['Deutsch'],inf:'lernen'},{mid:['Tee'],inf:'trinken'},
 {mid:['Musik'],inf:'hören'},{mid:['jetzt','Englisch'],inf:'sprechen'},{mid:['im Sommer','Freunde'],inf:'besuchen'}];
const mctx=()=>{const s=pick(SUBJ),mk0=pick(MK),pr=pick(PRED);return {s:s.w,p:s.p,mk:mk0,m:MOD[mk0][s.p],mid:pr.mid,inf:pr.inf};};
const gModal=n=>{const c=mctx(),ok=[c.s,c.m].concat(c.mid,[c.inf]);
 return mk('Put the words in order. There is a <b>modal verb</b>!<br><b>'+tiles(ok)+'</b>',sen(ok,'.'),
  [[sen([c.s].concat(c.mid,[c.m,c.inf]),'.'),'The modal verb must be in position 2, right after the subject.'],
   [sen([c.s,c.m,c.inf].concat(c.mid),'.'),'The second verb (<b>'+c.inf+'</b>) is an infinitive: it goes to the END of the sentence.'],
   [sen([c.s,c.inf].concat(c.mid),'.'),'Where is <b>'+c.m+'</b>? Use the modal verb in position 2 and the infinitive at the end.'],
   [sen([c.s].concat(c.mid,[c.inf,c.m]),'.'),'The modal verb is 2nd and the infinitive is last, not the other way round.']],
  ['Find TWO verbs: the modal ('+c.m+') and the infinitive ('+c.inf+').','Modal = position 2. Infinitive = the very END.',hintStart(ok)],n);};
const gModalForm=n=>{const c=mctx(),ws=[...new Set(MOD[c.mk].filter(x=>x!==c.m))];
 return mk('Fill the gap with the right form of <b>'+c.mk+'</b>:<br><b>'+sen([c.s,'___'].concat(c.mid,[c.inf]),'.')+'</b>',c.m,
  ws.map(x=>[x,'That form belongs to '+GN(MOD[c.mk].indexOf(x))+'. The subject is <b>'+c.s+'</b> ('+GN(c.p)+').']),
  ['The modal verb changes with the subject; the infinitive at the end does NOT change.','ich/er: same form (ich will, er will) · du: -st · wir/sie: = infinitive','Pick the form for '+GN(c.p)+'.'],n);};
const factModal=factQ([
 ['In a sentence with a <b>modal verb</b> (möchten, wollen, müssen, können, dürfen), the second verb goes...','to the END, as an infinitive',[['to position 3','The infinitive does not stay in the middle. It goes to the very end.'],'right after the subject','to the beginning'],['Soha will im Sommer nach Frankreich FAHREN.']],
 ['In <b>Ich muss meiner Mutter helfen</b> the infinitive is...','helfen (at the end)',[['muss (position 2)','muss is the modal verb.'],'meiner Mutter','ich'],['Modal in position 2, infinitive last.']],
 ['Which sentence is correct?','Soha will im Sommer nach Frankreich fahren.',[['Soha fahren im Sommer nach Frankreich.','The modal verb is missing.'],['Soha will fahren im Sommer nach Frankreich.','The infinitive goes to the end.'],'Soha im Sommer nach Frankreich will fahren.'],['Modal verb 2nd, infinitive at the end.']],
 ['Which verb form goes with <b>wollen</b> and <b>du</b>?','willst',['will','wollt','wollen'],['du willst, er will, wir wollen, ihr wollt.']],
 ['Before <b>aber</b> you always write...','a comma',['a full stop','nothing','a question mark'],['Paul ist Deutscher, aber Renate ist Deutsche.']],
 ['In <b>Wie sieht dein Tag aus?</b> the frame is made of...','sieht ... aus',['Wie ... Tag','dein ... aus','Wie ... sieht'],['Separable verb: the prefix aus goes to the END.']]]);
const gModalFront=n=>{let c=mctx(),tries=0;while(c.mid.length<2&&tries++<30)c=mctx();
 const front=c.mid[0],rest=c.mid.slice(1),ok=[front,c.m,c.s].concat(rest,[c.inf]);
 return mk('Start with <b>'+front+'</b>. Put the words in order:<br><b>'+tiles(ok)+'</b>',sen(ok,'.'),
  [[sen([front,c.s,c.m].concat(rest,[c.inf]),'.'),'After '+front+' the modal verb must be 2nd. The subject goes behind it.'],
   [sen([front,c.m,c.s,c.inf].concat(rest),'.'),'The infinitive <b>'+c.inf+'</b> goes to the END.'],
   [sen([front,c.s].concat(rest,[c.inf,c.m]),'.'),'The modal verb must be in position 2, not at the end.']],
  ['Position 1: <b>'+front+'</b>. Position 2: the modal verb.','Then the subject, the rest, and the infinitive LAST.',hintStart(ok)],n);};
const ABER=[
 ['Paul ist Deutscher','Renate','ist',['Deutsche']],['Ich lerne Deutsch','mein Bruder','lernt',['Englisch']],
 ['Ali kommt aus Ägypten','Hans','kommt',['aus Deutschland']],['Wir wohnen in Kairo','meine Oma','wohnt',['in Alexandria']],
 ['Du trinkst Tee','ich','trinke',['Kaffee']],['Soha spielt Tennis','ihr Bruder','spielt',['Fußball']],['Die Kinder essen Fisch','wir','essen',['Pizza']]];
const gAber=n=>{const a=pick(ABER),L=a[0],s=a[1],v=a[2],r=a[3].join(' ');
 return mk('Join the two sentences with <b>aber</b>:<br><b>'+L+'.</b> + <b>'+U1(s)+' '+v+' '+r+'.</b>',L+', aber '+s+' '+v+' '+r+'.',
  [[L+' aber '+s+' '+v+' '+r+'.','Always put a COMMA before <b>aber</b>.'],
   [L+', aber '+v+' '+s+' '+r+'.','aber is in position 0. It does not change the order: subject first, then the verb.'],
   [L+', aber '+s+' '+r+' '+v+'.','The verb must be 2nd in the second sentence too.']],
  ['Two sentences, one comma, and the word aber.','aber does not count as a position: the second sentence keeps its normal order.','Pattern: sentence 1 + COMMA + aber + subject + verb + rest.'],n);};
const gModalQ=n=>{const c=mctx(),ok=[c.m,c.s].concat(c.mid,[c.inf]);
 return mk('Make a <b>yes/no question</b> with the modal verb:<br><b>'+tiles(ok)+'</b>',sen(ok,'?'),
  [[sen([c.s,c.m].concat(c.mid,[c.inf]),'?'),'That is a statement with a question mark. The modal verb goes to position 1.'],
   [sen([c.m,c.s,c.inf].concat(c.mid),'?'),'The infinitive <b>'+c.inf+'</b> goes to the END.'],
   [sen([c.m,c.inf,c.s].concat(c.mid),'?'),'The infinitive goes to the END, after everything else.']],
  ['Yes/no question: the modal verb goes first.','Modal first, then the subject, the rest, and the infinitive LAST.',hintStart(ok)],n);};
const modalBad=c=>pick([[c.s].concat(c.mid,[c.m,c.inf]),[c.s,c.m,c.inf].concat(c.mid),[c.s,c.inf].concat(c.mid)]);
const modalPair=()=>{const c=mctx(),front=c.mid.length>1&&Math.random()<.5,ok=front?[c.mid[0],c.m,c.s].concat(c.mid.slice(1),[c.inf]):[c.s,c.m].concat(c.mid,[c.inf]);
 const bad=front?pick([[c.mid[0],c.s,c.m].concat(c.mid.slice(1),[c.inf]),[c.mid[0],c.m,c.s,c.inf].concat(c.mid.slice(1))]):modalBad(c);return {ok:sen(ok,'.'),bad:sen(bad,'.')};};
const gOddModal=n=>{let ps,tries=0;
 do{ps=[modalPair(),modalPair(),modalPair()];tries++;}while(tries<20&&new Set(ps.map(p=>p.ok).concat(ps[0].bad)).size<4);
 return mk('Three sentences are correct. Which one is <b>WRONG</b>?',ps[0].bad,ps.slice(1).map(p=>[p.ok,'This one is correct: modal 2nd, infinitive last.']).concat([[ps[0].ok,'This one is correct: modal 2nd, infinitive last.']]),
  ['Find the modal verb and the infinitive in each sentence.','The modal verb must be 2nd. The infinitive must be LAST.','Which sentence breaks one of these two rules?'],n);};
const gFrame=n=>{let c=mctx(),front=Math.random()<.5;if(front){let t=0;while(c.mid.length<2&&t++<30)c=mctx();}
 const ok=front?[c.mid[0],c.m,c.s].concat(c.mid.slice(1),[c.inf]):[c.s,c.m].concat(c.mid,[c.inf]);
 const w1=front?c.mid[0]:c.s;
 return mk('The <b>frame</b> is made of the two verbs. Which two words form the frame in:<br><b>'+sen(ok,'.')+'</b>',c.m+' ... '+c.inf,
  [[w1+' ... '+c.inf,'<b>'+w1+'</b> is not a verb. The frame is the modal verb + the infinitive.'],[c.m+' ... '+(front?c.s:c.mid[0]),'The frame closes at the END of the sentence with the infinitive.'],[c.s+' ... '+c.m,'The subject is not part of the frame.']],
  ['Find the two verbs.','One is conjugated (position 2), one is an infinitive (last).','Frame: <b>'+c.m+' ... '+c.inf+'</b>.'],n);};
const FIXD=[['The modal verb is missing. Use it in position 2 and put the infinitive at the end.','miss'],['The infinitive must go to the END of the sentence.','mid'],['The modal verb must be in position 2, not later.','late'],['Nothing is wrong. It is a correct sentence.','none']];
const gFix=n=>{const c=mctx(),k=pick(['miss','mid','late']),
 st={miss:[c.s,c.inf].concat(c.mid),mid:[c.s,c.m,c.inf].concat(c.mid),late:[c.s].concat(c.mid,[c.m,c.inf])}[k],ans=FIXD.find(x=>x[1]===k)[0];
 return mk('A student wrote: <b>'+sen(st,'.')+'</b><br>What is the problem?',ans,
  FIXD.filter(x=>x[1]!==k).map(x=>[x[0],x[1]==='none'?'The sentence is wrong. Check the modal verb and the infinitive.':'Look again at where the modal verb and the infinitive stand in the sentence.']),
  ['Is there a modal verb? Where is the infinitive?','Correct frame: modal in position 2 ... infinitive at the END.','Correct sentence: '+sen([c.s,c.m].concat(c.mid,[c.inf]),'.')],n);};
const SEP=[{inf:'aufstehen',f:['stehe','stehst','steht','stehen','steht','stehen'],pre:'auf',mid:['jeden Tag','früh']},
 {inf:'einkaufen',f:['kaufe','kaufst','kauft','kaufen','kauft','kaufen'],pre:'ein',mid:['am Wochenende']},
 {inf:'anrufen',f:['rufe','rufst','ruft','rufen','ruft','rufen'],pre:'an',mid:['heute','meine Oma']},
 {inf:'mitkommen',f:['komme','kommst','kommt','kommen','kommt','kommen'],pre:'mit',mid:['am Montag']}];
const gSep=n=>{const s=pick(SUBJ),d=pick(SEP),vf=d.f[s.p],ok=[s.w,vf].concat(d.mid,[d.pre]);
 return mk('<b>'+d.inf+'</b> is a separable verb. Put the words in order:<br><b>'+tiles(ok)+'</b>',sen(ok,'.'),
  [[sen([s.w,d.pre+vf].concat(d.mid),'.'),'A separable verb splits: the verb stays 2nd and the prefix <b>'+d.pre+'</b> goes to the END.'],
   [sen([s.w,vf,d.pre].concat(d.mid),'.'),'The prefix <b>'+d.pre+'</b> goes to the very END, like the infinitive.'],
   [sen([s.w,d.pre,vf].concat(d.mid),'.'),'The verb is 2nd. The prefix goes to the END.']],
  ['Two parts: <b>'+vf+'</b> (verb) and <b>'+d.pre+'</b> (prefix).','Same frame as the modal verb: verb 2nd, prefix at the END.',hintStart(ok)],n);};
const C={E:[gModal,gModalForm,factModal],H:[gModalFront,gAber,gModalQ,gModal],X:[gOddModal,gFrame,gFix,gSep]};

// ---------- challenge pool [question, answer, [3 wrong]] (his real worksheet sentences) ----------
const POOL=[
 ['Which is correct? Sie – Fisch – Kinder, – essen – möchten','Kinder, möchten Sie Fisch essen?',['Kinder, Sie möchten Fisch essen?','Kinder, möchten Sie essen Fisch?','Kinder, Sie möchten essen Fisch?']],
 ['Which is correct? diese Schüler – welche – haben – Nationalitäten','Welche Nationalitäten haben diese Schüler?',['Welche haben diese Schüler Nationalitäten?','Welche Nationalitäten diese Schüler haben?','Haben welche Nationalitäten diese Schüler?']],
 ['Which is correct? ist – Deutsche – aber – Paul – Renate – ist – Deutscher','Paul ist Deutscher, aber Renate ist Deutsche.',['Paul ist Deutscher aber Renate ist Deutsche.','Paul ist Deutscher, aber ist Renate Deutsche.','Paul ist Deutscher, aber Renate Deutsche ist.']],
 ['Which is correct? bei der Hausarbeit – meiner Mutter – muss ich – helfen','Bei der Hausarbeit muss ich meiner Mutter helfen.',['Meiner Mutter muss ich helfen bei der Hausarbeit.','Bei der Hausarbeit ich muss meiner Mutter helfen.','Bei der Hausarbeit muss ich helfen meiner Mutter.']],
 ['Which is correct? nach Frankreich – Soha – fahren – im Sommer – will','Soha will im Sommer nach Frankreich fahren.',['Soha fahren im Sommer nach Frankreich.','Soha will fahren im Sommer nach Frankreich.','Soha im Sommer nach Frankreich will fahren.']],
 ['Which is correct? spricht – meine – ein bisschen – Freundin – Italienisch','Meine Freundin spricht ein bisschen Italienisch.',['Meine Freundin Italienisch spricht ein bisschen.','Meine Freundin ein bisschen spricht Italienisch.','Ein bisschen Italienisch meine Freundin spricht.']],
 ['Which is correct? Abend – lese – einen Artikel – jeden – ich','Ich lese jeden Abend einen Artikel.',['Ich jeden Abend einen Artikel lese.','Jeden Abend ich lese einen Artikel.','Ich einen Artikel jeden Abend lese.']],
 ['Which is correct? kommt – Amerika – aus – nicht – ihr?','Kommt ihr nicht aus Amerika?',['Ihr kommt nicht aus Amerika?','Kommt nicht ihr aus Amerika?','Ihr nicht kommt aus Amerika?']],
 ['Which is correct? am – was – du – Wochenende – machst?','Was machst du am Wochenende?',['Was du machst am Wochenende?','Machst was du am Wochenende?','Was am Wochenende machst du?']],
 ['Which is correct? kommst – woher – du – Ahmed?','Woher kommst du, Ahmed?',['Woher du kommst, Ahmed?','Kommst woher du, Ahmed?','Woher du, Ahmed, kommst?']],
 ['Which is correct? alle – sprechen – Schüler – Englisch','Alle Schüler sprechen Englisch.',['Alle Schüler Englisch sprechen.','Englisch alle Schüler sprechen.','Alle sprechen Schüler Englisch.']],
 ['Which is correct? sieht – dein – wie – Tag – aus?','Wie sieht dein Tag aus?',['Wie aussieht dein Tag?','Wie sieht aus dein Tag?','Wie dein Tag aussieht?']],
 ['Which is correct? ihr – wohnt – in – jetzt – Deutschland?','Wohnt ihr jetzt in Deutschland?',['Ihr wohnt jetzt in Deutschland?','Wohnt ihr in jetzt Deutschland?','Ihr jetzt wohnt in Deutschland?']],
 ['Which is correct? im Sommer – wir – können – nach Berlin – fahren','Im Sommer können wir nach Berlin fahren.',['Im Sommer wir können nach Berlin fahren.','Im Sommer können wir fahren nach Berlin.','Im Sommer wir nach Berlin fahren können.']]];

// ---------- LESSON ----------
const LESSON={ui:'en',child:'Ahmed',key:'ahmed_satzbau_g8_v1',
 title:'🇩🇪 Ahmed\'s Satzbau Challenge',
 css:'body{background:linear-gradient(180deg,#e2e8f0,#f1f5f9)}header{background:linear-gradient(135deg,#0f172a,#7f1d1d 62%,#b45309);box-shadow:0 6px 0 #1e1b4b}nav button{color:#7f1d1d;box-shadow:0 3px 0 #fca5a5}h2{color:#7f1d1d}h3{color:#b45309}.bubble{background:#fef2f2;border-color:#fca5a5}.bubble:before{border-right-color:#fca5a5!important}.qbox{background:#fef2f2}',
 mX:'Open all 5 branches of the mind map',
 tabs:['🧠 Learn','🥈 Verb 2nd','❓ Fragen','🧱 Frame & aber'],
 secs:[{h:'🥈 The verb is in position 2',short:'Verb 2nd',intro:'In a statement the <b>verb is always 2nd</b>. Position 1 can be the subject <i>or</i> a time word. Then the subject goes <b>after</b> the verb.'},
       {h:'❓ Fragen: yes/no and W-Fragen',short:'Fragen',intro:'Yes/no question: <b>verb first</b>. W-question: <b>W-word, then verb</b>, then subject. <i>Welche + noun</i> stay together.'},
       {h:'🧱 Modal frame, separable verbs and aber',short:'Frame & aber',intro:'Modal verb = position 2 and the <b>infinitive at the END</b>. Before <b>aber</b> put a comma; the order stays normal.'}],
 stk:[['🎯','First Hit'],['🥈','Verb Spotter'],['🔄','Inversion Pro'],['❓','Question Starter'],['🔎','W-Word Master'],['🧱','Frame Builder'],['✂️','Modal Master'],['🗺️','Map Explorer'],['🔥','On Fire'],['⚡','Lightning'],['👑','Satzbau King'],['🏆','Legend']],
 learnHTML:`<style>
 .mm{background:linear-gradient(180deg,#fff7ed,#fef2f2);border-radius:22px;padding:6px;border:3px solid #fecaca}
 .mm svg{width:100%;display:block;touch-action:manipulation}
 .mm g.nd{cursor:pointer}.mm g.nd rect{transition:all .2s}.mm g.nd:active rect{transform:scale(.96)}
 .mm path.fl{stroke-dasharray:7 7;animation:flow 1.4s linear infinite}@keyframes flow{to{stroke-dashoffset:-28}}
 .mm .ctr{animation:pulse 2.4s ease-in-out infinite;transform-origin:180px 185px}@keyframes pulse{50%{transform:scale(1.06)}}
 .mmbar{display:flex;gap:8px;align-items:center;justify-content:space-between;margin:8px 0}
 .mmbar button{border:3px solid #fca5a5;background:#fff;border-radius:14px;padding:6px 10px;font:inherit;font-weight:800;cursor:pointer;color:#7f1d1d}
 .mmbar button.on{background:#7f1d1d;color:#fff}
 .bp{border:4px solid #ddd;border-radius:20px;padding:10px;margin:6px 0;background:#fff}
 .bp h3{margin:0 0 6px}.leaf{display:flex;gap:8px;align-items:flex-start;background:#fafafa;border-radius:12px;padding:6px 8px;margin:5px 0;border-left:5px solid var(--bc)}
 .leaf .ic{font-size:24px;line-height:1.1}.leaf.hid span.tx{filter:blur(7px);cursor:pointer}.leaf.hid{cursor:pointer}
 .chain{display:flex;flex-wrap:wrap;gap:4px;align-items:center;justify-content:center;font-size:30px;background:#fffbeb;border:3px dashed #fcd34d;border-radius:16px;padding:6px;margin-top:8px}
 .chain i{font-style:normal;font-size:18px;color:#d97706}.chain small{display:block;font-size:11px;font-weight:700;color:#475569;text-align:center}
 .chain div{text-align:center}.tip{font-size:14px;margin-top:6px;color:#7c2d12;font-weight:700}
 </style>
 <h2>The Satzbau map 🧠</h2>
 <div class="bubble" style="margin:8px 0">German sentences follow <b>patterns</b>. The whole lesson is on <b>one map</b>: the big idea is in the middle and there are <b>5 branches</b>. <b>Tap a branch</b> to open its rules, a memory chain and a trick.</div>
 <div class="mm"><svg id="mmap" viewBox="0 0 360 360" role="img" aria-label="Mind map of German sentence structure"></svg></div>
 <div class="mmbar"><span id="mmCount" style="font-weight:800;color:#7f1d1d"></span><button id="recall">🧠 Recall mode: hide details</button></div>
 <div id="bp"></div>`,
 finite:6,
 banks:[A,B,C],pool:POOL};

// ---- mind map (Learn tab) ----
const BR=[
 {e:'🥈',t:'Verb 2nd',c:'#f59e0b',d:'#b45309',l:'#fef3c7',x:180,y:40,tip:'Say it like a rule: “Position 1 ... VERB ... the rest.”',
  chain:[['1️⃣','Ali / Heute'],['2️⃣','VERB'],['3️⃣','the rest']],
  L:[['1️⃣','<b>Position 1</b> is ONE block: the subject (<i>Ali</i>), or a time word (<i>Heute</i>, <i>Am Wochenende</i>).'],
     ['2️⃣','<b>Position 2 is for the verb</b>, always. <i>Ali <u>spielt</u> Fußball.</i>'],
     ['🔄','<b>Inversion:</b> if a time word is in position 1, the subject goes AFTER the verb: <i>Heute spielt Ali Fußball.</i> ✗ <s>Heute Ali spielt Fußball.</s>'],
     ['🧩','A block can have 2 words: <i>Jeden Tag</i> is position 1, so the verb is still 2nd.'],
     ['✍️','<b>Endings:</b> ich -e · du -st · er/sie -t · wir -en · ihr -t · sie -en.']]},
 {e:'❓',t:'Yes/No ?',c:'#10b981',d:'#047857',l:'#d1fae5',x:302,y:128,tip:'Yes/no question = the verb jumps to the front.',
  chain:[['🥇','VERB'],['👤','subject'],['🧺','the rest'],['❓','?']],
  L:[['🥇','<b>Verb in position 1</b>, then the subject: <i>Spielt Ali Fußball?</i>'],
     ['⚠️','<b>Your trap:</b> <s>Ali spielt Fußball?</s> is a statement with a “?”. Move the verb to the front!'],
     ['🔁','Statement → question: swap the subject and the verb. <i>Ihr kommt aus Amerika.</i> → <i>Kommt ihr aus Amerika?</i>'],
     ['🚫','With <i>nicht</i>: <i>Kommt ihr nicht aus Amerika?</i> The verb is still first.'],
     ['📌','Exam example: <i>Kinder, möchten Sie Fisch essen?</i> A name or “Kinder,” before the comma does not count.']]},
 {e:'🔎',t:'W-Fragen',c:'#3b82f6',d:'#1d4ed8',l:'#dbeafe',x:262,y:290,tip:'W-word first, then the verb, then everybody else.',
  chain:[['🔎','W-word'],['🏃','VERB'],['👤','subject'],['🧺','rest']],
  L:[['🗣️','<b>W-words:</b> Wer? (who) · Was? (what) · Wo? (where) · Woher? (from where) · Wohin? (where to) · Wann? (when) · Wie? (how)'],
     ['📐','<b>Formula:</b> W-word + VERB + subject + rest. <i>Was machst du am Wochenende?</i>'],
     ['🤝','<b>Welche + noun are a team:</b> <i>Welche Nationalitäten haben diese Schüler?</i>'],
     ['⚠️','<b>Your trap:</b> <s>Welche haben diese Schüler Nationalitäten?</s> The noun was left behind!'],
     ['🧭','<i>Woher kommst du?</i> · <i>Wo wohnst du?</i> · <i>Wohin fährst du?</i> The W-word tells you the kind of answer.']]},
 {e:'🧱',t:'Modal frame',c:'#8b5cf6',d:'#6d28d9',l:'#ede9fe',x:98,y:290,tip:'Two verbs = a frame. The modal is 2nd, the other verb is LAST.',
  chain:[['🔧','modal (2nd)'],['🧺','the middle'],['🏁','infinitive (END)']],
  L:[['🔧','<b>Modal verbs:</b> möchten · wollen · müssen · können · dürfen.'],
     ['🖼️','<b>The frame:</b> <i>Soha <u>will</u> im Sommer nach Frankreich <u>fahren</u>.</i> Modal in position 2, infinitive at the END.'],
     ['⚠️','<b>Your traps:</b> <s>Soha fahren im Sommer nach Frankreich</s> (modal forgotten) · <s>Meiner Mutter muss ich helfen bei der Hausarbeit</s> (infinitive not at the end)'],
     ['✅','<i>Bei der Hausarbeit muss ich meiner Mutter helfen.</i>'],
     ['✂️','<b>Separable verbs</b> use the same frame: <i>Wie <u>sieht</u> dein Tag <u>aus</u>?</i> · <i>Ich <u>stehe</u> früh <u>auf</u>.</i>'],
     ['🔤','ich will · du willst · wir wollen · ihr wollt | ich muss · du musst | ich kann · du kannst']]},
 {e:'🔗',t:'aber & nicht',c:'#ec4899',d:'#be185d',l:'#fce7f3',x:58,y:128,tip:'Before aber: always a comma. After aber: normal order.',
  chain:[['1️⃣','sentence'],['✂️',','],['🔗','aber'],['2️⃣','sentence']],
  L:[['🔗','<b>aber · und · oder</b> are in <b>position 0</b>: they do not count and they do not change the order.'],
     ['✂️','<b>Comma before aber:</b> <i>Paul ist Deutscher<b>,</b> aber Renate ist Deutsche.</i>'],
     ['2️⃣','After aber: subject, then verb, as usual: <i>aber Renate ist ...</i>'],
     ['🚫','<b>nicht:</b> <i>Nein, das ist nicht mein Kollege.</i> · <i>Er kommt nicht.</i>'],
     ['🔤','<b>Spelling traps:</b> Deutsche · Frankreich · Hausarbeit · Nationalitäten · möchten.']]}
];
function learnInit(){
  const svg=$('mmap'),CX=180,CY=185;let sel=-1,recall=false;
  const nOpen=()=>S.explored.filter(x=>typeof x==='number').length;
  const nodes=BR.map((b,i)=>{
    const mx=(CX+b.x)/2+(i%2?14:-14),my=(CY+b.y)/2;
    return `<path class="fl" d="M${CX},${CY} Q${mx},${my} ${b.x},${b.y}" fill="none" stroke="${b.c}" stroke-width="5" stroke-linecap="round" opacity=".75"/>`;}).join('')
   +`<g class="ctr"><circle cx="${CX}" cy="${CY}" r="46" fill="url(#cg)" stroke="#fff" stroke-width="4"/><text x="${CX}" y="${CY-8}" text-anchor="middle" font-size="22">🇩🇪</text><text x="${CX}" y="${CY+10}" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">Satzbau</text><text x="${CX}" y="${CY+25}" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">sentence order</text></g>`
   +BR.map((b,i)=>`<g class="nd" data-i="${i}" tabindex="0" role="button"><rect x="${b.x-54}" y="${b.y-27}" width="108" height="56" rx="18" fill="${b.l}" stroke="${b.c}" stroke-width="4"/><text x="${b.x}" y="${b.y-4}" text-anchor="middle" font-size="22">${b.e}</text><text x="${b.x}" y="${b.y+19}" text-anchor="middle" font-size="12" font-weight="800" fill="${b.d}">${b.t}</text><circle cx="${b.x+44}" cy="${b.y-24}" r="11" fill="${b.c}" stroke="#fff" stroke-width="2"/><text x="${b.x+44}" y="${b.y-20}" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">${i+1}</text><text class="ck" x="${b.x-52}" y="${b.y-18}" font-size="14"></text></g>`).join('');
  svg.innerHTML=`<defs><radialGradient id="cg" cx="35%" cy="30%"><stop offset="0" stop-color="#ef4444"/><stop offset="1" stop-color="#7f1d1d"/></radialGradient></defs>`+nodes;
  function marks(){svg.querySelectorAll('g.nd').forEach((g,k)=>{g.querySelector('.ck').textContent=S.explored.includes(k)?'✅':'';});
    $('mmCount').textContent=nOpen()>=BR.length?'🗺️ You opened all 5 branches!':'Branches opened: '+nOpen()+' of '+BR.length;}
  function show(i){
    sel=i;const b=BR[i];
    if(!S.explored.includes(i)){S.explored.push(i);save();hud();}
    svg.querySelectorAll('g.nd').forEach((g,k)=>{const r=g.querySelector('rect');r.setAttribute('stroke-width',k===i?7:4);r.setAttribute('fill',k===i?BR[k].c+'55':BR[k].l);});
    $('bp').innerHTML=`<div class="bp" style="border-color:${b.c};--bc:${b.c}"><h3 style="color:${b.d}">${b.e} ${i+1}) ${b.t}</h3>`
      +b.L.map(l=>`<div class="leaf ${recall?'hid':''}"><span class="ic">${l[0]}</span><span class="tx">${l[1]}</span></div>`).join('')
      +`<div class="chain">${b.chain.map((c,k)=>(k?'<i>▶</i>':'')+`<div>${c[0]}<small>${c[1]}</small></div>`).join('')}</div><div class="tip">💡 ${b.tip}</div></div>`;
    $('bp').querySelectorAll('.leaf').forEach(l=>l.onclick=()=>l.classList.remove('hid'));
    marks();
    if(nOpen()>=BR.length)award('explorer');
  }
  svg.querySelectorAll('g.nd').forEach(g=>{g.onclick=()=>show(+g.dataset.i);g.onkeydown=e=>{if(e.key==='Enter'||e.key===' ')show(+g.dataset.i);};});
  $('recall').onclick=()=>{recall=!recall;$('recall').classList.toggle('on',recall);$('recall').textContent=recall?'👀 Show details':'🧠 Recall mode: hide details';if(sel>=0)show(sel);};
  $('bp').innerHTML='<div class="bubble" style="margin:8px 0">👆 Tap a branch on the map to start.</div>';marks();
}
