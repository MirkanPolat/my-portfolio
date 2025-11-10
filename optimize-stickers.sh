#!/bin/bash

echo "🎨 Optimizing stickers..."

cd "/Users/mirkanpolat/Documents/Developer Akademie/Modul 15/angular-projects/Mirkan-Polat-Portfolio/src/assets"

mkdir -p "optimized/03_Stickers"
sips -Z 200 "Design-material/03_Stickers/Arrow.png" --out /tmp/arrow.png >/dev/null 2>&1
cwebp -q 85 /tmp/arrow.png -o "optimized/03_Stickers/Arrow.webp" 2>/dev/null
echo "✓ Arrow → $(du -h "optimized/03_Stickers/Arrow.webp" | cut -f1)"

sips -Z 400 "Design-material/03_Stickers/01_Skills - Peel off/Frame.png" --out /tmp/frame.png >/dev/null 2>&1
cwebp -q 85 /tmp/frame.png -o "optimized/03_Stickers/01_Skills - Peel off/Frame.webp" 2>/dev/null
echo "✓ Frame → $(du -h "optimized/03_Stickers/01_Skills - Peel off/Frame.webp" | cut -f1)"

mkdir -p "optimized/03_Stickers/02_Testimonials/Color option 3"
sips -Z 800 "Design-material/03_Stickers/02_Testimonials/Color option 3/Line.png" --out /tmp/line.png >/dev/null 2>&1
cwebp -q 85 /tmp/line.png -o "optimized/03_Stickers/02_Testimonials/Color option 3/Line.webp" 2>/dev/null
echo "✓ Line → $(du -h "optimized/03_Stickers/02_Testimonials/Color option 3/Line.webp" | cut -f1)"

mkdir -p "optimized/03_Stickers/00_Round"
sips -Z 800 "Design-material/03_Stickers/00_Round/08_ Color option 3 - C.png" --out /tmp/round.png >/dev/null 2>&1
cwebp -q 80 /tmp/round.png -o "optimized/03_Stickers/00_Round/08_ Color option 3 - C.webp" 2>/dev/null
echo "✓ Round → $(du -h "optimized/03_Stickers/00_Round/08_ Color option 3 - C.webp" | cut -f1)"

rm -f /tmp/{arrow,frame,line,round}.png
echo ""
echo "✅ Done!"
