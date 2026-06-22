import { AppointmentEntity } from "../../domain/entities";
import { IAppointmentRepository } from "../../domain/repositories";

export class GetAppointmentsByUserIdUseCase {
    constructor(private readonly appointmentRepository: IAppointmentRepository) {}

    async execute(userId: string): Promise<AppointmentEntity[]> {
        return this.appointmentRepository.findByUserId(userId);
    }
}
