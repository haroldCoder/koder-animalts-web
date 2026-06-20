export interface PetEntity {
    id: string;
    name: string;
    birthdate: Date | string;
    image?: string;
    breed: string;
    isActive: boolean;
}