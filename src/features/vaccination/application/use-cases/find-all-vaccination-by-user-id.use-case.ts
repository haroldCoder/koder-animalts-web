import { QueriesVaccinationEntity } from "../../domain/entities";
import { VaccinationsRepository } from "../../domain/repositories";

export class FindAllVaccinationByUserIdUseCase {
    constructor(private readonly vaccinationsRepository: VaccinationsRepository) { }

    async execute(userId: string, queries: QueriesVaccinationEntity) {
        return this.vaccinationsRepository.findAllByUserId(userId, queries);
    }
}