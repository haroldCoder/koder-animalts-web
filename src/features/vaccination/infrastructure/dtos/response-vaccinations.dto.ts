import { VaccinationStatus } from "../../domain/enums";

export interface ResponseVaccinationsDto {
    statusCode: number;
    data: Array<{
        id: string;
        vaccineName: string;
        dateAdministered: string;
        nextDueDate: string;
        lotNumber: string;
        status: VaccinationStatus;
        createdAt: string;
        medicalRecordId: string;
        medicalRecord: {
            pet: {
                name: string;
            }
        },
        veterinarian: {
            id: string;
            name: string;
        }
    }>
}