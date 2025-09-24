import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "iPhone Reparation - Alle Modeller | Frontdoorfix",
  description: "Vi reparerer alle iPhone modeller fra iPhone 6 til iPhone 16 Pro Max. Skærmreparation, batteriskift, kamera og mere med 24 måneders garanti. Vi kommer til dig i København.",
  keywords: "iPhone reparation, skærmreparation iPhone, batteriskift iPhone, iPhone 16, iPhone 15, iPhone 14, iPhone 13, iPhone 12, iPhone 11, iPhone X, iPhone 8, iPhone 7, iPhone 6, København",
  openGraph: {
    title: "iPhone Reparation - Alle Modeller | Frontdoorfix",
    description: "Vi reparerer alle iPhone modeller fra iPhone 6 til iPhone 16 Pro Max. Skærmreparation, batteriskift, kamera og mere med 24 måneders garanti.",
    type: "website",
    locale: "da_DK",
  },
};

export default function AppleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
