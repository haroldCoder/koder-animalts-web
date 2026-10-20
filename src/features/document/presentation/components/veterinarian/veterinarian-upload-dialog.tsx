import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUp, FileText, Camera, Loader2 } from 'lucide-react';
import { DocumentDropzone } from './document-dropzone';
import { PhotosToPdfCapture } from './photos-to-pdf-capture';
import {
  useVeterinarianUploadForm,
  UploadDocumentPayload,
  UseVeterinarianUploadFormProps,
} from './hooks/use-veterinarian-upload-form';
import {
  DocumentMetadataFields,
  OwnerVisibilitySwitch,
  UploadFilePreview,
} from './components';

export type { UploadDocumentPayload };

export interface VeterinarianUploadDialogProps extends UseVeterinarianUploadFormProps {
  open: boolean;
}

export const VeterinarianUploadDialog = ({
  open,
  onOpenChange,
  onUpload,
  defaultPetId = '',
  defaultPetName = '',
  defaultMedicalRecordId = '',
}: VeterinarianUploadDialogProps) => {
  const {
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
  } = useVeterinarianUploadForm({
    onUpload,
    onOpenChange,
    defaultPetId,
    defaultPetName,
    defaultMedicalRecordId,
  });

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 bg-card border-border shadow-2xl rounded-2xl">
        <div className="p-6 border-b border-border/60 bg-muted/20">
          <DialogHeader className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                <FileUp className="size-5" />
              </div>
              <DialogTitle className="text-xl font-bold">Subir Documento Veterinario</DialogTitle>
            </div>
            <DialogDescription className="text-sm text-muted-foreground">
              Arrastra un archivo PDF directamente o toma fotos con tu cámara/periférico para convertirlas automáticamente en un PDF clínico.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Metadata Form Section */}
          <DocumentMetadataFields
            title={title}
            onTitleChange={setTitle}
            category={category}
            onCategoryChange={setCategory}
            selectedPetId={selectedPetId}
            onPetChange={handlePetChange}
            petsOptions={petsOptions}
            isLoadingPets={isLoadingPets}
            selectedMedicalRecordId={selectedMedicalRecordId}
            onMedicalRecordChange={handleMedicalRecordChange}
            medicalRecords={medicalRecords}
            isLoadingRecords={isLoadingRecords}
            disabled={isSubmitting}
          />

          {/* Visibility Switch */}
          <OwnerVisibilitySwitch
            checked={ownerReadable}
            onCheckedChange={setOwnerReadable}
            disabled={isSubmitting}
          />

          {/* File Source Tabs */}
          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Origen del Archivo <span className="text-destructive">*</span>
            </Label>
            <Tabs
              value={activeTab}
              onValueChange={(val) => setActiveTab(val as 'file' | 'camera')}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 w-full h-11 p-1 bg-muted/60">
                <TabsTrigger
                  value="file"
                  className="gap-2 cursor-pointer font-medium data-[state=active]:shadow-xs"
                >
                  <FileText className="size-4" />
                  <span>Arrastrar Archivo / PDF</span>
                </TabsTrigger>
                <TabsTrigger
                  value="camera"
                  className="gap-2 cursor-pointer font-medium data-[state=active]:shadow-xs"
                >
                  <Camera className="size-4" />
                  <span>Fotos a PDF (Cámara)</span>
                </TabsTrigger>
              </TabsList>

              <div className="mt-4">
                <TabsContent value="file" className="m-0 focus-visible:ring-0">
                  <DocumentDropzone
                    selectedFile={directFile}
                    onFileSelect={(file) => setDirectFile(file)}
                    onFileRemove={() => setDirectFile(null)}
                    onImagesDropped={handleImagesDropped}
                    disabled={isSubmitting}
                  />
                </TabsContent>

                <TabsContent value="camera" className="m-0 focus-visible:ring-0">
                  <PhotosToPdfCapture
                    initialImages={pendingPhotos}
                    documentTitle={title || 'documento_clinico'}
                    onPdfReady={(pdf) => setCompiledPdfFile(pdf)}
                    disabled={isSubmitting}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Selected File Summary Banner */}
          {currentFile && (
            <UploadFilePreview
              file={currentFile}
              petName={petName}
              ownerReadable={ownerReadable}
            />
          )}

          {/* Dialog Action Buttons */}
          <DialogFooter className="flex flex-col-reverse sm:flex-row items-center gap-2 pt-4 border-t border-border/60">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={isSubmitting}
              className="w-full sm:w-auto cursor-pointer"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting || !title.trim() || !currentFile}
              className="w-full sm:w-auto gap-2 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Subiendo documento...
                </>
              ) : (
                <>
                  <FileUp className="size-4" />
                  Subir Documento
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
