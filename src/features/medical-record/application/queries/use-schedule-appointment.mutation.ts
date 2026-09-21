import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpMedicalRecordRepository } from "../../infrastructure/http";
import { ScheduleMedicalRecordUseCase } from "../use-cases";
import { CreateMedicalRecordDto } from "../../domain/dtos";

const httpMedicalRecordRepository = new HttpMedicalRecordRepository();
const scheduleAppointmentUseCase = new ScheduleMedicalRecordUseCase(httpMedicalRecordRepository);

export const useScheduleMedicalRecordMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (medicalRecord: CreateMedicalRecordDto) => scheduleAppointmentUseCase.execute(medicalRecord),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["medical-records", "user", variables.userId]
            });
        }
    });

    return mutation;
};
