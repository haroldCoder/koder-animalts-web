import { UserRole } from '@/features/user';
import {
  FindAppointmentRequestsCriteria,
  IAppointmentRequestRepository,
  AppointmentRequestEntity,
} from '../../domain';
import { RequestPolicy } from '../../domain/policies';

export class GetAppointmentRequestsByUserIdUseCase {
  constructor(
    private readonly appointmentRequestRepository: IAppointmentRequestRepository
  ) { }

  async execute(
    userId: string,
    userRole: UserRole,
    criteria?: FindAppointmentRequestsCriteria
  ): Promise<AppointmentRequestEntity[]> {
    if (!userId) {
      throw new Error('El identificador del usuario es requerido');
    }

    if (!RequestPolicy.canViewRequests(userRole)) {
      throw new Error('No tienes permisos para ver las solicitudes de cita');
    }

    return await this.appointmentRequestRepository.findAllByUserId(
      userId,
      criteria
    );
  }
}
