import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpPetRepository } from "../../infrastructure/http";
import { CreatePetUseCase } from "../use-cases";
import { CreatePetDto } from "../../domain/dtos";

const httpPetRepository = new HttpPetRepository();
const createPetUseCase = new CreatePetUseCase(httpPetRepository);

export const usePetMutationQuery = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (pet: CreatePetDto) => createPetUseCase.execute(pet),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["pets", "owner", variables.userId]
            });
        }
    })

    return mutation;
}