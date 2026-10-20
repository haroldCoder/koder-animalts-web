import { PetBackgroundEntity } from "../../domain/entities";
import { IPetBackgroundRepository } from "../../domain/repositories";

export class GetPetBackgroundUseCase {
    constructor(private readonly repository: IPetBackgroundRepository) {}

    async execute(petId: string, userId?: string): Promise<PetBackgroundEntity | null> {
        return this.repository.getBackgroundByPetId(petId, userId);
    }
}
