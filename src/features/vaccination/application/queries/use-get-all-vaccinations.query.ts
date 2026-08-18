import { useQuery } from "@tanstack/react-query";
import { QueriesVaccinationEntity, VaccinationEntity } from "../../domain/entities";
import { HttpVaccinationRepository } from "../../infrastructure/repositories";
import { FindAllVaccinationByUserIdUseCase } from "../use-cases";

const httpVaccinationsRepository = new HttpVaccinationRepository();
const findAllVaccinationByUserIdUseCase = new FindAllVaccinationByUserIdUseCase(httpVaccinationsRepository);

export const useGetAllVaccinationsQuery = (userId: string, queries: QueriesVaccinationEntity) => {
    return useQuery<VaccinationEntity[], Error>({
        queryKey: ["vaccinations", userId, queries],
        queryFn: () => findAllVaccinationByUserIdUseCase.execute(userId, queries),
        staleTime: 1000 * 60 * 5,
        enabled: !!userId,
    })
}