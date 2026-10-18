import { Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CameraCaptureDialog } from '@/common/presentation/components/camera-capture-dialog';
import { usePhotosToPdf } from './hooks/use-photos-to-pdf';
import { PhotoGridCard } from './components/photo-grid-card';
import { PdfConversionStatus } from './components/pdf-conversion-status';
import { PhotosEmptyState } from './components/photos-empty-state';

export interface PhotosToPdfCaptureProps {
  onPdfReady: (pdfFile: File | null) => void;
  documentTitle?: string;
  initialImages?: File[];
  disabled?: boolean;
}

export const PhotosToPdfCapture = ({
  onPdfReady,
  documentTitle = 'documento_clinico',
  initialImages,
  disabled = false,
}: PhotosToPdfCaptureProps) => {
  const {
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
  } = usePhotosToPdf({ documentTitle, initialImages, onPdfReady });

  return (
    <div className="w-full space-y-4">
      {/* Action buttons toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-muted/30 border border-border/80 rounded-xl">
        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Camera className="size-4 text-primary" />
            Fotografías del Documento
            {photos.length > 0 && (
              <span className="text-xs bg-primary/10 text-primary font-medium px-2 py-0.5 rounded-full">
                {photos.length} {photos.length === 1 ? 'página' : 'páginas'}
              </span>
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            Captura con tu cámara o selecciona varias fotos para combinarlas en un único PDF.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesSelect}
            className="sr-only"
            disabled={disabled}
          />

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="gap-1.5 text-xs h-8 cursor-pointer"
            disabled={disabled}
          >
            <Upload className="size-3.5" />
            Subir fotos
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={() => setIsCameraOpen(true)}
            className="gap-1.5 text-xs h-8 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={disabled}
          >
            <Camera className="size-3.5" />
            Tomar foto
          </Button>
        </div>
      </div>

      {/* Pages Preview Grid or Empty State */}
      {photos.length > 0 ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {photos.map((item, index) => (
              <PhotoGridCard
                key={item.id}
                item={item}
                index={index}
                total={photos.length}
                disabled={disabled}
                onRemove={handleRemovePhoto}
                onMoveLeft={handleMoveLeft}
                onMoveRight={handleMoveRight}
              />
            ))}
          </div>

          <PdfConversionStatus
            isConverting={isConverting}
            generatedPdf={generatedPdf}
            pdfPreviewUrl={pdfPreviewUrl}
            pageCount={photos.length}
            disabled={disabled}
            onRetry={retryConversion}
          />
        </div>
      ) : (
        <PhotosEmptyState />
      )}

      {conversionError && (
        <p className="text-xs text-destructive font-medium">{conversionError}</p>
      )}

      {/* Camera Capture Modal Dialog */}
      <CameraCaptureDialog
        open={isCameraOpen}
        onOpenChange={setIsCameraOpen}
        onCapture={handleCapturePhoto}
        title="Tomar Foto del Documento"
        description="Alinea la hoja o documento frente a la cámara o periférico y presiona capturar."
      />
    </div>
  );
};
