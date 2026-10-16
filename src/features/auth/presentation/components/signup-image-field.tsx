import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Upload,
    Camera,
    Trash2,
    CheckCircle2,
    Sparkles,
    User,
} from 'lucide-react';
import { CameraCaptureDialog } from '@/common/presentation/components/camera-capture-dialog';
import { formatFileSize } from '@/common/utils';

export interface SignupImageFieldProps {
    value: File | null;
    onChange: (file: File | null) => void;
    error?: string;
}

export const SignupImageField = ({
    value,
    onChange,
    error,
}: SignupImageFieldProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    // Sync preview URL
    useEffect(() => {
        if (value) {
            const url = URL.createObjectURL(value);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreviewUrl(null);
        }
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            onChange(file);
        }
    };

    const handleRemove = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onChange(null);
    };

    const handleCameraCapture = (file: File) => {
        onChange(file);
    };

    const hasImage = Boolean(value && previewUrl);

    return (
        <div className="space-y-2">
            <CameraCaptureDialog
                open={isCameraOpen}
                onOpenChange={setIsCameraOpen}
                onCapture={handleCameraCapture}
                title="Tomar Foto de Perfil"
                description="Captura tu fotografía con la cámara integrada o cualquier periférico fotográfico conectado."
            />

            {/* Hidden native file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
            />

            <div>
                <label className="text-sm font-medium flex items-center gap-1.5 text-foreground">
                    <User className="size-4 text-orange-500" />
                    Foto de Perfil
                    <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-muted-foreground">
                    Carga una fotografía personal para tu cuenta de veterinario o tutor.
                </p>
            </div>

            {hasImage && value ? (
                /* Preview card */
                <div className="relative flex flex-col sm:flex-row items-center gap-4 p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-orange-50/30 dark:bg-orange-950/10">
                    <div className="relative size-20 rounded-xl overflow-hidden border border-orange-200 dark:border-orange-900 shadow-xs shrink-0 bg-black/5">
                        <img
                            src={previewUrl!}
                            alt="Foto de perfil"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1 right-1 p-0.5 bg-orange-500 text-white rounded-full shadow">
                            <CheckCircle2 className="size-3" />
                        </div>
                    </div>

                    <div className="flex-1 space-y-0.5 text-center sm:text-left min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                            {value.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Tamaño: {formatFileSize(value.size)}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/40 px-2 py-0.5 rounded-full">
                            <Sparkles className="size-3" /> Foto seleccionada
                        </span>
                    </div>

                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsCameraOpen(true)}
                            className="gap-1.5 flex-1 sm:flex-none text-xs h-8 border-orange-200 dark:border-orange-800 hover:bg-orange-50 dark:hover:bg-orange-950/30"
                        >
                            <Camera className="size-3.5 text-orange-500" />
                            Tomar con cámara
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            className="gap-1.5 flex-1 sm:flex-none text-xs h-8"
                        >
                            <Upload className="size-3.5" />
                            Cambiar archivo
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleRemove}
                            className="gap-1.5 text-xs h-8 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 flex-1 sm:flex-none"
                        >
                            <Trash2 className="size-3.5" />
                            Eliminar
                        </Button>
                    </div>
                </div>
            ) : (
                /* Dual Action Selector (File upload / Camera) */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Option A: Upload from device */}
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        className={`group relative flex flex-col items-center justify-center p-5 border-2 border-dashed rounded-xl cursor-pointer transition-all text-center focus-within:ring-2 focus-within:ring-orange-500 ${isDragging
                                ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20 scale-[1.01]'
                                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-orange-400 hover:bg-orange-50/30 dark:hover:bg-orange-950/10'
                            } ${error ? 'border-red-400 bg-red-50/50 dark:bg-red-950/10' : ''}`}
                    >
                        <div className="p-2.5 bg-orange-100 dark:bg-orange-950/50 text-orange-500 rounded-full mb-2 group-hover:scale-110 transition-transform">
                            <Upload className="size-5" />
                        </div>
                        <p className="text-xs font-semibold text-foreground">
                            Subir desde tu equipo
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                            Arrastra o haz clic aquí
                        </p>
                        <p className="text-[10px] text-muted-foreground/75 mt-1">
                            PNG, JPG o WEBP
                        </p>
                    </div>

                    {/* Option B: Take photo with camera */}
                    <div
                        onClick={() => setIsCameraOpen(true)}
                        className={`group relative flex flex-col items-center justify-center p-5 border-2 border-dashed rounded-xl cursor-pointer transition-all text-center focus-within:ring-2 focus-within:ring-orange-500 border-orange-300 dark:border-orange-800/60 bg-orange-50/40 dark:bg-orange-950/15 hover:border-orange-500 hover:bg-orange-50/70 dark:hover:bg-orange-950/30 ${error ? 'border-red-400' : ''
                            }`}
                    >
                        <div className="p-2.5 bg-orange-500 text-white rounded-full mb-2 group-hover:scale-110 transition-transform shadow-xs">
                            <Camera className="size-5" />
                        </div>
                        <p className="text-xs font-semibold text-foreground">
                            Tomar foto con cámara
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                            Cámara integrada o periféricos USB
                        </p>
                        <span className="text-[10px] font-medium text-orange-600 dark:text-orange-400 mt-1 flex items-center gap-1">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                            Detección automática
                        </span>
                    </div>
                </div>
            )}

            {error && !hasImage && (
                <span className="text-xs text-red-500 px-1 font-medium block animate-in fade-in">
                    {error}
                </span>
            )}
        </div>
    );
};
