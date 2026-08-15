import { AppointmentDataDto } from '../../domain/dtos';
import { IAppointmentRepository } from '../../domain/repositories';

export class GetAppointmentsByUserIdUseCase {
    constructor(private readonly appointmentRepository: IAppointmentRepository) { }

    async execute(userId: string): Promise<AppointmentDataDto[]> {
        return await this.appointmentRepository.findByUserId(userId);
    }
}
