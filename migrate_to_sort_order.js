const fs = require('fs');
const path = require('path');

const MODELS_DIR = path.join(process.cwd(), 'src', 'data', 'repairs');

function migrateSortOrder() {
  const brands = fs.readdirSync(MODELS_DIR);
  let totalMigrated = 0;

  for (const brand of brands) {
    const brandPath = path.join(MODELS_DIR, brand);
    if (!fs.statSync(brandPath).isDirectory()) continue;

    const files = fs.readdirSync(brandPath).filter(f => f.endsWith('.json'));

    files.forEach(file => {
      const filePath = path.join(brandPath, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Migrér: order → sort_order (reverse så højere tal = nyere/vigtigere)
      if (data.order !== undefined) {
        // Hvis order er 10, 20, 30... reverse det så:
        // order 10 (ældst) → sort_order 350
        // order 350 (nyest) → sort_order 10
        const maxOrder = 360;
        data.sort_order = maxOrder - data.order;
        delete data.order; // Fjern gammelt felt
        
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        totalMigrated++;
        
        if (totalMigrated <= 10) {
          console.log(`${brand}/${file}: order=${data.order || 'N/A'} → sort_order=${data.sort_order}`);
        }
      }
    });
  }

  console.log(`\n✅ Migreret ${totalMigrated} modeller til sort_order (højere tal = øverst)`);
}

migrateSortOrder();


