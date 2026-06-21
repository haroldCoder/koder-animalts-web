import { useQuery } from "@tanstack/react-query";
import { PetEntity } from "../../domain/entities";
import { SearchPetByVeterinarianUserIdUseCase } from "../use-cases";
import { HttpPetRepository } from "../../infrastructure/http";

const petRepository = new HttpPetRepository();
const searchPetByVeterinarianUserIdUseCase = new SearchPetByVeterinarianUserIdUseCase(petRepository);

export const useSearchPetByVeterinarianUserId = (userId: string, { petName, ownerName }: { petName?: string; ownerName?: string }) => {
    return useQuery<PetEntity[]>({
        queryKey: ['search-pets-vet', userId, petName, ownerName],
        queryFn: () => searchPetByVeterinarianUserIdUseCase.execute(userId, petName, ownerName),
        enabled: !!userId,
    });
};
