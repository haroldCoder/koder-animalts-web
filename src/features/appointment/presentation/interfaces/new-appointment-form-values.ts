export interface NewAppointmentFormValues {
    petId: string;
    veterinarianId: string;
    visitDate: Date;
    reason: string;
    notes?: string;
}
