import { Button } from '@/components/ui/button';
import {
    Video,
    SwitchCamera,
    RefreshCw,
    FlipHorizontal,
    Grid3X3,
} from 'lucide-react';
import { VideoDevice } from '@/common/hooks/use-camera-stream';

export interface CameraToolbarProps {
    devices: VideoDevice[];
    selectedDeviceId: string;
    onSelectDevice: (deviceId: string) => void;
    onSwitchNext: () => void;
    onRefresh: () => void;
    isMirrored: boolean;
    onToggleMirror: () => void;
    showGrid: boolean;
    onToggleGrid: () => void;
    isLoading: boolean;
}

export const CameraToolbar = ({
    devices,
    selectedDeviceId,
    onSelectDevice,
    onSwitchNext,
    onRefresh,
    isMirrored,
    onToggleMirror,
    showGrid,
    onToggleGrid,
    isLoading,
}: CameraToolbarProps) => {
    return (
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                    <Video className="size-4" />
                </div>
                <select
                    value={selectedDeviceId}
                    onChange={(e) => onSelectDevice(e.target.value)}
                    disabled={isLoading || devices.length === 0}
                    className="w-full pl-9 pr-8 py-2 text-sm bg-background/80 hover:bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 transition-colors cursor-pointer"
                >
                    {devices.length === 0 ? (
                        <option value="">Buscando cámaras y periféricos...</option>
                    ) : (
                        devices.map((device, index) => (
                            <option key={device.deviceId || index} value={device.deviceId}>
                                📷 {device.label}
                            </option>
                        ))
                    )}
                </select>
            </div>

            <div className="flex items-center gap-1.5 justify-end">
                {devices.length > 1 && (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onSwitchNext}
                        title="Cambiar a la siguiente cámara"
                        className="h-9 gap-1.5 px-3"
                    >
                        <SwitchCamera className="size-4" />
                        <span className="hidden sm:inline">Rotar</span>
                    </Button>
                )}
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onRefresh}
                    title="Refrescar cámara"
                    className="h-9 px-3"
                >
                    <RefreshCw className={`size-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
                <Button
                    type="button"
                    variant={isMirrored ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={onToggleMirror}
                    title="Modo espejo"
                    className="h-9 px-3"
                >
                    <FlipHorizontal className="size-4" />
                </Button>
                <Button
                    type="button"
                    variant={showGrid ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={onToggleGrid}
                    title="Cuadrícula de alineación"
                    className="h-9 px-3"
                >
                    <Grid3X3 className="size-4" />
                </Button>
            </div>
        </div>
    );
};
