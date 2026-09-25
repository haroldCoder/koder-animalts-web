import {
  RejectAppointmentRequestDto,
  IAppointmentRequestRepository,
} from '../../domain';

export class RejectAppointmentRequestUseCase {
  constructor(
    private readonly appointmentRequestRepository: IAppointmentRequestRepository
  ) { }

  async execute(
    data: RejectAppointmentRequestDto
  ): Promise<void> {
    const { id } = data;

    if (!id) {
      throw new Error('El identificador de la solicitud de cita es requerido');
    }

    await this.appointmentRequestRepository.reject(data);
  }
}
