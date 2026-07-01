import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpAppointmentRepository } from "../../infrastructure/http";
import { ScheduleAppointmentUseCase } from "../use-cases";
import { CreateAppointmentDto } from "../../domain/dtos";

const httpAppointmentRepository = new HttpAppointmentRepository();
const scheduleAppointmentUseCase = new ScheduleAppointmentUseCase(httpAppointmentRepository);

export const useScheduleAppointmentMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (appointment: CreateAppointmentDto) => scheduleAppointmentUseCase.execute(appointment),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["appointments", "user", variables.userId]
            });
        }
    });

    return mutation;
};
