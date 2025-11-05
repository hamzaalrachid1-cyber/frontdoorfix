import { ModelSeoContent } from '@/content/models';

interface ModelSeoCopyProps {
  seoContent: ModelSeoContent;
}

export default function ModelSeoCopy({ seoContent }: ModelSeoCopyProps) {
  return (
    <section id="seo-copy" aria-labelledby="seo-copy-title" className="py-16 xl:py-20 bg-gray-50">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <h2 id="seo-copy-title" className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
            Om {seoContent.model} reparation – hurtigt, sikkert og gennemsigtigt
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Intro */}
          <div>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              {seoContent.intro}
            </p>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Ny skærm til {seoContent.model}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {seoContent.sections.screen}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Nyt batteri til {seoContent.model}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {seoContent.sections.battery}
              </p>
            </div>
          </div>

          {/* Right Column - Sections */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Kamera, porte og lyd
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {seoContent.sections.camera}
              </p>
            </div>

            {seoContent.supportsBackGlass && seoContent.sections.backGlass && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Bagcover / bagglas
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {seoContent.sections.backGlass}
                </p>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Priser og tider – hvad kan du forvente?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {seoContent.sections.pricing}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Hvorfor vælge FrontDoorFix?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {seoContent.sections.whyChoose}
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
              <p className="text-slate-600 text-sm leading-relaxed">
                {seoContent.sections.contact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
