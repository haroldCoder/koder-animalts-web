import { MedicalRecordEntity } from "../../domain/entities";
import { IMedicalRecordRepository } from "../../domain/repositories/medical-record.respository";

export class GetMedicalRecordsByUserIdUseCase {
    constructor(private readonly medicalRecordRepository: IMedicalRecordRepository) { }

    async execute(userId: string, petId?: string, startDate?: string, endDate?: string, medicalRecordId?: string): Promise<MedicalRecordEntity[]> {
        const medicalRecords = await this.medicalRecordRepository.findByUserId(userId, petId, startDate, endDate, medicalRecordId);

        return medicalRecords
    }
}
