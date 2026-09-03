import { VaccinationEntity } from "../../domain/entities";
import { FindAllVaccinationDto } from "../../domain/repositories";
import { ResponseVaccinationsDto } from "../dtos";
import { ResponseVaccinationDto } from "../dtos/response-vaccination.dto";

export class VaccinationMapper {
    static toDomain(dto: ResponseVaccinationsDto): FindAllVaccinationDto {
        return {
            vaccinations: dto.data.map((vaccine) => ({
                id: vaccine.id,
                lotNumber: vaccine.lotNumber,
                medicalRecordId: vaccine.medicalRecordId,
                petName: vaccine.medicalRecord.pet.name,
                status: vaccine.status,
                name: vaccine.vaccineName,
                date: vaccine.dateAdministered,
                nextDate: vaccine.nextDueDate,
            })),
            pagination: dto.pagination
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
