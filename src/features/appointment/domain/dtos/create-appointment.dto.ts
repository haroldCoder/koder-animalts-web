import { ConsultationType } from "../enums";

export interface CreateAppointmentDto {
    petId: string;
    userId: string;
    type: ConsultationType | string;
    reasonForVisit: string;
    visitDate: Date | string;
    notes?: string;
    diagnosis?: string;
    treatment?: string;
}
