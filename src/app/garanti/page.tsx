export const metadata = {
  title: "Garanti | Frontdoorfix",
  description: "Garanti: 24 måneder på skærmreparationer og 12 måneder på batterier.",
};

export default function Garanti() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold mb-4">Garanti</h1>
      <p className="mb-4">Vi står inde for vores arbejde.</p>
      <ul className="list-disc ml-6 space-y-2">
        <li>24 måneders garanti på skærmreparationer.</li>
        <li>12 måneders garanti på batterireparationer.</li>
        <li>Garantien dækker fabrikationsfejl, ikke fysisk skade eller væskeskade.</li>
      </ul>
    </main>
  );
}


