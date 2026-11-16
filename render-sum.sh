#!/bin/bash
# Render "The Sum of It" videos: ./render-sum.sh Id [Id...] -> out/sum/<Id>.mp4 (platform loudness) + <Id>-thumb.jpg
cd "$(dirname "$0")"; mkdir -p out/sum
for id in "$@"; do
  npx remotion render src/index.ts "Sum-$id" "out/sum/$id-raw.mp4" --browser-executable=/tmp/chromium --concurrency=2 --crf=17 >/dev/null 2>&1 || { echo "FAILED $id"; continue; }
  ffmpeg -loglevel error -y -i "out/sum/$id-raw.mp4" -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:a aac -b:a 192k "out/sum/$id.mp4"
  ffmpeg -loglevel error -y -sseof -0.2 -i "out/sum/$id.mp4" -frames:v 1 -q:v 2 "out/sum/$id-thumb.jpg"
  echo "DONE $id"
done
