const fs = require('fs');
const { createCanvas } = require('canvas');

// Create a 32x32 canvas
const size = 32;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// Create gradient
const gradient = ctx.createLinearGradient(0, 0, size, size);
gradient.addColorStop(0, '#EC4899'); // pink
gradient.addColorStop(1, '#EAB308'); // yellow

// Draw circle background
ctx.fillStyle = gradient;
ctx.beginPath();
ctx.arc(size/2, size/2, size/2 - 2, 0, 2 * Math.PI);
ctx.fill();

// Draw white F
ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';
ctx.lineWidth = 3;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// F letter
ctx.beginPath();
ctx.moveTo(8, 8);
ctx.lineTo(8, 24);
ctx.moveTo(8, 8);
ctx.lineTo(20, 8);
ctx.moveTo(8, 16);
ctx.lineTo(18, 16);
ctx.stroke();

// Save as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('public/favicon.png', buffer);
console.log('Favicon created!');
