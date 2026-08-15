export interface CreateAppointmentDto {
    date: string;
    reason: string;
    notes?: string;
    petId: string;
    userId: string;
}
