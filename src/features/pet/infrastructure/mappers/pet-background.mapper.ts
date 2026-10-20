import {
    PetBackgroundEntity,
    CanineVaccinationPlan,
    FelineVaccinationPlan,
    DewormingPlan
} from "../../domain/entities";
import { PetBackgroundResponseEntity } from "../entities/pet-background-response.entity";

export class PetBackgroundMapper {
    static toDomain(response: PetBackgroundResponseEntity): PetBackgroundEntity {
        const raw = response?.data;
        if (!raw) {
            return {
                petId: "",
                isNeutered: false,
                hasAllergies: false,
            };
        }

        const dewormingRaw = raw.coreVaccines?.deworming || raw.deworming || {};
        const canineRaw = raw.coreVaccines?.canineVaccines || raw.canineVaccines || {};
        const felineRaw = raw.coreVaccines?.felineVaccines || raw.felineVaccines || {};

        return {
            id: raw.id,
            petId: raw.petId,
            provenance: raw.provenance || "",
            diet: raw.dietType || raw.diet || "",
            isNeutered: Boolean(raw.isNeutered),
            neuteredDate: raw.neuteredDate || undefined,
            previousIllnesses: raw.previousIllnesses || "",
            hasAllergies: Boolean(raw.hasAllergies),
            allergiesDescription: raw.allergiesDescription || "",
            lastVaccinationDate: raw.lastVaccinationDate || undefined,
            canineVaccines: canineRaw as Partial<CanineVaccinationPlan>,
            felineVaccines: felineRaw as Partial<FelineVaccinationPlan>,
            deworming: {
                internalParasites: Boolean(dewormingRaw.internalParasites || raw.lastDewormingInternal),
                externalParasites: Boolean(dewormingRaw.externalParasites || raw.lastDewormingExternal),
                lastInternalDewormingDate: dewormingRaw.lastInternalDewormingDate || raw.lastDewormingInternal || undefined,
                lastExternalDewormingDate: dewormingRaw.lastExternalDewormingDate || raw.lastDewormingExternal || undefined,
            } as Partial<DewormingPlan>,
            otherVaccinesNotes: raw.otherPreventiveNotes || raw.otherVaccinesNotes || "",
            createdAt: raw.createdAt || undefined,
            updatedAt: raw.updatedAt || undefined,
        };
    }
}
