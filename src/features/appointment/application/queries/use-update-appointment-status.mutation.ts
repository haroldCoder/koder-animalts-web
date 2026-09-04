import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpAppointmentRepository } from '../../infrastructure/http';
import { UpdateAppointmentStatusUseCase } from '../use-cases';
import { AppointmentEntity } from '../../domain/entities';
import { UserRole } from '@/features/user';

const appointmentRepository = new HttpAppointmentRepository();
const updateAppointmentStatusUseCase = new UpdateAppointmentStatusUseCase(appointmentRepository);

interface UpdateStatusVariables {
    appointment: AppointmentEntity;
    status: string;
    userRole: UserRole;
}

export const useUpdateAppointmentStatusMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ appointment, status, userRole }: UpdateStatusVariables) =>
            updateAppointmentStatusUseCase.execute(appointment, status, userRole),
        onSuccess: () => {
            // Invalidate appointments to refresh the list
            queryClient.invalidateQueries({
                queryKey: ['appointments'],
            });
        },
    });
};
