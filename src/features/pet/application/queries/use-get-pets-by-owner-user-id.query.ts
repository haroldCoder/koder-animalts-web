import { useQuery } from "@tanstack/react-query";
import { HttpPetRepository } from "../../infrastructure/http";
import { GetPetsByOwnerUserIdUseCase } from "../use-cases";
import { PetEntity } from "../../domain/entities";

const petRepository = new HttpPetRepository();
const getPetsByOwnerUserIdUseCase = new GetPetsByOwnerUserIdUseCase(petRepository);

export const useGetPetsByOwnerUserId = (userId: string) => {
    return useQuery<PetEntity[], Error>({
        queryKey: ["pets", "owner", userId],
        queryFn: () => getPetsByOwnerUserIdUseCase.execute(userId),
        enabled: !!userId,
    });
};
