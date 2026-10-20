import { UpdatePetBackgroundDto } from "../../domain/dtos";
import { PetBackgroundEntity } from "../../domain/entities";
import { IPetBackgroundRepository } from "../../domain/repositories";

export class UpdatePetBackgroundUseCase {
    constructor(private readonly repository: IPetBackgroundRepository) {}

    async execute(dto: UpdatePetBackgroundDto): Promise<PetBackgroundEntity> {
        return this.repository.updateBackground(dto);
    }
}
