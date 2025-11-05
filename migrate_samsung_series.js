const fs = require('fs');
const path = require('path');

const MODELS_DIR = path.join(__dirname, 'src', 'data', 'repairs');

// Helper function to determine series from model name
function getSeriesFromModelName(modelName) {
  const name = modelName.toLowerCase();
  
  if (name.includes('galaxy s')) return 's';
  if (name.includes('galaxy a')) return 'a';
  if (name.includes('galaxy z')) return 'z';
  if (name.includes('galaxy fe')) return 'fe';
  if (name.includes('galaxy note')) return 'note';
  
  return 's'; // default fallback
}

// Migrate Samsung models
function migrateSamsungModels() {
  const samsungDir = path.join(MODELS_DIR, 'samsung');
  
  if (!fs.existsSync(samsungDir)) {
    console.log('Samsung directory not found');
    return;
  }
  
  const files = fs.readdirSync(samsungDir).filter(file => file.endsWith('.json'));
  
  console.log(`Found ${files.length} Samsung model files`);
  
  for (const file of files) {
    const filePath = path.join(samsungDir, file);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const modelData = JSON.parse(content);
      
      // Skip if series is already set correctly
      if (modelData.series && modelData.series !== 's') {
        console.log(`Skipping ${file} - already has series: ${modelData.series}`);
        continue;
      }
      
      // Determine correct series
      const correctSeries = getSeriesFromModelName(modelData.model);
      
      // Update the model data
      modelData.series = correctSeries;
      modelData.brand = 'samsung'; // Ensure consistent brand naming
      
      // Write back to file
      fs.writeFileSync(filePath, JSON.stringify(modelData, null, 2), 'utf8');
      
      console.log(`Updated ${file}: ${modelData.model} -> series: ${correctSeries}`);
      
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
  
  console.log('Migration completed!');
}

// Run migration
migrateSamsungModels();

