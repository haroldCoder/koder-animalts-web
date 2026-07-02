export interface VaccinationEntity {
    id: string;
    name: string;
    date: Date | string;
    nextDate: Date | string;
    iotNumber: string;
    medicalRecordName: string
    petName: string
}