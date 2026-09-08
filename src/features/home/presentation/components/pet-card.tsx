import { PetEntity } from "@/features/pet/domain/entities";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PetCardProps {
    pet: PetEntity;
}

export const PetCard: React.FC<PetCardProps> = ({ pet }) => {
    return (
        <article className="relative max-lg:flex max-lg:flex-col flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-bg-1 rounded-2xl shadow-sm border border-border-1 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer min-w-0">
            <div
                className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-sm ${pet.isActive ? 'bg-green-500' : 'bg-red-500'}`}
                title={pet.isActive ? 'Activo' : 'Inactivo'}
            />

            <Avatar className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 shadow-sm border border-border-1">
                <AvatarImage src={pet.image} alt={pet.name} className="object-cover" />
                <AvatarFallback className="bg-main-light text-main font-bold text-lg sm:text-xl">
                    {pet.name.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-text-1 leading-tight truncate">{pet.name}</h3>
                <p className="text-xs sm:text-sm font-medium text-text-2 mt-0.5 truncate">{pet.breed}</p>
                <p className="text-xs text-text-3 mt-1 truncate">Nacimiento: {pet.birthdate?.toString()}</p>
            </div>
        </article>
    );
};