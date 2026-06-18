import { ClinicEntity } from "../../domain/entities";
import { IClinicRepository } from "../../domain/repositories";

export class GetAllClinicsUseCase {
    constructor(private clinicRepository: IClinicRepository) { }

    async execute(): Promise<ClinicEntity[]> {
        return this.clinicRepository.getAllClinics();
    }
}
