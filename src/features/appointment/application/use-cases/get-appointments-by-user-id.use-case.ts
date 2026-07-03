import { AppointmentEntity } from "../../domain/entities";
import { IAppointmentRepository } from "../../domain/repositories";

export class GetAppointmentsByUserIdUseCase {
    constructor(private readonly appointmentRepository: IAppointmentRepository) { }

    async execute(userId: string, medicalRecordId?: string): Promise<AppointmentEntity[]> {
        const appointments = await this.appointmentRepository.findByUserId(userId, medicalRecordId);

        return appointments
    }
}
