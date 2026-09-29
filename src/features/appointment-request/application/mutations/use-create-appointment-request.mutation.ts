import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpAppointmentRequestRepository } from '../../infrastructure/http';
import { CreateAppointmentRequestUseCase } from '../use-cases';
import {
  CreateAppointmentRequestDto,
} from '../../domain';

const appointmentRequestRepository = new HttpAppointmentRequestRepository();
const createAppointmentRequestUseCase = new CreateAppointmentRequestUseCase(
  appointmentRequestRepository
);

export const useCreateAppointmentRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    CreateAppointmentRequestDto
  >({
    mutationFn: (data: CreateAppointmentRequestDto) =>
      createAppointmentRequestUseCase.execute(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['appointment-requests'],
      });
      if (variables.userId) {
        queryClient.invalidateQueries({
          queryKey: ['appointment-requests', 'user', variables.userId],
        });
      }
    },
  });
};
