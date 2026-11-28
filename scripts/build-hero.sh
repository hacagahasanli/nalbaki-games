#!/usr/bin/env bash
# Rebuild the home hero montage: assets/video/$NAME-1920.mp4, $NAME-1280.mp4 and assets/img/$NAME-poster-{960,1600,1920}.{webp,avif}.
# /assets is cached for 30 days, so a new cut gets a new NAME (hero-v2, hero-v3, ...) and index.html points at it.
# Swap in new footage with one run, e.g. the Last Commit Standing shoulder-camera clip:
#   LCS_SRC=~/Desktop/projects/games-studio/crazygames/videos/last-commit-standing/last-commit-standing-site-hero-1920x1080.mp4 scripts/build-hero.sh
# (then adjust the LCS start seconds in CUTS if the new clip has its best beats elsewhere).
# Seamless loop: the last XF seconds dissolve into the first XF seconds, so the file's end meets its start.
# Needs ffmpeg, bc and node with sharp (set SHARP=/path/to/node_modules/sharp if it is not installed here).
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"; v="$root/assets/video"
CG="${CG:-$HOME/Desktop/projects/games-studio/crazygames/videos}"
# Pewfield (was Floor 42) has no new footage yet (video lead, R-V1): its old office cuts were taken out on 2026-11-28.
# When PEWFIELD clips exist, add PF_SRC and put its cuts back into CUTS.
LCS_SRC="${LCS_SRC:-$CG/last-commit-standing/last-commit-standing-site-hero-1920x1080.mp4}"
[ -f "$LCS_SRC" ] || LCS_SRC="$v/last-commit-standing-1080.mp4"   # until the shoulder-camera clips exist: the current LCS clip
PL_SRC="${PL_SRC:-$v/parking-lot-1080.mp4}"
XF=0.5
# cut list: source:start:duration (seconds)
# Starts on Parking Lot: the LCS/Hazefall source has blocky sky artefacts in its shoulder-camera part (from ~1.5 s),
# so it must not be the first paint (hero poster).
CUTS=("$PL_SRC:3.0:2.4" "$LCS_SRC:1.0:3.2" "$PL_SRC:6.0:2.6" "$LCS_SRC:6.0:3.0")
NAME="${NAME:-hero-v2}"
FPS=30
tmp="$(mktemp -d)"; i=0
for c in "${CUTS[@]}"; do
  IFS=: read -r f ss d <<<"$c"
  ffmpeg -v error -y -ss "$ss" -t "$d" -i "$f" -an -vf "fps=$FPS,scale=1920:1080:flags=lanczos,setsar=1,format=yuv420p" -c:v libx264 -preset fast -crf 12 "$tmp/c$i.mp4"
  echo "file 'c$i.mp4'" >> "$tmp/list.txt"; i=$((i+1))
done
# Join with the concat filter (re-encode), not stream copy: clips from different sources differ in colour metadata and a
# copied concat decodes only the first part.
inputs=(); fc=""; for ((k=0;k<i;k++)); do inputs+=(-i "$tmp/c$k.mp4"); fc+="[$k:v]setpts=PTS-STARTPTS,format=yuv420p[v$k];"; done
for ((k=0;k<i;k++)); do fc+="[v$k]"; done
ffmpeg -v error -y "${inputs[@]}" -filter_complex "${fc}concat=n=$i:v=1:a=0[o]" -map "[o]" -an -c:v libx264 -preset fast -crf 12 "$tmp/body.mp4"
T=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$tmp/body.mp4")
E=$(echo "$T - $XF" | bc -l)
ffmpeg -v error -y -i "$tmp/body.mp4" -filter_complex \
 "[0:v]trim=start=$XF:end=$E,setpts=PTS-STARTPTS[mid];[0:v]trim=start=$E,setpts=PTS-STARTPTS[tail];[0:v]trim=end=$XF,setpts=PTS-STARTPTS[head];[tail][head]xfade=transition=fade:duration=$XF:offset=0[bl];[mid][bl]concat=n=2:v=1[o]" \
 -map "[o]" -an -c:v libx264 -preset fast -crf 12 "$tmp/loop.mp4"
ffmpeg -v error -y -i "$tmp/loop.mp4" -c:v libx264 -preset slow -crf 26 -maxrate 4.6M -bufsize 9M -profile:v high -pix_fmt yuv420p -movflags +faststart "$v/$NAME-1920.mp4"
ffmpeg -v error -y -i "$tmp/loop.mp4" -vf scale=1280:-2:flags=lanczos -c:v libx264 -preset slow -crf 25 -maxrate 2.5M -bufsize 5M -profile:v main -pix_fmt yuv420p -movflags +faststart "$v/$NAME-1280.mp4"
ffmpeg -v error -y -ss 0.5 -i "$tmp/loop.mp4" -frames:v 1 "$tmp/p.png"
# first paint of the hero = the video's first frame, so the fade from picture to video is invisible
node -e "
const s=require(process.env.SHARP||'sharp');
(async()=>{for(const w of [960,1600,1920]){const b=s(process.argv[1]).resize(w);
await b.clone().webp({quality:78,effort:6}).toFile(process.argv[2]+'/'+process.argv[3]+'-poster-'+w+'.webp');
await b.clone().avif({quality:52,effort:6}).toFile(process.argv[2]+'/'+process.argv[3]+'-poster-'+w+'.avif');}})()" "$tmp/p.png" "$root/assets/img" "$NAME"
ls -la "$v/$NAME"-*.mp4 "$root/assets/img/$NAME"-poster-*
