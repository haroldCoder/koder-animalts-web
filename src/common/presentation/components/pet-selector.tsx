import { Controller } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { HoverPetAvatar } from "./hover-pet-avatar"

interface PetSelectorProps {
    control: any;
    errors: any;
    petsOptions: { value: string; label: string; image?: string }[];
    isLoadingPets: boolean;
}

export const PetSelector = ({ control, errors, petsOptions, isLoadingPets }: PetSelectorProps) => {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1.5">
                Mascota Paciente <span className="text-destructive">*</span>
            </label>
            <Controller
                control={control}
                name="petId"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                    <Select
                        items={petsOptions}
                        onValueChange={onChange}
                        value={value}
                    >
                        <SelectTrigger className="h-10 cursor-pointer">
                            <SelectValue placeholder={isLoadingPets ? "Cargando mascotas..." : "Selecciona el paciente"} />
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
                                petsOptions.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        <div className="flex items-center gap-2 w-full">
                                            <HoverPetAvatar src={opt.image} name={opt.label} />
                                            <span className="truncate">{opt.label}</span>
                                        </div>
                                    </SelectItem>
                                ))
                            )}
                        </SelectContent>
                    </Select>
                )}
            />
            {errors.petId && (
                <span className="text-xs text-destructive">Debes seleccionar un paciente</span>
            )}
        </div>
    )
}