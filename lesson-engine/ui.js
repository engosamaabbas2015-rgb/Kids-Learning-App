// UI string packs. LESSON.ui picks one: 'ar_f' | 'ar_m' | 'en'
const AR={dir:'rtl',lang:'ar',font:'Baloo Bhaijaan 2',fontUrl:'https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@500;700;800&display=swap',digits:1,
 lvE:'🟢 سهل',lvH:'🟠 متوسط',lvX:'🔴 صعب',check:'✔ تحقق',help:'💡 ساعدني',skip:'⏭ تخطّي',
 newSt:'ملصق جديد! 🎉',ok:'تمام! 👍',oh:'يا إلهي! 💔',refill:'رجعت القلوب ❤️❤️❤️',
 stkT:'🎖️ ملصقاتي',reset:'↺ ابدئي من جديد',rT:'نبدأ من جديد؟',rP:'سيتم مسح كل الملصقات.',no:'لا',yes:'نعم',
 chalT:'🏁 التحدي الكبير',of8:'٨',good:'صح! ⭐',showRight:'الإجابة الصحيحة باللون الأخضر 👀',next:'التالي ⬅',perfect:'👑 ممتاز!',well:'أحسنت! 🎈',again:'🔁 العب مرة ثانية',
 qn:(i,s)=>`السؤال ${i} من ٨ · النتيجة ${s}`,sheT:t=>t,
 first:'أولاً',last:'أخيراً',which:(t,w)=>`${t}<br>أيّها حدث <b>${w}</b>؟`,ordTxt:'الترتيب الصحيح: ',thinkOrd:'رتّب الأحداث في ذهنك أولاً.',
 diffQ:(a,b)=>`كم مرّ من الزمن بين <b>${a}</b> و<b>${b}</b>؟`,
 yrs:d=>d===1?'سنة واحدة':d===2?'سنتان':d<=10?d+' سنوات':d+' سنة',
 dh1:'عدّ مرة ثانية: اطرح السنة الأصغر من الأكبر.',dh2:'لا نجمع السنوات، بل نطرح ➖',dh3:'قريب! راجع الطرح: ',dh4:'هذه سنة الحدث الأحدث، اطرح منها السنة الأقدم.',dh5:'كبير شوية، اطرح بتركيز.',dsub:'اطرح: ',
 yearQ:n=>`في أي سنة وقعت <b>${n}</b>؟`,yearHint:'افتح خط الزمن في تبويب التعلّم وابحث عن ',resQ:n=>`ما نتيجة <b>${n}</b>؟`,resHint:'اقرأ بطاقة ',otherRes:'هذه نتيجة حدث آخر ',
 m1:'أول إجابة صحيحة',mE:s=>`٣ صح في «${s}» (سهل)`,mH:s=>`٣ صح في «${s}» (متوسط/صعب)`,mX:'افتح كل المحطات',m5:'٥ إجابات صح متتالية',m10:'١٠ إجابات صح متتالية',mC:'٨/٨ في التحدي',mAll:'اجمع الـ ١١ ملصقاً الأخرى',
 tlT:'👆 اضغط على كل محطة',tlOpen:'المحطات المفتوحة: ',tlDone:'🧭 فتحت كل المحطات!',tlHint:'اضغط على محطة لتعرف ما حدث 👆',who:'👥 الأطراف:',what:'📌 ما حدث:',res:'✅ النتيجة:'};
const FEM=Object.assign({},AR,{
 cheers:['أحسنتِ! 🎉','ممتازة يا {n}! ⭐','إجابة صحيحة! 🚀','رائع! 🙌'],wrong:'مش دي. جرّبي مرة ثانية أو اضغطي 💡 ساعدني.',
 flew:n=>`طار ملصق <b>${n}</b>!<br>اربحيه من جديد، أنتِ قادرة 💪`,slow:'خذي وقتك واستخدمي <b>ساعدني 💡</b>.',
 stkP:'اربحي الملصقات باللعب. انتبهي: لو انكسرت كل القلوب ❤️ يطير أحدث ملصق!',reset:'↺ ابدئي من جديد',
 chalP:'٨ أسئلة صعبة. أجيبي على الـ ٨ صح لتفوزي بتاج 👑!',perfect:'👑 ممتازة!',well:'أحسنتِ! 🎈',crownTxt:'أنتِ بطلة التحدي!',tryCrown:'أجيبي على الـ ٨ صح لتفوزي بالتاج 👑',again:'🔁 العبي مرة ثانية',
 thinkOrd:'رتّبي الأحداث في ذهنك أولاً.',dh1:'عدّي مرة ثانية: اطرحي السنة الأصغر من الأكبر.',dh3:'قريب! راجعي الطرح: ',dh4:'هذه سنة الحدث الأحدث، اطرحي منها السنة الأقدم.',dh5:'كبير شوية، اطرحي بتركيز.',dsub:'اطرحي: ',
 yearHint:'افتحي خط الزمن في تبويب التعلّم وابحثي عن ',resHint:'اقرئي بطاقة ',m1:'أول إجابة صحيحة',mX:'افتحي كل المحطات',mAll:'اجمعي الـ ١١ ملصقاً الأخرى',tlT:'👆 اضغطي على كل محطة',tlDone:'🧭 فتحتِ كل المحطات!',tlHint:'اضغطي على محطة لتعرفي ما حدث 👆',
 which:(t,w)=>`${t}<br>أيّها حدث <b>${w}</b>؟`});
const MAS=Object.assign({},AR,{
 cheers:['أحسنت! 🎉','ممتاز يا {n}! ⭐','إجابة صحيحة! 🚀','رائع! 🙌'],wrong:'مش دي. جرّب مرة ثانية أو اضغط 💡 ساعدني.',
 flew:n=>`طار ملصق <b>${n}</b>!<br>اربحه من جديد، أنت قادر 💪`,slow:'خذ وقتك واستخدم <b>ساعدني 💡</b>.',
 stkP:'اربح الملصقات باللعب. انتبه: لو انكسرت كل القلوب ❤️ يطير أحدث ملصق!',
 chalP:'٨ أسئلة صعبة. أجب على الـ ٨ صح لتفوز بتاج 👑!',crownTxt:'أنت بطل التحدي!',tryCrown:'أجب على الـ ٨ صح لتفوز بالتاج 👑'});
const EN={dir:'ltr',lang:'en',font:'Baloo 2',fontUrl:'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&display=swap',digits:0,
 lvE:'🟢 Easy',lvH:'🟠 Hard',lvX:'🔴 Expert',check:'✔ Check',help:'💡 Help me',skip:'⏭ Skip',
 cheers:['Super! 🎉','You got it, {n}! ⭐','Correct! 🚀','Great job! 🙌'],wrong:'Not quite. Try again or tap 💡 Help me.',
 newSt:'New sticker! 🎉',ok:'OK! 👍',oh:'Oh no! 💔',flew:n=>`Your <b>${n}</b> sticker flew away!<br>Win it again, you can do it! 💪`,refill:'❤️❤️❤️ refilled',slow:'Go slowly and use <b>Help me 💡</b>.',
 stkT:'🎖️ Sticker Book',stkP:'Win stickers by playing. Careful: if all ❤️ break, your newest sticker flies away!',reset:'↺ Start over',rT:'Start over?',rP:'All stickers will be cleared.',no:'No',yes:'Yes',
 chalT:'🏁 Big Challenge',chalP:'8 tricky questions. Get all 8 right to win the 👑 crown!',of8:'8',qn:(i,s)=>`Question ${i} of 8 · Score ${s}`,good:'Correct! ⭐',showRight:'The green one is right 👀',next:'Next ➡',
 perfect:'👑 PERFECT!',well:'Well done! 🎈',crownTxt:'You are the champion!',tryCrown:'Get all 8 right to win the crown 👑',again:'🔁 Play again',
 first:'first',last:'last',which:(t,w)=>`${t}<br>Which happened <b>${w}</b>?`,ordTxt:'Correct order: ',thinkOrd:'Put the events in order in your head first.',
 diffQ:(a,b)=>`How much time passed between <b>${a}</b> and <b>${b}</b>?`,yrs:d=>d===1?'1 year':d+' years',
 dh1:'Count again: subtract the smaller year from the bigger one.',dh2:'We do not add years, we subtract ➖',dh3:'Close! Check the subtraction: ',dh4:'That is the later year. Subtract the earlier year from it.',dh5:'A bit big. Subtract carefully.',dsub:'Subtract: ',
 yearQ:n=>`In which year did <b>${n}</b> happen?`,yearHint:'Open the timeline in the Learn tab and look for ',resQ:n=>`What was the result of <b>${n}</b>?`,resHint:'Read the card of ',otherRes:'That is the result of another event: ',
 m1:'Get your first right answer',mE:s=>`3 right in ${s} (Easy)`,mH:s=>`3 right in ${s} (Hard/Expert)`,mX:'Open all the timeline stops',m5:'5 right in a row',m10:'10 right in a row',mC:'8/8 in the Challenge',mAll:'Win all 11 other stickers',
 tlT:'👆 Tap every stop',tlOpen:'Stops opened: ',tlDone:'🧭 You opened every stop!',tlHint:'Tap a stop to see what happened 👆',who:'👥 Who:',what:'📌 What happened:',res:'✅ Result:'};
const UIP={ar_f:FEM,ar_m:MAS,en:EN};

Object.assign(UIP.ar_f,{fq:(i,n)=>`السؤال ${ar(i)} من ${ar(n)}`,fE:s=>`خلّصي كل أسئلة «${s}» (سهل)`,fH:s=>`خلّصي كل أسئلة «${s}» (متوسط)`,medals:['🥉 ميدالية السهل','🥈 ميدالية المتوسط','🥇 ميدالية الصعب'],lvn:['السهل','المتوسط','الصعب'],fDoneT:'🎉 خلّصتِ المرحلة!',fDoneP:l=>`أنهيتِ كل أسئلة المستوى ${l} من غير تكرار. جايزتك جاهزة!`,fNext:'المستوى التالي ➡',fAll:'خلّصتِ كل مستويات هذه المحطة 👏 انتقلي للمحطة التالية أو جرّبي التحدي الكبير!',medT:'🏅 ميداليات المراحل'});
Object.assign(UIP.ar_m,{fq:(i,n)=>`السؤال ${ar(i)} من ${ar(n)}`,fE:s=>`خلّص كل أسئلة «${s}» (سهل)`,fH:s=>`خلّص كل أسئلة «${s}» (متوسط)`,medals:['🥉 ميدالية السهل','🥈 ميدالية المتوسط','🥇 ميدالية الصعب'],lvn:['السهل','المتوسط','الصعب'],fDoneT:'🎉 خلّصت المرحلة!',fDoneP:l=>`أنهيت كل أسئلة المستوى ${l} من غير تكرار. جايزتك جاهزة!`,fNext:'المستوى التالي ➡',fAll:'خلّصت كل مستويات هذه المحطة 👏 انتقل للمحطة التالية أو جرّب التحدي الكبير!',medT:'🏅 ميداليات المراحل'});
Object.assign(UIP.en,{fq:(i,n)=>`Question ${i} of ${n}`,fE:s=>`Finish every question in ${s} (Easy)`,fH:s=>`Finish every question in ${s} (Hard)`,medals:['🥉 Easy medal','🥈 Hard medal','🥇 Expert medal'],lvn:['Easy','Hard','Expert'],fDoneT:'🎉 Level complete!',fDoneP:l=>`You finished every ${l} question with no repeats. Prize unlocked!`,fNext:'Next level ➡',fAll:'You finished every level here 👏 Try the next station or the Big Challenge!',medT:'🏅 Level medals'});
