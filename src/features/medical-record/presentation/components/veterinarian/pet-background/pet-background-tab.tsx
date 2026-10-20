import React, { useEffect, useState } from "react";
import { PetEntity } from "@/features/pet/domain/entities";
import {
    useGetPetBackgroundQuery,
    useUpdatePetBackgroundMutation
} from "@/features/pet/application/queries";
import {
    PetMedicalReviewCard,
    PetMedicalReviewFormData
} from "./pet-medical-review-card";
import {
    PetVaccinationPlanCard,
    PetVaccinationPlanFormData
} from "./pet-vaccination-plan-card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Loading } from "@/common/presentation/components";
import { useAuth } from "@/common/hooks";
import { toast } from "sonner";
import {
    Save,
    CheckCircle,
    PawPrint,
    Sparkles
} from "lucide-react";
import { DEFAULT_REVIEW_DATA, DEFAULT_VACCINATION_DATA } from "../constants";

interface PetBackgroundTabProps {
    pet?: PetEntity;
    isVeterinary?: boolean;
}

export const PetBackgroundTab: React.FC<PetBackgroundTabProps> = ({
    pet,
    isVeterinary = false,
}) => {
    const { user } = useAuth();
    const { data: background, isLoading } = useGetPetBackgroundQuery(pet?.id, user || undefined);
    const { mutateAsync: updateBackground, isPending: isSaving } = useUpdatePetBackgroundMutation();

    const [reviewData, setReviewData] = useState<PetMedicalReviewFormData>(DEFAULT_REVIEW_DATA);
    const [vaccinationData, setVaccinationData] = useState<PetVaccinationPlanFormData>(DEFAULT_VACCINATION_DATA);
    const [_, setHasUnsavedChanges] = useState(false);

    // Sync from server data
    useEffect(() => {
        if (background) {
            setReviewData({
                provenance: background.provenance || "",
                diet: background.diet || "",
                isNeutered: !!background.isNeutered,
                neuteredDate: background.neuteredDate ? String(background.neuteredDate).split("T")[0] : "",
                previousIllnesses: background.previousIllnesses || "",
                hasAllergies: !!background.hasAllergies,
                allergiesDescription: background.allergiesDescription || "",
            });

            setVaccinationData({
                lastVaccinationDate: background.lastVaccinationDate ? String(background.lastVaccinationDate).split("T")[0] : "",
                canineVaccines: {
                    ...DEFAULT_VACCINATION_DATA.canineVaccines,
                    ...(background.canineVaccines || {})
                },
                felineVaccines: {
                    ...DEFAULT_VACCINATION_DATA.felineVaccines,
                    ...(background.felineVaccines || {})
                },
                deworming: {
                    ...DEFAULT_VACCINATION_DATA.deworming,
                    ...(background.deworming || {}),
                    lastInternalDewormingDate: background.deworming?.lastInternalDewormingDate
                        ? String(background.deworming.lastInternalDewormingDate).split("T")[0]
                        : "",
                    lastExternalDewormingDate: background.deworming?.lastExternalDewormingDate
                        ? String(background.deworming.lastExternalDewormingDate).split("T")[0]
                        : "",
                },
                otherVaccinesNotes: background.otherVaccinesNotes || "",
            });
            setHasUnsavedChanges(false);
        } else {
            setReviewData(DEFAULT_REVIEW_DATA);
            setVaccinationData(DEFAULT_VACCINATION_DATA);
            setHasUnsavedChanges(false);
        }
    }, [background, pet?.id]);

    const handleReviewChange = (fields: Partial<PetMedicalReviewFormData>) => {
        setReviewData((prev) => ({ ...prev, ...fields }));
        setHasUnsavedChanges(true);
    };

    const handleVaccinationChange = (fields: Partial<PetVaccinationPlanFormData>) => {
        setVaccinationData((prev) => ({ ...prev, ...fields }));
        setHasUnsavedChanges(true);
    };

    const handleSave = async () => {
        if (!pet?.id) return;

        try {
            await updateBackground({
                petId: pet.id,
                userId: user || undefined,
                provenance: reviewData.provenance || undefined,
                diet: reviewData.diet || undefined,
                isNeutered: reviewData.isNeutered,
                neuteredDate: reviewData.neuteredDate || undefined,
                previousIllnesses: reviewData.previousIllnesses || undefined,
                hasAllergies: reviewData.hasAllergies,
                allergiesDescription: reviewData.allergiesDescription || undefined,
                lastVaccinationDate: vaccinationData.lastVaccinationDate || undefined,
                canineVaccines: vaccinationData.canineVaccines,
                felineVaccines: vaccinationData.felineVaccines,
                deworming: vaccinationData.deworming,
                otherVaccinesNotes: vaccinationData.otherVaccinesNotes || undefined,
            });

            toast.success("Antecedentes y plan de vacunación actualizados", {
                icon: <CheckCircle className="text-emerald-500 size-5" />
            });
            setHasUnsavedChanges(false);
        } catch (error: any) {
            toast.error(error?.message || "Error al guardar los antecedentes de la mascota");
        }
    };

    if (!pet) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-bg-dark-2 rounded-2xl border border-dashed border-border-1 dark:border-border/10 space-y-4">
                <div className="p-4 rounded-full bg-main/10 text-main">
                    <PawPrint className="size-8" />
                </div>
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-text-1 dark:text-white">
                        Selecciona una mascota
                    </h3>
                    <p className="text-sm text-text-3 dark:text-muted-foreground max-w-md">
                        Para ver o actualizar la reseña de antecedentes y el plan de vacunación basal, primero selecciona un paciente en el filtro superior.
                    </p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-16">
                <Loading />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-main-light/40 dark:bg-main/5 border border-main/20 rounded-2xl">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-main text-white rounded-lg">
                        <Sparkles className="size-4" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-text-1 dark:text-white">
                            Ficha de Antecedentes de {pet.name}
                        </p>
                        <p className="text-xs text-text-3 dark:text-muted-foreground">
                            {isVeterinary
                                ? "Modifica los datos basales y guarda para actualizar su expediente clínico permanente."
                                : "Ficha clínica base con antecedentes y esquema preventivo."
                            }
                        </p>
                    </div>
                </div>

                {isVeterinary && (
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="cursor-pointer gap-2 bg-main hover:bg-main/90 text-white self-start sm:self-auto shadow-sm"
                    >
                        {isSaving ? (
                            <>
                                <Spinner className="size-4" />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <Save className="size-4" />
                                Guardar Antecedentes
                            </>
                        )}
                    </Button>
                )}
            </div>

            {/* Reseña y antecedentes médicos */}
            <PetMedicalReviewCard
                pet={pet}
                data={reviewData}
                onChange={handleReviewChange}
                isReadOnly={!isVeterinary}
            />

            {/* Plan de vacunación y desparasitación */}
            <PetVaccinationPlanCard
                species={pet.species}
                data={vaccinationData}
                onChange={handleVaccinationChange}
                isReadOnly={!isVeterinary}
            />
        </div>
    );
};
