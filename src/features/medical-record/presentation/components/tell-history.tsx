import React, { useState, useMemo } from "react";
import { MedicalRecordEntity } from "../../domain/entities";
import { PetEntity } from "@/features/pet/domain/entities";
import { buildStoryChapters } from "@/features/medical-record/presentation/helpers";
import {
    StoryPetSelector,
    StoryOverviewCard,
    StorySlideView,
    StoryTimelineView
} from "./tell-history/index";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Heart } from "lucide-react";

export interface TellHistoryProps {
    medicalRecords: MedicalRecordEntity[];
    pets?: PetEntity[];
    selectedPetId?: string;
    onSelectPetId?: (petId: string | undefined) => void;
    onBackToCards?: () => void;
}

export const TellHistory: React.FC<TellHistoryProps> = ({
    medicalRecords,
    pets,
    selectedPetId: externalSelectedPetId,
    onSelectPetId: externalOnSelectPetId,
    onBackToCards,
}) => {
    // Local pet selection state if parent doesn't manage it
    const [localPetId, setLocalPetId] = useState<string | undefined>(externalSelectedPetId);
    const [activeView, setActiveView] = useState<"slides" | "timeline">("slides");

    const effectivePetId = externalSelectedPetId !== undefined ? externalSelectedPetId : localPetId;

    const handleSelectPet = (petId: string | undefined) => {
        setLocalPetId(petId);
        if (externalOnSelectPetId) {
            externalOnSelectPetId(petId);
        }
    };

    // Calculate pet summaries across medical records
    const petSummaries = useMemo(() => {
        const map = new Map<string, { id: string; name: string; photo?: string; count: number }>();

        // First register from pets list if available
        if (pets) {
            pets.forEach((p) => {
                map.set(p.id, {
                    id: p.id,
                    name: p.name,
                    photo: p.image || p.iaImage,
                    count: 0
                });
            });
        }

        // Count and enrich with medical records
        medicalRecords.forEach((rec) => {
            const petId = rec.petId || rec.petName || "unknown";
            const existing = map.get(petId);
            if (existing) {
                existing.count += 1;
                if (!existing.photo && rec.petPhoto) existing.photo = rec.petPhoto;
            } else {
                map.set(petId, {
                    id: petId,
                    name: rec.petName || "Mascota",
                    photo: rec.petPhoto,
                    count: 1
                });
            }
        });

        // Return only pets with records or present in records
        return Array.from(map.values()).filter((item) => item.count > 0);
    }, [medicalRecords, pets]);

    // Filter records for the active selection
    const activeRecords = useMemo(() => {
        if (!effectivePetId) return medicalRecords;
        return medicalRecords.filter(
            (r) => r.petId === effectivePetId || r.petName === effectivePetId
        );
    }, [medicalRecords, effectivePetId]);

    // Build the story chapters
    const chapters = useMemo(() => {
        return buildStoryChapters(activeRecords);
    }, [activeRecords]);

    const activePetName = useMemo(() => {
        if (!effectivePetId) return undefined;
        const pet = petSummaries.find((p) => p.id === effectivePetId);
        return pet ? pet.name : undefined;
    }, [effectivePetId, petSummaries]);

    if (!medicalRecords || medicalRecords.length === 0) {
        return (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-bg-dark-2 border border-border-1 dark:border-border/10 space-y-3">
                <Heart className="w-10 h-10 text-main mx-auto opacity-50" />
                <h3 className="text-lg font-bold text-text-1 dark:text-white">
                    Aún no hay historias clínicas para relatar
                </h3>
                <p className="text-sm text-text-3 dark:text-muted-foreground max-w-md mx-auto">
                    Cuando tu mascota asista a consultas, vacunaciones o procedimientos, aquí se creará automáticamente su historia interactiva.
                </p>
                {onBackToCards && (
                    <Button onClick={onBackToCards} variant="outline" className="mt-2 cursor-pointer">
                        Volver a tarjetas
                    </Button>
                )}
            </div>
        );
    }

    return (
        <section aria-label="Historia clínica interactiva" className="w-full space-y-6 animate-in fade-in duration-300">
            {/* TOP BAR / BACK NAVIGATION */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    {onBackToCards && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onBackToCards}
                            className="cursor-pointer gap-1.5 text-xs text-text-2 dark:text-gray-300 hover:text-main -ml-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Volver a registros</span>
                        </Button>
                    )}
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-main" />
                        <h2 className="text-sm font-bold text-text-1 dark:text-white uppercase tracking-wider">
                            Narrativa Clínica para Dueños
                        </h2>
                    </div>
                </div>

                <div className="text-xs text-text-3 dark:text-muted-foreground">
                    <span>{chapters.length} momentos registrados en su historia</span>
                </div>
            </div>

            {/* PET SELECTOR (IF MULTIPLE PETS) */}
            <StoryPetSelector
                pets={pets}
                petSummaries={petSummaries}
                selectedPetId={effectivePetId}
                onSelectPetId={handleSelectPet}
            />

            {/* OVERVIEW / HEALTH JOURNEY DIGEST CARD */}
            <StoryOverviewCard
                chapters={chapters}
                petName={activePetName}
                onStartPresentation={() => setActiveView("slides")}
                activeView={activeView}
                onChangeView={setActiveView}
            />

            {/* ACTIVE INTERACTIVE VIEW */}
            {chapters.length === 0 ? (
                <div className="p-10 text-center rounded-2xl bg-white dark:bg-bg-dark-2 border border-border-1 dark:border-border/10 space-y-2">
                    <p className="text-sm font-semibold text-text-1 dark:text-white">
                        No se encontraron registros para la mascota seleccionada
                    </p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSelectPet(undefined)}
                        className="cursor-pointer text-xs"
                    >
                        Ver todas las mascotas
                    </Button>
                </div>
            ) : activeView === "slides" ? (
                <StorySlideView chapters={chapters} />
            ) : (
                <StoryTimelineView chapters={chapters} />
            )}
        </section>
    );
};