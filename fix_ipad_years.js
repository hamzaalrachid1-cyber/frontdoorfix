const fs = require('fs');
const path = require('path');

const MODELS_DIR = path.join(process.cwd(), 'src', 'data', 'repairs', 'apple');

// Map of slug to correct year
const correctYears = {
  // iPad Pro 11"
  'ipad-pro-11-2022': 2022,
  'ipad-pro-11-2021': 2021,
  'ipad-pro-11-2020': 2020,
  'ipad-pro-11-2018': 2018,
  
  // iPad Air
  'ipad-air-6': 2024,
  'ipad-air-5': 2022,
  'ipad-air-4': 2020,
  'ipad-air-3': 2019,
  'ipad-air-2': 2014,
  
  // iPad mini
  'ipad-mini-7': 2023,
  'ipad-mini-6': 2021,
  'ipad-mini-5': 2019,
  'ipad-mini-4': 2015,
  'ipad-mini-3': 2014,
  'ipad-mini-2': 2013,
  'ipad-mini-1': 2012,
  
  // iPad (gen)
  'ipad-11': 2023,
  'ipad-10': 2022,
  'ipad-9': 2021,
  'ipad-8': 2020,
  'ipad-7': 2019,
  'ipad-6': 2018,
  'ipad-5': 2017
};

function fixYears() {
  let fixed = 0;
  
  for (const [slug, correctYear] of Object.entries(correctYears)) {
    const filePath = path.join(MODELS_DIR, `${slug}.json`);
    
    if (fs.existsSync(filePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        if (data.year !== correctYear) {
          data.year = correctYear;
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
          console.log(`✅ Fixed ${slug}: ${data.year || 'undefined'} → ${correctYear}`);
          fixed++;
        }
      } catch (error) {
        console.error(`❌ Error fixing ${slug}:`, error.message);
      }
    }
  }
  
  console.log(`\n✅ Fixed ${fixed} files`);
}

fixYears();


