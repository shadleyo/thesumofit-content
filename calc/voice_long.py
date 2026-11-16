"""Voice a long script in chunks (split on blank lines, ~1,800 chars each), join with short gaps.
Usage: python3 calc/voice_long.py <Id> <voiceId>  -> public/audio/<Id>.mp3 + calc/<Id>-words.json"""
import base64, json, os, sys, urllib.request, subprocess, tempfile
vid, VOICE = sys.argv[1], sys.argv[2]
MODEL = "eleven_v4"; GAP = 0.45
paras = [p.strip() for p in open(f"scripts/{vid}.txt").read().split("\n\n") if p.strip()]
chunks, cur = [], ""
for p in paras:
    if cur and len(cur) + len(p) > 1800: chunks.append(cur); cur = p
    else: cur = (cur + "\n\n" + p) if cur else p
chunks.append(cur)
key = open(os.path.expanduser("~/.secrets/elevenlabs")).read().strip()
tmp = tempfile.mkdtemp(); words = []; offset = 0.0; files = []
for i, c in enumerate(chunks):
    body = {"text": c, "model_id": MODEL, "voice_settings": {"stability": 0.5, "similarity_boost": 0.75, "speed": 1.0}}
    if i > 0: body["previous_text"] = chunks[i-1][-500:]
    if i < len(chunks)-1: body["next_text"] = chunks[i+1][:300]
    req = urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE}/with-timestamps",
        data=json.dumps(body).encode(), headers={"xi-api-key": key, "Content-Type": "application/json"}, method="POST")
    try: d = json.load(urllib.request.urlopen(req, timeout=300))
    except urllib.error.HTTPError as e: print("ERROR", e.code, e.read()[:400]); sys.exit(1)
    f = f"{tmp}/c{i}.mp3"; open(f, "wb").write(base64.b64decode(d["audio_base64"])); 
    a = d["alignment"]; cw, st = "", None
    for ch, s, e in zip(a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"]):
        if ch.isspace():
            if cw: words.append([cw, st + offset, last + offset]); cw = ""
            continue
        if not cw: st = s
        cw += ch; last = e
    if cw: words.append([cw, st + offset, last + offset])
    dur = float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f]))
    # pad each chunk to exact length + GAP as wav
    w = f"{tmp}/c{i}.wav"
    subprocess.check_call(["ffmpeg","-loglevel","error","-y","-i",f,"-af",f"apad=pad_dur={GAP}","-ar","44100","-ac","1",w])
    files.append(w); offset += dur + GAP
    print(f"chunk {i}: {len(c)} chars, {dur:.1f}s")
lst = f"{tmp}/list.txt"; open(lst,"w").write("".join(f"file '{x}'\n" for x in files))
subprocess.check_call(["ffmpeg","-loglevel","error","-y","-f","concat","-safe","0","-i",lst,"-c:a","libmp3lame","-b:a","192k",f"public/audio/{vid}.mp3"])
json.dump(words, open(f"calc/{vid}-words.json","w"))
print(f"{vid}: {len(words)} words, {offset:.1f}s total")
