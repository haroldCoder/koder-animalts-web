import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, X } from 'lucide-react';
import { useCameraStream } from '@/common/hooks/use-camera-stream';
import {
    CameraToolbar,
    CameraViewfinder,
    CameraPreview,
} from './camera';

export interface CameraCaptureDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCapture: (file: File) => void;
    title?: string;
    description?: string;
}

export const CameraCaptureDialog = ({
    open,
    onOpenChange,
    onCapture,
    title = 'Tomar Fotografía',
    description = 'Selecciona tu cámara o periférico fotográfico conectado y captura la imagen.',
}: CameraCaptureDialogProps) => {
    const {
        videoRef,
        devices,
        selectedDeviceId,
        isLoading,
        errorMessage,
        isMirrored,
        showGrid,
        capturedFile,
        capturedPreview,
        startStream,
        selectDevice,
        switchToNextDevice,
        toggleMirror,
        toggleGrid,
        capturePhoto,
        retakePhoto,
        resetState,
    } = useCameraStream({ enabled: open });

    const handleConfirm = () => {
        if (capturedFile) {
            onCapture(capturedFile);
            onOpenChange(false);
        }
    };

    const handleClose = () => {
        resetState();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl md:max-w-2xl p-0 overflow-hidden bg-card border-border/80 shadow-2xl rounded-2xl">
                <div className="p-4 sm:p-6 border-b border-border/50 bg-muted/20">
                    <DialogHeader className="space-y-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                    <Camera className="size-5" />
                                </div>
                                <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
                            </div>
                            {devices.length > 0 && (
                                <span className="text-xs bg-primary/10 text-primary font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-primary/20">
                                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                                    {devices.length} {devices.length === 1 ? 'periférico' : 'periféricos'} detectado{devices.length > 1 ? 's' : ''}
                                </span>
                            )}
                        </div>
                        <DialogDescription className="text-sm text-muted-foreground">
                            {description}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Camera / Peripheral Selector Toolbar */}
                    {!capturedPreview && (
                        <CameraToolbar
                            devices={devices}
                            selectedDeviceId={selectedDeviceId}
                            onSelectDevice={selectDevice}
                            onSwitchNext={switchToNextDevice}
                            onRefresh={() => startStream(selectedDeviceId)}
                            isMirrored={isMirrored}
                            onToggleMirror={toggleMirror}
                            showGrid={showGrid}
                            onToggleGrid={toggleGrid}
                            isLoading={isLoading}
                        />
                    )}
                </div>

                {/* Viewfinder or Captured Preview */}
                <div className="p-4 sm:p-6 space-y-4">
                    {capturedPreview ? (
                        <CameraPreview
                            previewUrl={capturedPreview}
                            onRetake={retakePhoto}
                            onConfirm={handleConfirm}
                        />
                    ) : (
                        <>
                            <CameraViewfinder
                                videoRef={videoRef}
                                isLoading={isLoading}
                                errorMessage={errorMessage}
                                isMirrored={isMirrored}
                                showGrid={showGrid}
                                onRetry={() => startStream(selectedDeviceId)}
                            />

                            {/* Shutter / Action Controls */}
                            <div className="flex items-center justify-between pt-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={handleClose}
                                    className="gap-1.5 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="size-4" />
                                    Cancelar
                                </Button>

                                <Button
                                    type="button"
                                    disabled={isLoading || !!errorMessage}
                                    onClick={capturePhoto}
                                    size="lg"
                                    className="relative group gap-2.5 px-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 active:scale-95 transition-all"
                                >
                                    <div className="p-1 bg-white/20 rounded-full group-hover:scale-110 transition-transform">
                                        <Camera className="size-4" />
                                    </div>
                                    <span className="font-semibold">Tomar Foto</span>
                                </Button>

                                <div className="w-16" />
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
