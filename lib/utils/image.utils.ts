const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const WEBP_QUALITY = 0.85; // 85% quality

export type ConversionResult = {
  file: File;
  wasConverted: boolean;
  originalSize: number;
  convertedSize: number;
};

export async function convertToWebP(file: File): Promise<ConversionResult> {
  const originalSize = file.size;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context unavailable"));
        return;
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("WebP conversion failed"));
            return;
          }

          // If conversion somehow made it larger, use original
          if (blob.size >= originalSize && file.type === "image/webp") {
            resolve({
              file,
              wasConverted: false,
              originalSize,
              convertedSize: originalSize,
            });
            return;
          }

          const convertedFile = new File(
            [blob],
            file.name.replace(/\.[^.]+$/, ".webp"),
            { type: "image/webp" },
          );

          if (convertedFile.size > MAX_SIZE) {
            reject(
              new Error(
                "Image is too large even after optimisation. Please use a smaller image.",
              ),
            );
            return;
          }

          resolve({
            file: convertedFile,
            wasConverted: true,
            originalSize,
            convertedSize: convertedFile.size,
          });
        },
        "image/webp",
        WEBP_QUALITY,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    img.src = objectUrl;
  });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
