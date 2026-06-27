import { useAuth } from "@/common/hooks"
import { useGetAppointmentsByUserId } from "../application/queries";
import { useMemo } from "react";
import { getDateUpcoming } from "@/common/utils";
import { Error, Loading } from "@/common/presentation/components";
import { AppointmentCardToggle } from "./components";

export const UpcomingAppointment = () => {
    const { user } = useAuth();
    const { data, isLoading, error } = useGetAppointmentsByUserId(user!)

    const appointments = useMemo(() => {
        if (!data) return [];

        return data.filter((appointment) => getDateUpcoming(appointment.date));
    }, [data]);

    console.log(appointments);


    if (isLoading) return <Loading />;
    if (error) return <Error message={error.message || "Error al cargar proximas citas"} />

    return (
        <div className="flex flex-col gap-4">
            {appointments.map((appointment) => (
                <AppointmentCardToggle key={appointment.id} appointment={appointment} />
            ))}
        </div>
    )
}
