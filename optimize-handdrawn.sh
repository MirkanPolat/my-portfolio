#!/bin/bash

echo "🎨 Optimizing hand-drawn lines..."

cd "/Users/mirkanpolat/Documents/Developer Akademie/Modul 15/angular-projects/Mirkan-Polat-Portfolio/src/assets"

mkdir -p "optimized/00_Hand-drawn lines/00_Header/Color option 3"
mkdir -p "optimized/00_Hand-drawn lines/01_About me"
mkdir -p "optimized/00_Hand-drawn lines/02_Skills"
mkdir -p "optimized/00_Hand-drawn lines/03_Portfolio"
mkdir -p "optimized/00_Hand-drawn lines/04_Testimonials"
mkdir -p "optimized/00_Hand-drawn lines/05_Contact"

sips -Z 600 "Design-material/00_Hand-drawn lines/01_About me/Color option 3.png" --out /tmp/temp_aboutme.png >/dev/null 2>&1
cwebp -q 85 /tmp/temp_aboutme.png -o "optimized/00_Hand-drawn lines/01_About me/Color option 3.webp" 2>/dev/null
echo "✓ About me ($(du -h "optimized/00_Hand-drawn lines/01_About me/Color option 3.webp" | cut -f1))"

sips -Z 600 "Design-material/00_Hand-drawn lines/02_Skills/Color option 1.png" --out /tmp/temp_skills.png >/dev/null 2>&1
cwebp -q 85 /tmp/temp_skills.png -o "optimized/00_Hand-drawn lines/02_Skills/Color option 1.webp" 2>/dev/null
echo "✓ Skills ($(du -h "optimized/00_Hand-drawn lines/02_Skills/Color option 1.webp" | cut -f1))"

sips -Z 600 "Design-material/00_Hand-drawn lines/03_Portfolio/Color option 3.png" --out /tmp/temp_portfolio.png >/dev/null 2>&1
cwebp -q 85 /tmp/temp_portfolio.png -o "optimized/00_Hand-drawn lines/03_Portfolio/Color option 3.webp" 2>/dev/null
echo "✓ Portfolio ($(du -h "optimized/00_Hand-drawn lines/03_Portfolio/Color option 3.webp" | cut -f1))"

sips -Z 600 "Design-material/00_Hand-drawn lines/04_Testimonials/Color option 1.png" --out /tmp/temp_testimonials.png >/dev/null 2>&1
cwebp -q 85 /tmp/temp_testimonials.png -o "optimized/00_Hand-drawn lines/04_Testimonials/Color option 1.webp" 2>/dev/null
echo "✓ Testimonials ($(du -h "optimized/00_Hand-drawn lines/04_Testimonials/Color option 1.webp" | cut -f1))"

sips -Z 600 "Design-material/00_Hand-drawn lines/05_Contact/Color option 1.png" --out /tmp/temp_contact.png >/dev/null 2>&1
cwebp -q 85 /tmp/temp_contact.png -o "optimized/00_Hand-drawn lines/05_Contact/Color option 1.webp" 2>/dev/null
echo "✓ Contact ($(du -h "optimized/00_Hand-drawn lines/05_Contact/Color option 1.webp" | cut -f1))"

for i in 1 2 3 4; do
  sips -Z 300 "Design-material/00_Hand-drawn lines/00_Header/Color option 3/$i.png" --out "/tmp/temp_header_$i.png" >/dev/null 2>&1
  cwebp -q 85 "/tmp/temp_header_$i.png" -o "optimized/00_Hand-drawn lines/00_Header/Color option 3/$i.webp" 2>/dev/null
done
echo "✓ Header lines"

rm -f /tmp/temp_*.png
echo ""
echo "✅ Done!"
