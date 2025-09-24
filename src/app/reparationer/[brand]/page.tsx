import Link from "next/link";

const brandToModels: Record<string, string[]> = {
  apple: [
    "iPhone 16 Pro Max",
    "iPhone 16 Pro",
    "iPhone 16",
    "iPhone 15 Pro Max",
    "iPhone 15 Pro",
    "iPhone 15",
    "iPhone 14 Pro Max",
    "iPhone 14 Pro",
    "iPhone 14",
    "iPhone 13 Pro Max",
    "iPhone 13 Pro",
    "iPhone 13",
    "iPhone 12",
    "iPhone 11",
  ],
  samsung: [
    "Galaxy S24 Ultra",
    "Galaxy S24+",
    "Galaxy S24",
    "Galaxy S23 Ultra",
    "Galaxy S23",
    "Galaxy A55",
    "Galaxy A35",
    "Galaxy A15",
  ],
  google: ["Pixel 9 Pro XL", "Pixel 9", "Pixel 8a", "Pixel 8", "Pixel 6a"],
  oneplus: ["OnePlus 12", "OnePlus 12R", "Nord 4", "Nord 2T"],
  huawei: ["P30 Pro", "P20 Pro", "Mate 20 Pro", "P Smart 2019"],
  motorola: ["Moto G Power", "Moto G Stylus", "Moto Edge"],
};

export function generateStaticParams() {
  return Object.keys(brandToModels).map((brand) => ({ brand }));
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const models = brandToModels[brand?.toLowerCase()] ?? [];
  const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold mb-6">{brandName} modeller</h1>
      {models.length === 0 ? (
        <p>Ingen modeller fundet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {models.map((m) => (
            <Link key={m} href={`/reparationer/${brand}/${encodeURIComponent(m)}`} className="border rounded p-4 hover:shadow bg-white/40">
              {m}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}


