import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ConsultationTypeSelectorProps {
    value: string | null;
    onChange: (value: string | null) => void;
    disabled?: boolean;
    consultationTypeOptions: { value: string, label: string }[];
}

export const ConsultationTypeSelector = ({
    value,
    onChange,
    disabled,
    consultationTypeOptions
}: ConsultationTypeSelectorProps) => {
    return (
        <div onClick={(e) => e.stopPropagation()} className="w-full">
            <Select
                disabled={disabled}
                items={consultationTypeOptions}
                onValueChange={onChange}
                value={value}
            >
                <SelectTrigger className="h-10 w-full cursor-pointer">
                    <SelectValue placeholder="Selecciona tipo de cita" />
                </SelectTrigger>
                <SelectContent>
                    {consultationTypeOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};