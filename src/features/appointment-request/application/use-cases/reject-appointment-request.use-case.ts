import { UserRole } from '@/features/user';
import {
  RejectAppointmentRequestDto,
  IAppointmentRequestRepository,
} from '../../domain';
import { RequestPolicy } from '../../domain/policies';

export class RejectAppointmentRequestUseCase {
  constructor(
    private readonly appointmentRequestRepository: IAppointmentRequestRepository
  ) { }

  async execute(
    data: RejectAppointmentRequestDto,
    userRole: UserRole
  ): Promise<void> {
    const { id } = data;

    if (!id) {
      throw new Error('El identificador de la solicitud de cita es requerido');
    }

    if (!RequestPolicy.canModifyRequest(userRole)) {
      throw new Error('No tienes permisos para rechazar la solicitud de cita');
    }

    await this.appointmentRequestRepository.reject(data);
  }
}
