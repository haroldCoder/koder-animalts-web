import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpAppointmentRequestRepository } from '../../infrastructure/http';
import { RejectAppointmentRequestUseCase } from '../use-cases';
import {
  RejectAppointmentRequestDto,
} from '../../domain';
import { UserRole } from '@/features/user';

const appointmentRequestRepository = new HttpAppointmentRequestRepository();
const rejectAppointmentRequestUseCase = new RejectAppointmentRequestUseCase(
  appointmentRequestRepository
);

export const useRejectAppointmentRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { data: RejectAppointmentRequestDto, userRole: UserRole }
  >({
    mutationFn: ({ data, userRole }: { data: RejectAppointmentRequestDto, userRole: UserRole }) =>
      rejectAppointmentRequestUseCase.execute(data, userRole),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['appointment-requests'],
      });
    },
  });
};
