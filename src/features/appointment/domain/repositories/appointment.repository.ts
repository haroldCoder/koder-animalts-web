import { AppointmentDataDto, CreateAppointmentDto } from '../dtos';

export interface IAppointmentRepository {
    findByUserId(userId: string): Promise<AppointmentDataDto[]>;
    createAppointment(appointment: CreateAppointmentDto): Promise<void>;
    updateStatus(id: string, status: string): Promise<void>;
}
