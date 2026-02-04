#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $(basename "$0") /path/to/input.mp4 [output-base-name]" >&2
}

if [[ ${#} -lt 1 || ${#} -gt 2 ]]; then
  usage
  exit 1
fi

input=$1
if [[ ! -f "$input" ]]; then
  echo "Error: input not found: $input" >&2
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Error: ffmpeg not found in PATH" >&2
  exit 1
fi

base=$(basename "$input")
name=${base%.*}
out_base=${2:-${name}-slow}
out_dir=$(dirname "$input")

out_webm="${out_dir}/${out_base}.webm"
out_mp4="${out_dir}/${out_base}.mp4"

if [[ "$input" == "$out_mp4" ]]; then
  echo "Error: output MP4 would overwrite input: $out_mp4" >&2
  exit 1
fi

slow_filter="format=gray,setpts=10*PTS,minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1"

echo "Encoding AV1 (WebM) -> $out_webm"
ffmpeg -hide_banner -y \
  -i "$input" \
  -an \
  -vf "$slow_filter" \
  -pix_fmt yuv420p \
  -c:v libsvtav1 \
  -crf 35 \
  -preset 6 \
  "$out_webm"

echo "Encoding HEVC (MP4) -> $out_mp4"
ffmpeg -hide_banner -y \
  -i "$input" \
  -an \
  -vf "$slow_filter" \
  -pix_fmt yuv420p \
  -c:v libx265 \
  -crf 30 \
  -preset slow \
  -tag:v hvc1 \
  -movflags +faststart \
  "$out_mp4"

echo "Done."
