import { Control, FieldErrors, Controller } from 'react-hook-form';
import { consultationTypeOptions } from '../constants';
import { ScheduleAppointmentFormValues } from '../interfaces';
import { ConsultationTypeSelector } from '@/common/presentation/components';

interface MedicalRecordTypeSelectorProps {
    control: Control<ScheduleAppointmentFormValues>;
    errors: FieldErrors<ScheduleAppointmentFormValues>;
}


export const MedicalRecordTypeSelector = ({ control, errors }: MedicalRecordTypeSelectorProps) => {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1.5">
                Tipo de Consulta <span className="text-destructive">*</span>
            </label>
            <Controller
                control={control}
                name="type"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                    <ConsultationTypeSelector
                        value={value}
                        onChange={onChange}
                        disabled={false}
                        consultationTypeOptions={consultationTypeOptions}
                    />
                )}
            />
            {errors.type && (
                <span className="text-xs text-destructive">Debes seleccionar un tipo de cita</span>
            )}
        </div>
    )
}
