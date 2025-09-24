export const metadata = {
  title: "Kontakt | Frontdoorfix",
  description: "Kontakt Frontdoorfix i København. Adresse, åbningstider og formular.",
};

export default function Kontakt() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold mb-4">Kontakt os</h1>
      <p className="mb-6">Vi holder til i København, Danmark.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-4 border rounded bg-white/40">
          <h2 className="font-semibold mb-2">Butik</h2>
          <p>
            Frontdoorfix
            <br /> København, Danmark
          </p>
          <p className="mt-2 text-sm text-gray-600">Telefon: (indsæt senere)</p>
          <p className="text-sm text-gray-600">E-mail: (indsæt senere)</p>
        </div>
        <form className="p-4 border rounded bg-white/40">
          <h2 className="font-semibold mb-2">Skriv til os</h2>
          <label className="block text-sm mb-1">Navn</label>
          <input className="w-full border rounded p-2 mb-3" placeholder="Dit navn" />
          <label className="block text-sm mb-1">Email</label>
          <input className="w-full border rounded p-2 mb-3" placeholder="din@email.dk" />
          <label className="block text-sm mb-1">Besked</label>
          <textarea className="w-full border rounded p-2 mb-3" rows={4} placeholder="Hvordan kan vi hjælpe?" />
          <button className="px-4 py-2 rounded btn-gradient">Send</button>
        </form>
      </div>
    </main>
  );
}


