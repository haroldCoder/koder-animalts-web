import { VaccinationStatus } from "../enums";

export interface VaccinationEntity {
    id: string;
    name: string;
    date: Date | string;
    nextDate?: Date | string;
    lotNumber?: string;
    status: VaccinationStatus;
    petName: string
    medicalRecordId: string
}