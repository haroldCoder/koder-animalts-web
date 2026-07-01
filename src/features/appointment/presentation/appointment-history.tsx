import { useMemo } from "react"
import { AppointmentCardToggle, AppointmentHistoryEmpty } from "./components";
import { useGetAppointmentsByUserId } from "../application/queries";
import { useAuth } from "@/common/hooks";
import { AppointmentEntity } from "../domain/entities";
import { getDateLast } from "@/common/utils";
import { Error, Loading } from "@/common/presentation/components";

export const AppointmentHistory = () => {

    const { user } = useAuth();
    const { data: appointments, isLoading, error } = useGetAppointmentsByUserId(user!);



    const appoinmentHistory = useMemo(() => {
        if (!appointments) return [];
        return appointments.filter((appointment: AppointmentEntity) => getDateLast(appointment.date));
    }, [appointments]);

    if (isLoading) return <Loading />

    if (error) return <Error message={error?.message || "Error al cargar las citas"} />

    if (appoinmentHistory.length === 0) return <AppointmentHistoryEmpty />

    return (
        <div className="flex flex-col gap-4">
            {appoinmentHistory.map((appointment) => (
                <AppointmentCardToggle key={appointment.id} appointment={appointment} />
            ))}
        </div>
    )
}
