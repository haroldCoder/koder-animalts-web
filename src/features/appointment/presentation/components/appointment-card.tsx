import React from "react";
import { AppointmentEntity } from "../../domain/entities";
import { Calendar, Clock, User, Building2, Tag } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface AppointmentCardProps {
    appointment: AppointmentEntity;
}

const STATUS_STYLES: Record<string, string> = {
    SCHEDULED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    COMPLETED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    PENDING: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const STATUS_LABELS: Record<string, string> = {
    SCHEDULED: "Agendada",
    COMPLETED: "Completada",
    CANCELLED: "Cancelada",
    PENDING: "Pendiente",
};

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
    const dateObj = new Date(appointment.date);
    const statusStyle = appointment.status
        ? (STATUS_STYLES[appointment.status] ?? "bg-muted text-muted-foreground")
        : null;
    const statusLabel = appointment.status
        ? (STATUS_LABELS[appointment.status] ?? appointment.status)
        : null;

    return (
        <article className="relative w-full bg-card border border-border/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl" />

            <div className="flex flex-col md:flex-row md:items-center justify-between p-5 pl-6 gap-4">
                {/* Date block */}
                <div className="flex items-start gap-4 flex-1">
                    <div className="flex flex-col items-center justify-center w-[64px] min-w-[64px] h-[64px] rounded-xl bg-primary/10 text-primary font-sans transition-colors group-hover:bg-primary/20">
                        <Calendar className="w-4 h-4 mb-0.5" />
                        <span className="text-2xl font-black leading-none">
                            {format(dateObj, "dd")}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">
                            {format(dateObj, "MMM", { locale: es })}
                        </span>
                    </div>

                    {/* Core info */}
                    <div className="flex-1 space-y-1.5 min-w-0">
                        <p className="font-semibold text-foreground text-base leading-tight truncate">
                            {appointment.reason}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                                <Clock className="size-3.5 shrink-0" />
                                {format(dateObj, "hh:mm a")}
                            </span>

                            {appointment.veterinarianName && (
                                <span className="inline-flex items-center gap-1">
                                    <User className="size-3.5 shrink-0" />
                                    {appointment.veterinarianName}
                                </span>
                            )}

                            {appointment.clinicName && (
                                <span className="inline-flex items-center gap-1">
                                    <Building2 className="size-3.5 shrink-0" />
                                    {appointment.clinicName}
                                </span>
                            )}
                        </div>

                        {appointment.notes && (
                            <p className="text-xs text-muted-foreground line-clamp-1 pt-0.5">
                                {appointment.notes}
                            </p>
                        )}
                    </div>
                </div>

                {/* Status badge */}
                {statusLabel && statusStyle && (
                    <span className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusStyle}`}>
                        <Tag className="size-3" />
                        {statusLabel}
                    </span>
                )}
            </div>
        </article>
    );
};
