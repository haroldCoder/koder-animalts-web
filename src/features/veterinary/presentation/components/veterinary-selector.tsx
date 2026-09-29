import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { VeterinaryOption } from "../interfaces";
import { HoverAvatar } from "@/common/presentation/components/hover-avatar";

interface VeterinarySelectorProps {
    veterinariansOptions: VeterinaryOption[];
    isLoading: boolean;
    onValueChange: (value: string | null) => void;
    value?: string | null;
    disabled?: boolean;
}


export const VeterinarySelector = ({ veterinariansOptions, isLoading, onValueChange, value, disabled }: VeterinarySelectorProps) => {
    return (
        <Select items={veterinariansOptions} onValueChange={onValueChange} value={value ?? undefined} disabled={disabled}>

            <SelectTrigger>
                <SelectValue placeholder="Seleccionar veterinario" />
            </SelectTrigger>
            <SelectContent>
                {isLoading ? (
                    <SelectItem value="loading">
                        <Spinner className="size-5 text-main" />
                    </SelectItem>
                ) : veterinariansOptions.length === 0 ? (
                    <SelectItem value="empty">
                        No hay veterinarios disponibles.
                    </SelectItem>
                ) : (
                    veterinariansOptions.map((veterinarian) => (
                        <SelectItem key={veterinarian.value} value={veterinarian.value}>
                            <div className="flex items-center gap-2">
                                <HoverAvatar src={veterinarian.image} name={veterinarian.label} />
                                <span>{veterinarian.label}</span>
                            </div>
                        </SelectItem>
                    ))
                )}
            </SelectContent>
        </Select>
    );
};