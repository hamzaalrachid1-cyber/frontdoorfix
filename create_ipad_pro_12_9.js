const fs = require('fs');
const path = require('path');

const MODELS_DIR = path.join(process.cwd(), 'src', 'data', 'repairs', 'apple');

const iPadPro12_9Models = [
  {
    model: "iPad Pro 12,9″ (2022)",
    slug: "ipad-pro-12-9-2022",
    year: 2022,
    sort_order: 360,
    image: "/images/ipads/ipad-pro-12-9-2022.png"
  },
  {
    model: "iPad Pro 12,9″ (2021)",
    slug: "ipad-pro-12-9-2021",
    year: 2021,
    sort_order: 355,
    image: "/images/ipads/ipad-pro-12-9-2021.png"
  },
  {
    model: "iPad Pro 12,9″ (2020)",
    slug: "ipad-pro-12-9-2020",
    year: 2020,
    sort_order: 350,
    image: "/images/ipads/ipad-pro-12-9-2020.png"
  },
  {
    model: "iPad Pro 12,9″ (2018)",
    slug: "ipad-pro-12-9-2018",
    year: 2018,
    sort_order: 345,
    image: "/images/ipads/ipad-pro-12-9-2018.png"
  }
];

function createModels() {
  iPadPro12_9Models.forEach(modelData => {
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

  console.log('\n🎉 Alle iPad Pro 12,9" modeller oprettet!');
}

createModels();


