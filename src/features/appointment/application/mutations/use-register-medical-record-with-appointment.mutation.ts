import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpMedicalRecordRepository } from '@/features/medical-record/infrastructure/http';
import { ScheduleMedicalRecordUseCase } from '@/features/medical-record/application/use-cases';
import { RegisterMedicalRecordWithAppointmentUseCase } from '../use-cases';
import { AppointmentEntity } from '../../domain/entities';
import { UserRole } from '@/features/user';
import { CreateMedicalRecordDto } from '@/features/medical-record/domain/dtos';

const medicalRecordRepository = new HttpMedicalRecordRepository();
const scheduleMedicalRecordUseCase = new ScheduleMedicalRecordUseCase(medicalRecordRepository);
const registerMedicalRecordWithAppointmentUseCase = new RegisterMedicalRecordWithAppointmentUseCase(scheduleMedicalRecordUseCase);

interface RegisterHistoryVariables {
    medicalRecord: CreateMedicalRecordDto;
    appointment: AppointmentEntity;
    userRole: UserRole;
}

export const useRegisterMedicalRecordWithAppointmentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ medicalRecord, appointment, userRole }: RegisterHistoryVariables) =>
            registerMedicalRecordWithAppointmentUseCase.execute(medicalRecord, appointment, userRole),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['medical-records'],
            });
        },
    });
};
