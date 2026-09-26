import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpAppointmentRequestRepository } from '../../infrastructure/http';
import { ApproveAppointmentRequestUseCase } from '../use-cases';
import {
  ApproveAppointmentRequestDto,
} from '../../domain';
import { UserRole } from '@/features/user';

const appointmentRequestRepository = new HttpAppointmentRequestRepository();
const approveAppointmentRequestUseCase = new ApproveAppointmentRequestUseCase(
  appointmentRequestRepository
);

export const useApproveAppointmentRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { data: ApproveAppointmentRequestDto, userRole: UserRole }
  >({
    mutationFn: ({ data, userRole }: { data: ApproveAppointmentRequestDto, userRole: UserRole }) =>
      approveAppointmentRequestUseCase.execute(data, userRole),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['appointment-requests'],
      });
      queryClient.invalidateQueries({
        queryKey: ['appointments'],
      });
    },
  });
};
