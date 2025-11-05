import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apple Reparation - iPhone & iPad | Frontdoorfix",
  description: "Vi reparerer alle Apple enheder: iPhone 6-16 Pro Max og iPad (alle modeller). Skærmreparation, batteriskift, kamera og mere med 24 måneders garanti. Vi kommer til dig i København.",
  keywords: "Apple reparation, iPhone reparation, iPad reparation, skærmreparation iPhone, skærmreparation iPad, batteriskift iPhone, batteriskift iPad, iPhone 16, iPhone 15, iPhone 14, iPhone 13, iPhone 12, iPhone 11, iPhone X, iPhone 8, iPhone 7, iPhone 6, iPad Air, iPad mini, iPad Pro, København",
  openGraph: {
    title: "Apple Reparation - iPhone & iPad | Frontdoorfix",
    description: "Vi reparerer alle Apple enheder: iPhone 6-16 Pro Max og iPad (alle modeller). Skærmreparation, batteriskift, kamera og mere med 24 måneders garanti.",
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
