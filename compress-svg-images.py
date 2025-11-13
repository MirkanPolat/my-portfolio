#!/usr/bin/env python3
import os
import re
import base64
from pathlib import Path
from PIL import Image
import io

def compress_svg_with_embedded_image(svg_path, quality=75, max_size_kb=500):
    """
    Compress embedded images in SVG files to reduce file size
    """
    print(f"\n🔧 Processing {svg_path.name}...")
    
    with open(svg_path, 'r', encoding='utf-8') as f:
        svg_content = f.read()
    
    # Find base64 encoded images
    pattern = r'data:image/(png|jpeg|jpg);base64,([A-Za-z0-9+/=]+)'
    matches = re.findall(pattern, svg_content)
    
    if not matches:
        print(f"   ⚠️  No embedded images found")
        return False
    
    print(f"   Found {len(matches)} embedded image(s)")
    
    original_size = os.path.getsize(svg_path) / 1024
    
    # Process each embedded image
    for img_format, b64_data in matches:
        try:
            # Decode base64
            img_data = base64.b64decode(b64_data)
            img = Image.open(io.BytesIO(img_data))
            
            # Convert to WebP with compression
            output_buffer = io.BytesIO()
            img.save(output_buffer, format='WebP', quality=quality, method=6)
            compressed_data = output_buffer.getvalue()
            
            # Encode back to base64
            new_b64 = base64.b64encode(compressed_data).decode('utf-8')
            
            # Replace in SVG
            old_data_url = f'data:image/{img_format};base64,{b64_data}'
            new_data_url = f'data:image/webp;base64,{new_b64}'
            svg_content = svg_content.replace(old_data_url, new_data_url)
            
            reduction = (len(b64_data) - len(new_b64)) / len(b64_data) * 100
            print(f"   ✓ Compressed image: {reduction:.1f}% reduction")
            
        except Exception as e:
            print(f"   ✗ Error processing image: {e}")
            continue
    
    # Write back
    with open(svg_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    
    new_size = os.path.getsize(svg_path) / 1024
    total_reduction = (original_size - new_size) / original_size * 100
    
    print(f"   📦 {original_size:.0f}KB → {new_size:.0f}KB ({total_reduction:.1f}% reduction)")
    
    if new_size > max_size_kb:
        print(f"   ⚠️  Still over {max_size_kb}KB, trying higher compression...")
        return compress_svg_with_embedded_image(svg_path, quality=quality-10, max_size_kb=max_size_kb)
    
    return True

def main():
    project_imgs = Path("src/assets/img/project-imgs")
    
    if not project_imgs.exists():
        print("❌ Project images directory not found!")
        return
    
    print("🚀 Starting SVG image compression...")
    print("Target: Under 500KB per file\n")
    
    svg_files = list(project_imgs.glob("*.svg"))
    large_files = [f for f in svg_files if os.path.getsize(f) / 1024 > 500]
    
    if not large_files:
        print("✅ All SVG files are already under 500KB!")
        return
    
    print(f"Found {len(large_files)} file(s) over 500KB\n")
    
    for svg_file in large_files:
        # Create backup
        backup_path = svg_file.with_suffix('.svg.backup')
        if not backup_path.exists():
            import shutil
            shutil.copy2(svg_file, backup_path)
            print(f"💾 Backup created: {backup_path.name}")
        
        compress_svg_with_embedded_image(svg_file, quality=80)
    
    print("\n" + "="*50)
    print("🎉 Compression complete!\n")
    print("📊 Final file sizes:")
    for svg_file in sorted(project_imgs.glob("*.svg")):
        size_kb = os.path.getsize(svg_file) / 1024
        status = "✅" if size_kb <= 500 else "⚠️"
        print(f"   {status} {svg_file.name}: {size_kb:.0f}KB")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Interrupted by user")
    except Exception as e:
        print(f"\n❌ Error: {e}")
