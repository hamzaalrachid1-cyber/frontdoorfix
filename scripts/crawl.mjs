#!/usr/bin/env node

import { fileURLToPath } from 'url';

function extractInternalLinks(html, baseUrl) {
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
  const links = [];
  let match;
  
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];
    
    // Check if it's an internal link
    if (href.startsWith('/') || href.includes(baseUrl)) {
      let normalizedUrl = href;
      if (href.startsWith('/')) {
        normalizedUrl = baseUrl + href;
      }
      
      // Remove fragments and query params for comparison
      normalizedUrl = normalizedUrl.split('#')[0].split('?')[0];
      
      links.push(normalizedUrl);
    }
  }
  
  return [...new Set(links)]; // Remove duplicates
}

async function fetchPage(url) {
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

async function crawlSite(startUrls, baseUrl) {
  const visited = new Set();
  const pages = new Map();
  const queue = [...startUrls];
  
  while (queue.length > 0) {
    const url = queue.shift();
    
    if (visited.has(url)) continue;
    visited.add(url);
    
    console.log(`🔍 Crawling ${url}...`);
    
    const html = await fetchPage(url);
    if (!html) continue;
    
    const internalLinks = extractInternalLinks(html, baseUrl);
    pages.set(url, {
      url,
      internalLinks,
      inboundLinks: 0
    });
    
    // Add new internal links to queue
    internalLinks.forEach(link => {
      if (!visited.has(link) && !queue.includes(link)) {
        queue.push(link);
      }
    });
  }
  
  // Calculate inbound links
  for (const [url, pageInfo] of pages) {
    for (const [, otherPageInfo] of pages) {
      if (otherPageInfo.internalLinks.includes(url)) {
        pageInfo.inboundLinks++;
      }
    }
  }
  
  return pages;
}

async function main() {
  console.log('🕷️  Crawling site for orphan links...\n');
  
  const baseUrl = 'http://localhost:3000';
  const startUrls = [
    `${baseUrl}/`,
    `${baseUrl}/reparationer`,
    `${baseUrl}/reparationer/apple`
  ];
  
  const pages = await crawlSite(startUrls, baseUrl);
  
  console.log(`\n📊 Crawl Summary:`);
  console.log(`  Pages found: ${pages.size}`);
  
  const orphanPages = [];
  const lowInboundPages = [];
  
  for (const [url, pageInfo] of pages) {
    if (pageInfo.inboundLinks === 0) {
      orphanPages.push(url);
    } else if (pageInfo.inboundLinks < 2) {
      lowInboundPages.push(url);
    }
  }
  
  if (orphanPages.length > 0) {
    console.log(`\n❌ Orphan pages (0 inbound links):`);
    orphanPages.forEach(url => {
      console.log(`  - ${url}`);
    });
  }
  
  if (lowInboundPages.length > 0) {
    console.log(`\n⚠️  Pages with low inbound links (<2):`);
    lowInboundPages.forEach(url => {
      const pageInfo = pages.get(url);
      console.log(`  - ${url} (${pageInfo.inboundLinks} links)`);
    });
  }
  
  if (orphanPages.length === 0 && lowInboundPages.length === 0) {
    console.log('\n✅ No orphan pages found!');
  }
  
  // Exit with error code if orphan pages found
  if (orphanPages.length > 0) {
    console.log('\n❌ Orphan pages found. Please add internal links.');
    process.exit(1);
  } else {
    console.log('\n✅ All pages have sufficient inbound links!');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('❌ Crawl failed:', error);
  process.exit(1);
});
