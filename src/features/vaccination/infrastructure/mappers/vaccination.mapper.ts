import { VaccinationEntity } from "../../domain/entities";
import { ResponseVaccinationsDto } from "../dtos";
import { ResponseVaccinationDto } from "../dtos/response-vaccination.dto";

export class VaccinationMapper {
    static toDomain(dto: ResponseVaccinationsDto["data"][0]): VaccinationEntity {
        return {
            id: dto.id,
            lotNumber: dto.lotNumber,
            medicalRecordId: dto.medicalRecordId,
            petName: dto.medicalRecord.pet.name,
            status: dto.status,
            name: dto.vaccineName,
            date: dto.dateAdministered,
            nextDate: dto.nextDueDate,
        };
    }

    static toDomainOne(dto: ResponseVaccinationDto["data"]): VaccinationEntity {
        return {
            id: dto.id,
            lotNumber: dto.lotNumber,
            medicalRecordId: dto.medicalRecordId,
            petName: dto.petName,
            status: dto.status,
            name: dto.vaccineName,
            date: dto.dateAdministered,
            nextDate: dto.nextDueDate,
        };
    }
}
