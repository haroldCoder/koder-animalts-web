import { CreateMedicalRecordDto } from "../../domain/dtos";
import { IMedicalRecordRepository } from "../../domain/repositories";

export class ScheduleMedicalRecordUseCase {
    constructor(private readonly medicalRecordRepository: IMedicalRecordRepository) { }

    async execute(medicalRecord: CreateMedicalRecordDto): Promise<void> {
        try {
            const { petId, userId, type, reasonForVisit, visitDate } = medicalRecord;

            if (!petId) throw new Error("La mascota es requerida");
            if (!userId) throw new Error("El usuario es requerido");
            if (!type) throw new Error("El tipo de cita es requerido");
            if (!reasonForVisit) throw new Error("El motivo de la visita es requerido");
            if (!visitDate) throw new Error("La fecha de la visita es requerida");

            return await this.medicalRecordRepository.createAppointment(medicalRecord);
        } catch (error) {
            console.error('Error in ScheduleMedicalRecordUseCase:', error);
            throw error;
        }
    }
}
