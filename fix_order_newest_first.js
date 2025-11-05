const fs = require('fs');
const path = require('path');

const MODELS_DIR = path.join(process.cwd(), 'src', 'data', 'repairs');

function fixModelOrders() {
  const brands = fs.readdirSync(MODELS_DIR);

  for (const brand of brands) {
    const brandPath = path.join(MODELS_DIR, brand);
    if (!fs.statSync(brandPath).isDirectory()) continue;

    const modelsBySeries = {};
    const files = fs.readdirSync(brandPath).filter(f => f.endsWith('.json'));

    files.forEach(file => {
      const filePath = path.join(brandPath, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const series = data.series || (brand === 'apple' ? 'iphone' : 's');

      if (!modelsBySeries[series]) {
        modelsBySeries[series] = [];
      }

      modelsBySeries[series].push({ file, data });
    });

    // Sort and renumber each series
    for (const series in modelsBySeries) {
      const models = modelsBySeries[series];

      // Sort by year DESC (NYESTE FØRST), then by name
      models.sort((a, b) => {
        const yearA = a.data.year || 2020;
        const yearB = b.data.year || 2020;
        
        if (yearB !== yearA) {
          return yearB - yearA; // NYESTE FØRST
        }
        return a.data.model.localeCompare(b.data.model);
      });

      // Assign order numbers (10, 20, 30, etc.)
      models.forEach((item, index) => {
        item.data.order = (index + 1) * 10;
        
        const filePath = path.join(brandPath, item.file);
        fs.writeFileSync(filePath, JSON.stringify(item.data, null, 2), 'utf8');
        
        if (index < 3) { // Show first 3 per series
          console.log(`${brand}/${series}: #${(index+1)*10} = ${item.data.year || 'N/A'} ${item.data.model}`);
        }
      });
      
      console.log(`  ... ${models.length} modeller i ${brand}/${series}\n`);
    }
  }

  console.log('✅ Alle modeller sorteret NYESTE FØRST!');
}

fixModelOrders();


