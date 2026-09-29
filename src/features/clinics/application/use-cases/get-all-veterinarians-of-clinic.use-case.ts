import { VeterinarianEntity } from "../../domain/entities";
import { IClinicRepository } from "../../domain/repositories";

export class GetAllVeterinariansOfClinicUseCase {
    constructor(private clinicRepository: IClinicRepository) { }

    async execute(clinicId: string): Promise<VeterinarianEntity[]> {
        return this.clinicRepository.getAllVeterinariansOfClinic(clinicId);
    }
}
