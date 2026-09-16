import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpPetRepository } from "../../infrastructure/http";
import { UpdateClinicUseCase } from "../use-cases";

const httpPetRepository = new HttpPetRepository();
const updateClinicUseCase = new UpdateClinicUseCase(httpPetRepository);

export const useUpdateClinicMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ petId, clinicId }: { petId: string; clinicId: string }) =>
            updateClinicUseCase.execute(petId, clinicId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["pets"]
            });
        }
    });

    return mutation;
};
