import React, { useMemo } from "react";
import { StoryChapter } from "@/features/medical-record/presentation/interfaces";
import {
    Activity,
    Calendar,
    CheckCircle2,
    HeartPulse,
    ShieldCheck,
    Stethoscope,
    Syringe,
    Sparkles,
} from "lucide-react";
import { ConsultationType } from "@/features/medical-record/domain/enums";

interface StoryOverviewCardProps {
    chapters: StoryChapter[];
    petName?: string;
    onStartPresentation: () => void;
    activeView: "slides" | "timeline";
    onChangeView: (view: "slides" | "timeline") => void;
}

export const StoryOverviewCard: React.FC<StoryOverviewCardProps> = ({
    chapters,
    petName,
    onStartPresentation,
    activeView,
    onChangeView
}) => {
    if (!chapters || chapters.length === 0) return null;

    const totalVisits = useMemo(() => chapters.length, [chapters]);
    const vaccineCount = useMemo(() => chapters.filter(c => c.type === ConsultationType.VACCINATION || c.hasVaccines).length, [chapters]);
    const generalVisits = useMemo(() => chapters.filter(c => c.type === ConsultationType.CONSULTATION).length, [chapters]);
    const specialVisits = useMemo(() => chapters.filter(c =>
        c.type === ConsultationType.EMERGENCY ||
        c.type === ConsultationType.SURGERY ||
        c.type === ConsultationType.HOSPITALIZATION
    ).length, [chapters]);

    const firstChapter = useMemo(() => chapters[0], [chapters]);
    const latestChapter = useMemo(() => chapters[chapters.length - 1], [chapters]);

    return (
        <section aria-label="Resumen del viaje de salud" className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white via-white to-orange-50/40 dark:from-bg-dark-2 dark:via-bg-dark-2 dark:to-main/5 border border-border-1/80 dark:border-border/10 p-6 md:p-8 shadow-sm">
            {/* Background subtle badge decorative */}
            <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-48 h-48 bg-main/5 dark:bg-main/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                {/* Left side text */}
                <div className="space-y-3 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-main/10 text-main dark:bg-main/20 border border-main/20">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Acompañamiento Veterinario Integral</span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-black text-text-1 dark:text-white tracking-tight leading-tight">
                        {petName
                            ? `El viaje de salud y bienestar de ${petName}`
                            : "El recorrido de bienestar de tus mascotas"}
                    </h2>

                    <p className="text-sm text-text-2 dark:text-gray-300 leading-relaxed">
                        Aquí puedes revivir cada momento clínico de forma clara, sencilla y humana. Desde sus primeros chequeos hasta sus cuidados actuales en la veterinaria.
                    </p>

                    {/* Reassurance badge */}
                    <div className="flex items-center gap-2 pt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Historial al día con seguimiento preventivo</span>
                    </div>
                </div>

                {/* Right side stats pill */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto shrink-0">
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-bg-dark-3/30 border border-border-1 dark:border-border/10 shadow-xs flex flex-col items-center justify-center text-center">
                        <div className="p-2 rounded-xl bg-orange-100 dark:bg-main/15 text-main mb-1.5">
                            <Activity className="w-4 h-4" />
                        </div>
                        <span className="text-xl font-black text-text-1 dark:text-white leading-none">{totalVisits}</span>
                        <span className="text-[11px] font-medium text-text-3 dark:text-muted-foreground mt-1">Total Registros</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white dark:bg-bg-dark-3/30 border border-border-1 dark:border-border/10 shadow-xs flex flex-col items-center justify-center text-center">
                        <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 mb-1.5">
                            <Syringe className="w-4 h-4" />
                        </div>
                        <span className="text-xl font-black text-text-1 dark:text-white leading-none">{vaccineCount}</span>
                        <span className="text-[11px] font-medium text-text-3 dark:text-muted-foreground mt-1">Protección / Vacunas</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white dark:bg-bg-dark-3/30 border border-border-1 dark:border-border/10 shadow-xs flex flex-col items-center justify-center text-center col-span-2 sm:col-span-1">
                        <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mb-1.5">
                            <Calendar className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-text-1 dark:text-white leading-none truncate max-w-[100px]">
                            {latestChapter.timeAgo}
                        </span>
                        <span className="text-[11px] font-medium text-text-3 dark:text-muted-foreground mt-1">Última Atención</span>
                    </div>
                </div>
            </div>

            {/* Bottom summary bar with view switch and play button */}
            <div className="mt-6 pt-5 border-t border-border-1/60 dark:border-border/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4 text-xs text-text-3 dark:text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Stethoscope className="w-3.5 h-3.5 text-main" />
                        <span>{generalVisits} Consultas</span>
                    </div>
                    {specialVisits > 0 && (
                        <div className="flex items-center gap-1.5">
                            <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                            <span>{specialVisits} Cuidados Especiales</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Primera visita: {firstChapter.formattedDate}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* View Switcher: Slides vs Timeline */}
                    <div className="inline-flex p-1 rounded-xl bg-bg-1 dark:bg-bg-dark-3/50 border border-border-1 dark:border-border/10 text-xs">
                        <button
                            type="button"
                            onClick={() => onChangeView("slides")}
                            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${activeView === "slides"
                                ? "bg-white dark:bg-bg-dark-2 text-main shadow-xs"
                                : "text-text-3 dark:text-muted-foreground hover:text-text-1 dark:hover:text-white"
                                }`}
                        >
                            Modo Guiado (Paso a Paso)
                        </button>
                        <button
                            type="button"
                            onClick={() => onChangeView("timeline")}
                            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${activeView === "timeline"
                                ? "bg-white dark:bg-bg-dark-2 text-main shadow-xs"
                                : "text-text-3 dark:text-muted-foreground hover:text-text-1 dark:hover:text-white"
                                }`}
                        >
                            Línea de Tiempo
                        </button>
                    </div>

                    {activeView !== "slides" && (
                        <button
                            type="button"
                            onClick={onStartPresentation}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-main text-white font-semibold text-xs hover:bg-main-hover transition-colors shadow-xs cursor-pointer"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Reproducir</span>
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};
