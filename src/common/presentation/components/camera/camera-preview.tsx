import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw, Check } from 'lucide-react';

export interface CameraPreviewProps {
    previewUrl: string;
    onRetake: () => void;
    onConfirm: () => void;
}

export const CameraPreview = ({
    previewUrl,
    onRetake,
    onConfirm,
}: CameraPreviewProps) => {
    return (
        <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/95 flex items-center justify-center border border-border shadow-inner">
                <img
                    src={previewUrl}
                    alt="Foto capturada"
                    className="w-full h-full object-contain"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-white/10">
                    <Sparkles className="size-3.5 text-amber-400" />
                    <span>Vista previa capturada</span>
                </div>
            </div>

            <div className="flex items-center justify-between w-full gap-3 pt-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onRetake}
                    className="gap-2"
                >
                    <RefreshCw className="size-4" />
                    Repetir foto
                </Button>
                <Button
                    type="button"
                    onClick={onConfirm}
                    className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    <Check className="size-4" />
                    Usar esta foto
                </Button>
            </div>
        </div>
    );
};
