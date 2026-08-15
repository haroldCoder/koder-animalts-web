import { useAuth } from "@/common/hooks";
import { useGetAppointmentsByUserId } from "../../application/queries";
import { AppointmentEntity } from "../../domain/entities";
import { Error, Loading } from "@/common/presentation/components";
import { CalendarDays, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const AppointmentsList = () => {
    const { user } = useAuth();
    const { data: appointments, isLoading, error } = useGetAppointmentsByUserId(user!);

    if (isLoading) return <Loading />;
    if (error) return <Error message={error.message || "Error al cargar citas"} />;

    return (
        <div className="flex flex-col gap-4">
            {!appointments || appointments.length === 0 ? (
                <div className="flex flex-col items-center gap-4 justify-center py-20">
                    <CalendarDays className="w-10 h-10 text-muted-foreground/40" />
                    <div className="text-center">
                        <p className="font-medium text-foreground">¡No hay citas agendadas!</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            Usa el botón "Agendar Cita" para programar una consulta.
                        </p>
                    </div>
                </div>
            ) : (
                appointments.map((appointment: AppointmentEntity) => (
                    <div
                        key={appointment.id}
                        className="p-5 rounded-xl border border-border/50 bg-card hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex flex-col gap-1 flex-1 min-w-0">
                                <p className="font-semibold text-foreground truncate">
                                    {appointment.reason}
                                </p>
                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <Clock className="size-3.5 shrink-0" />
                                    <span>
                                        {format(appointment.date, "PPP 'a las' hh:mm a", { locale: es })}
                                    </span>
                                </div>
                                {appointment.veterinarianName && (
                                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                        <User className="size-3.5 shrink-0" />
                                        <span>{appointment.veterinarianName}</span>
                                        {appointment.clinicName && (
                                            <span className="text-muted-foreground/60">· {appointment.clinicName}</span>
                                        )}
                                    </div>
                                )}
                            </div>
                            {appointment.status && (
                                <span className="shrink-0 px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
                                    {appointment.status}
                                </span>
                            )}
                        </div>
                        {appointment.notes && (
                            <div className="mt-3 pt-3 border-t border-border/50 text-sm text-muted-foreground">
                                <p className="line-clamp-2">{appointment.notes}</p>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};
