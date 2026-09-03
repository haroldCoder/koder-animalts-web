import { useQuery } from '@tanstack/react-query';
import { HttpAppointmentRepository } from '../../infrastructure/http';
import { GetAppointmentsByUserIdUseCase } from '../use-cases';
import { AppointmentDataDto } from '../../domain/dtos';
import { FindAppointmentsCriteria } from '../../domain/repositories';

const appointmentRepository = new HttpAppointmentRepository();
const getAppointmentsByUserIdUseCase = new GetAppointmentsByUserIdUseCase(appointmentRepository);

export const useGetAppointmentsByUserId = (userId: string, criteria?: FindAppointmentsCriteria) => {
    return useQuery<AppointmentDataDto[], Error>({
        queryKey: ['appointments', 'user', userId, criteria],
        queryFn: () => getAppointmentsByUserIdUseCase.execute(userId, criteria),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
    });
};
