import {
  ApproveAppointmentRequestDto,
  IAppointmentRequestRepository
} from '../../domain';

export class ApproveAppointmentRequestUseCase {
  constructor(
    private readonly appointmentRequestRepository: IAppointmentRequestRepository
  ) { }

  async execute(
    data: ApproveAppointmentRequestDto
  ): Promise<void> {
    const { id, userVeterinarianId, clinicId } = data;

    if (!id) {
      throw new Error('El identificador de la solicitud de cita es requerido');
    }
    if (!userVeterinarianId) {
      throw new Error('El veterinario asignado es requerido para aprobar la solicitud');
    }
    if (!clinicId) {
      throw new Error('La clínica asignada es requerida para aprobar la solicitud');
    }

    await this.appointmentRequestRepository.approve(data);
  }
}
