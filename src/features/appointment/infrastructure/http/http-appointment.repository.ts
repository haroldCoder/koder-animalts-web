import { apiClient } from '@/common';
import { IAppointmentRepository } from '../../domain/repositories';
import { AppointmentDataDto, CreateAppointmentDto } from '../../domain/dtos';
import { AppointmentResponseDto } from '../dtos';
import { ApiResponseToDomain } from '../mappers';

export class HttpAppointmentRepository implements IAppointmentRepository {
    async findByUserId(userId: string): Promise<AppointmentDataDto[]> {
        try {
            const response = await apiClient.get<AppointmentResponseDto>(
                `/appointment/user/${userId}`
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
