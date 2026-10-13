import React from "react";
import { Stethoscope, Bookmark, Shield } from "lucide-react";

interface StoryClinicalBreakdownProps {
    reasonSummary: string;
    diagnosisSummary: string;
    treatmentSummary: string;
    homeCareTip: string;
    veterinaryName?: string;
    showVeterinaryInTreatment?: boolean;
}

export const StoryClinicalBreakdown: React.FC<StoryClinicalBreakdownProps> = ({
    reasonSummary,
    diagnosisSummary,
    treatmentSummary,
    homeCareTip,
    veterinaryName,
    showVeterinaryInTreatment = false,
}) => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Motivo & Diagnóstico */}
                <div className="p-4 rounded-2xl bg-bg-1/60 dark:bg-bg-dark-3/20 border border-border-1/60 dark:border-border/10 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-text-3 dark:text-muted-foreground uppercase tracking-wider">
                        <Stethoscope className="w-3.5 h-3.5 text-main" />
                        <span>Motivo y Evaluación</span>
                    </div>
                    <div>
                        <span className="text-[11px] font-semibold text-text-3 dark:text-muted-foreground">Motivo:</span>
                        <p className="text-xs sm:text-sm font-semibold text-text-1 dark:text-white mt-0.5">
                            {reasonSummary}
                        </p>
                    </div>
                    <div className="pt-2 border-t border-border-1/50 dark:border-border/10">
                        <span className="text-[11px] font-semibold text-text-3 dark:text-muted-foreground">Diagnóstico del médico:</span>
                        <p className="text-xs sm:text-sm text-text-2 dark:text-gray-300 mt-0.5">
                            {diagnosisSummary}
                        </p>
                    </div>
                </div>

                {/* Tratamiento & Plan */}
                <div className="p-4 rounded-2xl bg-bg-1/60 dark:bg-bg-dark-3/20 border border-border-1/60 dark:border-border/10 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-text-3 dark:text-muted-foreground uppercase tracking-wider">
                        <Bookmark className="w-3.5 h-3.5 text-main" />
                        <span>Tratamiento y Plan</span>
                    </div>
                    <div>
                        <span className="text-[11px] font-semibold text-text-3 dark:text-muted-foreground">Tratamiento:</span>
                        <p className="text-xs sm:text-sm font-semibold text-text-1 dark:text-white mt-0.5">
                            {treatmentSummary}
                        </p>
                    </div>
                    {showVeterinaryInTreatment && veterinaryName && (
                        <div className="pt-2 border-t border-border-1/50 dark:border-border/10">
                            <span className="text-[11px] font-semibold text-text-3 dark:text-muted-foreground">Profesional a cargo:</span>
                            <p className="text-xs sm:text-sm text-text-1 dark:text-white font-medium mt-0.5">
                                Dr(a). {veterinaryName}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Consejo para el hogar */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 flex items-start gap-3">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                        Consejo para el dueño en casa
                    </span>
                    <p className="text-xs sm:text-sm text-text-2 dark:text-gray-200 mt-1 leading-relaxed">
                        {homeCareTip}
                    </p>
                </div>
            </div>
        </div>
    );
};
