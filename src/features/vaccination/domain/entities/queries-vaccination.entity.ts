import { FindCriteriaQuery } from "@/common/interfaces";
import { VaccinationStatus } from "../enums";

export interface QueriesVaccinationEntity extends FindCriteriaQuery {
    medicalRecordId?: string;
    startDate?: Date;
    endDate?: Date;
    petId?: string;
    status?: VaccinationStatus[];
}
