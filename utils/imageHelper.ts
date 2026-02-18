import JSZip from 'jszip';
import { CursorSet } from '../types';

/**
 * Takes a base64 string (assumed to be an image with a specific background color),
 * draws it to a canvas, makes that background color transparent, and returns a new base64 string.
 */
export const removeBackground = (base64Data: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      // Resize to 128x128 for high-res large pixel art cursors
      const size = 128;
      canvas.width = size;
      canvas.height = size;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Draw image
      ctx.imageSmoothingEnabled = false; // Keep pixelated look
      ctx.drawImage(img, 0, 0, size, size);

      const imageData = ctx.getImageData(0, 0, size, size);
      const data = imageData.data;

      // Detect background color from the top-left pixel (0,0)
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];

      // Tolerance for color matching (handles compression artifacts)
      const tolerance = 40;

      // Safety check: Don't remove white if the background looks white-ish,
      // unless the prompt specifically asked for white (which we didn't).
      // However, if the model ignored us and gave white background, we might be stuck.
      // But we switched prompt to Magenta.
      
      // Helper to check if pixel is close to background color
      const isBackground = (r: number, g: number, b: number) => {
        // Option 1: Dynamic check against top-left pixel
        const matchesTopLeft = 
          Math.abs(r - bgR) < tolerance && 
          Math.abs(g - bgG) < tolerance && 
          Math.abs(b - bgB) < tolerance;

        if (matchesTopLeft) return true;

        // Option 2: Hardcoded Magenta check (#FF00FF) in case top-left is noisy but background is generally magenta
        // Magenta is High Red, Low Green, High Blue
        if (r > 200 && g < 100 && b > 200) return true;

        return false;
      };

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (isBackground(r, g, b)) {
          data[i + 3] = 0; // Set Alpha to 0
        }
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = (e) => reject(e);
    img.src = `data:image/png;base64,${base64Data}`; 
  });
};

export const downloadCursor = (base64URI: string, name: string) => {
  const link = document.createElement('a');
  link.href = base64URI;
  link.download = `${name}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadCursorSetZip = async (cursors: CursorSet) => {
  const zip = new JSZip();
  const folder = zip.folder("pixel-cursor-set");

  if (!folder) return;

  let hasContent = false;

  // Add files
  if (cursors.normal) {
    folder.file("normal.png", cursors.normal.split(',')[1], { base64: true });
    hasContent = true;
  }
  if (cursors.pointing) {
    folder.file("pointing.png", cursors.pointing.split(',')[1], { base64: true });
    hasContent = true;
  }
  if (cursors.loading) {
    folder.file("loading.png", cursors.loading.split(',')[1], { base64: true });
    hasContent = true;
  }
  if (cursors.clicking) {
    folder.file("clicking.png", cursors.clicking.split(',')[1], { base64: true });
    hasContent = true;
  }
  if (cursors.typing) {
    folder.file("typing.png", cursors.typing.split(',')[1], { base64: true });
    hasContent = true;
  }

  if (!hasContent) return;

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = "pixel-cursor-set.zip";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};