import { getDateLast } from "@/common/utils";
import { AppointmentEntity } from "../../domain/entities";
import { IAppointmentRepository } from "../../domain/repositories";

export class GetAppointmentsByUserIdUseCase {
    constructor(private readonly appointmentRepository: IAppointmentRepository) { }

    async execute(userId: string): Promise<AppointmentEntity[]> {
        const appointments = await this.appointmentRepository.findByUserId(userId);

        return appointments.filter(appointment => getDateLast(appointment.date))
    }
}
