import { apiClient } from '@/common';
import { FindAppointmentsCriteria, IAppointmentRepository } from '../../domain/repositories';
import { AppointmentDataDto, CreateAppointmentDto } from '../../domain/dtos';
import { AppointmentResponseDto } from '../dtos';
import { ApiResponseToDomain } from '../mappers';

export class HttpAppointmentRepository implements IAppointmentRepository {
    async findByUserId(userId: string, criteria?: FindAppointmentsCriteria): Promise<AppointmentDataDto[]> {
        try {
            const queryParams = new URLSearchParams();

            if (criteria?.startDate) {
                queryParams.append('startDate', criteria.startDate.toISOString());
            }

            if (criteria?.endDate) {
                queryParams.append('endDate', criteria.endDate.toISOString());
            }


            const response = await apiClient.get<AppointmentResponseDto>(
                `/appointment/user/${userId}?${queryParams.toString()}`
            );
            return ApiResponseToDomain.toAppointmentDataDto(response);
        } catch (error) {
            console.error('Error fetching appointments by userId:', error);
            throw error;
        }
    }

    async createAppointment(appointment: CreateAppointmentDto): Promise<void> {
        try {
            await apiClient.post<void>('/appointment/register', {
                body: appointment
            });
        } catch (error) {
            console.error('Error creating appointment:', error);
            throw error;
        }
    }

    async updateStatus(id: string, status: string): Promise<void> {
        try {
            await apiClient.put<void>(`/appointment/${id}/status`, {
                body: { status }
            });
        } catch (error) {
            console.error('Error updating appointment status:', error);
            throw error;
        }
    }
}
