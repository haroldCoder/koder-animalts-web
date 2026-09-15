import { IPetRepository } from "../../domain/repositories";

export class UpdateClinicUseCase {
    constructor(private readonly petRepository: IPetRepository) { }

    async execute(petId: string, clinicId: string): Promise<void> {
        try {
            if (!petId) throw new Error("ID de la mascota es requerido");
            if (!clinicId) throw new Error("ID de la clínica es requerido");

            return await this.petRepository.updateClinic(petId, clinicId);
        } catch (error) {
            console.error('Error updating clinic in use case:', error);
            throw error;
        }
    }
}
