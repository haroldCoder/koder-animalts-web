import { UserRole } from "@/features/user";
import { AppointmentStatusEnum } from "../enums";
import { AppointmentEntity } from "../entities";

export class UpdateStatusPolicy {
    static canUpdateToCancel(appointment: AppointmentEntity, userRole: UserRole, newStatus: AppointmentStatusEnum): boolean {
        if (newStatus != AppointmentStatusEnum.CANCELLED) {
            return true;
        }

        if (userRole === UserRole.owner) {
            if (appointment.status !== AppointmentStatusEnum.SCHEDULED
                || new Date(appointment.date) < new Date()) {
                return false;
            }
        }

        return true;
    }
}