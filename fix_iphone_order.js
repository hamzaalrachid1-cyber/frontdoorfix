const fs = require('fs');
const path = require('path');

const MODELS_DIR = path.join(process.cwd(), 'src', 'data', 'repairs', 'apple');

// Defineret rækkefølge præcis som på hjemmesiden
const correctOrder = [
  // iPhone 16 Series (2024) - FØRST
  'iphone-16-pro-max',
  'iphone-16-pro',
  'iphone-16-plus',
  'iphone-16',
  
  // iPhone 15 Series (2023)
  'iphone-15-pro-max',
  'iphone-15-pro',
  'iphone-15-plus',
  'iphone-15',
  
  // iPhone 14 Series (2022)
  'iphone-14-pro-max',
  'iphone-14-pro',
  'iphone-14-plus',
  'iphone-14',
  
  // iPhone 13 Series (2021)
  'iphone-13-pro-max',
  'iphone-13-pro',
  'iphone-13-mini',
  'iphone-13',
  
  // iPhone 12 Series (2020)
  'iphone-12-pro-max',
  'iphone-12-pro',
  'iphone-12-mini',
  'iphone-12',
  
  // iPhone 11 Series (2019)
  'iphone-11-pro-max',
  'iphone-11-pro',
  'iphone-11',
  
  // iPhone XS/XR Series (2018)
  'iphone-xs-max',
  'iphone-xs',
  'iphone-xr',
  
  // iPhone X (2017)
  'iphone-x',
  
  // iPhone 8 Series (2017)
  'iphone-8-plus',
  'iphone-8',
  
  // iPhone 7 Series (2016)
  'iphone-7-plus',
  'iphone-7',
  
  // iPhone 6s Series (2015)
  'iphone-6s-plus',
  'iphone-6s',
  
  // iPhone 6 Series (2014) - SIDST
  'iphone-6-plus',
  'iphone-6'
];

function fixiPhoneOrder() {
  const files = fs.readdirSync(MODELS_DIR).filter(f => f.endsWith('.json') && f.startsWith('iphone-'));

  correctOrder.forEach((slug, index) => {
    const filename = `${slug}.json`;
    const filePath = path.join(MODELS_DIR, filename);

    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      data.order = (index + 1) * 10;
      data.brand = 'apple';
      data.series = 'iphone';

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`${slug}: order=${data.order} (${data.year || 'N/A'} - ${data.model})`);
    } else {
      console.log(`⚠️  ${slug}: FIL FINDES IKKE`);
    }
  });

  console.log('\n✅ iPhone rækkefølge fixet - præcis som hjemmeside!');
}

fixiPhoneOrder();


