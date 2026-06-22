import { ConsultationType } from "../enums";

export interface AppointmentEntity {
    id: string,
    reasonForVisit: string,
    date: Date,
    notes: string | null,
    type: ConsultationType,
    clinicName: string,
    petName: string,
    veterinaryName: string,
    petPhoto: string,
    ownerName?: string
}