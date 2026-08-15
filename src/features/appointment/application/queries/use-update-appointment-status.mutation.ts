import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpAppointmentRepository } from '../../infrastructure/http';
import { UpdateAppointmentStatusUseCase } from '../use-cases';

const appointmentRepository = new HttpAppointmentRepository();
const updateAppointmentStatusUseCase = new UpdateAppointmentStatusUseCase(appointmentRepository);

interface UpdateStatusVariables {
    id: string;
    status: string;
}

export const useUpdateAppointmentStatusMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: UpdateStatusVariables) =>
            updateAppointmentStatusUseCase.execute(id, status),
        onSuccess: () => {
            // Invalidate appointments to refresh the list
            queryClient.invalidateQueries({
                queryKey: ['appointments'],
            });
        },
    });
};
