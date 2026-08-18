import { VaccinationEntity } from "../../domain/entities";
import { ResponseVaccinationDto } from "../dtos";

export class VaccinationMapper {
    static toDomain(dto: ResponseVaccinationDto["data"][0]): VaccinationEntity {
        return {
            id: dto.id,
            lotNumber: dto.lotNumber,
            medicalRecordId: dto.medicalRecordId,
            petName: dto.medicalRecord.pet.name,
            name: dto.vaccineName,
            date: dto.dateAdministered,
            nextDate: dto.nextDueDate,
        };
    }
}
