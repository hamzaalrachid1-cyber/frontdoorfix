const fs = require('fs');
const path = require('path');

const MODELS_DIR = path.join(process.cwd(), 'src', 'data', 'repairs', 'apple');

const missingModels = [
  {
    model: "iPad Pro 12,9″ (2017)",
    slug: "ipad-pro-12-9-2017",
    year: 2017,
    sort_order: 340,
    image: "/images/ipads/ipad-pro-12-9-2017.png"
  },
  {
    model: "iPad Pro 12,9″ (2015)",
    slug: "ipad-pro-12-9-2015",
    year: 2015,
    sort_order: 335,
    image: "/images/ipads/ipad-pro-12-9-2015.png"
  }
];

function createModels() {
  missingModels.forEach(modelData => {
    const filePath = path.join(MODELS_DIR, `${modelData.slug}.json`);
    
    const data = {
      brand: "apple",
      series: "ipad",
      family: "ipadpro",
      model: modelData.model,
      slug: modelData.slug,
      year: modelData.year,
      sort_order: modelData.sort_order,
      isVisible: true,
      comingSoon: false,
      image: modelData.image,
      hero: {
        title: `${modelData.model} Reparation`,
        tags: []
      },
      repairs: []
    };

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ Oprettet: ${modelData.model} (sort_order: ${modelData.sort_order})`);
  });

  console.log('\n🎉 Alle manglende iPad Pro 12,9" modeller oprettet!');
}

createModels();


