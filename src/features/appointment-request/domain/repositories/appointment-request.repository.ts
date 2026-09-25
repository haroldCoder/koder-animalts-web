import {
  CreateAppointmentRequestDto,
  ApproveAppointmentRequestDto,
  RejectAppointmentRequestDto,
  FindAppointmentRequestsCriteria,
} from '../dtos';
import { AppointmentRequestEntity } from '../entities';

export interface IAppointmentRequestRepository {
  create(data: CreateAppointmentRequestDto): Promise<void>;
  approve(data: ApproveAppointmentRequestDto): Promise<void>;
  reject(data: RejectAppointmentRequestDto): Promise<void>;
  findAllByUserId(
    userId: string,
    criteria?: FindAppointmentRequestsCriteria
  ): Promise<AppointmentRequestEntity[]>;
}
