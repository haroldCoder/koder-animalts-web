export interface CanineVaccinationPlan {
    rabies: boolean;          // Rabia
    parvovirus: boolean;      // Parvovirus
    distemper: boolean;       // Moquillo
    leptospira: boolean;      // Leptospira
    hepatitis: boolean;       // Hepatitis
    parainfluenza: boolean;   // Parainfluenza
    coronavirus: boolean;     // Coronavirus
    giardia: boolean;         // Giardia
}

export interface FelineVaccinationPlan {
    rabies: boolean;          // Rabia
    rhinotracheitis: boolean; // Rinotraqueitis
    calicivirus: boolean;     // Calicivirus
    panleukopenia: boolean;   // Panleucopenia
    leukemia: boolean;        // Leucemia
}

export interface DewormingPlan {
    internalParasites: boolean;        // Endoparásitos
    externalParasites: boolean;        // Ectoparásitos
    lastInternalDewormingDate?: string | Date;
    lastExternalDewormingDate?: string | Date;
}

export interface PetBackgroundEntity {
    id?: string;
    petId: string;

    // Reseña médica
    provenance?: string;              // Procedencia
    diet?: string;                    // Alimentación
    isNeutered: boolean;              // Castrado Si / No
    neuteredDate?: string | Date;
    previousIllnesses?: string;       // Enfermedades anteriores
    hasAllergies: boolean;            // Alergias Si / No
    allergiesDescription?: string;    // Detalle de alergias

    // Plan de vacunación y desparasitación
    lastVaccinationDate?: string | Date;
    canineVaccines?: Partial<CanineVaccinationPlan>;
    felineVaccines?: Partial<FelineVaccinationPlan>;
    deworming?: Partial<DewormingPlan>;
    otherVaccinesNotes?: string;      // Otros

    createdAt?: string | Date;
    updatedAt?: string | Date;
}
