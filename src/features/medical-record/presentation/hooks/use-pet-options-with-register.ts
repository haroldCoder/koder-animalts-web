import { useMemo, useState } from "react";
import { PetEntity } from "@/features/pet/domain/entities";
import { PetOption } from "@/common/presentation/components/pet-selector";
import { PetPresentationMapper } from "@/features/pet/presentation/mappers/pet-options.mapper";

interface UsePetOptionsWithRegisterParams {
    pets?: PetEntity[];
    enableRegister?: boolean;
    onSelectPet?: (petId: string | undefined) => void;
    refetchPets?: () => Promise<any> | void;
}

export const usePetOptionsWithRegister = ({
    pets,
    enableRegister = false,
    onSelectPet,
    refetchPets,
}: UsePetOptionsWithRegisterParams) => {
    const [isRegisterPatientOpen, setIsRegisterPatientOpen] = useState(false);

    const petsOptions = useMemo<PetOption[]>(() => {
        const baseOptions = PetPresentationMapper.toOptions(pets);
        if (!enableRegister) return baseOptions;

        return [
            ...baseOptions,
            {
                label: "Registrar mascota",
                value: "-1",
            },
        ];
    }, [pets, enableRegister]);

    const handlePetSelect = (val: string | null) => {
        if (val === "-1") {
            setIsRegisterPatientOpen(true);
            return;
        }
        onSelectPet?.(val || undefined);
    };

    const handlePetCreated = async (newPet: any) => {
        if (refetchPets) {
            await refetchPets();
        }
        if (newPet?.id) {
            onSelectPet?.(newPet.id);
        }
        setIsRegisterPatientOpen(false);
    };

    return {
        petsOptions,
        isRegisterPatientOpen,
        setIsRegisterPatientOpen,
        handlePetSelect,
        handlePetCreated,
    };
};
