import { PetEntity } from "@/features/pet/domain/entities";
import { PetOption } from "@/common/presentation/components/pet-selector";
export class PetPresentationMapper {
    static toOption(pet: PetEntity): PetOption {
        return {
            value: pet.id,
            label: pet.name,
            image: pet.image,
        };
    }
    static toOptions(pets?: PetEntity[]): PetOption[] {
        if (!pets) return [];
        return pets.map(this.toOption);
    }
}
