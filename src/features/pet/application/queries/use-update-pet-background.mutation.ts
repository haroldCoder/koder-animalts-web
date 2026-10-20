import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpPetBackgroundRepository } from "../../infrastructure/http";
import { UpdatePetBackgroundUseCase } from "../use-cases";
import { UpdatePetBackgroundDto } from "../../domain/dtos";

const repository = new HttpPetBackgroundRepository();
const useCase = new UpdatePetBackgroundUseCase(repository);

export const useUpdatePetBackgroundMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: UpdatePetBackgroundDto) => useCase.execute(dto),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["pet-background", variables.petId],
            });
            queryClient.invalidateQueries({
                queryKey: ["pets"],
            });
        },
    });
};
