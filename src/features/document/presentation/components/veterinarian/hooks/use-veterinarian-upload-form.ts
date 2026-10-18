import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/common/hooks';
import { useGetPetsByVeterinaryUserId } from '@/features/pet/application/queries';
import { PetPresentationMapper } from '@/features/pet/presentation/mappers/pet-options.mapper';
import { useGetMedicalRecordsByUserId } from '@/features/medical-record/application/queries';
import { useUploadDocumentMutation } from '@/features/document/application/mutations';
import { CategoryDocument } from '@/features/document/domain/types';
import { formatFileSize } from '@/common/utils';

export interface UploadDocumentPayload {
  title: string;
  category: CategoryDocument;
  petId?: string;
  petName?: string;
  medicalRecordId?: string;
  veterinarianId?: string;
  clinicId?: string;
  ownerReadable: boolean;
  file: File;
}

export interface UseVeterinarianUploadFormProps {
  onUpload?: (payload: UploadDocumentPayload) => Promise<void> | void;
  onOpenChange: (open: boolean) => void;
  defaultPetId?: string;
  defaultPetName?: string;
  defaultMedicalRecordId?: string;
}

export const useVeterinarianUploadForm = ({
  onUpload,
  onOpenChange,
  defaultPetId = '',
  defaultPetName = '',
  defaultMedicalRecordId = '',
}: UseVeterinarianUploadFormProps) => {
  const { user, veterinarianId: authVetId, clinicId: authClinicId } = useAuth();
  const uploadDocumentMutation = useUploadDocumentMutation();

  const [activeTab, setActiveTab] = useState<'file' | 'camera'>('file');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryDocument>('PDF');
  const [selectedPetId, setSelectedPetId] = useState<string>(defaultPetId);
  const [petName, setPetName] = useState<string>(defaultPetName);
  const [selectedMedicalRecordId, setSelectedMedicalRecordId] = useState<string>(defaultMedicalRecordId);
  const [ownerReadable, setOwnerReadable] = useState<boolean>(true);

  // Queries for pets and medical records
  const { data: pets, isLoading: isLoadingPets } = useGetPetsByVeterinaryUserId(user || '');
  const petsOptions = useMemo(() => PetPresentationMapper.toOptions(pets), [pets]);

  const { data: medicalRecords, isLoading: isLoadingRecords } = useGetMedicalRecordsByUserId(
    user || '',
    { petId: selectedPetId || undefined }
  );

  // File from dropzone
  const [directFile, setDirectFile] = useState<File | null>(null);

  // Photos dropped into dropzone forwarded to camera/photo tab
  const [pendingPhotos, setPendingPhotos] = useState<File[]>([]);

  // PDF compiled from photos
  const [compiledPdfFile, setCompiledPdfFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // The active file depending on which tab is chosen
  const currentFile = activeTab === 'file' ? directFile : compiledPdfFile;

  const handlePetChange = (newPetId: string) => {
    setSelectedPetId(newPetId);
    const matchedPet = pets?.find((p) => p.id === newPetId);
    setPetName(matchedPet?.name || '');

    // Clear medical record if it does not belong to the selected pet
    if (selectedMedicalRecordId && newPetId) {
      const rec = medicalRecords?.find((m) => m.id === selectedMedicalRecordId);
      if (rec && rec.petId && rec.petId !== newPetId) {
        setSelectedMedicalRecordId('');
      }
    }
  };

  const handleMedicalRecordChange = (newRecordId: string) => {
    setSelectedMedicalRecordId(newRecordId);
    if (newRecordId && medicalRecords) {
      const rec = medicalRecords.find((m) => m.id === newRecordId);
      if (rec?.petId && (!selectedPetId || selectedPetId !== rec.petId)) {
        setSelectedPetId(rec.petId);
        setPetName(rec.petName || '');
      }
    }
  };

  const handleImagesDropped = (images: File[]) => {
    setPendingPhotos(images);
    setActiveTab('camera');
    toast.info('Se detectaron múltiples imágenes; cambiando al conversor de fotos a PDF.');
  };

  const handleReset = () => {
    setTitle('');
    setCategory('PDF');
    setSelectedPetId(defaultPetId);
    setPetName(defaultPetName);
    setSelectedMedicalRecordId(defaultMedicalRecordId);
    setOwnerReadable(true);
    setDirectFile(null);
    setPendingPhotos([]);
    setCompiledPdfFile(null);
    setIsSubmitting(false);
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      handleReset();
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Por favor ingresa un título para el documento');
      return;
    }

    if (!currentFile) {
      toast.error(
        activeTab === 'file'
          ? 'Por favor arrastra o selecciona un archivo de documento'
          : 'Por favor toma o selecciona al menos una foto para generar el PDF'
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const resolvedVetId = authVetId || undefined;

      const payload: UploadDocumentPayload = {
        title: title.trim(),
        category,
        petId: selectedPetId || undefined,
        petName: petName.trim() || undefined,
        medicalRecordId: selectedMedicalRecordId || undefined,
        veterinarianId: resolvedVetId,
        clinicId: authClinicId || undefined,
        ownerReadable,
        file: currentFile,
      };

      if (onUpload) {
        await onUpload(payload);
      } else {
        await uploadDocumentMutation.mutateAsync({
          title: payload.title,
          category: payload.category,
          petId: payload.petId,
          medicalRecordId: payload.medicalRecordId,
          veterinarianId: payload.veterinarianId,
          clinicId: payload.clinicId,
          ownerReadable: payload.ownerReadable,
          file: payload.file,
        });
      }

      toast.success('Documento subido correctamente', {
        description: `${payload.title} (${formatFileSize(currentFile.size)})`,
      });

      handleClose(false);
    } catch (error) {
      console.error('Error al subir el documento:', error);
      toast.error('Ocurrió un error al subir el documento. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    title,
    setTitle,
    category,
    setCategory,
    selectedPetId,
    selectedMedicalRecordId,
    petName,
    ownerReadable,
    setOwnerReadable,
    activeTab,
    setActiveTab,
    directFile,
    setDirectFile,
    pendingPhotos,
    compiledPdfFile,
    setCompiledPdfFile,
    currentFile,
    isSubmitting,
    petsOptions,
    isLoadingPets,
    medicalRecords,
    isLoadingRecords,
    handlePetChange,
    handleMedicalRecordChange,
    handleImagesDropped,
    handleClose,
    handleSubmit,
  };
};
