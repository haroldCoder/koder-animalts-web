import { UserRole } from "@/features/user";
import { VaccinationStatus } from "../enums";

export class VaccinationStatusPolicy {
    static canUpdateStatus(role: UserRole, status: VaccinationStatus): boolean {
        if (role === UserRole.owner && status === VaccinationStatus.DONE) {
            return false;
        }
        return true;
    }

    static updateByStatusCancelled(role: UserRole, status: VaccinationStatus): boolean {
        if (role === UserRole.owner && status === VaccinationStatus.DONE) {
            return false;
        }
        return true;
    }

    static canCancelVaccination(status: VaccinationStatus): boolean {
        if (status === VaccinationStatus.DONE || status === VaccinationStatus.CANCELLED) {
            return false;
        }
        return true;
    }

    /**
     * Controls whether the status selector in UpdateStatus can be interacted with.
     * - DONE is a terminal state: no one can change it.
     * - CANCELLED owners cannot change it, but admins/vets can reactivate.
     */
    static canChangeStatus(role: UserRole, status: VaccinationStatus): boolean {
        if (status === VaccinationStatus.DONE) return false;
        if (status === VaccinationStatus.CANCELLED && role === UserRole.owner) return false;
        return true;
    }
}