export interface AppointmentEntity {
    id: string;
    date: Date;
    reason: string;
    notes?: string;
    petId: string;
    veterinarianId: string;
    status?: string;
    petName?: string;
    veterinarianName?: string;
    clinicName?: string;
}
