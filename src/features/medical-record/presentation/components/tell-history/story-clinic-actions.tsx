import React from "react";
import { Building2, Syringe, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { routes } from "@/common/presentation/constants";

interface StoryClinicActionsProps {
    clinicName: string;
    veterinaryName?: string;
    hasVaccines?: boolean;
    hasDocuments?: boolean;
    recordId: string;
    onBeforeNavigate?: () => void;
    showVeterinaryName?: boolean;
}

export const StoryClinicActions: React.FC<StoryClinicActionsProps> = ({
    clinicName,
    veterinaryName,
    hasVaccines,
    hasDocuments,
    recordId,
    onBeforeNavigate,
    showVeterinaryName = true,
}) => {
    const navigate = useNavigate();

    const handleGoToVaccines = () => {
        if (onBeforeNavigate) onBeforeNavigate();
        navigate(`${routes.vaccinations.link}/?medicalRecord=${recordId}`);
    };

    const handleGoToDocuments = () => {
        if (onBeforeNavigate) onBeforeNavigate();
        navigate(`${routes.documents.link}/${recordId}`);
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-bg-1/40 dark:bg-bg-dark-3/15 border border-border-1/60 dark:border-border/10 text-xs">
            <div className="flex flex-wrap items-center gap-4 text-text-2 dark:text-gray-300">
                {showVeterinaryName && veterinaryName && (
                    <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-text-3 dark:text-muted-foreground">Dr(a):</span>
                        <strong className="text-text-1 dark:text-white">{veterinaryName}</strong>
                    </div>
                )}
                <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-main shrink-0" />
                    <span>Clínica: <strong className="text-text-1 dark:text-white">{clinicName}</strong></span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {hasVaccines && (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleGoToVaccines}
                        className="h-7 text-xs gap-1.5 cursor-pointer hover:border-main hover:text-main"
                    >
                        <Syringe className="w-3 h-3 text-sky-500" />
                        <span>Ver vacunas</span>
                    </Button>
                )}
                {hasDocuments && (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleGoToDocuments}
                        className="h-7 text-xs gap-1.5 cursor-pointer hover:border-main hover:text-main"
                    >
                        <FileText className="w-3 h-3 text-purple-500" />
                        <span>Ver exámenes</span>
                    </Button>
                )}
            </div>
        </div>
    );
};
