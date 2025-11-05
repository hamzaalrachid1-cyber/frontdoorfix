#!/usr/bin/env node

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

async function fetchSitemap() {
  try {
    const response = await fetch('http://localhost:3000/sitemap.xml');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Failed to fetch sitemap:', error.message);
    return null;
  }
}

async function fetchPageCanonical(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const html = await response.text();
    
    // Extract canonical URL
    const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i);
    return canonicalMatch ? canonicalMatch[1] : null;
  } catch (error) {
    console.warn(`Failed to fetch ${url}: ${error.message}`);
    return null;
  }
}

function parseSitemap(sitemapXml) {
  const urls = [];
  const urlRegex = /<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g;
  let match;
  
  while ((match = urlRegex.exec(sitemapXml)) !== null) {
    urls.push({
      loc: match[1],
      lastmod: match[2]
    });
  }
  
  return urls;
}

async function main() {
  console.log('🗺️  Checking Sitemap and Canonical URLs...\n');
  
  const sitemapXml = await fetchSitemap();
  if (!sitemapXml) {
    console.error('❌ Could not fetch sitemap.xml');
    process.exit(1);
  }
  
  const sitemapUrls = parseSitemap(sitemapXml);
  console.log(`📄 Found ${sitemapUrls.length} URLs in sitemap`);
  
  const mismatches = [];
  const errors = [];
  
  // Check each URL in sitemap
  for (const urlInfo of sitemapUrls) {
    console.log(`🔍 Checking ${urlInfo.loc}...`);
    
    const canonical = await fetchPageCanonical(urlInfo.loc);
    
    if (!canonical) {
      errors.push({
        url: urlInfo.loc,
        error: 'Could not fetch canonical URL'
      });
      console.log(`  ❌ Could not fetch canonical`);
      continue;
    }
    
    if (canonical !== urlInfo.loc) {
      mismatches.push({
        sitemap: urlInfo.loc,
        canonical: canonical
      });
      console.log(`  ❌ Mismatch: sitemap=${urlInfo.loc}, canonical=${canonical}`);
    } else {
      console.log(`  ✅ Canonical matches sitemap`);
    }
  }
  
  // Summary
  console.log('\n📊 Sitemap Check Summary:');
  console.log(`  URLs checked: ${sitemapUrls.length}`);
  console.log(`  Mismatches: ${mismatches.length}`);
  console.log(`  Errors: ${errors.length}`);
  
  if (mismatches.length > 0) {
    console.log('\n❌ Canonical/Sitemap mismatches:');
    mismatches.forEach(mismatch => {
      console.log(`  - Sitemap: ${mismatch.sitemap}`);
      console.log(`    Canonical: ${mismatch.canonical}`);
    });
  }
  
  if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(error => {
      console.log(`  - ${error.url}: ${error.error}`);
    });
  }
  
  // Exit with error code if issues found
  if (mismatches.length > 0 || errors.length > 0) {
    console.log('\n❌ Sitemap issues found. Please fix before merging.');
    process.exit(1);
  } else {
    console.log('\n✅ All sitemap checks passed!');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('❌ Sitemap check failed:', error);
  process.exit(1);
});
