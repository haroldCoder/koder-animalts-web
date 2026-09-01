import { VaccinationStatus } from "../enums";

export interface QueriesVaccinationEntity {
    page?: number;
    limit?: number;
    medicalRecordId?: string;
    startDate?: Date;
    endDate?: Date;
    petId?: string;
    status?: VaccinationStatus[];
}
