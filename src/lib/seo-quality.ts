// SEO Quality Gate and Duplicate Detection

interface ContentAnalysis {
  wordCount: number;
  uniqueWords: number;
  duplicateScore: number;
  qualityScore: number;
  recommendations: string[];
}

export function analyzeContent(content: string, modelName: string): ContentAnalysis {
  const words = content.toLowerCase().split(/\s+/).filter(word => word.length > 2);
  const wordCount = words.length;
  const uniqueWords = new Set(words).size;
  const duplicateScore = wordCount > 0 ? (wordCount - uniqueWords) / wordCount : 0;
  
  // Calculate quality score based on various factors
  let qualityScore = 0;
  const recommendations: string[] = [];
  
  // Word count check (250-400 words recommended)
  if (wordCount >= 250 && wordCount <= 400) {
    qualityScore += 30;
  } else if (wordCount < 250) {
    qualityScore += Math.max(0, (wordCount / 250) * 30);
    recommendations.push(`Indholdet er for kort (${wordCount} ord). Anbefalet: 250-400 ord.`);
  } else {
    qualityScore += 30;
    recommendations.push(`Indholdet er meget langt (${wordCount} ord). Overvej at opdele i flere sektioner.`);
  }
  
  // Uniqueness check
  if (duplicateScore < 0.3) {
    qualityScore += 25;
  } else {
    qualityScore += Math.max(0, (1 - duplicateScore) * 25);
    recommendations.push(`Indholdet har høj duplikat-score (${Math.round(duplicateScore * 100)}%). Tilføj mere unikt indhold.`);
  }
  
  // Model-specific content check
  const modelMentions = (content.toLowerCase().match(new RegExp(modelName.toLowerCase(), 'g')) || []).length;
  if (modelMentions >= 3) {
    qualityScore += 20;
  } else {
    qualityScore += (modelMentions / 3) * 20;
    recommendations.push(`Nævn ${modelName} mere specifikt i indholdet.`);
  }
  
  // Technical terms check
  const technicalTerms = ['reparation', 'garanti', 'batteri', 'skærm', 'kamera', 'ladeport'];
  const foundTerms = technicalTerms.filter(term => content.toLowerCase().includes(term)).length;
  qualityScore += (foundTerms / technicalTerms.length) * 15;
  
  // Contact information check
  if (content.includes('+45') || content.includes('kontakt')) {
    qualityScore += 10;
  } else {
    recommendations.push('Tilføj kontaktinformation.');
  }
  
  return {
    wordCount,
    uniqueWords,
    duplicateScore,
    qualityScore: Math.round(qualityScore),
    recommendations
  };
}

export function shouldIndexPage(analysis: ContentAnalysis): boolean {
  return analysis.qualityScore >= 70 && analysis.wordCount >= 200;
}

export function generateNoIndexMeta(analysis: ContentAnalysis): string {
  if (!shouldIndexPage(analysis)) {
    return '<meta name="robots" content="noindex, nofollow">';
  }
  return '';
}

// Content validation for model pages
export function validateModelContent(content: string, modelName: string): {
  isValid: boolean;
  analysis: ContentAnalysis;
  noIndexMeta: string;
} {
  const analysis = analyzeContent(content, modelName);
  const isValid = shouldIndexPage(analysis);
  const noIndexMeta = generateNoIndexMeta(analysis);
  
  return {
    isValid,
    analysis,
    noIndexMeta
  };
}
