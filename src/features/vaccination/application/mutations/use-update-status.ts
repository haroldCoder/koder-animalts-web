import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpVaccinationRepository } from "../../infrastructure/repositories";
import { UpdateStatusVaccinationUseCase } from "../use-cases";
import { UserRole } from "@/features/user";
import { VaccinationStatus } from "../../domain/enums";

export const useUpdateStatusVaccination = () => {
    const queryClient = useQueryClient();
    const repository = new HttpVaccinationRepository();
    const useCase = new UpdateStatusVaccinationUseCase(repository);

    return useMutation({
        mutationFn: async ({ id, status, userRole }: { id: string, status: VaccinationStatus, userRole: UserRole }) => {
            return await useCase.execute(id, status, userRole);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vaccinations'] });
        },
    });
}