import { apiClient } from "@/common";
import { ClinicEntity } from "../../domain/entities";
import { IClinicRepository } from "../../domain/repositories";
import { ClinicResponseEntity } from "../entities/clinic-response.entity";

export class HttpClinicRepository implements IClinicRepository {
    async getAllClinics(): Promise<ClinicEntity[]> {
        try {
            const response = await apiClient.get<ClinicResponseEntity>("/veterinary-clinics/all");
            return response.data;
        } catch (error) {
            console.error('Error fetching clinics:', error);
            throw error;
        }
    }
}
