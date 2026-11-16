#!/bin/bash
# Render finished videos: ./render.sh Id [Id...]  -> out/<id>-final.mp4 (platform loudness)
cd "$(dirname "$0")"
for id in "$@"; do
  npx remotion render src/index.ts "$id" "out/$id.mp4" --browser-executable=/tmp/chromium --concurrency=2 --crf=18 >/dev/null 2>&1 || { echo "FAILED $id"; continue; }
  ffmpeg -loglevel error -y -i "out/$id.mp4" -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:a aac -b:a 192k "out/$id-final.mp4" && echo "DONE $id"
done
