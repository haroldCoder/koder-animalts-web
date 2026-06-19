import { PetEntity } from "@/features/pet/domain/entities";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PetCardProps {
    pet: PetEntity;
}

export const PetCard: React.FC<PetCardProps> = ({ pet }) => {
    return (
        <article className="relative flex items-center gap-4 p-4 bg-bg-1 rounded-2xl shadow-sm border border-border-1 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
            <div
                className={`absolute top-4 right-4 w-3 h-3 rounded-full shadow-sm ${pet.isActive ? 'bg-green-500' : 'bg-red-500'}`}
                title={pet.isActive ? 'Activo' : 'Inactivo'}
            />

            <Avatar className="w-16 h-16 shadow-sm border border-border-1">
                <AvatarImage src={pet.image} alt={pet.name} className="object-cover" />
                <AvatarFallback className="bg-main-light text-main font-bold text-xl">
                    {pet.name.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
                <h3 className="text-lg font-bold text-text-1 leading-tight">{pet.name}</h3>
                <p className="text-sm font-medium text-text-2 mt-0.5">{pet.breed}</p>
                <p className="text-xs text-text-3 mt-1">Nacimiento: {pet.birthdate}</p>
            </div>
        </article>
    );
};