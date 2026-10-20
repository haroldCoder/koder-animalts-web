import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileEdit } from "lucide-react";
import {
    CanineVaccinationPlan,
    FelineVaccinationPlan,
    DewormingPlan
} from "@/features/pet/domain/entities";
import { CANINE_VACCINE_LABELS, FELINE_VACCINE_LABELS } from "../constants";
import {
    VaccinationPlanHeader,
    VaccineChecklistGrid,
    DewormingControlSection
} from "./components";

export interface PetVaccinationPlanFormData {
    lastVaccinationDate: string;
    canineVaccines: CanineVaccinationPlan;
    felineVaccines: FelineVaccinationPlan;
    deworming: DewormingPlan;
    otherVaccinesNotes: string;
}

interface PetVaccinationPlanCardProps {
    species?: string;
    data: PetVaccinationPlanFormData;
    onChange: (fields: Partial<PetVaccinationPlanFormData>) => void;
    isReadOnly?: boolean;
}

export const PetVaccinationPlanCard: React.FC<PetVaccinationPlanCardProps> = ({
    species = "Canino",
    data,
    onChange,
    isReadOnly = false,
}) => {
    const isPetFeline = React.useMemo(() => species.toLowerCase().includes("fel") || species.toLowerCase().includes("gato"), [species]);
    const [speciesType, setSpeciesType] = React.useState<"canine" | "feline">(
        isPetFeline ? "feline" : "canine"
    );

    React.useEffect(() => {
        const isFelineDetected = species.toLowerCase().includes("fel") || species.toLowerCase().includes("gato");
        setSpeciesType(isFelineDetected ? "feline" : "canine");
    }, [species]);

    const isFeline = speciesType === "feline";

    const toggleCanineVaccine = (key: keyof CanineVaccinationPlan) => {
        if (isReadOnly) return;
        onChange({
            canineVaccines: {
                ...data.canineVaccines,
                [key]: !data.canineVaccines[key],
            },
        });
    };

    const toggleFelineVaccine = (key: keyof FelineVaccinationPlan) => {
        if (isReadOnly) return;
        onChange({
            felineVaccines: {
                ...data.felineVaccines,
                [key]: !data.felineVaccines[key],
            },
        });
    };

    return (
        <div className="bg-white dark:bg-bg-dark-2 rounded-2xl border border-border-1 dark:border-border/10 p-6 shadow-sm space-y-6">
            <VaccinationPlanHeader
                speciesType={speciesType}
                onSpeciesTypeChange={setSpeciesType}
                lastVaccinationDate={data.lastVaccinationDate}
                onDateChange={(lastVaccinationDate) => onChange({ lastVaccinationDate })}
                isReadOnly={isReadOnly}
            />

            {isFeline ? (
                <VaccineChecklistGrid<keyof FelineVaccinationPlan>
                    title="Inmunizaciones Principales (Felinas)"
                    items={FELINE_VACCINE_LABELS}
                    values={data.felineVaccines}
                    onToggle={toggleFelineVaccine}
                    isReadOnly={isReadOnly}
                />
            ) : (
                <VaccineChecklistGrid<keyof CanineVaccinationPlan>
                    title="Inmunizaciones Principales (Caninas)"
                    items={CANINE_VACCINE_LABELS}
                    values={data.canineVaccines}
                    onToggle={toggleCanineVaccine}
                    isReadOnly={isReadOnly}
                />
            )}

            <DewormingControlSection
                deworming={data.deworming}
                onChange={(deworming) => onChange({ deworming })}
                isReadOnly={isReadOnly}
            />

            <div className="space-y-2 pt-2">
                <Label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-2 dark:text-gray-300">
                    <FileEdit className="size-3.5 text-main" />
                    Otras Inmunizaciones / Observaciones
                </Label>
                <Input
                    disabled={isReadOnly}
                    value={data.otherVaccinesNotes}
                    onChange={(e) => onChange({ otherVaccinesNotes: e.target.value })}
                    placeholder="Ej. Vacuna contra Tos de las perreras nasal, refuerzo especial, microchip..."
                    className="bg-bg-1/30 dark:bg-bg-dark-3/30"
                />
            </div>
        </div>
    );
};
