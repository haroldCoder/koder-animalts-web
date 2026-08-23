export interface CreateVaccinationEntity {
    vaccineName: string;
    medicalRecordId: string;
    dateAdministered: string;
    nextDueDate?: string;
    lotNumber?: string;
    userId: string;
}
