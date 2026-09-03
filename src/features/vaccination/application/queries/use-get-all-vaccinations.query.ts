import { useQuery } from "@tanstack/react-query";
import { QueriesVaccinationEntity } from "../../domain/entities";
import { HttpVaccinationRepository } from "../../infrastructure/repositories";
import { FindAllVaccinationByUserIdUseCase } from "../use-cases";
import { FindAllVaccinationDto } from "../../domain/repositories";

const httpVaccinationsRepository = new HttpVaccinationRepository();
const findAllVaccinationByUserIdUseCase = new FindAllVaccinationByUserIdUseCase(httpVaccinationsRepository);

export const useGetAllVaccinationsQuery = (userId: string, queries: QueriesVaccinationEntity) => {
    return useQuery<FindAllVaccinationDto, Error>({
        queryKey: ["vaccinations", userId, queries],
        queryFn: () => findAllVaccinationByUserIdUseCase.execute(userId, queries),
        staleTime: 1000 * 60 * 5,
        enabled: !!userId,
    })
}