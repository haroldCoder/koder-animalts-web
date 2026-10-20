import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dog,
    Upload,
    Camera,
    Trash2,
    CheckCircle2,
    Sparkles,
} from 'lucide-react';
import { formatFileSize } from '@/common/utils';

export interface ProfileImageSectionProps {
    imageFile?: FileList;
    error?: string;
    onSelectFile: (files: FileList) => void;
    onRemove: () => void;
    onOpenCamera: () => void;
}

export const ProfileImageSection = ({
    imageFile,
    error,
    onSelectFile,
    onRemove,
    onOpenCamera,
}: ProfileImageSectionProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Synchronize preview URL with selected file
    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            const url = URL.createObjectURL(imageFile[0]);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    }, [imageFile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onSelectFile(e.target.files);
        }
    };

    const handleRemoveClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onRemove();
    };

    const hasImage = Boolean(imageFile && imageFile.length > 0 && previewUrl);

    return (
        <div className="space-y-3">
            <div>
                <label className="text-sm font-medium flex items-center gap-2">
                    <Dog className="size-4 text-primary" />
                    Foto de Perfil (Única)
                    <span className="text-destructive">*</span>
                </label>
                <p className="text-xs text-muted-foreground">
                    Selecciona una imagen principal o tómala con la cámara integrada o periférica.
                </p>
            </div>

            {/* Hidden native input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="sr-only"
            />

            {hasImage && imageFile ? (
                /* Selected Image Preview Card */
                <div className="relative flex flex-col sm:flex-row items-center gap-4 p-4 border border-border rounded-xl bg-muted/20">
                    <div className="relative size-28 rounded-lg overflow-hidden border border-border/80 shadow-sm shrink-0 bg-black/5">
                        <img
                            src={previewUrl!}
                            alt="Perfil mascota"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1 right-1 p-1 bg-primary text-primary-foreground rounded-full shadow">
                            <CheckCircle2 className="size-3.5" />
                        </div>
                    </div>

                    <div className="flex-1 space-y-1 text-center sm:text-left min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                            {imageFile[0].name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Tamaño: {formatFileSize(imageFile[0].size)}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            <Sparkles className="size-3" /> Foto principal seleccionada
                        </span>
                    </div>

                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={onOpenCamera}
                            className="gap-1.5 flex-1 sm:flex-none text-xs"
                        >
                            <Camera className="size-3.5 text-primary" />
                            Tomar con cámara
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            className="gap-1.5 flex-1 sm:flex-none text-xs"
                        >
                            <Upload className="size-3.5" />
                            Subir otro archivo
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleRemoveClick}
                            className="gap-1.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive flex-1 sm:flex-none"
                        >
                            <Trash2 className="size-3.5" />
                            Eliminar
                        </Button>
                    </div>
                </div>
            ) : (
                /* Dual Action Selector */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="group relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-xl cursor-pointer bg-muted/20 hover:bg-muted/50 hover:border-primary/50 transition-all text-center focus-within:ring-2 focus-within:ring-primary"
                    >
                        <div className="p-3 bg-primary/10 text-primary rounded-full mb-3 group-hover:scale-110 transition-transform">
                            <Upload className="size-6" />
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                            Seleccionar del dispositivo
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Haz clic para buscar en tus archivos
                        </p>
                        <p className="text-[11px] text-muted-foreground/80 mt-2">
                            PNG, JPG, WEBP o GIF
                        </p>
                    </div>

                    <div
                        onClick={onOpenCamera}
                        className="group relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-primary/30 rounded-xl cursor-pointer bg-primary/5 hover:bg-primary/10 hover:border-primary transition-all text-center focus-within:ring-2 focus-within:ring-primary"
                    >
                        <div className="p-3 bg-primary/20 text-primary rounded-full mb-3 group-hover:scale-110 transition-transform shadow-sm">
                            <Camera className="size-6" />
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                            Tomar foto con cámara
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Detecta cámaras y periféricos fotográficos
                        </p>
                        <span className="text-[11px] font-medium text-primary mt-2 flex items-center gap-1">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                            Dispositivos USB y webcams
                        </span>
                    </div>
                </div>
            )}

            {error && !hasImage && (
                <span className="text-xs text-destructive font-medium block">
                    {error}
                </span>
            )}
        </div>
    );
};
