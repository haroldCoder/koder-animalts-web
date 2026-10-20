import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, FileText, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatFileSize } from '@/common/utils';

export interface DocumentDropzoneProps {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  onImagesDropped?: (files: File[]) => void;
  accept?: string;
  maxSizeMb?: number;
  disabled?: boolean;
}

export const DocumentDropzone = ({
  selectedFile,
  onFileSelect,
  onFileRemove,
  onImagesDropped,
  accept = '.pdf,application/pdf,image/*',
  maxSizeMb = 25,
  disabled = false,
}: DocumentDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const validateAndHandleFiles = (files: FileList | File[]) => {
    setErrorMessage(null);
    const fileArray = Array.from(files);

    if (fileArray.length === 0) return;

    // Check if multiple images were dropped and handler exists
    const imageFiles = fileArray.filter((f) => f.type.startsWith('image/'));
    if (fileArray.length > 1 && imageFiles.length === fileArray.length && onImagesDropped) {
      onImagesDropped(imageFiles);
      return;
    }

    const firstFile = fileArray[0];

    // Check size limit
    if (firstFile.size > maxSizeMb * 1024 * 1024) {
      setErrorMessage(`El archivo supera el tamaño máximo permitido de ${maxSizeMb} MB`);
      return;
    }

    onFileSelect(firstFile);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndHandleFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndHandleFiles(e.target.files);
    }
    // reset input so the same file can be selected again
    e.target.value = '';
  };

  return (
    <div className="w-full space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        onChange={handleInputChange}
        className="sr-only"
        disabled={disabled}
      />

      {selectedFile ? (
        <div className="relative flex items-center justify-between p-4 bg-muted/40 border border-border rounded-xl">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="flex items-center justify-center size-11 rounded-lg bg-primary/10 text-primary shrink-0">
              <FileText className="size-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground truncate max-w-xs sm:max-w-md">
                  {selectedFile.name}
                </p>
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {formatFileSize(selectedFile.size)} • {selectedFile.type || 'Documento'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
              className="text-xs h-8 cursor-pointer"
              disabled={disabled}
            >
              Cambiar
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onFileRemove}
              className="size-8 text-muted-foreground hover:text-destructive cursor-pointer"
              disabled={disabled}
              title="Eliminar archivo"
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
          className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
            isDragging
              ? 'border-primary bg-primary/5 scale-[0.99]'
              : 'border-border/80 hover:border-primary/50 hover:bg-muted/30 bg-background/50'
          } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
        >
          <div className="p-3 bg-primary/10 text-primary rounded-full mb-3">
            <UploadCloud className="size-6 animate-pulse" />
          </div>

          <p className="text-sm font-semibold text-foreground text-center">
            Arrastra tu documento aquí o{' '}
            <span className="text-primary underline underline-offset-2">selecciona un archivo</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1 text-center">
            Admite archivos PDF o imágenes (máx. {maxSizeMb} MB)
          </p>
        </div>
      )}

      {errorMessage && (
        <p className="text-xs text-destructive font-medium">{errorMessage}</p>
      )}
    </div>
  );
};
