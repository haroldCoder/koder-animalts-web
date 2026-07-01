import { AppointmentEntity } from "@/features/appointment/domain/entities";
import {
    User,
    MapPin,
    FileText,
    FileCheck,
    Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/common/utils/format-date";

interface AppointmentCardToggleProps {
    appointment: AppointmentEntity;
    isExpanded?: boolean;
}


export const ExpandedContentAreaToggle: React.FC<AppointmentCardToggleProps> = ({ appointment, isExpanded }) => {
    const dateObj = new Date(appointment.date);

    return (
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

                    {/* Diagnosis */}

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-text-3 dark:text-muted-foreground uppercase tracking-wider">
                            <FileCheck className="w-3.5 h-3.5 text-main" />
                            <span>Diagnóstico</span>
                        </div>
                        <div className="p-4 bg-white dark:bg-bg-dark-2 rounded-xl border border-border-1 dark:border-border/10 min-h-[60px] text-sm text-text-2 dark:text-muted-foreground leading-relaxed">
                            {appointment.diagnosis ? (
                                appointment.diagnosis
                            ) : (
                                <span className="italic text-text-3 dark:text-muted-foreground/60">No se registró un diagnóstico para esta consulta.</span>
                            )}
                        </div>
                    </div>

                    {/* Treatment */}

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-text-3 dark:text-muted-foreground uppercase tracking-wider">
                            <FileCheck className="w-3.5 h-3.5 text-main" />
                            <span>Tratamiento</span>
                        </div>
                        <div className="p-4 bg-white dark:bg-bg-dark-2 rounded-xl border border-border-1 dark:border-border/10 min-h-[60px] text-sm text-text-2 dark:text-muted-foreground leading-relaxed">
                            {appointment.treatment ? (
                                appointment.treatment
                            ) : (
                                <span className="italic text-text-3 dark:text-muted-foreground/60">No se registró un tratamiento para esta consulta.</span>
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
                            Atendido el {formatDate.formattedDay(dateObj)} de {formatDate.formattedMonth(dateObj)}, {formatDate.formattedYear(dateObj)}
                        </span>
                        <span>ID Cita: {appointment.id}</span>
                    </div>

                </div>
            </div>
        </div>
    )
}
