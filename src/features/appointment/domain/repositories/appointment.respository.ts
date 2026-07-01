import { CreateAppointmentDto } from "../dtos";
import { AppointmentEntity } from "../entities";

export interface IAppointmentRepository {
    findByUserId(userId: string): Promise<AppointmentEntity[]>;
    createAppointment(appointment: CreateAppointmentDto): Promise<void>;
    uploadDocuments(id: string, files: File[]): Promise<void>;
}