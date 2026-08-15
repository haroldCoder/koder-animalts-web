import { ConsultationType } from "../../domain/enums";

export interface ScheduleAppointmentFormValues {
    petId: string;
    visitDate: Date;
    visitTime: string;
    reasonForVisit: string;
    type: ConsultationType | string;
    notes?: string;
    diagnosis?: string;
    treatment?: string;
}