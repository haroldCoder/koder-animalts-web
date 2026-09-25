import {
  CreateAppointmentRequestDto,
  IAppointmentRequestRepository,
} from '../../domain';

export class CreateAppointmentRequestUseCase {
  constructor(
    private readonly appointmentRequestRepository: IAppointmentRequestRepository
  ) { }

  async execute(
    data: CreateAppointmentRequestDto
  ): Promise<void> {
    const { petId, userId, date, reason } = data;

    if (!userId) {
      throw new Error('El identificador del usuario es requerido');
    }
    if (!petId) {
      throw new Error('La mascota es requerida para solicitar la cita');
    }
    if (!date) {
      throw new Error('La fecha y hora preferida de la cita es requerida');
    }
    if (!reason || reason.trim() === '') {
      throw new Error('El motivo de la solicitud de cita es requerido');
    }

    await this.appointmentRequestRepository.create(data);
  }
}
