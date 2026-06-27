import { AppointmentEntity } from "../../domain/entities";
import { ConsultationType } from "../../domain/enums";
import { AppointmentResponseDto } from "../dtos";

export class ApiResponseToDomain {

    static toAppointmentEntityData(appointments: AppointmentResponseDto): AppointmentEntity[] {
        return appointments.data.map((appointment) => ({
            id: appointment.id,
            reasonForVisit: appointment.reasonForVisit,
            date: new Date(appointment.visitDate.replace("Z", "")),
            notes: appointment.notes,
            type: appointment.type as ConsultationType,
            clinicName: appointment.veterinarian.clinic.name,
            petName: appointment.pet.name,
            petPhoto: appointment.pet.mainImage,
            veterinaryName: appointment.veterinarian.user.name,
            ownerName: appointment.pet.owner?.user.name,
            documentIds: appointment.documentIds,
            veterinaryId: appointment.veterinarian.id,
            petId: appointment.pet.id,
            clinicId: appointment.veterinarian.clinic.id,
            ownerId: appointment.pet.owner?.id,
        }));
    }
}