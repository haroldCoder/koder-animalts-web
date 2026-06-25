export interface PetEntity {
    id: string;
    name: string;
    birthdate?: Date | string;
    image?: string;
    breed?: string;
    isActive: boolean;
    gender?: string;
    species: string;
    weight?: number;
    microchip?: string;
    color?: string;
    iaImage?: string;
    images?: string[];
    clinicName?: string;
}
