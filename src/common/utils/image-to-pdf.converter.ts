import { jsPDF } from 'jspdf';

export interface ImageToPdfOptions {
  /** Name of the resulting PDF file (default: 'documento.pdf') */
  fileName?: string;
  /** Page standard size (default: 'a4') or 'fit' to image aspect ratio */
  pageSize?: 'a4' | 'letter' | 'fit';
  /** Page orientation: 'auto' determines portrait/landscape based on image dimensions */
  orientation?: 'portrait' | 'landscape' | 'auto';
  /** Margin around image in mm (default: 10) */
  margin?: number;
}

interface ImageDimensions {
  dataUrl: string;
  width: number;
  height: number;
  format: 'JPEG' | 'PNG' | 'WEBP';
}

export class ImageToPdfConverter {
  /**
   * Transforms one or multiple image Files or Blobs into a single unified PDF File.
   */
  public static async convertToPdf(
    images: File | Blob | Array<File | Blob>,
    options: ImageToPdfOptions = {}
  ): Promise<File> {
    const converter = new ImageToPdfConverter();
    return converter.convert(images, options);
  }

  /**
   * Transforms one or multiple image Files or Blobs into a single unified PDF File (instance method).
   */
  public async convert(
    images: File | Blob | Array<File | Blob>,
    options: ImageToPdfOptions = {}
  ): Promise<File> {
    const imageList = Array.isArray(images) ? images : [images];

    if (imageList.length === 0) {
      throw new Error('No se proporcionaron imágenes para convertir a PDF');
    }

    const {
      fileName = 'documento.pdf',
      pageSize = 'a4',
      orientation = 'auto',
      margin = 10,
    } = options;

    const normalizedFileName = fileName.toLowerCase().endsWith('.pdf')
      ? fileName
      : `${fileName}.pdf`;

    // Process all images to data URLs with natural dimensions
    const processedImages: ImageDimensions[] = await Promise.all(
      imageList.map((file) => this.processImage(file))
    );

    let doc: jsPDF | null = null;

    for (let i = 0; i < processedImages.length; i++) {
      const img = processedImages[i];
      const isLandscape = img.width > img.height;
      const pageOrientation =
        orientation === 'auto'
          ? isLandscape
            ? 'landscape'
            : 'portrait'
          : orientation;

      if (pageSize === 'fit') {
        // Create page exactly matching image aspect ratio (unit: px)
        if (i === 0) {
          doc = new jsPDF({
            orientation: pageOrientation,
            unit: 'px',
            format: [img.width, img.height],
          });
        } else if (doc) {
          doc.addPage([img.width, img.height], pageOrientation);
        }
        doc?.addImage(img.dataUrl, img.format, 0, 0, img.width, img.height);
      } else {
        // Standard paper size (mm)
        if (i === 0) {
          doc = new jsPDF({
            orientation: pageOrientation,
            unit: 'mm',
            format: pageSize,
          });
        } else if (doc) {
          doc.addPage(pageSize, pageOrientation);
        }

        if (doc) {
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();

          const usableWidth = Math.max(10, pageWidth - margin * 2);
          const usableHeight = Math.max(10, pageHeight - margin * 2);

          const imgRatio = img.width / img.height;
          const targetRatio = usableWidth / usableHeight;

          let renderWidth: number;
          let renderHeight: number;

          if (imgRatio > targetRatio) {
            // Constrained by width
            renderWidth = usableWidth;
            renderHeight = usableWidth / imgRatio;
          } else {
            // Constrained by height
            renderHeight = usableHeight;
            renderWidth = usableHeight * imgRatio;
          }

          // Center on the page
          const posX = margin + (usableWidth - renderWidth) / 2;
          const posY = margin + (usableHeight - renderHeight) / 2;

          doc.addImage(
            img.dataUrl,
            img.format,
            posX,
            posY,
            renderWidth,
            renderHeight,
            undefined,
            'FAST'
          );
        }
      }
    }

    if (!doc) {
      throw new Error('Error al inicializar el documento PDF');
    }

    const pdfBlob = doc.output('blob');
    return new File([pdfBlob], normalizedFileName, {
      type: 'application/pdf',
      lastModified: Date.now(),
    });
  }

  /**
   * Helper that reads a File or Blob, loads it as an image, and extracts natural dimensions and format.
   */
  private async processImage(file: File | Blob): Promise<ImageDimensions> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = () => {
        reject(new Error('Error al leer el archivo de imagen'));
      };

      reader.onload = () => {
        const dataUrl = reader.result as string;
        const img = new Image();

        img.onerror = () => {
          reject(new Error('El archivo seleccionado no es una imagen válida'));
        };

        img.onload = () => {
          // Detect format from MIME type or data URL
          let format: 'JPEG' | 'PNG' | 'WEBP' = 'JPEG';
          if (file.type === 'image/png' || dataUrl.startsWith('data:image/png')) {
            format = 'PNG';
          } else if (file.type === 'image/webp' || dataUrl.startsWith('data:image/webp')) {
            format = 'WEBP';
          }

          resolve({
            dataUrl,
            width: img.naturalWidth || img.width,
            height: img.naturalHeight || img.height,
            format,
          });
        };

        img.src = dataUrl;
      };

      reader.readAsDataURL(file);
    });
  }
}
