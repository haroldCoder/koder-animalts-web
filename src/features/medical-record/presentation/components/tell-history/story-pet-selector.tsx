import React from "react";
import { PetEntity } from "@/features/pet/domain/entities";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PawPrint, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PetSummary {
    id: string;
    name: string;
    photo?: string;
    count: number;
}

interface StoryPetSelectorProps {
    pets?: PetEntity[];
    petSummaries: PetSummary[];
    selectedPetId?: string;
    onSelectPetId: (petId: string | undefined) => void;
}

export const StoryPetSelector: React.FC<StoryPetSelectorProps> = ({
    petSummaries,
    selectedPetId,
    onSelectPetId,
}) => {
    if (petSummaries.length <= 1) {
        return null;
    }

    const totalRecords = petSummaries.reduce((acc, curr) => acc + curr.count, 0);

    return (
        <section aria-label="Selector de mascota" className="w-full bg-white dark:bg-bg-dark-2 border border-border-1 dark:border-border/10 rounded-2xl p-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-main/10 text-main">
                        <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-text-1 dark:text-white">
                            Historias de la Familia
                        </h2>
                        <p className="text-xs text-text-3 dark:text-muted-foreground">
                            Selecciona una mascota para ver su relato individual o explora el viaje familiar conjunto
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {/* Option for ALL pets */}
                <button
                    type="button"
                    onClick={() => onSelectPetId(undefined)}
                    className={cn(
                        "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer shrink-0 border select-none",
                        !selectedPetId
                            ? "bg-main text-white border-main shadow-md shadow-main/20 scale-[1.02]"
                            : "bg-bg-1 dark:bg-bg-dark-3/40 text-text-2 dark:text-gray-300 border-border-1 dark:border-border/10 hover:border-main/40 hover:bg-main-light dark:hover:bg-main/10"
                    )}
                >
                    <div className={cn(
                        "w-6 h-6 rounded-lg flex items-center justify-center",
                        !selectedPetId ? "bg-white/20 text-white" : "bg-main/10 text-main"
                    )}>
                        <PawPrint className="w-3.5 h-3.5" />
                    </div>
                    <span>Todas las mascotas</span>
                    <span className={cn(
                        "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                        !selectedPetId ? "bg-white/30 text-white" : "bg-black/5 dark:bg-white/10 text-text-3 dark:text-gray-300"
                    )}>
                        {totalRecords}
                    </span>
                </button>

                {/* Individual Pets */}
                {petSummaries.map((pet) => {
                    const isSelected = selectedPetId === pet.id;
                    const initial = pet.name ? pet.name.charAt(0).toUpperCase() : "?";

                    return (
                        <button
                            key={pet.id}
                            type="button"
                            onClick={() => onSelectPetId(pet.id)}
                            className={cn(
                                "flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer shrink-0 border select-none",
                                isSelected
                                    ? "bg-main text-white border-main shadow-md shadow-main/20 scale-[1.02]"
                                    : "bg-bg-1 dark:bg-bg-dark-3/40 text-text-2 dark:text-gray-300 border-border-1 dark:border-border/10 hover:border-main/40 hover:bg-main-light dark:hover:bg-main/10"
                            )}
                        >
                            <Avatar className="w-6 h-6 border border-white/20">
                                <AvatarImage src={pet.photo} alt={pet.name} className="object-cover" />
                                <AvatarFallback className={cn(
                                    "text-[10px] font-bold",
                                    isSelected ? "bg-white/20 text-white" : "bg-main/10 text-main"
                                )}>
                                    {initial}
                                </AvatarFallback>
                            </Avatar>
                            <span>{pet.name}</span>
                            <span className={cn(
                                "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                                isSelected ? "bg-white/30 text-white" : "bg-black/5 dark:bg-white/10 text-text-3 dark:text-gray-300"
                            )}>
                                {pet.count}
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
};
