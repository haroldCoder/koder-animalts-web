import { IPetRepository } from "../../domain/repositories";
import { PetEntity } from "../../domain/entities";

export class GetPetsByVeterinaryUserIdUseCase {
    constructor(
        private readonly petRepository: IPetRepository
    ) { }

    execute(userId: string): Promise<PetEntity[]> {
        return this.petRepository.findByVeterinarianUserId(userId);
    }
}