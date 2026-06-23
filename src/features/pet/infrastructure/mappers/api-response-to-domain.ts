import { PetEntity } from "../../domain/entities";
import { PetResponseEntity } from "../entities";

export class ApiResponseToDomain {
    static toPetEntityData(response: PetResponseEntity): PetEntity[] {
        return response.data.map((pet) => ({
            id: pet.id,
            name: pet.name,
            birthdate: new Date(pet.birthDate).toLocaleDateString(),
            image: pet.mainImage,
            breed: pet.breed,
            isActive: pet.isActive,
            species: pet.species,
            weight: pet.weight,
            microchip: pet.microchip,
            color: pet.color,
            iaImage: pet.iaImage,
            images: pet.images,
            clinicName: pet.clinicName,
        }));
    }
}
