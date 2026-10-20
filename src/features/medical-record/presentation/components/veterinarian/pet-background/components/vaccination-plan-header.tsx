import React from "react";
import { Input } from "@/components/ui/input";
import { Syringe, Dog, Cat, Calendar } from "lucide-react";

interface VaccinationPlanHeaderProps {
    speciesType: "canine" | "feline";
    onSpeciesTypeChange: (type: "canine" | "feline") => void;
    lastVaccinationDate?: string;
    onDateChange: (date: string) => void;
    isReadOnly?: boolean;
}

export const VaccinationPlanHeader: React.FC<VaccinationPlanHeaderProps> = ({
    speciesType,
    onSpeciesTypeChange,
    lastVaccinationDate = "",
    onDateChange,
    isReadOnly = false,
}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-1 dark:border-border/10">
            <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Syringe className="size-5" />
                </div>
                <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-lg font-bold text-text-1 dark:text-white">
                            Plan de Vacunación y Control Parasitario
                        </h3>

                        {/* Interactive toggle for Canine vs Feline */}
                        <div className="inline-flex items-center p-0.5 rounded-lg bg-bg-1 dark:bg-bg-dark-3/60 border border-border-1 dark:border-border/10">
                            <button
                                type="button"
                                disabled={isReadOnly}
                                onClick={() => onSpeciesTypeChange("canine")}
                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                                    speciesType === "canine"
                                        ? "bg-white dark:bg-bg-dark-1 text-main shadow-xs"
                                        : "text-text-3 hover:text-text-1 dark:hover:text-white"
                                }`}
                            >
                                <Dog className="size-3.5" />
                                <span>Canino</span>
                            </button>
                            <button
                                type="button"
                                disabled={isReadOnly}
                                onClick={() => onSpeciesTypeChange("feline")}
                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                                    speciesType === "feline"
                                        ? "bg-white dark:bg-bg-dark-1 text-main shadow-xs"
                                        : "text-text-3 hover:text-text-1 dark:hover:text-white"
                                }`}
                            >
                                <Cat className="size-3.5" />
                                <span>Felino</span>
                            </button>
                        </div>
                    </div>
                    <p className="text-xs text-text-3 dark:text-muted-foreground mt-0.5">
                        Registro de inmunizaciones basales y antiparasitarios
                    </p>
                </div>
            </div>

            {/* Fecha de última vacunación */}
            <div className="flex items-center gap-2">
                <Calendar className="size-4 text-text-3" />
                <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-text-3 uppercase tracking-wider">
                        Última Vacunación
                    </span>
                    <Input
                        type="date"
                        disabled={isReadOnly}
                        value={lastVaccinationDate}
                        onChange={(e) => onDateChange(e.target.value)}
                        className="h-8 text-xs bg-bg-1/40 dark:bg-bg-dark-3/40 w-36"
                    />
                </div>
            </div>
        </div>
    );
};
