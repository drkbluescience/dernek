// Simple script to create placeholder SVG icons
// This creates SVG icons that browsers can use as PNG alternatives

const fs = require('fs');
const path = require('path');

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, '../public/icons');

// Create a simple colored square as placeholder
function createPlaceholderIcon(size) {
  const canvas = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#8B5CF6"/>
    <circle cx="${size/2}" cy="${size/2}" r="${size/3}" fill="#7C3AED"/>
    <text x="${size/2}" y="${size/2 + size/8}" font-family="Arial" font-size="${size/8}" font-weight="bold" fill="white" text-anchor="middle">ZSU</text>
  </svg>`;
  
  return canvas;
}

// Generate placeholder icons
iconSizes.forEach(size => {
  const iconContent = createPlaceholderIcon(size);
  const filename = `icon-${size}x${size}.png`;
  const svgFilename = `icon-${size}x${size}.svg`;
  const filepath = path.join(iconsDir, svgFilename);
  
  fs.writeFileSync(filepath, iconContent);
  console.log(`Generated ${svgFilename}`);
});

console.log('Icon generation complete!');
console.log('Note: These are SVG files with PNG names in manifest. Modern browsers support this.');
