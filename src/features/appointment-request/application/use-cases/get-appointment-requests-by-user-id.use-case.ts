import {
  FindAppointmentRequestsCriteria,
  IAppointmentRequestRepository,
  AppointmentRequestEntity,
} from '../../domain';

export class GetAppointmentRequestsByUserIdUseCase {
  constructor(
    private readonly appointmentRequestRepository: IAppointmentRequestRepository
  ) {}

  async execute(
    userId: string,
    criteria?: FindAppointmentRequestsCriteria
  ): Promise<AppointmentRequestEntity[]> {
    if (!userId) {
      throw new Error('El identificador del usuario es requerido');
    }

    return await this.appointmentRequestRepository.findAllByUserId(
      userId,
      criteria
    );
  }
}
