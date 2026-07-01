import { apiClient } from "@/common";
import { AppointmentEntity } from "../../domain/entities";
import { IAppointmentRepository } from "../../domain/repositories";
import { AppointmentResponseDto } from "../dtos";
import { ApiResponseToDomain } from "../mappers";
import { CreateAppointmentDto } from "../../domain/dtos";

export class HttpAppointmentRepository implements IAppointmentRepository {
    async findByUserId(userId: string): Promise<AppointmentEntity[]> {
        try {
            const response = await apiClient.get<AppointmentResponseDto>(
                `/medical-record/pet/userId/${userId}`
            );

            return ApiResponseToDomain.toAppointmentEntityData(response);

        } catch (error) {
            console.error('Error fetching appointments by userId:', error);
            throw error;
        }
    }

    async createAppointment(appointment: CreateAppointmentDto): Promise<void> {
        try {
            await apiClient.post<void>(
                '/medical-record/register',
                {
                    body: appointment
                }
            );
        } catch (error) {
            console.error('Error creating/scheduling appointment:', error);
            throw error;
        }
    }

    async uploadDocuments(medicalRecordId: string, files: File[]): Promise<void> {
        try {
            const formData = new FormData();
            files.forEach((file) => {
                formData.append("files", file);
            });

            await apiClient.put<void>(
                `/medical-record/upload-documents/${medicalRecordId}`,
                {
                    body: formData
                }
            );
        } catch (error) {
            console.error('Error uploading medical record documents:', error);
            throw error;
        }
    }
}
