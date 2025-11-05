export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export const DEFAULT_FAQS: FAQItem[] = [
  {
    question: "Hvor lang tid tager en reparation?",
    answer: "De fleste reparationer tager 20–30 minutter på din adresse. Softwareopgaver tager typisk 15–45 minutter, og væske-/vandskader 30–60 minutter."
  },
  {
    question: "Mister jeg data under reparationen?",
    answer: "Nej. Vi sletter ikke dine data, og vi behøver ikke at se dit indhold. Lav gerne en backup for en sikkerheds skyld."
  },
  {
    question: "Hvilken garanti får jeg?",
    answer: "Skærm: 24 mdr. • Batteri & øvrige dele: 12 mdr. (Væske-/vandskader er undtaget garanti.)"
  },
  {
    question: "Dækker I mit område?",
    answer: "Ja, vi kører i København og omegn. Er du i tvivl, så kontakt os – vi finder en løsning."
  },
  {
    question: "Hvilke reservedele bruger I?",
    answer: "iPhone: Original (kalibreret/pulled) eller Kompatibel (A-kvalitet). Android (Samsung, Huawei, OnePlus m.fl.): Originale servicepacks (nye)."
  },
  {
    question: "Er prisen inkl. alt?",
    answer: "Ja – moms, reservedele, montering, test og funktionskontrol. Ingen skjulte gebyrer."
  },
  {
    question: "Hvordan betaler jeg?",
    answer: "Kort eller MobilePay. Kvittering sendes på e-mail."
  },
  {
    question: "Hvad hvis problemet vender tilbage?",
    answer: "Skriv eller ring – vi laver et gratis eftertjek. Er det en garantisag, udbedrer vi uden beregning."
  }
];
