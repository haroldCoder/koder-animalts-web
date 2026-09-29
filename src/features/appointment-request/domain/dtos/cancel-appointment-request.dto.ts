import { AppointmentRequestStatus } from '../enums';

export interface CancelAppointmentRequestDto {
  id: string;
  ownerUserId: string;
  status?: AppointmentRequestStatus;
}
