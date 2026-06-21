import { useQuery } from "@tanstack/react-query";
import { HttpAppointmentRepository } from "../../infrastructure/http";
import { GetAppointmentsByUserIdUseCase } from "../use-cases";
import { AppointmentEntity } from "../../domain/entities";

const appointmentRepository = new HttpAppointmentRepository();
const getAppointmentsByUserIdUseCase = new GetAppointmentsByUserIdUseCase(appointmentRepository);

export const useGetAppointmentsByUserId = (userId: string) => {
    return useQuery<AppointmentEntity[], Error>({
        queryKey: ["appointments", "user", userId],
        queryFn: () => getAppointmentsByUserIdUseCase.execute(userId),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5
    });
};
