import { UserRole } from "@/features/user";
import { AppointmentEntity } from "../../domain/entities";

export interface RegisterMedicalRecord {
    appointment: AppointmentEntity;
    userRole: UserRole,
    userId: string,
}