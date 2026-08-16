import { useQuery } from "@tanstack/react-query";
import { HttpMedicalRecordRepository } from "../../infrastructure/http";
import { GetMedicalRecordsByUserIdUseCase } from "../use-cases";
import { MedicalRecordEntity } from "../../domain/entities";

const medicalRecordRepository = new HttpMedicalRecordRepository();
const getMedicalRecordsByUserIdUseCase = new GetMedicalRecordsByUserIdUseCase(medicalRecordRepository);

export const useGetMedicalRecordsByUserId = (userId: string, { petId, startDate, endDate }: { petId?: string, startDate?: Date, endDate?: Date }) => {
    return useQuery<MedicalRecordEntity[], Error>({
        queryKey: ["medical-record", "user", userId, petId, startDate, endDate],
        queryFn: () => getMedicalRecordsByUserIdUseCase.execute(userId, petId, startDate?.toISOString(), endDate?.toISOString()),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5
    });
};
