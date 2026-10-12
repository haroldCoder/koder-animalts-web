import React from "react";
import { ConsultationType } from "@/features/medical-record/domain/enums";
import { ArrowDownUp } from "lucide-react";

interface StoryTimelineFilterBarProps {
    selectedTypeFilter: string;
    onSelectTypeFilter: (filter: string) => void;
    totalCount: number;
    sortAscending: boolean;
    onToggleSort: () => void;
}

export const StoryTimelineFilterBar: React.FC<StoryTimelineFilterBarProps> = ({
    selectedTypeFilter,
    onSelectTypeFilter,
    totalCount,
    sortAscending,
    onToggleSort,
}) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white dark:bg-bg-dark-2 border border-border-1 dark:border-border/10 rounded-2xl shadow-xs">
            {/* Event Type Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
                <button
                    type="button"
                    onClick={() => onSelectTypeFilter("ALL")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        selectedTypeFilter === "ALL"
                            ? "bg-main text-white shadow-xs"
                            : "bg-bg-1 dark:bg-bg-dark-3/50 text-text-2 dark:text-gray-300 hover:bg-main/10 hover:text-main"
                    }`}
                >
                    Todos ({totalCount})
                </button>

                <button
                    type="button"
                    onClick={() => onSelectTypeFilter(ConsultationType.CONSULTATION)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        selectedTypeFilter === ConsultationType.CONSULTATION
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-bg-1 dark:bg-bg-dark-3/50 text-text-2 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600"
                    }`}
                >
                    Consultas
                </button>

                <button
                    type="button"
                    onClick={() => onSelectTypeFilter(ConsultationType.VACCINATION)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        selectedTypeFilter === ConsultationType.VACCINATION
                            ? "bg-sky-600 text-white shadow-xs"
                            : "bg-bg-1 dark:bg-bg-dark-3/50 text-text-2 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-sky-950/30 hover:text-sky-600"
                    }`}
                >
                    Vacunaciones
                </button>

                <button
                    type="button"
                    onClick={() => onSelectTypeFilter("SPECIAL")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        selectedTypeFilter === "SPECIAL"
                            ? "bg-rose-600 text-white shadow-xs"
                            : "bg-bg-1 dark:bg-bg-dark-3/50 text-text-2 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600"
                    }`}
                >
                    Urgencias / Cirugías
                </button>
            </div>

            {/* Sort Toggle */}
            <button
                type="button"
                onClick={onToggleSort}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-text-2 dark:text-gray-300 bg-bg-1 dark:bg-bg-dark-3/50 border border-border-1/60 dark:border-border/10 hover:border-main/50 hover:text-main cursor-pointer shrink-0 self-start sm:self-auto"
            >
                <ArrowDownUp className="w-3.5 h-3.5" />
                <span>{sortAscending ? "Cronológico (Antiguo a Nuevo)" : "Más reciente primero"}</span>
            </button>
        </div>
    );
};
