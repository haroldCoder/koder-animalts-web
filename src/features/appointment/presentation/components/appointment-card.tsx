import React from "react";
import { Calendar, Clock, Tag, Eye } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AppointmentPopUp } from "./appointment-pop-up";
import { AppointmentStatusEnum } from "../../domain/enums";
import { AppointmentDataDto } from "../../domain/dtos";

interface AppointmentCardProps {
    appointment: AppointmentDataDto;
}

const STATUS_STYLES: Record<string, string> = {
    SCHEDULED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    COMPLETED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const STATUS_LABELS: Record<string, string> = {
    SCHEDULED: "Agendada",
    COMPLETED: "Completada",
    CANCELLED: "Cancelada",
};

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
    const dateObj = new Date(appointment.date);
    const statusStyle = appointment.status
        ? (STATUS_STYLES[appointment.status] ?? "bg-muted text-muted-foreground")
        : null;
    const statusLabel = appointment.status
        ? (STATUS_LABELS[appointment.status] ?? appointment.status)
        : null;

    const getAccentColorClass = () => {
        if (appointment.status === AppointmentStatusEnum.CANCELLED) return "bg-red-500";
        if (appointment.status === AppointmentStatusEnum.COMPLETED) return "bg-emerald-500";
        return "bg-primary";
    };

    return (
        <article className="relative w-full bg-card border border-border/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
            {/* Left accent bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${getAccentColorClass()}`} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 pl-5 sm:pl-6 gap-3.5 sm:gap-4">
                {/* Date block & Info */}
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                    {/* Calendar Badge */}
                    <div className={`flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 min-w-[3.5rem] sm:min-w-[4rem] rounded-xl ${statusStyle ?? "bg-primary/10 text-primary"} font-sans transition-colors group-hover:bg-primary/20 shrink-0`}>
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-0.5" />
                        <span className="text-xl sm:text-2xl font-black leading-none">
                            {format(dateObj, "dd")}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mt-0.5">
                            {format(dateObj, "MMM", { locale: es })}
                        </span>
                    </div>

                    {/* Core info */}
                    <div className="flex-1 space-y-1 sm:space-y-1.5 min-w-0">
                        <p className="font-semibold text-foreground text-sm sm:text-base leading-tight break-words line-clamp-2 sm:line-clamp-1">
                            {appointment.reason}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                                <Clock className="size-3.5 shrink-0 text-muted-foreground/80" />
                                {format(dateObj, "hh:mm a")}
                            </span>
                            {appointment.petName && (
                                <span className="inline-flex items-center gap-1 truncate max-w-[180px] sm:max-w-[220px]">
                                    <span className="text-muted-foreground/60">•</span>
                                    <span>Mascota: <strong className="font-medium text-foreground">{appointment.petName}</strong></span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Status badge & Action button */}
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-border/40 shrink-0">
                    {statusLabel && statusStyle && (
                        <span className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold ${statusStyle}`}>
                            <Tag className="size-3" />
                            {statusLabel}
                        </span>
                    )}

                    <Dialog>
                        <DialogTrigger>
                            <Button variant="outline" size="sm" className="gap-2 cursor-pointer hover:text-main-hover ml-auto sm:ml-0">
                                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="inline sm:hidden text-xs">Ver</span>
                            </Button>
                        </DialogTrigger>
                        <AppointmentPopUp appointment={appointment} />
                    </Dialog>
                </div>
            </div>
        </article>
    );
};
