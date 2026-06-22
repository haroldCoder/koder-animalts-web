import { AppointmentEntity } from "../entities/appointment.entity";
import { format } from "date-fns";

export const appointmentNext = (appointments: AppointmentEntity[]): AppointmentEntity[] => {
    const appointment = appointments.filter((appointment) => {
        const today = format(new Date(), "yyyy-MM-dd");
        return format(new Date(appointment.date), "yyyy-MM-dd") > today;
    });

    return appointment;
}