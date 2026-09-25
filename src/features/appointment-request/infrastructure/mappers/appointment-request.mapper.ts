import { AppointmentRequestEntity } from '../../domain/entities';
import { AppointmentRequestResponseDto, RawAppointmentRequestApiItem } from '../dtos';

export class AppointmentRequestMapper {
  static toDomain(
    item: RawAppointmentRequestApiItem
  ): AppointmentRequestEntity {
    return {
      id: item.id,
      userId: item.userId,
      petId: item.petId,
      date: new Date(item.date),
      reason: item.reason,
      notes: item.notes,
      status: item.status,
      userVeterinarianId: item.userVeterinarianId,
      clinicId: item.clinicId,
      rejectionReason: item.rejectionReason,
      petName: item.pet?.name,
      petPhoto: item.pet?.mainImage,
      ownerName: item.owner?.user?.name,
      veterinarianName: item.veterinarian?.user?.name,
      clinicName: item.clinic?.name,
      createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
      updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
    };
  }

  static toDomainList(
    response: AppointmentRequestResponseDto | RawAppointmentRequestApiItem[]
  ): AppointmentRequestEntity[] {
    const list = Array.isArray(response)
      ? response
      : Array.isArray(response?.data)
        ? response.data
        : response?.data
          ? [response.data]
          : [];

    return list.map((item) => this.toDomain(item));
  }

  static toDomainSingle(
    response: AppointmentRequestResponseDto | RawAppointmentRequestApiItem
  ): AppointmentRequestEntity {
    if ('data' in response && response.data && !Array.isArray(response.data)) {
      return this.toDomain(response.data);
    }
    return this.toDomain(response as RawAppointmentRequestApiItem);
  }
}
