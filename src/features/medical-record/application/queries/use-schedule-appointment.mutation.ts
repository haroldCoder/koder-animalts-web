import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpMedicalRecordRepository } from "../../infrastructure/http";
import { ScheduleAppointmentUseCase } from "../use-cases";
import { CreateMedicalRecordDto } from "../../domain/dtos";

const httpMedicalRecordRepository = new HttpMedicalRecordRepository();
const scheduleAppointmentUseCase = new ScheduleAppointmentUseCase(httpMedicalRecordRepository);

export const useScheduleAppointmentMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (appointment: CreateMedicalRecordDto) => scheduleAppointmentUseCase.execute(appointment),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["appointments", "user", variables.userId]
            });
        }
    });

    return mutation;
};
