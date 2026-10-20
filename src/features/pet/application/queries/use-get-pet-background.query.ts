import { useQuery } from "@tanstack/react-query";
import { HttpPetBackgroundRepository } from "../../infrastructure/http";
import { GetPetBackgroundUseCase } from "../use-cases";

const repository = new HttpPetBackgroundRepository();
const useCase = new GetPetBackgroundUseCase(repository);

export const useGetPetBackgroundQuery = (petId?: string, userId?: string) => {
    return useQuery({
        queryKey: ["pet-background", petId, userId],
        queryFn: () => useCase.execute(petId!, userId),
        enabled: !!petId,
        staleTime: 1000 * 60 * 5,
    });
};
