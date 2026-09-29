import { FindCriteriaQuery } from '@/common/interfaces';
import { AppointmentRequestStatus } from '../enums';

export interface FindAppointmentRequestsCriteria extends FindCriteriaQuery {
  status?: AppointmentRequestStatus[];
  startDate?: Date;
  endDate?: Date;
}
