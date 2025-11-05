interface IphoneRepairsSeoSectionProps {
  cities: string[];
  hasOnsite: boolean;
  phone: string;
  coverageNote?: string;
  deviceType?: 'iPhone' | 'iPad' | 'Samsung Galaxy S' | 'Samsung Galaxy A' | 'Samsung Galaxy Z' | 'MacBook';
}

export default function IphoneRepairsSeoSection({ 
  cities, 
  hasOnsite, 
  phone, 
  coverageNote,
  deviceType = 'iPhone'
}: IphoneRepairsSeoSectionProps) {
  const citiesText = cities.join(', ');

  return (
    <section className="py-16 xl:py-20 bg-white">
      <div className="mx-auto max-w-5xl px-4 md:px-6 space-y-12">
        
        {/* Intro */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
            {deviceType} reparation – alle modeller, alle fejl
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-4">
            {deviceType === 'Samsung Galaxy S' || deviceType === 'Samsung Galaxy A' || deviceType === 'Samsung Galaxy Z'
              ? `Vi reparerer alle ${deviceType}-modeller – hurtigt, sikkert og gennemsigtigt. Vores teknikere kommer til din adresse i København, omegn og Nordsjælland, eller vi ordner den hos dig på arbejdet. Du får 24 mdr. garanti på skærme og 12 mdr. på batterier og øvrige dele.`
              : deviceType === 'iPhone'
              ? `iPhone 12 er kendt for sin OLED Super Retina XDR-skærm, A14 Bionic og Ceramic Shield på forsiden. Når uheldet er ude, reparerer vi hurtigt og professionelt – direkte på din adresse i København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn. Vi kalibrerer før/efter, laver funktionstests og giver 24 mdr. garanti på skærme og 12 mdr. på batterier og øvrige dele. Vores teknikere har gennemført over 2.000 reparationer med 5-stjernede anmeldelser.`
              : `Vi reparerer alle ${deviceType}-modeller – hurtigt, sikkert og gennemsigtigt. Vores teknikere kommer til din adresse i København, omegn og Nordsjælland, eller vi ordner den hos dig på arbejdet. 24 mdr. garanti på skærme og 12 mdr. på batterier og øvrige dele.`
            }
          </p>
          <p className="text-sm text-slate-500">
            Vi dækker {citiesText} {coverageNote}
          </p>
        </div>

        {/* Anchor Menu */}
        <div className="bg-gray-50 rounded-lg p-4">
          <nav className="flex flex-wrap justify-center gap-2 text-sm">
            <a href="#skaerm" className="text-pink-600 hover:text-pink-700 transition-colors">Skærm</a>
            <span className="text-gray-400">•</span>
            <a href="#batteri" className="text-pink-600 hover:text-pink-700 transition-colors">Batteri</a>
            <span className="text-gray-400">•</span>
            <a href="#knapper" className="text-pink-600 hover:text-pink-700 transition-colors">Knapper/lyde</a>
            <span className="text-gray-400">•</span>
            <a href="#hoejttaler" className="text-pink-600 hover:text-pink-700 transition-colors">Højttaler & mikrofon</a>
            <span className="text-gray-400">•</span>
            <a href="#opladning" className="text-pink-600 hover:text-pink-700 transition-colors">Opladning (ladeport)</a>
            <span className="text-gray-400">•</span>
            <a href="#kamera" className="text-pink-600 hover:text-pink-700 transition-colors">Kamera</a>
            <span className="text-gray-400">•</span>
            <a href="#bagcover" className="text-pink-600 hover:text-pink-700 transition-colors">Bagcover</a>
            <span className="text-gray-400">•</span>
            <a href="#software" className="text-pink-600 hover:text-pink-700 transition-colors">Software & data</a>
            <span className="text-gray-400">•</span>
            <a href="#diagnose" className="text-pink-600 hover:text-pink-700 transition-colors">Diagnose</a>
          </nav>
        </div>

        {/* Skærm Section */}
        <div id="skaerm" className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Skift af {deviceType} skærm – {deviceType} skærmskifte
            </h2>
            {deviceType === 'MacBook' ? (
              <>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Er skærmen revnet, har den misfarvninger/linjer, "staingate" (coating), bagbelysnings-glow eller døde pixels? Vi udskifter hele skærmmodulet (glas + LCD/Retina/mini-LED) på alle MacBook-modeller. Hvor muligt bevarer vi True Tone og farveprofil, og vi kalibrerer lysstyrke/toner, så resten af enheden matcher.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mt-3">
                  Vi arbejder ESD-sikkert, tester kamera, lyssensor og hængsler – og vi justerer "lid angle", så din MacBook føles som ny. "Staingate" og flimren løses med ny skærm; delamineret coating forsvinder med det samme.
                </p>
                <p className="text-slate-600 text-xs text-slate-500 mt-2">
                  <strong>Bemærk:</strong> På 14"/16" (2021→) kontrollerer vi local dimming/mini-LED zoner og opdaterer NVRAM, så True Tone kommer korrekt tilbage efter udskiftning.
                </p>
              </>
            ) : deviceType === 'iPhone' ? (
              <>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Er skærmen revnet, har den misfarvninger, døde pixels eller fejl på touch? Vi udskifter komplet OLED-skærmmodul (display + touch) på alle iPhone 12-varianter (inkl. 12 mini). Hvor muligt bevarer vi True Tone og farveprofil, og vi kalibrerer samt funktionstester efter montering. Vi arbejder ESD-sikkert og tester kamera, Face ID-lys/afstandssensor og højttaler – så din iPhone 12 føles som ny.
                </p>
                <p className="text-slate-600 text-xs text-slate-500 mt-2">
                  <strong>Tid:</strong> typisk 20–30 min. inkl. test og kalibrering.
                </p>
              </>
            ) : deviceType === 'Samsung Galaxy S' || deviceType === 'Samsung Galaxy A' ? (
              <>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Har skærmen fået et slag, revner eller døde pixels? Vi udskifter glas + AMOLED/Dynamic AMOLED-skæ rm på alle S-modeller. Med kvalitetsdele bevarer du korrekt farvegengivelse, lysstyrke og touch – så din telefon føles som ny igen.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mt-3">
                  Vi arbejder ESD-sikret, rengør enheden før/efter, funktionstester og kalibrerer. De fleste skærmskift klares på 20–30 min.
                </p>
              </>
            ) : deviceType === 'Samsung Galaxy Z' ? (
              <>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Har din foldbare skærm fået revrer, pixel-fejl, "lines", døde touch-felter eller beskadiget UTG (Ultra Thin Glass)? Vi udskifter inderskærm (main display) og yderskærm/cover-screen på alle Galaxy Z-modeller (Fold/Flip). Vi bruger kvalitetsgodkendte moduler, bevarer farveprofil, lysstyrke og touch-præcision – og kalibrerer, så oplevelsen matcher resten af enheden.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mt-3">
                  Ved inderskærm følger vi Samsungs procedure for beskyttelsesfilm (screen protector). Er den defekt, skifter vi den korrekt – aldrig med væske eller hårde værktæjer, så UTG ikke tager skade.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mt-3">
                  Hængslets foldefuge ("creasen") vil altid være synlig på foldbare skærme – også efter udskiftning. Reparations­tiden er typisk 60–90 min. pr. skærm afhængigt af model.
                </p>
                
                <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <h4 className="font-semibold text-slate-800 mb-2">Hvad med vandtæthed?</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Galaxy Z har officielt IPX8 (vandbeskyttelse, ikke støv). Efter åbning kan fabrikstæthed ikke garanteres – det gælder alle værkstæder. Vi monterer nye tætningsklæber, men anbefaler altid at undgå vand/sauna/pool efter reparation.
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Har skærmen fået et slag, revner eller døde pixels? Vi udskifter glas + skærmmodul på alle modeller. Ved originale/pulled skærme bevarer du korrekt farvegengivelse, lysstyrke og touch – og True Tone/lyssensor fungerer efter kalibrering, hvor det er muligt.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mt-3">
                  Vi arbejder med ESD-sikrede procedurer, klargør enheden før/efter og tester alle funktioner, så du kan bruge {deviceType === 'iPad' ? 'tabletten' : 'telefonen'} med det samme. Reparationen tager typisk 20–30 min pr. del.
                </p>
              </>
            )}
          </div>
          {deviceType !== 'Samsung Galaxy Z' && (
            <div className="bg-gray-50 rounded-lg border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900 mb-2">Hvad med vandtæthed?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {deviceType === 'MacBook'
                  ? 'MacBooks er ikke IP-klassificerede. Efter åbning lukker vi med nye klæbere/tætninger hvor relevant, men ingen værksteder kan garantere fabriks-"tæthed" på bærbare. Hold væske væk – især omkring tastatur/pegefelt.'
                  : (deviceType === 'Samsung Galaxy S' || deviceType === 'Samsung Galaxy A')
                  ? 'Vi monterer nye tætningsklæber, men fabrikstæthed (IP) kan ikke garanteres efter åbning – sådan er det hos alle værksteder.'
                  : 'Vi monterer nye tætningsklæber, men fabrikstæthed (IP) kan ikke garanteres efter åbning – det gælder alle værksteder.'}
              </p>
            </div>
          )}
        </div>

        {/* CTA Strip 1 */}
        <div className="bg-pink-50 rounded-lg border border-pink-200 p-4 text-center">
          <p className="text-sm text-pink-800 mb-2">
            Har du spørgsmål? Ring <a href={`tel:${phone}`} className="font-semibold hover:underline">{phone}</a> – vi svarer typisk inden for 5 min.
          </p>
        </div>

        {/* Batteri Section */}
        <div id="batteri" className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Nyt {deviceType} batteri
            </h2>
            {deviceType === 'MacBook' ? (
              <>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Mister din MacBook hurtigt strøm, slukker tilfældigt eller melder "Service anbefales"? Et nyt kvalitetsbatteri giver markant bedre driftstid og ydeevne. Vi bruger godkendte batterier, måler helbred/cycle-count, og klargør med korrekt klæb/indspænding, så kabinettet forbliver helt plant (ingen "battery swell").
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mt-3">
                  Batteriet kalibreres og funktionstestes – 12 mdr. garanti.
                </p>
              </>
            ) : deviceType === 'iPhone' ? (
              <>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Mister telefonen strøm for hurtigt, slukker tilfældigt eller viser lav helbredstilstand? Et nyt batteri giver mærkbar forbedring i både driftstid og ydeevne. Vi bruger kvalitetsgodkendte batterier, måler helbred/cycle-count og kalibrerer opladning/afladning for optimal ydeevne. Vi rådgiver også om gode vaner, så batteriet holder længere (undgå konstant 0–100 %).
                </p>
                <p className="text-slate-600 text-xs text-slate-500 mt-2">
                  <strong>Garanti:</strong> 12 mdr. på alle batterier.
                </p>
              </>
            ) : deviceType === 'Samsung Galaxy S' || deviceType === 'Samsung Galaxy A' ? (
              <>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Løber din Galaxy for hurtigt tør, eller slukker den uventet? Et nyt batteri giver markant bedre driftstid og ydeevne. Vi bruger kvalitetsgodkendte电池 batterier og tester/kalibrerer, så du får stabil kapacitet.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mt-3">
                  Vi rådgiver også om ladevaner, der forlænger levetiden (undgå konstant 0–100 %). 12 mdr. garanti.
                </p>
              </>
            ) : deviceType === 'Samsung Galaxy Z' ? (
              <>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Aflader din Fold/Flip hurtigt, slukker tilfældigt eller viser "moisture detected" uden grund? Et nyt kvalitetsbatteri giver markant bedre driftstid. Vi arbejder ESD-sikkert, udskifter pakninger, tester ladehastighed (kablet og trådlæs), temperatur og kapacitet.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mt-3">
                  Batterier kalibreres og funktionstestes – 12 mdr. garanti.
                </p>
              </>
            ) : (
              <>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Oplades din {deviceType} for ofte, eller dør den hurtigt? Et nyt batteri giver markant bedre driftstid og ydeevne. Vi bruger kvalitetsgodkendte batterier – originalt/pulled hvor muligt og A-kvalitet som prisvenligt alternativ. Batterier kalibreres og testes, og du får 12 mdr. garanti.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mt-3">
                  Vi hjælper dig også gerne med simple vaner, der forlænger levetiden (fx at undgå konstant 0–100 %).
                </p>
              </>
            )}
          </div>
          {deviceType === 'iPhone' && (
            <div className="bg-gray-50 rounded-lg border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900 mb-2">Note om "Ukendt/Brugt del"</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nogle {deviceType}s kan vise beskeden "Ukendt/Brugt del" efter batteriskift – det er kun info fra Apple og påvirker ikke funktionen eller garantien hos os.
              </p>
            </div>
          )}
        </div>

        {/* Knapper Section */}
        <div id="knapper" className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {deviceType} taster og knapper (lyd/volumen, power, mute)
            </h2>
            {deviceType === 'MacBook' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Klæbrige taster, ingen respons eller defekt power-knap/Touch ID? Vi starter med rens/justering og skifter kun dele, når det giver mening. På modeller hvor tastatur er integreret i topcase (bl.a. 2016–2020), udskifter vi topcase inkl. tastatur og batteri, når det er nødvendigt – du får skarp key-feel og stabil respons igen. Trackpad testes og balanceres for "ghost clicks".
              </p>
            ) : deviceType === 'iPhone' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Face ID/TrueDepth: Vi fejlfinder; visse begrænsninger kan gælde ved skader i kamera-systemet.
              </p>
            ) : deviceType === 'Samsung Galaxy S' || deviceType === 'Samsung Galaxy A' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Reagerer knapperne dårligt, eller sidder skyderen fast? Vi skifter flekskabler/knapmoduler og sikrer ren, præcis klik-respons. Ofte kan små fejl løses med rens – vi starter altid med den billigste, hurtigste løsning, hvis det giver mening.
              </p>
            ) : deviceType === 'Samsung Galaxy Z' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Vi renser og justerer først. Hjælper det ikke, udskifter vi defekte flexkabler/knapper. På Fold/Flip sidder fingeraftrækslæseren typisk i power-knappen; ved udskiftning tester vi fingerafttræks, klik-respons og sideknap-funktion, så alt igen føles skarpt og stabilt.
              </p>
            ) : (
              <p className="text-slate-600 text-sm leading-relaxed">
                Flekskabler/knapmoduler kan skiftes. Vi starter altid med rens/fejlsøgning når det giver mening – billigere og hurtigere hvis det løser fejlen.
              </p>
            )}
          </div>
          {deviceType !== 'Samsung Galaxy Z' && (
            <div className="bg-gray-50 rounded-lg border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900 mb-2">
                {deviceType === 'MacBook' ? 'Touch ID-begrænsninger (MacBook)' : (deviceType === 'Samsung Galaxy S' || deviceType === 'Samsung Galaxy A') ? 'Biometri-note' : 'Touch ID/Face ID begrænsninger'}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {deviceType === 'MacBook'
                  ? 'Touch ID-knappen er kryptografisk parret med logic board (T2/Secure Enclave). For at bevare fingeraftryk-funktionen genbruger vi typisk din originale Touch ID, eller udfører udskiftning på en måde, så Touch ID fortsat virker. Vi rådgiver altid om den bedste løsning for netop din model.'
                  : (deviceType === 'Samsung Galaxy S' || deviceType === 'Samsung Galaxy A')
                  ? 'På enkelte modeller kan fingeraftrykslæser/ansigtsgenkendelse påvirkes, hvis den defekte sensor er årsagen. Vi rådgiver, før vi foretager indgreb.'
                  : `På ældre ${deviceType === 'iPad' ? 'iPads' : 'iPhones'} kan Touch ID ikke genskabes hvis hjem-knap eller sensor er defekt; på nyere gælder samme for Face ID. Vi rådgiver inden indgreb.`
                }
              </p>
            </div>
          )}
        </div>

        {/* CTA Strip 2 */}
        <div className="bg-pink-50 rounded-lg border border-pink-200 p-4 text-center">
          <p className="text-sm text-pink-800 mb-2">
            Klar til at bestille? <button data-book-now className="font-semibold hover:underline cursor-pointer">Bestil tid</button> og vælg din reparation.
          </p>
        </div>

        {/* Højttaler Section */}
        <div id="hoejttaler" className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Højttaler og mikrofon
            </h2>
            {deviceType === 'MacBook' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Brummer, skratten eller meget lav mikrofon? Vi renser først skånsomt for støv/lommefnuller og tester kanaler. Hjælper rens ikke, skifter vi defekte højttalere samme dag inkl. funktions- og balance-test. Kendte "popping"-problemer på udvalgte serier løses med forbedrede enheder.
              </p>
            ) : deviceType === 'iPhone' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Mikrofon/højttaler: Lav lyd, støj eller ingen lyd – vi udskifter moduler og kvalitetstester samtale- og højttalervolumen.
              </p>
            ) : deviceType === 'Samsung Galaxy S' || deviceType === 'Samsung Galaxy A' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Lav eller forvrænget lyd – eller svært ved at blive hørt? I 9 ud af 10 tilfælde hjælper en professionel rens. Hjælper det ikke, udskifter vi defekte moduler samme dag – inkl. test af samtale- og mediehøjttaler.
              </p>
            ) : deviceType === 'Samsung Galaxy Z' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Støj, lav lyd eller "mild rasp"? Hinge-området samler let støv. Vi starter med skånsom rens og kanaltest (top/bund, øre-højttaler og mikrofoner). Hjælper det ikke, skifter vi moduler samme dag inkl. funktions- og balancetest.
              </p>
            ) : (
              <p className="text-slate-600 text-sm leading-relaxed">
                Lav lyd i samtaler eller dårlig musik? Vi renser først skånsomt. Hjælper det ikke, skifter vi defekte moduler samme dag inkl. test af samtale- og højttalervolumen.
              </p>
            )}
          </div>
          <div></div>
        </div>

        {/* Opladning Section */}
        <div id="opladning" className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Problemer med opladning – ladeport
            </h2>
            {deviceType === 'MacBook' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Skal stikket stå "helt rigtigt", før den oplader? Vi renser, retter pins og tester først. Hjælper det ikke, udskifter vi ladeporten (MagSafe 1/2, MagSafe 3 eller USB-C afhængigt af model). Vi tjekker også strømstyrke, batteri-kommunikation og data/video via USB-C, så både opladning og overførsel fungerer stabilt.
              </p>
            ) : deviceType === 'iPhone' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Ladeport (Lightning): Rensning eller udskiftning ved løse forbindelser, langsom opladning eller ingen ladning.
              </p>
            ) : deviceType === 'Samsung Galaxy S' || deviceType === 'Samsung Galaxy A' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Skal stikket sidde i en "helt rigtig" vinkel, eller lader den ikke? Ofte skyldes det støv/lommefnuller. Vi renser altid skånsomt først. Hjælper det ikke, udskifter vi ladeporten (USB-C/Lightning afhængigt af model) og funktionstester opladning, data og mikrofon.
              </p>
            ) : deviceType === 'Samsung Galaxy Z' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Får du fugt-advarsel eller ustabil opladning? Vi renser først og retter pins. Hjælper det ikke, udskifter vi USB-C-porten og tester strøm, data og video-udgang. Vi tjekker også trålæs opladning og batteri-kommunikation, så alt spiller igen.
              </p>
            ) : (
              <p className="text-slate-600 text-sm leading-relaxed">
                {deviceType === 'iPad' 
                  ? 'Kræver kablet "rigtig" vinkel? Ofte er det støv/lommefnuller. Vi starter med rens. Hjælper det ikke, udskifter vi ladeporten (Lightning/USB-C afhængigt af model) og tester opladning/data/mikrofon.'
                  : 'Skal kablet ligge i en "helt rigtig" vinkel, før den lader? Ofte skyldes det støv/lommefnuller i porten. Vi renser altid først skånsomt. Hjælper det ikke, udskifter vi ladeporten (Lightning/USB-C afhængigt af model). Inkl. funktionstest af opladning, data og mikrofon (som ofte deler modul).'}
              </p>
            )}
          </div>
          <div></div>
        </div>

        {/* Kamera Section */}
        <div id="kamera" className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Udskiftning af {deviceType} kamera (for/bag)
            </h2>
            {deviceType === 'MacBook' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Mørkt billede eller flimren i FaceTime/Teams? Vi udskifter FaceTime-kamera-modul eller flexkabel og tester eksponering, fokus og mikrofon-samspil. På nyere modeller verificerer vi også, at lys- og nærhedssensorer responderer korrekt.
              </p>
            ) : deviceType === 'iPhone' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Kamera (for/bag): Slørede billeder, fokusfejl eller pletter? Vi renser/udskifter, og tester stabilisering, fokus og portræt.
              </p>
            ) : deviceType === 'Samsung Galaxy S' || deviceType === 'Samsung Galaxy A' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Uskarpe billeder, ryst eller sort skærm i Kamera-appen? Vi udskifter front- og bagkameraer og tester fokus, stabilisering og portræt-/natfunktioner. Har modellen linsebeskyttelse/ramme, skifter vi den også, hvis den er sprunget – så du igen kan tage skarpe fotos.
              </p>
            ) : deviceType === 'Samsung Galaxy Z' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Uskarpe billeder, fokusjagt eller sort billede? Vi skifter front- og bagkamera efter besvær og kalibrerer fokus/stabilisering. På Fold-modeller tester vi også under-display-kameraet (UDC) på inderskærmen og sikrer ren, ensartet rendering. På Flip tjekker vi "hands-free/flex mode" kamera-funktioner.
              </p>
            ) : (
              <p className="text-slate-600 text-sm leading-relaxed">
                Uskarpe billeder eller sort skærm? Vi udskifter front- og bagkamera og tester fokus, stabilisering og portræt. Har modellen linsebeskyttelse/ramme, skifter vi den hvis sprunget.
              </p>
            )}
          </div>
          <div></div>
        </div>

        {/* CTA Strip 3 */}
        <div className="bg-pink-50 rounded-lg border border-pink-200 p-4 text-center">
          <p className="text-sm text-pink-800 mb-2">
            Har du spørgsmål? Ring <a href={`tel:${phone}`} className="font-semibold hover:underline">{phone}</a> – vi svarer typisk inden for 5 min.
          </p>
        </div>

        {/* Bagcover Section */}
        <div id="bagcover" className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Bagcover / bagglas
            </h2>
            {deviceType === 'iPhone' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                På iPhone 12 er bagglasset limet til rammen. Vi skifter bagglas sikkert og rent (laser/varme) – eller udskifter hele kabinettet ved kraftige skader. Vi monterer nye tætningsklæber og justerer MagSafe-ringen, så magnet og trådløs opladning fungerer korrekt. IP-tæthed kan ikke garanteres efter åbning.
              </p>
            ) : (
              <p className="text-slate-600 text-sm leading-relaxed">
                Bagcover og bagglas kan skiftes. Vi monterer nye tætningsklæber og sikrer korrekt montering.
              </p>
            )}
          </div>
          <div></div>
        </div>

        {/* Software Section */}
        <div id="software" className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Software, backup og datahjælp
            </h2>
            {deviceType === 'MacBook' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Brug for gendannelse, macOS-opdatering, brugeropsætning eller hjælp til Apple-ID/Time Machine? Vi hjælper med skånsom backup og software, så du ikke mister vigtige filer. Hvor muligt bevarer vi alle data – ellers spørger vi altid om tilladelse før indgreb.
              </p>
            ) : deviceType === 'iPhone' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Brug for gendannelse, opdatering eller hjælp til Apple-ID/backup? Vi hjælper, så du ikke mister vigtige billeder og kontakter. Hvor det er muligt, bevarer vi dine data – ellers spørger vi altid om tilladelse, før vi foretager indgreb.
              </p>
            ) : deviceType === 'Samsung Galaxy S' || deviceType === 'Samsung Galaxy A' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Brug for gendannelse, opdatering eller hjælp til Google-konto/backup? Vi hjælper, så du ikke mister vigtige billeder og kontakter. Hvor det er muligt, bevarer vi dine data – ellers spørger vi altid om tilladelse, før vi foretager indgreb.
              </p>
            ) : deviceType === 'Samsung Galaxy Z' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Brug for gendannelse, backup eller overførsel? Vi hjælper med Google-konto, Samsung-konto, opdateringer og fejlsøgning – altid med respekt for dine data. Hvor det er muligt bevarer vi alt indhold; ellers spørger vi altid om tilladelse før indgreb.
              </p>
            ) : (
              <p className="text-slate-600 text-sm leading-relaxed">
                Gendannelse, opdatering eller hjælp til Apple-ID/backup. Hvor muligt bevarer vi data – ellers spørger vi altid om tilladelse før indgreb.
              </p>
            )}
          </div>
          <div></div>
        </div>

        {/* Vandskade Section */}
        <div id="vandskade" className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Vandskade og fugt
            </h2>
            {deviceType === 'MacBook' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Ved væske: sluk, frakobl strøm – og kontakt os hurtigt. Vi afmonterer batteri, stopper korrosion og laver skånsom rens/ultralyd, før vi vurderer skader. Ikke alle vandskader kan reddes, men jo tidligere vi ser den, desto bedre chancer. Vi rådgiver ærligt om reparation vs. udskiftning.
              </p>
            ) : deviceType === 'iPhone' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Vandtæthed: Vi monterer nye tætningsklæber, men fabrikstæthed (IP) kan ikke garanteres efter åbning – det gælder alle værksteder.
              </p>
            ) : deviceType === 'Samsung Galaxy S' || deviceType === 'Samsung Galaxy A' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Vandskader kræver hurtig handling. Vi åbner enheden, afbryder strøm, renser for korrosion og vurderer skaderne. Ikke alle vandskader kan reddes, men jo hurtigere vi ser den, desto bedre er chancen. Vi rådgiver ærligt om reparation vs. udskiftning, så du ikke bruger penge unødigt.
              </p>
            ) : deviceType === 'Samsung Galaxy Z' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                Sluk enheden straks og lad den ikke oplade. Vi afmonterer batteri, renser for korrosion og evaluerer skaden. Ikke alle enheder kan reddes – men jo hurtigere vi ser den, desto bedre chancer. Vi rådgiver ærligt om reparation vs. udskiftning, så du ikke bruger penge unødigt. Smør aldrig hængslet med olie/væske – det forværrer skaden.
              </p>
            ) : (
              <p className="text-slate-600 text-sm leading-relaxed">
                Hurtig handling øger chancen for redning. Vi åbner, afbryder strøm, renser for korrosion og evaluerer. Vi rådgiver ærligt om reparation vs. udskiftning, så du ikke bruger penge unødigt.
              </p>
            )}
          </div>
          <div></div>
        </div>

        {/* Diagnose Section */}
        <div id="diagnose" className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Diagnose og fejlsøgning
            </h2>
            {deviceType === 'MacBook' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                I tvivl om fejlen? Vælg diagnose – vi tester systematisk, giver fast pris og et klart svar, før vi går i gang. Vælger du reparation hos os, modregner vi oftest diagnosegebyret.
              </p>
            ) : deviceType === 'iPhone' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                I tvivl om fejlen? Vælg diagnose – vi tester systematisk og giver et klart svar med fast pris, før vi går i gang. Vælger du reparation hos os, modregner vi oftest diagnosegebyret.
              </p>
            ) : deviceType === 'Samsung Galaxy S' || deviceType === 'Samsung Galaxy A' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                I tvivl om fejlen? Vælg diagnose – vi tester systematisk og giver et klart svar med fast pris, før vi går i gang. Vælger du reparation hos os, modregner vi oftest diagnosegebyret.
              </p>
            ) : deviceType === 'Samsung Galaxy Z' ? (
              <p className="text-slate-600 text-sm leading-relaxed">
                I tvivl om fejlen? Vælg diagnose – så tester vi systematisk skærme, sensorer, kamera, højtter/mikrofoner, knapper, batteri, opladning og hinge-mekanik. Du får et klart svar og en fast pris, før vi går i gang. Vælger du reparation hos os, modregner vi oftest diagnosegebyret.
              </p>
            ) : (
              <p className="text-slate-600 text-sm leading-relaxed">
                I tvivl om fejlen? Vælg diagnose – vi tester systematisk og giver fast pris, før vi går i gang. Vælger du reparation hos os, modregner vi oftest diagnosegebyret.
              </p>
            )}
          </div>
          <div></div>
        </div>

        {/* Priser og tider */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Priser og tider – hvad kan du forvente?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
            <div>
              <p><strong>Priser:</strong> Vises inkl. moms, kalibrering og test. Ingen skjulte gebyrer.</p>
              <p><strong>Varighed:</strong> De fleste reparationer tager 20–30 minutter på stedet.</p>
              <p><strong>Kvalitet:</strong> Vælg mellem Original kalibreret/pulled og Kompatibel A-kvalitet – vi rådgiver om det bedste valg til netop din iPhone 12 (eller 12 mini).</p>
            </div>
            <div>
              <p><strong>Vi kommer til dig:</strong> København, Frederiksberg, Hellerup, Lyngby, Gentofte, Valby, Amager, Nordsjælland og omegn.</p>
              <p><strong>Betaling:</strong> MobilePay/kort. Kvittering sendes på e-mail.</p>
            </div>
          </div>
        </div>

        {/* Hurtige Fakta */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Hurtige fakta</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
            <div>
              <p><strong>Reparationstid:</strong> {deviceType === 'MacBook' ? 'Typisk 1–2 timer pr. del (model og opgave afhænger); større reparationer efter aftale.' : deviceType === 'iPhone' ? 'De fleste reparationer tager 20–30 min på stedet.' : deviceType === 'Samsung Galaxy Z' ? 'Typisk 60–90 min. pr. del (model og opgave afhænger).' : 'Ofte 20–30 min. pr. del (model og opgave afhænger).'}</p>
              <p><strong>Garanti:</strong> 24 mdr. på skærme, 12 mdr. på batteri og øvrige dele.</p>
              <p><strong>Vi kommer til dig:</strong> Ja – {citiesText} {coverageNote}.</p>
            </div>
            <div>
              <p><strong>Betaling:</strong> MobilePay/kort. Kvittering og garantibevis medfølger.</p>
              <p><strong>Privatliv & data:</strong> Vi beskytter dine data{deviceType === 'MacBook' ? ' og beder om tilladelse før evt. adgang' : ' – og beder om tilladelse før evt. nulstilling'}.</p>
            </div>
          </div>
        </div>

        {/* Hvorfor vælge FrontDoorFix */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Hvorfor vælge FrontDoorFix?</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Erfarne teknikere med over 2.000 gennemførte reparationer, gennemsigtige priser og dele i topkvalitet. Vi rådgiver ærligt om, hvad der bedst kan betale sig for netop din iPhone 12 – uanset om målet er topkvalitet eller laveste pris til en ældre enhed. Vi beskytter dine data og beder om tilladelse før evt. nulstilling.
          </p>
        </div>

        {/* Tvivl */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Tvivl?</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Er du i tvivl? Ring på +45 93 54 54 57 – vi svarer typisk inden for 5 minutter. Vi tilbyder også erhvervsaftaler og kan komme ud til din arbejdsplads. Alle vores teknikere er certificerede og bruger kvalitetsgodkendte reservedele.
          </p>
        </div>

        {/* Final CTA */}
        <div className="bg-pink-50 rounded-lg border border-pink-200 p-4 text-center">
          <p className="text-sm text-pink-800 mb-2">
            Har du spørgsmål? Ring <a href={`tel:${phone}`} className="font-semibold hover:underline">{phone}</a> – vi svarer typisk inden for 5 min.
          </p>
        </div>

        {/* SEO Afslutning */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Originale dele, gennemsigtige priser, ærlig rådgivning
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed max-w-3xl mx-auto">
            {deviceType === 'iPhone' 
              ? 'Erfarne teknikere med over 2.000 gennemførte reparationer, gennemsigtige priser og dele i topkvalitet. Vi rådgiver ærligt om, hvad der bedst kan betale sig for netop din iPhone 12 – uanset om målet er topkvalitet eller laveste pris til en ældre enhed. Vi beskytter dine data og beder om tilladelse før evt. nulstilling.'
              : 'Vi anbefaler altid den løsning, der giver mest mening for din model, alder og brug – uanset om det er original/pulled, A-kvalitet eller slet ikke en reparation. Målet er, at du føler dig tryg før, under og efter – uden skjulte gebyrer.'
            }
          </p>
        </div>

      </div>
    </section>
  );
}
