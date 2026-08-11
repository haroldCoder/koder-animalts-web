import { AppointmentEntity } from '../entities';
import { CreateAppointmentDto } from '../dtos';

export interface IAppointmentRepository {
    findByUserId(userId: string): Promise<AppointmentEntity[]>;
    createAppointment(appointment: CreateAppointmentDto): Promise<void>;
}
