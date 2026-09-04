import { UserRole } from '@/features/user';
import { AppointmentEntity } from '../../domain/entities';
import { UpdateStatusPolicy } from '../../domain/policies';
import { IAppointmentRepository } from '../../domain/repositories';
import { AppointmentStatusEnum } from '../../domain/enums';

export class UpdateAppointmentStatusUseCase {
    constructor(private readonly appointmentRepository: IAppointmentRepository) { }

    async execute(appointment: AppointmentEntity, status: string, userRole: UserRole): Promise<void> {
        const { id } = appointment;

        if (!id) throw new Error('El id de la cita es requerido');
        if (!status) throw new Error('El estado es requerido');

        if (!UpdateStatusPolicy.canUpdateToCancel(appointment, userRole, status as AppointmentStatusEnum)) {
            throw new Error('No se puede actualizar el estado de la cita');
        }

        return await this.appointmentRepository.updateStatus(id, status);
    }
}
