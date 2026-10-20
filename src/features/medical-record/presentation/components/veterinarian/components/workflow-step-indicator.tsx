import React from "react";
import { User, Dog, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WorkflowStepIndicatorProps {
    currentStep: 1 | 2;
}

export const WorkflowStepIndicator: React.FC<WorkflowStepIndicatorProps> = ({ currentStep }) => {
    return (
        <div className="flex items-center justify-center gap-3 w-full pb-3 border-b border-border/60">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
                <div
                    className={cn(
                        "size-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200",
                        currentStep === 1
                            ? "bg-primary text-primary-foreground shadow-xs ring-2 ring-primary/20"
                            : "bg-emerald-500 text-white"
                    )}
                >
                    {currentStep > 1 ? <Check className="size-3.5 stroke-[3]" /> : <User className="size-3.5" />}
                </div>
                <span
                    className={cn(
                        "text-xs font-medium transition-colors",
                        currentStep === 1 ? "text-foreground font-semibold" : "text-muted-foreground"
                    )}
                >
                    1. Tutor
                </span>
            </div>

            {/* Divider line */}
            <div
                className={cn(
                    "h-0.5 w-10 sm:w-16 rounded-full transition-colors duration-200",
                    currentStep === 2 ? "bg-primary" : "bg-muted"
                )}
            />

            {/* Step 2 */}
            <div className="flex items-center gap-2">
                <div
                    className={cn(
                        "size-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200",
                        currentStep === 2
                            ? "bg-primary text-primary-foreground shadow-xs ring-2 ring-primary/20"
                            : "bg-muted text-muted-foreground"
                    )}
                >
                    <Dog className="size-3.5 text-main" />
                </div>
                <span
                    className={cn(
                        "text-xs font-medium transition-colors",
                        currentStep === 2 ? "text-foreground font-semibold" : "text-muted-foreground"
                    )}
                >
                    2. Mascota
                </span>
            </div>
        </div>
    );
};
