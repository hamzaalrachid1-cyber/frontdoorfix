#!/bin/bash

# List of files to update
files=(
  "src/app/reparationer/apple/iphone/page.tsx"
  "src/app/reparationer/apple/ipad/page.tsx"
  "src/app/reparationer/oneplus/nord/page.tsx"
  "src/app/reparationer/oneplus/oneplus-pro/page.tsx"
  "src/app/reparationer/huawei/mate-serien/page.tsx"
  "src/app/reparationer/huawei/p-serien/page.tsx"
  "src/app/reparationer/samsung/s/page.tsx"
  "src/app/reparationer/samsung/a/page.tsx"
  "src/app/reparationer/motorola/g/page.tsx"
  "src/app/reparationer/motorola/edge/page.tsx"
)

for file in "${files[@]}"; do
  echo "Processing $file..."
  
  # Remove the description paragraph (the line with "Plus model", "Standard model", etc.)
  # This is the <p> tag right after the year
  sed -i '' '/<p class="text-sm text-gray-600 mb-4 leading-relaxed">/d' "$file"
  
  # Remove the model-chips div and its content (2 lines: div opening and the spans)
  sed -i '' '/<div className="model-chips">/,/<\/div>/d' "$file"
  
  # Adjust spacing - change mb-3 to mb-4 on the year paragraph for better spacing
  sed -i '' 's/<p class="text-sm text-gray-500 mb-3 font-medium">/<p class="text-sm text-gray-500 mb-4 font-medium">/g' "$file"
  
  # Reduce mt-4 to mt-2 on the button for tighter spacing
  sed -i '' 's/gap-2 mt-4"/gap-2 mt-2"/g' "$file"
  
  echo "✓ Updated $file"
done

echo "✅ All files updated successfully!"


