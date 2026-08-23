import { apiClient } from "@/common";
import { MedicalRecordEntity } from "../../domain/entities";
import { IMedicalRecordRepository } from "../../domain/repositories";
import { MedicalRecordResponseDto } from "../dtos";
import { ApiResponseToDomain } from "../mappers";
import { CreateMedicalRecordDto } from "../../domain/dtos";

export class HttpMedicalRecordRepository implements IMedicalRecordRepository {
    async findByUserId(userId: string, petId?: string, startDate?: string, endDate?: string, medicalRecordId?: string): Promise<MedicalRecordEntity[]> {
        try {
            const queryParams = new URLSearchParams();
            if (petId) queryParams.append('petId', petId);
            if (startDate) queryParams.append('startDate', startDate);
            if (endDate) queryParams.append('endDate', endDate);
            if (medicalRecordId) queryParams.append('medicalRecordId', medicalRecordId);

            const queryString = queryParams.toString();
            const url = `/medical-record/pet/userId/${userId}${queryString ? `?${queryString}` : ''}`;

            const response = await apiClient.get<MedicalRecordResponseDto>(url);

            return ApiResponseToDomain.toMedicalRecordEntityData(response);

        } catch (error) {
            console.error('Error fetching medical records by userId:', error);
            throw error;
        }
    }

    async createAppointment(medicalRecord: CreateMedicalRecordDto): Promise<void> {
        try {
            await apiClient.post<void>(
                '/medical-record/register',
                {
                    body: medicalRecord
                }
            );
        } catch (error) {
            console.error('Error creating/scheduling medical record:', error);
            throw error;
        }
    }

    async uploadDocuments(medicalRecordId: string, files: File[]): Promise<void> {
        try {
            const formData = new FormData();

            for (const file of files) {
                const buffer = await file.arrayBuffer();

                const copiedFile = new File(
                    [buffer],
                    file.name,
                    {
                        type: file.type,
                        lastModified: Date.now(),
                    },
                );

                formData.append('files', copiedFile);
            }

            await apiClient.put<void>(
                `/medical-record/upload-documents/${medicalRecordId}`,
                {
                    body: formData
                }
            );
        } catch (error) {
            console.error('Error uploading medical record files:', error);
            throw error;
        }
    }
}
