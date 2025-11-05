import { assessContentQuality, shouldIndexPage } from './contentQuality';

export interface ContentHookResult {
  wordCount: number;
  qualityScore: number;
  isThin: boolean;
  shouldIndex: boolean;
  recommendations: string[];
  robotsMeta: string;
}

export function useContentQuality(content: string): ContentHookResult {
  const quality = assessContentQuality(content);
  const shouldIndex = shouldIndexPage(quality);
  
  return {
    wordCount: quality.wordCount,
    qualityScore: quality.qualityScore,
    isThin: quality.isThin,
    shouldIndex,
    recommendations: quality.recommendations,
    robotsMeta: shouldIndex ? 'index,follow' : 'noindex,follow'
  };
}

export function generateModelContentTemplate(modelName: string, year?: string, chip?: string, screenTech?: string, supportsBackGlass?: boolean) {
  const template = `
## Om ${modelName} reparation – hurtigt, sikkert og gennemsigtigt

${modelName}${year ? ` (${year})` : ''} er kendt for sit ${screenTech || 'avancerede skærm'} og ${chip || 'kraftige chip'}. Når uheldet er ude, reparerer vi hurtigt og professionelt – direkte på din adresse i København og omegn.

### Ny skærm til ${modelName}

En ridset eller knust skærm påvirker både udseende og brug. Vi udskifter med original kalibreret del (pulled/testet) eller kompatibel A-kvalitet – du vælger efter behov og budget. Original bevarer typisk bedst farver/lysstyrke og touch-respons (True Tone/lyssensor hvor muligt).

### Batteri og opladning

Mister din telefon strøm for hurtigt, eller slukker den uventet? Et nyt batteri giver mærkbar forbedring i både driftstid og ydeevne. Vi kalibrerer og funktionstester – og rådgiver om gode opladningsvaner.

### Kamera og ladeport

Kamera (for/bag): Slørede billeder, fokusfejl eller pletter løses med udskiftning og test. Ladeport: Rensning eller udskiftning ved ladeproblemer/ustabil forbindelse.

${supportsBackGlass ? `### Bagcover og bagglas

På ${modelName} skifter vi bagglasset sikkert og rent, så din telefon ser ud som ny igen.` : ''}

### Priser og garanti

Priser som vist – inkl. moms, kalibrering og test. Ingen skjulte gebyrer. Varighed: de fleste reparationer tager 20–30 min på stedet. Garanti: 24 mdr. på skærme, 12 mdr. på batterier og øvrige dele.

### Hvorfor vælge os

Erfarne teknikere med over 2.000 gennemførte reparationer, gennemsigtige priser og dele i topkvalitet. Vi rådgiver ærligt om, hvad der bedst kan betale sig for netop din ${modelName}.

### Kontakt os

Er du i tvivl? Ring på +45 93 54 54 57 – vi svarer typisk inden for 5 minutter. Vi tilbyder også erhvervsaftaler og kan komme ud til din arbejdsplads.
`;

  return template.trim();
}

export function addInternalLinks(content: string, modelName: string, modelSlug: string): string {
  const links = [
    `[Se alle Apple-reparationer](/reparationer/apple)`,
    `[Bestil tid nu](/reparationer/apple/${modelSlug}#booking)`,
    `[Relaterede iPhone-modeller](/reparationer/apple/iphone)`,
    `[Kontakt os](/kontakt)`
  ];

  // Add links to the content
  let enhancedContent = content;
  
  // Add links after the intro paragraph
  enhancedContent = enhancedContent.replace(
    /(Når uheldet er ude, reparerer vi hurtigt og professionelt – direkte på din adresse i København og omegn\.)/,
    `$1\n\n${links.join(' • ')}`
  );

  return enhancedContent;
}
