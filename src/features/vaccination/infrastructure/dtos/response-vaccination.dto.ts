import { VaccinationStatus } from "../../domain/enums";

export interface ResponseVaccinationDto {
    statusCode: number;
    data: {
        id: string;
        vaccineName: string;
        dateAdministered: string;
        nextDueDate: string;
        lotNumber: string;
        medicalRecordId: string;
        status: VaccinationStatus;
        createdAt: string;
        petName: string;
        veterinarianId: string;
    }
}