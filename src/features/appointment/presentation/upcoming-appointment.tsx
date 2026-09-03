import { useMemo, useState } from "react";
import { useAuth } from "@/common/hooks";
import { useGetAppointmentsByUserId } from "../application/queries";
import { AppointmentEntity } from "../domain/entities";
import { AppointmentCard } from "./components";
import { getDateUpcoming } from "@/common/utils";
import { DatePicker, Error, Loading } from "@/common/presentation/components";
import { CalendarDays } from "lucide-react";
import { useDateSetter } from "@/common/presentation/hooks";

export const UpcomingAppointment = () => {
    const { user } = useAuth();

    const { startDateString, endDateString } = useDateSetter(0, 7);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    const { data, isLoading, error } = useGetAppointmentsByUserId(user!, {
        startDate: startDateString,
        endDate: endDate ?? endDateString
    });

    const upcomingAppointments = useMemo(() => {
        if (!data) return [];
        return data.filter((appointment: AppointmentEntity) =>
            getDateUpcoming(appointment.date)
        );
    }, [data]);

    if (isLoading) return <Loading />;
    if (error) return <Error message={error.message || "Error al cargar próximas citas"} />;

    if (upcomingAppointments.length === 0) {
        return (
            <div className="flex flex-col items-center gap-4 justify-center py-20">
                <CalendarDays className="w-10 h-10 text-muted-foreground/40" />
                <div className="text-center">
                    <p className="font-medium text-foreground">¡No hay próximas citas agendadas!</p>
                    <p className="text-sm text-muted-foreground mt-1">
                        Usa el botón "Agendar Cita" para programar una consulta.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-end">
                <DatePicker setEndDate={setEndDate} endDate={endDate} disabledStart={true} />
            </div>
            {upcomingAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
        </div>
    );
};
