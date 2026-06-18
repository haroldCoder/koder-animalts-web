import { apiClient } from "@/common";
import { ISelectUserRepository } from "../../domain/repositories";

export class HttpSelectUserRepository implements ISelectUserRepository {

    async selectOwner(userId: string, phone: string, address: string): Promise<void> {
        try {
            await apiClient.post("/owner/create", {
                body: {
                    userId,
                    phone,
                    address
                }
            })
        } catch (error) {
            console.error('Error selecting owner:', error);
            throw error;
        }
    }

    async selectVeterinary(userId: string, clinicId: string, phone: string, speciality?: string): Promise<void> {
        try {
            await apiClient.post("/veterinarian/create", {
                body: {
                    userId,
                    phone,
                    clinicId,
                    speciality
                }
            })
        } catch (error) {
            console.error('Error selecting veterinary:', error);
            throw error;
        }
    }
}