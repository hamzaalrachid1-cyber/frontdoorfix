const fs = require('fs');
const path = require('path');

const MODELS_DIR = path.join(process.cwd(), 'src', 'data', 'repairs', 'apple');

const iPadFamilies = {
  // iPad (basis) - nyeste først
  'ipad-11': { family: 'ipad', sort_index: 350 },
  'ipad-10': { family: 'ipad', sort_index: 345 },
  'ipad-9': { family: 'ipad', sort_index: 340 },
  'ipad-8': { family: 'ipad', sort_index: 335 },
  'ipad-7': { family: 'ipad', sort_index: 330 },
  'ipad-6': { family: 'ipad', sort_index: 325 },
  'ipad-5': { family: 'ipad', sort_index: 320 },
  
  // iPad mini - nyeste først
  'ipad-mini-7': { family: 'ipad_mini', sort_index: 350 },
  'ipad-mini-6': { family: 'ipad_mini', sort_index: 345 },
  'ipad-mini-5': { family: 'ipad_mini', sort_index: 340 },
  'ipad-mini-4': { family: 'ipad_mini', sort_index: 335 },
  'ipad-mini-3': { family: 'ipad_mini', sort_index: 330 },
  'ipad-mini-2': { family: 'ipad_mini', sort_index: 325 },
  'ipad-mini-1': { family: 'ipad_mini', sort_index: 320 },
  
  // iPad Air - nyeste først
  'ipad-air-6': { family: 'ipad_air', sort_index: 350 },
  'ipad-air-5': { family: 'ipad_air', sort_index: 345 },
  'ipad-air-4': { family: 'ipad_air', sort_index: 340 },
  'ipad-air-3': { family: 'ipad_air', sort_index: 335 },
  'ipad-air-2': { family: 'ipad_air', sort_index: 330 },
  'iPad Air 3 (2019)': { family: 'ipad_air', sort_index: 336 },
  'iPad Air': { family: 'ipad_air', sort_index: 325 },
  
  // iPad Pro - nyeste først
  'ipad-pro-11-2022': { family: 'ipad_pro', sort_index: 360 },
  'ipad-pro-11-2021': { family: 'ipad_pro', sort_index: 355 },
  'ipad-pro-11-2020': { family: 'ipad_pro', sort_index: 350 },
  'ipad-pro-11-2018': { family: 'ipad_pro', sort_index: 345 },
  'iPad Pro 12.9″ 2020 (4. gen.)': { family: 'ipad_pro', sort_index: 340 },
  'iPad Pro 12.9″ 2018 (3. gen.)': { family: 'ipad_pro', sort_index: 335 },
  'iPad Pro 12.9″ 2017 (2. gen.)': { family: 'ipad_pro', sort_index: 330 },
  'iPad Pro 12.9″ 2015 (1. gen.)': { family: 'ipad_pro', sort_index: 325 },
  'iPad Pro 10.5″ 2017': { family: 'ipad_pro', sort_index: 328 },
  'iPad Pro 9.7″ 2016': { family: 'ipad_pro', sort_index: 320 }
};

function addFamilyToiPads() {
  const files = fs.readdirSync(MODELS_DIR).filter(f => f.endsWith('.json') && (f.startsWith('ipad-') || f.startsWith('iPad')));

  files.forEach(file => {
    const filePath = path.join(MODELS_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    const slug = file.replace('.json', '');
    const familyData = iPadFamilies[slug];

    if (familyData) {
      data.brand = 'apple';
      data.series = 'ipad';
      data.family = familyData.family;
      data.sort_index = familyData.sort_index;
      
      // Fjern gammelt order/sort_order felt
      delete data.order;
      if (data.sort_order) {
        delete data.sort_order;
      }
      
      // Sæt image hvis det mangler
      if (!data.image) {
        const imageSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
        data.image = `/images/ipads/${imageSlug}.png`;
      }
      
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`${slug}: family=${data.family}, sort_index=${data.sort_index}`);
    } else {
      console.log(`⚠️  ${slug}: IKKE I LISTEN - skal tilføjes manuelt`);
    }
  });

  console.log('\n✅ iPad family og sort_index sat!');
}

addFamilyToiPads();


