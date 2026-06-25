import { CreatePetDto } from "../../domain/dtos";
import { IPetRepository } from "../../domain/repositories";

export class CreatePetUseCase {
    constructor(private readonly petRepository: IPetRepository) { }

    async execute(pet: CreatePetDto) {
        try {
            const { name, species, isActive, userId, clinicId, mainImage } = pet;

            if (!name) throw new Error("Nombre de la mascota es requerido");
            if (!species) throw new Error("Especie es requerida");
            if (isActive === undefined || isActive === null) throw new Error("Estatus es requerido");
            if (!userId) throw new Error("Dueño es requerido");
            if (!clinicId) throw new Error("Clinica es requerida");
            if (!mainImage) throw new Error("Imagen principal es requerida");

            console.log(pet);

            return await this.petRepository.createPet(pet);
        } catch (error) {
            console.error('Error creating pet:', error);
            throw error;
        }
    }
}