#!/usr/bin/env python3 -I
"""python3 -I tts.py SCRIPT.json OUT_DIR [VOICE]
SCRIPT.json = {"key": "text to speak", ...}  -> OUT_DIR/key.mp3 (Gemini TTS, mono 48 kbps).
Sends ONLY the script text (no style instructions: the TTS model reads instructions aloud and may improvise).
Every clip is transcribed back and compared with the script; it is regenerated until it matches (>= 85%).
Needs GEMINI_API_KEY and ffmpeg. Skips files that already exist (delete one to regenerate)."""
import sys, os, json, base64, subprocess, urllib.request, time, re, difflib
src, out = sys.argv[1], sys.argv[2]
voice = sys.argv[3] if len(sys.argv) > 3 else 'Laomedeia'
TTS = os.environ.get('TTS_MODEL', 'gemini-3.8-flash-tts'); STT = os.environ.get('STT_MODEL', 'gemini-3.5-flash')
KEY = os.environ['GEMINI_API_KEY']
def call(model, body):
    for attempt in range(5):
        try:
            req = urllib.request.Request(f'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent',
                                         json.dumps(body).encode(), {'Content-Type': 'application/json', 'x-goog-api-key': KEY})
            return json.load(urllib.request.urlopen(req, timeout=240))['candidates'][0]['content']['parts'][0]
        except Exception as e:
            print('  retry', model, e); time.sleep(6 * (attempt + 1))
    sys.exit('FAILED ' + model)
words = lambda t: re.sub(r'[^\w\s]', ' ', t.lower()).split()
os.makedirs(out, exist_ok=True)
for k, text in json.load(open(src, encoding='utf8')).items():
    mp3 = os.path.join(out, k + '.mp3')
    if os.path.exists(mp3):
        continue
    for take in range(4):
        part = call(TTS, {"contents": [{"parts": [{"text": text}]}], "generationConfig": {"responseModalities": ["AUDIO"],
                    "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}}}})
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 's16le', '-ar', '24000', '-ac', '1', '-i', '-', '-b:a', '48k', mp3],
                       input=base64.b64decode(part['inlineData']['data']), check=True)
        heard = call(STT, {"contents": [{"parts": [{"inlineData": {"mimeType": "audio/mpeg", "data": base64.b64encode(open(mp3, 'rb').read()).decode()}},
                    {"text": "Transcribe this audio word for word. Output only the words, no timestamps."}]}]})['text']
        score = difflib.SequenceMatcher(None, words(text), words(heard)).ratio()
        print(f'{k} take {take + 1}: match {score:.0%}', os.path.getsize(mp3) // 1024, 'KB')
        if score >= .85:
            break
    else:
        os.remove(mp3); sys.exit(f'FAILED {k}: audio never matched the script')
