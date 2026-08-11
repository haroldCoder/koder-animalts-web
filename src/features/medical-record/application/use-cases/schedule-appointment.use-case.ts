import { CreateAppointmentDto } from "../../domain/dtos";
import { IAppointmentRepository } from "../../domain/repositories";

export class ScheduleAppointmentUseCase {
    constructor(private readonly appointmentRepository: IAppointmentRepository) { }

    async execute(appointment: CreateAppointmentDto): Promise<void> {
        try {
            const { petId, userId, type, reasonForVisit, visitDate } = appointment;

            if (!petId) throw new Error("La mascota es requerida");
            if (!userId) throw new Error("El usuario es requerido");
            if (!type) throw new Error("El tipo de cita es requerido");
            if (!reasonForVisit) throw new Error("El motivo de la visita es requerido");
            if (!visitDate) throw new Error("La fecha de la visita es requerida");

            return await this.appointmentRepository.createAppointment(appointment);
        } catch (error) {
            console.error('Error in ScheduleAppointmentUseCase:', error);
            throw error;
        }
    }
}
