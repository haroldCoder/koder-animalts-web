import { apiClient } from "@/common";
import { PetEntity } from "../../domain/entities";
import { IPetRepository } from "../../domain/repositories";
import { PetResponseEntity } from "../entities";
import { ApiResponseToDomain } from "../mappers";

export class HttpPetRepository implements IPetRepository {
    async findByOwnerUserId(userId: string): Promise<PetEntity[]> {
        try {
            const response = await apiClient.get<PetResponseEntity>(
                `/pet/owner/userId/${userId}`
            );

            return ApiResponseToDomain.toPetEntityData(response);
        } catch (error) {
            console.error('Error fetching pets by userId:', error);
            throw error;
        }
    }

    async searchPetByVeterinarianUserId(userId: string, petName?: string, ownerName?: string): Promise<PetEntity[]> {
        try {
            const response = await apiClient.get<PetResponseEntity>(
                `/pet/veterinarian/userId/${userId}?petName=${petName}&ownerName=${ownerName}`
            );

            return ApiResponseToDomain.toPetEntityData(response);
        } catch (error) {
            console.error('Error fetching pets by veterinarian userId:', error);
            throw error;
        }
    }
}
