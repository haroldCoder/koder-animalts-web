import { Controller } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { HoverAvatar } from "./hover-avatar"

export interface PetOption {
    value: string;
    label: string;
    image?: string;
}

export interface PetSelectorProps {
    control?: any;
    errors?: any;
    petsOptions: PetOption[];
    isLoadingPets: boolean;
    disabled?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    name?: string;
    required?: boolean;
    label?: string;
    placeholder?: string;
    allowClear?: boolean;
}

export const PetSelector = ({
    control,
    errors,
    petsOptions,
    isLoadingPets,
    disabled,
    value,
    onChange: directOnChange,
    name = "petId",
    required = true,
    label = "Mascota Paciente",
    placeholder,
    allowClear = false,
}: PetSelectorProps) => {
    const defaultPlaceholder = isLoadingPets
        ? "Cargando mascotas..."
        : placeholder || (required ? "Selecciona el paciente" : "Selecciona un paciente (opcional)");

    const renderSelect = (currentValue?: string, onValueChange?: (val: string) => void) => (
        <Select
            items={petsOptions}
            onValueChange={(val: string | null) => {
                const nextVal = !val || val === "none" ? "" : val;
                onValueChange?.(nextVal);
            }}
            value={currentValue === "" ? "none" : currentValue}
            disabled={disabled}
        >
            <SelectTrigger className="h-10 cursor-pointer w-full">
                <SelectValue placeholder={defaultPlaceholder} />
            </SelectTrigger>
            <SelectContent>
                {isLoadingPets ? (
                    <div className="flex items-center justify-center p-4">
                        <Spinner className="size-4 mr-2" />
                        <span className="text-sm text-muted-foreground">Buscando pacientes...</span>
                    </div>
                ) : petsOptions.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                        No hay mascotas registradas en tu clínica.
                    </div>
                ) : (
                    <>
                        {allowClear && (
                            <SelectItem value="none">
                                <span className="text-muted-foreground italic">Ninguno (Sin mascota)</span>
                            </SelectItem>
                        )}
                        {petsOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                <div className="flex items-center gap-2 w-full">
                                    <HoverAvatar src={opt.image} name={opt.label} />
                                    <span className="truncate">{opt.label}</span>
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
                {label} {required && <span className="text-destructive">*</span>}
            </label>

            {control ? (
                <Controller
                    disabled={disabled}
                    control={control}
                    defaultValue={value}
                    name={name}
                    rules={{ required: required ? "Debes seleccionar un paciente" : false }}
                    render={({ field: { onChange, value: fieldValue } }) =>
                        renderSelect(fieldValue, onChange)
                    }
                />
            ) : (
                renderSelect(value, directOnChange)
            )}

            {errors?.[name] && (
                <span className="text-xs text-destructive">
                    {errors[name]?.message || "Debes seleccionar un paciente"}
                </span>
            )}
        </div>
    );
};