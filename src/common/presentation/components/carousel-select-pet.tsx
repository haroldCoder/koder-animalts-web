import { PetEntity } from "@/features/pet/domain/entities"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { FilterX } from "lucide-react"

interface CarouselSelectPetProps {
    pets: PetEntity[]
    selectedPet: string | null
    onSelectPet: (petId: string) => void
    onClearFilters?: () => void
    className?: string
    isLoading?: boolean
}

export const CarouselSelectPet = ({
    pets,
    selectedPet,
    onSelectPet,
    onClearFilters,
    className = "",
    isLoading = false,
}: CarouselSelectPetProps) => {
    if (!pets || pets.length === 0) {
        return null
    }

    const hasActiveFilter = Boolean(selectedPet)

    const handleClear = () => {
        if (onClearFilters) {
            onClearFilters()
        } else {
            onSelectPet("")
        }
    }

    return (
        <div className={cn("relative w-full px-8", className)}>
            <Carousel
                opts={{
                    align: "start",
                    dragFree: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-3 py-2 flex items-center">
                    {pets.map((pet) => {
                        const isSelected = selectedPet === pet.id
                        const firstLetter = pet.name ? pet.name.charAt(0).toUpperCase() : "?"

                        return (
                            <CarouselItem
                                key={pet.id}
                                className="pl-3 basis-auto"
                            >
                                {isLoading ? (
                                    <div className="h-10 w-28 bg-gray-200/50 dark:bg-bg-dark-1 animate-pulse rounded-full"></div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => onSelectPet(pet.id)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer select-none group",
                                            isSelected
                                                ? "bg-main text-white border-main shadow-md shadow-main/20 scale-[1.02]"
                                                : "bg-card text-foreground border-border/70 hover:border-main/50 hover:bg-main/5"
                                        )}
                                    >
                                        <Avatar className={cn(
                                            "w-8 h-8 border transition-transform duration-200 group-hover:scale-105",
                                            isSelected ? "border-white/40" : "border-border/50"
                                        )}>
                                            <AvatarImage src={pet.image || pet.iaImage} alt={pet.name} className="object-cover" />
                                            <AvatarFallback className={cn(
                                                "font-bold text-xs",
                                                isSelected ? "bg-white/20 text-white" : "bg-main/10 text-main"
                                            )}>
                                                {firstLetter}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="font-semibold text-sm whitespace-nowrap">
                                            {pet.name}
                                        </span>
                                    </button>
                                )}
                            </CarouselItem>
                        )
                    })}

                    {/* Clear Filters Button at the end of carousel */}
                    <CarouselItem className="pl-3 basis-auto">
                        <button
                            type="button"
                            onClick={handleClear}
                            disabled={!hasActiveFilter}
                            title="Limpiar filtro de mascota"
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 select-none text-sm font-medium",
                                hasActiveFilter
                                    ? "border-red-200 dark:border-red-900/50 bg-red-50/80 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 hover:border-red-300 shadow-sm cursor-pointer"
                                    : "border-dashed border-border/60 text-muted-foreground/50 opacity-60 cursor-not-allowed bg-muted/20"
                            )}
                        >
                            <FilterX className="w-4 h-4 shrink-0" />
                            <span className="whitespace-nowrap">Limpiar filtro</span>
                        </button>
                    </CarouselItem>
                </CarouselContent>
                {pets.length > 3 && (
                    <>
                        <CarouselPrevious className="-left-7 h-8 w-8 rounded-full border-border/60 bg-card hover:bg-main hover:text-white" />
                        <CarouselNext className="-right-7 h-8 w-8 rounded-full border-border/60 bg-card hover:bg-main hover:text-white" />
                    </>
                )}
            </Carousel>
        </div>
    )
}

