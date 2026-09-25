import { useQuery } from '@tanstack/react-query';
import { HttpAppointmentRequestRepository } from '../../infrastructure/http';
import { GetAppointmentRequestsByUserIdUseCase } from '../use-cases';
import { AppointmentRequestEntity, FindAppointmentRequestsCriteria } from '../../domain';
import { UserRole } from '@/features/user';

const appointmentRequestRepository = new HttpAppointmentRequestRepository();
const getAppointmentRequestsByUserIdUseCase =
  new GetAppointmentRequestsByUserIdUseCase(appointmentRequestRepository);

export const useGetAppointmentRequestsByUserId = (
  userId: string,
  userRole: UserRole,
  criteria?: FindAppointmentRequestsCriteria
) => {
  return useQuery<AppointmentRequestEntity[], Error>({
    queryKey: ['appointment-requests', 'user', userId, criteria],
    queryFn: () =>
      getAppointmentRequestsByUserIdUseCase.execute(userId, userRole, criteria),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
