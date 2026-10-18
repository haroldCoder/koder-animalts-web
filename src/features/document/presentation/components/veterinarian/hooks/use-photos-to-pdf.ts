import { useState, useRef, useEffect, useCallback } from 'react';
import { ImageToPdfConverter } from '@/common/utils';

export interface PhotoItem {
  id: string;
  file: File;
  previewUrl: string;
}

export interface UsePhotosToPdfProps {
  documentTitle?: string;
  initialImages?: File[];
  onPdfReady: (pdfFile: File | null) => void;
}

export const usePhotosToPdf = ({
  documentTitle = 'documento_clinico',
  initialImages,
  onPdfReady,
}: UsePhotosToPdfProps) => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [generatedPdf, setGeneratedPdf] = useState<File | null>(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [conversionError, setConversionError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
      if (pdfPreviewUrl) {
        URL.revokeObjectURL(pdfPreviewUrl);
      }
    };
  }, []);

  // Convert photos array to PDF
  const convertPhotosToPdf = useCallback(
    async (currentPhotos: PhotoItem[]) => {
      if (currentPhotos.length === 0) {
        setGeneratedPdf(null);
        onPdfReady(null);
        return;
      }

      setIsConverting(true);
      setConversionError(null);

      try {
        const files = currentPhotos.map((p) => p.file);
        const cleanName = (documentTitle.trim() || 'documento')
          .toLowerCase()
          .replace(/[^a-z0-9_-]/g, '_');

        const pdfFile = await ImageToPdfConverter.convertToPdf(files, {
          fileName: `${cleanName}.pdf`,
          pageSize: 'a4',
          orientation: 'auto',
          margin: 10,
        });

        setGeneratedPdf(pdfFile);
        onPdfReady(pdfFile);
      } catch (err) {
        console.error('Error al generar PDF a partir de imágenes:', err);
        setConversionError('No se pudo convertir las imágenes a PDF. Inténtalo de nuevo.');
        setGeneratedPdf(null);
        onPdfReady(null);
      } finally {
        setIsConverting(false);
      }
    },
    [documentTitle, onPdfReady]
  );

  // Handle external or dropped initialImages
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      const newItems: PhotoItem[] = initialImages.map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setPhotos((prev) => {
        const updated = [...prev, ...newItems];
        convertPhotosToPdf(updated);
        return updated;
      });
    }
  }, [initialImages, convertPhotosToPdf]);

  // Update PDF preview URL when a new PDF is generated
  useEffect(() => {
    if (generatedPdf) {
      const url = URL.createObjectURL(generatedPdf);
      setPdfPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPdfPreviewUrl(null);
    }
  }, [generatedPdf]);

  // Helper to trigger conversion on state change
  const updatePhotos = (newPhotos: PhotoItem[]) => {
    setPhotos(newPhotos);
    convertPhotosToPdf(newPhotos);
  };

  const handleCapturePhoto = (capturedFile: File) => {
    const newItem: PhotoItem = {
      id: crypto.randomUUID(),
      file: capturedFile,
      previewUrl: URL.createObjectURL(capturedFile),
    };
    updatePhotos([...photos, newItem]);
  };

  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newItems: PhotoItem[] = Array.from(e.target.files).map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      updatePhotos([...photos, ...newItems]);
      e.target.value = '';
    }
  };

  const handleRemovePhoto = (id: string) => {
    const photoToRemove = photos.find((p) => p.id === id);
    if (photoToRemove) {
      URL.revokeObjectURL(photoToRemove.previewUrl);
    }
    const filtered = photos.filter((p) => p.id !== id);
    updatePhotos(filtered);
  };

  const handleMoveLeft = (index: number) => {
    if (index <= 0) return;
    const reordered = [...photos];
    const temp = reordered[index - 1];
    reordered[index - 1] = reordered[index];
    reordered[index] = temp;
    updatePhotos(reordered);
  };

  const handleMoveRight = (index: number) => {
    if (index >= photos.length - 1) return;
    const reordered = [...photos];
    const temp = reordered[index + 1];
    reordered[index + 1] = reordered[index];
    reordered[index] = temp;
    updatePhotos(reordered);
  };

  const retryConversion = () => {
    convertPhotosToPdf(photos);
  };

  return {
    photos,
    isCameraOpen,
    setIsCameraOpen,
    isConverting,
    generatedPdf,
    pdfPreviewUrl,
    conversionError,
    fileInputRef,
    handleCapturePhoto,
    handleFilesSelect,
    handleRemovePhoto,
    handleMoveLeft,
    handleMoveRight,
    retryConversion,
  };
};
