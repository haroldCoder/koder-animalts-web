import { UserRole } from "@/features/user";
import { VaccinationStatus } from "../enums";

export class VaccinationStatusPolicy {
    static canUpdateStatus(role: UserRole, status: VaccinationStatus): boolean {
        if (role === UserRole.owner && status === VaccinationStatus.DONE) {
            return false;
        }
        return true;
    }

    static updateByStatusCancelled(role: UserRole): boolean {
        if (role === UserRole.owner && status === VaccinationStatus.DONE) {
            return false;
        }
        return true;
    }
}