import { apiClient } from "@/common";
import { ClinicEntity, ClinicSummaryEntity, VeterinarianEntity } from "../../domain/entities";
import { IClinicRepository } from "../../domain/repositories";
import { ClinicResponseEntity, ClinicSummaryResponseEntity, VeterinariansResponseEntity } from "../entities";

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

    async summaryClinic(userId: string): Promise<ClinicSummaryEntity> {
        try {
            const response = await apiClient.get<ClinicSummaryResponseEntity>(`/veterinary-clinics/summary/veterinarian/userId/${userId}`);

            return {
                totalOwners: response.data.totalUsers,
                totalPets: response.data.totalPets,
                clinicName: response.data.clinicName
            };
        } catch (error) {
            console.error('Error fetching summary clinic:', error);
            throw error;
        }
    }

    async getAllVeterinariansOfClinic(clinicId: string): Promise<VeterinarianEntity[]> {
        try {
            const response = await apiClient.get<VeterinariansResponseEntity>(`/veterinary-clinics/all/veterinarians/${clinicId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching veterinarians of clinic:', error);
            throw error;
        }
    }
}

