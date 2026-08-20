import { CreateVaccinationEntity } from "../../domain/entities";
import { VaccinationsRepository } from "../../domain/repositories";

export class RegisterVaccinationUseCase {
    constructor(private readonly repository: VaccinationsRepository) {}

    async execute(vaccination: CreateVaccinationEntity): Promise<void> {
        return this.repository.register(vaccination);
    }
}
