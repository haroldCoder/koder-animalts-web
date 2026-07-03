import { QueriesVaccinationEntity, VaccinationEntity } from "../../domain/entities";
import { VaccinationsRepository } from "../../domain/repositories";
import { apiClient } from "@/common/infrastructure/http/api-client";
import { ResponseVaccinationDto } from "../dtos";

export class HttpVaccinationRepository implements VaccinationsRepository {
    async findAllByUserId(userId: string, queries: QueriesVaccinationEntity): Promise<VaccinationEntity[]> {
        const { page, limit, ...rest } = queries;
        const params = new URLSearchParams();

        if (page) {
            params.append("page", page.toString());
        }
        if (limit) {
            params.append("limit", limit.toString());
        }
        if (rest.medicalRecordId) {
            params.append("medicalRecordId", rest.medicalRecordId);
        }
        const response = await apiClient.get<ResponseVaccinationDto>(`/vaccination/user/${userId}`, { params: Object.fromEntries(params) });

        return response.data.map((vaccination) => ({
            id: vaccination.id,
            lotNumber: vaccination.lotNumber,
            medicalRecordId: vaccination.medicalRecordId,
            petName: vaccination.medicalRecord.pet.name,
            name: vaccination.vaccineName,
            date: vaccination.dateAdministered,
            nextDate: vaccination.nextDueDate,
        }))
    }
}