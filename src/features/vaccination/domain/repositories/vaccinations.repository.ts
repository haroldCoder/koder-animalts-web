import { CreateVaccinationEntity, QueriesVaccinationEntity, VaccinationEntity } from "../entities";
import { VaccinationStatus } from "../enums";

export interface VaccinationsRepository {
    findAllByUserId(userId: string, queries: QueriesVaccinationEntity): Promise<VaccinationEntity[]>;
    register(vaccination: CreateVaccinationEntity): Promise<void>;
    updateStatus(id: string, vaccination: VaccinationStatus): Promise<void>;
    findById(id: string): Promise<VaccinationEntity | null>;
}