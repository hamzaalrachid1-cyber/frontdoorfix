const fs = require('fs');
const path = require('path');

const MODELS_DIR = path.join(process.cwd(), 'src', 'data', 'repairs', 'apple');

// Define sortOrder for each model (higher = appears first)
const sortOrders = {
  // iPad Pro 12,9" (newest first)
  'ipad-pro-12-9-2022': 363,
  'ipad-pro-12-9-2021': 362,
  'ipad-pro-12-9-2020': 361,
  'ipad-pro-12-9-2018': 358,
  'ipad-pro-12-9-2017': 355,
  'ipad-pro-12-9-2015': 352,
  
  // iPad Pro 11" (newest first)
  'ipad-pro-11-2022': 360,
  'ipad-pro-11-2021': 357,
  'ipad-pro-11-2020': 354,
  'ipad-pro-11-2018': 351,
  
  // iPad Air (newest first)
  'ipad-air-6': 350,
  'ipad-air-5': 345,
  'ipad-air-4': 340,
  'ipad-air-3': 335,
  'ipad-air-2': 330,
  
  // iPad mini (newest first)
  'ipad-mini-7': 350,
  'ipad-mini-6': 345,
  'ipad-mini-5': 340,
  'ipad-mini-4': 335,
  'ipad-mini-3': 330,
  'ipad-mini-2': 325,
  'ipad-mini-1': 320,
  
  // iPad (gen) (newest first)
  'ipad-11': 350,
  'ipad-10': 345,
  'ipad-9': 340,
  'ipad-8': 335,
  'ipad-7': 330,
  'ipad-6': 325,
  'ipad-5': 320
};

function fixSortOrders() {
  let fixed = 0;
  
  for (const [slug, correctSortOrder] of Object.entries(sortOrders)) {
    const filePath = path.join(MODELS_DIR, `${slug}.json`);
    
    if (fs.existsSync(filePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        if (data.sort_order !== correctSortOrder) {
          const oldValue = data.sort_order;
          data.sort_order = correctSortOrder;
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
          console.log(`✅ Fixed ${slug}: ${oldValue} → ${correctSortOrder}`);
          fixed++;
        }
      } catch (error) {
        console.error(`❌ Error fixing ${slug}:`, error.message);
      }
    }
  }
  
  console.log(`\n✅ Fixed ${fixed} files`);
}

fixSortOrders();


