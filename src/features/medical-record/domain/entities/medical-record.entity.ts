import { ConsultationType } from "../enums";

export interface MedicalRecordEntity {
    id: string,
    reasonForVisit: string,
    date: Date,
    notes?: string,
    diagnosis?: string,
    treatment?: string,
    type: ConsultationType,
    clinicName: string,
    petName: string,
    veterinaryName: string,
    petPhoto: string,
    ownerName?: string,
    clinicId: string,
    petId: string,
    veterinaryId: string,
    ownerId?: string
    documentIds?: string[]
}