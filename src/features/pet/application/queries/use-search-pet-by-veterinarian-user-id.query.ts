import { useQuery } from "@tanstack/react-query";
import { PetEntity } from "../../domain/entities";
import { SearchPetByVeterinarianUserIdUseCase } from "../use-cases";
import { HttpPetRepository } from "../../infrastructure/http";

const petRepository = new HttpPetRepository();
const searchPetByVeterinarianUserIdUseCase = new SearchPetByVeterinarianUserIdUseCase(petRepository);

export const useSearchPetByVeterinarianUserId = (userId: string, { petName, ownerName }: { petName?: string; ownerName?: string }) => {
    const shouldFetch = (petName && ownerName && (petName?.length > 3 || ownerName?.length > 3)) || false;

    return useQuery<PetEntity[]>({
        queryKey: ['search-pets-vet', userId, petName, ownerName],
        queryFn: () => searchPetByVeterinarianUserIdUseCase.execute(userId, petName, ownerName),
        enabled: !!userId && shouldFetch,
        staleTime: 1000 * 60 * 5
    });
};
