import { PetEntity } from "../../domain/entities";

export class ApiResponseToDomain {
    static toPetEntityData(response: any): PetEntity[] {
        const list = Array.isArray(response)
            ? response
            : Array.isArray(response?.data)
            ? response.data
            : [];

        return list.map((pet: any) => ({
            id: pet.id,
            name: pet.name,
            birthdate: pet.birthDate ? new Date(pet.birthDate).toLocaleDateString() : "",
            image: pet.mainImage,
            breed: pet.breed,
            isActive: pet.isActive,
            species: pet.species,
            weight: pet.weight,
            microchip: pet.microchip,
            color: pet.color,
            iaImage: pet.iaImage,
            images: pet.images || [],
            clinicName: pet.clinicName,
        }));
    }
}
