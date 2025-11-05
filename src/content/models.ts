export interface ModelSeoContent {
  model: string;
  year?: string;
  chip?: string;
  screenTech?: string;
  supportsBackGlass: boolean;
  usbType: string;
  cities: string;
  intro: string;
  sections: {
    screen: string;
    battery: string;
    camera: string;
    backGlass?: string;
    pricing: string;
    whyChoose: string;
    contact: string;
  };
}

export const defaultSeoContent: Omit<ModelSeoContent, 'model'> = {
  supportsBackGlass: false,
  usbType: "Lightning",
  cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn",
  intro: "{{model}} er kendt for sit {{screenTech}} og {{chip}} chip. Når uheldet er ude, reparerer vi hurtigt og professionelt – direkte på din adresse i {{cities}}. Vi kalibrerer før/efter, funktionstester og giver 24 mdr. garanti på skærme og 12 mdr. på batterier og øvrige dele. Vores teknikere har gennemført over 2.000 reparationer med 5-stjernede anmeldelser.",

  sections: {
    screen: "En ridset eller knust skærm påvirker både udseende og brug. Vi udskifter med original kalibreret del (pulled/testet) eller kompatibel A-kvalitet – du vælger efter behov og budget. Original bevarer typisk bedst farver/lysstyrke og touch-respons (True Tone/lyssensor hvor muligt). Vi bruger ESD-sikrede procedurer og tester alle funktioner efter montering. Tid: typisk 20–30 min inkl. test og kalibrering.",

    battery: "Mister din telefon strøm for hurtigt, eller slukker den uventet? Et nyt batteri giver mærkbar forbedring i både driftstid og ydeevne. Vi kalibrerer og funktionstester – og rådgiver om gode opladningsvaner, så batteriet holder længere. Vi hjælper dig med at undgå konstant 0-100% opladning, som kan skade batteriet. Garanti: 12 mdr. på alle batterier.", 
    camera: "Kamera (for/bag): Slørede billeder, fokusfejl eller pletter løses med udskiftning og test. Vi tester fokus, stabilisering og ansigts-/portræt-funktioner efter montering. Ladeport ({{usbType}}): Rensning eller udskiftning ved ladeproblemer/ustabil forbindelse. Mikrofon/højttaler: Lav lyd, støj eller ingenlyd – vi udskifter moduler og kvalitetstester samtale- og højttalervolumen. Biometrisk (Face ID/Touch ID): Vi fejlfinder; visse begrænsninger kan gælde på ældre modeller.",

    backGlass: "På modeller med glasbagside skifter vi bagglasset sikkert og rent, så din {{model}} ser ud som ny igen. Vi monterer nye tætningsklæber, men fabrikstæthed (IP) kan ikke garanteres efter åbning – det gælder alle værksteder.",

    pricing: "Priser som vist – inkl. moms, kalibrering og test. Ingen skjulte gebyrer. Varighed: de fleste reparationer tager 20–30 min på stedet. Fleksibel kvalitet: vælg mellem Original (kalibreret/pulled) og Kompatibel A-kvalitet. Vi kommer til dig – {{cities}}. Betaling: MobilePay/kort. Kvittering sendes på e-mail.",

    whyChoose: "Erfarne teknikere med over 2.000 gennemførte reparationer, gennemsigtige priser og dele i topkvalitet. Vi rådgiver ærligt om, hvad der bedst kan betale sig for netop din {{model}} – uanset om målet er topkvalitet eller laveste pris til en ældre enhed. Vi beskytter dine data og beder om tilladelse før evt. nulstilling.",

    contact: "Er du i tvivl? Ring på +45 93 54 54 57 – vi svarer typisk inden for 5 minutter. Vi tilbyder også erhvervsaftaler og kan komme ud til din arbejdsplads. Alle vores teknikere er certificerede og bruger kun kvalitetsgodkendte reservedele."

  }
};

export const modelSeoOverrides: Partial<Record<string, Partial<ModelSeoContent>>> = {
  'iphone-6': {
    year: "2014",
    chip: "A8",
    screenTech: "LCD Retina",
    supportsBackGlass: false,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-6-plus': {
    year: "2014",
    chip: "A8",
    screenTech: "LCD Retina",
    supportsBackGlass: false,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-6s': {
    year: "2015",
    chip: "A9",
    screenTech: "LCD Retina",
    supportsBackGlass: false,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-6s-plus': {
    year: "2015",
    chip: "A9",
    screenTech: "LCD Retina",
    supportsBackGlass: false,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-7': {
    year: "2016",
    chip: "A10 Fusion",
    screenTech: "LCD Retina",
    supportsBackGlass: false,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-7-plus': {
    year: "2016",
    chip: "A10 Fusion",
    screenTech: "LCD Retina",
    supportsBackGlass: false,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-8': {
    year: "2017",
    chip: "A11 Bionic", 
    screenTech: "LCD Retina",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-8-plus': {
    year: "2017",
    chip: "A11 Bionic",
    screenTech: "LCD Retina", 
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-x': {
    year: "2017",
    chip: "A11 Bionic",
    screenTech: "OLED",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-xs': {
    year: "2018",
    chip: "A12 Bionic",
    screenTech: "OLED",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-xs-max': {
    year: "2018",
    chip: "A12 Bionic",
    screenTech: "OLED",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-xr': {
    year: "2018",
    chip: "A12 Bionic",
    screenTech: "LCD Liquid Retina",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-11': {
    year: "2019",
    chip: "A13 Bionic",
    screenTech: "LCD Liquid Retina",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-11-pro': {
    year: "2019",
    chip: "A13 Bionic",
    screenTech: "OLED Super Retina XDR",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-11-pro-max': {
    year: "2019",
    chip: "A13 Bionic",
    screenTech: "OLED Super Retina XDR",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-12-mini': {
    year: "2020",
    chip: "A14 Bionic",
    screenTech: "OLED Super Retina XDR",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-12': {
    year: "2020",
    chip: "A14 Bionic",
    screenTech: "OLED Super Retina XDR",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-12-pro': {
    year: "2020",
    chip: "A14 Bionic",
    screenTech: "OLED Super Retina XDR",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-12-pro-max': {
    year: "2020",
    chip: "A14 Bionic",
    screenTech: "OLED Super Retina XDR",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-13-mini': {
    year: "2021",
    chip: "A15 Bionic",
    screenTech: "OLED Super Retina XDR",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-13': {
    year: "2021",
    chip: "A15 Bionic",
    screenTech: "OLED Super Retina XDR",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-13-pro': {
    year: "2021",
    chip: "A15 Bionic",
    screenTech: "OLED Super Retina XDR med ProMotion",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-13-pro-max': {
    year: "2021",
    chip: "A15 Bionic",
    screenTech: "OLED Super Retina XDR med ProMotion",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-14': {
    year: "2022",
    chip: "A15 Bionic",
    screenTech: "OLED Super Retina XDR",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-14-plus': {
    year: "2022",
    chip: "A15 Bionic",
    screenTech: "OLED Super Retina XDR",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-14-pro': {
    year: "2022",
    chip: "A16 Bionic",
    screenTech: "OLED Super Retina XDR med ProMotion",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-14-pro-max': {
    year: "2022",
    chip: "A16 Bionic",
    screenTech: "OLED Super Retina XDR med ProMotion",
    supportsBackGlass: true,
    usbType: "Lightning",
    cities: "København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn"
  },
  'iphone-15': {
    year: "2023",
    chip: "A16",
    screenTech: "OLED",
    supportsBackGlass: true,
    usbType: "USB-C",
    cities: "København, Frederiksberg, Amager, Lyngby, Hvidovre m.fl."
  },
  'iphone-15-plus': {
    year: "2023", 
    chip: "A16",
    screenTech: "OLED",
    supportsBackGlass: true,
    usbType: "USB-C",
    cities: "København, Frederiksberg, Amager, Lyngby, Hvidovre m.fl."
  },
  'iphone-15-pro': {
    year: "2023",
    chip: "A17 Pro", 
    screenTech: "OLED LTPO / ProMotion",
    supportsBackGlass: true,
    usbType: "USB-C",
    cities: "København, Frederiksberg, Amager, Lyngby, Hvidovre m.fl."
  },
  'iphone-15-pro-max': {
    year: "2023",
    chip: "A17 Pro",
    screenTech: "OLED LTPO / ProMotion", 
    supportsBackGlass: true,
    usbType: "USB-C",
    cities: "København, Frederiksberg, Amager, Lyngby, Hvidovre m.fl."
  },
  'iphone-16': {
    year: "2024",
    chip: "A18",
    screenTech: "OLED",
    supportsBackGlass: true,
    usbType: "USB-C",
    cities: "København, Frederiksberg, Amager, Lyngby, Hvidovre m.fl."
  },
  'iphone-16-plus': {
    year: "2024",
    chip: "A18", 
    screenTech: "OLED",
    supportsBackGlass: true,
    usbType: "USB-C",
    cities: "København, Frederiksberg, Amager, Lyngby, Hvidovre m.fl."
  },
  'iphone-16-pro': {
    year: "2024",
    chip: "A18 Pro",
    screenTech: "OLED LTPO / ProMotion",
    supportsBackGlass: true,
    usbType: "USB-C", 
    cities: "København, Frederiksberg, Amager, Lyngby, Hvidovre m.fl."
  },
  'iphone-16-pro-max': {
    year: "2024",
    chip: "A18 Pro",
    screenTech: "OLED LTPO / ProMotion",
    supportsBackGlass: true,
    usbType: "USB-C",
    cities: "København, Frederiksberg, Amager, Lyngby, Hvidovre m.fl."
  }
};

function replaceTokens(text: string, data: ModelSeoContent): string {
  return text
    .replace(/\{\{model\}\}/g, data.model)
    .replace(/\{\{year\}\}/g, data.year || '')
    .replace(/\{\{chip\}\}/g, data.chip || '')
    .replace(/\{\{screenTech\}\}/g, data.screenTech || 'skærm')
    .replace(/\{\{usbType\}\}/g, data.usbType)
    .replace(/\{\{cities\}\}/g, data.cities);
}

interface ModelDataInput {
  slug: string;
  model: string;
  hero?: {
    tags?: string[];
  };
}

export function getModelSeoContent(modelData: ModelDataInput): ModelSeoContent {
  const overrides = modelSeoOverrides[modelData.slug] || {};
  
  const baseContent = {
    model: modelData.model,
    year: modelData.hero?.tags?.find((tag: string) => /\d{4}/.test(tag)),
    chip: modelData.hero?.tags?.find((tag: string) => tag.includes('chip')),
    screenTech: modelData.hero?.tags?.find((tag: string) => tag.includes('Retina') || tag.includes('OLED') || tag.includes('ProMotion')),
    supportsBackGlass: modelData.hasBackGlass || false,
    ...defaultSeoContent,
    ...overrides
  };

  // Replace tokens in all text content
  const processedContent = {
    ...baseContent,
    intro: replaceTokens(baseContent.intro, baseContent),
    sections: {
      screen: replaceTokens(baseContent.sections.screen, baseContent),
      battery: replaceTokens(baseContent.sections.battery, baseContent),
      camera: replaceTokens(baseContent.sections.camera, baseContent),
      backGlass: baseContent.sections.backGlass ? replaceTokens(baseContent.sections.backGlass, baseContent) : undefined,
      pricing: replaceTokens(baseContent.sections.pricing, baseContent),
      whyChoose: replaceTokens(baseContent.sections.whyChoose, baseContent),
      contact: replaceTokens(baseContent.sections.contact, baseContent)
    }
  };

  return processedContent;
}
