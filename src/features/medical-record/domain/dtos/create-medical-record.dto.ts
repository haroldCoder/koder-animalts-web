import { ConsultationType } from "../enums";

export interface CreateMedicalRecordDto {
    petId: string;
    userId: string;
    type: ConsultationType | string;
    reasonForVisit: string;
    visitDate: Date | string;
    notes?: string;
    diagnosis?: string;
    treatment?: string;
}
