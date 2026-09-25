import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpAppointmentRequestRepository } from '../../infrastructure/http';
import { RejectAppointmentRequestUseCase } from '../use-cases';
import {
  RejectAppointmentRequestDto,
} from '../../domain';

const appointmentRequestRepository = new HttpAppointmentRequestRepository();
const rejectAppointmentRequestUseCase = new RejectAppointmentRequestUseCase(
  appointmentRequestRepository
);

export const useRejectAppointmentRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    RejectAppointmentRequestDto
  >({
    mutationFn: (data: RejectAppointmentRequestDto) =>
      rejectAppointmentRequestUseCase.execute(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['appointment-requests'],
      });
    },
  });
};
