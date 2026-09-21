import { RegisterHistoryPolicy } from "../../domain/policies";
import { AppointmentEntity } from "../../domain/entities";
import { UserRole } from "@/features/user";
import { ScheduleMedicalRecordUseCase } from "@/features/medical-record/application/use-cases";
import { CreateMedicalRecordDto } from "@/features/medical-record/domain/dtos";

export class RegisterMedicalRecordWithAppointmentUseCase {
    constructor(private readonly scheduleMedicalRecordUseCase: ScheduleMedicalRecordUseCase) { }

    async execute(medicalRecord: CreateMedicalRecordDto, appointment: AppointmentEntity, userRole: UserRole) {
        if (!RegisterHistoryPolicy.canRegisterHistory(appointment, userRole)) throw new Error("No tienes permisos para registrar un historial médico");

        return this.scheduleMedicalRecordUseCase.execute({
            ...medicalRecord,
            visitDate: appointment.date,
        })
    }
}
