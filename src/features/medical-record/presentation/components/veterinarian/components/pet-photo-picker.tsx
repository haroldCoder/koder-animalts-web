import React, { useRef, useState, useEffect } from "react";
import { Camera, Upload, Trash2, Dog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CameraCaptureDialog } from "@/common/presentation/components/camera-capture-dialog";
import { formatFileSize } from "@/common/utils";

export interface PetPhotoPickerProps {
    selectedFile: File | null;
    onFileChange: (file: File | null) => void;
    error?: string;
}

export const PetPhotoPicker: React.FC<PetPhotoPickerProps> = ({
    selectedFile,
    onFileChange,
    error,
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    useEffect(() => {
        if (!selectedFile) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [selectedFile]);

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            onFileChange(file);
        }
    };

    const handleRemove = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        onFileChange(null);
    };

    const handleCaptureFromCamera = (file: File) => {
        onFileChange(file);
    };

    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-foreground flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                    <Dog className="size-3.5 text-primary" />
                    Fotografía Principal <span className="text-destructive">*</span>
                </span>
                {selectedFile && (
                    <span className="text-[11px] text-muted-foreground">
                        {formatFileSize(selectedFile.size)}
                    </span>
                )}
            </label>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInputChange}
            />

            <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 rounded-xl border border-dashed border-border/80 bg-muted/20 hover:bg-muted/30 transition-colors">
                {/* Image preview / Avatar */}
                <div className="relative size-20 rounded-xl overflow-hidden bg-muted flex items-center justify-center border border-border shrink-0 shadow-2xs">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Vista previa mascota"
                            className="size-full object-cover"
                        />
                    ) : (
                        <Dog className="size-8 text-muted-foreground/50" />
                    )}
                </div>

                {/* Actions & details */}
                <div className="flex-1 w-full space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            className="gap-1.5 h-8 text-xs cursor-pointer"
                        >
                            <Upload className="size-3.5 text-muted-foreground" />
                            <span>Subir archivo</span>
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsCameraOpen(true)}
                            className="gap-1.5 h-8 text-xs cursor-pointer"
                        >
                            <Camera className="size-3.5 text-primary" />
                            <span>Tomar foto</span>
                        </Button>

                        {selectedFile && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={handleRemove}
                                className="gap-1.5 h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer ml-auto"
                            >
                                <Trash2 className="size-3.5" />
                                <span>Quitar</span>
                            </Button>
                        )}
                    </div>

                    <p className="text-[11px] text-muted-foreground">
                        {selectedFile
                            ? `Archivo seleccionado: ${selectedFile.name}`
                            : "Sube una imagen o tómala directamente con tu cámara."}
                    </p>
                </div>
            </div>

            {error && <span className="text-xs text-destructive">{error}</span>}

            {/* Camera capture modal */}
            <CameraCaptureDialog
                open={isCameraOpen}
                onOpenChange={setIsCameraOpen}
                onCapture={handleCaptureFromCamera}
                title="Tomar Foto de la Mascota"
                description="Apunta la cámara al paciente y captura su foto de perfil."
            />
        </div>
    );
};
