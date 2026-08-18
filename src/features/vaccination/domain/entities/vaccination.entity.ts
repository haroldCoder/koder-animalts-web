export interface VaccinationEntity {
    id: string;
    name: string;
    date: Date | string;
    nextDate?: Date | string;
    lotNumber?: string;
    petName: string
    medicalRecordId: string
}