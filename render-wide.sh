#!/bin/bash
# Render Wide-Ep1 in parts (muted), join with -c copy, add the voice-over, loudness to -16 LUFS (YouTube).
cd "$(dirname "$0")"; mkdir -p out/wide; ID=${1:-Ep1}
TOTAL=$(python3 -c "import json;print(sum(x['dur'] for x in json.load(open('src/videos/$ID.timing.json'))))")
PARTS=4; STEP=$(( (TOTAL + PARTS - 1) / PARTS ))
: > out/wide/list.txt
for i in $(seq 0 $((PARTS-1))); do
  A=$((i*STEP)); B=$(( (i+1)*STEP - 1 )); [ $B -ge $TOTAL ] && B=$((TOTAL-1))
  F=out/wide/$ID-p$i.mp4
  if [ ! -s $F ]; then
    npx remotion render src/index.ts Wide-$ID out/wide/$ID-p$i.tmp.mp4 --frames=$A-$B --muted --browser-executable=/tmp/chromium --concurrency=2 --crf=18 >/dev/null 2>&1 && mv out/wide/$ID-p$i.tmp.mp4 $F || { echo "FAILED part $i"; exit 1; }
  fi
  echo "file '$(pwd)/$F'" >> out/wide/list.txt; echo "part $i done ($A-$B)"
done
ffmpeg -loglevel error -y -f concat -safe 0 -i out/wide/list.txt -i public/audio/$ID.mp3 -map 0:v -map 1:a -c:v copy -af loudnorm=I=-16:TP=-1.5:LRA=11 -c:a aac -b:a 192k -shortest out/wide/$ID.mp4
echo "DONE $(ffprobe -v error -show_entries format=duration -of csv=p=0 out/wide/$ID.mp4)s"
