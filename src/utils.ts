import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

function createIamageName(
  fileName: string,
  width: number,
  height: number
): string {
  const widthString = String(width);
  const heightString = String(height);
  return fileName + '_' + widthString + '_' + heightString + '.jpg';
}

// get the absolute path from relative path
function getImagePath(imageName: string): string {
  return path.resolve(imageName);
}

async function isImageCached(imageName: string): Promise<boolean> {
  let cached: boolean;
  try {
    // check if image in images_thumb (cache)
    await fs.access(getImagePath(`./images_thumb/${imageName}`));
    cached = true;
  } catch (error) {
    cached = false;
  }
  return cached;
}

async function isImageFound(imageName: string): Promise<boolean> {
  let found: boolean;
  try {
    await fs.access(getImagePath(`./images_full/${imageName}.jpg`));
    found = true;
  } catch (error) {
    found = false;
  }
  return found;
}

async function resizeAndCache(
  imageFileName: string,
  width: number,
  height: number
): Promise<void> {
  const fullImagePath = getImagePath(`./images_full/${imageFileName}.jpg`);
  const cachedImageName = createIamageName(imageFileName, width, height);
  const cachedImagePath = getImagePath(`./images_thumb/${cachedImageName}`);
  await sharp(fullImagePath)
    .resize({
      width: width,
      height: height
    })
    .toFile(cachedImagePath);
}

export default {
  isImageCached,
  resizeAndCache,
  isImageFound,
  createIamageName,
  getImagePath
};
