import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateVaccinationEntity } from "../../domain/entities";
import { RegisterVaccinationUseCase } from "../use-cases";
import { HttpVaccinationRepository } from "../../infrastructure/repositories/http-vaccination.repository";

export const useRegisterVaccination = () => {
    const queryClient = useQueryClient();
    const repository = new HttpVaccinationRepository();
    const useCase = new RegisterVaccinationUseCase(repository);

    return useMutation({
        mutationFn: (vaccination: CreateVaccinationEntity) => useCase.execute(vaccination),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vaccinations"] });
        },
    });
};
