import { CreateAppointmentDto } from '../../domain/dtos';
import { IAppointmentRepository } from '../../domain/repositories';

export class ScheduleAppointmentUseCase {
    constructor(private readonly appointmentRepository: IAppointmentRepository) { }

    async execute(appointment: CreateAppointmentDto): Promise<void> {
        const { petId, userId, date, reason } = appointment;

        if (!petId) throw new Error('La mascota es requerida');
        if (!userId) throw new Error('El usuario es requerido');
        if (!date) throw new Error('La fecha de la cita es requerida');
        if (!reason) throw new Error('El motivo de la cita es requerido');

        return await this.appointmentRepository.createAppointment(appointment);
    }
}
