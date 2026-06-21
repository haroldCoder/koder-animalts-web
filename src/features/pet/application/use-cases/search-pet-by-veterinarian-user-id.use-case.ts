import { PetEntity } from "../../domain/entities";
import { IPetRepository } from "../../domain/repositories";

export class SearchPetByVeterinarianUserIdUseCase {
    constructor(private readonly petRepository: IPetRepository) {}

    async execute(userId: string, petName?: string, ownerName?: string): Promise<PetEntity[]> {
        return this.petRepository.searchPetByVeterinarianUserId(userId, petName, ownerName);
    }
}
