import { apiClient } from '@/common';
import {
  ApproveAppointmentRequestDto,
  CreateAppointmentRequestDto,
  FindAppointmentRequestsCriteria,
  IAppointmentRequestRepository,
  RejectAppointmentRequestDto,
} from '../../domain';
import { AppointmentRequestEntity } from '../../domain/entities';
import {
  AppointmentRequestResponseDto,
  RawAppointmentRequestApiItem,
} from '../dtos';
import { AppointmentRequestMapper } from '../mappers';

export class HttpAppointmentRequestRepository
  implements IAppointmentRequestRepository {
  private readonly basePath = '/api/v1/appointment-requests';

  async create(
    data: CreateAppointmentRequestDto
  ): Promise<void> {
    try {
      const payload = {
        ...data,
        date:
          data.date instanceof Date ? data.date.toISOString() : data.date,
      };

      await apiClient.post<
        void
      >(this.basePath, {
        body: payload,
      });
    } catch (error) {
      console.error('Error creating appointment request:', error);
      throw error;
    }
  }

  async approve(
    data: ApproveAppointmentRequestDto
  ): Promise<void> {
    try {
      const params: Record<string, string> = {
        userVeterinarianId: data.userVeterinarianId,
        clinicId: data.clinicId,
      };

      if (data.notes) {
        params.notes = data.notes;
      }

      await apiClient.patch<
        void
      >(`${this.basePath}/${data.id}/approve`, {
        params,
      });
    } catch (error) {
      console.error('Error approving appointment request:', error);
      throw error;
    }
  }

  async reject(
    data: RejectAppointmentRequestDto
  ): Promise<void> {
    try {
      const body = data.reason ? { reason: data.reason } : undefined;

      await apiClient.patch<
        void
      >(`${this.basePath}/${data.id}/reject`, {
        body,
      });
    } catch (error) {
      console.error('Error rejecting appointment request:', error);
      throw error;
    }
  }

  async findAllByUserId(
    userId: string,
    criteria?: FindAppointmentRequestsCriteria
  ): Promise<AppointmentRequestEntity[]> {
    try {
      const params: Record<string, string | number> = {};

      if (criteria?.startDate) {
        params.startDate =
          criteria.startDate instanceof Date
            ? criteria.startDate.toISOString()
            : criteria.startDate;
      }

      if (criteria?.endDate) {
        params.endDate =
          criteria.endDate instanceof Date
            ? criteria.endDate.toISOString()
            : criteria.endDate;
      }

      if (criteria?.sortOrder) {
        params.sortOrder = criteria.sortOrder;
      }

      if (criteria?.page) {
        params.page = criteria.page;
      }

      if (criteria?.limit) {
        params.limit = criteria.limit;
      }

      if (criteria?.status && criteria.status.length > 0) {
        params.status = criteria.status.join(',');
      }

      const response = await apiClient.get<
        AppointmentRequestResponseDto | RawAppointmentRequestApiItem[]
      >(`${this.basePath}/${userId}/user`, {
        params,
      });

      return AppointmentRequestMapper.toDomainList(response);
    } catch (error) {
      console.error('Error fetching appointment requests by userId:', error);
      throw error;
    }
  }
}
