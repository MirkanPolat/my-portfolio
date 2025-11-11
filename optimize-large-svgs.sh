#!/bin/bash

echo "Starting conversion of large project SVGs..."

cd "src/assets/img/project-imgs"

# Convert SVGs to PNG first (high quality), then to WebP
echo "Converting Laptop.svg (6.9MB)..."
magick Laptop.svg -resize 800x600 -quality 90 /tmp/laptop.png 2>/dev/null || \
  qlmanage -t -s 800 -o /tmp Laptop.svg >/dev/null 2>&1 && mv /tmp/Laptop.svg.png /tmp/laptop.png
cwebp -q 85 /tmp/laptop.png -o Laptop.webp 2>/dev/null
echo "Laptop -> $(du -h Laptop.webp | cut -f1)"

echo "Converting featured.svg (6MB)..."
magick featured.svg -resize 400x400 -quality 90 /tmp/featured.png 2>/dev/null || \
  qlmanage -t -s 400 -o /tmp featured.svg >/dev/null 2>&1 && mv /tmp/featured.svg.png /tmp/featured.png
cwebp -q 85 /tmp/featured.png -o featured.webp 2>/dev/null
echo "Featured -> $(du -h featured.webp | cut -f1)"

echo "Converting DABubble.svg (1.3MB)..."
magick DABubble.svg -resize 800x600 -quality 90 /tmp/dabubble.png 2>/dev/null || \
  qlmanage -t -s 800 -o /tmp DABubble.svg >/dev/null 2>&1 && mv /tmp/DABubble.svg.png /tmp/dabubble.png
cwebp -q 85 /tmp/dabubble.png -o DABubble.webp 2>/dev/null
echo "DABubble -> $(du -h DABubble.webp | cut -f1)"

echo "Converting El-Pollo-Loco.svg (1.9MB)..."
magick "El-Pollo-Loco.svg" -resize 800x600 -quality 90 /tmp/pollo.png 2>/dev/null || \
  qlmanage -t -s 800 -o /tmp "El-Pollo-Loco.svg" >/dev/null 2>&1 && mv /tmp/El-Pollo-Loco.svg.png /tmp/pollo.png
cwebp -q 85 /tmp/pollo.png -o El-Pollo-Loco.webp 2>/dev/null
echo "El-Pollo-Loco -> $(du -h El-Pollo-Loco.webp | cut -f1)"

rm -f /tmp/{laptop,featured,dabubble,pollo}.png
echo ""
echo "Done."
