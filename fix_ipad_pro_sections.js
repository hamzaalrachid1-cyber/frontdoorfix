const fs = require('fs');
const path = require('path');

const MODELS_DIR = path.join(process.cwd(), 'src', 'data', 'repairs', 'apple');

// iPad Pro 12,9" skal have HØJERE tal end iPad Pro 11"
// så 12,9" sektionen kommer FØRST
const sortOrders = {
  // iPad Pro 12,9" (400-500 range)
  'ipad-pro-12-9-2022': 425,
  'ipad-pro-12-9-2021': 420,
  'ipad-pro-12-9-2020': 415,
  'ipad-pro-12-9-2018': 410,
  'ipad-pro-12-9-2017': 405,
  'ipad-pro-12-9-2015': 400,
  
  // iPad Pro 11" (360-399 range)
  'ipad-pro-11-2022': 395,
  'ipad-pro-11-2021': 390,
  'ipad-pro-11-2020': 385,
  'ipad-pro-11-2018': 380,
  
  // iPad Air (350-379 range)
  'ipad-air-6': 375,
  'ipad-air-5': 370,
  'ipad-air-4': 365,
  'ipad-air-3': 360,
  'ipad-air-2': 355,
  
  // iPad mini (320-349 range)
  'ipad-mini-7': 345,
  'ipad-mini-6': 340,
  'ipad-mini-5': 335,
  'ipad-mini-4': 330,
  'ipad-mini-3': 325,
  'ipad-mini-2': 320,
  'ipad-mini-1': 315,
  
  // iPad (gen) (280-314 range)
  'ipad-11': 310,
  'ipad-10': 305,
  'ipad-9': 300,
  'ipad-8': 295,
  'ipad-7': 290,
  'ipad-6': 285,
  'ipad-5': 280
};

function fixSortOrders() {
  let fixed = 0;
  
  for (const [slug, correctSortOrder] of Object.entries(sortOrders)) {
    const filePath = path.join(MODELS_DIR, `${slug}.json`);
    
    if (fs.existsSync(filePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        const oldValue = data.sort_order;
        data.sort_order = correctSortOrder;
        data.updated_at = new Date().toISOString();
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`✅ ${slug}: ${oldValue} → ${correctSortOrder}`);
        fixed++;
      } catch (error) {
        console.error(`❌ Error fixing ${slug}:`, error.message);
      }
    }
  }
  
  console.log(`\n✅ Fixed ${fixed} files - Sektioner matcher nu hjemmesiden!`);
}

fixSortOrders();


