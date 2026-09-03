import { PaginationDto } from "@/common/interfaces";
import { CreateVaccinationEntity, QueriesVaccinationEntity, VaccinationEntity } from "../entities";
import { VaccinationStatus } from "../enums";

export interface FindAllVaccinationDto {
    vaccinations: VaccinationEntity[];
    pagination: PaginationDto;
}

export interface VaccinationsRepository {
    findAllByUserId(userId: string, queries: QueriesVaccinationEntity): Promise<FindAllVaccinationDto>;
    register(vaccination: CreateVaccinationEntity): Promise<void>;
    updateStatus(id: string, vaccination: VaccinationStatus): Promise<void>;
    findById(id: string): Promise<VaccinationEntity | null>;
}