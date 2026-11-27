# lesson-engine: build a child's lesson game by writing ONLY the lesson file

Workflow (Claude): stage this folder -> write `lesson_<child>.js` (see `lesson_maryam.js` as the example, do not read the engine files) ->
`python3 -I build.py lesson_X.js out.html` -> `python3 -I test.py out.html shots/` (prints ~8 lines) -> look at 1-2 screenshots -> publish out.html.

## Lesson file = plain JS, runs after ui.js + core.js and before engine.js. It must define:
- Optional timeline `const M=[{n:'name',y:2,e:'emoji',who:'...',why:'...',res:'...'}, ...]` (n = unique name; used by yearQ/resQ/diffQ and the Learn tab timeline).
- Three banks `const A,B,C={E:[gen,...],H:[gen,...],X:[gen,...]}` (one per practice section). A gen is `n=>mk(question,answer,wrongs,hints,n)` where wrongs = string or [string, specific-hint-for-that-trap], hints = progressive list.
  Builders in core.js: `factQ([[q,ans,wrongs,hints],...])`, `yearQ([names])`, `resQ([names])`, `orderQ([seq],'title')`, `diffQ([names])`; `mk(...)` for custom/math generators (compute numbers in JS, build wrong options from typical mistakes).
  E = 3 options (recall), H = 4 options (apply), X = 4 options (explain-why, order, compute, odd-one-out).
- `const LESSON={ui:'ar_f'|'ar_m'|'en', child:'FirstName', key:'unique_localStorage_key', ys:' هـ'(year suffix, optional),
   title:'🐪 Title with leading emoji', tabs:[learnTab, sec1Tab, sec2Tab, sec3Tab], secs:[{h,short,intro} x3],
   stk:[[emoji,name] x12 in order: first,aE,aH,bE,bH,cE,cH,explorer,s5,s10,crown,collector],
   learnHTML:`...` (use ${OWL} and ${ROAD} from core.js; include <div class="tl" id="tl"></div><div class="tcard" id="tcard"></div><div class="prog" id="learnProg"></div> if M is used),
   M:M, banks:[A,B,C], pool:[[question, answer, [3 wrong]] x12-14]}`
- Optional `function learnInit(){}` for a custom interactive visual in the Learn tab.

Rules: verify every answer yourself; challenge pool has exactly 3 wrongs each; child first name only; Arabic lessons -> ui ar_f (girl) / ar_m (boy), English -> en.
Known test hooks: `window.__cur[boxId]()` returns current question, `window.__T.LESSON`.

## Extra options (added with Ahmed's lesson)
- `LESSON.mX` : overrides the Explorer sticker mission text.
- `LESSON.css` : extra CSS string injected at start (use for a teen theme).
- Math lessons: compute answers in JS and verify them with a regex recompute test (see tests/math_ahmed.py).
- `LESSON.finite:N` : finite mode. Each level of each section gets a fixed, seeded, non-repeating set of up to N questions; finishing a level gives a medal (and the level sticker for Easy/Hard). A flown-away sticker resets that level with a NEW set. Not enabled by default.
- Learn tab can be a mind map (see lesson_maryam.js: BR array + learnInit).

## Deep-learning upgrade (added with Ahmed's chemistry lesson)
Goal: the lesson sticks and is understood deeply. No spaced review and no voice recording (Osama's choice).
Workflow now: write `lesson_X.js` + `script.json` (narration) -> `python3 -I tts.py script.json audio/` -> `python3 -I build.py lesson_X.js out.html audio/` -> `python3 -I test.py out.html shots/`.

### Language rule (fixed, Osama's decision)
The lesson language decides EVERYTHING: Arabic lesson → `ui:'ar_f'/'ar_m'`, all texts in Arabic, narration script in **Egyptian Arabic**.
English lesson (taught in English at school) → `ui:'en'`, all texts in English, narration script in **English**. Never mix (no Egyptian narration for an English lesson).

### Match the child's age (always decide this first)
| age | tone | story | examples | look | questions |
|---|---|---|---|---|---|
| 6-9 | warm, very simple | cartoon mascot (OWL) | toys, colours | many colours, stickers | recall |
| 10-12 | encouraging big sibling | adventure / journey | home, school | stickers + medals | recall + apply |
| 13+ | smart friend, no baby talk | mission / lab / detective | cooking, phones, cars, fireworks | dark "lab" theme, ranks as sticker names | why/how, predict, exam G.R. |
Narration (tts.py): Gemini TTS by default (the only engine that pronounces Egyptian dialect correctly), female voice Laomedeia, one request per clip, NO verification pass (Osama's choice), GAP seconds between clips (default 25) and a 65 s back-off on 429 because the free quota is per minute. `TTS_ENGINE=edge` = free Microsoft voice (ar-EG-SalmaNeural / en-US-AvaNeural), instant and keyless but it reads Egyptian text with a Modern Standard accent: use it only for English or MSA scripts. NEVER put style instructions in the TTS text.

### New tools (labs.js, all optional)
- `why(mkResult, [q, ans, [wrongs], explanation])`: after a correct answer the child must answer "why?" (no heart lost). Use it on core concepts.
- `LESSON.conf:true`: a "🤔 Not sure" toggle. Wrong while sure → "you were sure, remember this one" (hypercorrection).
- `mindMap({BR,...})`: the mind map, each branch may have `story` (one vivid scene/analogy) and narration `AUDIO['b'+i]`. Also `playBtn('intro',label)` for a briefing.
- `preTest(id, [[q,ans,[wrongs],reveal]])`: guess BEFORE learning, no penalty (pretesting effect).
- `poeLab(id,{predict,run,explain})`: predict → watch an animation (`run(stage)` returns a Promise, about 3 s) → explain. Give every experiment in the book its own POE (see `CLUES` + `runFrames` in lesson_ahmed_chem.js).
- Animate what cannot be seen: e.g. `atomLab()` moves the real atoms (bonds break → rearrange → new bonds) with a before/after atom count.
- `sortLab(id,{bins,items:[[text,bin,why]]})`: tap a card, tap the bin (generation effect, classification).
- `LESSON.labs=['map','poe',...]`: the Explorer sticker is earned when all these labs are done (`labDone(name)`).
- Mnemonic + analogy in every branch (e.g. "Police Catch Gas Leaks" = Precipitate, Colour, Gas, Light).
Do not name a lesson constant `CH` (engine2 uses it). See `lesson_ahmed_chem.js` as the full example.

### Celebrations + combo (fx.js, automatic for every lesson)
Correct answer: "+1" and a small spark burst at the tap. Combo milestones (3, 5, 10, 15, 20, 30...): a toast "🔥 COMBO x5 · On fire!", bursts at 5, fireworks from 10. The 🔥 streak pill glows hotter at 3/5/10. A wrong answer after a combo of 3+ shows "💨 Combo lost" and the pill fizzles. Fireworks also for the crown, the collector and the explorer stickers. Arabic or English texts follow `U.lang`; everything respects prefers-reduced-motion.
