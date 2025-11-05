#!/usr/bin/env node

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

// Import our SEO utilities (we'll need to compile these or use a different approach)
// For now, we'll implement the logic directly in the script

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, ' ')
    .replace(/\d+/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function jaccardSimilarity(text1, text2) {
  const words1 = new Set(text1.split(' ').filter(w => w.length > 2));
  const words2 = new Set(text2.split(' ').filter(w => w.length > 2));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}

function assessContentQuality(htmlOrText) {
  const text = htmlOrText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(/\s+/).filter(word => word.length > 2);
  const wordCount = words.length;
  
  const hasPrice = /\d+\s*(kr|dkk|danske?\s*kroner?)/i.test(text);
  const hasCTA = /(bestil|book|ring|kontakt|bestille|booking)/i.test(text);
  const hasContact = /(\+45|telefon|mail|@|kontakt)/i.test(text);
  
  const isThin = wordCount < 250 || !hasCTA;
  
  return {
    wordCount,
    hasPrice,
    hasCTA,
    hasContact,
    isThin,
    qualityScore: wordCount >= 250 ? 40 : 20 + (wordCount >= 150 ? 20 : 0)
  };
}

async function fetchPageContent(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.warn(`Failed to fetch ${url}: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🔍 Running SEO Lint...\n');
  
  const baseUrl = 'http://localhost:3000';
  const modelPages = [
    'iphone-6', 'iphone-6-plus', 'iphone-6s', 'iphone-6s-plus',
    'iphone-7', 'iphone-7-plus', 'iphone-8', 'iphone-8-plus',
    'iphone-x', 'iphone-xr', 'iphone-xs', 'iphone-xs-max',
    'iphone-11', 'iphone-11-pro', 'iphone-11-pro-max',
    'iphone-12-mini', 'iphone-12', 'iphone-12-pro', 'iphone-12-pro-max',
    'iphone-13-mini', 'iphone-13', 'iphone-13-pro', 'iphone-13-pro-max',
    'iphone-14', 'iphone-14-plus', 'iphone-14-pro', 'iphone-14-pro-max',
    'iphone-15', 'iphone-15-plus', 'iphone-15-pro', 'iphone-15-pro-max',
    'iphone-16', 'iphone-16-plus', 'iphone-16-pro', 'iphone-16-pro-max'
  ];
  
  const pages = [];
  const duplicates = [];
  const thinPages = [];
  
  // Check each model page
  for (const model of modelPages) {
    const url = `${baseUrl}/reparationer/apple/${model}`;
    console.log(`📄 Checking ${model}...`);
    
    const content = await fetchPageContent(url);
    if (!content) {
      console.warn(`  ⚠️  Could not fetch content for ${model}`);
      continue;
    }
    
    const quality = assessContentQuality(content);
    pages.push({ url, content, model, quality });
    
    if (quality.isThin) {
      thinPages.push({ model, url, quality });
      console.log(`  ❌ Thin content: ${quality.wordCount} words, CTA: ${quality.hasCTA}`);
    } else {
      console.log(`  ✅ Good content: ${quality.wordCount} words`);
    }
  }
  
  // Check for duplicates
  console.log('\n🔍 Checking for duplicate content...');
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const page1 = pages[i];
      const page2 = pages[j];
      
      const normalized1 = normalizeText(page1.content);
      const normalized2 = normalizeText(page2.content);
      
      const similarity = jaccardSimilarity(normalized1, normalized2);
      
      if (similarity > 0.70) {
        duplicates.push({
          page1: page1.model,
          page2: page2.model,
          similarity: similarity
        });
        console.log(`  ❌ High similarity: ${page1.model} ↔ ${page2.model} (${Math.round(similarity * 100)}%)`);
      }
    }
  }
  
  // Summary
  console.log('\n📊 SEO Lint Summary:');
  console.log(`  Pages checked: ${pages.length}`);
  console.log(`  Thin pages: ${thinPages.length}`);
  console.log(`  Duplicate pairs: ${duplicates.length}`);
  
  if (thinPages.length > 0) {
    console.log('\n❌ Thin pages (should be noindex):');
    thinPages.forEach(page => {
      console.log(`  - ${page.model}: ${page.quality.wordCount} words, CTA: ${page.quality.hasCTA}`);
    });
  }
  
  if (duplicates.length > 0) {
    console.log('\n❌ Duplicate content pairs:');
    duplicates.forEach(dup => {
      console.log(`  - ${dup.page1} ↔ ${dup.page2}: ${Math.round(dup.similarity * 100)}% similarity`);
    });
  }
  
  // Exit with error code if issues found
  if (thinPages.length > 0 || duplicates.length > 0) {
    console.log('\n❌ SEO issues found. Please fix before merging.');
    process.exit(1);
  } else {
    console.log('\n✅ All SEO checks passed!');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('❌ SEO Lint failed:', error);
  process.exit(1);
});
