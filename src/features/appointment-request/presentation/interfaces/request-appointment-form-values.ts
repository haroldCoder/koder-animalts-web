export interface RequestAppointmentFormValues {
    petId: string;
    date: string | Date;
    reason: string;
    clinicId?: string;
    VeterinarianId?: string;
}