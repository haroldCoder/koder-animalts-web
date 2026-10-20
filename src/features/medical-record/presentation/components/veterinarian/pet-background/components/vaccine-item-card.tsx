import React from "react";
import { Check } from "lucide-react";

interface VaccineItemCardProps {
    label: string;
    description: string;
    isChecked: boolean;
    onToggle: () => void;
    isReadOnly?: boolean;
}

export const VaccineItemCard: React.FC<VaccineItemCardProps> = ({
    label,
    description,
    isChecked,
    onToggle,
    isReadOnly = false,
}) => {
    return (
        <button
            type="button"
            disabled={isReadOnly}
            onClick={onToggle}
            className={`
                flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 select-none
                ${isChecked
                    ? "border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200 shadow-xs"
                    : "border-border-1 dark:border-border/10 bg-bg-1/20 dark:bg-bg-dark-3/20 hover:border-main/30 text-text-2 dark:text-gray-300"
                }
                ${isReadOnly ? "cursor-default" : "cursor-pointer"}
            `}
        >
            <div>
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-[11px] text-text-3 dark:text-gray-400 line-clamp-1">{description}</p>
            </div>
            <div
                className={`
                    size-5 rounded-md flex items-center justify-center border transition-colors
                    ${isChecked
                        ? "bg-emerald-500 border-emerald-600 text-white"
                        : "border-gray-300 dark:border-gray-600 bg-white dark:bg-bg-dark-2"
                    }
                `}
            >
                {isChecked && <Check className="size-3.5 stroke-[3]" />}
            </div>
        </button>
    );
};
