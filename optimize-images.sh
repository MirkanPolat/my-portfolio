#!/bin/bash

echo "Starting image optimization..."

ASSETS_DIR="src/assets/Design-material"
OPTIMIZED_DIR="src/assets/optimized"

mkdir -p "$OPTIMIZED_DIR"

process_file() {
    local file="$1"
    local target_width="$2"
    local current="$3"
    local total="$4"
    
    echo ""
    echo "[$current/$total] Processing: $file"
    echo "  Target width: ${target_width}px"
    
    input_file="$ASSETS_DIR/$file"
    filename=$(basename "$file" .png)
    dirname=$(dirname "$file")
    
    output_dir="$OPTIMIZED_DIR/$dirname"
    mkdir -p "$output_dir"
    
    temp_file="/tmp/temp_resized_$$.png"
    output_file="$output_dir/${filename}.webp"
    
    if [ -f "$input_file" ]; then
        original_size=$(du -h "$input_file" | cut -f1)
        
        echo "  Resizing..."
        sips -Z "$target_width" "$input_file" --out "$temp_file" >/dev/null 2>&1
        
        echo "  Converting..."
        cwebp -q 80 "$temp_file" -o "$output_file" 2>/dev/null
        
        rm -f "$temp_file"
        
        if [ -f "$output_file" ]; then
            new_size=$(du -h "$output_file" | cut -f1)
            echo "  $original_size -> $new_size"
        else
            echo "  Failed"
        fi
    else
        echo "  Not found"
    fi
}

# Process all files
current=0
total=9

current=$((current + 1))
process_file "01_Background/Img Original Size/Skills BG.png" 1920 $current $total

current=$((current + 1))
process_file "01_Background/Design Size Relation@3x/01_Hero.png" 1920 $current $total

current=$((current + 1))
process_file "01_Background/Design Size Relation@3x/skill_set_text.png" 800 $current $total

current=$((current + 1))
process_file "01_Background/Img Original Size/Note book paper.png" 1920 $current $total

current=$((current + 1))
process_file "01_Background/Img Original Size/12 Isolated Paper Rips copia.png" 1920 $current $total

current=$((current + 1))
process_file "03_Stickers/01_Skills - Peel off/Default.png" 400 $current $total

current=$((current + 1))
process_file "03_Stickers/01_Skills - Peel off/Transition.png" 400 $current $total

current=$((current + 1))
process_file "03_Stickers/01_Skills - Peel off/Final.png" 400 $current $total

current=$((current + 1))
process_file "03_Stickers/02_Testimonials/Color option 3/A.png" 800 $current $total

echo ""
echo "Done. Files in: $OPTIMIZED_DIR"
