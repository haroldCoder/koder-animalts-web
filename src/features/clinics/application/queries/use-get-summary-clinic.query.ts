import { useQuery } from "@tanstack/react-query"
import { ClinicSummaryEntity } from "../../domain/entities"
import { GetSummaryClinicUseCase } from "../use-cases"
import { HttpClinicRepository } from "../../infrastructure/http";

const clinicRepository = new HttpClinicRepository();
const getSummaryClinicUseCase = new GetSummaryClinicUseCase(clinicRepository);

export const useGetSummaryClinic = (userId: string) => {
    return useQuery<ClinicSummaryEntity>({
        queryKey: ['summary-clinic', userId],
        queryFn: () => getSummaryClinicUseCase.execute(userId)
    })
}