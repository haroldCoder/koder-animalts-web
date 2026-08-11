import { AppointmentEntity } from '../../domain/entities';
import { AppointmentResponseDto } from '../dtos';

export class ApiResponseToDomain {
    static toAppointmentEntityData(response: AppointmentResponseDto): AppointmentEntity[] {
        return response.data.map((item) => ({
            id: item.id,
            date: new Date(item.date),
            reason: item.reason,
            notes: item.notes,
            petId: item.petId,
            veterinarianId: item.veterinarianId,
            status: item.status,
            petName: item.pet?.name,
            veterinarianName: item.veterinarian?.user.name,
            clinicName: item.veterinarian?.clinic?.name,
        }));
    }
}
