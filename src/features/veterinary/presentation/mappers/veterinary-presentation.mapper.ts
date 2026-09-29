import { VeterinarianEntity } from "@/features/clinics/domain/entities";
import { VeterinaryOption } from "../interfaces";

export class VeterinaryPresentationMapper {
    static toOptions(veterinarians: VeterinarianEntity[] | undefined): VeterinaryOption[] {
        if (!veterinarians || veterinarians.length === 0) return [];
        return veterinarians.map((v) => ({
            label: v.name,
            value: v.id,
            image: v.image
        }));
    }
}