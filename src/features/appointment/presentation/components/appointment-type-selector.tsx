import { Control, FieldErrors, Controller } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { appointmentTypeOptions } from '../constants/appoinment-type-options';
import { ScheduleAppointmentFormValues } from '../interfaces';

interface AppointmentTypeSelectorProps {
    control: Control<ScheduleAppointmentFormValues>;
    errors: FieldErrors<ScheduleAppointmentFormValues>;
}


export const AppointmentTypeSelector = ({ control, errors }: AppointmentTypeSelectorProps) => {
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
                    <Select
                        items={appointmentTypeOptions}
                        onValueChange={onChange}
                        value={value}
                    >
                        <SelectTrigger className="h-10 cursor-pointer">
                            <SelectValue placeholder="Selecciona tipo de cita" />
                        </SelectTrigger>
                        <SelectContent>
                            {appointmentTypeOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            {errors.type && (
                <span className="text-xs text-destructive">Debes seleccionar un tipo de cita</span>
            )}
        </div>
    )
}
