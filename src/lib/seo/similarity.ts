export interface SimilarityResult {
  page1: string;
  page2: string;
  similarity: number;
  sections: string[];
}

export interface DuplicateCheckResult {
  duplicates: SimilarityResult[];
  hasDuplicates: boolean;
  recommendations: string[];
}

// Normalize text for comparison
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, ' ') // Remove HTML tags
    .replace(/\d+/g, '') // Remove numbers
    .replace(/[^\w\s]/g, ' ') // Remove punctuation
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

// Calculate Jaccard similarity
function jaccardSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.split(' ').filter(w => w.length > 2));
  const words2 = new Set(text2.split(' ').filter(w => w.length > 2));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}

// Calculate cosine similarity
function cosineSimilarity(text1: string, text2: string): number {
  const words1 = text1.split(' ').filter(w => w.length > 2);
  const words2 = text2.split(' ').filter(w => w.length > 2);
  
  const allWords = new Set([...words1, ...words2]);
  const vector1 = Array.from(allWords).map(word => words1.filter(w => w === word).length);
  const vector2 = Array.from(allWords).map(word => words2.filter(w => w === word).length);
  
  const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
  const magnitude1 = Math.sqrt(vector1.reduce((sum, val) => sum + val * val, 0));
  const magnitude2 = Math.sqrt(vector2.reduce((sum, val) => sum + val * val, 0));
  
  if (magnitude1 === 0 || magnitude2 === 0) return 0;
  
  return dotProduct / (magnitude1 * magnitude2);
}

export function checkDuplicates(pages: Array<{url: string, content: string}>): DuplicateCheckResult {
  const duplicates: SimilarityResult[] = [];
  const recommendations: string[] = [];
  
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const page1 = pages[i];
      const page2 = pages[j];
      
      const normalized1 = normalizeText(page1.content);
      const normalized2 = normalizeText(page2.content);
      
      // Use both Jaccard and Cosine similarity
      const jaccardSim = jaccardSimilarity(normalized1, normalized2);
      const cosineSim = cosineSimilarity(normalized1, normalized2);
      const avgSimilarity = (jaccardSim + cosineSim) / 2;
      
      if (avgSimilarity > 0.70) {
        duplicates.push({
          page1: page1.url,
          page2: page2.url,
          similarity: avgSimilarity,
          sections: ['content'] // Could be expanded to identify specific sections
        });
      }
    }
  }
  
  if (duplicates.length > 0) {
    recommendations.push(`Fundet ${duplicates.length} par med høj lighed (>70%).`);
    duplicates.forEach(dup => {
      recommendations.push(`${dup.page1} og ${dup.page2} har ${Math.round(dup.similarity * 100)}% lighed.`);
    });
  }
  
  return {
    duplicates,
    hasDuplicates: duplicates.length > 0,
    recommendations
  };
}

// Whitelist for common sections that can be similar
export const WHITELISTED_SECTIONS = [
  'garanti',
  'kvalitet',
  'kontakt',
  'priser',
  'hvorfor vælge os'
];
