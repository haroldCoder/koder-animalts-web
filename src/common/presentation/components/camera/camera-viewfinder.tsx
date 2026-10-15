import { RefObject } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';

export interface CameraViewfinderProps {
    videoRef: RefObject<HTMLVideoElement | null>;
    isLoading: boolean;
    errorMessage: string | null;
    isMirrored: boolean;
    showGrid: boolean;
    onRetry: () => void;
}

export const CameraViewfinder = ({
    videoRef,
    isLoading,
    errorMessage,
    isMirrored,
    showGrid,
    onRetry,
}: CameraViewfinderProps) => {
    return (
        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black/95 flex items-center justify-center border border-border shadow-inner">
            {errorMessage ? (
                <div className="flex flex-col items-center justify-center p-6 text-center max-w-md space-y-3">
                    <div className="p-3 bg-destructive/10 text-destructive rounded-full">
                        <AlertCircle className="size-8" />
                    </div>
                    <h3 className="font-semibold text-foreground">No se pudo acceder a la cámara</h3>
                    <p className="text-xs text-muted-foreground">{errorMessage}</p>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onRetry}
                        className="gap-2 mt-2"
                    >
                        <RefreshCw className="size-4" />
                        Reintentar búsqueda
                    </Button>
                </div>
            ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                    {isLoading && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 gap-2">
                            <RefreshCw className="size-8 animate-spin text-primary" />
                            <p className="text-xs text-white/80 font-medium">Iniciando periférico de video...</p>
                        </div>
                    )}
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className={`w-full h-full object-cover transition-transform duration-200 ${
                            isMirrored ? 'scale-x-[-1]' : ''
                        }`}
                    />

                    {/* Live indicator badge */}
                    {!isLoading && (
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-white/10">
                            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                            <span>EN VIVO</span>
                        </div>
                    )}

                    {/* Rule of thirds alignment grid */}
                    {showGrid && !isLoading && (
                        <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-white/20">
                            <div className="border-r border-b border-white/20" />
                            <div className="border-r border-b border-white/20" />
                            <div className="border-b border-white/20" />
                            <div className="border-r border-b border-white/20" />
                            <div className="border-r border-b border-white/20" />
                            <div className="border-b border-white/20" />
                            <div className="border-r border-white/20" />
                            <div className="border-r border-white/20" />
                            <div />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
