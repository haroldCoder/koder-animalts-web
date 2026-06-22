import { AppointmentEntity } from "../entities";

export interface IAppointmentRepository {
    findByUserId(userId: string): Promise<AppointmentEntity[]>;
}