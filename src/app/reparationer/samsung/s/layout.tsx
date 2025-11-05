import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Samsung Galaxy S Reparation | Skærm, batteri m.m. – Frontdoorfix",
  description: "Vi reparerer Samsung Galaxy S med originale dele og 24 måneders garanti. Skærmskift, batteriskift, kamera og mere. Vi kommer til dig i København.",
  keywords: "Samsung Galaxy S reparation, skærmskift Samsung, batteriskift Samsung, Samsung reparation København",
  openGraph: {
    title: "Samsung Galaxy S Reparation | Frontdoorfix",
    description: "Vi reparerer Samsung Galaxy S med originale dele og 24 måneders garanti.",
    type: "website",
    locale: "da_DK",
  },
};

export default function SamsungModelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
