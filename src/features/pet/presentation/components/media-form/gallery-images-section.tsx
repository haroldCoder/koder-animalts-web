import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Images,
    Upload,
    Camera,
    Plus,
    Trash2,
} from 'lucide-react';

export interface GalleryImagesSectionProps {
    imagesFiles?: FileList;
    onAddFiles: (files: FileList | File[]) => void;
    onRemoveImage: (index: number) => void;
    onOpenCamera: () => void;
}

interface GalleryPreviewItem {
    url: string;
    name: string;
}

export const GalleryImagesSection = ({
    imagesFiles,
    onAddFiles,
    onRemoveImage,
    onOpenCamera,
}: GalleryImagesSectionProps) => {
    const galleryInputRef = useRef<HTMLInputElement | null>(null);
    const [previews, setPreviews] = useState<GalleryPreviewItem[]>([]);

    useEffect(() => {
        if (imagesFiles && imagesFiles.length > 0) {
            const list = Array.from(imagesFiles).map((file) => ({
                url: URL.createObjectURL(file),
                name: file.name,
            }));
            setPreviews(list);
            return () => {
                list.forEach((item) => URL.revokeObjectURL(item.url));
            };
        } else {
            setPreviews([]);
        }
    }, [imagesFiles]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onAddFiles(e.target.files);
            e.target.value = '';
        }
    };

    return (
        <div className="space-y-3 pt-4 border-t border-border/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                    <label className="text-sm font-medium flex items-center gap-2">
                        <Images className="size-4 text-primary" />
                        Galería de Imágenes (Múltiples)
                    </label>
                    <p className="text-xs text-muted-foreground">
                        Añade varias fotos de la mascota desde archivos locales o capturándolas con la cámara.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => galleryInputRef.current?.click()}
                        className="gap-1.5 text-xs h-8"
                    >
                        <Upload className="size-3.5" />
                        Subir fotos
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onOpenCamera}
                        className="gap-1.5 text-xs h-8 bg-primary/5 hover:bg-primary/10 border-primary/30 text-primary"
                    >
                        <Camera className="size-3.5" />
                        Tomar foto
                    </Button>
                </div>
            </div>

            {/* Hidden native input */}
            <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleInputChange}
                className="sr-only"
            />

            {previews.length > 0 ? (
                <div className="space-y-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {previews.map((item, index) => (
                            <div
                                key={index}
                                className="group relative aspect-square rounded-xl overflow-hidden border border-border bg-black/5 shadow-xs"
                            >
                                <img
                                    src={item.url}
                                    alt={`Galería ${index + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => onRemoveImage(index)}
                                            className="p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 shadow transition-colors cursor-pointer"
                                            title="Eliminar de la galería"
                                        >
                                            <Trash2 className="size-3" />
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-white truncate font-medium">
                                        {item.name}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Quick add photo tile */}
                        <div
                            onClick={onOpenCamera}
                            className="aspect-square rounded-xl border-2 border-dashed border-border/80 hover:border-primary/60 bg-muted/20 hover:bg-muted/40 transition-colors flex flex-col items-center justify-center p-3 cursor-pointer text-center group"
                        >
                            <Plus className="size-6 text-muted-foreground group-hover:text-primary transition-colors mb-1" />
                            <span className="text-xs text-muted-foreground group-hover:text-foreground font-medium">
                                Añadir foto
                            </span>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {previews.length} foto(s) en la galería. Puedes tomar o subir más en cualquier momento.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-xl bg-muted/10 text-center space-y-2">
                    <Images className="size-8 text-muted-foreground/60" />
                    <p className="text-xs text-muted-foreground">
                        Aún no has agregado fotos a la galería.
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => galleryInputRef.current?.click()}
                            className="text-xs h-8"
                        >
                            <Upload className="size-3.5 mr-1" /> Subir desde dispositivo
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={onOpenCamera}
                            className="text-xs h-8 text-primary border-primary/30 bg-primary/5 hover:bg-primary/10"
                        >
                            <Camera className="size-3.5 mr-1" /> Tomar foto con cámara
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
