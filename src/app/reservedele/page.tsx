import type { Metadata } from "next";
import PartsQualitySection from "@/components/parts/PartsQualitySection";
import UsageByPlatform from "@/components/parts/UsageByPlatform";
import PartsFAQ from "@/components/parts/PartsFAQ";

export const metadata: Metadata = {
  title: "Reservedele & Kvalitet | Frontdoorfix",
  description: "Læs om vores reservedele-kvalitet: Original (kalibreret/pulled), Original (ny) og Kompatibel. Vi rådgiver om det bedste valg til din enhed og budget.",
  keywords: "reservedele, original dele, kompatible dele, iPhone reparation, Android reparation, kvalitet, garanti",
  openGraph: {
    title: "Reservedele & Kvalitet | Frontdoorfix",
    description: "Læs om vores reservedele-kvalitet og få hjælp til at vælge det rigtige til din enhed.",
    type: "website",
    locale: "da_DK",
  },
};

export default function ReservedelePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-12 bg-gradient-to-r from-pink-50 to-yellow-50">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Reservedele & Kvalitet
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Forstå forskellen mellem vores kvalitetstyper og vælg det rigtige til din enhed og budget.
          </p>
        </div>
      </section>

      {/* Components */}
      <PartsQualitySection />
      <UsageByPlatform />
      <PartsFAQ />
    </div>
  );
}
