
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceImage = process.argv[2];
const publicDir = path.resolve(__dirname, '../public'); // Adjust based on script location

if (!sourceImage) {
    console.error('Please provide the source image path.');
    process.exit(1);
}

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

async function generate() {
    try {
        const image = sharp(sourceImage);
        const metadata = await image.metadata();
        console.log(`Source image size: ${metadata.width}x${metadata.height}`);

        // Generate pwa-192x192.png
        await image
            .resize(192, 192)
            .toFile(path.join(publicDir, 'pwa-192x192.png'));
        console.log('Generated pwa-192x192.png');

        // Generate pwa-512x512.png
        await image
            .resize(512, 512)
            .toFile(path.join(publicDir, 'pwa-512x512.png'));
        console.log('Generated pwa-512x512.png');

        // Generate apple-touch-icon.png (180x180 usually)
        await image
            .resize(180, 180)
            .toFile(path.join(publicDir, 'apple-touch-icon.png'));
        console.log('Generated apple-touch-icon.png');

        // Generate favicon.ico (64x64 png for now, acceptable by most)
        // Rename to favicon.ico but keep png format? Some browsers might not like it.
        // Better to just make a favicon-32x32.png and link it
        // But vite config asks for favicon.ico in includeAssets.
        // Let's just create a png and call it favicon.ico, surprisingly often works, or use png.
        // Proper ICO generation needs a specific lib, let's stick to png named ico for MVP or just provided favicon.svg if available.
        // Actually, let's output a 64x64 png.
        await image
            .resize(64, 64)
            .toFile(path.join(publicDir, 'favicon.ico'));
        // Note: This is a hack (PNG inside .ico extension). Modern browsers support PNG favicons.
        // If strict ICO is needed, we'd need 'sharp-ico' or similar. 
        console.log('Generated favicon.ico (PNG format)');

        // Generate masked-icon.svg? 
        // SVGs are vector. We can't generate a true SVG from raster easily. 
        // We will skip masked-icon.svg for now or just copy the vite.svg if we want a placeholder.
        // Or we just don't include it in the manifest if we don't have it.

    } catch (error) {
        console.error('Error generating icons:', error);
    }
}

generate();
