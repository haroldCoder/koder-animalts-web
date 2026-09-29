import { UserRole } from '@/features/user';
import {
  CancelAppointmentRequestDto,
  IAppointmentRequestRepository,
} from '../../domain';
import { RequestPolicy } from '../../domain/policies';

export class CancelAppointmentRequestUseCase {
  constructor(
    private readonly appointmentRequestRepository: IAppointmentRequestRepository
  ) { }

  async execute(
    data: CancelAppointmentRequestDto,
    userRole: UserRole
  ): Promise<void> {
    const { id, ownerUserId, status } = data;

    if (!id) {
      throw new Error('El identificador de la solicitud de cita es requerido');
    }

    if (!ownerUserId) {
      throw new Error('El identificador del usuario dueño es requerido');
    }

    if (status) {
      if (!RequestPolicy.canCancelRequest(userRole, status)) {
        throw new Error('No tienes permisos para cancelar la solicitud de cita');
      }
    } else {
      throw new Error('El estado de la solicitud de cita es requerido');
    }

    await this.appointmentRequestRepository.cancel(id, ownerUserId);
  }
}
