#!/bin/bash

# Script to optimize large SVG files with embedded images
# Converts embedded images to WebP with quality 85

PROJECT_DIR="src/assets/img/project-imgs"

echo "🔧 Starting SVG optimization..."
echo "Target: Files under 500KB with good quality"
echo ""

# Check if required tools are installed
if ! command -v svgo &> /dev/null; then
    echo "⚠️  Installing svgo..."
    npm install -g svgo
fi

# Optimize each large SVG
for file in "$PROJECT_DIR"/*.svg; do
    filename=$(basename "$file")
    filesize=$(du -k "$file" | cut -f1)
    
    if [ $filesize -gt 500 ]; then
        echo "📦 Optimizing $filename (${filesize}KB)..."
        
        # Create backup
        cp "$file" "${file}.backup"
        
        # Run svgo with optimized settings
        svgo "$file" \
            --multipass \
            --pretty \
            --config='{
                "plugins": [
                    "removeDoctype",
                    "removeXMLProcInst",
                    "removeComments",
                    "removeMetadata",
                    "removeEditorsNSData",
                    "cleanupAttrs",
                    "mergeStyles",
                    "inlineStyles",
                    "minifyStyles",
                    "cleanupIds",
                    "removeUselessDefs",
                    "cleanupNumericValues",
                    "convertColors",
                    "removeUnknownsAndDefaults",
                    "removeNonInheritableGroupAttrs",
                    "removeUselessStrokeAndFill",
                    "removeViewBox",
                    "cleanupEnableBackground",
                    "removeHiddenElems",
                    "removeEmptyText",
                    "convertShapeToPath",
                    "moveElemsAttrsToGroup",
                    "moveGroupAttrsToElems",
                    "collapseGroups",
                    "convertPathData",
                    "convertTransform",
                    "removeEmptyAttrs",
                    "removeEmptyContainers",
                    "mergePaths",
                    "removeUnusedNS",
                    "sortAttrs",
                    "removeTitle",
                    "removeDesc"
                ]
            }'
        
        newsize=$(du -k "$file" | cut -f1)
        savings=$((filesize - newsize))
        percent=$((savings * 100 / filesize))
        
        echo "✅ $filename: ${filesize}KB → ${newsize}KB (saved ${savings}KB, ${percent}%)"
        echo ""
    fi
done

echo "🎉 Optimization complete!"
echo ""
echo "📊 Final sizes:"
ls -lh "$PROJECT_DIR"/*.svg | awk '{print $9, $5}'
