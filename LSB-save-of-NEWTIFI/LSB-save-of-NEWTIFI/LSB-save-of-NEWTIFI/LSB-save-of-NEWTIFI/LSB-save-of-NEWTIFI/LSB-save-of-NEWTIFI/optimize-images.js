import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize(800, 800, { // Resize to reasonable dimensions
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ 
        quality: 80, // Good quality but reduced file size
        progressive: true // Progressive loading
      })
      .toFile(outputPath);
    
    console.log(`Successfully optimized ${inputPath} to ${outputPath}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
}

// Optimize images for Delphine Filsack
const images = [
  {
    input: 'public/assets/images/team/delphine-filsack.jpg',
    output: 'public/assets/images/team/delphine-filsack-optimized.jpg'
  },
  {
    input: 'public/assets/images/team/delphine-filsack-large.jpg',
    output: 'public/assets/images/team/delphine-filsack-large-optimized.jpg'
  }
];

async function optimizeAll() {
  for (const image of images) {
    await optimizeImage(image.input, image.output);
  }
}

optimizeAll(); 