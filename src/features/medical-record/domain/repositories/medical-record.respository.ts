import { CreateMedicalRecordDto } from "../dtos";
import { MedicalRecordEntity } from "../entities";

export interface IMedicalRecordRepository {
    findByUserId(userId: string, petId?: string, startDate?: string, endDate?: string): Promise<MedicalRecordEntity[]>;
    createAppointment(appointment: CreateMedicalRecordDto): Promise<void>;
    uploadDocuments(id: string, files: File[]): Promise<void>;
}