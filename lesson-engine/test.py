#!/usr/bin/env python3 -I
"""python3 -I test.py GAME_HTML [SHOTS_DIR]  -> prints a SHORT pass/fail summary (generators, rewards flow, overflow)"""
import asyncio,sys,os
from playwright.async_api import async_playwright
HTML=os.path.abspath(sys.argv[1]);SH=sys.argv[2] if len(sys.argv)>2 else '/tmp/shots';os.makedirs(SH,exist_ok=True)
GEN='''()=>{
 const L=window.__T.LESSON,bad=new Set();let n=0;const st=s=>s.replace(/<[^>]+>/g,'');
 L.banks.forEach((bank,bi)=>['E','H','X'].forEach(lv=>{ if(!bank[lv]||!bank[lv].length){bad.add('empty bank '+bi+lv);return;}
  bank[lv].forEach(fn=>{for(let i=0;i<300;i++){const k=lv==='E'?3:4;const q=fn(k);n++;const t='S'+bi+lv;
   if(!q.opts.includes(q.ans))bad.add(t+' ans-not-in-opts: '+st(q.q));
   if(new Set(q.opts).size!==q.opts.length)bad.add(t+' dup-opts: '+st(q.q));
   if(q.opts.length<3)bad.add(t+' few-opts('+q.opts.length+'): '+st(q.q));
   if(!q.hints||!q.hints.length)bad.add(t+' no-hints: '+st(q.q));
   for(const x in q.trap)if(x===q.ans)bad.add(t+' trap==ans');
   if(q.why){const w=q.why;if(w.length!==4||w[2].includes(w[1])||new Set(w[2]).size!==w[2].length)bad.add(t+' bad why: '+st(q.q));}
   if(L.M){const y=st(q.q).match(/\\u0641\\u064a \\u0623\\u064a \\u0633\\u0646\\u0629 \\u0648\\u0642\\u0639\\u062a (.+)\\u061f|In which year did (.+) happen\\?/);
     if(y){const nm=(y[1]||y[2]).trim(),m=L.M.find(x=>x.n===nm);if(!m)bad.add('year name '+nm);else if(q.ans!==ar(m.y)+(L.ys||''))bad.add('year wrong '+nm+' '+q.ans);}}
  }});}));
 L.pool.forEach(p=>{if(p.length!==3||p[2].length!==3||new Set([p[1],...p[2]]).size!==4)bad.add('pool item: '+st(p[0]));});
 if(L.pool.length<12)bad.add('pool<12');
 return {n,bad:[...bad]};}'''
async def ok0(pg):
    for _ in range(4):
        if await pg.locator('#popOk').is_visible(): await pg.click('#popOk')
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':380,'height':820});errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)));await pg.route('**/fonts.*/**',lambda r:r.abort())
        await pg.goto('file://'+HTML)
        g=await pg.evaluate(GEN);print('GENERATORS: %d questions, problems: %s'%(g['n'],g['bad'] or 'none'))
        hasTL=await pg.evaluate('!!(window.__T.LESSON.M&&document.getElementById("tl"))')
        if hasTL:
            for i in range(await pg.locator('#tl button').count()): await pg.locator('#tl button').nth(i).click()
            if await pg.locator('#popOk').is_visible(): await pg.click('#popOk')
        if await pg.locator('#mmap').count():
            for i in range(await pg.locator('#mmap g.nd').count()): await pg.locator('#mmap g.nd').nth(i).click()
            await ok0(pg)
        if await pg.locator('#sort').count():   # solve the sort lab with the right bins
            for _ in range(12):
                left=await pg.evaluate('''()=>{const b=document.querySelector('#sort .chips button');if(!b)return null;b.click();
                  const t=b.textContent,it=[...document.querySelectorAll('#sort .chips button')].find(x=>x.classList.contains('sel'));return it?it.textContent:t}''')
                if left is None: break
                j=await pg.evaluate('(t)=>{const c=CHG.find(x=>x[0]===t);return c?c[1]:0}',left)
                await pg.locator('#sort .bin').nth(j).click()
            await ok0(pg)
        if await pg.locator('#bal').count():    # solve the balance lab 3 times using the known coefficients
            for _ in range(3):
                await pg.evaluate('''()=>{const t=[...document.querySelectorAll('#bal .term')],fs=t.map(x=>x.lastElementChild.textContent);
                  const e=EQS.find(q=>q.l.concat(q.r).map(x=>F(x[1])).join()===fs.join());const cs=e.l.concat(e.r).map(x=>x[0]);
                  cs.forEach((c,i)=>{for(let k=1;k<c;k++)document.querySelectorAll('#bal .term')[i].querySelectorAll('button')[1].click();});}''')
                await pg.click('#balNext');await ok0(pg)
        if await pg.locator('#atoms').count():
            await pg.evaluate("document.getElementById('atomPlay').click()");await pg.wait_for_timeout(4600);await ok0(pg)
        for pid in await pg.evaluate("Object.keys(window.__poe||{})"):   # solve every predict/observe/explain lab
            await pg.evaluate('''(id)=>{const c=__poe[id];[...document.querySelectorAll('#'+id+' .opts button')].find(b=>b.innerHTML===c.predict[1]).click()}''',pid)
            await pg.wait_for_timeout(3800)
            await pg.evaluate('''(id)=>document.querySelector('#'+id+' .fb button').click()''',pid)
            await pg.evaluate('''(id)=>{const c=__poe[id];[...document.querySelectorAll('#'+id+' .opts button')].find(b=>b.innerHTML===c.explain[1]).click()}''',pid)
            await ok0(pg)
        if await pg.locator('#labsProg').count():
            print('LABS:',await pg.inner_text('#labsProg'),'| explorer:',await pg.evaluate('S.earned.includes("explorer")'))
        await pg.screenshot(path=SH+'/learn.png',full_page=True)
        fails=[]
        async def ok():
            if await pg.locator('#popOk').is_visible(): await pg.click('#popOk')
        for tab,box in (('sa','pA'),('sb','pB'),('sc','pC')):
            await pg.click(f'nav button[data-t={tab}]')
            for lv in 'EHX':
                await pg.click(f'#{box} .lv button[data-l={lv}]')
                for _ in range(3):
                    ans=await pg.evaluate(f'window.__cur["{box}"]().ans')
                    await pg.evaluate('([bx,a])=>{[...document.querySelectorAll("#"+bx+" .opts button")].find(b=>b.innerHTML===a).click()}',[box,ans])
                    await pg.click(f'#{box} .ck')
                    if 'good' not in await pg.get_attribute(f'#{box} .fb','class'): fails.append((box,lv,ans))
                    w=await pg.evaluate(f'(()=>{{const c=window.__cur["{box}"]();return c.why?c.why[1]:null}})()')
                    if w:
                        await pg.evaluate('([bx,a])=>{[...document.querySelectorAll("#"+bx+" .why .opts button")].find(b=>b.innerHTML===a).click()}',[box,w])
                        await ok();await pg.click(f'#{box} .wnx');whys=globals().get('whys',0)+1;globals()['whys']=whys
                    await pg.wait_for_timeout(1600);await ok()
            await pg.click(f'#{box} .lv button[data-l=X]');await pg.click(f'#{box} .hp');await pg.screenshot(path=SH+f'/{tab}.png',full_page=True)
        print('PRACTICE correct-answer flow:','ok' if not fails else fails,'| why follow-ups answered:',globals().get('whys',0))
        print('HUD after practice:',await pg.inner_text('#hHearts'),await pg.inner_text('#hStreak'),await pg.inner_text('#hStk'))
        # wrong answers -> hearts, fly-away
        await pg.click('nav button[data-t=sa]');await pg.click('#pA .lv button[data-l=H]')
        before=await pg.evaluate('S.earned.slice()')
        for i in range(3):
            a=await pg.evaluate('window.__cur["pA"]().ans')
            await pg.evaluate('(a)=>{[...document.querySelectorAll("#pA .opts button")].find(b=>b.innerHTML!==a&&!b.classList.contains("wrong")).click()}',a)
            await pg.click('#pA .ck')
        await pg.wait_for_timeout(400)
        lost=[x for x in before if x not in await pg.evaluate('S.earned')]
        print('HEARTS: 3 wrong -> sticker lost',lost,'| hearts refilled:',await pg.inner_text('#hHearts'),'| popup:',await pg.locator('#popOk').is_visible());await ok()
        # challenge perfect
        await pg.click('nav button[data-t=chal]')
        for i in range(8):
            q=await pg.inner_text('#chalBox .qtext')
            a=await pg.evaluate('(q)=>window.__T.LESSON.pool.find(p=>p[0].replace(/<[^>]+>/g,"")===q)[1]',q)
            await pg.evaluate('(a)=>{[...document.querySelectorAll("#chalBox .opts button")].find(b=>b.innerHTML===a).click()}',a)
            await pg.wait_for_timeout(1250);await ok()
        await pg.wait_for_timeout(300);await ok()
        print('CHALLENGE 8/8 ->',(await pg.inner_text('#chalBox'))[:30].replace('\n',' '),'| crown earned:',await pg.evaluate('S.earned.includes("crown")'))
        await pg.click('nav button[data-t=stk]');await pg.screenshot(path=SH+'/stickers.png',full_page=True)
        await pg.reload();print('PERSIST after reload:',await pg.inner_text('#hStk'))
        ov=[]
        for w in (360,380):
            await pg.set_viewport_size({'width':w,'height':820})
            for t in ['learn','sa','sb','sc','chal','stk']:
                await pg.click(f'nav button[data-t={t}]')
                if await pg.evaluate('document.documentElement.scrollWidth>window.innerWidth'): ov.append((w,t))
        print('OVERFLOW at 360/380px:',ov or 'none');print('JS ERRORS:',errs or 'none');print('shots in',SH)
        await b.close()
asyncio.run(main())
