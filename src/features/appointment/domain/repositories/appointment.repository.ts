import { AppointmentDataDto, CreateAppointmentDto } from '../dtos';
import { FindCriteriaQuery } from '@/common/interfaces';

export interface FindAppointmentsCriteria extends FindCriteriaQuery {
    startDate?: Date;
    endDate?: Date;
}

export interface IAppointmentRepository {
    findByUserId(userId: string, criteria?: FindAppointmentsCriteria): Promise<AppointmentDataDto[]>;
    createAppointment(appointment: CreateAppointmentDto): Promise<void>;
    updateStatus(id: string, status: string): Promise<void>;
}
