"""Generate a voice-over with word timings.
Usage: python3 calc/voice.py <VideoId>   (reads scripts/<VideoId>.txt)
Writes public/audio/<VideoId>.mp3 and calc/<VideoId>-words.json  [[word, start, end], ...]
The API key lives in ~/.secrets/elevenlabs (never in the project)."""
import base64, json, os, sys, urllib.request
VOICE = "CwhRBWXzGAHq8TQ4Fs17"   # Roger - Laid-Back, Casual, Resonant
MODEL = "eleven_v4"
vid = sys.argv[1]
if len(sys.argv) > 2: VOICE = sys.argv[2]
text = open(f"scripts/{vid}.txt").read().strip()
key = open(os.path.expanduser("~/.secrets/elevenlabs")).read().strip()
req = urllib.request.Request(
    f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE}/with-timestamps",
    data=json.dumps({"text": text, "model_id": MODEL,
                     "voice_settings": {"stability": 0.5, "similarity_boost": 0.75, "speed": 1.0}}).encode(),
    headers={"xi-api-key": key, "Content-Type": "application/json"}, method="POST")
d = json.load(urllib.request.urlopen(req, timeout=180))
open(f"public/audio/{vid}.mp3", "wb").write(base64.b64decode(d["audio_base64"]))
a = d["alignment"]
words, cur, start = [], "", None
for ch, s, e in zip(a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"]):
    if ch.isspace():
        if cur: words.append([cur, start, last]); cur = ""
        continue
    if not cur: start = s
    cur += ch; last = e
if cur: words.append([cur, start, last])
json.dump(words, open(f"calc/{vid}-words.json", "w"))
print(f"{vid}: {len(words)} words, {words[-1][2]:.1f}s, {len(text)} chars")
