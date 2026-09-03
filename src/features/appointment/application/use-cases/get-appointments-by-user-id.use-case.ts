import { AppointmentDataDto } from '../../domain/dtos';
import { FindAppointmentsCriteria, IAppointmentRepository } from '../../domain/repositories';

export class GetAppointmentsByUserIdUseCase {
    constructor(private readonly appointmentRepository: IAppointmentRepository) { }

    async execute(userId: string, criteria?: FindAppointmentsCriteria): Promise<AppointmentDataDto[]> {
        return await this.appointmentRepository.findByUserId(userId, criteria);
    }
}
