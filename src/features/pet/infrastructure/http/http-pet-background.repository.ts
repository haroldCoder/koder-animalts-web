import { apiClient } from "@/common";
import { IPetBackgroundRepository } from "../../domain/repositories";
import { PetBackgroundEntity } from "../../domain/entities";
import { UpdatePetBackgroundDto } from "../../domain/dtos";
import { PetBackgroundResponseEntity } from "../entities";
import { PetBackgroundMapper } from "../mappers";

export class HttpPetBackgroundRepository implements IPetBackgroundRepository {
    async getBackgroundByPetId(petId: string, userId?: string): Promise<PetBackgroundEntity | null> {
        try {
            const response = await apiClient.get<PetBackgroundResponseEntity>(
                `/pet/${petId}/background`,
                {
                    params: userId ? { userId } : undefined,
                }
            );

            if (!response || !response.data) {
                return null;
            }

            return PetBackgroundMapper.toDomain(response);
        } catch (error: any) {
            // Si no existe aún (404), retornamos null sin romper la UI
            if (error?.status === 404 || error?.statusCode === 404) {
                return null;
            }
            console.error("Error fetching pet background:", error);
            throw error;
        }
    }

    async updateBackground(dto: UpdatePetBackgroundDto): Promise<PetBackgroundEntity> {
        try {
            const body = {
                ...dto,
                dietType: dto.diet,
                otherPreventiveNotes: dto.otherVaccinesNotes,
                coreVaccines: {
                    canineVaccines: dto.canineVaccines || {},
                    felineVaccines: dto.felineVaccines || {},
                    deworming: dto.deworming || {},
                },
                lastDewormingInternal: dto.deworming?.lastInternalDewormingDate || undefined,
                lastDewormingExternal: dto.deworming?.lastExternalDewormingDate || undefined,
            };

            const response = await apiClient.put<PetBackgroundResponseEntity>(
                `/pet/${dto.petId}/background`,
                {
                    params: dto.userId ? { userId: dto.userId } : undefined,
                    body,
                }
            );

            return PetBackgroundMapper.toDomain(response);
        } catch (error) {
            console.error("Error updating pet background:", error);
            throw error;
        }
    }
}
