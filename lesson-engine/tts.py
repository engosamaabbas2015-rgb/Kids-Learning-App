#!/usr/bin/env python3 -I
"""python3 -I tts.py SCRIPT.json OUT_DIR [VOICE]
SCRIPT.json = {"key": "text to speak", ...}  -> OUT_DIR/key.mp3. No verification pass (Osama's choice).
TTS_ENGINE=gemini (default): real Egyptian dialect. Needs GEMINI_API_KEY + ffmpeg. Voice default Laomedeia.
  Free quota is small: one request per clip, GAP seconds between clips (default 25), long back-off on 429.
  TTS_MODEL overrides the model (fallback: gemini-2.5-flash-preview-tts).
TTS_ENGINE=edge: free Microsoft voice, no key, instant, but reads Egyptian text with a Modern Standard accent.
  Voice default ar-EG-SalmaNeural (English: en-US-AvaNeural). Needs speech.platform.bing.com allowed.
NEVER put style instructions in the text. Skips files that already exist (delete one to regenerate)."""
import sys, os, json, time, base64, subprocess, urllib.request, urllib.error
src, out = sys.argv[1], sys.argv[2]
ENGINE = os.environ.get('TTS_ENGINE', 'gemini')
voice = sys.argv[3] if len(sys.argv) > 3 else ('Laomedeia' if ENGINE == 'gemini' else 'ar-EG-SalmaNeural')
os.makedirs(out, exist_ok=True)
todo = [(k, t) for k, t in json.load(open(src, encoding='utf8')).items()
        if not (os.path.exists(os.path.join(out, k + '.mp3')) and os.path.getsize(os.path.join(out, k + '.mp3')) > 0)]

def gemini(text, mp3):
    model = os.environ.get('TTS_MODEL', 'gemini-3.8-flash-tts')
    body = {"contents": [{"parts": [{"text": text}]}], "generationConfig": {"responseModalities": ["AUDIO"],
            "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}}}}
    req = urllib.request.Request(f'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent',
                                 json.dumps(body).encode(), {'Content-Type': 'application/json', 'x-goog-api-key': os.environ['GEMINI_API_KEY']})
    part = json.load(urllib.request.urlopen(req, timeout=240))['candidates'][0]['content']['parts'][0]
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 's16le', '-ar', '24000', '-ac', '1', '-i', '-', '-b:a', '48k', mp3],
                   input=base64.b64decode(part['inlineData']['data']), check=True)

def edge(text, mp3):
    import asyncio, edge_tts
    proxy = os.environ.get('HTTPS_PROXY') or os.environ.get('https_proxy')
    asyncio.run(edge_tts.Communicate(text, voice, proxy=proxy).save(mp3))

speak = gemini if ENGINE == 'gemini' else edge
gap = float(os.environ.get('GAP', '25')) if ENGINE == 'gemini' else 0
for i, (k, text) in enumerate(todo):
    mp3 = os.path.join(out, k + '.mp3')
    for attempt in range(6):
        try:
            speak(text, mp3)
            if os.path.getsize(mp3) > 0: break
        except urllib.error.HTTPError as e:
            wait = 65 * (attempt + 1) if e.code == 429 else 10
            print(f'  {k}: HTTP {e.code}, waiting {wait}s', flush=True); time.sleep(wait)
        except Exception as e:
            print(f'  {k}: {e}', flush=True); time.sleep(10)
    else:
        if os.path.exists(mp3): os.remove(mp3)
        sys.exit(f'FAILED {k} (quota?) - run again later, finished clips are kept')
    print(k, os.path.getsize(mp3) // 1024, 'KB', flush=True)
    if i < len(todo) - 1: time.sleep(gap)
