import { useAuth } from "@/common/hooks"
import { useGetAppointmentsByUserId } from "../application/queries";
import { useMemo } from "react";
import { getDateUpcoming } from "@/common/utils";
import { Error, Loading } from "@/common/presentation/components";
import { AppointmentCardToggle } from "./components";
import { CalendarDays } from "lucide-react";

export const UpcomingAppointment = () => {
    const { user } = useAuth();
    const { data, isLoading, error } = useGetAppointmentsByUserId(user!)

    const appointments = useMemo(() => {
        if (!data) return [];

        return data.filter((appointment) => getDateUpcoming(appointment.date));
    }, [data]);


    if (isLoading) return <Loading />;
    if (error) return <Error message={error.message || "Error al cargar proximas citas"} />

    return (
        <div className="flex flex-col gap-4">
            {appointments.length === 0 ? (
                <div className="flex flex-col items-center gap-4 justify-center h-[calc(100vh-20rem)]">
                    <CalendarDays className="w-10 h-10 text-gray-400" />
                    <span className="text-text-2 text-base">¡No hay próximas citas agendadas!</span>
                </div>
            ) : (
                appointments.map((appointment) => (
                    <AppointmentCardToggle key={appointment.id} appointment={appointment} />
                ))
            )}
        </div>
    )
}
