import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpAppointmentRequestRepository } from '../../infrastructure/http';
import { ApproveAppointmentRequestUseCase } from '../use-cases';
import {
  ApproveAppointmentRequestDto,
} from '../../domain';

const appointmentRequestRepository = new HttpAppointmentRequestRepository();
const approveAppointmentRequestUseCase = new ApproveAppointmentRequestUseCase(
  appointmentRequestRepository
);

export const useApproveAppointmentRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    ApproveAppointmentRequestDto
  >({
    mutationFn: (data: ApproveAppointmentRequestDto) =>
      approveAppointmentRequestUseCase.execute(data),
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
