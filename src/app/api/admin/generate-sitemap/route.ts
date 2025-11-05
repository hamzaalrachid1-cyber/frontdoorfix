import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SITEMAP_FILE = path.join(process.cwd(), 'public', 'sitemap.xml');

export async function POST() {
  try {
    // Read SEO settings to get canonical base URL
    const seoSettingsFile = path.join(process.cwd(), 'src', 'data', 'seo-settings.json');
    let baseUrl = 'https://frontdoorfix.dk';
    
    if (fs.existsSync(seoSettingsFile)) {
      const seoSettings = JSON.parse(fs.readFileSync(seoSettingsFile, 'utf8'));
      baseUrl = seoSettings.technical?.canonicalBaseUrl || baseUrl;
    }

    // Read all models to include in sitemap
    const modelsDir = path.join(process.cwd(), 'src', 'data', 'repairs');
    const models: string[] = [];

    if (fs.existsSync(modelsDir)) {
      const brands = fs.readdirSync(modelsDir);
      
      for (const brand of brands) {
        const brandPath = path.join(modelsDir, brand);
        if (fs.statSync(brandPath).isDirectory()) {
          const modelFiles = fs.readdirSync(brandPath).filter(file => file.endsWith('.json'));
          
          for (const modelFile of modelFiles) {
            try {
              const modelPath = path.join(brandPath, modelFile);
              const modelData = JSON.parse(fs.readFileSync(modelPath, 'utf8'));
              
              if (modelData.slug && !modelData.comingSoon) {
                models.push(`/reparationer/${brand}/${modelData.slug}`);
              }
            } catch (error) {
              console.error(`Error reading model file ${modelFile}:`, error);
            }
          }
        }
      }
    }

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/reparationer</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/reparationer/apple</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/reparationer/apple/iphone</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/reparationer/apple/ipad</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/reparationer/samsung</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/reparationer/samsung/s</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/reparationer/samsung/a</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/kontakt</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/erhverv</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
${models.map(model => `  <url>
    <loc>${baseUrl}${model}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

    // Ensure public directory exists
    const publicDir = path.dirname(SITEMAP_FILE);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write sitemap to public directory
    fs.writeFileSync(SITEMAP_FILE, sitemap);

    return NextResponse.json({ 
      success: true, 
      message: 'Sitemap generated successfully',
      urlCount: models.length + 8, // 8 static pages + models
      sitemapUrl: `${baseUrl}/sitemap.xml`
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

