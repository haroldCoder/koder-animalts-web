export interface CreateAppointmentRequestDto {
  userId: string;
  petId: string;
  requestedDate: string | Date;
  reason: string;
  clinicId?: string;
  VeterinarianId?: string;
}
