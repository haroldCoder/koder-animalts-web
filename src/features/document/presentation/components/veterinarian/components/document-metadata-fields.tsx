import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PetOption, PetSelector, MedicalRecordSelector } from '@/common/presentation/components';
import { CategoryDocument } from '@/features/document/domain/types';
import { MedicalRecordEntity } from '@/features/medical-record/domain/entities';

export interface DocumentMetadataFieldsProps {
  title: string;
  onTitleChange: (title: string) => void;
  category: CategoryDocument;
  onCategoryChange: (category: CategoryDocument) => void;
  selectedPetId: string;
  onPetChange: (petId: string) => void;
  petsOptions: PetOption[];
  isLoadingPets: boolean;
  selectedMedicalRecordId: string;
  onMedicalRecordChange: (recordId: string) => void;
  medicalRecords?: MedicalRecordEntity[];
  isLoadingRecords: boolean;
  disabled?: boolean;
}

export const DocumentMetadataFields = ({
  title,
  onTitleChange,
  category,
  onCategoryChange,
  selectedPetId,
  onPetChange,
  petsOptions,
  isLoadingPets,
  selectedMedicalRecordId,
  onMedicalRecordChange,
  medicalRecords,
  isLoadingRecords,
  disabled = false,
}: DocumentMetadataFieldsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2 sm:col-span-2">
        <Label
          htmlFor="doc-title"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Título del Documento <span className="text-destructive">*</span>
        </Label>
        <Input
          id="doc-title"
          placeholder="Ej. Resultados de Laboratorio - Radiografía de Tórax"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          required
          disabled={disabled}
          className="h-10"
        />
      </div>

      <div className="space-y-2 sm:col-span-2">
        <Label
          htmlFor="doc-category"
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Tipo / Categoría <span className="text-destructive">*</span>
        </Label>
        <Select
          value={category}
          onValueChange={(val) => onCategoryChange(val as CategoryDocument)}
          disabled={disabled}
        >
          <SelectTrigger id="doc-category" className="h-10 w-full cursor-pointer">
            <SelectValue placeholder="Selecciona la categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PDF">PDF Clínico</SelectItem>
            <SelectItem value="Receta">Receta Médica</SelectItem>
            <SelectItem value="Resultado">Resultado de Examen</SelectItem>
            <SelectItem value="Imagen">Imagen Médica / Radiografía</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Pet Selector (Optional) */}
      <div>
        <PetSelector
          petsOptions={petsOptions}
          isLoadingPets={isLoadingPets}
          value={selectedPetId}
          onChange={onPetChange}
          required={false}
          allowClear={true}
          label="Mascota Paciente (Opcional)"
          placeholder="Selecciona un paciente (opcional)"
          disabled={disabled}
        />
      </div>

      {/* Medical Record Selector (Optional) */}
      <div>
        <MedicalRecordSelector
          medicalRecords={medicalRecords}
          isLoading={isLoadingRecords}
          value={selectedMedicalRecordId}
          onChange={onMedicalRecordChange}
          selectedPetId={selectedPetId}
          required={false}
          allowClear={true}
          label="Historial Médico (Opcional)"
          placeholder="Selecciona un historial (opcional)"
          disabled={disabled}
        />
      </div>
    </div>
  );
};
