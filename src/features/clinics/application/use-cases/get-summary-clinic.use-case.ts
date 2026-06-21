import { ClinicSummaryEntity } from "../../domain/entities";
import { IClinicRepository } from "../../domain/repositories";

export class GetSummaryClinicUseCase {
    constructor(
        private readonly clinicRepository: IClinicRepository,
    ) { }

    async execute(userId: string): Promise<ClinicSummaryEntity> {
        return this.clinicRepository.summaryClinic(userId);
    }
}