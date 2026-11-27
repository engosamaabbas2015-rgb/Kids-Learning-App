#!/usr/bin/env python3 -I
"""python3 -I build.py LESSON_JS OUT_HTML [AUDIO_DIR]
assembles shell + ui + core + labs + AUDIO + lesson + engine into one HTML.
AUDIO_DIR (optional): every NAME.mp3 inside becomes AUDIO.NAME (a data: URL) for the lesson to play."""
import sys,os,base64,json
d=os.path.dirname(os.path.abspath(__file__))
rd=lambda f:open(os.path.join(d,f),encoding='utf8').read()
lesson=open(sys.argv[1],encoding='utf8').read()
au={}
if len(sys.argv)>3:
    for f in sorted(os.listdir(sys.argv[3])):
        if f.endswith('.mp3'):au[f[:-4]]='data:audio/mpeg;base64,'+base64.b64encode(open(os.path.join(sys.argv[3],f),'rb').read()).decode()
# order: ui, core, labs, AUDIO, LESSON data, engine, engine2
js='\n'.join([rd('ui.js'),rd('core.js'),rd('labs.js'),'const AUDIO='+json.dumps(au)+';',lesson,rd('engine.js'),rd('engine2.js')])
import re
m=re.search(r"title:'(?:\S+\s)?((?:[^'\\]|\\.)*)'",lesson)
shell=rd('shell.html').replace('<title>Lesson game</title>','<title>'+(m.group(1).replace("\\'","'").split(':')[0].strip() if m else 'Lesson game')+'</title>')
html=shell+'<script>\n'+js+'\n</script></body></html>'
open(sys.argv[2],'w',encoding='utf8').write(html)
print('built',sys.argv[2],len(html),'bytes, audio clips:',len(au))
