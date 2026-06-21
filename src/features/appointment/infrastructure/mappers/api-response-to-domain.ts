import { AppointmentEntity } from "../../domain/entities";
import { ConsultationType } from "../../domain/enums";
import { AppointmentResponseEntity } from "../entities";

export class ApiResponseToDomain {

    static toAppointmentEntityData(appointments: AppointmentResponseEntity): AppointmentEntity[] {
        return appointments.data.map((appointment) => ({
            id: appointment.id,
            reasonForVisit: appointment.reasonForVisit,
            date: new Date(appointment.visitDate),
            notes: appointment.notes,
            type: appointment.type as ConsultationType,
            clinicName: appointment.veterinarian.clinic.name,
            petName: appointment.pet.name,
            petPhoto: appointment.pet.mainImage,
            veterinaryName: appointment.veterinarian.user.name,
            ownerName: appointment.pet.owner?.user.name,
        }));
    }
}