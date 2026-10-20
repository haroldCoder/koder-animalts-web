import { useState, useEffect, useRef, useCallback } from 'react';

export interface VideoDevice {
    deviceId: string;
    label: string;
}

export interface UseCameraStreamOptions {
    enabled?: boolean;
    initialMirrored?: boolean;
}

export interface UseCameraStreamReturn {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    devices: VideoDevice[];
    selectedDeviceId: string;
    isLoading: boolean;
    errorMessage: string | null;
    isMirrored: boolean;
    showGrid: boolean;
    capturedFile: File | null;
    capturedPreview: string | null;
    // Actions
    startStream: (deviceId?: string) => Promise<void>;
    stopStream: () => void;
    selectDevice: (deviceId: string) => void;
    switchToNextDevice: () => void;
    toggleMirror: () => void;
    toggleGrid: () => void;
    capturePhoto: () => void;
    retakePhoto: () => void;
    resetState: () => void;
}

export const useCameraStream = ({
    enabled = true,
    initialMirrored = false,
}: UseCameraStreamOptions = {}): UseCameraStreamReturn => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [devices, setDevices] = useState<VideoDevice[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isMirrored, setIsMirrored] = useState<boolean>(initialMirrored);
    const [showGrid, setShowGrid] = useState<boolean>(false);

    const [capturedFile, setCapturedFile] = useState<File | null>(null);
    const [capturedPreview, setCapturedPreview] = useState<string | null>(null);

    // Stop all active tracks on the current stream
    const stopStream = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    }, []);

    // Enumerate connected cameras and photographic peripherals
    const updateDeviceList = useCallback(async (): Promise<VideoDevice[]> => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            setErrorMessage('Tu navegador o dispositivo no soporta el acceso a cámaras.');
            return [];
        }

        try {
            const allDevices = await navigator.mediaDevices.enumerateDevices();
            const videoInputs = allDevices
                .filter((d) => d.kind === 'videoinput')
                .map((d, index) => ({
                    deviceId: d.deviceId,
                    label: d.label || `Cámara / Periférico ${index + 1}`,
                }));

            setDevices(videoInputs);
            return videoInputs;
        } catch (error) {
            console.error('Error al enumerar periféricos de video:', error);
            return [];
        }
    }, []);

    // Start video stream with deviceId
    const startStream = useCallback(
        async (deviceId?: string) => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                setErrorMessage('No se encontró soporte para la API de cámara (getUserMedia).');
                return;
            }

            setIsLoading(true);
            setErrorMessage(null);
            stopStream();

            try {
                const constraints: MediaStreamConstraints = {
                    video: deviceId
                        ? {
                              deviceId: { exact: deviceId },
                              width: { ideal: 1920 },
                              height: { ideal: 1080 },
                          }
                        : {
                              width: { ideal: 1920 },
                              height: { ideal: 1080 },
                          },
                    audio: false,
                };

                let stream: MediaStream;
                try {
                    stream = await navigator.mediaDevices.getUserMedia(constraints);
                } catch {
                    stream = await navigator.mediaDevices.getUserMedia({
                        video: deviceId ? { deviceId } : true,
                        audio: false,
                    });
                }

                streamRef.current = stream;

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    await videoRef.current.play().catch(() => {});
                }

                // Update peripheral labels after permission grant
                const updatedList = await updateDeviceList();
                const currentTrack = stream.getVideoTracks()[0];
                const activeDeviceId = currentTrack?.getSettings()?.deviceId || (updatedList[0]?.deviceId ?? '');
                if (activeDeviceId) {
                    setSelectedDeviceId(activeDeviceId);
                }
            } catch (err: unknown) {
                console.error('Error al inicializar cámara:', err);
                const error = err as Error;
                if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                    setErrorMessage('Permiso denegado. Permite el acceso a la cámara en la configuración de tu navegador.');
                } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
                    setErrorMessage('No se encontró ninguna cámara o periférico fotográfico conectado.');
                } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
                    setErrorMessage('La cámara ya está siendo usada por otra aplicación o pestaña.');
                } else {
                    setErrorMessage('No fue posible acceder a la cámara. Verifica que esté conectada correctamente.');
                }
            } finally {
                setIsLoading(false);
            }
        },
        [stopStream, updateDeviceList]
    );

    // Switch device
    const selectDevice = useCallback(
        (deviceId: string) => {
            setSelectedDeviceId(deviceId);
            startStream(deviceId);
        },
        [startStream]
    );

    // Rotate to next device
    const switchToNextDevice = useCallback(() => {
        if (devices.length <= 1) return;
        const currentIndex = devices.findIndex((d) => d.deviceId === selectedDeviceId);
        const nextIndex = (currentIndex + 1) % devices.length;
        const nextDevice = devices[nextIndex];
        if (nextDevice) {
            selectDevice(nextDevice.deviceId);
        }
    }, [devices, selectedDeviceId, selectDevice]);

    // Capture photo from video stream
    const capturePhoto = useCallback(() => {
        const video = videoRef.current;
        if (!video || !streamRef.current) return;

        const canvas = document.createElement('canvas');
        const width = video.videoWidth || 1280;
        const height = video.videoHeight || 720;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (isMirrored) {
            ctx.translate(width, 0);
            ctx.scale(-1, 1);
        }

        ctx.drawImage(video, 0, 0, width, height);

        canvas.toBlob(
            (blob) => {
                if (!blob) return;
                const file = new File([blob], `captura-foto-${Date.now()}.jpg`, {
                    type: 'image/jpeg',
                });
                setCapturedFile(file);
                const preview = URL.createObjectURL(file);
                setCapturedPreview(preview);
            },
            'image/jpeg',
            0.92
        );
    }, [isMirrored]);

    // Retake photo
    const retakePhoto = useCallback(() => {
        if (capturedPreview) {
            URL.revokeObjectURL(capturedPreview);
        }
        setCapturedPreview(null);
        setCapturedFile(null);
    }, [capturedPreview]);

    // Reset all internal state
    const resetState = useCallback(() => {
        stopStream();
        if (capturedPreview) {
            URL.revokeObjectURL(capturedPreview);
        }
        setCapturedPreview(null);
        setCapturedFile(null);
        setErrorMessage(null);
    }, [stopStream, capturedPreview]);

    const toggleMirror = useCallback(() => setIsMirrored((prev) => !prev), []);
    const toggleGrid = useCallback(() => setShowGrid((prev) => !prev), []);

    // Effect for enabling/disabling stream and listening to device changes
    useEffect(() => {
        if (!enabled) {
            resetState();
            return;
        }

        startStream();

        const handleDeviceChange = async () => {
            const list = await updateDeviceList();
            if (list.length > 0 && selectedDeviceId) {
                const stillExists = list.some((d) => d.deviceId === selectedDeviceId);
                if (!stillExists) {
                    setSelectedDeviceId(list[0].deviceId);
                    startStream(list[0].deviceId);
                }
            }
        };

        navigator.mediaDevices?.addEventListener('devicechange', handleDeviceChange);

        return () => {
            stopStream();
            navigator.mediaDevices?.removeEventListener('devicechange', handleDeviceChange);
        };
    }, [enabled]);

    return {
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
        stopStream,
        selectDevice,
        switchToNextDevice,
        toggleMirror,
        toggleGrid,
        capturePhoto,
        retakePhoto,
        resetState,
    };
};
