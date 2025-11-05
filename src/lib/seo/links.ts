export interface LinkCheckResult {
  orphanPages: string[];
  pagesWithLowInboundLinks: string[];
  recommendations: string[];
}

export interface PageInfo {
  url: string;
  internalLinks: string[];
  inboundLinks: number;
}

export function checkOrphanLinks(pages: PageInfo[]): LinkCheckResult {
  const orphanPages: string[] = [];
  const pagesWithLowInboundLinks: string[] = [];
  const recommendations: string[] = [];
  
  // Find pages with no inbound links
  pages.forEach(page => {
    if (page.inboundLinks === 0) {
      orphanPages.push(page.url);
    } else if (page.inboundLinks < 2) {
      pagesWithLowInboundLinks.push(page.url);
    }
  });
  
  if (orphanPages.length > 0) {
    recommendations.push(`Fundet ${orphanPages.length} forældreløse sider: ${orphanPages.join(', ')}`);
  }
  
  if (pagesWithLowInboundLinks.length > 0) {
    recommendations.push(`${pagesWithLowInboundLinks.length} sider har få interne links: ${pagesWithLowInboundLinks.join(', ')}`);
  }
  
  return {
    orphanPages,
    pagesWithLowInboundLinks,
    recommendations
  };
}

export function extractInternalLinks(html: string, baseUrl: string): string[] {
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
  const links: string[] = [];
  let match;
  
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];
    
    // Check if it's an internal link
    if (href.startsWith('/') || href.includes(baseUrl)) {
      // Normalize the URL
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
