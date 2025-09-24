export default async function ModelPage({ params }: { params: Promise<{ brand: string; model: string }> }) {
  const { brand, model } = await params;
  const decodedModel = decodeURIComponent(model);
  const services = [
    "Skærmskift",
    "Batteriskift",
    "Ladeport",
    "Bagglas",
    "Kamera",
    "Mikrofon/Højtaler",
    "Vand- & fejlsøgning",
    "Software/IDrive (dataoverførsel)",
  ];

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold mb-2">{decodedModel}</h1>
      <p className="text-gray-600 mb-6 capitalize">{brand}</p>

      <h2 className="text-xl font-semibold mb-3">Reparationer (uden pris)</h2>
      <ul className="space-y-2">
        {services.map((s) => (
          <li key={s} className="border rounded p-3 flex items-center justify-between bg-white/40">
            <span>{s}</span>
            <button className="px-3 py-1 rounded btn-gradient">Vælg</button>
          </li>
        ))}
      </ul>
    </main>
  );
}


