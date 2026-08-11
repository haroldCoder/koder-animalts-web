import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpAppointmentRepository } from '../../infrastructure/http';
import { ScheduleAppointmentUseCase } from '../use-cases';
import { CreateAppointmentDto } from '../../domain/dtos';

const appointmentRepository = new HttpAppointmentRepository();
const scheduleAppointmentUseCase = new ScheduleAppointmentUseCase(appointmentRepository);

export const useScheduleAppointmentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (appointment: CreateAppointmentDto) =>
            scheduleAppointmentUseCase.execute(appointment),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['appointments', 'user', variables.petId],
            });
        },
    });
};
