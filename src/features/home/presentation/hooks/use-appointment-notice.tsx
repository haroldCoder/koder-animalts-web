import { AppointmentEntity } from "@/features/appointment/domain/entities";
import { useMemo } from "react";
import { dateIsToday, dateIsTomorrow } from "../utils";

export const useAppointmentNotice = (appointments?: AppointmentEntity[]) => {
    const appointmentsData = useMemo(() => {
        if (!appointments) return [];
        return appointments.filter(app => {
            const dateObj = new Date(app.date);
            return dateIsToday(dateObj) || dateIsTomorrow(dateObj);
        });
    }, [appointments]);

    return {
        appointmentsData
    }
}