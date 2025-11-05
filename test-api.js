const fs = require('fs');
const path = require('path');

const SERIES_DIR = path.join(process.cwd(), 'src', 'data', 'series');

async function getAllActiveSeries() {
  const series = [];
  
  if (!fs.existsSync(SERIES_DIR)) {
    console.log('Series directory does not exist:', SERIES_DIR);
    return series;
  }

  const brands = fs.readdirSync(SERIES_DIR);
  console.log('Found brands:', brands);
  
  for (const brand of brands) {
    const brandPath = path.join(SERIES_DIR, brand);
    if (fs.statSync(brandPath).isDirectory()) {
      const files = fs.readdirSync(brandPath).filter(file => file.endsWith('.json'));
      console.log(`Files in ${brand}:`, files);
      
      for (const file of files) {
        try {
          const filePath = path.join(brandPath, file);
          const seriesData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          
          if (seriesData.isActive !== false) {
            series.push({
              id: seriesData.id || file.replace('.json', ''),
              brandId: seriesData.brandId,
              name: seriesData.name,
              slug: seriesData.slug,
              descriptionShort: seriesData.descriptionShort || '',
              icon: seriesData.icon || '',
              sortOrder: seriesData.sortOrder || 999
            });
          }
        } catch (error) {
          console.error(`Error reading series file ${brand}/${file}:`, error);
        }
      }
    }
  }
  
  return series;
}

getAllActiveSeries().then(series => {
  console.log('Found series:', JSON.stringify(series, null, 2));
}).catch(error => {
  console.error('Error:', error);
});

