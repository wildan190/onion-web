#!/usr/bin/env node
/**
 * Image Optimization Script
 * Generates optimized WebP versions of JPEG/PNG images
 * Usage: node scripts/optimize-images.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, '../public/assets/img');
const homeDir = path.join(assetsDir, 'home');

// Image optimization configurations
const imageConfigs = {
  'emblem.png': {
    sizes: [40, 72],
    formats: ['webp'],
    quality: 95,
  },
  'home/img1.jpeg': {
    sizes: [500, 1000],
    formats: ['webp'],
    quality: 85,
  },
  'home/img2.jpeg': {
    sizes: [600, 1200],
    formats: ['webp'],
    quality: 85,
  },
  'home/img3.jpeg': {
    sizes: [800, 1600],
    formats: ['webp'],
    quality: 85,
  },
  'home/img4.jpeg': {
    sizes: [800, 1600],
    formats: ['webp'],
    quality: 85,
  },
  'home/img5.jpeg': {
    sizes: [800, 1600],
    formats: ['webp'],
    quality: 85,
  },
  'home/img6.jpeg': {
    sizes: [720, 1440],
    formats: ['webp'],
    quality: 80,
  },
  'home/img7.jpeg': {
    sizes: [720, 1440],
    formats: ['webp'],
    quality: 80,
  },
  'home/img8.jpeg': {
    sizes: [720, 1440],
    formats: ['webp'],
    quality: 80,
  },
};

async function optimizeImage(inputPath, config) {
  const inputFile = path.join(assetsDir, inputPath);
  
  if (!fs.existsSync(inputFile)) {
    console.warn(`⚠️  File not found: ${inputFile}`);
    return;
  }

  const ext = path.extname(inputFile);
  const basename = path.basename(inputFile, ext);
  const dirname = path.dirname(inputFile);

  try {
    for (const format of config.formats) {
      for (const size of config.sizes) {
        const outputFilename = `${basename}-${size}w.${format}`;
        const outputPath = path.join(dirname, outputFilename);

        const image = sharp(inputFile);
        const metadata = await image.metadata();
        
        // Calculate height maintaining aspect ratio
        const aspectRatio = metadata.height / metadata.width;
        const newHeight = Math.round(size * aspectRatio);

        if (format === 'webp') {
          await image
            .resize(size, newHeight, { fit: 'contain', withoutEnlargement: true })
            .webp({ quality: config.quality })
            .toFile(outputPath);
        }

        console.log(`✅ Generated: ${outputFilename} (${size}px)`);
      }
    }
  } catch (error) {
    console.error(`❌ Error processing ${inputPath}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');

  for (const [imagePath, config] of Object.entries(imageConfigs)) {
    await optimizeImage(imagePath, config);
  }

  console.log('\n✨ Image optimization complete!');
  console.log('💡 Tip: Use the optimized images with <picture> element:\n');
  console.log(`<picture>
  <source srcset="/assets/img/home/img6-720w.webp" media="(max-width: 768px)" type="image/webp">
  <source srcset="/assets/img/home/img6-1440w.webp" type="image/webp">
  <img src="/assets/img/home/img6.jpeg" alt="..." loading="lazy">
</picture>`);
}

main().catch(console.error);
