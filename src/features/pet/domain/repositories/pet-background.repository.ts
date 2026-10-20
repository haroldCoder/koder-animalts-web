import { UpdatePetBackgroundDto } from "../dtos";
import { PetBackgroundEntity } from "../entities";

export interface IPetBackgroundRepository {
    getBackgroundByPetId(petId: string, userId?: string): Promise<PetBackgroundEntity | null>;
    updateBackground(dto: UpdatePetBackgroundDto): Promise<PetBackgroundEntity>;
}
