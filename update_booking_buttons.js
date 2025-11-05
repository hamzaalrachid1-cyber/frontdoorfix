const fs = require('fs');
const path = require('path');

// Function to update booking buttons in a file
function updateBookingButtons(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace "Se priser & reparationer" buttons with proper booking buttons
    content = content.replace(
      /<button className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-full text-white bg-pink-500 hover:bg-pink-600 transition-colors duration-200 shadow-md">\s*Se priser & reparationer\s*<\/button>/g,
      `<button 
                    data-book-now
                    data-brand="OnePlus"
                    data-model={model.name}
                    className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-full text-white bg-pink-500 hover:bg-pink-600 transition-colors duration-200 shadow-md">
                    Se priser & reparationer
                  </button>`
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated booking buttons in: ${filePath}`);
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
  }
}

// Function to update specific brand buttons
function updateBrandButtons(filePath, brand) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace buttons with proper brand-specific booking buttons
    content = content.replace(
      /<button className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-full text-white bg-pink-500 hover:bg-pink-600 transition-colors duration-200 shadow-md">\s*Se priser & reparationer\s*<\/button>/g,
      `<button 
                    data-book-now
                    data-brand="${brand}"
                    data-model={model.name}
                    className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-full text-white bg-pink-500 hover:bg-pink-600 transition-colors duration-200 shadow-md">
                    Se priser & reparationer
                  </button>`
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${brand} booking buttons in: ${filePath}`);
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
  }
}

// List of files to update with their respective brands
const filesToUpdate = [
  // OnePlus
  { path: '/Users/hamza/frontdoorfix/src/app/reparationer/oneplus/nord/page.tsx', brand: 'OnePlus' },
  { path: '/Users/hamza/frontdoorfix/src/app/reparationer/oneplus/oneplus-pro/page.tsx', brand: 'OnePlus' },
  
  // Huawei
  { path: '/Users/hamza/frontdoorfix/src/app/reparationer/huawei/p-serien/page.tsx', brand: 'Huawei' },
  { path: '/Users/hamza/frontdoorfix/src/app/reparationer/huawei/mate-serien/page.tsx', brand: 'Huawei' },
  
  // Motorola
  { path: '/Users/hamza/frontdoorfix/src/app/reparationer/motorola/edge/page.tsx', brand: 'Motorola' },
  { path: '/Users/hamza/frontdoorfix/src/app/reparationer/motorola/g/page.tsx', brand: 'Motorola' },
  
  // Google Pixel
  { path: '/Users/hamza/frontdoorfix/src/app/reparationer/pixel/pixel/page.tsx', brand: 'Google' },
  
  // PlayStation
  { path: '/Users/hamza/frontdoorfix/src/app/reparationer/playstation/ps4/page.tsx', brand: 'PlayStation' },
  { path: '/Users/hamza/frontdoorfix/src/app/reparationer/playstation/ps5/page.tsx', brand: 'PlayStation' },
  { path: '/Users/hamza/frontdoorfix/src/app/reparationer/playstation/controller/page.tsx', brand: 'PlayStation' },
  
  // Computer
  { path: '/Users/hamza/frontdoorfix/src/app/reparationer/computer/macbook/page.tsx', brand: 'Apple' },
  { path: '/Users/hamza/frontdoorfix/src/app/reparationer/computer/imac/page.tsx', brand: 'Apple' },
  { path: '/Users/hamza/frontdoorfix/src/app/reparationer/computer/windows-baerbar/page.tsx', brand: 'Windows' },
  { path: '/Users/hamza/frontdoorfix/src/app/reparationer/computer/stationaer-pc/page.tsx', brand: 'Windows' }
];

// Update all files
filesToUpdate.forEach(({ path: filePath, brand }) => {
  updateBrandButtons(filePath, brand);
});

console.log('All booking buttons updated successfully!');

