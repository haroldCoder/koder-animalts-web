import React, { useState } from "react";
import { AppointmentEntity } from "@/features/appointment/domain/entities";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Calendar,
    Clock,
    User,
    MapPin,
    ChevronDown,
    FileText,
    FileCheck,
    Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractHourFromDate } from "@/common/utils";
import { getTypeConfig } from "../constants";

interface AppointmentCardToggleProps {
    appointment: AppointmentEntity;
    isExpandedInitially?: boolean;
}

export const AppointmentCardToggle: React.FC<AppointmentCardToggleProps> = ({
    appointment,
    isExpandedInitially = false
}) => {
    const [isExpanded, setIsExpanded] = useState(isExpandedInitially);

    const dateObj = new Date(appointment.date);
    const formattedDay = new Intl.DateTimeFormat("es-ES", { day: "2-digit" }).format(dateObj);
    const formattedMonth = new Intl.DateTimeFormat("es-ES", { month: "short" }).format(dateObj).replace(".", "");
    const formattedYear = new Intl.DateTimeFormat("es-ES", { year: "numeric" }).format(dateObj);


    const config = getTypeConfig(appointment.type);
    const TypeIcon = config.icon;

    return (
        <article
            className={`
        relative overflow-hidden w-full bg-white dark:bg-bg-dark-2 
        border border-border-1 dark:border-border/10 rounded-2xl 
        shadow-sm hover:shadow-md transition-all duration-300
        border-l-4 ${config.borderClass}
        ${isExpanded ? "ring-1 ring-main/20 shadow-md" : ""}
      `}
        >
            {/* CARD HEADER (Toggle click area) */}
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex flex-col md:flex-row md:items-center justify-between p-5 gap-4 cursor-pointer select-none hover:bg-bg-1/40 dark:hover:bg-bg-dark-3/20 transition-colors"
            >
                <div className="flex items-start gap-4 flex-1">
                    {/* Calendar block */}
                    <div
                        className={`
              flex flex-col items-center justify-center w-[70px] min-w-[70px] h-[72px]
              rounded-xl p-2 font-sans ${config.calendarClass} transition-colors
            `}
                    >
                        <Calendar className="w-4 h-4 mb-0.5" />
                        <span className="text-2xl font-black leading-none">{formattedDay}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">{formattedMonth}</span>
                    </div>

                    {/* Core Info */}
                    <div className="flex-1 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.badgeClass}`}>
                                <TypeIcon className="w-3.5 h-3.5" />
                                {config.label}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-text-3 dark:text-muted-foreground bg-bg-1 dark:bg-bg-dark-3/50 px-2 py-0.5 rounded-md font-medium">
                                <Clock className="w-3.5 h-3.5 text-main" />
                                {extractHourFromDate(appointment.date)}
                            </span>
                        </div>

                        <h3 className="text-base md:text-lg font-bold text-text-1 dark:text-white leading-tight">
                            {appointment.reasonForVisit}
                        </h3>

                        {/* Pet Info */}
                        <div className="flex items-center gap-2 pt-0.5">
                            <Avatar size="sm" className="border border-border-1 dark:border-border/20">
                                <AvatarImage src={appointment.petPhoto} alt={appointment.petName} />
                                <AvatarFallback className="bg-main/10 text-main font-bold">
                                    {appointment.petName.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-text-2 dark:text-muted-foreground">
                                Paciente: <span className="text-text-1 dark:text-white font-semibold">{appointment.petName}</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action controls on the right */}
                <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-border-1 dark:border-border/10">
                    <div className="hidden sm:flex flex-col text-right text-xs">
                        <span className="text-text-3 dark:text-muted-foreground">Clínica</span>
                        <span className="font-semibold text-text-2 dark:text-white max-w-[150px] truncate">{appointment.clinicName}</span>
                    </div>

                    <div
                        className={`
              p-2 rounded-full bg-bg-1 dark:bg-bg-dark-3/50 text-text-2 dark:text-white
              hover:bg-main-light hover:text-main dark:hover:bg-main/20 dark:hover:text-main
              transition-all duration-300
              ${isExpanded ? "rotate-180 bg-main-light text-main" : ""}
            `}
                    >
                        <ChevronDown className="w-5 h-5 transition-transform" />
                    </div>
                </div>
            </div>

            {/* EXPANDED CONTENT AREA */}
            <div
                className={`
          grid transition-all duration-300 ease-in-out border-t border-border-1 dark:border-border/10
          ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"}
        `}
            >
                <div className="overflow-hidden">
                    <div className="p-5 bg-gray-50/50 dark:bg-bg-dark-3/10 space-y-6">

                        {/* Quick stats grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Doctor / Veterinary */}
                            <div className="flex items-center gap-3 p-3 bg-white dark:bg-bg-dark-2 rounded-xl border border-border-1 dark:border-border/10">
                                <div className="p-2 bg-main-light dark:bg-main/10 rounded-lg text-main">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-medium text-text-3 dark:text-muted-foreground uppercase tracking-wider">Veterinario</p>
                                    <p className="text-sm font-semibold text-text-1 dark:text-white">{appointment.veterinaryName}</p>
                                </div>
                            </div>

                            {/* Clinic Name */}
                            <div className="flex items-center gap-3 p-3 bg-white dark:bg-bg-dark-2 rounded-xl border border-border-1 dark:border-border/10">
                                <div className="p-2 bg-main-light dark:bg-main/10 rounded-lg text-main">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-medium text-text-3 dark:text-muted-foreground uppercase tracking-wider">Centro Veterinario</p>
                                    <p className="text-sm font-semibold text-text-1 dark:text-white">{appointment.clinicName}</p>
                                </div>
                            </div>
                        </div>

                        {/* Observations / Notes */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-semibold text-text-3 dark:text-muted-foreground uppercase tracking-wider">
                                <Bookmark className="w-3.5 h-3.5 text-main" />
                                <span>Notas y Observaciones Clínicas</span>
                            </div>
                            <div className="p-4 bg-white dark:bg-bg-dark-2 rounded-xl border border-border-1 dark:border-border/10 min-h-[60px] text-sm text-text-2 dark:text-muted-foreground leading-relaxed">
                                {appointment.notes ? (
                                    appointment.notes
                                ) : (
                                    <span className="italic text-text-3 dark:text-muted-foreground/60">No se registraron notas para esta consulta.</span>
                                )}
                            </div>
                        </div>

                        {
                            appointment.documentIds && appointment.documentIds.length > 0 && (
                                <div className="space-y-3 pt-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-text-3 dark:text-muted-foreground uppercase tracking-wider">
                                            <FileText className="w-3.5 h-3.5 text-main" />
                                            <span>Documentos y Resultados</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button className="bg-black text-white hover:bg-main hover:text-white cursor-pointer">Ver Documentos</Button>
                                    </div>
                                </div>
                            )
                        }

                        {/* Bottom meta stats info */}
                        <div className="flex justify-between items-center text-[11px] text-text-3 dark:text-muted-foreground/60 pt-2 border-t border-border-1 dark:border-border/10">
                            <span className="flex items-center gap-1">
                                <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
                                Atendido el {formattedDay} de {formattedMonth}, {formattedYear}
                            </span>
                            <span>ID Cita: {appointment.id}</span>
                        </div>

                    </div>
                </div>
            </div>
        </article>
    );
};
