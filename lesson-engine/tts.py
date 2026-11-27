#!/usr/bin/env python3 -I
"""python3 -I tts.py SCRIPT.json OUT_DIR [VOICE]
SCRIPT.json = {"key": "text to speak", ...}  -> OUT_DIR/key.mp3
Free Microsoft Edge neural voices (pip install edge-tts), no API key, no verification pass.
VOICE: default ar-EG-SalmaNeural (Egyptian, female). English lessons: en-US-AvaNeural.
Needs network access to speech.platform.bing.com. Skips files that already exist (delete one to regenerate)."""
import sys, os, json, asyncio, edge_tts
src, out = sys.argv[1], sys.argv[2]
voice = sys.argv[3] if len(sys.argv) > 3 else 'ar-EG-SalmaNeural'
proxy = os.environ.get('HTTPS_PROXY') or os.environ.get('https_proxy')

async def main():
    os.makedirs(out, exist_ok=True)
    for k, text in json.load(open(src, encoding='utf8')).items():
        mp3 = os.path.join(out, k + '.mp3')
        if os.path.exists(mp3) and os.path.getsize(mp3) > 0:
            continue
        for attempt in range(4):
            try:
                await edge_tts.Communicate(text, voice, proxy=proxy).save(mp3)
                if os.path.getsize(mp3) > 0:
                    break
            except Exception as e:
                print('  retry', k, e); await asyncio.sleep(5 * (attempt + 1))
        else:
            if os.path.exists(mp3): os.remove(mp3)
            sys.exit('FAILED ' + k)
        print(k, os.path.getsize(mp3) // 1024, 'KB')
asyncio.run(main())
