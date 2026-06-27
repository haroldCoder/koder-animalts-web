import { apiClient } from "@/common";
import { AppointmentEntity } from "../../domain/entities";
import { IAppointmentRepository } from "../../domain/repositories";
import { AppointmentResponseEntity } from "../dtos";
import { ApiResponseToDomain } from "../mappers";

export class HttpAppointmentRepository implements IAppointmentRepository {
    async findByUserId(userId: string): Promise<AppointmentEntity[]> {
        try {
            const response = await apiClient.get<AppointmentResponseEntity>(
                `/medical-record/pet/userId/${userId}`
            );

            return ApiResponseToDomain.toAppointmentEntityData(response);

        } catch (error) {
            console.error('Error fetching appointments by userId:', error);
            throw error;
        }
    }
}
