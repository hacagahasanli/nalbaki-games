#!/usr/bin/env bash
# Encode one gameplay clip for the site: <name>-1080 and <name>-720 as mp4 (H.264) and webm (VP9), plus a webp poster.
# Usage: scripts/encode-video.sh <source.mp4> <name> [poster-second]
#   scripts/encode-video.sh ~/Desktop/projects/games-studio/crazygames/videos/floor-42/floor-42-site-hero-1920x1080.mp4 floor-42 4
# Never upscales: a 1280-wide source gets no 1080 variant.
# Needs ffmpeg and node with sharp (set SHARP=/path/to/node_modules/sharp if it is not installed here).
set -euo pipefail
src="${1:?source mp4}"; name="${2:?output name}"; poster_at="${3:-1}"
root="$(cd "$(dirname "$0")/.." && pwd)"; out="$root/assets/video"; img="$root/assets/img"
sw=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$src")
for w in 1920 1280; do
  [ "$sw" -lt "$w" ] && continue
  tag=$([ "$w" = 1920 ] && echo 1080 || echo 720)
  crf_h=$([ "$w" = 1920 ] && echo 26 || echo 28); crf_v=$([ "$w" = 1920 ] && echo 38 || echo 39); mr=$([ "$w" = 1920 ] && echo 3.6M || echo 1.6M)
  vf="scale=$w:-2:flags=lanczos,format=yuv420p"
  ffmpeg -v error -y -i "$src" -an -vf "$vf" -c:v libx264 -preset slow -crf "$crf_h" -maxrate "$mr" -bufsize "$mr" -profile:v high -movflags +faststart -pix_fmt yuv420p "$out/$name-$tag.mp4"
  ffmpeg -v error -y -i "$src" -an -vf "$vf" -c:v libvpx-vp9 -b:v "$mr" -crf "$crf_v" -row-mt 1 -deadline good -cpu-used 2 "$out/$name-$tag.webm"
done
tmp="$(mktemp -d)"
ffmpeg -v error -y -ss "$poster_at" -i "$src" -frames:v 1 -vf "scale=1280:-2:flags=lanczos" "$tmp/p.png"
node -e "const s=require(process.env.SHARP||'sharp');s(process.argv[1]).webp({quality:80,effort:6}).toFile(process.argv[2])" "$tmp/p.png" "$img/$name-poster-1280.webp"
ls -la "$out/$name"-* "$img/$name-poster-1280.webp"
