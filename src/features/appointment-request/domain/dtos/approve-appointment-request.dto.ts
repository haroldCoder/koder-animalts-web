export interface ApproveAppointmentRequestDto {
  id: string;
  userVeterinarianId: string;
  clinicId: string;
  notes?: string;
}
