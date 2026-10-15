import { Fragment, useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { CreatePetFormValues } from '../interfaces';
import { CameraCaptureDialog } from '@/common/presentation/components/camera-capture-dialog';
import {
    ProfileImageSection,
    GalleryImagesSection,
    IaImageSection,
} from './media-form';

interface MediaSectionFormProps {
    form: UseFormReturn<CreatePetFormValues>;
    iaImageMode: 'file' | 'url';
    setIaImageMode: (value: 'file' | 'url') => void;
}

export const MediaSectionForm = ({ form, iaImageMode, setIaImageMode }: MediaSectionFormProps) => {
    const {
        register,
        setValue,
        watch,
        clearErrors,
        formState: { errors },
    } = form;

    const imageFile = watch('image');
    const imagesFiles = watch('images');
    const iaImageFile = watch('iaImageFile');

    // Register fields with validation rules in react-hook-form
    useEffect(() => {
        register('image', {
            validate: (files) => {
                const hasFiles = files && files.length > 0;
                if (hasFiles) return true;
                return 'Debe seleccionar o tomar una imagen principal para la mascota';
            },
        });
        register('images');
        register('iaImageFile');
    }, [register]);

    // Automatically clear errors as soon as a profile image is present
    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            clearErrors('image');
        }
    }, [imageFile, clearErrors]);

    // Camera capture modal state
    const [cameraConfig, setCameraConfig] = useState<{
        open: boolean;
        target: 'profile' | 'gallery' | 'ia';
        title: string;
        description: string;
    }>({
        open: false,
        target: 'profile',
        title: 'Tomar Foto de Perfil',
        description: 'Captura la fotografía principal de la mascota con la cámara o periférico seleccionado.',
    });

    // Profile photo handlers
    const handleSelectProfile = (files: FileList) => {
        setValue('image', files, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
        clearErrors('image');
    };

    const handleRemoveProfile = () => {
        setValue('image', undefined as unknown as FileList, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    // Gallery handlers
    const handleAddGalleryFiles = (newFiles: FileList | File[]) => {
        const currentFiles = form.getValues('images');
        const dt = new DataTransfer();
        if (currentFiles && currentFiles.length > 0) {
            Array.from(currentFiles).forEach((f) => dt.items.add(f));
        }
        Array.from(newFiles).forEach((f) => dt.items.add(f));
        setValue('images', dt.files, { shouldValidate: true });
    };

    const handleRemoveGalleryImage = (indexToRemove: number) => {
        const currentFiles = form.getValues('images');
        if (!currentFiles) return;
        const dt = new DataTransfer();
        Array.from(currentFiles)
            .filter((_, idx) => idx !== indexToRemove)
            .forEach((f) => dt.items.add(f));

        setValue(
            'images',
            dt.files.length > 0 ? dt.files : (undefined as unknown as FileList),
            { shouldValidate: true }
        );
    };

    // IA handlers
    const handleSelectIaFile = (files: FileList) => {
        setValue('iaImageFile', files, { shouldValidate: true });
        clearErrors('iaImageFile');
    };

    const handleRemoveIaFile = () => {
        setValue('iaImageFile', undefined as unknown as FileList, { shouldValidate: true });
    };

    // Unified camera capture dispatcher
    const handleCameraCapture = (file: File) => {
        const dt = new DataTransfer();
        dt.items.add(file);

        if (cameraConfig.target === 'profile') {
            handleSelectProfile(dt.files);
        } else if (cameraConfig.target === 'gallery') {
            handleAddGalleryFiles(dt.files);
        } else if (cameraConfig.target === 'ia') {
            handleSelectIaFile(dt.files);
        }
    };

    return (
        <Fragment>
            {/* Camera capture dialog modal */}
            <CameraCaptureDialog
                open={cameraConfig.open}
                onOpenChange={(open) => setCameraConfig((prev) => ({ ...prev, open }))}
                onCapture={handleCameraCapture}
                title={cameraConfig.title}
                description={cameraConfig.description}
            />

            {/* Media Section Container */}
            <div className="bg-card rounded-xl sm:p-6 p-3 shadow-sm border border-border/50 space-y-6">
                <div className="flex items-center gap-2 border-b border-border/50 pb-4">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        <Upload className="size-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Imágenes y Archivos</h2>
                        <p className="text-xs text-muted-foreground">
                            Sube fotos desde tu dispositivo o captúralas directamente con tus cámaras y periféricos fotográficos.
                        </p>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* 1. Single Profile Image Section */}
                    <ProfileImageSection
                        imageFile={imageFile}
                        error={errors.image?.message}
                        onSelectFile={handleSelectProfile}
                        onRemove={handleRemoveProfile}
                        onOpenCamera={() =>
                            setCameraConfig({
                                open: true,
                                target: 'profile',
                                title: 'Tomar Foto de Perfil',
                                description: 'Captura una fotografía con tu cámara integrada o cualquier periférico conectado.',
                            })
                        }
                    />

                    {/* 2. Multiple Images Gallery Section */}
                    <GalleryImagesSection
                        imagesFiles={imagesFiles}
                        onAddFiles={handleAddGalleryFiles}
                        onRemoveImage={handleRemoveGalleryImage}
                        onOpenCamera={() =>
                            setCameraConfig({
                                open: true,
                                target: 'gallery',
                                title: 'Tomar Foto para Galería',
                                description: 'Toma fotos de la mascota y agrégalas a su galería médica.',
                            })
                        }
                    />

                    {/* 3. IA Image Section */}
                    <IaImageSection
                        mode={iaImageMode}
                        onModeChange={setIaImageMode}
                        iaFile={iaImageFile}
                        onSelectFile={handleSelectIaFile}
                        onRemoveFile={handleRemoveIaFile}
                        onOpenCamera={() =>
                            setCameraConfig({
                                open: true,
                                target: 'ia',
                                title: 'Tomar Foto para IA',
                                description: 'Captura una fotografía para análisis o procesamiento con IA.',
                            })
                        }
                        urlRegister={register('iaImageUrl')}
                    />
                </div>
            </div>
        </Fragment>
    );
};
