import { UserRole } from "@/features/user";
import { AppointmentStatusEnum } from "../enums";
import { AppointmentEntity } from "../entities";

export class UpdateStatusPolicy {
    static canUpdateToCancel(appointment: AppointmentEntity, userRole: UserRole, newStatus: AppointmentStatusEnum): boolean {
        if (newStatus != AppointmentStatusEnum.CANCELLED) {
            return true;
        }

        if (appointment.status !== AppointmentStatusEnum.SCHEDULED) {
            return false;
        }

        if (userRole === UserRole.owner) {
            if (new Date(appointment.date) < new Date()) {
                return false;
            }
        }

        return true;
    }

    static canUpdateToCompleted(appointment: AppointmentEntity, userRole: UserRole, newStatus: AppointmentStatusEnum): boolean {
        if (newStatus != AppointmentStatusEnum.COMPLETED) {
            return true;
        }

        if (userRole === UserRole.owner) {
            return false
        }

        if (appointment.status !== AppointmentStatusEnum.SCHEDULED
            || new Date() < new Date(appointment.date)) {
            return false;
        }

        return true;
    }
}