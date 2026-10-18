import { Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { ClipboardList, Calendar } from 'lucide-react';
import { MedicalRecordEntity } from '@/features/medical-record/domain/entities';
import { FormatDate } from '@/common/utils';

export interface MedicalRecordOption {
  value: string;
  label: string;
  petName?: string;
  date?: Date | string;
  type?: string;
}

export interface MedicalRecordSelectorProps {
  control?: any;
  errors?: any;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  medicalRecords?: MedicalRecordEntity[];
  recordsOptions?: MedicalRecordOption[];
  isLoading?: boolean;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  placeholder?: string;
  allowClear?: boolean;
  selectedPetId?: string;
}

export const MedicalRecordSelector = ({
  control,
  errors,
  name = 'medicalRecordId',
  value,
  onChange: directOnChange,
  medicalRecords,
  recordsOptions,
  isLoading = false,
  disabled = false,
  required = false,
  label = 'Historial Médico',
  placeholder,
  allowClear = true,
  selectedPetId,
}: MedicalRecordSelectorProps) => {
  const options: MedicalRecordOption[] = recordsOptions ?? (
    medicalRecords
      ? medicalRecords
        .filter((rec) => (!selectedPetId ? true : rec.petId === selectedPetId))
        .map((rec) => {
          const dateStr = rec.date ? FormatDate.onlyDate(rec.date) || '' : '';
          const title = rec.reasonForVisit || rec.type || 'Consulta médica';
          const petInfo = rec.petName ? ` • ${rec.petName}` : '';
          return {
            value: rec.id,
            label: `${title}${dateStr ? ` (${dateStr})` : ''}${petInfo}`,
            petName: rec.petName,
            date: rec.date,
            type: rec.type,
          };
        })
      : []
  );

  const defaultPlaceholder = placeholder || (required ? 'Selecciona un historial' : 'Selecciona un historial médico (opcional)');

  const renderSelect = (currentValue?: string, onValueChange?: (val: string) => void) => (
    <Select
      items={options}
      onValueChange={(val: string | null) => {
        const nextVal = !val || val === 'none' ? '' : val;
        onValueChange?.(nextVal);
      }}
      value={currentValue === '' ? 'Selecciona un historial médico' : currentValue}
      disabled={disabled || isLoading}
    >
      <SelectTrigger className="h-10 cursor-pointer w-full">
        {
          isLoading ?
            <Spinner className="size-4" />
            :
            <SelectValue placeholder={defaultPlaceholder} />
        }
      </SelectTrigger>
      <SelectContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Spinner className="size-4 mr-2" />
            <span className="text-sm text-muted-foreground">Buscando historiales médicos...</span>
          </div>
        ) : options.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            {selectedPetId
              ? 'No hay historiales médicos registrados para esta mascota.'
              : 'No hay historiales médicos disponibles.'}
          </div>
        ) : (
          <>
            {allowClear && (
              <SelectItem value="none">
                <span className="text-muted-foreground italic">Ninguno (Sin historial médico)</span>
              </SelectItem>
            )}
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                <div className="flex items-center gap-2.5 w-full text-left">
                  <div className="p-1 rounded bg-primary/10 text-primary shrink-0">
                    <ClipboardList className="size-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{opt.label}</p>
                    {opt.date && (
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Calendar className="size-3" />
                        {FormatDate.onlyDate(opt.date)}
                        {opt.type ? ` • ${opt.type}` : ''}
                      </p>
                    )}
                  </div>
                </div>
              </SelectItem>
            ))}
          </>
        )}
      </SelectContent>
    </Select>
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-1.5">
        <ClipboardList className="size-4 text-primary" />
        {label} {required && <span className="text-destructive">*</span>}
      </label>

      {control ? (
        <Controller
          disabled={disabled}
          control={control}
          defaultValue={value}
          name={name}
          rules={{ required: required ? 'Debes seleccionar un historial médico' : false }}
          render={({ field: { onChange, value: fieldValue } }) =>
            renderSelect(fieldValue, onChange)
          }
        />
      ) : (
        renderSelect(value, directOnChange)
      )}

      {errors?.[name] && (
        <span className="text-xs text-destructive">
          {errors[name]?.message || 'Debes seleccionar un historial médico'}
        </span>
      )}
    </div>
  );
};
