import { PetEntity } from "../../domain/entities";
import { IPetRepository } from "../../domain/repositories";

export class GetPetsByOwnerUserIdUseCase {
    constructor(private readonly petRepository: IPetRepository) {}

    async execute(userId: string): Promise<PetEntity[]> {
        return this.petRepository.findByOwnerUserId(userId);
    }
}
