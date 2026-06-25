import { useMemo, useState } from "react";
import { PetEntity } from "../../domain/entities/pet.entity";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, Calendar, Scale, Tag, Syringe, Camera, Heart, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
    pet: PetEntity;
}

export const CardMainPet = ({ pet }: Props) => {
    const [isClicked, setIsClicked] = useState(false);

    const displayImage = useMemo(() => isClicked && pet.iaImage ? pet.iaImage : pet.image, [isClicked, pet.iaImage, pet.image]);

    return (
        <div className="bg-card text-card-foreground border rounded-xl shadow-sm overflow-hidden flex flex-col h-full max-h-[600px] hover:shadow-md transition-shadow">
            {/* Header / Avatar */}
            <div className="p-6 pb-4 flex flex-col gap-4 items-center border-b bg-muted/10 relative">
                <div
                    className="cursor-pointer flex gap-1 items-start"
                >
                    <Avatar className="w-32 ml-5 h-32 border-2 border-amber-500/20 transition-all duration-300">
                        <AvatarImage src={displayImage ?? ""} className="object-cover" />
                        <AvatarFallback className="bg-amber-500/10 text-amber-500 text-2xl font-bold">
                            {pet.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    {/* Hover AI symbol indicator */}
                    {pet.iaImage && (
                        <div onClick={() => setIsClicked(!isClicked)} className={cn(
                            " bg-amber-500 hover:bg-main-hover translate-y-2 text-white rounded-full p-1.5 shadow-md",
                        )}>
                            <Sparkles className="w-6 h-6" />
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-bold truncate text-amber-600">{pet.name}</h2>
                        {!pet.isActive && (
                            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                                Inactivo
                            </span>
                        )}
                    </div>
                    <p className="text-muted-foreground capitalize text-sm">{pet.species} {pet.breed ? `• ${pet.breed}` : ""}</p>
                </div>
            </div>

            {/* Content / Attributes */}
            <div className="p-6 grid grid-cols-2 gap-y-4 gap-x-2 text-sm flex-shrink-0">
                {pet.gender && (
                    <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="truncate"><span className="text-muted-foreground mr-1">Sexo:</span>{pet.gender}</span>
                    </div>
                )}
                {pet.birthdate && (
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="truncate">
                            <span className="text-muted-foreground mr-1">Nacimiento:</span>
                            {pet.birthdate instanceof Date ? pet.birthdate.toLocaleDateString() : new Date(pet.birthdate).toLocaleDateString()}
                        </span>
                    </div>
                )}
                {pet.weight && (
                    <div className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="truncate"><span className="text-muted-foreground mr-1">Peso:</span>{pet.weight} kg</span>
                    </div>
                )}
                {pet.color && (
                    <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="truncate"><span className="text-muted-foreground mr-1">Color:</span>{pet.color}</span>
                    </div>
                )}
                {pet.microchip && (
                    <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="truncate"><span className="text-muted-foreground mr-1">Chip:</span>{pet.microchip}</span>
                    </div>
                )}
                {pet.clinicName && (
                    <div className="flex items-center gap-2 col-span-2">
                        <Syringe className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="truncate"><span className="text-muted-foreground mr-1">Clínica:</span>{pet.clinicName}</span>
                    </div>
                )}
            </div>

            {/* Images vertical scroll */}
            {pet.images && pet.images.length > 0 && (
                <div className="px-6 pb-6">
                    <h3 className="text-sm font-semibold text-main mb-3 flex items-center gap-2">
                        <Camera className="w-4 h-4 shrink-0" />
                        Galería
                    </h3>
                    <ScrollArea className="h-48 rounded-md border p-2">
                        <div className="grid grid-cols-3 gap-4 pr-3">
                            {pet.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`${pet.name} gallery ${idx + 1}`}
                                    className="w-full h-40 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            )}
        </div>
    );
};
