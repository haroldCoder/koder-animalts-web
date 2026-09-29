import { AppointmentRequestStatus } from '../enums';

export interface AppointmentRequestEntity {
  id: string;
  userId: string;
  petId: string;
  date: Date;
  reason: string;
  notes?: string;
  status: AppointmentRequestStatus | string;
  userVeterinarianId?: string;
  clinicId?: string;
  rejectionReason?: string;
  currentVeterinary: boolean;
  petName?: string;
  petPhoto?: string;
  ownerName?: string;
  veterinarianName?: string;
  clinicName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
