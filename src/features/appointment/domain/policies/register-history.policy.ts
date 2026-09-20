import { AppointmentDataDto } from "../dtos";
import { AppointmentStatusEnum } from "../enums";
import { UserRole } from "@/features/user";

export class RegisterHistoryPolicy {
    static canRegisterHistory(appointment: AppointmentDataDto, role: UserRole): boolean {
        if (role === UserRole.veterinary) {
            return appointment.status !== AppointmentStatusEnum.CANCELLED;
        }
        return false;
    }
}