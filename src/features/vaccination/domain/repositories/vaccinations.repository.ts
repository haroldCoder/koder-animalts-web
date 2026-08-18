import { QueriesVaccinationEntity, VaccinationEntity } from "../entities";

export interface VaccinationsRepository {
    findAllByUserId(userId: string, queries: QueriesVaccinationEntity): Promise<VaccinationEntity[]>;
}