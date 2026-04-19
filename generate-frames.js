const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

async function generate() {
  console.log('Starting frame generation...');
  
  const startPath = path.join(__dirname, 'public', 'coffee', 'start.png');
  const endPath = path.join(__dirname, 'public', 'coffee', 'end.png');
  
  if (!fs.existsSync(startPath) || !fs.existsSync(endPath)) {
    console.error('Source images not found at:', { startPath, endPath });
    process.exit(1);
  }

  const startImg = await loadImage(startPath);
  const endImg = await loadImage(endPath);
  
  const width = startImg.width;
  const height = startImg.height;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  const framesDir = path.join(__dirname, 'public', 'frames');
  if (!fs.existsSync(framesDir)) {
    fs.mkdirSync(framesDir, { recursive: true });
  }

  for (let i = 0; i < 120; i++) {
    const progress = i / 119;
    
    // Smooth out the progress with an ease-in-out quint function for premium feel
    const easeProgress = progress < 0.5 
      ? 16 * progress * progress * progress * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 5) / 2;

    ctx.clearRect(0, 0, width, height);
    
    // Background layer (Start)
    ctx.globalAlpha = 1 - easeProgress;
    ctx.drawImage(startImg, 0, 0);
    
    // Foreground layer (End)
    ctx.globalAlpha = easeProgress;
    ctx.drawImage(endImg, 0, 0);
    
    const frameNum = (i + 1).toString().padStart(3, '0');
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(framesDir, `frame-${frameNum}.png`), buffer);
    
    if ((i + 1) % 10 === 0) {
      console.log(`Generated frame ${i + 1}/120`);
    }
  }
  
  console.log('Successfully generated 120 frames in public/frames/');
}

generate().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});
