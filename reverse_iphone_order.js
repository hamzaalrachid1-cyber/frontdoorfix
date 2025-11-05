const fs = require('fs');
const path = require('path');

const MODELS_DIR = path.join(process.cwd(), 'src', 'data', 'repairs', 'apple');

// Rækkefølge: ÆLDSTE FØRST (lavest nummer), NYESTE SIDST (højest nummer)
const correctOrder = [
  // iPhone 6 Series (2014) - LAVEST NUMMER
  'iphone-6',
  'iphone-6-plus',
  
  // iPhone 6s Series (2015)
  'iphone-6s',
  'iphone-6s-plus',
  
  // iPhone 7 Series (2016)
  'iphone-7',
  'iphone-7-plus',
  
  // iPhone 8 Series (2017)
  'iphone-8',
  'iphone-8-plus',
  
  // iPhone X (2017)
  'iphone-x',
  
  // iPhone XS/XR Series (2018)
  'iphone-xr',
  'iphone-xs',
  'iphone-xs-max',
  
  // iPhone 11 Series (2019)
  'iphone-11',
  'iphone-11-pro',
  'iphone-11-pro-max',
  
  // iPhone 12 Series (2020)
  'iphone-12',
  'iphone-12-mini',
  'iphone-12-pro',
  'iphone-12-pro-max',
  
  // iPhone 13 Series (2021)
  'iphone-13',
  'iphone-13-mini',
  'iphone-13-pro',
  'iphone-13-pro-max',
  
  // iPhone 14 Series (2022)
  'iphone-14',
  'iphone-14-plus',
  'iphone-14-pro',
  'iphone-14-pro-max',
  
  // iPhone 15 Series (2023)
  'iphone-15',
  'iphone-15-plus',
  'iphone-15-pro',
  'iphone-15-pro-max',
  
  // iPhone 16 Series (2024) - HØJEST NUMMER
  'iphone-16',
  'iphone-16-plus',
  'iphone-16-pro',
  'iphone-16-pro-max'
];

function reverseOrder() {
  correctOrder.forEach((slug, index) => {
    const filename = `${slug}.json`;
    const filePath = path.join(MODELS_DIR, filename);

    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      data.order = (index + 1) * 10;
      data.brand = 'apple';
      data.series = 'iphone';

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`${slug}: order=${data.order}`);
    }
  });

  console.log('\n✅ iPhone 6 = 10, iPhone 16 Pro Max = 340');
}

reverseOrder();


