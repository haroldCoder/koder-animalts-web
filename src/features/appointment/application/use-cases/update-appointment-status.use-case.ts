import { IAppointmentRepository } from '../../domain/repositories';

export class UpdateAppointmentStatusUseCase {
    constructor(private readonly appointmentRepository: IAppointmentRepository) { }

    async execute(id: string, status: string): Promise<void> {
        if (!id) throw new Error('El id de la cita es requerido');
        if (!status) throw new Error('El estado es requerido');

        return await this.appointmentRepository.updateStatus(id, status);
    }
}
