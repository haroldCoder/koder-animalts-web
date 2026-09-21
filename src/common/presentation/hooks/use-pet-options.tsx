import { useMemo } from "react"
import { PetEntity } from "@/features/pet/domain/entities"
import { PetOption } from "../components"

interface UsePetsOptions {
    petsData: PetEntity[] | undefined;
}
export const usePetsOptions = ({ petsData }: UsePetsOptions) => {
    const petsOptions = useMemo<PetOption[]>(() => {
        if (!petsData) return [];
        return petsData.map(pet => ({
            value: pet.id,
            label: pet.name
        }))
    }, [petsData])

    return { petsOptions };
}