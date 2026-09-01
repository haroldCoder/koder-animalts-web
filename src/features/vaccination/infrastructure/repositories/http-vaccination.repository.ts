import { CreateVaccinationEntity, QueriesVaccinationEntity, VaccinationEntity } from "../../domain/entities";
import { VaccinationsRepository } from "../../domain/repositories";
import { apiClient } from "@/common/infrastructure/http/api-client";
import { ResponseVaccinationDto, ResponseVaccinationsDto } from "../dtos";
import { VaccinationMapper } from "../mappers";
import { VaccinationStatus } from "../../domain/enums";

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
        if (rest.startDate) {
            params.append("startDate", rest.startDate.toString());
        }
        if (rest.endDate) {
            params.append("endDate", rest.endDate.toString());
        }
        if (rest.petId) {
            params.append("petId", rest.petId);
        }
        if (rest.status && rest.status.length > 0) {
            params.append("status", rest.status.join(","));
        }

        const response = await apiClient.get<ResponseVaccinationsDto>(`/vaccination/user/${userId}`, { params: Object.fromEntries(params) });

        return response.data.map(VaccinationMapper.toDomain);
    }

    async register(vaccination: CreateVaccinationEntity): Promise<void> {
        await apiClient.post("/vaccination/register", {
            body: vaccination
        });
    }

    async updateStatus(id: string, status: VaccinationStatus): Promise<void> {
        await apiClient.put(`/vaccination/status/${id}`, {
            body: { status }
        })
    }

    async findById(id: string): Promise<VaccinationEntity | null> {
        const response = await apiClient.get<ResponseVaccinationDto>(`/vaccination/${id}`);
        return VaccinationMapper.toDomainOne(response.data);
    }
}