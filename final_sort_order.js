const fs = require('fs');
const path = require('path');

const MODELS_DIR = path.join(process.cwd(), 'src', 'data', 'repairs', 'apple');

// iPhone rækkefølge med 5-tals intervaller
// Højere tal = ØVERST (iPhone 16 Pro Max først)
const iPhoneSortOrder = {
  // iPhone 16 Series (2024) - HØJESTE TAL
  'iphone-16-pro-max': 340,
  'iphone-16-pro': 335,
  'iphone-16-plus': 330,
  'iphone-16': 325,
  
  // iPhone 15 Series (2023)
  'iphone-15-pro-max': 320,
  'iphone-15-pro': 315,
  'iphone-15-plus': 310,
  'iphone-15': 305,
  
  // iPhone 14 Series (2022)
  'iphone-14-pro-max': 300,
  'iphone-14-pro': 295,
  'iphone-14-plus': 290,
  'iphone-14': 285,
  
  // iPhone 13 Series (2021)
  'iphone-13-pro-max': 280,
  'iphone-13-pro': 275,
  'iphone-13-mini': 270,
  'iphone-13': 265,
  
  // iPhone 12 Series (2020)
  'iphone-12-pro-max': 260,
  'iphone-12-pro': 255,
  'iphone-12-mini': 250,
  'iphone-12': 245,
  
  // iPhone 11 Series (2019)
  'iphone-11-pro-max': 240,
  'iphone-11-pro': 235,
  'iphone-11': 230,
  
  // iPhone XS/XR Series (2018)
  'iphone-xs-max': 225,
  'iphone-xs': 220,
  'iphone-xr': 215,
  
  // iPhone X (2017)
  'iphone-x': 210,
  
  // iPhone 8 Series (2017)
  'iphone-8-plus': 205,
  'iphone-8': 200,
  
  // iPhone 7 Series (2016)
  'iphone-7-plus': 195,
  'iphone-7': 190,
  
  // iPhone 6s Series (2015)
  'iphone-6s-plus': 185,
  'iphone-6s': 180,
  
  // iPhone 6 Series (2014) - LAVESTE TAL
  'iphone-6-plus': 15,
  'iphone-6': 10
};

function setFinalSortOrder() {
  for (const slug in iPhoneSortOrder) {
    const sortOrder = iPhoneSortOrder[slug];
    const filename = `${slug}.json`;
    const filePath = path.join(MODELS_DIR, filename);

    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      data.sort_order = sortOrder;
      data.brand = 'apple';
      data.series = 'iphone';

      // Fjern gammelt order felt hvis det findes
      if (data.order) delete data.order;

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`${slug}: sort_order=${sortOrder}`);
    }
  }

  console.log('\n✅ iPhone sort_order sat med 5-tals intervaller!');
  console.log('📱 iPhone 16 Pro Max = 340 (ØVERST)');
  console.log('📱 iPhone 6 = 10 (NEDERST)');
  console.log('💡 Nu kan du tilføje iPhone 17 med sort_order=345!');
}

setFinalSortOrder();


