export interface CreateAppointmentRequestDto {
  userId: string;
  petId: string;
  date: string | Date;
  reason: string;
  notes?: string;
  clinicId?: string;
  VeterinarianId?: string;
}
