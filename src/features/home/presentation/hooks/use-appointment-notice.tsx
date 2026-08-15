import { AppointmentDataDto } from "@/features/appointment/domain/dtos";
import { useMemo } from "react";
import { dateIsToday, dateIsTomorrow } from "../utils";

export const useAppointmentNotice = (appointments?: AppointmentDataDto[]) => {
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