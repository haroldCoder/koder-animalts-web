import { HttpPetRepository } from "../../infrastructure/http";
import { GetPetsByVeterinaryUserIdUseCase } from "../use-cases";
import { useQuery } from "@tanstack/react-query";
import { PetEntity } from "../../domain/entities";

const petRepository = new HttpPetRepository();
const getPetsByVeterinaryUserIdUseCase = new GetPetsByVeterinaryUserIdUseCase(petRepository);

export const useGetPetsByVeterinaryUserId = (userId: string) => {

    return useQuery<PetEntity[]>({
        queryKey: ['get-pets-vet', userId],
        queryFn: () => getPetsByVeterinaryUserIdUseCase.execute(userId),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5
    });
};