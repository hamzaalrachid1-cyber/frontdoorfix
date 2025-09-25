// Let me create a proper accordion structure
const faqItems = [
  {
    id: 1,
    question: "Hvor lang tid tager en iPhone 6 reparation?",
    answer: "De fleste reparationer klares på <strong>20–30 min</strong> på din adresse. Skærm tager typisk 15–25 min, batteri 15–20 min."
  },
  {
    id: 2,
    question: "Mister jeg data ved reparationen?",
    answer: "Nej, standardreparationer bevarer dine data. Vi anbefaler dog altid backup for en sikkerheds skyld."
  },
  {
    id: 3,
    question: "Kan Touch ID genskabes på iPhone 6?",
    answer: "Nej. Ved skift af hjem-knap kan Touch ID ikke genskabes på iPhone 6. Knappen virker stadig til klik."
  },
  {
    id: 4,
    question: "Hvilke dele og hvilken garanti får jeg?",
    answer: "Originale/A-kvalitetsdele. <strong>24 mdr. garanti på skærme</strong> og <strong>12 mdr. på batteri og øvrige dele</strong>."
  },
  {
    id: 5,
    question: "Kommer I ud til min adresse?",
    answer: "Ja, vi kører i Storkøbenhavn og reparerer på stedet. Udrykning er gratis i vores område."
  },
  {
    id: 6,
    question: "Hvad hvis fejlen er ukendt?",
    answer: "Vi laver en hurtig diagnose først. Kan den repareres, fortsætter vi efter aftalt pris."
  },
  {
    id: 7,
    question: "Giver I garanti ved væskeskader?",
    answer: "Vi kan rense og forsøge at redde enheden, men der er ingen garanti på væskeskader."
  },
  {
    id: 8,
    question: "Hvordan betaler jeg?",
    answer: "MobilePay/kort. Du får kvittering og garanti på mail."
  }
];

let faqHTML = '';
faqItems.forEach((item, index) => {
  faqHTML += `
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <button className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-inset hover:bg-gray-100 transition-colors" aria-expanded="false" aria-controls="faq-answer-${item.id}">
                <h3 className="text-lg font-semibold text-gray-800">
                  ${item.question}
                </h3>
                <svg className="w-5 h-5 text-gray-500 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="px-6 pb-4 hidden" id="faq-answer-${item.id}">
                <div className="text-gray-600 space-y-3">
                  <p className="text-gray-600" dangerouslySetInnerHTML={{__html: '${item.answer}'}}></p>
                </div>
              </div>
            </div>`;
});

console.log(faqHTML);
