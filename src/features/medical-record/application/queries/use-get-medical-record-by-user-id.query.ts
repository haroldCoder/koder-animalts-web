import { useQuery } from "@tanstack/react-query";
import { HttpMedicalRecordRepository } from "../../infrastructure/http";
import { GetMedicalRecordsByUserIdUseCase } from "../use-cases";
import { MedicalRecordEntity } from "../../domain/entities";

const medicalRecordRepository = new HttpMedicalRecordRepository();
const getMedicalRecordsByUserIdUseCase = new GetMedicalRecordsByUserIdUseCase(medicalRecordRepository);

export const useGetMedicalRecordsByUserId = (userId: string, { petId, startDate, endDate, medicalRecordId }: { petId?: string, startDate?: Date, endDate?: Date, medicalRecordId?: string }) => {
    return useQuery<MedicalRecordEntity[], Error>({
        queryKey: ["medical-record", "user", userId, petId, startDate, endDate, medicalRecordId],
        queryFn: () => getMedicalRecordsByUserIdUseCase.execute(userId, petId, startDate?.toISOString(), endDate?.toISOString(), medicalRecordId),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5
    });
};
