import { UserRole } from "@/features/user";
import { VaccinationStatus } from "../../domain/enums";
import { VaccinationsRepository } from "../../domain/repositories";
import { VaccinationStatusPolicy } from "../../domain/policies";
import { UnauthorizedStatusUpdateException } from "../../domain/exceptions";
import { CannotUpdateCancelledStatusException } from "../../domain/exceptions/cannot-update-cancelled-status.exception";

export class UpdateStatusVaccinationUseCase {
    constructor(
        private readonly vaccinationsRepository: VaccinationsRepository
    ) { }

    async execute(id: string, status: VaccinationStatus, userRole: UserRole): Promise<void> {
        const vaccination = await this.vaccinationsRepository.findById(id);

        if (!VaccinationStatusPolicy.canUpdateStatus(userRole, status)) {
            throw new UnauthorizedStatusUpdateException();
        }

        if (vaccination?.status === VaccinationStatus.CANCELLED) {
            if (!VaccinationStatusPolicy.updateByStatusCancelled(userRole, vaccination.status)) {
                throw new CannotUpdateCancelledStatusException();
            }
        }

        await this.vaccinationsRepository.updateStatus(id, status);
    }
}