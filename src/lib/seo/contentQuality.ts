export interface ContentQualityResult {
  wordCount: number;
  hasPrice: boolean;
  hasCTA: boolean;
  hasContact: boolean;
  hasTechnicalTerms: boolean;
  isThin: boolean;
  qualityScore: number;
  recommendations: string[];
}

export function assessContentQuality(htmlOrText: string): ContentQualityResult {
  // Extract text content from HTML if needed
  const text = htmlOrText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  const words = text.split(/\s+/).filter(word => word.length > 2);
  const wordCount = words.length;
  
  // Check for various quality indicators
  const hasPrice = /\d+\s*(kr|dkk|danske?\s*kroner?)/i.test(text);
  const hasCTA = /(bestil|book|ring|kontakt|bestille|booking)/i.test(text);
  const hasContact = /(\+45|telefon|mail|@|kontakt)/i.test(text);
  const hasTechnicalTerms = /(reparation|garanti|batteri|skærm|kamera|ladeport|chip|proces)/i.test(text);
  
  // Calculate quality score
  let qualityScore = 0;
  const recommendations: string[] = [];
  
  // Word count scoring (250+ words = good)
  if (wordCount >= 250) {
    qualityScore += 40;
  } else if (wordCount >= 150) {
    qualityScore += 20;
    recommendations.push(`Indholdet er for kort (${wordCount} ord). Anbefalet: 250+ ord.`);
  } else {
    recommendations.push(`Indholdet er meget kort (${wordCount} ord). Tilføj mere detaljeret indhold.`);
  }
  
  // Feature scoring
  if (hasPrice) qualityScore += 15;
  else recommendations.push('Tilføj priser eller prisinformation.');
  
  if (hasCTA) qualityScore += 20;
  else recommendations.push('Tilføj call-to-action (bestil, ring, kontakt).');
  
  if (hasContact) qualityScore += 15;
  else recommendations.push('Tilføj kontaktinformation.');
  
  if (hasTechnicalTerms) qualityScore += 10;
  else recommendations.push('Tilføj tekniske termer og detaljer.');
  
  const isThin = wordCount < 250 || !hasCTA;
  
  return {
    wordCount,
    hasPrice,
    hasCTA,
    hasContact,
    hasTechnicalTerms,
    isThin,
    qualityScore,
    recommendations
  };
}

export function shouldIndexPage(result: ContentQualityResult): boolean {
  return !result.isThin && result.qualityScore >= 60;
}

export function generateRobotsMeta(result: ContentQualityResult): string {
  if (shouldIndexPage(result)) {
    return 'index,follow';
  }
  return 'noindex,follow';
}
