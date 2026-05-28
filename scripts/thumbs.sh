#!/bin/sh
for f in projects/*/main.png; do
  t="$(dirname $f)/thumb.png"
  if [ ! -f "$t" ]; then sips -Z 600 "$f" --out "$t"; fi
done
