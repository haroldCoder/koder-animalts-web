import { apiClient } from "@/common";
import { PetEntity } from "../../domain/entities";
import { IPetRepository } from "../../domain/repositories";
import { PetResponseEntity } from "../entities";
import { ApiResponseToDomain } from "../mappers";
import { CreatePetDto } from "../../domain/dtos";

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

    async createPet(pet: CreatePetDto): Promise<void> {
        try {
            const formData = new FormData();

            formData.append('name', pet.name);
            formData.append('species', pet.species);
            formData.append('isActive', String(pet.isActive));
            formData.append('userId', pet.userId);
            formData.append('clinicId', pet.clinicId);

            formData.append('mainImage', pet.mainImage);

            if (pet.birthdate) {
                const birthDateValue = pet.birthdate instanceof Date ? pet.birthdate.toISOString() : pet.birthdate;
                formData.append('birthDate', birthDateValue);
            }
            if (pet.breed) formData.append('breed', pet.breed);
            if (pet.gender) formData.append('gender', pet.gender);
            if (pet.weight !== undefined) formData.append('weight', String(pet.weight));
            if (pet.microchip) formData.append('microchip', pet.microchip);
            if (pet.color) formData.append('color', pet.color);

            if (pet.iaImage) formData.append('iaImage', pet.iaImage);

            if (pet.images && pet.images.length > 0) {
                pet.images.forEach(image => {
                    formData.append('images', image);
                });
            }

            await apiClient.post<PetResponseEntity>(
                '/pet/register',
                {
                    body: formData
                }
            );
        } catch (error) {
            console.error('Error creating pet:', error);
            throw error;
        }
    }
}
