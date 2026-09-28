import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpAppointmentRequestRepository } from '../../infrastructure/http';
import { CancelAppointmentRequestUseCase } from '../use-cases';
import {
  CancelAppointmentRequestDto,
} from '../../domain';
import { UserRole } from '@/features/user';

const appointmentRequestRepository = new HttpAppointmentRequestRepository();
const cancelAppointmentRequestUseCase = new CancelAppointmentRequestUseCase(
  appointmentRequestRepository
);

export const useCancelAppointmentRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { data: CancelAppointmentRequestDto; userRole: UserRole }
  >({
    mutationFn: ({ data, userRole }: { data: CancelAppointmentRequestDto; userRole: UserRole }) =>
      cancelAppointmentRequestUseCase.execute(data, userRole),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['appointment-requests'],
      });
    },
  });
};
