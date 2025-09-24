import Link from "next/link";

const brands = [
  { slug: "apple", name: "Apple" },
  { slug: "samsung", name: "Samsung" },
  { slug: "google", name: "Google" },
  { slug: "oneplus", name: "OnePlus" },
  { slug: "huawei", name: "Huawei" },
  { slug: "motorola", name: "Motorola" },
];

export const metadata = {
  title: "Reparationer | Frontdoorfix",
  description: "Vælg mærke for at se modeller og reparationer (uden priser).",
};

export default function Reparationer() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold mb-6">Reparationer</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {brands.map((b) => (
          <Link key={b.slug} href={`/reparationer/${b.slug}`} className="border rounded p-4 text-center hover:shadow bg-white/40">
            {b.name}
          </Link>
        ))}
      </div>
    </main>
  );
}


