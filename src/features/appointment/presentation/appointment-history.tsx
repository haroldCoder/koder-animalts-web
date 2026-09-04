import { useMemo } from "react";
import { useAuth } from "@/common/hooks";
import { useGetAppointmentsByUserId } from "../application/queries";
import { AppointmentCard } from "./components";
import { Error, Loading } from "@/common/presentation/components";
import { Activity } from "lucide-react";
import { SortOrder } from "@/common/domain/enums";
import { useDateSetter } from "@/common/presentation/hooks";

export const AppointmentHistory = () => {
    const { user } = useAuth();

    const { endDateString } = useDateSetter(0, -1);

    const { data: appointments, isLoading, error } = useGetAppointmentsByUserId(user!, {
        endDate: endDateString,
        sortOrder: SortOrder.DESC
    });

    const pastAppointments = useMemo(() => {
        if (!appointments) return [];
        return appointments;
    }, [appointments]);

    if (isLoading) return <Loading />;
    if (error) return <Error message={error?.message || "Error al cargar el historial de citas"} />;

    if (pastAppointments.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center gap-2 py-20">
                <Activity className="text-muted-foreground/40" size={40} />
                <h2 className="text-foreground font-semibold">No hay citas pasadas</h2>
                <p className="text-muted-foreground text-sm">Las citas que ya han ocurrido aparecerán aquí</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {pastAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
        </div>
    );
};
