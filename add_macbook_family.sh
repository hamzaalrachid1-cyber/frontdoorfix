#!/bin/bash

echo "=========================================="
echo "📦 TILFØJER FAMILY FELT TIL MACBOOK"
echo "=========================================="

for file in src/data/repairs/apple/macbook*.json; do
  slug=$(basename "$file" .json)
  
  # Determine family based on model name
  if echo "$slug" | grep -qi "pro"; then
    family="macbookpro"
  elif echo "$slug" | grep -qi "air"; then
    family="macbookair"
  else
    family="macbook"
  fi
  
  # Add family field
  jq --arg family "$family" '.family = $family' "$file" > "${file}.tmp" && mv "${file}.tmp" "$file"
  
  echo "✅ $slug → family: $family"
done

echo ""
echo "=========================================="
echo "✅ FAMILY FELT TILFØJET"
echo "=========================================="
