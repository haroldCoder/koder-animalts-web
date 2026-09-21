import { AppointmentEntity } from "../entities";
import { AppointmentStatusEnum } from "../enums";
import { UserRole } from "@/features/user";

export class RegisterHistoryPolicy {
    static canRegisterHistory(appointment: AppointmentEntity, role: UserRole): boolean {
        if (role === UserRole.veterinary) {
            return appointment.status !== AppointmentStatusEnum.CANCELLED;
        }
        return false;
    }
}