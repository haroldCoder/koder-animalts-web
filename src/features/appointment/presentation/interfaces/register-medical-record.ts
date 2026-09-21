import { MedicalRecordEntity } from "@/features/medical-record/domain/entities";

export interface RegisterMedicalRecord {
    visitDate: MedicalRecordEntity['date'];
    petId: MedicalRecordEntity['petId'];
    reason: MedicalRecordEntity['reasonForVisit'];
    veterinarianId: MedicalRecordEntity['veterinaryId'];
    notes?: MedicalRecordEntity['notes'];
}