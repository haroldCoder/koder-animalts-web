import { useQuery } from "@tanstack/react-query";
import { PetEntity } from "../../domain/entities";
import { SearchPetByVeterinarianUserIdUseCase } from "../use-cases";
import { HttpPetRepository } from "../../infrastructure/http";

const petRepository = new HttpPetRepository();
const searchPetByVeterinarianUserIdUseCase = new SearchPetByVeterinarianUserIdUseCase(petRepository);

export const useGetPetsByVeterinarianClinic = (userId: string) => {
    return useQuery<PetEntity[]>({
        queryKey: ['pets-clinic', userId],
        queryFn: () => searchPetByVeterinarianUserIdUseCase.execute(userId, '', ''),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5
    });
};
